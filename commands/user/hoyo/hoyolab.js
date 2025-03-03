const { SlashCommandBuilder, SlashCommandSubcommandBuilder, EmbedBuilder, Colors, ActionRowBuilder, MessageFlags} = require('discord.js');
const {validateEmail, forwardButton, backButton, generateEmbedHoyoTrustedDevices} = require("../../../utils");
const {getByDiscordId, insertHoyoverseAccount, deleteHoyoverseAccount, updateHoyoverseAccount} = require("../../../database");
const {login, accountInfo, logout, accountTrustedDevicesInfo} = require("../../../utils/hoyo/hoyolab");
const {OS_TRUSTED_DEVICES_PAGE_SIZE} = require("../../../constants");

let sub_login = new SlashCommandSubcommandBuilder().setName('login').setDescription('Login to your Hoyoverse account.')
    .addStringOption(option => option.setName('email').setDescription("Account email.").setRequired(true))
    .addStringOption(option => option.setName('password').setDescription("Account password.").setRequired(true));

let sub_logout = new SlashCommandSubcommandBuilder().setName('logout').setDescription('Logout from currently logged in hoyoverse account.')
    .addBooleanOption(option => option.setName('force_logout').setDescription("Force the logout. This will remove database entry and assume hoyolab session expired.").setRequired(false));

let sub_info = new SlashCommandSubcommandBuilder().setName('info').setDescription('Retrieve information about current account.');
let sub_trustdev = new SlashCommandSubcommandBuilder().setName('trusteddevices').setDescription('Retrieve information about currently trusted devices of account.');

module.exports = {
    data: new SlashCommandBuilder().setName('hoyolab').setDescription('Hoyoverse account management command!').setContexts(0, 1, 2).setIntegrationTypes(1)
        .addSubcommand(sub_login).addSubcommand(sub_logout).addSubcommand(sub_info).addSubcommand(sub_trustdev),
    async execute(interaction) {
        switch(interaction.options.getSubcommand(true)) {
            case 'login': {
                let account = await getByDiscordId(interaction.client, `${interaction.user.id}`);
                let emailvalid = validateEmail(interaction.options.getString('email'));

                if (emailvalid && account === null || account.cookie_token_v2 === null || account.cookie_token_v2 === "") {
                    let rslt = await login(interaction.options.getString("email"), interaction.options.getString("password"));

                    if (rslt != null) {
                        if (rslt.body.retcode === 0) {
                            if (account === null) {
                                await insertHoyoverseAccount(interaction.client, `${interaction.user.id}`, `${rslt.body.data["user_info"].aid}`, `${rslt.cookies.cookie_token_v2}`, `${rslt.cookies.ltoken_v2}`, `${rslt.cookies.account_mid_v2}`, `${rslt.cookies.account_id_v2}`, `${rslt.cookies.ltmid_v2}`, `${rslt.cookies.ltuid_v2}`);
                            } else {
                                await updateHoyoverseAccount(interaction.client, `${interaction.user.id}`, `${rslt.cookies.cookie_token_v2}`, `${rslt.cookies.ltoken_v2}`, `${rslt.cookies.account_mid_v2}`, `${rslt.cookies.account_id_v2}`, `${rslt.cookies.ltmid_v2}`, `${rslt.cookies.ltuid_v2}`);
                            }

                            let embed = new EmbedBuilder().setTitle("Successfully logged in").setColor(Colors.Green)
                                .setFields({
                                    name: "UID",
                                    value: `${rslt.body.data["user_info"].aid}`,
                                    inline: false,
                                },
                                {
                                    name: "Username",
                                    value: `${rslt.body.data["user_info"].account_name}`,
                                    inline: false,
                                });
                            await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                        } else {
                            await interaction.reply({content: `${rslt.body.message}, Wrong username or password?`, flags: MessageFlags.Ephemeral});
                        }
                    } else {
                        await interaction.reply({content: "Error while trying to log you in, please try again later!", flags: MessageFlags.Ephemeral});
                    }
                } else {
                    await interaction.reply({content: "Email does not match required format or You have already logged in and have valid session!", flags: MessageFlags.Ephemeral});
                }
            }
            break;
            case 'info': {
                let account = await getByDiscordId(interaction.client, `${interaction.user.id}`);
                if (!account) return await interaction.reply({content: "You must have an active session to be able to retrieve information!", flags: MessageFlags.Ephemeral});

                let cookies = {
                    cookie_token_v2: account.cookie_token_v2,
                    account_mid_v2: account.account_mid_v2,
                    account_id_v2: account.account_id_v2,
                    ltoken_v2: account.ltoken_v2,
                    ltmid_v2: account.ltmid_v2,
                    ltuid_v2: account.ltuid_v2
                };
                let rslt = await accountInfo(cookies);

                if (rslt == null) return await interaction.reply({content: "Failed to query account information!", flags: MessageFlags.Ephemeral});
                if (rslt.body.code !== 200) return await interaction.reply({content: "Something went wrong querying your information!", flags: MessageFlags.Ephemeral});

                    let embed = new EmbedBuilder().setTitle("Account information").setColor(Colors.Green)
                        .setFields({
                                name: "UID",
                                value: `${rslt.body.data["cookie_info"].account_id}`,
                                inline: true,
                            },
                            {
                                name: "Email",
                                value: `${rslt.body.data["cookie_info"].email}`,
                                inline: true,
                            },
                            {
                                name: "Username",
                                value: `${rslt.body.data["cookie_info"].account_name} (||${rslt.body.data["cookie_info"].snoy_name}||)`,
                                inline: true,
                            },
                            {
                                name: "Cookie token (DO NOT SHARE)",
                                value: `||${rslt.body.data["cookie_info"].cookie_token}||`,
                                inline: true,
                            },
                            {
                                name: "Cookie token v2 (DO NOT SHARE)",
                                value: `||${cookies.cookie_token_v2}||`,
                                inline: true,
                            },
                            {
                                name: "ltoken v2 (DO NOT SHARE)",
                                value: `||${cookies.ltoken_v2}||`,
                                inline: true,
                            },
                            {
                                name: "ltmid v2 & ltuid v2 (DO NOT SHARE)",
                                value: `||${cookies.ltmid_v2}|| | ${cookies.ltuid_v2}`,
                                inline: true,
                            },
                            {
                                name: "account mid v2 & account id v2 (DO NOT SHARE)",
                                value: `||${cookies.account_mid_v2}|| | ${cookies.account_id_v2}`,
                                inline: true,
                            });
                    await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
            }
            break;
            case 'logout': {
                let account = await getByDiscordId(interaction.client, `${interaction.user.id}`);
                let isforce = (interaction.options.getBoolean("force_logout") === null) ? false : interaction.options.getBoolean("force_logout");
                if (!account && isforce === false || account.cookie_token_v2 === "" || account.cookie_token_v2 === null) return await interaction.reply({content: "You must have an active session to be able to logout!", flags: MessageFlags.Ephemeral});

                if (isforce) {
                    await deleteHoyoverseAccount(interaction.client, `${interaction.user.id}`);
                    await interaction.reply({content: "Account successfully logged out and removed from our database.", flags: MessageFlags.Ephemeral});
                } else {
                    let cookies = {
                        cookie_token_v2: account.cookie_token_v2,
                        account_mid_v2: account.account_mid_v2,
                        account_id_v2: account.account_id_v2,
                        ltoken_v2: account.ltoken_v2,
                        ltmid_v2: account.ltmid_v2,
                        ltuid_v2: account.ltuid_v2
                    };

                    let rslt = await logout(cookies);

                    if (rslt != null) {
                        if (rslt.body.retcode === 0) {
                            await updateHoyoverseAccount(interaction.client, `${interaction.user.id}`, `${rslt.cookies.cookie_token_v2}`, `${rslt.cookies.ltoken_v2}`, `${rslt.cookies.account_mid_v2}`, `${rslt.cookies.account_id_v2}`, `${rslt.cookies.ltmid_v2}`, `${rslt.cookies.ltuid_v2}`);
                            await interaction.reply({content: "Account successfully logged out.", flags: MessageFlags.Ephemeral});
                        } else {
                            await interaction.reply({content: `${rslt.body.message}, Logout failed! Try using \`force_logout\` instead.`, flags: MessageFlags.Ephemeral});
                        }
                    } else {
                        await interaction.reply({content: "Error while trying to log you out, please try again later!", flags: MessageFlags.Ephemeral});
                    }
                }
            }
            break;
            case 'trusteddevices': {
                let account = await getByDiscordId(interaction.client, `${interaction.user.id}`);
                if (!account) return await interaction.reply({content: "You must have an active session to be able to retrieve information!", flags: MessageFlags.Ephemeral});

                let cookies = {
                    cookie_token_v2: account.cookie_token_v2,
                    account_mid_v2: account.account_mid_v2,
                    account_id_v2: account.account_id_v2,
                    ltoken_v2: account.ltoken_v2,
                    ltmid_v2: account.ltmid_v2,
                    ltuid_v2: account.ltuid_v2
                };

                let rslt = await accountTrustedDevicesInfo(cookies);
                if (rslt === null) return await interaction.reply({content: `Error while trying to retrieve trusted devices information, please try again later!`, flags: MessageFlags.Ephemeral});

                let data = (rslt.body.data.devices.length === 0) ? [] : rslt.body.data.devices;

                const canFitOnOnePage = data.length <= OS_TRUSTED_DEVICES_PAGE_SIZE;
                let msg = await interaction.reply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedHoyoTrustedDevices(0, data)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                if (canFitOnOnePage) return;
                const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                let currentIndex = 0;
                collector.on('collect', async interaction => {
                    interaction.customId === "embed_page_backward" ? (currentIndex -= OS_TRUSTED_DEVICES_PAGE_SIZE) : (currentIndex += OS_TRUSTED_DEVICES_PAGE_SIZE)
                    await interaction.update({
                        embeds: [await generateEmbedHoyoTrustedDevices(currentIndex, data)],
                        components: [
                            ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                            ...(currentIndex + OS_TRUSTED_DEVICES_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                        ]
                    })
                });
            }
            break;
        }
    },
};
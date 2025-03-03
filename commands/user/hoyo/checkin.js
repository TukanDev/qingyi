const { SlashCommandBuilder, SlashCommandSubcommandBuilder, EmbedBuilder, Colors, ActionRowBuilder, MessageFlags} = require('discord.js');
const {getByDiscordId} = require("../../../database");
const {OS_SOL_REWARDS_PAGE_SIZE} = require("../../../constants");
const {generateEmbedCheckIn, forwardButton, backButton} = require("../../../utils");
const {solSign, solSignInfo, solSignHome} = require("../../../utils/hoyo/hk4e/cdkeys");
const {hkrpgLunaSign, hkrpgLunaSignInfo, hkrpgLunaSignHome} = require("../../../utils/hoyo/hkrpg/cdkeys");
const {napLunaSign, napLunaSignInfo, napLunaSignHome} = require("../../../utils/hoyo/nap/cdkeys");
const {bh3ManiSign, bh3ManiSignInfo, bh3ManiSignHome} = require("../../../utils/hoyo/bh3/cdkeys");

let sub_claim = new SlashCommandSubcommandBuilder().setName('claim').setDescription('Claim daily check-in for Hoyoverse games.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to claim daily check-in.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}));

let sub_status = new SlashCommandSubcommandBuilder().setName('status').setDescription('Status of daily check-in for selected Hoyoverse game.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to check status.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}));

let sub_rewards = new SlashCommandSubcommandBuilder().setName('rewards').setDescription('Rewards list of daily check-in for selected Hoyoverse game.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to check rewards list.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}));

module.exports = {
    data: new SlashCommandBuilder().setName('checkin').setDescription('Manage daily check-in rewards for Hoyoverse games.').setContexts(0, 1, 2).setIntegrationTypes(1)
        .addSubcommand(sub_claim).addSubcommand(sub_status).addSubcommand(sub_rewards),
    async execute(interaction) {
        let account = await getByDiscordId(interaction.client, `${interaction.user.id}`);
        if (!account) return await interaction.reply({content: "You must have an active session to be able to complete daily check-in!", flags: MessageFlags.Ephemeral});

        let cookies = {
            cookie_token_v2: account.cookie_token_v2,
            account_mid_v2: account.account_mid_v2,
            account_id_v2: account.account_id_v2,
            ltoken_v2: account.ltoken_v2,
            ltmid_v2: account.ltmid_v2,
            ltuid_v2: account.ltuid_v2
        };

        switch (interaction.options.getSubcommand(true)) {
            case 'claim': {
                switch (interaction.options.getString('game')) {
                    case 'hk4e_global': {
                        let rslt = await solSign(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to perform daily check-in, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Daily check-in successful | GenshinImpact").setColor(Colors.Green)
                            .setDescription(`Successfully checked in for today, rewards are awaiting inside the in game mail.`);

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case 'hkrpg_global': {
                        let rslt = await hkrpgLunaSign(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to perform daily check-in, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Daily check-in successful | Honkai: StarRail").setColor(Colors.Green)
                            .setDescription(`Successfully checked in for today, rewards are awaiting inside the in game mail.`);

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case 'nap_global': {
                        let rslt = await napLunaSign(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to perform daily check-in, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Daily check-in successful | ZenlessZoneZero").setColor(Colors.Green)
                            .setDescription(`Successfully checked in for today, rewards are awaiting inside the in game mail.`);

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case 'bh3_global': {
                        let rslt = await bh3ManiSign(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to perform daily check-in, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Daily check-in successful | HonkaiImpact 3rd").setColor(Colors.Green)
                            .setDescription(`Successfully checked in for today, rewards are awaiting inside the in game mail.`);

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                }
            }
            break;
            case 'status': {
                switch (interaction.options.getString('game')) {
                    case 'hk4e_global': {
                        let rslt = await solSignInfo(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to retrieve daily check-in information, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Daily check-in information | GenshinImpact").setColor(Colors.Green).setFields(
                            {name: "Today's check-in status", value: `${(rslt.body.data.is_sign) ? "Yes" : "No"}`, inline: true},
                            {name: "Total checked-in days", value: `${rslt.body.data["total_sign_day"]}`, inline: true},
                            {name: "Missed check-in days", value: `0`, inline: true})

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case 'hkrpg_global': {
                        let rslt = await hkrpgLunaSignInfo(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to retrieve daily check-in information, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Daily check-in information | Honkai: StarRail").setColor(Colors.Green).setFields(
                            {name: "Today's check-in status", value: `${(rslt.body.data.is_sign) ? "Yes" : "No"}`, inline: true},
                            {name: "Total checked-in days", value: `${rslt.body.data["total_sign_day"]}`, inline: true},
                            {name: "Missed check-in days", value: `${rslt.body.data["sign_cnt_missed"]}`, inline: true})

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case 'nap_global': {
                        let rslt = await napLunaSignInfo(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to retrieve daily check-in information, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Daily check-in information | ZenlessZoneZero").setColor(Colors.Green).setFields(
                            {name: "Today's check-in status", value: `${(rslt.body.data.is_sign) ? "Yes" : "No"}`, inline: true},
                            {name: "Total checked-in days", value: `${rslt.body.data["total_sign_day"]}`, inline: true},
                            {name: "Missed check-in days", value: `${rslt.body.data["sign_cnt_missed"]}`, inline: true})

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case 'bh3_global': {
                        let rslt = await bh3ManiSignInfo(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to retrieve daily check-in information, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Daily check-in information | HonkaiImpact 3rd").setColor(Colors.Green).setFields(
                            {name: "Today's check-in status", value: `${(rslt.body.data.is_sign) ? "Yes" : "No"}`, inline: true},
                            {name: "Total checked-in days", value: `${rslt.body.data["total_sign_day"]}`, inline: true},
                            {name: "Missed check-in days", value: `0`, inline: true})

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                }
            }
            break;
            case 'rewards': {
                switch (interaction.options.getString('game')) {
                    case 'hk4e_global': {
                        let rslt = await solSignHome(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to retrieve daily check-in rewards, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}`, flags: MessageFlags.Ephemeral});

                        let data = rslt.body.data.awards;
                        const canFitOnOnePage = data.length <= OS_SOL_REWARDS_PAGE_SIZE;

                        let msg = await interaction.reply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedCheckIn(0, data)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;

                        const collector = msg.createMessageComponentCollector({
                            filter: ({user}) => user.id === interaction.user.id
                        });

                        let currentIndex = 0
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_SOL_REWARDS_PAGE_SIZE) : (currentIndex += OS_SOL_REWARDS_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedCheckIn(currentIndex, data)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_SOL_REWARDS_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });

                    }
                    break;
                    case 'hkrpg_global': {
                        let rslt = await hkrpgLunaSignHome(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to retrieve daily check-in rewards, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}`, flags: MessageFlags.Ephemeral});

                        let data = rslt.body.data.awards;
                        const canFitOnOnePage = data.length <= OS_SOL_REWARDS_PAGE_SIZE;

                        let msg = await interaction.reply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedCheckIn(0, data)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;

                        const collector = msg.createMessageComponentCollector({
                            filter: ({user}) => user.id === interaction.user.id
                        });

                        let currentIndex = 0
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_SOL_REWARDS_PAGE_SIZE) : (currentIndex += OS_SOL_REWARDS_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedCheckIn(currentIndex, data)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_SOL_REWARDS_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });
                    }
                    break;
                    case 'nap_global': {
                        let rslt = await napLunaSignHome(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to retrieve daily check-in rewards, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}`, flags: MessageFlags.Ephemeral});

                        let data = rslt.body.data.awards;
                        const canFitOnOnePage = data.length <= OS_SOL_REWARDS_PAGE_SIZE;

                        let msg = await interaction.reply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedCheckIn(0, data)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;

                        const collector = msg.createMessageComponentCollector({
                            filter: ({user}) => user.id === interaction.user.id
                        });

                        let currentIndex = 0
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_SOL_REWARDS_PAGE_SIZE) : (currentIndex += OS_SOL_REWARDS_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedCheckIn(currentIndex, data)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_SOL_REWARDS_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });
                    }
                    break;
                    case 'bh3_global': {
                        let rslt = await bh3ManiSignHome(cookies);

                        if (rslt == null) return await interaction.reply({content: "Failed to retrieve daily check-in rewards, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}`, flags: MessageFlags.Ephemeral});

                        let data = rslt.body.data.awards;
                        const canFitOnOnePage = data.length <= OS_SOL_REWARDS_PAGE_SIZE;

                        let msg = await interaction.reply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedCheckIn(0, data)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;

                        const collector = msg.createMessageComponentCollector({
                            filter: ({user}) => user.id === interaction.user.id
                        });

                        let currentIndex = 0
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_SOL_REWARDS_PAGE_SIZE) : (currentIndex += OS_SOL_REWARDS_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedCheckIn(currentIndex, data)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_SOL_REWARDS_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });
                    }
                    break;
                }
            }
            break;
        }
    },
};

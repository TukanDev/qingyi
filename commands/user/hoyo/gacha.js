const { SlashCommandBuilder, SlashCommandSubcommandBuilder, MessageFlags, EmbedBuilder, Colors, ActionRowBuilder} = require('discord.js');
const {forwardButton, backButton} = require("../../../utils");
const {hk4eGetGachaLog, napGetGachaLog, hkrpgGetGachaLog} = require("../../../utils/hoyo/gachalog");
const {OS_GACHA_LOG_PAGE_SIZE} = require("../../../constants");
const {generateEmbedHk4eGacha, generateEmbedNapGacha, generateEmbedHkrpgGacha} = require("../../../utils/hoyo/gacha_embeds");
const {extractGachaLogAuthKey} = require("../../../utils/hoyo/helpers");

let sub_history = new SlashCommandSubcommandBuilder().setName('history').setDescription('Lookup pulls history for selected Hoyoverse game.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to lookup.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}))
    .addStringOption(option => option.setName('gacha_type').setDescription("Banner which you want to lookup.").setRequired(true).addChoices({name: "Character banner", value: "lim01"}, {name: "Weapon banner", value: "lim02"}, {name: "Chronicle banner / Stellar warp", value: "lim03"}, {name: "Standard banner", value: "perm01"}, {name: "Bangboo banner (ZenlessZoneZero only)", value: "perm02"}))
    .addStringOption(option => option.setName("auth_key").setDescription("AuthKey extracted from game logs.").setRequired(true));

let sub_keyextr = new SlashCommandSubcommandBuilder().setName('extractkey').setDescription('Extract auth_key from gacha history url of Hoyoverse game.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to extract AuthKey from.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}))
    .addStringOption(option => option.setName("url").setDescription("URL extracted by following tutorial provided by /gacha authkey command.").setRequired(true));

let sub_tutorial = new SlashCommandSubcommandBuilder().setName('authkey').setDescription('Tutorial how to obtain auth_key from the game logs of Hoyoverse game.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to display tutorial about.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}));

let sub_dump = new SlashCommandSubcommandBuilder().setName('dump').setDescription('Dump pulls history to selected format for selected Hoyoverse game.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to dump.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}))
    .addStringOption(option => option.setName('format').setDescription("Pick which format to use when dumping.").setRequired(true).addChoices({name: "paimon.moe", value: "paimon_moe"}, {name: "starrailstation.com", value: "sr_station"}, {name: "zzz.rng.moe", value: "zzz_rng_moe"}))
    .addStringOption(option => option.setName("auth_key").setDescription("AuthKey extracted from game logs.").setRequired(true));

module.exports = {
    data: new SlashCommandBuilder().setName('gacha').setDescription('Query your gacha history for Hoyoverse games!').setContexts(0, 1, 2).setIntegrationTypes(1)
        .addSubcommand(sub_history).addSubcommand(sub_tutorial).addSubcommand(sub_keyextr).addSubcommand(sub_dump),
    async execute(interaction) {
        interaction.deferReply({flags: MessageFlags.Ephemeral})
        switch(interaction.options.getSubcommand(true)) {
            case "history": {
                switch (interaction.options.getString("game")) {
                    case "hk4e_global": {
                        let rslt = await hk4eGetGachaLog(interaction,`${interaction.options.getString("gacha_type")}`, [1, 2, 3, 4, 5, 6, 7, 8], `${interaction.options.getString("game")}`, `${interaction.options.getString("auth_key")}`);
                        if (rslt === null) return await interaction.editReply({content: "Failed to query wish history for provided account!", flags: MessageFlags.Ephemeral});

                        let data = rslt.body;

                        const canFitOnOnePage = data.length <= OS_GACHA_LOG_PAGE_SIZE;
                        let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedHk4eGacha(0, data)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;
                        const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                        let currentIndex = 0;
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_GACHA_LOG_PAGE_SIZE) : (currentIndex += OS_GACHA_LOG_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedHk4eGacha(currentIndex, data)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_GACHA_LOG_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });
                    }
                    break;
                    case "hkrpg_global": {
                        let rslt = await hkrpgGetGachaLog(interaction,`${interaction.options.getString("gacha_type")}`, [1, 2, 3, 4, 5, 6, 7, 8], `${interaction.options.getString("game")}`, `${interaction.options.getString("auth_key")}`);
                        if (rslt === null) return await interaction.editReply({content: "Failed to query warp history for provided account!", flags: MessageFlags.Ephemeral});

                        let data = rslt.body;

                        const canFitOnOnePage = data.length <= OS_GACHA_LOG_PAGE_SIZE;
                        let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedHkrpgGacha(0, data)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;
                        const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                        let currentIndex = 0;
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_GACHA_LOG_PAGE_SIZE) : (currentIndex += OS_GACHA_LOG_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedHkrpgGacha(currentIndex, data)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_GACHA_LOG_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });
                    }
                    break;
                    case "nap_global": {
                        let rslt = await napGetGachaLog(interaction,`${interaction.options.getString("gacha_type")}`, [1, 2, 3, 4, 5, 6, 7, 8], `${interaction.options.getString("game")}`, `${interaction.options.getString("auth_key")}`);
                        if (rslt === null) return await interaction.editReply({content: "Failed to query gacha history for provided account!", flags: MessageFlags.Ephemeral});

                        let data = rslt.body;

                        const canFitOnOnePage = data.length <= OS_GACHA_LOG_PAGE_SIZE;
                        let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedNapGacha(0, data)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;
                        const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                        let currentIndex = 0;
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_GACHA_LOG_PAGE_SIZE) : (currentIndex += OS_GACHA_LOG_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedNapGacha(currentIndex, data)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_GACHA_LOG_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });
                    }
                    break;
                    case "bh3_global": {
                        await interaction.reply({content: "Currently not available!", flags: MessageFlags.Ephemeral})
                    }
                    break;

                }
            }
            break;
            case "authkey": {
                let embed = null;
                switch (interaction.options.getString("game")) {
                    case "hk4e_global": {
                        embed = new EmbedBuilder().setColor(Colors.Green).setTitle("AuthKey tutorial | GenshinImpact")
                            .setFields({
                                    name: "Step 1",
                                    value: "Open GenshinImpact on this PC (If you use multiple accounts, please restart the game)"
                                }, {
                                    name: "Step 2",
                                    value: "Open the wish history in the game and wait for it to load"
                                },
                                {
                                    name: "Step 3",
                                    value: "Open folder AppData → LocalLow → miHoYo → Genshin Impact"
                                },
                                {
                                    name: "Step 4",
                                    value: "Right click \`output_log.txt\` file then click \`Open with\` then select your favorite text editor (If you get error like \"The process cannot access the file because it is being used by another process\" please exit the game first)"
                                },
                                {
                                    name: "Step 5",
                                    value: "Press CTRL+F then in the input box search for \`webview_gacha\` then click Find"
                                },
                                {
                                    name: "Step 6",
                                    value: "Copy all the link from \`https://gs.hoyoverse.com\` until \`game_biz=hk4e_global#/log\` the url looks like this: \`https://gs.hoyoverse.com/genshin/event/e20190909gacha-v3/index.html?.......&auth_appid=webview_gacha&.........&game_biz=hk4e_global#/log\`"
                                },
                                {
                                    name: "Step 7",
                                    value: 'Use </gacha extractkey:1344456253707128954> and pick \`GenshinImpact\` as a game, give it the url you copied from \`Step 6\`'
                                });
                    }
                    break;
                    case "hkrpg_global": {
                        embed = new EmbedBuilder().setColor(Colors.Green).setTitle("AuthKey tutorial | Honkai: StarRail")
                            .setFields({
                                    name: "Step 1",
                                    value: "Open Honkai: StarRail on this PC (If you use multiple accounts, please restart the game)"
                                }, {
                                    name: "Step 2",
                                    value: "Open the warp history in the game and wait for it to load"
                                },
                                {
                                    name: "Step 3",
                                    value: "Open folder AppData → LocalLow → Cognosphere → Star Rail"
                                },
                                {
                                    name: "Step 4",
                                    value: "Right click \`Player.log\` file then click \`Open with\` then select your favorite text editor (If you get error like \"The process cannot access the file because it is being used by another process\" please exit the game first)"
                                },
                                {
                                    name: "Step 5",
                                    value: "Press CTRL+F then in the input box search for \`webview_gacha\` then click Find"
                                },
                                {
                                    name: "Step 6",
                                    value: "Copy all the link from \`https://gs.hoyoverse.com\` until \`game_biz=hkrpg_global\` (you can exclude \`&os_system=\` part) the url looks like this: \`https://gs.hoyoverse.com/hkrpg/event/e20211215gacha-v2/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&...&default_gacha_type=2&lang=en&plat_type=pc&authkey=...&game_biz=hkrpg_global&os_system=...\`"
                                },
                                {
                                    name: "Step 7",
                                    value: 'Use </gacha extractkey:1344456253707128954> and pick \`Honkai: StarRail\` as a game, give it the url you copied from \`Step 6\`'
                                });
                    }
                    break;
                    case "nap_global": {
                        embed = new EmbedBuilder().setColor(Colors.Green).setTitle("AuthKey tutorial | ZenlessZoneZero")
                            .setFields({
                                    name: "Step 1",
                                    value: "Open ZenlessZoneZero on this PC (If you use multiple accounts, please restart the game)"
                                }, {
                                    name: "Step 2",
                                    value: "Open the search (pull) history in the game and wait for it to load"
                                },
                                {
                                    name: "Step 3",
                                    value: "Open folder ZenlessZoneZero_Data → webCaches → 2.31.12.0 → Cache → Cache_Data"
                                },
                                {
                                    name: "Step 4",
                                    value: "Right click \`data_2\` file then click \`Open with\` then select your favorite text editor (If you get error like \"The process cannot access the file because it is being used by another process\" please exit the game first)"
                                },
                                {
                                    name: "Step 5",
                                    value: "Press CTRL+F then in the input box search for \`webview_gacha\` then click Find"
                                },
                                {
                                    name: "Step 6",
                                    value: "Copy all the link from \`https://gs.hoyoverse.com\` until \`&game_biz=nap_global\` the url looks like this: \`https://gs.hoyoverse.com/nap/event/e20230424gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&......&game_biz=nap_global\`"
                                },
                                {
                                    name: "Step 7",
                                    value: 'Use </gacha extractkey:1344456253707128954> and pick \`ZenlessZoneZero\` as a game, give it the url you copied from \`Step 6\`'
                                });
                    }
                    break;
                    case "bh3_global": {
                        embed = new EmbedBuilder().setColor(Colors.Green).setTitle("AuthKey tutorial | HonkaiImpact 3rd")
                            .setDescription("Currently not available!");
                    }
                    break;
                }

                await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral})
            }
            break;
            case 'extractkey': {
                let data = extractGachaLogAuthKey(`${interaction.options.getString("game")}`, `${interaction.options.getString("url")}`);

                let embed = new EmbedBuilder().setColor(Colors.Green).setTitle("Gacha history | AuthKey extractor")
                    .setDescription(`${data.auth_key}`)

                await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
            }
            break;
            case 'dump': {
                switch (interaction.options.getString("game")) {
                    case "hk4e_global": {
                        await interaction.editReply({content: "Coming soon!", flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "hkrpg_global": {
                        await interaction.editReply({content: "Coming soon!", flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "nap_global": {
                        await interaction.editReply({content: "Coming soon!", flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "bh3_global": {
                        await interaction.editReply({content: "Currently not available!", flags: MessageFlags.Ephemeral});
                    }
                    break;
                }
            }
            break;
        }
    },
};

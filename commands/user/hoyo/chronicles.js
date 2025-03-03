const { SlashCommandBuilder, SlashCommandSubcommandBuilder, EmbedBuilder, Colors, ActionRowBuilder,
    SlashCommandSubcommandGroupBuilder, MessageFlags
} = require('discord.js');
const {getByDiscordId} = require("../../../database");
const {forwardButton, backButton, generateEmbedBcExploration, generateEmbedBcNapMewMew, generateEmbedBcNapChars, generateEmbedBcHkrpgChars, generateEmbedBcHk4eChars, generateEmbedBcBh3Chars} = require("../../../utils");
const {OS_BATTLE_CHRONICLES_PAGE_SIZE} = require("../../../constants");
const {gameRolesByCookie, accountBattleChroniclesPrivacySettings} = require("../../../utils/hoyo/hoyolab");
const {hk4eBattleChroniclesIndex, hk4eBattleChroniclesSpiralAbyss, hk4eBattleChroniclesCharactersList,
    hk4eBattleChroniclesImaginariumTheatre
} = require("../../../utils/hoyo/hk4e/battle_chronicles");
const {hkrpgBattleChroniclesIndex, hkrpgBattleChroniclesAvatarInfo, hkrpgBattleChroniclesApocalypticShadow,
    hkrpgBattleChroniclesForgottenHall, hkrpgBattleChroniclesPureFiction, hkrpgBattleChroniclesSimulatedUniverse,
    hkrpgBattleChroniclesDivergentUniverse, hkrpgBattleChroniclesUnknowableDomain, hkrpgBattleChroniclesSwarmDisaster,
    hkrpgBattleChroniclesGoldAndGears
} = require("../../../utils/hoyo/hkrpg/battle_chronicles");
const {bh3BattleChroniclesIndex, bh3BattleChroniclesCharacters, bh3BattleChroniclesArenaReport,
    bh3BattleChroniclesNewAbyss, bh3BattleChroniclesElysianRealm
} = require("../../../utils/hoyo/bh3/battle_chronicles");
const {napBattleChroniclesRecordCard, napBattleChroniclesIndex, napBattleChroniclesAvatarsBasic,
    napBattleChroniclesDeadlyAssault, napBattleChroniclesShiyuDefense, napBattleChroniclesLostVoid,
    napBattleChroniclesWitheredDomain
} = require("../../../utils/hoyo/nap/battle_chronicles");
const {hkrpgEnkaIndex} = require("../../../utils/hoyo/hkrpg/enka");
const {hk4eEnkaIndex} = require("../../../utils/hoyo/hk4e/enka");
const {gameBizBySubCommand} = require("../../../utils/hoyo/helpers");
const {generateEmbedBcHk4eChallenges, generateEmbedBcNapChallenges, generateEmbedBcBh3Challenges,
    generateEmbedBcHkrpgChallenges
} = require("../../../utils/hoyo/challenge_embeds");

let sub_gi = new SlashCommandSubcommandBuilder().setName('genshinimpact').setDescription('Lookup GenshinImpact challenges information for selected in-game Hoyoverse account.')
    .addStringOption(option => option.setName('game_region').setDescription("Region of the account you want to lookup information.").setRequired(true).addChoices({name: "Europe", value: "os_euro"}, {name: "America", value: "os_usa"}, {name: "Asia", value: "os_asia"}))
    .addStringOption(option => option.setName('run_cycle').setDescription("Cycle you want to lookup information about.").setRequired(true).addChoices({name: "Current", value: "1"}, {name: "Previous", value: "2"}))
    .addStringOption(option => option.setName("uid").setDescription("In-game UID to lookup.").setRequired(false).setMaxLength(16));

let sub_hsr = new SlashCommandSubcommandBuilder().setName('starrail').setDescription('Lookup Honkai: StarRail challenges information for selected in-game Hoyoverse account.')
    .addStringOption(option => option.setName('game_region').setDescription("Region of the account you want to lookup information.").setRequired(true).addChoices({name: "Europe", value: "os_euro"}, {name: "America", value: "os_usa"}, {name: "Asia", value: "os_asia"}))
    .addStringOption(option => option.setName('run_cycle').setDescription("Cycle you want to lookup information about.").setRequired(true).addChoices({name: "Current", value: "1"}, {name: "Previous", value: "2"}))
    .addStringOption(option => option.setName("uid").setDescription("In-game UID to lookup.").setRequired(false).setMaxLength(16));

let sub_zzz = new SlashCommandSubcommandBuilder().setName('zenlesszonezero').setDescription('Lookup ZenlessZoneZero challenges information for selected in-game Hoyoverse account.')
    .addStringOption(option => option.setName('game_region').setDescription("Region of the account you want to lookup information.").setRequired(true).addChoices({name: "Europe", value: "os_euro"}, {name: "America", value: "os_usa"}, {name: "Asia", value: "os_asia"}))
    .addStringOption(option => option.setName('run_cycle').setDescription("Cycle you want to lookup information about.").setRequired(true).addChoices({name: "Current", value: "1"}, {name: "Previous", value: "2"}))
    .addStringOption(option => option.setName("uid").setDescription("In-game UID to lookup.").setRequired(false).setMaxLength(16));

let sub_hi3 = new SlashCommandSubcommandBuilder().setName('honkaiimpact').setDescription('Lookup HonkaiImpact 3rd challenges information for selected in-game Hoyoverse account.')
    .addStringOption(option => option.setName('game_region').setDescription("Region of the account you want to lookup information.").setRequired(true).addChoices({name: "Europe", value: "os_euro"}, {name: "America", value: "os_usa"}, {name: "Asia", value: "os_asia"}))
    .addStringOption(option => option.setName("uid").setDescription("In-game UID to lookup.").setRequired(false).setMaxLength(16));

// ============== MAJOR SUB COMMANDS ===================

let sub_query = new SlashCommandSubcommandBuilder().setName('query').setDescription('Lookup BattleRecords information for selected in-game Hoyoverse account.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to lookup.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}))
    .addStringOption(option => option.setName('game_region').setDescription("Region of the account you want to lookup information.").setRequired(true).addChoices({name: "Europe", value: "os_euro"}, {name: "America", value: "os_usa"}, {name: "Asia", value: "os_asia"}))
    .addStringOption(option => option.setName("uid").setDescription("In-game UID to lookup.").setRequired(false).setMaxLength(16));

let sub_exploration = new SlashCommandSubcommandBuilder().setName('exploration').setDescription('Lookup BattleRecords exploration information for selected in-game Hoyoverse account.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to lookup.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}))
    .addStringOption(option => option.setName('game_region').setDescription("Region of the account you want to lookup information.").setRequired(true).addChoices({name: "Europe", value: "os_euro"}, {name: "America", value: "os_usa"}, {name: "Asia", value: "os_asia"}))
    .addStringOption(option => option.setName("uid").setDescription("In-game UID to lookup.").setRequired(false).setMaxLength(16));

let sub_chars = new SlashCommandSubcommandBuilder().setName('characters').setDescription('Lookup BattleRecords characters information for selected in-game Hoyoverse account.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to lookup.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}))
    .addStringOption(option => option.setName('game_region').setDescription("Region of the account you want to lookup information.").setRequired(true).addChoices({name: "Europe", value: "os_euro"}, {name: "America", value: "os_usa"}, {name: "Asia", value: "os_asia"}))
    .addStringOption(option => option.setName("uid").setDescription("In-game UID to lookup.").setRequired(false).setMaxLength(16));

let sub_privacy = new SlashCommandSubcommandBuilder().setName('privacy').setDescription('Change BattleRecords privacy settings for in-game Hoyoverse account.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to lookup exploration.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}))
    .addStringOption(option => option.setName('setting').setDescription("Setting you want to change.").setRequired(true).addChoices({name: "Show your BattleRecords on your profile", value: "1"}, {name: "Show your Character Details in the BattleRecords", value: "2"}, {name: "Enable your Real-Time Notes (GenshinImpact and ZenlessZoneZero only)", value: "3"}))
    .addBooleanOption(option => option.setName("setting_value").setDescription("Setting value to apply.").setRequired(true));

let sub_challenges = new SlashCommandSubcommandGroupBuilder().setName("challenges").setDescription("Lookup challenges for various Hoyoverse games.")
    .addSubcommand(sub_gi).addSubcommand(sub_hsr).addSubcommand(sub_zzz).addSubcommand(sub_hi3);

module.exports = {
    data: new SlashCommandBuilder().setName('battlerecords').setDescription('BattleRecords lookup for all Hoyoverse games!').setContexts(0, 1, 2).setIntegrationTypes(1)
        .addSubcommand(sub_privacy).addSubcommand(sub_query).addSubcommand(sub_exploration).addSubcommand(sub_chars).addSubcommandGroup(sub_challenges),
    async execute(interaction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        let account = await getByDiscordId(interaction.client, `${interaction.user.id}`);
        if (!account) return await interaction.editReply({content: "You must have an active session to be able to query BattleRecords!", flags: MessageFlags.Ephemeral});

        let cookies = {
            cookie_token_v2: account.cookie_token_v2,
            account_mid_v2: account.account_mid_v2,
            account_id_v2: account.account_id_v2,
            ltoken_v2: account.ltoken_v2,
            ltmid_v2: account.ltmid_v2,
            ltuid_v2: account.ltuid_v2,
            mi18nLang: "en-us"
        };

        let gameBiz = (interaction.options.getString('game') === null) ? gameBizBySubCommand(interaction.options.getSubcommand(true)) : interaction.options.getString('game');

        var uid = "";
        var nickname = "";
        var level = "";
        if (interaction.options.getString("uid") === null && interaction.options.getSubcommand(true) !== "privacy") {
            let rslt = await gameRolesByCookie(`${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
            if (rslt == null) return await interaction.editReply({content: "Failed to lookup game accounts of currently logged in Hoyoverse account, Please try again later!", flags: MessageFlags.Ephemeral});
            if (rslt.body.retcode !== 0) return await interaction.editReply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});
            if (rslt.region.length === 0) return await interaction.editReply({content: "Failed to locate any game accounts related to selected game region associated with this Hoyoverse account, Please try again later!", flags: MessageFlags.Ephemeral});
            uid = `${rslt.region[0].game_uid}`;
            nickname =`${rslt.region[0].nickname}`;
            level = `${rslt.region[0].level}`;
        } else {
            if (gameBiz === "hkrpg_global" && interaction.options.getSubcommand(true) !== "privacy") {
                let rslt0 = await hkrpgEnkaIndex(`${interaction.options.getString("uid")}`);
                uid = `${rslt0.body.detailInfo.uid}`;
                nickname =`${rslt0.body.detailInfo.nickname}`;
                level = `${rslt0.body.detailInfo.level}`;
            } else if (gameBiz === "nap_global" && interaction.options.getSubcommand(true) !== "privacy") {
                // TODO: fix this to not query record card...
                let rslt0 = await napBattleChroniclesRecordCard(`${interaction.options.getString("uid")}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
                if (rslt0 == null || rslt0.body.data.list.length === 0) return await interaction.editReply({content: "Failed to query account by provided UID, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt0.body.retcode !== 0) return await interaction.editReply({content: `${rslt0.body.message}!`, flags: MessageFlags.Ephemeral});
                uid = `${rslt0.region[0].game_role_id}`;
                nickname =`${rslt0.region[0].nickname}`;
                level = `${rslt0.region[0].level}`;
                // Query enka for pretty nickname display where we don't have role object (like character list, challenges...)
            } else if (gameBiz === "hk4e_global" && interaction.options.getSubcommand(true) === "characters" && interaction.options.getSubcommand(true) === "genshinimpact" && interaction.options.getSubcommand(true) !== "privacy") {
                let rslt0 = await hk4eEnkaIndex(`${interaction.options.getString("uid")}`);
                uid = `${rslt0.body.uid}`;
                nickname =`${rslt0.body.playerInfo.nickname}`;
            } else {
                if (interaction.options.getSubcommand(true) !== "privacy") {
                    uid = `${interaction.options.getString("uid")}`;
                    nickname = "";
                    level = "";
                }
            }
        }

        switch(interaction.options.getSubcommand(true)) {
            case 'query': {
                switch (interaction.options.getString("game")) {
                    case 'hk4e_global': {
                        let rslt1 = await hk4eBattleChroniclesIndex(`${uid}`, `${interaction.options.getString("game")}`, `${interaction.options.getString("game_region")}`, cookies);
                        if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("BattleRecords | GenshinImpact").setColor(Colors.Green).setFields(
                            {name: "UID (InGame)", value: `${uid}`, inline: true},
                            {name: "Username (InGame)", value: `${rslt1.body.data.role.nickname}`, inline: true},
                            {name: "Adventure rank", value: `${rslt1.body.data.role.level}`, inline: true},
                            {name: "SpiralAbyss floor", value: `${rslt1.body.data.stats["spiral_abyss"]}`, inline: true},
                            {name: "ImaginariumTheater act", value: `N/A`, inline: true},
                            {name: "Serenitea pot homes", value: `${rslt1.body.data.homes.length}`, inline: true},
                            {name: "General statistics", value: `
                            Active days: **${rslt1.body.data.stats["active_day_number"]}**
                            Achievement count: **${rslt1.body.data.stats["achievement_number"]}**
                            Characters obtained: **${rslt1.body.data.stats["avatar_number"]}**
                            Max friendships count: **${rslt1.body.data.stats["full_fetter_avatar_num"]}**
                            Waypoints unlocked: **${rslt1.body.data.stats["way_point_number"]}**
                            Domains unlocked: **${rslt1.body.data.stats["domain_number"]}**`, inline: true},
                            {name: "Oculi statistics", value: `
                            Anemoculi collected: **${rslt1.body.data.stats["anemoculus_number"]}**
                            Geoculi collected: **${rslt1.body.data.stats["geoculus_number"]}**
                            Electroculi collected: **${rslt1.body.data.stats["electroculus_number"]}**
                            Dendroculi collected: **${rslt1.body.data.stats["dendroculus_number"]}**
                            Hydroculi collected: **${rslt1.body.data.stats["hydroculus_number"]}**
                            Pyroculi collected: **${rslt1.body.data.stats["pyroculus_number"]}**`, inline: true},
                            {name: "Chest statistics", value: `
                            Common chests: **${rslt1.body.data.stats["common_chest_number"]}**
                            Exquisite chests: **${rslt1.body.data.stats["exquisite_chest_number"]}**
                            Remarkable chests: **${rslt1.body.data.stats["magic_chest_number"]}**
                            Precious chests: **${rslt1.body.data.stats["precious_chest_number"]}**
                            Luxurious chests: **${rslt1.body.data.stats["luxurious_chest_number"]}**`, inline: true}
                        );

                        await interaction.editReply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case 'hkrpg_global': {
                        let rslt1 = await hkrpgBattleChroniclesIndex(`${uid}`, `${interaction.options.getString("game")}`, `${interaction.options.getString("game_region")}`, cookies);
                        if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("BattleRecords | Honkai: StarRail").setColor(Colors.Green).setFields(
                            {name: "UID (InGame)", value: `${uid}`, inline: true},
                            {name: "Username (InGame)", value: `${nickname}`, inline: true},
                            {name: "Trailblaze level", value: `${level}`, inline: true},
                            {name: "General statistics", value: `
                            Active days: **${rslt1.body.data.stats["active_days"]}**
                            Achievement count: **${rslt1.body.data.stats["achievement_num"]}**
                            Characters obtained: **${rslt1.body.data.stats["avatar_num"]}**
                            Treasures opened: **${rslt1.body.data.stats["chest_num"]}**
                            Dreamscape pass stickers: **${rslt1.body.data.stats["dream_paster_num"]}**
                            Treasures lightward: **${rslt1.body.data.stats["abyss_process"]}**`, inline: true}
                        );

                        await interaction.editReply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case 'nap_global': {
                        let rslt1 = await napBattleChroniclesIndex(`${uid}`, `${interaction.options.getString("game")}`, `${interaction.options.getString("game_region")}`, cookies);
                        if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("BattleRecords | ZenlessZoneZero").setColor(Colors.Green).setFields(
                            {name: "UID (InGame)", value: `${uid}`, inline: true},
                            {name: "Username (InGame)", value: `${nickname}`, inline: true},
                            {name: "Inter-knot level", value: `${level}`, inline: true},
                            {name: "General statistics", value: `
                            Active days: **${rslt1.body.data.stats["active_days"]}**
                            Achievement count: **${rslt1.body.data.stats["achievement_count"]}**
                            Mystery of Arpeggio Fault: **${rslt1.body.data.stats["next_hundred_layer"]}**
                            Inter-knot reputation: **${rslt1.body.data.stats.world_level_name}**
                            Agents obtained: **${rslt1.body.data.stats.avatar_num}**
                            Bangboo obtained: **${rslt1.body.data.stats.buddy_num}**`, inline: true},
                            {name: "Shiyu defense statistics", value: `
                            Stable node frontier: **${rslt1.body.data.stats["stable_zone_layer_count"]}**
                            Unstable node frontier: **${rslt1.body.data.stats["all_change_zone_layer_count"]}**`, inline: true},
                            {name: "Battle trial statistics", value: `
                            Simulated battle trial floor: **${rslt1.body.data.stats["climbing_tower_layer"]}**
                            Battle trial: Last stand floor: **${rslt1.body.data.stats.climbing_tower_s2.climbing_tower_layer}**
                            Battle trial: Last stand MVP floor: **${rslt1.body.data.stats.climbing_tower_s2.floor_mvp_num}**`, inline: true},
                            {name: "Deadly assault statistics", value: `
                            Total score: **${(rslt1.body.data.stats.memory_battlefield?.total_score === undefined) ? '0' : rslt1.body.data.stats.memory_battlefield?.total_score}**
                            Total stars: **${(rslt1.body.data.stats.memory_battlefield?.total_star === undefined) ? '0' : rslt1.body.data.stats.memory_battlefield?.total_star}**`, inline: true},
                        );

                        await interaction.editReply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case 'bh3_global': {
                        let rslt1 = await bh3BattleChroniclesIndex(`${uid}`, `${interaction.options.getString("game")}`, `${interaction.options.getString("game_region")}`, cookies);
                        if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("BattleRecords | HonkaiImpact 3rd").setColor(Colors.Green).setFields(
                            {name: "UID (InGame)", value: `${uid}`, inline: true},
                            {name: "Username (InGame)", value: `${rslt1.body.data.role.nickname}`, inline: true},
                            {name: "Captain level", value: `${rslt1.body.data.role.level}`, inline: true},
                            {name: "General statistics", value: `
                            Active days: **${rslt1.body.data.stats["active_day_number"]}**
                            Achievement count: **${rslt1.body.data.stats["achievement_number"]}**
                            Stigmata obtained: **${rslt1.body.data.stats["stigmata_number"]}**
                            5 Star stigmata: **${rslt1.body.data.stats["five_star_stigmata_number"]}**
                            Weapons obtained: **${rslt1.body.data.stats["weapon_number"]}**
                            5 Star weapons: **${rslt1.body.data.stats["five_star_weapon_number"]}**
                            Outfits obtained: **${rslt1.body.data.stats["suit_number"]}**
                            Battlesuits obtained: **${rslt1.body.data.stats["armor_number"]}**
                            SSS Battlesuits: **${rslt1.body.data.stats["sss_armor_number"]}**`, inline: true},
                            {name: "Elysian realm statistics", value: `
                            Fully upgraded Battlesuits: **${rslt1.body.data.stats["god_war_max_level_avatar_number"]}**
                            Diverging paths level: **${rslt1.body.data.stats["god_war_max_support_point"]}**
                            Remembrance sigils: **${rslt1.body.data.stats["god_war_extra_item_number"]}**
                            All-time best score: **${rslt1.body.data.stats["god_war_max_challenge_score"]}**`, inline: true},
                            {name: "Battle arena statistics", value: `
                            Ranking percentage: **${rslt1.body.data.stats["battle_field_ranking_percentage"]}%**
                            Area: **${rslt1.body.data.stats["battle_field_area"]}**
                            Total score: **${rslt1.body.data.stats["battle_field_score"]}**
                            Tier: **${rslt1.body.data.stats["battle_field_rank"]}**`, inline: true},
                            {name: "Abyss statistics", value: `
                            Abyss score: **${rslt1.body.data.stats["abyss_score"]}**
                            Abyss floor: **${rslt1.body.data.stats["abyss_floor"]}**
                            Abyss level: **${rslt1.body.data.stats.new_abyss.level}**
                            Abyss trophies: **${rslt1.body.data.stats.new_abyss.cup_number}**`, inline: true}
                        );

                        await interaction.editReply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                }
            }
            break;
            case 'exploration': {
                switch (interaction.options.getString("game")) {
                    case 'hk4e_global': {
                        let rslt1 = await hk4eBattleChroniclesIndex(`${uid}`, `${interaction.options.getString("game")}`, `${interaction.options.getString("game_region")}`, cookies);
                        if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let extra = new Map();
                        let data = rslt1.body.data.world_explorations;
                        data = data.filter(e => e.parent_id === 0);
                        data = data.filter(e => e.id !== 3);
                        data = data.filter(e => e.id !== 5);
                        data = data.filter(e => e.id !== 14);

                        // Get these as we're going to group them in special way... FUCK YOU HOYO
                        extra.set("dragonspine", rslt1.body.data.world_explorations[11]);
                        extra.set("enkanomiya", rslt1.body.data.world_explorations[9]);
                        extra.set("chasm_underground", rslt1.body.data.world_explorations[7]);
                        extra.set("sea_of_bygone_eras", rslt1.body.data.world_explorations[1]);
                        extra.set("chenyu_upper", rslt1.body.data.world_explorations[2]);
                        extra.set("chenyu_southern", rslt1.body.data.world_explorations[3]);
                        extra.set("chenyu_laixin", rslt1.body.data.world_explorations[4])

                        const canFitOnOnePage = data.length <= OS_BATTLE_CHRONICLES_PAGE_SIZE;
                        let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedBcExploration(0, data, extra, rslt1.body.data.role.nickname)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;
                        const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                        let currentIndex = 0;
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_BATTLE_CHRONICLES_PAGE_SIZE) : (currentIndex += OS_BATTLE_CHRONICLES_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedBcExploration(currentIndex, data, extra, rslt1.body.data.role.nickname)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_BATTLE_CHRONICLES_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });

                    }
                    break;
                    case 'hkrpg_global': {
                        await interaction.editReply({content: `Honkai: StarRail does not have any exploration data.`, flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case 'nap_global': {
                        let rslt1 = await napBattleChroniclesIndex(`${uid}`, `${interaction.options.getString("game")}`, `${interaction.options.getString("game_region")}`, cookies);
                        if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let data = (rslt1.body.data.cat_notes_list.length === 0) ? [{name: "???", num: 0, total: 0, medal_list: [{name: "Unknown", is_finish: false}]}] : rslt1.body.data.cat_notes_list;

                        const canFitOnOnePage = data.length <= OS_BATTLE_CHRONICLES_PAGE_SIZE;
                        let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedBcNapMewMew(0, data, nickname)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;
                        const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                        let currentIndex = 0;
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_BATTLE_CHRONICLES_PAGE_SIZE) : (currentIndex += OS_BATTLE_CHRONICLES_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedBcNapMewMew(currentIndex, data, nickname)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_BATTLE_CHRONICLES_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });
                    }
                    break;
                    case 'bh3_global': {
                        await interaction.editReply({content: `HonkaiImpact 3rd does not have any exploration data.`, flags: MessageFlags.Ephemeral});
                    }
                    break;
                }
            }
            break;
            case 'characters': {
                switch (interaction.options.getString("game")) {
                    case 'hk4e_global': {
                        let rslt1 = await hk4eBattleChroniclesCharactersList(`${uid}`, `${interaction.options.getString("game")}`, `${interaction.options.getString("game_region")}`, cookies);
                        if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let data = (rslt1.body.data.list.length === 0) ? [] : rslt1.body.data.list;

                        const canFitOnOnePage = data.length <= OS_BATTLE_CHRONICLES_PAGE_SIZE;
                        let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedBcHk4eChars(0, data, nickname)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;
                        const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                        let currentIndex = 0;
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_BATTLE_CHRONICLES_PAGE_SIZE) : (currentIndex += OS_BATTLE_CHRONICLES_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedBcHk4eChars(currentIndex, data, nickname)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_BATTLE_CHRONICLES_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });
                    }
                    break;
                    case 'hkrpg_global': {
                        let rslt1 = await hkrpgBattleChroniclesAvatarInfo(`${uid}`, `${interaction.options.getString("game")}`, `${interaction.options.getString("game_region")}`, cookies);
                        if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let data = (rslt1.body.data.avatar_list.length === 0) ? [] : rslt1.body.data.avatar_list;

                        const canFitOnOnePage = data.length <= OS_BATTLE_CHRONICLES_PAGE_SIZE;
                        let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedBcHkrpgChars(0, data, nickname)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;
                        const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                        let currentIndex = 0;
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_BATTLE_CHRONICLES_PAGE_SIZE) : (currentIndex += OS_BATTLE_CHRONICLES_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedBcHkrpgChars(currentIndex, data, nickname)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_BATTLE_CHRONICLES_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });
                    }
                    break;
                    case 'nap_global': {
                        let rslt1 = await napBattleChroniclesAvatarsBasic(`${uid}`, `${interaction.options.getString("game")}`, `${interaction.options.getString("game_region")}`, cookies);
                        if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let data = (rslt1.body.data.avatar_list.length === 0) ? [] : rslt1.body.data.avatar_list;

                        const canFitOnOnePage = data.length <= OS_BATTLE_CHRONICLES_PAGE_SIZE;
                        let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedBcNapChars(0, data, nickname)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;
                        const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                        let currentIndex = 0;
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_BATTLE_CHRONICLES_PAGE_SIZE) : (currentIndex += OS_BATTLE_CHRONICLES_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedBcNapChars(currentIndex, data, nickname)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_BATTLE_CHRONICLES_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });
                    }
                    break;
                    case 'bh3_global': {
                        let rslt1 = await bh3BattleChroniclesCharacters(`${uid}`, `${interaction.options.getString("game")}`, `${interaction.options.getString("game_region")}`, cookies);
                        if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let data = (rslt1.body.data.characters.length === 0) ? [] : rslt1.body.data.characters;

                        const canFitOnOnePage = data.length <= OS_BATTLE_CHRONICLES_PAGE_SIZE;
                        let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedBcBh3Chars(0, data, uid)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                        if (canFitOnOnePage) return;
                        const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                        let currentIndex = 0;
                        collector.on('collect', async interaction => {
                            interaction.customId === "embed_page_backward" ? (currentIndex -= OS_BATTLE_CHRONICLES_PAGE_SIZE) : (currentIndex += OS_BATTLE_CHRONICLES_PAGE_SIZE)
                            await interaction.update({
                                embeds: [await generateEmbedBcBh3Chars(currentIndex, data, uid)],
                                components: [
                                    ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                                    ...(currentIndex + OS_BATTLE_CHRONICLES_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                                ]
                            })
                        });
                    }
                    break;
                }
            }
            break;
            case 'privacy': {
                switch (interaction.options.getString("game")) {
                    case "hk4e_global": {
                        let rslt = await accountBattleChroniclesPrivacySettings(`${interaction.options.getString("setting")}`, interaction.options.getBoolean("setting_value"), `${interaction.options.getString("game")}`, cookies);
                        if (rslt == null) return await interaction.editReply({content: "Failed to update BattleRecords privacy settings, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.editReply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Privacy settings | GenshinImpact").setColor(Colors.Green)
                            .setDescription(`Successfully updated privacy settings.`);

                        await interaction.editReply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "hkrpg_global": {
                        let rslt = await accountBattleChroniclesPrivacySettings(`${interaction.options.getString("setting")}`, interaction.options.getBoolean("setting_value"), `${interaction.options.getString("game")}`, cookies);
                        if (rslt == null) return await interaction.editReply({content: "Failed to update BattleRecords privacy settings, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.editReply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});
                        if (interaction.options.getString("setting") === "3") return await interaction.editReply({content: `Real-Time notes setting is only available for GenshinImpact and ZenlessZoneZero!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Privacy settings | Honkai: StarRail").setColor(Colors.Green)
                            .setDescription(`Successfully updated privacy settings.`);

                        await interaction.editReply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "nap_global": {
                        let rslt = await accountBattleChroniclesPrivacySettings(`${interaction.options.getString("setting")}`, interaction.options.getBoolean("setting_value"), `${interaction.options.getString("game")}`, cookies);
                        if (rslt == null) return await interaction.editReply({content: "Failed to update BattleRecords privacy settings, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.editReply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Privacy settings | ZenlessZoneZero").setColor(Colors.Green)
                            .setDescription(`Successfully updated privacy settings.`);

                        await interaction.editReply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "bh3_global": {
                        let rslt = await accountBattleChroniclesPrivacySettings(`${interaction.options.getString("setting")}`, interaction.options.getBoolean("setting_value"), `${interaction.options.getString("game")}`, cookies);
                        if (rslt == null) return await interaction.editReply({content: "Failed to update BattleRecords privacy settings, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.editReply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});
                        if (interaction.options.getString("setting") === "3") return await interaction.editReply({content: `Real-Time notes setting is only available for GenshinImpact and ZenlessZoneZero!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Privacy settings | HonkaiImpact 3rd").setColor(Colors.Green)
                            .setDescription(`Successfully updated privacy settings.`);

                        await interaction.editReply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                }
            }
            break;
            // challenges
            case 'genshinimpact': {
                let rslt1 = await hk4eBattleChroniclesSpiralAbyss(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, `${interaction.options.getString("run_cycle")}`, cookies);
                if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records SpiralAbyss, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt2 = await hk4eBattleChroniclesImaginariumTheatre(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
                if (rslt2 == null) return await interaction.editReply({content: "Failed to query battle records ImaginariumTheatre, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt2.body.retcode !== 0) return await interaction.editReply({content: `${rslt2.body.message}!`, flags: MessageFlags.Ephemeral});

                let data = [];
                data.push({data: rslt1.body.data, id: 1, cycle: interaction.options.getString("run_cycle")});
                data.push({data: rslt2.body.data, id: 2, cycle: interaction.options.getString("run_cycle")});

                const canFitOnOnePage = data.length <= OS_BATTLE_CHRONICLES_PAGE_SIZE;
                let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedBcHk4eChallenges(0, data, uid, nickname)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                if (canFitOnOnePage) return;
                const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                let currentIndex = 0;
                collector.on('collect', async interaction => {
                    interaction.customId === "embed_page_backward" ? (currentIndex -= OS_BATTLE_CHRONICLES_PAGE_SIZE) : (currentIndex += OS_BATTLE_CHRONICLES_PAGE_SIZE)
                    await interaction.update({
                        embeds: [await generateEmbedBcHk4eChallenges(currentIndex, data, uid, nickname)],
                        components: [
                            ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                            ...(currentIndex + OS_BATTLE_CHRONICLES_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                        ]
                    })
                });

            }
            break;
            // ===== GENSHIN CHALLENGES END =====
            case 'zenlesszonezero': {
                let rslt1 = await napBattleChroniclesDeadlyAssault(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, `${interaction.options.getString("run_cycle")}`, cookies);
                if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records DeadlyAssault, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt2 = await napBattleChroniclesShiyuDefense(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, `${interaction.options.getString("run_cycle")}`, cookies);
                if (rslt2 == null) return await interaction.editReply({content: "Failed to query battle records ShiyuDefense, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt2.body.retcode !== 0) return await interaction.editReply({content: `${rslt2.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt3 = await napBattleChroniclesLostVoid(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
                if (rslt3 == null) return await interaction.editReply({content: "Failed to query battle records LostVoid, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt3.body.retcode !== 0) return await interaction.editReply({content: `${rslt3.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt4 = await napBattleChroniclesWitheredDomain(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
                if (rslt4 == null) return await interaction.editReply({content: "Failed to query battle records WitheredDomain, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt4.body.retcode !== 0) return await interaction.editReply({content: `${rslt4.body.message}!`, flags: MessageFlags.Ephemeral});

                let data = [];
                data.push({data: rslt1.body.data, id: 1, cycle: interaction.options.getString("run_cycle")});
                data.push({data: rslt2.body.data, id: 2, cycle: interaction.options.getString("run_cycle")});
                data.push({data: rslt3.body.data, id: 3, cycle: interaction.options.getString("run_cycle")});
                data.push({data: rslt4.body.data, id: 4, cycle: interaction.options.getString("run_cycle")});

                const canFitOnOnePage = data.length <= OS_BATTLE_CHRONICLES_PAGE_SIZE;
                let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedBcNapChallenges(0, data, uid, nickname)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                if (canFitOnOnePage) return;
                const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                let currentIndex = 0;
                collector.on('collect', async interaction => {
                    interaction.customId === "embed_page_backward" ? (currentIndex -= OS_BATTLE_CHRONICLES_PAGE_SIZE) : (currentIndex += OS_BATTLE_CHRONICLES_PAGE_SIZE)
                    await interaction.update({
                        embeds: [await generateEmbedBcNapChallenges(currentIndex, data, uid, nickname)],
                        components: [
                            ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                            ...(currentIndex + OS_BATTLE_CHRONICLES_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                        ]
                    })
                });

            }
            break;
            // ===== ZZZ CHALLENGES END =====
            case 'honkaiimpact': {
                let rslt1 = await bh3BattleChroniclesArenaReport(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
                if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records BattleArena, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt2 = await bh3BattleChroniclesNewAbyss(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
                if (rslt2 == null) return await interaction.editReply({content: "Failed to query battle records HonkaiAbyss, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt2.body.retcode !== 0) return await interaction.editReply({content: `${rslt2.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt3 = await bh3BattleChroniclesElysianRealm(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
                if (rslt3 == null) return await interaction.editReply({content: "Failed to query battle records ElysianRealm, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt3.body.retcode !== 0) return await interaction.editReply({content: `${rslt3.body.message}!`, flags: MessageFlags.Ephemeral});

                let data = [];
                data.push({data: rslt1.body.data, id: 1});
                data.push({data: rslt2.body.data, id: 2});
                data.push({data: rslt3.body.data, id: 3});

                const canFitOnOnePage = data.length <= OS_BATTLE_CHRONICLES_PAGE_SIZE;
                let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedBcBh3Challenges(0, data, uid)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                if (canFitOnOnePage) return;
                const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                let currentIndex = 0;
                collector.on('collect', async interaction => {
                    interaction.customId === "embed_page_backward" ? (currentIndex -= OS_BATTLE_CHRONICLES_PAGE_SIZE) : (currentIndex += OS_BATTLE_CHRONICLES_PAGE_SIZE)
                    await interaction.update({
                        embeds: [await generateEmbedBcBh3Challenges(currentIndex, data, uid)],
                        components: [
                            ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                            ...(currentIndex + OS_BATTLE_CHRONICLES_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                        ]
                    })
                });

            }
            break;
            // ===== HONKAI CHALLENGES END =====
            case "starrail": {
                let rslt1 = await hkrpgBattleChroniclesApocalypticShadow(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, `${interaction.options.getString("run_cycle")}`, cookies);
                if (rslt1 == null) return await interaction.editReply({content: "Failed to query battle records ApocalypticShadow, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt1.body.retcode !== 0) return await interaction.editReply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt2 = await hkrpgBattleChroniclesForgottenHall(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, `${interaction.options.getString("run_cycle")}`, cookies);
                if (rslt2 == null) return await interaction.editReply({content: "Failed to query battle records ForgottenHall, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt2.body.retcode !== 0) return await interaction.editReply({content: `${rslt2.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt3 = await hkrpgBattleChroniclesPureFiction(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, `${interaction.options.getString("run_cycle")}`, cookies);
                if (rslt3 == null) return await interaction.editReply({content: "Failed to query battle records PureFiction, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt3.body.retcode !== 0) return await interaction.editReply({content: `${rslt3.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt4 = await hkrpgBattleChroniclesSimulatedUniverse(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, `${interaction.options.getString("run_cycle")}`, cookies);
                if (rslt4 == null) return await interaction.editReply({content: "Failed to query battle records SimulatedUniverse, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt4.body.retcode !== 0) return await interaction.editReply({content: `${rslt4.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt5 = await hkrpgBattleChroniclesDivergentUniverse(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
                if (rslt5 == null) return await interaction.editReply({content: "Failed to query battle records DivergentUniverse, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt5.body.retcode !== 0) return await interaction.editReply({content: `${rslt5.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt6 = await hkrpgBattleChroniclesUnknowableDomain(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
                if (rslt6 == null) return await interaction.editReply({content: "Failed to query battle records UnknowableDomain, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt6.body.retcode !== 0) return await interaction.editReply({content: `${rslt6.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt7 = await hkrpgBattleChroniclesSwarmDisaster(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
                if (rslt7 == null) return await interaction.editReply({content: "Failed to query battle records SwarmDisaster, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt7.body.retcode !== 0) return await interaction.editReply({content: `${rslt7.body.message}!`, flags: MessageFlags.Ephemeral});

                let rslt8 = await hkrpgBattleChroniclesGoldAndGears(`${uid}`, `${gameBiz}`, `${interaction.options.getString("game_region")}`, cookies);
                if (rslt8 == null) return await interaction.editReply({content: "Failed to query battle records GoldAndGears, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt8.body.retcode !== 0) return await interaction.editReply({content: `${rslt8.body.message}!`, flags: MessageFlags.Ephemeral});

                let data = [];
                data.push({data: rslt2.body.data, id: 1, cycle: interaction.options.getString("run_cycle")});
                data.push({data: rslt1.body.data, id: 2, cycle: interaction.options.getString("run_cycle")});
                data.push({data: rslt3.body.data, id: 3, cycle: interaction.options.getString("run_cycle")});
                data.push({data: rslt4.body.data, id: 4, cycle: interaction.options.getString("run_cycle")});
                data.push({data: rslt5.body.data, id: 5, cycle: interaction.options.getString("run_cycle")});
                data.push({data: rslt6.body.data, id: 6, cycle: interaction.options.getString("run_cycle")});
                data.push({data: rslt7.body.data, id: 7, cycle: interaction.options.getString("run_cycle")});
                data.push({data: rslt8.body.data, id: 8, cycle: interaction.options.getString("run_cycle")});

                const canFitOnOnePage = data.length <= OS_BATTLE_CHRONICLES_PAGE_SIZE;
                let msg = await interaction.editReply({flags: MessageFlags.Ephemeral,embeds: [await generateEmbedBcHkrpgChallenges(0, data, uid, nickname)], components: canFitOnOnePage ? [] : [new ActionRowBuilder().addComponents(forwardButton)]});

                if (canFitOnOnePage) return;
                const collector = msg.createMessageComponentCollector({filter: ({user}) => user.id === interaction.user.id});

                let currentIndex = 0;
                collector.on('collect', async interaction => {
                    interaction.customId === "embed_page_backward" ? (currentIndex -= OS_BATTLE_CHRONICLES_PAGE_SIZE) : (currentIndex += OS_BATTLE_CHRONICLES_PAGE_SIZE)
                    await interaction.update({
                        embeds: [await generateEmbedBcHkrpgChallenges(currentIndex, data, uid, nickname)],
                        components: [
                            ...(currentIndex ? [new ActionRowBuilder().addComponents(backButton)] : []),
                            ...(currentIndex + OS_BATTLE_CHRONICLES_PAGE_SIZE < data.length ? [new ActionRowBuilder().addComponents(forwardButton)] : [])
                        ]
                    })
                });
            }
            break;
            // ===== HSR CHALLENGES END =====
        }
    },
};

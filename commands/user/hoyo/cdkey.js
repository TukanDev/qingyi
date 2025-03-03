const { SlashCommandBuilder, SlashCommandSubcommandBuilder, EmbedBuilder, Colors, MessageFlags} = require('discord.js');
const {getByDiscordId} = require("../../../database");
const {gameRolesByCookie} = require("../../../utils/hoyo/hoyolab");
const {hk4eWebExchangeCdKey, hk4eListCdKeys} = require("../../../utils/hoyo/hk4e/cdkeys");
const {hkrpgWebExchangeCdKey, hkrpgListCdKeys} = require("../../../utils/hoyo/hkrpg/cdkeys");
const {napWebExchangeCdKey, napListCdKeys} = require("../../../utils/hoyo/nap/cdkeys");
const {bh3ListCdKeys} = require("../../../utils/hoyo/bh3/cdkeys");

let sub_claim = new SlashCommandSubcommandBuilder().setName('claim').setDescription('Claim redemption codes for Hoyoverse games.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to claim code.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}))
    .addStringOption(option => option.setName('game_region').setDescription("Region of the account you want to claim code.").setRequired(true).addChoices({name: "Europe", value: "os_euro"}, {name: "America", value: "os_usa"}, {name: "Asia", value: "os_asia"}))
    .addStringOption(option => option.setName('code').setDescription("Code you want to claim.").setRequired(true));

let sub_list = new SlashCommandSubcommandBuilder().setName('list').setDescription('List currently active redemption special program livestream codes for Hoyoverse games.')
    .addStringOption(option => option.setName('game').setDescription("Pick which game to list codes.").setRequired(true).addChoices({name: "GenshinImpact (Global)", value: "hk4e_global"}, {name: "Honkai: StarRail (Global)", value: "hkrpg_global"}, {name: "ZenlessZoneZero (Global)", value: "nap_global"}, {name: "HonkaiImpact 3rd (Global)", value: "bh3_global"}));

module.exports = {
    data: new SlashCommandBuilder().setName('cdkey').setDescription('Manage redemption codes for Hoyoverse games.').setContexts(0, 1, 2).setIntegrationTypes(1)
        .addSubcommand(sub_claim).addSubcommand(sub_list),
    async execute(interaction) {
        let account = await getByDiscordId(interaction.client, `${interaction.user.id}`);
        if (!account) return await interaction.reply({content: "You must have an active session to be able to redeem codes!", flags: MessageFlags.Ephemeral});

        let cookies = {
            cookie_token_v2: account.cookie_token_v2,
            account_mid_v2: account.account_mid_v2,
            account_id_v2: account.account_id_v2,
            ltoken_v2: account.ltoken_v2,
            ltmid_v2: account.ltmid_v2,
            ltuid_v2: account.ltuid_v2
        };

        switch(interaction.options.getSubcommand(true)) {
            case 'list': {
                switch (interaction.options.getString("game")) {
                    case "hk4e_global": {
                        let rslt = await hk4eListCdKeys(cookies);
                        if (rslt === null) return await interaction.reply({content: "Failed to list redemption codes, claim time is probably expired.", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}`, flags: MessageFlags.Ephemeral});

                        let codeinfo = rslt.body.data.modules.filter(m => m.exchange_group !== null);

                        if (codeinfo.length === 0) return await interaction.reply({content: "There is currently no active redemption livestream codes!", flags: MessageFlags.Ephemeral})

                        let codes = codeinfo[0].exchange_group.bonuses.filter(c => c.code_status === "ON");

                        let embed = new EmbedBuilder().setTitle("Active redemption codes | GenshinImpact").setColor(Colors.Green);

                        codes.forEach((c, index) => embed.addFields({name: `Code ${index+1}`, value: `Code: **${c.exchange_code}**\nExpires at: **${new Date(c.offline_at*1000).toDateString()}**`}))

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "hkrpg_global": {
                        let rslt = await hkrpgListCdKeys(cookies);
                        if (rslt === null) return await interaction.reply({content: "Failed to list redemption codes, claim time is probably expired.", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}`, flags: MessageFlags.Ephemeral});

                        let codeinfo = rslt.body.data.modules.filter(m => m.exchange_group !== null);

                        if (codeinfo.length === 0) return await interaction.reply({content: "There is currently no active redemption livestream codes!", flags: MessageFlags.Ephemeral})

                        let codes = codeinfo[0].exchange_group.bonuses.filter(c => c.code_status === "ON");

                        let embed = new EmbedBuilder().setTitle("Active redemption codes | Honkai: StarRail").setColor(Colors.Green);

                        codes.forEach((c, index) => embed.addFields({name: `Code ${index+1}`, value: `Code: **${c.exchange_code}**\nExpires at: **${new Date(c.offline_at*1000).toDateString()}**`}))

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "nap_global": {
                        let rslt = await napListCdKeys(cookies);
                        if (rslt === null) return await interaction.reply({content: "Failed to list redemption codes, claim time is probably expired.", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}`, flags: MessageFlags.Ephemeral});

                        let codeinfo = rslt.body.data.modules.filter(m => m.exchange_group !== null);

                        if (codeinfo.length === 0) return await interaction.reply({content: "There is currently no active redemption livestream codes!", flags: MessageFlags.Ephemeral})

                        let codes = codeinfo[0].exchange_group.bonuses.filter(c => c.code_status === "ON");

                        let embed = new EmbedBuilder().setTitle("Active redemption codes | ZenlessZoneZero").setColor(Colors.Green);

                        codes.forEach((c, index) => embed.addFields({name: `Code ${index+1}`, value: `Code: **${c.exchange_code}**\nExpires at: **${new Date(c.offline_at*1000).toDateString()}**`}))

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "bh3_global": {
                        let rslt = await bh3ListCdKeys(cookies);
                        if (rslt === null) return await interaction.reply({content: "Failed to list redemption codes, claim time is probably expired.", flags: MessageFlags.Ephemeral});
                        if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}`, flags: MessageFlags.Ephemeral});

                        let codeinfo = rslt.body.data.modules.filter(m => m.exchange_group !== null);

                        if (codeinfo.length === 0) return await interaction.reply({content: "There is currently no active redemption livestream codes!", flags: MessageFlags.Ephemeral})

                        let codes = codeinfo[0].exchange_group.bonuses.filter(c => c.code_status === "ON");

                        let embed = new EmbedBuilder().setTitle("Active redemption codes | HonkaiImpact 3rd").setColor(Colors.Green);

                        codes.forEach((c, index) => embed.addFields({name: `Code ${index+1}`, value: `Code: **${c.exchange_code}**\nExpires at: **${new Date(c.offline_at*1000).toDateString()}**`}))

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                }
            }
            break;
            case 'claim': {
                let rslt = await gameRolesByCookie(`${interaction.options.getString('game')}`, `${interaction.options.getString("game_region")}`, cookies);

                if (rslt == null) return await interaction.reply({content: "Failed to lookup game accounts of currently logged in Hoyoverse account, Please try again later!", flags: MessageFlags.Ephemeral});
                if (rslt.body.retcode !== 0) return await interaction.reply({content: `${rslt.body.message}!`, flags: MessageFlags.Ephemeral});
                if (rslt.region.length === 0) return await interaction.reply({content: "Failed to locate any game accounts related to selected game region associated with this Hoyoverse account, Please try again later!", flags: MessageFlags.Ephemeral});

                switch(interaction.options.getString("game")) {
                    case "hk4e_global": {
                        let rslt1 = await hk4eWebExchangeCdKey(`${rslt.region[0].game_uid}`, `${interaction.options.getString("game_region")}`, `${interaction.options.getString("code")}`, `${interaction.options.getString("game")}`, cookies);

                        if (rslt1 == null) return await interaction.reply({content: "Failed to claim redemption code, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.reply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Redemption successful | GenshinImpact").setColor(Colors.Green).setFields(
                            {name: "UID (InGame)", value: `${rslt.region[0].game_uid}`, inline: false},
                            {name: "Username (InGame)", value: `${rslt.region[0].nickname}`, inline: false},
                            {name: "Region", value: `${rslt.region[0].region_name}`, inline: false});

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "hkrpg_global": {
                        let rslt1 = await hkrpgWebExchangeCdKey(`${rslt.region[0].game_uid}`, `${interaction.options.getString("game_region")}`, `${interaction.options.getString("code")}`, `${interaction.options.getString("game")}`, cookies);

                        if (rslt1 == null) return await interaction.reply({content: "Failed to claim redemption code, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.reply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Redemption successful | Honkai: StarRail").setColor(Colors.Green).setFields(
                            {name: "UID (InGame)", value: `${rslt.region[0].game_uid}`, inline: false},
                            {name: "Username (InGame)", value: `${rslt.region[0].nickname}`, inline: false},
                            {name: "Region", value: `${rslt.region[0].region_name}`, inline: false});

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "nap_global": {
                        let rslt1 = await napWebExchangeCdKey(`${rslt.region[0].game_uid}`, `${interaction.options.getString("game_region")}`, `${interaction.options.getString("code")}`, `${interaction.options.getString("game")}`, cookies);

                        if (rslt1 == null) return await interaction.reply({content: "Failed to claim redemption code, Please try again later!", flags: MessageFlags.Ephemeral});
                        if (rslt1.body.retcode !== 0) return await interaction.reply({content: `${rslt1.body.message}!`, flags: MessageFlags.Ephemeral});

                        let embed = new EmbedBuilder().setTitle("Redemption successful | ZenlessZoneZero").setColor(Colors.Green).setFields(
                            {name: "UID (InGame)", value: `${rslt.region[0].game_uid}`, inline: false},
                            {name: "Username (InGame)", value: `${rslt.region[0].nickname}`, inline: false},
                            {name: "Region", value: `${rslt.region[0].region_name}`, inline: false});

                        await interaction.reply({embeds: [embed], flags: MessageFlags.Ephemeral});
                    }
                    break;
                    case "bh3_global": {
                        await interaction.reply({content: "Coming soon!", flags: MessageFlags.Ephemeral});
                    }
                    break;
                }
            }
            break;
        }
    },
};

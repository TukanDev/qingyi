const {OS_PUB_OPERATION_HK4E_SG_API, OS_GACHA_LOG, OS_PUB_OPERATION_HKRPG_SG_API, OS_PUB_OPERATION_NAP_SG_API} = require("../../constants");
const {translateGachaType} = require("./helpers");
const {MessageFlags} = require("discord.js");
module.exports = {
    async hk4eGetGachaLog(interaction, gachaType, pages, gameBiz, authkey) {
        var ret = null;
        let endId = 0;
        let final = []
        try {
            for (const page of pages) {
                let rsp = await fetch(`${OS_PUB_OPERATION_HK4E_SG_API}/${OS_GACHA_LOG.hk4e}?authkey=${encodeURIComponent(authkey)}&page=${page}&size=20&init_type=${translateGachaType(gameBiz, gachaType)}&gacha_type=${translateGachaType(gameBiz, gachaType)}&authkey_ver=1&sign_type=2&game_biz=${gameBiz}&end_id=${endId}&lang=en`, {
                    method: 'GET',
                    headers: {'Origin': 'https://gs.hoyoverse.com'}
                });

                ret = await rsp.json();

                if (ret.data.list[ret.data.list.length-1] === undefined || ret.data.list.length === 0) return {body: final};

                if (ret.retcode !== 0) return await interaction.editReply({content: `${ret.message}`, flags: MessageFlags.Ephemeral});

                endId = ret.data.list[ret.data.list.length-1].id;

                ret.data.list.forEach(item => {
                    final.push(item)
                });
            }
            return {body: final};
        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async hkrpgGetGachaLog(interaction, gachaType, pages, gameBiz, authkey) {
        var ret = null;
        let endId = 0;
        let final = []
        try {
            for (const page of pages) {
                let rsp = await fetch(`${OS_PUB_OPERATION_HKRPG_SG_API}/${OS_GACHA_LOG.hkrpg}?authkey=${encodeURIComponent(authkey)}&page=${page}&size=20&default_gacha_type=${translateGachaType(gameBiz, gachaType)}&gacha_type=${translateGachaType(gameBiz, gachaType)}&authkey_ver=1&sign_type=2&game_biz=${gameBiz}&end_id=${endId}&lang=en`, {
                    method: 'GET',
                    headers: {'Origin': 'https://gs.hoyoverse.com'}
                });

                ret = await rsp.json();

                if (ret.data.list[ret.data.list.length-1] === undefined || ret.data.list.length === 0) return {body: final};

                if (ret.retcode !== 0) return await interaction.editReply({content: `${ret.message}`, flags: MessageFlags.Ephemeral});

                endId = ret.data.list[ret.data.list.length-1].id;

                ret.data.list.forEach(item => {
                    final.push(item)
                });
            }
            return {body: final};
        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async napGetGachaLog(interaction, gachaType, pages, gameBiz, authkey) {
        var ret = null;
        let endId = 0;
        let final = []
        try {
            for (const page of pages) {
                let rsp = await fetch(`${OS_PUB_OPERATION_NAP_SG_API}/${OS_GACHA_LOG.nap}?authkey=${encodeURIComponent(authkey)}&page=${page}&size=20&init_log_gacha_type=${translateGachaType(gameBiz, gachaType)}&init_log_gacha_base_type=${translateGachaType(gameBiz, gachaType)}&authkey_ver=1&sign_type=2&game_biz=${gameBiz}&end_id=${endId}&lang=en&gacha_type=${translateGachaType(gameBiz, gachaType)}&real_gacha_type=${translateGachaType(gameBiz, gachaType)}`, {
                    method: 'GET',
                    headers: {'Origin': 'https://gs.hoyoverse.com'}
                });

                ret = await rsp.json();

                if (ret.data.list[ret.data.list.length-1] === undefined || ret.data.list.length === 0) return {body: final};

                if (ret.retcode !== 0) return await interaction.editReply({content: `${ret.message}`, flags: MessageFlags.Ephemeral});

                endId = ret.data.list[ret.data.list.length-1].id;

                ret.data.list.forEach(item => {
                    final.push(item)
                });
            }
            return {body: final};
        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
}
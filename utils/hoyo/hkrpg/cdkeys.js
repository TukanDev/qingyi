const {OS_WEB_EXCHANGE_CD_KEY_HKRPG, OS_SG_HKRPG_HOYOVERSE_API,
    OS_SG_PUB_API,
    OS_SOL_HKRPG_SIGN,
    OS_SOL_ACTS,
    OS_SOL_HKRPG_INFO,
    OS_SOL_HKRPG_HOME, OS_HOYOLAB_BBS_API, OS_CD_KEY_LIST
} = require("../../../constants");
const {parseCookiesToHeader, translateRegion} = require("../helpers");
module.exports = {
    async hkrpgWebExchangeCdKey(gameUid, region, cdKey, gameBiz, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_HKRPG_HOYOVERSE_API}/${OS_WEB_EXCHANGE_CD_KEY_HKRPG}?uid=${gameUid}&region=${translateRegion(gameBiz, region)}&lang=en&cdkey=${cdKey}&game_biz=${gameBiz}`, {
                method: 'POST',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies)},
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async hkrpgLunaSign(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_SOL_HKRPG_SIGN}?lang=en-us&act_id=${OS_SOL_ACTS.hkrpg}`, {
                method: 'POST',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/", 'x-rpc-signgame': "hkrpg", 'x-rpc-client_type': 5, 'x-rpc-platform': 4},
                body: JSON.stringify({act_id: `${OS_SOL_ACTS.hkrpg}`, lang: 'en-us'}),
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async hkrpgLunaSignInfo(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_SOL_HKRPG_INFO}?lang=en-us&act_id=${OS_SOL_ACTS.hkrpg}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/", 'x-rpc-signgame': "hkrpg", 'x-rpc-client_type': 5, 'x-rpc-platform': 4}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async hkrpgLunaSignHome(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_SOL_HKRPG_HOME}?lang=en-us&act_id=${OS_SOL_ACTS.hkrpg}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/", 'x-rpc-signgame': "hkrpg", 'x-rpc-client_type': 5, 'x-rpc-platform': 4}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async hkrpgListCdKeys(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_HOYOLAB_BBS_API}/${OS_CD_KEY_LIST}?game_id=6`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'x-rpc-client_type': 5, 'x-rpc-platform': 4},
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
}
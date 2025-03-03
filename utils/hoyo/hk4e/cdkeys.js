const {OS_SG_HK4E_HOYOVERSE_API, OS_WEB_EXCHANGE_CD_KEY_HK4E_NAP,
    OS_SG_HK4E_HOYOLAB_API,
    OS_SOL_HK4E_SIGN,
    OS_SOL_ACTS,
    OS_SOL_HK4E_INFO,
    OS_SOL_HK4E_HOME, OS_HOYOLAB_BBS_API, OS_CD_KEY_LIST
} = require("../../../constants");
const {translateRegion, parseCookiesToHeader} = require("../helpers");
module.exports = {
    async hk4eWebExchangeCdKey(gameUid, region, cdKey, gameBiz, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_HK4E_HOYOVERSE_API}/${OS_WEB_EXCHANGE_CD_KEY_HK4E_NAP}?uid=${gameUid}&region=${translateRegion(gameBiz, region)}&lang=en&cdkey=${cdKey}&game_biz=${gameBiz}`, {
                method: 'GET',
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
    async solSign(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_HK4E_HOYOLAB_API}/${OS_SOL_HK4E_SIGN}?lang=en-us`, {
                method: 'POST',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/", 'x-rpc-signgame': "hk4e", 'x-rpc-client_type': 5, 'x-rpc-platform': 4},
                body: JSON.stringify({act_id: `${OS_SOL_ACTS.hk4e}`})
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async solSignInfo(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_HK4E_HOYOLAB_API}/${OS_SOL_HK4E_INFO}?lang=en-us&act_id=${OS_SOL_ACTS.hk4e}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/", 'x-rpc-signgame': "hk4e", 'x-rpc-client_type': 5, 'x-rpc-platform': 4}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async solSignHome(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_HK4E_HOYOLAB_API}/${OS_SOL_HK4E_HOME}?lang=en-us&act_id=${OS_SOL_ACTS.hk4e}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/", 'x-rpc-signgame': "hk4e", 'x-rpc-client_type': 5, 'x-rpc-platform': 4}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async hk4eListCdKeys(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_HOYOLAB_BBS_API}/${OS_CD_KEY_LIST}?game_id=2`, {
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
const {OS_SG_PUB_API, OS_SOL_BH3_SIGN, OS_SOL_ACTS, OS_SOL_BH3_INFO, OS_SOL_BH3_HOME, OS_HOYOLAB_BBS_API,
    OS_CD_KEY_LIST
} = require("../../../constants");
const {parseCookiesToHeader} = require("../helpers");
module.exports = {
    async bh3ManiSign(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_SOL_BH3_SIGN}?lang=en-us`, {
                method: 'POST',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/"},
                body: JSON.stringify({act_id: `${OS_SOL_ACTS.bh3}`})
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async bh3ManiSignInfo(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_SOL_BH3_INFO}?lang=en-us&act_id=${OS_SOL_ACTS.bh3}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async bh3ManiSignHome(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_SOL_BH3_HOME}?lang=en-us&act_id=${OS_SOL_ACTS.bh3}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async bh3ListCdKeys(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_HOYOLAB_BBS_API}/${OS_CD_KEY_LIST}?game_id=1`, {
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
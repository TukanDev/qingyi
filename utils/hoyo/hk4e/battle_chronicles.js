const {OS_SG_PUB_API, OS_BATTLE_CHONICLES} = require("../../../constants");
const {parseCookiesToHeader, translateRegion} = require("../helpers");
module.exports = {
    async hk4eBattleChroniclesRecordCard(uid, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hk4e.gameRecordCard}?uid=${uid}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async hk4eBattleChroniclesIndex(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hk4e.index}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async hk4eBattleChroniclesSpiralAbyss(gameUid, gameBiz, gameRegion, schedule, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hk4e.spiralAbyss}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&schedule_type=${schedule}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async hk4eBattleChroniclesImaginariumTheatre(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hk4e.imaginariumTheatre}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&need_detail=true`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async hk4eBattleChroniclesCharactersList(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hk4e.charactersList}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}`, {
                method: 'POST',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
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
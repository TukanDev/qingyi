const {OS_BATTLE_CHONICLES, OS_HOYOLAB_BBS_API, DS_GLOBAL_SALT} = require("../../../constants");
const {parseCookiesToHeader, translateRegion, generateOSDynamicSecret} = require("../helpers");
module.exports = {
    async bh3BattleChroniclesRecordCard(uid, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_HOYOLAB_BBS_API}/${OS_BATTLE_CHONICLES.bh3.gameRecordCard}?uid=${uid}`, {
                method: 'GET',
                credentials: "include",
                headers: {'DS': generateOSDynamicSecret(DS_GLOBAL_SALT), 'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async bh3BattleChroniclesIndex(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_HOYOLAB_BBS_API}/${OS_BATTLE_CHONICLES.bh3.index}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}`, {
                method: 'GET',
                credentials: "include",
                headers: {'DS': generateOSDynamicSecret(DS_GLOBAL_SALT), 'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async bh3BattleChroniclesArenaReport(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_HOYOLAB_BBS_API}/${OS_BATTLE_CHONICLES.bh3.arenaReport}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&schedule_type=1`, {
                method: 'GET',
                credentials: "include",
                headers: {'DS': generateOSDynamicSecret(DS_GLOBAL_SALT), 'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async bh3BattleChroniclesNewAbyss(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_HOYOLAB_BBS_API}/${OS_BATTLE_CHONICLES.bh3.newAbyss}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&schedule_type=1`, {
                method: 'GET',
                credentials: "include",
                headers: {'DS': generateOSDynamicSecret(DS_GLOBAL_SALT), 'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async bh3BattleChroniclesElysianRealm(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_HOYOLAB_BBS_API}/${OS_BATTLE_CHONICLES.bh3.elysianRealm}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&schedule_type=1`, {
                method: 'GET',
                credentials: "include",
                headers: {'DS': generateOSDynamicSecret(DS_GLOBAL_SALT), 'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async bh3BattleChroniclesCharacters(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_HOYOLAB_BBS_API}/${OS_BATTLE_CHONICLES.bh3.characters}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}`, {
                method: 'GET',
                credentials: "include",
                headers: {'DS': generateOSDynamicSecret(DS_GLOBAL_SALT), 'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
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
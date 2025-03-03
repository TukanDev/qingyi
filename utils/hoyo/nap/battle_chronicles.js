const {OS_SG_PUB_API, OS_BATTLE_CHONICLES, OS_HOYOLAB_BBS_API} = require("../../../constants");
const {parseCookiesToHeader, translateRegion} = require("../helpers");
module.exports = {
    async napBattleChroniclesRecordCard(uid, gameBiz, filter_region, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_HOYOLAB_BBS_API}/${OS_BATTLE_CHONICLES.nap.gameRecordCard}?uid=${uid}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us"}
            });

            ret = await rsp.json();
            let filtered = ret.data["list"].filter(r => r.region === translateRegion(gameBiz, filter_region));
            return {body: ret, region: filtered};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async napBattleChroniclesIndex(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.nap.index}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async napBattleChroniclesDeadlyAssault(gameUid, gameBiz, gameRegion, schedule, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.nap.deadlyAssault}?uid=${gameUid}&region=${translateRegion(gameBiz, gameRegion)}&schedule_type=${schedule}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async napBattleChroniclesShiyuDefense(gameUid, gameBiz, gameRegion, schedule, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.nap.shiyuDefense}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&schedule_type=${schedule}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async napBattleChroniclesLostVoid(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.nap.lostVoid}?uid=${gameUid}&region=${translateRegion(gameBiz, gameRegion)}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async napBattleChroniclesWitheredDomain(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.nap.witheredDomain}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us"}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async napBattleChroniclesAvatarsBasic(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.nap.avatarBasic}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us"}
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
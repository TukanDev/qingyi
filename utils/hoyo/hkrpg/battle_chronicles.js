const {OS_SG_PUB_API, OS_BATTLE_CHONICLES, DS_GLOBAL_SALT} = require("../../../constants");
const {parseCookiesToHeader, translateRegion, generateOSDynamicSecret} = require("../helpers");
module.exports = {
    async hkrpgBattleChroniclesRecordCard(uid, gameBiz, filter_region, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hkrpg.gameRecordCard}?uid=${uid}`, {
                method: 'GET',
                credentials: "include",
                headers: {'DS': generateOSDynamicSecret(DS_GLOBAL_SALT), 'Cookie': parseCookiesToHeader(cookies), 'Accept-language': "en-US,en;q=0.5", 'Referer': "https://act.hoyolab.com/", 'x-rpc-lang': "en-us", 'x-rpc-language': "en-us", 'x-rpc-app_version':'1.5.0', 'x-rpc-client_type': "5", 'x-rcp-platform': "4"}
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
    async hkrpgBattleChroniclesIndex(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hkrpg.index}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}`, {
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
    async hkrpgBattleChroniclesForgottenHall(gameUid, gameBiz, gameRegion, schedule, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hkrpg.forgottenHall}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&schedule_type=${schedule}&need_all=true`, {
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
    async hkrpgBattleChroniclesPureFiction(gameUid, gameBiz, gameRegion, schedule, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hkrpg.pureFiction}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&schedule_type=${schedule}&need_all=true`, {
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
    async hkrpgBattleChroniclesApocalypticShadow(gameUid, gameBiz, gameRegion, schedule, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hkrpg.apocalypticShadow}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&schedule_type=${schedule}&need_all=true`, {
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
    async hkrpgBattleChroniclesDivergentUniverse(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hkrpg.divergentUniverse}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&need_detail=true`, {
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
    async hkrpgBattleChroniclesSimulatedUniverse(gameUid, gameBiz, gameRegion, schedule, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hkrpg.simulatedUniverse}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&schedule_type=3&need_detail=true`, {
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
    async hkrpgBattleChroniclesUnknowableDomain(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hkrpg.unknowableDomain}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}`, {
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
    async hkrpgBattleChroniclesSwarmDisaster(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hkrpg.swarmDisaster}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&need_detail=true`, {
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
    async hkrpgBattleChroniclesGoldAndGears(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hkrpg.goldAndGears}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&need_detail=true`, {
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
    async hkrpgBattleChroniclesAvatarInfo(gameUid, gameBiz, gameRegion, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_BATTLE_CHONICLES.hkrpg.avatarInfo}?role_id=${gameUid}&server=${translateRegion(gameBiz, gameRegion)}&need_wiki=false`, {
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
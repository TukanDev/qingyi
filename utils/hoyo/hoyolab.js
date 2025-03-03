const {
    OS_SG_PUB_API,
    OS_WEB_LOGIN,
    OS_APP_ID,
    OS_WEB_LOGOUT,
    OS_COOKIEV2_REFRESH,
    DS_APP_LOGIN_SALT,
    OS_WEB_API,
    OS_COOKIEV2_ACCOUNT_INFO,
    OS_TAKUMI_API,
    OS_GAME_ROLES_BY_COOKIE, OS_SG_PUB_HOYOVERSE_API, OS_TRUSTED_DEVICES_BY_COOKIE, OS_HOYOLAB_BBS_API,
    OS_BATTLE_CHRONICLES_PRIVACY_SETTINGS
} = require("../../constants");
const {encryptCredentials, parseCookies, parseCookiesToHeader, translateRegion, generateOSDynamicSecret,
    gameBizToGameID, convertDataSwitch
} = require("./helpers");

module.exports = {
    async login(username, password) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_WEB_LOGIN}`, {
                method: 'POST',
                headers: {
                    'x-rpc-source': "v2.webLogin",
                    'x-rpc-device_fp': "38d7ee588249d",
                    'x-rpc-sdk_version': "2.16.1",
                    'x-rpc-app_id': OS_APP_ID,
                    'x-rpc-game_biz': "bbs_oversea",
                    'x-rpc-language': "en-us",
                    'x-rpc-client_type': "4",
                    'x-rpc-referrer': "https://account.hoyolab.com/",
                    'Origin': "https://account.hoyolab.com",
                    'Referer': "https://account.hoyolab.com/"
                },
                body: JSON.stringify({
                    account: encryptCredentials(username, 1),
                    password: encryptCredentials(password, 1),
                    token_type: 6
                }),
            });

            ret = await rsp.json();
            return {body: ret, cookies: parseCookies(rsp.headers.getSetCookie())};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async logout(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_WEB_LOGOUT}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Cookie': parseCookiesToHeader(cookies),
                    'x-rpc-source': "v2.webLogin",
                    'x-rpc-device_fp': "38d7ee588249d",
                    'x-rpc-sdk_version': "2.16.1",
                    'x-rpc-app_id': OS_APP_ID,
                    'x-rpc-game_biz': "bbs_oversea",
                    'x-rpc-language': "en-us",
                    'x-rpc-client_type': "4",
                    'x-rpc-referrer': "https://www.hoyolab.com/circles/2/30/feed?page_type=30&page_sort=hot",
                    'x-rpc-aigis_v4': true,
                    'Origin': "https://www.hoyolab.com",
                    'Referer': "https://www.hoyolab.com/"
                }
            });

            ret = await rsp.json();
            return {body: ret, cookies: parseCookies(rsp.headers.getSetCookie())};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async refreshCookieTokenV2(cookies, tokenTypes) {
        var ret = null;
        try {
            // NOTE: This endpoint requires "stoken" which can be obtained by converting "game_token" you get by game client SDK server endpoint!
            let rsp = await fetch(`${OS_SG_PUB_API}/${OS_COOKIEV2_REFRESH}`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'DS': generateOSDynamicSecret(DS_APP_LOGIN_SALT),
                    'x-rpc-app_id': OS_APP_ID,
                    'Cookie': parseCookiesToHeader(cookies)
                },
                body: JSON.stringify({dst_token_types: tokenTypes}),
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async accountInfo(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_WEB_API}/${OS_COOKIEV2_ACCOUNT_INFO}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies)}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async gameRolesByCookie(gameBiz, filter_region, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_TAKUMI_API}/${OS_GAME_ROLES_BY_COOKIE}?game_biz=${gameBiz}`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Cookie': parseCookiesToHeader(cookies),
                    'Referer': "https://webstatic-sea.mihoyo.com"
                }
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
    async accountTrustedDevicesInfo(cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_SG_PUB_HOYOVERSE_API}/${OS_TRUSTED_DEVICES_BY_COOKIE}`, {
                method: 'GET',
                credentials: "include",
                headers: {'Cookie': parseCookiesToHeader(cookies)}
            });

            ret = await rsp.json();
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
    async accountBattleChroniclesPrivacySettings(setting, value, gameBiz, cookies) {
        var ret = null;
        try {
            let rsp = await fetch(`${OS_HOYOLAB_BBS_API}/${OS_BATTLE_CHRONICLES_PRIVACY_SETTINGS}`, {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify({switch_id: convertDataSwitch(gameBiz, setting), is_public: value, game_id: gameBizToGameID(gameBiz)}),
                headers: {'Cookie': parseCookiesToHeader(cookies)}
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
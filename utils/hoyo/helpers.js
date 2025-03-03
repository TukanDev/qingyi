const {LOGIN_KEY_TYPE_1, LOGIN_KEY_TYPE_2} = require("../../constants");
const crypto = require("crypto");
const base64 = require("base64-js");
module.exports = {
    encryptCredentials(text, keyType) {
        const publicKey = keyType === 1 ? LOGIN_KEY_TYPE_1 : LOGIN_KEY_TYPE_2;
        const encrypted = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        }, Buffer.from(text, 'utf8'));
        return base64.fromByteArray(encrypted);
    },
    parseCookies(cookies) {
        var formatted = [];
        cookies.forEach(cookie => {
            let splitted = cookie.split(";")[0].split("=")[1];
            formatted.push(splitted);
        })

        return {
            cookie_token_v2: formatted[0],
            account_mid_v2: formatted[1],
            account_id_v2: formatted[2],
            ltoken_v2: formatted[3],
            ltmid_v2: formatted[4],
            ltuid_v2: formatted[5]
        };
    },
    parseCookiesToHeader(cookies) {
        let final = [];
        var keyss = [];
        Object.keys(cookies).forEach(cookie => {
            keyss.push(cookie);
        });

        keyss.forEach((key) => {
            final.push(`${key}=${cookies[key]}`);
        })

        return final.join(";");
    },
    generateOSDynamicSecret(saltType) {
        let r = generateRandomString(6)
        let t = parseInt(Math.floor(Date.now()/1000))

        let hash = crypto.createHash("md5").update(`salt=${saltType}&t=${t}&r=${r}`)
        return `${t},${r},${hash.digest('hex')}`;
    },
    // Get request to https://api-account-os.hoyoverse.com/account/binding/api/getAllRegions?game_biz=<game_biz code> NO AUTHENTICATION NEEDED
    translateRegion(gameBiz, region) {
        switch (gameBiz) {
            case 'hk4e_global': {
                switch (region) {
                    case 'os_euro':
                        return "os_euro";
                    case 'os_usa':
                        return "os_usa";
                    case 'os_asia':
                        return "os_asia";
                    case 'os_cht':
                        return "os_cht";
                }
            }
            break;
            case 'hkrpg_global': {
                switch (region) {
                    case 'os_euro':
                        return "prod_official_eur";
                    case 'os_usa':
                        return "prod_official_usa";
                    case 'os_asia':
                        return "prod_official_asia";
                    case 'os_cht':
                        return "prod_official_cht";
                }
            }
            break;
            case 'nap_global': {
                switch (region) {
                    case 'os_euro':
                        return "prod_gf_eu";
                    case 'os_usa':
                        return "prod_gf_us";
                    case 'os_asia':
                        return "prod_gf_jp";
                    case 'os_cht':
                        return "prod_gf_sg";
                }
            }
            break;
            case 'bh3_global': {
                switch (region) {
                    case 'os_euro':
                        return "eur01";
                    case 'os_usa':
                        return "usa01";
                    case 'os_asia':
                        return "overseas01";
                    // maps to traditional chinese server
                    case 'os_cht':
                        return "asia01";
                }
            }
            break;
        }
    },
    bh3StarToRarity(star) {
        switch (star) {
            case 1:
                return "B";
            case 2:
                return "A";
            case 3:
                return "S";
            case 4:
                return "SS";
        }
    },
    napStarToRarity(star) {
        switch (star) {
            case "2":
                return "B";
            case "3":
                return "A";
            case "4":
                return "S";
        }
    },
    gameBizToGameID(gameBiz) {
        switch (gameBiz) {
            case "hk4e_global":
                return 2;
            case "hkrpg_global":
                return 6;
            case "nap_global":
                return 8;
            case "bh3_global":
                return 1;
        }
    },
    convertDataSwitch(gameBiz, dataSwitch) {
        switch (gameBiz) {
            case "hk4e_global": {
                switch (dataSwitch) {
                    case "1":
                        return 1;
                    case "2":
                        return 2;
                    case "3":
                        return 3;
                }
            }
            break;
            case "hkrpg_global": {
                switch (dataSwitch) {
                    case "1":
                        return 1;
                    case "2":
                        return 4;
                    case "3":
                        return 4; // fallback to character details switch
                }
            }
            break;
            case "nap_global": {
                switch (dataSwitch) {
                    case "1":
                        return 1;
                    case "2":
                        return 6;
                    case "3":
                        return 7;
                }
            }
            break;
            case "bh3_global": {
                switch (dataSwitch) {
                    case "1":
                        return 1;
                    case "2":
                        return 2;
                    case "3":
                        return 2; // fallback to character details switch
                }
            }
            break;
        }
    },
    gameBizBySubCommand(subCommand) {
        switch (subCommand) {
            case "genshinimpact":
                return "hk4e_global";
            case "starrail":
                return "hkrpg_global";
            case "zenlesszonezero":
                return "nap_global";
            case "honkaiimpact":
                return "bh3_global";
        }
    },
    translateGachaType(gameBiz, gachaType) {
        switch (gameBiz) {
            case 'hk4e_global': {
                switch (gachaType) {
                    case 'lim01':
                        return "301"; // character 1 & 2
                    case 'lim02':
                        return "302"; // weapon
                    case 'perm01':
                        return "200"; // permanent
                    case 'lim03':
                        return "500"; // chronicle
                    case 'perm02':
                        return "200"; // fallback to permanent
                }
            }
            break;
            case 'hkrpg_global': {
                switch (gachaType) {
                    case 'lim01':
                        return "11"; // character
                    case 'lim02':
                        return "12"; // weapon
                    case 'perm01':
                        return "2"; // permanent
                    case 'lim03':
                        return "1"; // stellar warp
                    case 'perm02':
                        return "2"; // fallback to permanent
                }
            }
            break;
            case 'nap_global': {
                switch (gachaType) {
                    case 'lim01':
                        return "2"; // character 1 & 2
                    case 'lim02':
                        return "3"; // weapon
                    case 'perm01':
                        return "1"; // permanent
                    case 'perm02':
                        return "5"; // bangboo
                    case 'lim03':
                        return "2"; // fallback to character as its non-existent
                }
            }
            break;
            case 'bh3_global': {
                switch (gachaType) {
                    case 'lim01':
                        return "eur01"; // character
                    case 'lim02':
                        return "usa01"; // weapon
                    case 'perm01':
                        return "overseas01"; // permanent
                    case 'perm02':
                        return "asia01"; // fallback to permanent
                    case 'lim03':
                        return "asia02"; // fallback to character
                }
            }
            break;
        }
    },
    extractGachaLogAuthKey(gameBiz, url) {
        const urlParams = new URLSearchParams(url);

        switch(gameBiz) {
            case "hk4e_global":
                return {auth_key: urlParams.get('authkey'), init_type: urlParams.get('init_type'), gacha_id: urlParams.get('gacha_id'), version: urlParams.get('game_version') };
            case "hkrpg_global":
                return {auth_key: urlParams.get('authkey')};
            case "nap_global":
                return {auth_key: urlParams.get('authkey'), init_type: urlParams.get('init_log_gacha_type'), gacha_id: urlParams.get('gacha_id') };
            case "bh3_global":
                return {auth_key: "..."};
        }
    },
}

function generateRandomString(myLength) {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    const randomArray = Array.from({ length: myLength }, (v, k) => chars[Math.floor(Math.random() * chars.length)]);
    return randomArray.join("");
}
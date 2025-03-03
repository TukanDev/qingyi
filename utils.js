const {EmbedBuilder, ButtonBuilder, Colors} = require("discord.js");
const {OS_SOL_REWARDS_PAGE_SIZE, OS_BATTLE_CHRONICLES_PAGE_SIZE, OS_TRUSTED_DEVICES_PAGE_SIZE,
} = require("./constants");
const {bh3StarToRarity} = require("./utils/hoyo/helpers");

module.exports = {
  validateEmail(email) {
  let reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'i');
  return reg.test(email);
},
forwardButton: new ButtonBuilder().setStyle("Primary").setLabel("Next page").setCustomId("embed_page_forward"),
backButton: new ButtonBuilder().setStyle("Secondary").setLabel("Previous page").setCustomId("embed_page_backward"),
    async generateEmbedHoyoTrustedDevices(start, data) {
        let current = data.slice(start, start + OS_TRUSTED_DEVICES_PAGE_SIZE);

        return new EmbedBuilder({
            title: `Currently trusted devices on this account! (${start + 1}-${start + current.length}/${data.length} pages)`,
            color: Colors.Green,
            footer: {text: "To remove trusted device please login to account.hoyoverse.com"},
            fields: await Promise.all(
                current.map(async (e) => ({
                    name: `${e.user_device_id} | ${e.device_name}`,
                    value: `
                    Device model: **${e.device_model}**
                    Current device: **${(e.is_current_device ? 'Yes' : 'No')}**
                    Last login time: **${new Date(e.last_login_at*1000).toDateString()}**`, inline: true}))
            )
        })
    },
    async generateEmbedCheckIn(start, data) {
        const current = data.slice(start, start + OS_SOL_REWARDS_PAGE_SIZE);

        return new EmbedBuilder({
            title: `Showing ${start + 1}-${start + current.length} out of ${data.length} Daily check-in rewards`,
            color: Colors.Green,
            fields: await Promise.all(
                current.map(async (e, index) => ({
                        name: `Day ${index + 1 + start}`,
                        value: `Reward: **${e.name}**\nAmount: **x${e.cnt}**`,
                        inline: true}
                ))
            )
        })
    },
    async generateEmbedBcNapChars(start, data, name) {
        let current = data.slice(start, start + OS_BATTLE_CHRONICLES_PAGE_SIZE);

        return new EmbedBuilder({
            title: `${name}'s obtained Agents (${start + 1}-${start + current.length}/${data.length} pages)`,
            color: Colors.Green,
            footer: {text: `NOTE: This will not be complete list when querying other players, blame Hoyoverse!`},
            fields: await Promise.all(
                current.map(async (e) => ({
                    name: `${e.full_name_mi18n}`,
                    value: `
                    Name: **${e.name_mi18n}**
                    Faction: **${e.camp_name_mi18n}**
                    Level: **${e.level}**
                    Rarity: **${e.rarity}**`, inline: true}))
            )
        })
    },
    async generateEmbedBcHkrpgChars(start, data, name) {
        let current = data.slice(start, start + OS_BATTLE_CHRONICLES_PAGE_SIZE);

        return new EmbedBuilder({
            title: `${name}'s obtained Characters (${start + 1}-${start + current.length}/${data.length} pages)`,
            color: Colors.Green,
            footer: {text: `NOTE: This will not be complete list when querying other players, blame Hoyoverse!`},
            fields: await Promise.all(
                current.map(async (e) => ({
                    name: `${e.name}`,
                    value: `
                    Level: **${e.level}**
                    Rarity: **${e.rarity} star**
                    Element: **${e.element}**
                    Eidolons: **${e.ranks.filter(r => r.is_unlocked === true).length}**
                    Weapon: **${e.equip.name}**
                    Weapon level: **${e.equip.level}**
                    Weapon rarity: **${e.equip.rarity} star**
                    Weapon SuperImposition: **${e.equip.rank}**`, inline: true}))
            )
        })
    },
    async generateEmbedBcHk4eChars(start, data, name) {
        let current = data.slice(start, start + OS_BATTLE_CHRONICLES_PAGE_SIZE);

        return new EmbedBuilder({
            title: `${name}'s obtained Characters (${start + 1}-${start + current.length}/${data.length} pages)`,
            color: Colors.Green,
            footer: {text: `NOTE: This will not be complete list when querying other players, blame Hoyoverse!`},
            fields: await Promise.all(
                current.map(async (e) => ({
                    name: `${e.name}`,
                    value: `
                    Level: **${e.level}**
                    Rarity: **${e.rarity} star**
                    Element: **${e.element}**
                    Friendship level: **${e.fetter}**
                    Constellations: **${e.actived_constellation_num}**
                    Weapon: **${e.weapon.name}**
                    Weapon level: **${e.weapon.level}**
                    Weapon rarity: **${e.weapon.rarity} star**
                    Weapon refinement: **${e.weapon.affix_level}**`, inline: true}))
            )
        })
    },
    async generateEmbedBcBh3Chars(start, data, name) {
        let current = data.slice(start, start + OS_BATTLE_CHRONICLES_PAGE_SIZE);

        let stigmatadata = "";
        current.map((e) => {
            e.character.stigmatas.forEach(s => {
                stigmatadata += `Stigmata name: **${s.name}**
                Stigmata level: **${s.level}**
                Stigmata rarity: **${s.rarity}**/**${s.max_rarity}**
                `;
            })
        });

        return new EmbedBuilder({
            title: `${name}'s obtained Valkyries (${start + 1}-${start + current.length}/${data.length} pages)`,
            color: Colors.Green,
            footer: {text: `NOTE: This is the complete list, blame Hoyoverse for inconsistency!`},
            fields: await Promise.all(
                current.map(async (e) => ({
                    name: `${e.character.avatar.name}`,
                    value: `
                    Level: **${e.character.avatar.level}**
                    Rarity: **${bh3StarToRarity(e.character.avatar.star)}**
                    Weapon: **${e.character.weapon.name}**
                    Weapon level: **${e.character.weapon.level}**
                    Weapon rarity: **${e.character.weapon.rarity}**/**${e.character.weapon.max_rarity}**
                    **Stigmatas** (**${e.character.stigmatas.length}**/**3**):
                    ${stigmatadata}`, inline: true}))
            )
        })
    },
    async generateEmbedBcNapMewMew(start, data, name) {
        let current = data.slice(start, start + OS_BATTLE_CHRONICLES_PAGE_SIZE);

        let medals = "";
        current.map((e) => {
            e.medal_list.forEach(m => {
                medals += `${m.name} | Finished: ${m.is_finish ? '**Yes**' : '**No**'}\n`;
            })
        });

        return new EmbedBuilder({
            title: `${name}'s MewMew notes (${start + 1}-${start + current.length}/${data.length} pages)`,
            color: Colors.Green,
            fields: await Promise.all(
                current.map(async (e) => ({
                    name: `${e.name} | Progress: **${e.num}**/**${e.total}**`,
                    value: `${medals}`,
                    inline: true}))
            )
        })
    },
    async generateEmbedBcExploration(start, data, extradata, name) {
        let current = data.slice(start, start + OS_BATTLE_CHRONICLES_PAGE_SIZE);

        let regiondata = "";

        current.forEach((e) => {
            switch (e.id) {
                // chenyu vale
                case 10: {
                    regiondata += `
                    ${extradata.get("chenyu_upper").name}: **${percentage(extradata.get("chenyu_upper").exploration_percentage, 1000)}**%
                    ${extradata.get("chenyu_southern").name}: **${percentage(extradata.get("chenyu_southern").exploration_percentage, 1000)}**%
                    ${extradata.get("chenyu_laixin").name}: **${percentage(extradata.get("chenyu_laixin").exploration_percentage, 1000)}**%
                    ${e.offerings[0].name} level: **${e.offerings[0].level}**
                    ${e.boss_list[0].name} killed: x**${e.boss_list[0].kill_num}**`;
                }
                break;
                // chasm & underground mines
                case 6: {
                    regiondata += `
                    ${extradata.get("chasm_underground").name}: **${percentage(extradata.get("chasm_underground").exploration_percentage, 1000)}**%
                    ${e.offerings[0].name} level: **${e.offerings[0].level}**
                    ${e.boss_list[0].name} killed: x**${e.boss_list[0].kill_num}**`;
                }
                break;
                // mondstadt & dragonspine
                case 1: {
                    let monddata = "";
                    e.area_exploration_list.forEach(a => {
                        monddata += `${a.name}: **${percentage(a.exploration_percentage, 1000)}**%\n`
                    });
                    e.boss_list.forEach(a => {
                        monddata += `${a.name} killed: x**${a.kill_num}**\n`
                    });
                    monddata += `${extradata.get("dragonspine").boss_list[0].name} killed: x**${extradata.get("dragonspine").boss_list[0].kill_num}**`;

                    regiondata += `
                    Statue of Seven level: **${e.seven_statue_level}**
                    Reputation level: **${e.level}**
                    ${extradata.get("dragonspine").name}: **${percentage(extradata.get("dragonspine").exploration_percentage, 1000)}**%
                    Frostbearing tree level: **${extradata.get("dragonspine").level}**
                    ${monddata}
                    `;
                }
                break;
                // liyue
                case 2: {
                    let liyuedata = "";
                    e.area_exploration_list.forEach(a => {
                        liyuedata += `${a.name}: **${percentage(a.exploration_percentage, 1000)}**%\n`
                    });
                    e.boss_list.forEach(a => {
                        liyuedata += `${a.name} killed: x**${a.kill_num}**\n`
                    });

                    regiondata += `
                    Statue of Seven level: **${e.seven_statue_level}**
                    Reputation level: **${e.level}**
                    ${liyuedata}
                    `;
                }
                break;
                // inazuma & enkanomiya
                case 4: {
                    let inazumadata = "";
                    e.area_exploration_list.forEach(a => {
                        inazumadata += `${a.name}: **${percentage(a.exploration_percentage, 1000)}**%\n`
                    });
                    e.boss_list.forEach(a => {
                        inazumadata += `${a.name} killed: x**${a.kill_num}**\n`
                    });
                    inazumadata += `${extradata.get("enkanomiya").boss_list[0].name} killed: x**${extradata.get("enkanomiya").boss_list[0].kill_num}**`;

                    regiondata += `
                    Statue of Seven level: **${e.seven_statue_level}**
                    Reputation level: **${e.level}**
                    ${e.offerings[0].name} level: **${e.offerings[0].level}**
                    ${extradata.get("enkanomiya").name}: **${percentage(extradata.get("enkanomiya").exploration_percentage, 1000)}**%
                    ${inazumadata}
                    `;
                }
                break;
                // sumeru
                case 8: {
                    let sumerudata = "";
                    e.area_exploration_list.forEach(a => {
                        sumerudata += `${a.name}: **${percentage(a.exploration_percentage, 1000)}**%\n`
                    });
                    e.boss_list.forEach(a => {
                        sumerudata += `${a.name} killed: x**${a.kill_num}**\n`
                    });

                    regiondata += `
                    Statue of Seven level: **${e.seven_statue_level}**
                    Reputation level: **${e.level}**
                    ${e.offerings[0].name} level: **${e.offerings[0].level}**
                    ${e.offerings[1].name} level: **${e.offerings[1].level}**
                    ${sumerudata}
                    `;
                }
                break;
                // fontaine & sea of bygone eras
                case 9: {
                    let fontainedata = "";
                    e.area_exploration_list.forEach(a => {
                        fontainedata += `${a.name}: **${percentage(a.exploration_percentage, 1000)}**%\n`
                    });
                    e.boss_list.forEach(a => {
                        fontainedata += `${a.name} killed: x**${a.kill_num}**\n`
                    });

                    regiondata += `
                    Statue of Seven level: **${e.seven_statue_level}**
                    Reputation level: **${e.level}**
                    ${e.offerings[0].name} level: **${e.offerings[0].level}**
                    ${extradata.get("sea_of_bygone_eras").name}: **${percentage(extradata.get("sea_of_bygone_eras").exploration_percentage, 1000)}**%
                    ${fontainedata}
                    `;
                }
                break;
                // natlan
                case 15: {
                    let natlandata = "";
                    e.natan_reputation.tribal_list.forEach(a => {
                        natlandata += `${a.name} level: **${a.level}**\n`
                    });
                    e.area_exploration_list.forEach(a => {
                        natlandata += `${a.name}: **${percentage(a.exploration_percentage, 1000)}**%\n`
                    });
                    e.boss_list.forEach(a => {
                        natlandata += `${a.name} killed: x**${a.kill_num}**\n`
                    });

                    regiondata += `
                    Statue of Seven level: **${e.seven_statue_level}**
                    ${e.offerings[0].name} level: **${e.offerings[0].level}**
                    ${natlandata}
                    `;
                }
                break;
            }
        })

    return new EmbedBuilder({
        title: `${name}'s exploration statistics (${start + 1}-${start + current.length}/${data.length} pages)`,
        color: Colors.Green,
        fields: await Promise.all(
        current.map(async (e) => ({
        name: `${e.name} | Total: ${e.id !== 10 ? `${percentage(e.exploration_percentage, 1000)}%` : 'N/A'}`,
        value: `${regiondata}`,
        inline: true}))
        )
    })
    },
}

function percentage(partialValue, totalValue) {
return ((partialValue/totalValue) * 100).toFixed(2);
}

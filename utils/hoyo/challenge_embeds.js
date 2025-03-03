const {OS_BATTLE_CHRONICLES_PAGE_SIZE} = require("../../constants");
const {EmbedBuilder, Colors} = require("discord.js");
module.exports = {
    async generateEmbedBcHk4eChallenges(start, data, uid, name) {
        let current = data.slice(start, start + OS_BATTLE_CHRONICLES_PAGE_SIZE);

        let content = current[0].data;
        
        let fields = [];
        let embedtitle = "...";
        switch (current[0].id) {
            case 1: {
                let floordata = "";
                let defeatrank_char = "";
                let defeatrank_value = "";
                let damagerank_char = "";
                let damagerank_value = "";
                let takedamagerank_char = "";
                let takedamagerank_value = "";
                let normalskill_char = "";
                let normalskill_value = "";
                let energyskill_char = "";
                let energyskill_value = "";

                let start_time = new Date(content.start_time*1000);
                let end_time = new Date(content.end_time*1000);

                embedtitle = (current[0].cycle === "1") ? 'SpiralAbyss - Current Phase' : 'SpiralAbyss - Previous Phase'

                if (content.floors.length > 0) {
                    content.floors.forEach((floor) => {
                        floordata += `Floor ${floor.index} stars: **${floor.star}**/**${floor.max_star}**\n`;
                    });
                } else {
                    floordata = "No statistics";
                }

                if (content.defeat_rank.length > 0) {
                    defeatrank_char = `${content.defeat_rank[0].avatar_id}`;
                    defeatrank_value = `${content.defeat_rank[0].value}`;
                } else {
                    defeatrank_char = "**N/A**";
                    defeatrank_value = "**N/A**";
                }

                if (content.damage_rank.length > 0) {
                    damagerank_char = `${content.damage_rank[0].avatar_id}`;
                    damagerank_value = `${content.damage_rank[0].value}`;
                } else {
                    damagerank_char = "**N/A**";
                    damagerank_value = "**N/A**";
                }

                if (content.take_damage_rank.length > 0) {
                    takedamagerank_char = `${content.take_damage_rank[0].avatar_id}`;
                    takedamagerank_value = `${content.take_damage_rank[0].value}`;
                } else {
                    takedamagerank_char = "**N/A**";
                    takedamagerank_value = "**N/A**";
                }

                if (content.normal_skill_rank.length > 0) {
                    normalskill_char = `${content.normal_skill_rank[0].avatar_id}`;
                    normalskill_value = `${content.normal_skill_rank[0].value}`;
                } else {
                    normalskill_char = "**N/A**";
                    normalskill_value = "**N/A**";
                }

                if (content.energy_skill_rank.length > 0) {
                    energyskill_char = `${content.energy_skill_rank[0].avatar_id}`;
                    energyskill_value = `${content.energy_skill_rank[0].value}`;
                } else {
                    energyskill_char = "**N/A**";
                    energyskill_value = "**N/A**";
                }

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "Schedule start date", value: `${start_time.getFullYear()}-${("0" + (start_time.getMonth() + 1)).slice(-2)}-${("0" + start_time.getDate()).slice(-2)} ${("0" + start_time.getHours()).slice(-2)}:${("0" + start_time.getMinutes()).slice(-2)}`, inline: true},
                    {name: "Schedule end date", value: `${end_time.getFullYear()}-${("0" + (end_time.getMonth() + 1)).slice(-2)}-${("0" + end_time.getDate()).slice(-2)} ${("0" + end_time.getHours()).slice(-2)}:${("0" + end_time.getMinutes()).slice(-2)}`, inline: true},
                    {name: "Deepest floor", value: `${content.max_floor}`, inline: true},
                    {name: "Total win times", value: `${content.total_win_times}`, inline: true},
                    {name: "Total battle times", value: `${content.total_battle_times}`, inline: true},
                    {name: "Total stars", value: `${content.total_star}`, inline: true},
                    {name: "Has skipped floors", value: `${(content.is_just_skipped_floor)? 'Yes' : 'No'}`, inline: true},
                    {name: "Skipped floor(s)", value: `${(content.skipped_floor.length === 0) ? 'N/A' : content.skipped_floor}`, inline: true},
                    {name: "Floor statistics", value: `${floordata}`, inline: true},
                    {name: "Run statistics", value: `Most enemy defeats (${defeatrank_char}): **${defeatrank_value}**
                    Strongest single strike (${damagerank_char}): **${damagerank_value}**
                    Most damage taken (${takedamagerank_char}): **${takedamagerank_value}**
                    Elemental skills used (${normalskill_char}): **${normalskill_value}**
                    Elemental bursts used (${energyskill_char}): **${energyskill_value}**`, inline: true});
            }
            break;
            case 2: {
                let start_time = new Date();
                let end_time = new Date();

                let actreach = "**N/A**";
                let difficulty = "**N/A**";
                let ranking = "**N/A**";
                let medal = "**N/A**";
                let fantasiaflowers = "**N/A**";
                let avatarbonus = "**N/A**";
                let rentcnt = "**N/A**";

                switch (current[0].cycle) {
                    case "1": {
                        start_time = new Date(content.data[0].schedule.start_time*1000);
                        end_time = new Date(content.data[0].schedule.end_time*1000);

                        actreach = `${content.data[0].stat.max_round_id}`;
                        difficulty = `${content.data[0].stat.difficulty_id}`;
                        ranking = `${content.data[0].stat.heraldry}`;
                        medal = `${content.data[0].stat.medal_num}`;
                        fantasiaflowers = `${content.data[0].stat.coin_num}`;
                        avatarbonus = `${content.data[0].stat.avatar_bonus_num}`;
                        rentcnt = `${content.data[0].stat.rent_cnt}`;
                    }
                    break;
                    case "2": {
                        start_time = new Date(content.data[1].schedule.start_time*1000);
                        end_time = new Date(content.data[1].schedule.end_time*1000);

                        actreach = `${content.data[1].stat.max_round_id}`;
                        difficulty = `${content.data[1].stat.difficulty_id}`;
                        ranking = `${content.data[1].stat.heraldry}`;
                        medal = `${content.data[1].stat.medal_num}`;
                        fantasiaflowers = `${content.data[1].stat.coin_num}`;
                        avatarbonus = `${content.data[1].stat.avatar_bonus_num}`;
                        rentcnt = `${content.data[1].stat.rent_cnt}`;
                    }
                    break;
                }

                embedtitle = (current[0].cycle === "1") ? 'ImaginariumTheatre - Current Phase' : 'ImaginariumTheatre - Previous Phase'

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "Schedule start date", value: `${start_time.getFullYear()}-${("0" + (start_time.getMonth() + 1)).slice(-2)}-${("0" + start_time.getDate()).slice(-2)} ${("0" + start_time.getHours()).slice(-2)}:${("0" + start_time.getMinutes()).slice(-2)}`, inline: true},
                    {name: "Schedule end date", value: `${end_time.getFullYear()}-${("0" + (end_time.getMonth() + 1)).slice(-2)}-${("0" + end_time.getDate()).slice(-2)} ${("0" + end_time.getHours()).slice(-2)}:${("0" + end_time.getMinutes()).slice(-2)}`, inline: true},
                    {name: "Act reached", value: `${actreach}`, inline: true},
                    {name: "Difficulty", value: `${difficulty}`, inline: true},
                    {name: "Ranking", value: `${ranking}`, inline: true},
                    {name: "Challenge stellas", value: `${medal}`, inline: true},
                    {name: "Fantasia flowers used", value: `${fantasiaflowers}`, inline: true},
                    {name: "Triggered external audience support", value: `${avatarbonus} time(s)`, inline: true},
                    {name: "Supporting cast assisted other players", value: `${rentcnt} time(s)`, inline: true});
            }
            break;
        }

        return new EmbedBuilder({
            title: `${embedtitle} (${start + 1}-${start + current.length}/${data.length} pages)`,
            color: Colors.Green,
            fields: fields
        })
    },
    async generateEmbedBcNapChallenges(start, data, uid, name) {
        let current = data.slice(start, start + OS_BATTLE_CHRONICLES_PAGE_SIZE);

        let content = current[0].data;

        let fields = [];
        let embedtitle = "...";
        switch (current[0].id) {
            case 1: {
                let syear = "????";
                let smonth = "??";
                let sday = "??";
                let shour = "??";
                let sminute = "??";

                let eyear = "????";
                let emonth = "??";
                let eday = "??";
                let ehour = "??";
                let eminute = "??";

                let zzzfd = "";

                if (content.has_data) {
                    syear = content.start_time.year;
                    smonth = ("0" + content.start_time.month).slice(-2);
                    sday = ("0" + content.start_time.day).slice(-2);
                    shour = ("0" + content.start_time.hour).slice(-2);
                    sminute = ("0" + content.start_time.minute).slice(-2);

                    eyear = content.end_time.year;
                    emonth = ("0" + content.end_time.month).slice(-2);
                    eday = ("0" + content.end_time.day).slice(-2);
                    ehour = ("0" + content.end_time.hour).slice(-2);
                    eminute = ("0" + content.end_time.minute).slice(-2);

                    content.list.forEach(e => {
                        zzzfd += `Round score: **${e.score}**
                   Round stars: **${e.star}**/**${e.total_star}**
                   Round boss: **${e.boss[0].name}**
                   Round cleared at: **${e.challenge_time.year}-${("0" + e.challenge_time.month).slice(-2)}-${("0" + e.challenge_time.day).slice(-2)} ${("0" + e.challenge_time.hour).slice(-2)}:${("0" + e.challenge_time.minute).slice(-2)}**\n`;
                    });
                } else {
                    zzzfd = "No statistics";
                }

                embedtitle = (current[0].cycle === "1") ? 'DeadlyAssault - Current Phase' : 'DeadlyAssault - Previous Phase';

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "Schedule start date", value: `${syear}-${smonth}-${sday} ${shour}:${sminute}`, inline: true},
                    {name: "Schedule end date", value: `${eyear}-${emonth}-${eday} ${ehour}:${eminute}`, inline: true},
                    {name: "Total score", value: `${content.total_score}`, inline: true},
                    {name: "Total stars", value: `${content.total_star}`, inline: true},
                    {name: "Detailed statistics", value: `${zzzfd}`, inline: true});
            }
            break;
            case 2: {
                let start_time = new Date();
                let syear = start_time.getFullYear();
                let smonth = ("0" + (start_time.getMonth() + 1)).slice(-2);
                let sday = ("0" + start_time.getDate()).slice(-2);
                let shour = ("0" + start_time.getHours()).slice(-2);
                let sminute = ("0" + start_time.getMinutes()).slice(-2);

                let end_time = new Date();
                let eyear = end_time.getFullYear();
                let emonth = ("0" + (end_time.getMonth() + 1)).slice(-2);
                let eday = ("0" + end_time.getDate()).slice(-2);
                let ehour = ("0" + end_time.getHours()).slice(-2);
                let eminute = ("0" + end_time.getMinutes()).slice(-2);

                let zzzsdrd = "";
                let zzzsddd = "";

                if (content.has_data) {
                    start_time = new Date(content.begin_time*1000);
                    syear = start_time.getFullYear();
                    smonth = ("0" + (start_time.getMonth() + 1)).slice(-2);
                    sday = ("0" + start_time.getDate()).slice(-2);
                    shour = ("0" + start_time.getHours()).slice(-2);
                    sminute = ("0" + start_time.getMinutes()).slice(-2);

                    end_time = new Date(content.end_time*1000);
                    eyear = end_time.getFullYear();
                    emonth = ("0" + (end_time.getMonth() + 1)).slice(-2);
                    eday = ("0" + end_time.getDate()).slice(-2);
                    ehour = ("0" + end_time.getHours()).slice(-2);
                    eminute = ("0" + end_time.getMinutes()).slice(-2);

                    content.rating_list.forEach(e => {zzzsdrd += `Rating **${e.rating}**: x**${e.times}**\n`;});

                    content.all_floor_detail.forEach(e => {
                        let ct = new Date(e.challenge_time*1000);
                        zzzsddd += `**${e.zone_name}**:
                    Rating: **${e.rating}**
                    Challenge time: **${ct.getFullYear()}-${("0" + (ct.getMonth() + 1)).slice(-2)}-${("0" + ct.getDate()).slice(-2)} ${("0" + ct.getHours()).slice(-2)}:${("0" + ct.getMinutes()).slice(-2)}**
                    Node 1 time: **${e.node_1.battle_time}**
                    Node 2 time: **${e.node_2.battle_time}**\n`;
                    });
                } else {
                    zzzsdrd = "No statistics";
                    zzzsddd = "No statistics";
                }

                embedtitle = (current[0].cycle === "1") ? 'ShiyuDefense - Current Phase' : 'ShiyuDefense - Previous Phase';

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "Schedule start date", value: `${syear}-${smonth}-${sday} ${shour}:${sminute}`, inline: true},
                    {name: "Schedule end date", value: `${eyear}-${emonth}-${eday} ${ehour}:${eminute}`, inline: true},
                    {name: "Highest frontier", value: `${content.max_layer}`, inline: true},
                    {name: "Fastest 4-7 frontier time", value: `${content.fast_layer_time}`, inline: true},
                    {name: "Rating statistics", value: `${zzzsdrd}`, inline: true},
                    {name: "Detailed statistics", value: `${zzzsddd}`, inline: true});
            }
            break;
            case 3: {
                embedtitle = "LostVoid";
                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "License level", value: `${content.abyss_level.cur_level}/${content.abyss_level.max_level}`, inline: true},
                    {name: "Exploration log", value: `${content.abyss_task.cur_task}/${content.abyss_task.max_task}`, inline: true},
                    {name: "Bounty commissions", value: `${content.abyss_duty.cur_duty}/${content.abyss_duty.max_duty}`, inline: true},
                    {name: "Highest difficulty | Ether activity", value: `${content.abyss_max.max_name} | ${content.abyss_max.heat_count}/${content.abyss_max.max_count}`, inline: true},
                    {name: "Best clear time", value: `${content.abyss_max.best_time}`, inline: true});
            }
            break;
            case 4: {
                embedtitle = "WitheredDomain";
                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "License level", value: `${content.abyss_level.cur_level}/${content.abyss_level.max_level}`, inline: true},
                    {name: "Combat configuration", value: `${content.abyss_talent.cur_talent}/${content.abyss_talent.max_talent}`, inline: true},
                    {name: "Inferno reap", value: `Most damage dealt: **${content.abyss_throne.max_damage}**\n`, inline: true});
            }
            break;
        }

        return new EmbedBuilder({
            title: `${embedtitle} (${start + 1}-${start + current.length}/${data.length} pages)`,
            color: Colors.Green,
            fields: fields
        })
    },
    async generateEmbedBcBh3Challenges(start, data, uid) {
        let current = data.slice(start, start + OS_BATTLE_CHRONICLES_PAGE_SIZE);

        let content = current[0].data;

        let fields = [];
        let embedtitle = "...";
        switch (current[0].id) {
            case 1: {
                embedtitle = "BattleArena - Latest report";
                if (content.reports.length === 0) return fields.push({name: "No records", value: "No statistics available", inline: true});

                let ct = new Date(content.reports[0].time_second*1000);
                let bh3bad = [];
                let tmpchr = "";
                content.reports[0].battle_infos.forEach(e => {
                    e.lineup.forEach((lineup) => {
                        tmpchr += `Character: **${lineup.name}**\n`;
                    });

                    bh3bad.push({
                        name: `${e.boss.name}`,
                        value: `Round score: **${e.score}**
                        **Deployed team**:
                        ${tmpchr}Elf: **${(e.elf.name.length === 0) ? "No name provided!" : e.elf.name}**`, inline: true})

                    tmpchr = "";
                });

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Total score", value: `${content.reports[0].score}`, inline: true},
                    {name: "Completed at", value: `${ct.getFullYear()}-${("0" + (ct.getMonth() + 1)).slice(-2)}-${("0" + ct.getDate()).slice(-2)} ${("0" + ct.getHours()).slice(-2)}:${("0" + ct.getMinutes()).slice(-2)}`, inline: true},
                    {name: "Tier", value: `${content.reports[0].rank}`, inline: true},
                    {name: "Ranking percentage", value: `${content.reports[0].ranking_percentage}%`, inline: true});

                bh3bad.forEach((e) => fields.push(e));
            }
            break;
            case 2: {
                embedtitle = "Abyss - Latest report";
                if (content.reports.length === 0) return fields.push({name: "No records", value: "No statistics available", inline: true});

                let deploychars = "";
                content.reports[0].lineup.forEach(e => {
                    deploychars += `Character: **${e.name}**\n`;
                });
                deploychars += `Elf: **${content.reports[0].elf.name}**\n`;

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Total score", value: `${content.reports[0].score}`, inline: true},
                    {name: "Rank", value: `${content.reports[0].rank}`, inline: true},
                    {name: "Trophies", value: `${content.reports[0].cup_number} (+${content.reports[0].settled_cup_number})`, inline: true},
                    {name: "Tier", value: `${content.reports[0].level}`, inline: true},
                    {name: "Boss fought", value: `${content.reports[0].boss.name}`, inline: true},
                    {name: "Deployed team", value: `${deploychars}`, inline: true});

            }
            break;
            case 3: {
                embedtitle = "ElysianRealm - Latest report";
                if (content.records.length === 0) return fields.push({name: "No records", value: "No statistics available", inline: true});

                let ct = new Date(content.records[0].settle_time_second*1000);
                let suppchars = "";
                content.records[0].support_avatars.forEach(avatar => {
                    suppchars += `${avatar.name}\n`;
                });

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Best score", value: `${content.records[0].score}`, inline: true},
                    {name: "Completed at", value: `${ct.getFullYear()}-${("0" + (ct.getMonth() + 1)).slice(-2)}-${("0" + ct.getDate()).slice(-2)} ${("0" + ct.getHours()).slice(-2)}:${("0" + ct.getMinutes()).slice(-2)}`, inline: true},
                    {name: "Score multiplier", value: `${content.records[0].score_mutiple}`, inline: true},
                    //{name: "Enemy level", value: `${content.records[0].punish_level}`, inline: true},
                    {name: "Main character", value: `${content.records[0].main_avatar.name}`, inline: true},
                    {name: "Support characters", value: `${suppchars}`, inline: true},
                    {name: "Elf character", value: `${content.records[0].elf.name}`, inline: true});
            }
            break;
        }

        return new EmbedBuilder({
            title: `${embedtitle} (${start + 1}-${start + current.length}/${data.length} pages)`,
            color: Colors.Green,
            fields: fields
        })
    },
    async generateEmbedBcHkrpgChallenges(start, data, uid, name) {
        let current = data.slice(start, start + OS_BATTLE_CHRONICLES_PAGE_SIZE);

        let content = current[0].data;

        let fields = [];
        let embedtitle = "...";
        switch (current[0].id) {
            case 1: {
                embedtitle = (current[0].cycle === "1") ? 'ForgottenHall - Current Phase' : 'ForgottenHall - Previous Phase';

                let syear = "????";
                let smonth = "??";
                let sday = "??";
                let shour = "??";
                let sminute = "??";

                let eyear = "????";
                let emonth = "??";
                let eday = "??";
                let ehour = "??";
                let eminute = "??";

                let ff = [];

                if (content.has_data) {
                    syear = content.begin_time.year;
                    smonth = ("0" + content.begin_time.month).slice(-2);
                    sday = ("0" + content.begin_time.day).slice(-2);
                    shour = ("0" + content.begin_time.hour).slice(-2);
                    sminute = ("0" + content.begin_time.minute).slice(-2);

                    eyear = content.end_time.year;
                    emonth = ("0" + content.end_time.month).slice(-2);
                    eday = ("0" + content.end_time.day).slice(-2);
                    ehour = ("0" + content.end_time.hour).slice(-2);
                    eminute = ("0" + content.end_time.minute).slice(-2);

                    content.all_floor_detail.forEach(floor => {
                        ff.push({name: `${floor.name}`, value: `Cycles used: **${floor.round_num}**
                        Stars obtained: **${floor.star_num}**
                        Chaos mode: **${(floor.is_chaos) ? 'Yes' : 'No'}**
                        Quick clear: **${(floor.is_fast) ? 'Yes' : 'No'}**`, inline: true});
                    });
                } else {
                    ff.push({name: "No statistics", value: "No statistics to show", inline: true});
                }

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "Schedule start date", value: `${syear}-${smonth}-${sday} ${shour}:${sminute}`, inline: true},
                    {name: "Schedule end date", value: `${eyear}-${emonth}-${eday} ${ehour}:${eminute}`, inline: true},
                    {name: "Total stars", value: `${content.star_num}`, inline: true},
                    {name: "Max floor reached", value: `${content.max_floor}`, inline: true},
                    {name: "Times challenged", value: `${content.battle_num}`, inline: true});

                ff.forEach(f => fields.push(f));
            }
            break;
            case 2: {
                embedtitle = (current[0].cycle === "1") ? 'ApocalypticShadow - Current Phase' : 'ApocalypticShadow - Previous Phase';

                let ff = [];

                if (content.has_data) {
                    content.all_floor_detail.forEach(floor => {
                        ff.push({name: `${floor.name}`, value: `Stars obtained: **${floor.star_num}**
                        Quick clear: **${(floor.is_fast) ? 'Yes' : 'No'}**
                        Total score: **${parseInt(floor.node_1.score) + parseInt(floor.node_2.score)}**
                        1st half boss defeated: **${(floor.node_1.boss_defeated) ? 'Yes' : 'No'}**
                        2nd half boss defeated: **${(floor.node_2.boss_defeated) ? 'Yes' : 'No'}**`, inline: true});
                    });
                } else {
                    ff.push({name: "No statistics", value: "No statistics to show", inline: true});
                }

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "Total stars", value: `${content.star_num}`, inline: true},
                    {name: "Max floor reached", value: `${content.max_floor}`, inline: true},
                    {name: "Times challenged", value: `${content.battle_num}`, inline: true});

                ff.forEach(f => fields.push(f));
            }
            break;
            case 3: {
                embedtitle = (current[0].cycle === "1") ? 'PureFiction - Current Phase' : 'PureFiction - Previous Phase';

                let ff = [];

                if (content.has_data) {
                    content.all_floor_detail.forEach(floor => {
                        ff.push({name: `${floor.name}`, value: `Cycles used: **${floor.round_num}**
                        Stars obtained: **${floor.star_num}**
                        Quick clear: **${(floor.is_fast) ? 'Yes' : 'No'}**
                        Total score: **${parseInt(floor.node_1.score) + parseInt(floor.node_2.score)}**`, inline: true});
                    });
                } else {
                    ff.push({name: "No statistics", value: "No statistics to show", inline: true});
                }

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "Total stars", value: `${content.star_num}`, inline: true},
                    {name: "Max floor reached", value: `${content.max_floor}`, inline: true},
                    {name: "Times challenged", value: `${content.battle_num}`, inline: true});

                ff.forEach(f => fields.push(f));
            }
            break;
            case 4: {
                embedtitle = (current[0].cycle === "1") ? 'SimulatedUniverse - Current Phase' : 'SimulatedUniverse - Previous Phase';

                let syear = "????";
                let smonth = "??";
                let sday = "??";
                let shour = "??";
                let sminute = "??";

                let eyear = "????";
                let emonth = "??";
                let eday = "??";
                let ehour = "??";
                let eminute = "??";

                let ff = [];

                switch (current[0].cycle) {
                    case "1": {
                        if (content.current_record.basic !== null) {
                            syear = content.current_record.basic.schedule_begin.year;
                            smonth = ("0" + content.current_record.basic.schedule_begin.month).slice(-2);
                            sday = ("0" + content.current_record.basic.schedule_begin.day).slice(-2);
                            shour = ("0" + content.current_record.basic.schedule_begin.hour).slice(-2);
                            sminute = ("0" + content.current_record.basic.schedule_begin.minute).slice(-2);

                            eyear = content.current_record.basic.schedule_end.year;
                            emonth = ("0" + content.current_record.basic.schedule_end.month).slice(-2);
                            eday = ("0" + content.current_record.basic.schedule_end.day).slice(-2);
                            ehour = ("0" + content.current_record.basic.schedule_end.hour).slice(-2);
                            eminute = ("0" + content.current_record.basic.schedule_end.minute).slice(-2);

                            ff.push({name: "Schedule start date", value: `${syear}-${smonth}-${sday} ${shour}:${sminute}`, inline: true},
                                {name: "Schedule end date", value: `${eyear}-${emonth}-${eday} ${ehour}:${eminute}`, inline: true},
                                {name: "Current score", value: `${content.current_record.basic.current_rogue_score}`, inline: true},
                                {name: "Maximum score", value: `${content.current_record.basic.max_rogue_score}`, inline: true});
                        } else {
                            ff.push({name: "No statistics", value: "No statistics to show", inline: true});
                        }

                        // API does not seem to ever give you records even if you need_detail=true the request
                        /*if (content.current_record.has_data) {

                        } else {

                        }*/

                    }
                    break;
                    case "2": {
                        if (content.last_record.basic !== null) {
                            syear = content.last_record.basic.schedule_begin.year;
                            smonth = ("0" + content.last_record.basic.schedule_begin.month).slice(-2);
                            sday = ("0" + content.last_record.basic.schedule_begin.day).slice(-2);
                            shour = ("0" + content.last_record.basic.schedule_begin.hour).slice(-2);
                            sminute = ("0" + content.last_record.basic.schedule_begin.minute).slice(-2);

                            eyear = content.last_record.basic.schedule_end.year;
                            emonth = ("0" + content.last_record.basic.schedule_end.month).slice(-2);
                            eday = ("0" + content.last_record.basic.schedule_end.day).slice(-2);
                            ehour = ("0" + content.last_record.basic.schedule_end.hour).slice(-2);
                            eminute = ("0" + content.last_record.basic.schedule_end.minute).slice(-2);

                            ff.push({name: "Schedule start date", value: `${syear}-${smonth}-${sday} ${shour}:${sminute}`, inline: true},
                                {name: "Schedule end date", value: `${eyear}-${emonth}-${eday} ${ehour}:${eminute}`, inline: true},
                                {name: "Current score", value: `${content.last_record.basic.current_rogue_score}`, inline: true},
                                {name: "Maximum score", value: `${content.last_record.basic.max_rogue_score}`, inline: true});
                        } else {
                            ff.push({name: "No statistics", value: "No statistics to show", inline: true});
                        }

                        /*if (content.last_record.has_data) {

                        } else {

                        }*/

                    }
                    break;
                }
                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "Unlocked blessings", value: `${content.basic_info.unlocked_buff_num}`, inline: true},
                    {name: "Unlocked curios", value: `${content.basic_info.unlocked_miracle_num}`, inline: true},
                    {name: "Activated ability tree buffs", value: `${content.basic_info.unlocked_skill_points}`, inline: true});

                ff.forEach(f => fields.push(f));
            }
            break;
            case 5: {
                embedtitle = (current[0].cycle === "1") ? 'DivergentUniverse - Current Week' : 'DivergentUniverse - Last Week';

                let seasons = "";
                let ff = [];

                switch (current[0].cycle) {
                    case "1": {
                        if (content.cur_week_detail.records.length > 0) {

                        } else {
                            ff.push({name: "No statistics", value: "No statistics to show", inline: true});
                        }

                    }
                    break;
                    case "2": {
                        if (content.last_week_detail.records.length > 0) {

                        } else {
                            ff.push({name: "No statistics", value: "No statistics to show", inline: true});
                        }

                    }
                    break;
                }

                if (content.basic.season_title_list !== null || content.basic.season_title_list.length > 0) {
                    content.basic.season_title_list.forEach(season => {
                        seasons += `${season.season_name}: **Lvl. ${season.season_level}**\n`;
                    });
                } else {
                    seasons += "No seasons to show";
                }

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "Synchronicity level", value: `${content.basic.season_level}`, inline: true},
                    {name: "Weekly score", value: `${content.basic.weekly_score}/${content.basic.weekly_score_max}`, inline: true},
                    {name: "Weekly finished", value: `${(content.basic.finished_weekly)? 'Yes' : 'No'}`, inline: true},
                    {name: "EXP full", value: `${(content.basic.rogue_tourn_exp_is_full)? 'Yes' : 'No'}`, inline: true},
                    {name: "Gallery of possibilities", value: `${content.basic.possibility_gallery_progress}%`, inline: true},
                    {name: "Node(s) activated", value: `${content.basic.skill_tree_activated}`, inline: true},
                    {name: "Stable computing array", value: `${content.basic.season_task_finished}/${content.basic.season_task_total}`, inline: true},
                    {name: "Titan odes", value: `${content.basic.titan_current}/${content.basic.titan_total}`, inline: true},
                    {name: "Seasons progress", value: `${seasons}`, inline: true});
            }
            break;
            case 6: {
                embedtitle = 'SimulatedUniverse - UnknowableDomain';

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "Cognitive boundary", value: `${content.basic_info.linear_tree_num}`, inline: true},
                    {name: "Bionic records", value: `${content.basic_info.magic_compendium}`, inline: true},
                    {name: "Trailblaze secrets", value: `${content.basic_info.discover_secrets}`, inline: true},
                    {name: "Reorganized model", value: `${content.basic_info.challenge_task_current_num}/${content.basic_info.challenge_task_total_num}`, inline: true},
                    {name: `${content.basic_info.magic_record.name}`, value: `Floors: **${content.basic_info.magic_record.schedule_current_floor_num}**/**${content.basic_info.magic_record.schedule_total_floor_num}**
                    Plane: **${content.basic_info.magic_record.level}**
                    Remaining additional cycles: **${content.basic_info.magic_record.additional_rounds}**
                    Extrapolation alignment: **${content.basic_info.magic_record.calculation_tendency.name}**
                    Completed at: **${content.basic_info.magic_record.completed_time.year}-${("0" + content.basic_info.magic_record.completed_time.month).slice(-2)}-${("0" + content.basic_info.magic_record.completed_time.day).slice(-2)} ${("0" + content.basic_info.magic_record.completed_time.hour).slice(-2)}:${("0" + content.basic_info.magic_record.completed_time.minute).slice(-2)}**`, inline: true});
            }
            break;
            case 7: {
                embedtitle = 'SimulatedUniverse - SwarmDisaster';

                let detailedsts = "";
                content.basic.destiny.forEach(e => {
                    detailedsts += `${e.desc}: **Lvl. ${e.level}**\n`;
                })

                fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                    {name: "Nickname (InGame)", value: `${name}`, inline: true},
                    {name: "Trail of Pathstrider", value: `${content.basic.cnt.narrow}`, inline: true},
                    {name: "Unlocked curios", value: `${content.basic.cnt.miracle}`, inline: true},
                    {name: "Unlocked events", value: `${content.basic.cnt.event}`, inline: true},
                    {name: "Detailed statistics", value: `${detailedsts}`, inline: true});
            }
            break;
            case 8: {
                embedtitle = 'SimulatedUniverse - GoldAndGears';

                if (content.basic.exist_data) {
                    fields.push({name: "UID (InGame)", value: `${uid}`, inline: true},
                        {name: "Nickname (InGame)", value: `${name}`, inline: true},
                        {name: "Unlocked secrets", value: `${content.basic.cur_progress}/${content.basic.max_progress}`, inline: true},
                        {name: "Dice face collection", value: `${content.basic.cur_rolling}/${content.basic.max_rolling}`, inline: true},
                        {name: "Unlocked curios", value: `${content.basic.unlock_miracle}`, inline: true},
                        {name: "Unlocked events", value: `${content.basic.unlock_event}`, inline: true},
                        {name: "Neuron already activated", value: `${content.basic.active_nerve}`, inline: true});
                } else {
                    fields.push({name: "No statistics", value: `No statistics to show`, inline: true})
                }
            }
            break;
        }

        return new EmbedBuilder({
            title: `${embedtitle} (${start + 1}-${start + current.length}/${data.length} pages)`,
            color: Colors.Green,
            fields: fields
        })
    },
}
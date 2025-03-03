const {OS_GACHA_LOG_PAGE_SIZE} = require("../../constants");
const {EmbedBuilder, Colors} = require("discord.js");
const {napStarToRarity} = require("./helpers");
module.exports = {
    async generateEmbedHk4eGacha(start, data) {
        const current = data.slice(start, start + OS_GACHA_LOG_PAGE_SIZE);

        return new EmbedBuilder({
            title: `Showing ${start + 1}-${start + current.length} out of ${data.length} Wish history pages`,
            color: Colors.Green,
            fields: await Promise.all(
                current.map(async (e, index) => ({
                        name: `Pull ${index + 1 + start}`,
                        value: `Item: **${e.name}**\nAmount: **x${e.count}**\nType: **${e.item_type}**\nRarity: **${e.rank_type} star**\nObtained on: **${e.time}**`,
                        inline: true}
                ))
            )
        })
    },
    async generateEmbedNapGacha(start, data) {
        const current = data.slice(start, start + OS_GACHA_LOG_PAGE_SIZE);

        return new EmbedBuilder({
            title: `Showing ${start + 1}-${start + current.length} out of ${data.length} Signal history pages`,
            color: Colors.Green,
            fields: await Promise.all(
                current.map(async (e, index) => ({
                        name: `Pull ${index + 1 + start}`,
                        value: `Item: **${e.name}**\nAmount: **x${e.count}**\nType: **${e.item_type}**\nRarity: **${napStarToRarity(e.rank_type)}**\nObtained on: **${e.time}**`,
                        inline: true}
                ))
            )
        })
    },
    async generateEmbedHkrpgGacha(start, data) {
        const current = data.slice(start, start + OS_GACHA_LOG_PAGE_SIZE);

        return new EmbedBuilder({
            title: `Showing ${start + 1}-${start + current.length} out of ${data.length} Warp history pages`,
            color: Colors.Green,
            fields: await Promise.all(
                current.map(async (e, index) => ({
                        name: `Pull ${index + 1 + start}`,
                        value: `Item: **${e.name}**\nAmount: **x${e.count}**\nType: **${e.item_type}**\nRarity: **${napStarToRarity(e.rank_type)}**\nObtained on: **${e.time}**`,
                        inline: true}
                ))
            )
        })
    },
}
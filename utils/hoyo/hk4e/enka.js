module.exports = {
    async hk4eEnkaIndex(gameUid) {
        var ret = null;
        try {
            let rsp = await fetch(`https://enka.network/api/uid/${gameUid}`, {
                method: 'GET',
                headers: {'content-type': 'application/json', 'accept': 'application/json', 'accept-encoding': "application/json", 'User-Agent': "QingyiDiscordBot/v1.0.0"},
            });

            ret = await rsp.json();
            console.log(ret)
            return {body: ret};

        } catch (e) {
            console.error(e);
            ret = null;
        }
        return ret;
    },
}
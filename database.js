const postgres = require("pg");

module.exports = {
    async init() {
        let sql = new postgres.Client({
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            database: process.env.DATABASE_NAME,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            connectionString: process.env.DATABASE_URL
        });

        await sql.connect();

        sql.on('error', (err) => {
            console.error('Connection failed!', err.stack)
        });

        await sql.query(`CREATE TABLE IF NOT EXISTS hoyoverse_accounts (uuid SERIAL PRIMARY KEY, discord_id TEXT NOT NULL DEFAULT '' UNIQUE, aid TEXT NOT NULL DEFAULT '', cookie_token_v2 TEXT NOT NULL DEFAULT '', ltoken_v2 TEXT NOT NULL DEFAULT '', account_mid_v2 TEXT NOT NULL DEFAULT '', account_id_v2 TEXT NOT NULL DEFAULT '', ltmid_v2 TEXT NOT NULL DEFAULT '', ltuid_v2 TEXT NOT NULL DEFAULT '')`)

        return sql;
    },

    async getByDiscordId(client, id) {
        if (id === null) return null;

        let rsp = await client.db.query(`SELECT * FROM hoyoverse_accounts WHERE discord_id = '${id}'`);
        if (rsp.rows.length === 0) return null;

        return rsp.rows[0];
    },

    async getByAid(client, aid) {
        if (aid === null) return null;

        let rsp = await client.db.query(`SELECT * FROM hoyoverse_accounts WHERE aid = '${aid}'`);
        if (rsp.rows.length === 0) return null;

        return rsp.rows[0];
    },

    async insertHoyoverseAccount(client, discord_id, aid, cookie_token_v2, ltoken_v2, account_mid_v2, account_id_v2, ltmid_v2, ltuid_v2) {
        if (discord_id === null || aid === null || cookie_token_v2 === null || ltoken_v2 === null || account_mid_v2 === null || account_id_v2 === null || ltmid_v2 === null || ltuid_v2 === null) return null;

         await client.db.query(`INSERT INTO hoyoverse_accounts(uuid, discord_id, aid, cookie_token_v2, ltoken_v2, account_mid_v2, account_id_v2, ltmid_v2, ltuid_v2) VALUES (default, '${discord_id}', '${aid}', '${cookie_token_v2}', '${ltoken_v2}', '${account_mid_v2}', '${account_id_v2}', '${ltmid_v2}', '${ltuid_v2}')`);

         return true;
    },
    async deleteHoyoverseAccount(client, discord_id) {
        if (discord_id === null) return null;

        await client.db.query(`DELETE FROM hoyoverse_accounts WHERE discord_id = '${discord_id}'`);

        return true;
    },
    async updateHoyoverseAccount(client, discord_id, cookie_token_v2, ltoken_v2, account_mid_v2, account_id_v2, ltmid_v2, ltuid_v2) {
        if (discord_id === null || cookie_token_v2 === null || ltoken_v2 === null || account_mid_v2 === null || account_id_v2 === null || ltmid_v2 === null || ltuid_v2 === null) return null;

        await client.db.query(`UPDATE hoyoverse_accounts SET cookie_token_v2 = '${cookie_token_v2}' WHERE discord_id = '${discord_id}'`);
        await client.db.query(`UPDATE hoyoverse_accounts SET ltoken_v2 = '${ltoken_v2}' WHERE discord_id = '${discord_id}'`);
        await client.db.query(`UPDATE hoyoverse_accounts SET account_mid_v2 = '${account_mid_v2}' WHERE discord_id = '${discord_id}'`);
        await client.db.query(`UPDATE hoyoverse_accounts SET account_id_v2 = '${account_id_v2}' WHERE discord_id = '${discord_id}'`);
        await client.db.query(`UPDATE hoyoverse_accounts SET ltmid_v2 = '${ltmid_v2}' WHERE discord_id = '${discord_id}'`);
        await client.db.query(`UPDATE hoyoverse_accounts SET ltuid_v2 = '${ltuid_v2}' WHERE discord_id = '${discord_id}'`);

        return true;
    },
}
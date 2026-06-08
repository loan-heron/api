const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

let pool = null;

async function initDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    await connection.query(`
        CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci;
    `);

    await connection.end();

    pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    await createTables(pool);

    return pool;
}

function getDB() {
    if (!pool) {
        throw new Error("La base de données n'est pas initialisée");
    }

    return pool;
}

async function createTables(pool) {
    const schemaPath = fs.readdirSync(path.join(__dirname, "schema"));

    for (const file of schemaPath) {
        if (file.endsWith(".schema.sql")) {
            const schema = fs.readFileSync(
                path.join(__dirname, "schema", file),
                "utf-8"
            );

            await pool.query(schema);
            console.log(`Table ${file.split(".")[0]} initialisée.`);
        }
    }
}

async function seedData(pool) {
    const seedPath = fs.readdirSync(path.join(__dirname, "seed"));

    for (const file of seedPath) {
        if (file.endsWith(".seed.sql")) {
            const seed = fs.readFileSync(
                path.join(__dirname, "seed", file),
                "utf-8"
            );

            await pool.query(seed);
            console.log(`Données de ${file.split(".")[0]} insérées.`);
        }
    }
}

module.exports = {
    initDB,
    getDB
};
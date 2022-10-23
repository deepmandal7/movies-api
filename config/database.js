require("dotenv").config();
const { Pool } = require("pg");
const connectionString = process.env.DB_URL;
const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === "production",
});
module.exports = pool;

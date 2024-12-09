const db = require('../database');
const axios = require('axios');

async function checkDatabase() {
    try {
        await db.raw('SELECT 1+1 AS result');
        return "connected";
    } catch (err) {
        console.error("Database connection error:", err.message);
        return "disconnected";
    }
}

async function checkExternalAPI() {
    try {
        await axios.get("https://jsonplaceholder.typicode.com/posts");
        return "connected";
    } catch (err) {
        console.error("External API error:", err.message);
        return "disconnected";
    }
}

module.exports = {
    checkDatabase,
    checkExternalAPI
};

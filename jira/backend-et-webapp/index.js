const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const etNewsRoutes = require('./routes/etNewRoutes');
const axios = require("axios");
const db = require("./database");

dotenv.config();

const app = express();
const startTime = Date.now();

app.use(cors({ origin: 'dev-economic-technology-club.vercel.app' }));
app.use(cookieParser());
app.use(express.json());
app.use(etNewsRoutes);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
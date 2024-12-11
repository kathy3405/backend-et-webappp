import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import axios from 'axios';
import etNewsRoutes from '../routes/etNewRoutes';
import db from '../database';

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

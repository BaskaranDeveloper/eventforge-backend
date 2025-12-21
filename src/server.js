import dotenv from 'dotenv';
dotenv.config(); // 👈 MUST be first

import app from './app.js';
import config from './config/index.js';
import connectDB from './config/db.js';

const startServer = async () => {
    await connectDB();

    app.listen(config.port, () => {
        console.log(
            `🚀 EventForge server running on port ${config.port} in ${config.env} mode`
        );
    });
};

startServer();

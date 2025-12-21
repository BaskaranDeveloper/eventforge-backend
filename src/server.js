// Load environment variables from .env file - this must happen before anything else
import dotenv from 'dotenv';
dotenv.config(); // MUST be first

// Bring in our main app setup
import app from './app.js';
// Get our configuration settings
import config from './config/index.js';
// Function to connect to the database
import connectDB from './config/db.js';

// This function starts everything up
const startServer = async () => {
    // First, connect to the database
    await connectDB();

    // Then start the server and listen for requests
    app.listen(config.port, () => {
        console.log(
            `🚀 EventForge server running on port ${config.port} in ${config.env} mode`
        );
    });
};

// Kick off the server startup
startServer();

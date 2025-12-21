// Bring in mongoose to work with MongoDB
import mongoose from 'mongoose';

// This function connects our app to the MongoDB database
const connectDB = async () => {
    try {
        // Try to connect using the URI from environment variables
        const connect = await mongoose.connect(process.env.MONGODB_URI);

        // If it works, log where it's connected
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        // If something goes wrong, log the error
        console.error('MongoDB connection failed');
        console.error(error.message);

        // Stop the app if we can't connect to the database
        process.exit(1);
    }
};

// Export this function so other files can use it
export default connectDB;

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed');
        console.error(error.message);

        // Crash the app if DB is down
        process.exit(1);
    }
};

export default connectDB;

// This brings in the Express library so we can build our web server
import express from "express";
import authRoutes from "./routes/auth.routes.js"

// Here we create our main app object using Express
const app = express();

// This middleware helps us read JSON data from requests
app.use(express.json());

// Set up auth routes under /api/auth
app.use('/api/auth', authRoutes);

// This is the main route - when someone visits the root URL, we send back a simple message
app.use("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: 'EventForge API is running'
    });
});

// Finally, we export our app so other files can use it
export default app;
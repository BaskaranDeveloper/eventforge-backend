// Bring in our app from the app.js file
import app from "./app.js";

// Set the port number where the server will run
const PORT = 3000;

// Start the server and listen on the port, then log a message when it's ready
app.listen(PORT, () => {
    console.log(`🚀 EventForge server running on port ${PORT}`);
});
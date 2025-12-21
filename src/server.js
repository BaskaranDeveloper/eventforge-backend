// Bring in our app from the app.js file
import app from "./app.js";
// Bring in our PORT from the config
import config from "./config/index.js";



// Start the server and listen on the port, then log a message when it's ready
app.listen(config.port, () => {
    console.log(
        `🚀 EventForge server running on port ${config.port} in ${config.env} mode`
    );
});
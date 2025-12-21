const express = require("express");

//creates app instance
const app = express();

// create basic middleware  || parses JSON body
app.use(express.json());


// test route

app.get("/", (req, res) => {
    res.status(200).json({
        succsse: true,
        message: "EventForge API is running"
    });
})


// port
const PORT = 3000;

// listen
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

})
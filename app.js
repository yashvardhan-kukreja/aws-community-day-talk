const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

require("dotenv").config({path: path.resolve(__dirname) + "/.env"});

app.get("/", (req, res) => {
    res.json({
        meta: {
            success: true,
            message: "Welcome to the AWS Community Day ANZ - Build 21"
        }
    });
});

app.listen(port);
console.log(`Server running on port number: ${port}`);
module.exports = app;

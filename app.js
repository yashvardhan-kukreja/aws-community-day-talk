const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

require("dotenv").config({path: path.resolve(__dirname) + "/.env"});

app.get("/", (req, res) => {
    res.json({
        meta: {
            success: "string literal",
            message: "Welcome to the AWS Community Day ANZ - Something new and something wayy more cool!"
        }
    });
});

app.listen(port);
console.log(`Server running on port number: ${port}`);
module.exports = app;

const path = require("path");
const express = require("express");

const APP_DIR = process.env.APP_DIR || path.resolve(__dirname, "../build/release/app");
const TARGET = process.env.TARGET || "dev";
const PORT = process.env.PORT || 3000;

const app = express();

if (TARGET === "dev") {
    app.use("/", express.static(APP_DIR));
}

console.log(`Starting Box Deluxe Static Server on 0.0.0.0:${PORT} [${TARGET}]`);
app.listen(PORT);

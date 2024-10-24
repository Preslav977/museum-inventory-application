require("dotenv").config();

const express = require("express");

const path = require("node:path");

const indexRouter = require("./routes/indexRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname + "/public");

app.use(express.static(assetsPath));

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}!`));

module.exports = app;

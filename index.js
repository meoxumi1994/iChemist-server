const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");
mongoose.connect("mongodb://localhost/iChemist");
mongoose.Promise = global.Promise;
require("dotenv").config();
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const use_route = path => {
    if (path.includes(".js")) {
        app.use(path.slice(7, -3), require(path));
    } else {
        const folder = fs.readdirSync(path);
        folder.map(file => {
            use_route(path + "/" + file);
        });
    }
};

use_route("./route");

const server = app.listen(3333, () =>
    console.log("chemistryX listening on port 3333!")
);

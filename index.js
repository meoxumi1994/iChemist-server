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
const io = require("socket.io").listen(server);

io.on("connection", socket => {
    const use_socket = path => {
        if (path.includes(".js")) {
            const mdl = require(path);
            for (let method in mdl) {
                socket.on(path.slice(2, -3) + "/" + method, action => {
                    let _id = undefined;
                    if (action["x-findyday-token"]) {
                        try {
                            const decode = jwt.verify(
                                action["x-findyday-token"],
                                path.includes("socket/user")
                                    ? process.env.USER_SECRET_KEY
                                    : process.env.ADMIN_SECRET_KEY
                            );
                            _id = decode._id;
                        } catch (err) {
                        }
                    }
                    delete action["x-findyday-token"];
                    if (
                        !_id &&
                        (path.includes("socket/user") ||
                            path.includes("socket/admin"))
                    ) {
                        socket.emit("action", {
                            type: "client/CHANGE_OWNER",
                            key: "condition",
                            value: "ERROR"
                        })
                        return;
                    }

                    mdl[method](action, socket, io, _id)
                        .then(() => {
                            const { actions_after_finish } = action;
                            if(actions_after_finish){
                                action_after_finish.map(ac => {
                                    socket.emit("action", ac);
                                });
                            }
                        })
                        .catch(err => {
                            console.error(action.type);
                            console.error(err);
                            socket.emit("action", {
                                type:
                                    "client/" +
                                    action.type.substr(7, action.type.length),
                                error: err
                            });
                        });
                });
            }
        } else {
            const folder = fs.readdirSync(path);
            folder.map(file => {
                use_socket(path + "/" + file);
            });
        }
    };

    use_socket("./socket");
});

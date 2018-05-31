const User = require("../../model/User");
const Agency = require("../../model/Agency")

const jwt = require("jsonwebtoken");

const Facebook = require("../../service/Facebook");
const Google = require("../../service/Google");
const user = require("../user/user")

const join_after_login = (socket, io, _id) => {
    agency.join_global({}, socket, io, _id)
    user.join_global({}, socket, io, _id)
}

module.exports = {
    logingoogle: ({ access_token }, socket, io) => {
        return Promise.resolve()
            .then(() => {
                if (!access_token) throw "missing access_token";
                return Google.getUserInfo(access_token);
            })
            .then(response => {
                const { id, name, picture, email } = response;
                return User.findOneAndUpdate({
                    _type: "GOOGLE",
                    id_from_3th: id
                }, {
                    name: name,
                    avatar: picture,
                    email: email,
                },
                { new: true }).then(user => {
                    if (user) return user;
                    return User.create({
                        _type: "GOOGLE",
                        id_from_3th: id,
                        name: name,
                        avatar: picture,
                        email: email,
                        user_infor_response_from_3th: response
                    })
                });
            })
            .then(user => {
                const user_token = jwt.sign(
                    { _id: user._id },
                    process.env.USER_SECRET_KEY
                );
                socket.emit("action", {
                    type: "client/CHANGE_AUTH_LOGIN_SUCCESS",
                    access_token: user_token
                });
                socket.disconnect()
            });
    },
    loginfacebook: ({ access_token }, socket, io) => {
        return Promise.resolve()
            .then(() => {
                if (!access_token) throw "missing access_token";
                return Facebook.getUserInfo(access_token);
            })
            .then(response => {
                const { id, name, picture, cover } = response;
                return User.findOneAndUpdate({
                    _type: "FACEBOOK",
                    id_from_3th: id
                }, {
                    name: name,
                    avatar: picture && picture.data && picture.data.url,
                    cover: cover && cover.source,
                }, { new: true }).then(user => {
                    if (user) return user;
                    return User.create({
                        _type: "FACEBOOK",
                        id_from_3th: id,
                        name: name,
                        avatar: picture && picture.data && picture.data.url,
                        cover: cover && cover.source,
                        user_infor_response_from_3th: response
                    })
                })
            })
            .then(user => {
                const user_token = jwt.sign(
                    { _id: user._id },
                    process.env.USER_SECRET_KEY
                );
                socket.emit("action", {
                    type: "client/CHANGE_AUTH_LOGIN_SUCCESS",
                    access_token: user_token
                });
                socket.disconnect()
            })
    }
};

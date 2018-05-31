const User = require("../../model/User");

const { clean } = require("../../util/propotype");

module.exports = {
    join_global: (action, socket, io, _id) => {
        return Promise.resolve().then(() => {
            socket.join(_id);
        });
    },
    leave_global: (action, socket, io, _id) => {
        return Promise.resolve().then(() => {
            socket.leave(_id);
        });
    },
    get_owner: (action, socket, io, _id) => {
        return User.findById(_id).then(user => {
            if (!user) {
                socket.emit("action", {
                    type: "client/CHANGE_OWNER",
                    key: "condition",
                    value: "ERROR"
                });
                throw "can't find user";
            }
            socket.emit("action", {
                type: "client/CHANGE_OWNER_DATA",
                data: user
            });
        });
    },
    put_owner: ({ number_not_read, cover, avatar, name, email }, socket, io, _id) => {
        return User.findByIdAndUpdate(
            _id,
            clean({ number_not_read, cover, avatar, name, email }),
            { new: true }
        ).then(user => {
            socket.emit('action', {
                type: "client/CHANGE_OWNER_DATA",
                data: user
            })
        });
    },
    put_trace: ({ trace }, socket, io, _id) => {
        return User.findById(_id).then(user => {
            if (!user) throw "can't find user";
            if (!user.trace) user.trace = {};
            user.trace = {
                ...user.trace,
                ...trace
            };
            user.markModified("trace");
            return user.save();
        });
    }
};

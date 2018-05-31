const User = require("../model/User");
const GroupMessage = require("../model/GroupMessage");

const Verify = {
    verifyGroupMessage: (_id, users_id, agencies_id) => {
        return User.findById(_id).then(user => {
            if (!Array.isArray(users_id)) throw "users_id require Array type";
            if (!Array.isArray(agencies_id))
                throw "agencies_id require Array type";
            let isOwner = false;
            users_id.map(thr_user_id => {
                if (users_id == _id) isOwner = true;
            });
            agencies_id.map(thr_agency_id => {
                user.agencies.map(agency_id => {
                    if (agency_id == thr_agency_id) isOwner = true;
                });
            });
            if (!isOwner)
                throw "You do not have authorization to retrieve this service";
            return true;
        });
    },
    verifyGroupMessageById: (_id, _group_id) => {
        return GroupMessage.findById(_group_id).then(groupmessage => {
            if (!groupmessage) throw "can't find GroupMessage with this _id";
            const { users_id, agencies_id } = groupmessage;
            return Verify.verifyGroupMessage(_id, users_id, agencies_id);
        });
    },
    verifyOwnerId: (_id, owner_id) => {
        return User.findById(_id).then(user => {
            let isOwner = false;
            if (owner_id == _id) isOwner = true;
            user.agencies.map(agency_id => {
                if (agency_id == owner_id) isOwner = true;
            });
            if (!isOwner)
                throw "You do not have authorization to retrieve this service";
            return true;
        });
    }
};

module.exports = Verify;

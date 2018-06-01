const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String },
    avatar: { type: Schema.Types.Mixed },
    cover: { type: Schema.Types.Mixed },
    _type: { type: String, required: ['FACEBOOK', 'GOOGLE', 'GUEST'], default: 'GUEST' },
    id_from_3th: { type: String },
    user_infor_response_from_3th: { type: Schema.Types.Mixed },
    trace: { type: Schema.Types.Mixed },
    isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);

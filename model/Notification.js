const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    _father_id: { type: String }, // cant be comment_id or post_id
    _owner_id: { type: Schema.Types.ObjectId },
    _owner_type: {
        type: String,
        required: ["USER", "AGENCY"],
        default: "USER"
    },
    _post_id: { type: String },
    _create_time: { type: String },
    content: { type: String }_post_id: { type: Schema.Types.ObjectId, required: true },
    _user_id: { type: Schema.Types.ObjectId, required: true },
    _product_ids: { type: Schema.Types.Mixed },
    _create_time: { type: String },
});

module.exports = mongoose.model("Notification", NotificationSchema);

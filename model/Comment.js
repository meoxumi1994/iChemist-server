const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    _father_id: { type: String }, // cant be comment_id or post_id
    _owner_id: { type: Schema.Types.ObjectId },
    _owner_type: {
        type: String,
        required: ["USER", "AGENCY"],
        default: "USER"
    },
    _post_id: { type: String },
    _create_time: { type: String },
    content: { type: String }
});

CommentSchema.index({ _father_id: 1, _create_time: -1 });

module.exports = mongoose.model("Comment", CommentSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    _agency_id: { type: Schema.Types.ObjectId, required: true },
    _create_time: { type: String },
    content: { type: String },
    imgs: { type: Schema.Types.Mixed },
    order_time: { type: Schema.Types.Mixed }, // from, to
    ship_time: { type: Schema.Types.Mixed },
});

PostSchema.index({ _agency_id: 1, _create_time: -1 });

module.exports = mongoose.model("Post", PostSchema);

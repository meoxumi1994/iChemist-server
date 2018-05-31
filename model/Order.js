const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    _post_id: { type: Schema.Types.ObjectId, required: true },
    _user_id: { type: Schema.Types.ObjectId, required: true },
    _product_ids: { type: Schema.Types.Mixed },
    _create_time: { type: String },
});

module.exports = mongoose.model("Order", OrderSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _post_id: { type: Schema.Types.ObjectId, required: true },
    content: { type: String },
    img: { type: Schema.Types.Mixed },
    price: { type: Integer }
});

ProductSchema.index({ _post_id: 1 });

module.exports = mongoose.model("Product", ProductSchema);

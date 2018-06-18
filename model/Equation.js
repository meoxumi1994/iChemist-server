const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquationSchema = new Schema({
    img_400_100_grey: { type: String },
    img_grey: { type: String },
    width: { type: Number },
    height: { type: Number },
    label: { type: String },
    create_id: { type: String },
    img_800_200_grey: { type: String },
});

module.exports = mongoose.model("Equation", EquationSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquationSchema = new Schema({
    img_400_100_grey: { type: Schema.Types.Mixed, default: [] },
    label: ""
});

module.exports = mongoose.model("Equation", EquationSchema);

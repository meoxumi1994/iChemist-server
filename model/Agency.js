const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgencySchema = new Schema({
    _user_id: { type: Schema.Types.ObjectId },
    _create_time: { type: String, default: new Date().getTime() },
    name: { type: String , required: true },
    description: { type: String },
    _score: { type: Number, default: 0 },
    address: { type: String },
    phone: { type: String },
    facebook_fanpage: { type: String },
    avatar: { type: Schema.Types.Mixed, default: {} },
    cover: { type: Schema.Types.Mixed, default: {} },
    website: { type: String },
    position: { type: Schema.Types.Mixed },
    service_area: { tyoe: Schema.Types.Mixed }, // array [{ lat, lng}, {lat, lng}, ... , {lat, lng}]
});

AgencySchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Agency", AgencySchema);

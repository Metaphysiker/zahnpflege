const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MetarReportSchema = new Schema({
    wind_degrees: { type: Number },
    wind_speed_kph: { type: Number },
    observed: { type: Date, default: Date.now },
    icao: { type: String, default: "LDZD" }
},
    { timestamps: true });

const MetarReportModel = mongoose.model('metarReport', MetarReportSchema);

module.exports = MetarReportModel;

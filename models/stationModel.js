const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    power_supply: {
        type: String,
        required: true
    },
    charging_speed: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Station", stationSchema);
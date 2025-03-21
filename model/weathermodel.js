const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    wind_speed: {
        type: Number,
        required: true
    },
    searchedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const WeatherModel = mongoose.model('Weather', weatherSchema);

module.exports = WeatherModel;

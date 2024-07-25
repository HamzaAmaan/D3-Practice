const mongoose = require('mongoose');

const WorldDataCountrieschema = new mongoose.Schema({
type: {
    type: String,
        enum: ['Feature']
    },
    properties: {
        name: String
    },
     geometry: {
        type: {
            type: String,
            enum: ['Polygon', 'MultiPolygon'] // Allow both Polygon and MultiPolygon
        },
        coordinates: [[[[Number]]]]
    },
    iso_code: String
});

module.exports = WorldDataCountries = mongoose.model('world_data_countries', WorldDataCountrieschema, "world_data_countries");
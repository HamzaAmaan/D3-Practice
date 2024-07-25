const mongoose = require('mongoose');

const ECSchema = new mongoose.Schema({
  country: String,
  year:  Number,
  iso_code: String,
  population: Number,
  gdp: Number
});

module.exports = EnergyConsumption = mongoose.model('world_energy_consumption', ECSchema, "world_energy_consumption");
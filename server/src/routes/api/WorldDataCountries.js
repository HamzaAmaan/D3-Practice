const express = require('express');
const router = express.Router();

// Load EC model
const WDC = require('../../models/WorldDataCountries');

// @route   GET api/world-data
// @desc    Get all world data countries
// @access  Public
router.get('/', (req, res) => {
    WDC.find()
    .then(wdc => res.json(wdc))
    .catch(err => res.status(404).json({ noecsfound: 'No world data found' }));
});

module.exports = router;
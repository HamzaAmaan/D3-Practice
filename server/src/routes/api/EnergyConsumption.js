const express = require('express');
const router = express.Router();

// Load EC model
const Ec = require('../../models/EneryConsumption');

// @route   GET api/ecs
// @desc    Get all ECs
// @access  Public
router.get('/', (req, res) => {
    Ec.aggregate([
        {
            $group: {
                _id: "$country",
                iso_code: { $first: "$iso_code" },
                data: {
                    $push: {
                        year: "$year",
                        population: "$population",
                        gdp: "$gdp"
                    }
                }
            }
        },
        {
            $sort: { _id: 1 } // Sort by country name in ascending order
        }
    ])
    .then(groupedData => {
        res.json(groupedData);
    })
      .catch(err => res.status(404).json({ noecsfound: 'No ECs found' }));
  });


// @route   GET api/ecs
// @desc    Get all ECs
// @access  Public
router.get('/:id', (req, res) => {
    Ec.findById(req.params.id)
      .then(ec => res.json(ec))
      .catch(err => res.status(404).json({ noecsfound: 'No EC found' }));
  });

module.exports = router;
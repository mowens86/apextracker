// jshint esversion:6

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// jshint esversion:8
router.get('/:platform/:gamertag', async (req, res) => {
    try {

        // Create variable to hold API key
        const headers = {
           'TRN-Api-Key' : process.env.TRACKER_API_KEY
        }

        // Use destructuring to pull out params
        const { platform, gamertag } = req.params;

        // Create variable for response
        const response = await fetch(`${process.env.TRACKER_API_URL}/profile/${platform}/${gamertag}`, {
            headers
        });

        // Needs to be JSON need to call response.JSON
        const data = await response.json();

        data.errors && data.errors.length > 0 ? res.status(404).json({ message: 'Profile Not Found'}) : '';

        // Responsding to client w/ json and passing in data with response
        res.json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error'
        });

    }
});

module.exports = router;
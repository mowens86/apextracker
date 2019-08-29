//jshint esversion:6
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load config.env files
dotenv.config({ path: './config.env' });

const app = express();

// Dev logging
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : '';

// Profile routes
app.use('/api/v1/profile', require('./routes/profile'));

// Handle production
process.env.NODE_ENV === 'production' ?

    // Set static folder
    (app.use(express.static(__dirname + '/public')),

    // Handle SPA
    (app.get(/.*/, (req, res) => res.sendFile(__dirname + 'public/index.html'))))
    

    : '';

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Serving running in ${process.env.NODE_ENV} mode on port ${port}`);
});
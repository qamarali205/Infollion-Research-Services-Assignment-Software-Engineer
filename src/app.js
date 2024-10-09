
require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');

const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: process.env.RATE_LIMIT || 5, // limit each IP to 5 requests per windowMs
    message: { error: 'Too many requests, please try again later.' },
    statusCode: 429,
});

app.use(limiter);

// Middleware
app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);



module.exports = app;

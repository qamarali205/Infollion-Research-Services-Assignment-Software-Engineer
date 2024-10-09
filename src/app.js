
require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();


const logStream = fs.createWriteStream(path.join(__dirname, 'requests.log'), { flags: 'a' });

// Middleware to log requests with timestamps to a file
morgan.token('time', () => new Date().toISOString());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :time', { stream: logStream }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :time'));



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

app.get('/', (req, res) =>{
    res.send("Server Running...........")
})

// Routes
app.use('/api', routes);



module.exports = app;

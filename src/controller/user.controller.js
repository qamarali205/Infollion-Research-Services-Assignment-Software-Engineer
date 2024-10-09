const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt");

const NodeCache = require('node-cache');
const axios = require('axios');

const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 300 });


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }
    

    const token = generateToken(req.body);

    res.status(200).json({
      status: 200,
      token,
      message: "Login Successful",
      data:req.body,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Login Failed",
      error: error.message,
    });
  }
};



//get weather Details

exports.getWeatherDetails = async (req, res) =>{
  const { city } = req.params;
  const cacheKey = `weather_${city}`;


  // Check cache
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
      console.log(`Serving from cache: ${cacheKey}`);
      return res.json(cachedResponse);
  }

  try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
              q: city,
              appid: process.env.WEATHER_API_KEY,
              units: 'metric' // Change to 'imperial' if needed
          }
      });
      // Cache the response
      cache.set(cacheKey, response.data);

      res.status(200).json({
        status: 200,
        data:response.data,
        message: "Get Weather Details"
        
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Server Error",
        error: error.message,
      });
    }

}




//get GitHub Details

exports.getGithubDetails=async (req, res) =>{
  
  const { user, repo } = req.params;
  const cacheKey = `${user}/${repo}`;

  // Check cache
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
      console.log(`Serving from cache: ${cacheKey}`);
      return res.json(cachedResponse);
  }

  try {
      const response = await axios.get(`https://api.github.com/repos/${user}/${repo}`);
      // Cache the response
      cache.set(cacheKey, response.data);

      res.status(200).json({
        status: 200,
        data:response.data,
        message: "Get Weather Details"
        
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Server Error",
        error: error.message,
      });
    }

}







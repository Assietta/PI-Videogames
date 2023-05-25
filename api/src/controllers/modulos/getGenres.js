const axios = require('axios')
require('dotenv').config();
const { genres } = require('../../db')
const {YOUR_API_KEY} = process.env;


const getgenres = async () => {
  const response = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
  const genres = response.data.results.map((type) => type.name);
  return genres;
};


  module.exports = {
    getgenres,
  }
require('dotenv').config();
const axios = require("axios");
const { cleanData } = require('../helpers/cleanData');
const { Videogame } = require('../../db');
const { YOUR_API_KEY } = process.env;

const getName = async (nombre, limit = 15) => {
  const apiVideogameData = (await axios.get(`https://api.rawg.io/api/games?search=${nombre}&key=${YOUR_API_KEY}&page_size=${limit}`)).data.results;
  if (apiVideogameData.length > 0) {
    const cleanedData = apiVideogameData.map((data) => cleanData(data));
    return cleanedData;
  } else {
    return null;
  }
};


module.exports = {
  getName,
};

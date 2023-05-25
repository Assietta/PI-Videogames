require('dotenv').config();
const axios = require("axios");
const { cleanData } = require('../helpers/cleanData');
const { Videogame } = require('../../db');
const { YOUR_API_KEY } = process.env;

const getName = async (name) => {
  const databaseVideogame = await Videogame.findOne({ where: { name } });

  if (databaseVideogame) {
    return databaseVideogame;
  } else {
    const apiVideogameData = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`)).data.results;
    
    if (apiVideogameData.length > 0) {
      const gameData = apiVideogameData[0];
      const cleanedData = cleanData(gameData);
      return cleanedData;
    } else {
      return null;
    }
  }
};

module.exports = {
  getName,
};

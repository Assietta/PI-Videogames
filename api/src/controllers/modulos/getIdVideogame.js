require('dotenv').config();
const axios = require("axios");
const { cleanData } = require('../helpers/cleanData');
const { Videogame } = require('../../db');
const { YOUR_API_KEY } = process.env;

const getIdVideogame = async (id) => {
  const databaseVideogame = await Videogame.findByPk(id);

  if (databaseVideogame) {
    return databaseVideogame;
  } else {
    const apiVideogameData = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)).data;
    const cleanedData = cleanData(apiVideogameData);
    return cleanedData;
  }
};

module.exports = {
  getIdVideogame,
};

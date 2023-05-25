require('dotenv').config();
const axios = require("axios")
const { cleanData } = require('../helpers/cleanData');
const Videogame = require('../../db')
const {YOUR_API_KEY} = process.env;


const getAllVideogame = async () => {
  const databasevideogame = await Videogame.findAll();
  const apiVideogameRaw = (await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`)).data.results;
  const apiVideogameCleaned = await Promise.all(apiVideogameRaw.map(async (p) => {
    const apiVideogameData = (await axios.get(`https://api.rawg.io/api/games/${p.id}?key=${YOUR_API_KEY}`)).data;
    return cleanData(apiVideogameData);
  }));
  return [...databasevideogame, ...apiVideogameCleaned];
};

module.exports = { getAllVideogame, cleanData }

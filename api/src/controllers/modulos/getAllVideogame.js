require('dotenv').config();
const axios = require("axios");
const { cleanData } = require('../helpers/cleanData');
const { Videogame } = require('../../db');
const { YOUR_API_KEY } = process.env;

const getAllVideogame = async () => {
  const databaseVideogames = await Videogame.findAll();
  let allApiVideogames = [];
  let page = 1;
  let totalGames = 0;

  do {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${page}`);
    const apiVideogamesRaw = response.data.results;
    const apiVideogamesCleaned = await Promise.all(apiVideogamesRaw.map(async (p) => {
      const apiVideogameData = (await axios.get(`https://api.rawg.io/api/games/${p.id}?key=${YOUR_API_KEY}`)).data;
      return cleanData(apiVideogameData);
    }));
    allApiVideogames = [...allApiVideogames, ...apiVideogamesCleaned];
    totalGames += apiVideogamesCleaned.length;
    page++;
  } while (totalGames < 100);

  return [...databaseVideogames, ...allApiVideogames.slice(0, 100)];
};

module.exports = { getAllVideogame, cleanData };

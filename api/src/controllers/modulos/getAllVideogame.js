require('dotenv').config();
const axios = require("axios");
const { cleanData } = require('../helpers/cleanData');
const { Videogame } = require('../../db');
const { YOUR_API_KEY } = process.env;

const getAllVideogame = async () => {
  const databasevideogame = await Videogame.findAll();
  let allApiVideogame = [];
  let page = 1;
  let totalGames = 0;

  do {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${page}`);
    const apiVideogameRaw = response.data.results;
    const apiVideogameCleaned = await Promise.all(apiVideogameRaw.map(async (p) => {
      const apiVideogameData = (await axios.get(`https://api.rawg.io/api/games/${p.id}?key=${YOUR_API_KEY}`)).data;
      return cleanData(apiVideogameData);
    }));
    allApiVideogame = [...allApiVideogame, ...apiVideogameCleaned];
    totalGames += apiVideogameCleaned.length;
    page++;
  } while (totalGames < 50);

  return [...databasevideogame, ...allApiVideogame.slice(0, 50)];
};

module.exports = { getAllVideogame, cleanData };

const { Router } = require('express');

const videogamesRouter = Router();



const {getVideogameHandler, getIdVideogameHandler} = require ("../handlers/handlers")

videogamesRouter.get("/", (req, res) => {
    res.send("estoy en videogames");
});





videogamesRouter.get("/videogame", getVideogameHandler);
videogamesRouter.get("/videogame/:idVideogame", getIdVideogameHandler);




module.exports = {
    videogamesRouter,
  };
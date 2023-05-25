const { Router } = require('express');

const videogamesRouter = Router();



const {getVideogameHandler, getIdVideogameHandler, getNameHandler} = require ("../handlers/handlers")

videogamesRouter.get("/", (req, res) => {
    res.send("estoy en videogames");
});





videogamesRouter.get("/videogame", getVideogameHandler);
videogamesRouter.get("/videogame/:idVideogame", getIdVideogameHandler);
videogamesRouter.get("/videogame/name/:name", getNameHandler);



module.exports = {
    videogamesRouter,
  };
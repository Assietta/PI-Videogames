const { Router } = require('express');

const videogamesRouter = Router();
const genresRouter = Router();


const {getVideogameHandler, getIdVideogameHandler, getNameHandler, getgenresHandler, postVideogameHandler} = require ("../handlers/handlers")

videogamesRouter.get("/", (req, res) => {
    res.send("estoy en videogames");
});



genresRouter.get("/", getgenresHandler);

videogamesRouter.get("/videogame", getVideogameHandler);
videogamesRouter.get("/videogame/:idVideogame", getIdVideogameHandler);
videogamesRouter.get("/videogame/name/:name", getNameHandler);
videogamesRouter.post("/videogame", postVideogameHandler);


module.exports = {
    videogamesRouter,
    genresRouter
  };
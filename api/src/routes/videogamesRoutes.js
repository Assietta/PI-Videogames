const { Router } = require('express');

const videogamesRouter = Router();



const {getVideogameHandler} = require ("../handlers/handlers")

videogamesRouter.get("/", (req, res) => {
    res.send("estoy en videogames");
});





videogamesRouter.get("/videogame", getVideogameHandler);





module.exports = {
    videogamesRouter,
  };
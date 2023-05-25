const { Router } = require('express');
const { videogamesRouter } = require('./videogamesRoutes');

const router = Router();

// router.use("/", pokemonRouter);
router.use("/", videogamesRouter);
router.use("/videogame", videogamesRouter);
// router.use("/pokemon/:idPokemon", pokemonRouter);
// router.use("/pokemon/name/:name", pokemonRouter);
// router.use("/types", typesRouter);

module.exports = router;

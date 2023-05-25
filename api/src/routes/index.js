const { Router } = require('express');
const { videogamesRouter, genresRouter } = require('./videogamesRoutes');

const router = Router();


router.use("/", videogamesRouter);
router.use("/videogame", videogamesRouter);
router.use("/videogame/:idvideogame", videogamesRouter);
router.use("/videogame/name/:name", videogamesRouter);
router.use("/genres", genresRouter);

module.exports = router;

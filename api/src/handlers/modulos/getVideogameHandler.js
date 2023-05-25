const { getAllVideogame } = require('../../controllers/controllers')


const getVideogameHandler = async (req, res) => {
    try {
        const videogame = await getAllVideogame();
        res.status(200).json(videogame);
    } catch (error) {
        res.status(400).json({error: error.message })
    };
};

module.exports = {
    getVideogameHandler,
}
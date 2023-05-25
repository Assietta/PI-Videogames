const { getIdVideogame } = require('../../controllers/controllers')


const getIdVideogameHandler = async (req, res) => {
    const { idVideogame } = req.params;

    try {
      const videogameApi = await getIdVideogame(idVideogame);
      if (!videogameApi) {
        return res.status(404).send("Videogame not found");
      }
      return res.status(200).json(videogameApi);
    } catch (err) {
      return res.status(500).send(err.message);
    }
};


module.exports = {
    getIdVideogameHandler,
}
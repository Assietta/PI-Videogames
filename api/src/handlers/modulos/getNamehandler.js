const { getName } = require('../../controllers/controllers');

const getNameHandler = async (req, res) => {
  try {
    const { name } = req.params;

    const videogame = await getName(name);

    if (videogame) {
      res.status(200).json(videogame);
    } else {
      res.status(404).json({ message: `No se encontró ningún juego con el nombre ${name}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocurrió un error al buscar el juego' });
  }
};

module.exports = {
  getNameHandler,
};

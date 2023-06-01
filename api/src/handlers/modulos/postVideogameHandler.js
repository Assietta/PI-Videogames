const { createVideogame } = require('../../controllers/controllers');

const postVideogameHandler = async (req, res) => {
  try {
    const { nombre, descripcion, plataformas, image, fechaLanzamiento, rating, genero, isDB } = req.body;
    const newVideogame = await createVideogame(nombre, descripcion, plataformas, image, fechaLanzamiento, rating, genero, isDB);
    res.status(201).json(newVideogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postVideogameHandler,
};
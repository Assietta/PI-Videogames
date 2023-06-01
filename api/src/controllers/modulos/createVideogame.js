const { videogame } = require('../../db');

const createVideogame = async (nombre, descripcion, plataformas, image, fechaLanzamiento, rating, genero, isDB) => {
  const newVideogame = await videogame.create({
    nombre,
    descripcion,
    plataformas,
    image,
    fechaLanzamiento,
    rating,
    genero,
    isDB,
  });
  return newVideogame;
};

module.exports = {
  createVideogame,
};
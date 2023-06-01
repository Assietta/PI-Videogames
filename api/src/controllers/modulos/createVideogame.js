const { v4: uuidv4 } = require('uuid');
const { videogame } = require('../../db');

const createVideogame = async (nombre, descripcion, plataformas, imagen, fechaLanzamiento, rating, genero, isDB) => {
  const newVideogame = await videogame.create({
    id: uuidv4(),
    nombre,
    descripcion,
    plataformas,
    imagen,
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
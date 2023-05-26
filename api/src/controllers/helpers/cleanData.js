const { v4: uuidv4 } = require("uuid");

const cleanData = (data) => {
  const id = data.id || '';
  const nombre = data.name || '';
  const descripcion = data.description || '';
  const plataformas = data.platforms && Array.isArray(data.platforms) ? data.platforms.map(p => p.platform.name) : [];
  const imagen = data.background_image || '';
  const fechaLanzamiento = data.released || '';
  const rating = data.rating || '';
  const genero = data.genres && Array.isArray(data.genres) ? data.genres.map(g => g.name) : [];

  return {
    id,
    nombre,
    descripcion,
    plataformas,
    imagen,
    fechaLanzamiento,
    rating,
    genero,
    isDB: false,
  };
};

module.exports = {
  cleanData
};

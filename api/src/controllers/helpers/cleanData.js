const cleanData = (data) => {
  const nombre = data.name || '';
  const descripcion = data.description || '';
  const plataformas = data.platforms && Array.isArray(data.platforms) ? data.platforms.map(p => p.platform.name) : [];
  const imagen = data.background_image || '';
  const fechaLanzamiento = data.released || '';
  const rating = data.rating || '';
  const genero = data.genres && Array.isArray(data.genres) ? data.genres.map(g => g.name) : [];

  return {
    nombre,
    descripcion,
    plataformas,
    imagen,
    fechaLanzamiento,
    rating,
    genero
  };
};

module.exports = {
  cleanData
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLike } from "../../redux/actions";
import Card from "../../components/Card/Card";

const Like = () => {
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogamesID);
  const likevideogame = useSelector((state) => state.likevideogame);

  useEffect(() => {
    if (videogame.length > 0) {
      const commonGenres = getCommonGenres(videogame[0].genero);
      dispatch(getLike(commonGenres));
    }
  }, [dispatch, videogame]);

  // Función para obtener los géneros en común con "videogame"
  const getCommonGenres = (generosVideogame) => {
    const generosVideogameSet = new Set(generosVideogame);
    const commonGenres = likevideogame
      .filter((juego) => juego.id !== videogame[0].id) // Filtrar el juego de "videogamesID"
      .flatMap((juego) => juego.genero)
      .filter((genero) => generosVideogameSet.has(genero));
    return commonGenres;
  };

  // Ordenar los juegos según la cantidad de géneros en común y tomar solo los 5 primeros
  const filteredGames = likevideogame
    .filter((juego) => juego.id !== videogame[0].id) // Filtrar el juego de "videogamesID"
    .map((juego) => ({
      ...juego,
      generosComunes: juego.genero.filter((genero) =>
        videogame[0].genero.includes(genero)
      ).length,
    }))
    .sort((a, b) => b.generosComunes - a.generosComunes)
    .slice(0, 5);

  return (
      <>
      {filteredGames.map(
        ({ id, nombre, descripcion, plataformas, fechaLanzamiento, rating, genero, isDB, imagen }) => (
            <Card
              id={id}
              nombre={nombre}
              descripcion={descripcion}
              plataformas={plataformas}
              fechaLanzamiento={fechaLanzamiento}
              rating={rating}
              genero={genero}
              imagen={imagen}
              isDB={isDB}
            />
        )
      )}
    </>
  );
};

export default Like;

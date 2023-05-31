import Card from '../Card/Card.jsx';
import style from './Cards.module.css'
import { useSelector, useDispatch } from "react-redux"
import Paginado from '../Paginado/paginado.jsx';
import { useState, useEffect } from 'react';


export default function Cards() { // eslint-disable-next-line
   const dispatch = useDispatch();
   const videogames = useSelector(state => state.videogames);

   const [currentPage, setCurrentPage] = useState(1) // eslint-disable-next-line
   const [VideogamesPerPage, setVideogamesPerPage] = useState(15)
   const indexOfLastVideogame = currentPage * VideogamesPerPage
   const indexOfFirstVideogame = indexOfLastVideogame - VideogamesPerPage
   const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

   useEffect(() => {
      setCurrentPage(1); // Reiniciar la página actual a 1 al cambiar los filtros
    }, [videogames]);

   const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
   }

   return (
      <div >
      <div className={style.cards}>
         {
            currentVideogames.map(({ id, nombre, descripcion, plataformas, fechaLanzamiento, rating, genero, isDB, imagen }) => {
               return <Card
                  id={id}
                  key={id}
                  nombre={nombre}
                  descripcion={descripcion}
                  plataformas={plataformas}
                  fechaLanzamiento={fechaLanzamiento}
                  rating={rating}
                  genero={genero}
                  imagen={imagen}
                  isDB={isDB}
               />
            })
         }
      </div>
      <div >
         <div className={style.center}>
            <Paginado
                  className='paginado'
                  VideogamesPerPage={VideogamesPerPage}
                  totalVideogames={videogames.length}
                  paginado={paginado}
                  currentPage={currentPage}
            />
         </div>
      </div>
      </div>
   )
}
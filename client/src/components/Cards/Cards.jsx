import Card from '../Card/Card.jsx';
import style from './Cards.module.css'
import { useSelector, useDispatch } from "react-redux"
import Paginado from '../Paginado/paginado.jsx';
import { useState, useEffect } from 'react';


export default function Cards() {
   const dispatch = useDispatch();
   const videogames = useSelector(state => state.videogames);

   const [currentPage, setCurrentPage] = useState(1);
   const [VideogamesPerPage, setVideogamesPerPage] = useState(15);
   const indexOfLastVideogame = currentPage * VideogamesPerPage;
   const indexOfFirstVideogame = indexOfLastVideogame - VideogamesPerPage;
   const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

   useEffect(() => {
      setCurrentPage(1);
   }, [videogames]);

   const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   return (
      <div>
         <div className={style.cards}>
            {currentVideogames.length > 0 ? (
               currentVideogames.map(({ id, nombre, descripcion, plataformas, fechaLanzamiento, rating, genero, isDB, imagen }) => (
                  <Card
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
               ))
            ) : (
               <p></p>
            )}
         </div>
         {videogames.length > VideogamesPerPage && (
            <div className={style.center}>
               <Paginado
                  className='paginado'
                  VideogamesPerPage={VideogamesPerPage}
                  totalVideogames={videogames.length}
                  paginado={paginado}
                  currentPage={currentPage}
               />
            </div>
         )}
      </div>
   );
}

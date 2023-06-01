import style from "./Card.module.css";
import { Link } from 'react-router-dom';

export default function Card({ id, nombre, descripcion, plataformas, fechaLanzamiento, rating, genero, isDB, imagen }) {
   return (
      <div className={style.card}>
         <Link to={`/detail/${id}`} className={style.link}>
         <div className={style.front}>
            <div className={style.imageContainer}>
               <img
                  src={imagen}
                  alt={imagen}
                  className={style.image}
               />
            </div>
               <h2 className={style.name}>{nombre}</h2>
            </div>
            <div className={style.genero}>
               {genero.map((genero) => (
                  <span key={genero} className={style.tipo}>{genero}</span>
               ))}
            </div>
      </Link>
      </div>
   );
}

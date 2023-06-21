import style from "./Card.module.css";
import { Link } from 'react-router-dom';

export default function Card({ id, nombre, descripcion, plataformas, fechaLanzamiento, rating, genero, isDB, imagen }) {
   window.scrollTo(0, 0);
   return (
      <div className={style.card}>
         <Link to={`/detail/${id}#`} className={style.link}>
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
            <p className={style.name}>Rating: {rating}</p>
      </Link>
      </div>
   );
}

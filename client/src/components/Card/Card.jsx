import style from "./Card.module.css";

export default function Card({ id, nombre, descripcion, plataformas, fechaLanzamiento, rating, genero, isDB, imagen }) {
   return (
      <div className={style.card}>
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
         <div>
            {genero.map((genero) => (
               <span key={genero} className={style.tipo}>{genero}</span>
            ))}
         </div>
      </div>
   );
}

import { Link } from "react-router-dom";
import style from './Landing.module.css'

const Landing = () => {
  return (
    <div className={`${style.container} ${style.background}`}>
      <h1 className={style.title}>Bienvenido a Pokemon-PI</h1>
      <p className={style.subtitle}>
        Creado y Diseñado por <a href="https://www.linkedin.com/in/assietta/" className={style.link}>Jeremias Brussino</a>
      </p>
      <div className={style.imagecontainer}>
        <img src="https://areajugones.sport.es/wp-content/uploads/2022/06/the-last-of-us-remake-1.webp" alt="Imagen 1" />
        <img src="https://areajugones.sport.es/wp-content/uploads/2022/06/the-last-of-us-remake-1.webp" alt="Imagen 2" />
        <img src="https://areajugones.sport.es/wp-content/uploads/2022/06/the-last-of-us-remake-1.webp" alt="Imagen 3" />
      </div>
      <div className={style["button-container"]}>
        <Link to="/Home" className={style.button}>Entrar</Link>
      </div>
    </div>
  );
  
};

export default Landing;

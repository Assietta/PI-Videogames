import { Link } from "react-router-dom";
import style from './Landing.module.css'
import imagen from "./Sin título-5.png"
import imagen2 from "./Sin título-4.png"
import imagen3 from "./Sin título-6.png"
const Landing = () => {
  return (
    <div className={`${style.container} ${style.background}`}>
      <h1 className={style.title}>Bienvenido a Videogames-PI</h1>
      <p className={style.subtitle}>
        Creado y Diseñado por <a href="https://www.linkedin.com/in/assietta/" className={style.link}>Jeremias Brussino</a>
      </p>
      <div className={style.imagecontainer}>
        <img src={imagen} alt="Imagen 1" />
        <img src={imagen2} alt="Imagen 2" />
        <img src={imagen3} alt="Imagen 3" />
      </div>
      <div className={style["button-container"]}>
        <Link to="/Home" className={style.button}>Entrar</Link>
      </div>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path fill="#FF0066" d="M32.1,-22.9C41.7,-2,49.4,15.5,43.8,26.6C38.1,37.7,19.1,42.4,-0.5,42.7C-20.1,43,-40.2,38.9,-53.4,23.4C-66.6,7.9,-72.9,-18.9,-62.9,-40C-52.8,-61.1,-26.4,-76.5,-7.6,-72.2C11.3,-67.8,22.6,-43.7,32.1,-22.9Z" transform="translate(100 100)" />
</svg>
    </div>
  );
  
};

export default Landing;

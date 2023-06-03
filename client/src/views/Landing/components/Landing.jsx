import { Link } from "react-router-dom";
import style from './Landing.module.css'
import imagen from "./Sin título-5.png"
import imagen2 from "./Sin título-4.png"
import imagen3 from "./Sin título-6.png"
const Landing = () => {
  return (
    <div className={`${style.container} ${style.background}`}>
      <svg className={style.svg} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" d="M56.5,-27C69.7,-9.6,74.7,18.2,63.9,32C53.1,45.8,26.5,45.6,6.3,42C-14,38.4,-28.1,31.3,-33.7,20.5C-39.4,9.7,-36.7,-5,-29.7,-18.8C-22.7,-32.6,-11.3,-45.5,5.1,-48.5C21.6,-51.4,43.2,-44.4,56.5,-27Z" transform="translate(120 150)" />
      </svg>
      <h1 className={style.title}>Welcome to Videogames-PI</h1>
      <p className={style.subtitle}>
        Created & Designed for <a href="https://www.linkedin.com/in/assietta/" className={style.link} target="_blank">Jeremias Brussino</a>
      </p>
      <div className={style.imagecontainer}>
        <img src={imagen} alt="Imagen 1" />
        <img src={imagen2} alt="Imagen 2" />
        <img src={imagen3} alt="Imagen 3" />
      </div>
      <div className={style["button-container"]}>
        <Link to="/Home" className={style.button}>Go Ahead!</Link>
      </div>
    </div>
  );
  
};

export default Landing;

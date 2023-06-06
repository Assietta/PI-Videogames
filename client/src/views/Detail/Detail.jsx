import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getID } from "../../redux/actions";
import style from './Detail.module.css';
import Like from "./like.jsx";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogamesID);

    useEffect(() => {
        dispatch(getID(id));
    }, [dispatch, id]);
    

    if (videogames.length > 0) {
        const videogame = videogames[0];
        return (
            <div className={style.videogamesdetail}>
                <div className={style.container}>
                    <div className={style.div1}>
                        <h1 className={style.title}>Id: {videogames[0].id}</h1>
                        <h2 className={style.title}>Name: {videogames[0].nombre}</h2>
                        <p className={style.texto}>Relase Date: {videogames[0].fechaLanzamiento}</p>
                        <p className={style.texto}>Rating: {videogames[0].rating}</p>
                        <p className={style.plat}>Platforms:  </p>
                            <div>
                                {videogames[0].plataformas && Array.isArray(videogames[0].plataformas) && videogames[0].plataformas.map((plataformas) => (
                                    <span key={plataformas} className={style.genre}>{plataformas}</span>
                                ))}
                            </div>
                       
                        <p className={style.plat}> Genres: </p>
                            <div>
                                {videogames[0].genero && Array.isArray(videogames[0].genero) && videogames[0].genero.map((genero) => (
                                    <span key={genero} className={style.genre}>{genero}</span>
                                ))}
                            </div>
                        
                    </div>
                    <div className={style.div2}>
                        <img className={style.image} src={videogames[0].imagen} alt={videogames.nombre} />
                        <p className={style.description}>Description: {videogames[0].descripcion}</p>
                    </div>
                </div>
                <h1 className={style.h1}>Games like {videogames[0].nombre}</h1>
                <div className={style.recomendacion}>
                    <Like/>
                </div>
            </div>
        );
    }
};

export default Detail;

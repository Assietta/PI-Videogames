import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getID } from "../../redux/actions";
import style from './Detail.module.css';

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogamesID);

    useEffect(() => {
        dispatch(getID(id));
    }, [dispatch, id]);

    if (typeof videogames === 'object') {
        return (
            <div className={style.videogamesdetail}>
                <div className={style.container}>
                    <div>
                        <h1 className={style.title}>Id: {videogames.id}</h1>
                        <h2 className={style.title}>Nombre: {videogames.nombre}</h2>
                        <img className={style.image} src={videogames.imagen} alt={videogames.nombre} />
                    </div>
                    <div>
                        <p className={style.description}>Descripción: {videogames.descripcion}</p>
                        <p className={style.description}>Plataformas: {videogames.plataformas}</p>
                        <p className={style.description}>Fecha de lanzamiento: {videogames.fechaLanzamiento}</p>
                        <p className={style.description}>Rating: {videogames.rating}</p>
                        <div>
                            {videogames.genres && Array.isArray(videogames.genres) && videogames.genres.map((genero) => (
                                <span key={genero} className={style.genre}>{genero}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Detail;

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
                    <div className={style.div1}>
                        <h1 className={style.title}>Id: {videogames.id}</h1>
                        <h2 className={style.title}>Nombre: {videogames.nombre}</h2>
                        <p className={style.texto}>Fecha de lanzamiento: {videogames.fechaLanzamiento}</p>
                        <p className={style.texto}>Rating: {videogames.rating}</p>
                        <p className={style.texto}>Plataformas: <div>
                            {videogames.plataformas && Array.isArray(videogames.plataformas) && videogames.plataformas.map((plataformas) => (
                                <span key={plataformas} className={style.genre}>{plataformas}</span>
                            ))}
                        </div></p> Generos:
                        <div>
                            {videogames.genero && Array.isArray(videogames.genero) && videogames.genero.map((genero) => (
                                <span key={genero} className={style.genre}>{genero}</span>
                            ))}
                        </div>
                    </div>
                    <div className={style.div2}>
                        <img className={style.image} src={videogames.imagen} alt={videogames.nombre} />
                        <p className={style.description}>Descripción: {videogames.descripcion}</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Detail;

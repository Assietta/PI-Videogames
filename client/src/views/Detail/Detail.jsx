import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getID } from "../../redux/actions";
import style from './Detail.module.css'

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogamesID);


    useEffect(() => {
        dispatch(getID(id));
    }, [dispatch, id]);

    if ( typeof (videogames) === 'object' ) {
        
        return (
            <div className={style.videogamesdetail}>
                <div className={style.container}>
                        <div>
                        <h1>Id: {videogames.id}</h1>
                        <h2>Nombre: {videogames.nombre}</h2>
                        <img src={videogames.imagen} alt={videogames.nombre}/>
                        </div>
                    <div>
                    <p>descripcion: {videogames.descripcion}</p>
                    <p>plataformas: {videogames.plataformas}</p>
                    <p>fechaLanzamiento: {videogames.fechaLanzamiento}</p>
                    <p>rating: {videogames.rating}</p>
                        <div>
                        {videogames.genres && Array.isArray(videogames.genres) && videogames.genres.map((genero) => (
                            <span key={genero} className={style.tipo}>{genero}</span>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
    )
    }
}

export default Detail;


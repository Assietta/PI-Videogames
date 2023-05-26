// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { CLEAN_DETAIL, cleanID, getID } from "../../redux/actions";
// import style from './Detail.module.css'

// const Detail = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const pokemon = useSelector((state) => state.pokemonsID);


//     useEffect(() => {
//         dispatch(getID(id));
//         return () => {
//           dispatch(cleanID(CLEAN_DETAIL))
//         }
//     }, [dispatch, id, pokemon]);

//     if ( typeof (pokemon) === 'object' ) {
        
//         return (
//             <div className={style.pokemondetail}>
//   <div className={style.container}>
//     <div className={style.div1}>
//       <h1>Id: {pokemon.id}</h1>
//       <h2>{pokemon.name}</h2>
//       <img src={pokemon.imagen} alt={pokemon.name} className={style.image}/>
//     </div>
//     <div className={style.div2}>
//       <p>Vida: {pokemon.vida}</p>
//       <p>Ataque: {pokemon.ataque}</p>
//       <p>Defensa: {pokemon.defensa}</p>
//       <p>Velocidad: {pokemon.velocidad}</p>
//       <p>Altura: {pokemon.altura}</p>
//       <p>Peso: {pokemon.peso}</p>  
//     <div className={style.types}>
//       {pokemon.tipos && Array.isArray(pokemon.tipos) && pokemon.tipos.map((tipo) => (
//         <span key={tipo} className={style.tipo}>{tipo}</span>
//       ))}
//     </div>
//     </div>
//   </div>
// </div>
//     )
//     }
// }

// export default Detail;


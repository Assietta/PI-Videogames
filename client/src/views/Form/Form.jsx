import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { postPokemon, getGenres } from '../../redux/actions';
import React, { useEffect, useState, useRef } from 'react';

const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const formRef = useRef(null);

  const [input, setInput] = useState({
    name: '',
    imagen: '',
    vida: 0,
    ataque: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipos: ['', ''],
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, imagen, vida, ataque, defensa, velocidad, altura, peso, tipos } = input;
    const pokemonData = {
      name,
      imagen,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      tipos: tipos,
    };

    console.log(pokemonData);
    
    formRef.current.reset(); // Restablecer el formulario
    setInput({
      name: '',
      imagen: '',
      vida: 0,
      ataque: 0,
      defensa: 0,
      velocidad: 0,
      altura: 0,
      peso: 0,
      tipos: ['', ''],
    }); // Restablecer los valores del estado
  };
  

//   const handleTypeChange = (event) => {
//     const selectedGenres = Array.from(document.querySelectorAll('input[name=type]:checked')).map((input) => input.value);


   
//     setInput({
//       ...input,
//       genres: selectedGenres,
//     });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setInput({
//       ...input,
//       [name]: value,
//     });
//   };
      
  return (
    <div className={style.container}>
        <form className={style.formulario} action="">
            
            <label htmlFor="name">Nombre: </label>
            <input type="text" />

            <label htmlFor="image">Imagen: </label>
            <input type="url" />
            
            <label htmlFor="descripcion">Descripcion: </label>
            <input type="text" />
            
            <label htmlFor="plataformas">Plataformas: </label>
            <input type="text" />
            
            <label htmlFor="fechalanzamiento">Fecha de Lanzamiento: </label>
            <input type="text" />
            
            <label htmlFor="rating">Rating: </label>
            <input type="number" />

            <label htmlFor="genre">Genero(s): </label>
            <div className={style.checktipes}>



            {genres.map((genres) => ( 
          <label key={genres} className={style.checkboxes}>
            <input
              type="checkbox"
              name="type"
              value={genres}
            //   checked={selectedGenres.includes(genres)}
            //   onChange={handleTypeChange}
            />
                {genres.charAt(0).toUpperCase() + genres.slice(1)}
                </label>
                ))}
            </div>


            <button type="submit" id="submit-button">Crear Pokemon</button>
        </form>

    </div>
  )


//   return (
//     <>
//     <div className={style.newpokemoncontainer}>
//       <form id="new-pokemon-form" ref={formRef} className={style.newpokemonform} onSubmit={handleSubmit}>
//           <label htmlFor="name">Nombre:</label>
//           <input value={input.name} type="text" id="name" name="name" required onChange={handleInputChange} />
  
//           <label htmlFor="imagen">Imagen:</label>
//           <input value={input.imagen} type="url" id="imagen" name="imagen" required onChange={handleInputChange} />

//           <label htmlFor="vida">Vida:</label>
//           <input value={input.vida} type="number" id="vida" name="vida" min="0" max="100" required onChange={handleInputChange} />
    
//           <label htmlFor="ataque">Ataque:</label>
//           <input value={input.ataque} type="number" id="ataque" name="ataque" min="0" max="100" required onChange={handleInputChange} />
        
//           <label htmlFor="defensa">Defensa:</label>
//           <input value={input.defensa} type="number" id="defensa" name="defensa" min="0" max="100" required onChange={handleInputChange} />
        
//           <label htmlFor="velocidad">Velocidad:</label>
//           <input value={input.velocidad === null ? "" : input.velocidad} type="number" id="velocidad" name="velocidad" min="0" max="100" onChange={handleInputChange} />
        
//           <label htmlFor="altura">Altura:</label>
//           <input value={input.altura} type="number" id="altura" name="altura" min="0" max="10" onChange={handleInputChange} />
        
//           <label htmlFor="peso">Peso:</label>
//           <input value={input.peso} type="number" id="peso" name="peso" min="0" max="1000" onChange={handleInputChange} />
        
//       </form>

//       <div className={style.card}>

//          <div className={style.front}>
//                 <div className={style.imageContainer}>
//                   <img 
//                       src={input.imagen} 
//                       alt={input.imagen} 
//                       className={style.image} 
//                       />
//                 </div>
//                 <h2 className={style.name}>{input.name}</h2>
//                 <div className={style.types}>
//                   {input.tipos.map((tipo) => (
//                     <span key={tipo} className={style.tipo}>{tipo}</span>
//                   ))}

//                 </div>
//             </div>

//         <div className={style.back}>
//                   <div className={style.stats}>
//                      <div className={style.stat}>
//                         <span className={style.statName}>Vida:</span>
//                         <span className={style.statValue}>{input.vida}</span>
//                      </div>
//                      <div className={style.stat}>
//                         <span className={style.statName}>Ataque:</span>
//                         <span className={style.statValue}>{input.ataque}</span>
//                      </div>
//                      <div className={style.stat}>
//                         <span className={style.statName}>Defensa:</span>
//                         <span className={style.statValue}>{input.defensa}</span>
//                      </div>
//                      <div className={style.stat}>
//                         <span className={style.statName}>Velocidad:</span>
//                         <span className={style.statValue}>{input.velocidad}</span>
//                      </div>
//                      <div className={style.stat}>
//                         <span className={style.statName}>Altura:</span>
//                         <span className={style.statValue}>{input.altura}</span>
//                      </div>
//                      <div className={style.stat}>
//                         <span className={style.statName}>Peso:</span>
//                         <span className={style.statValue}>{input.peso}</span>
//                      </div>
//                   </div>
//                </div>

//         </div>
//       </div>
//     </>
//     );
  };
  
  export default Form;
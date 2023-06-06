import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogames } from '../../redux/actions';
import React, { useState, useRef } from 'react';
import { Error, Success, Warning } from './Error';

const Form = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const genres = useSelector((state) => state.genres);
  const plataformas = useSelector((state) => state.plataformas);
  const [platformError, setPlatformError] = useState('');
  const [genreError, setGenreError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(null);
  const [input, setInput] = useState({
    nombre: '',
    imagen: '',
    descripcion: '',
    plataformas: '',
    fechaLanzamiento: '',
    rating: '',
    genero: [],
});
const [errorMessages, setErrorMessages] = useState({
    nombre: '',
    imagen: '',
    rating: '',
    fechaLanzamiento: '',
    plataformas: '',
    genero: '',
});

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setInput((prevInput) => ({ ...prevInput, [name]: value }));

  // Validar nombre
  if (name === 'nombre') {
    let errorMessage = '';
    if (value.trim() === '') {
      errorMessage = 'The name cant be null';
    } else if (value.startsWith(' ')) {
      errorMessage = 'The name cant start whit a space';
    } else if (value.length > 20) {
      errorMessage = 'The name cant be longer than 20 characters';
    }
    setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, [name]: errorMessage }));
  }

  // Validar imagen
  if (name === 'imagen') {
    const isValid = isValidUrl(value);
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      [name]: isValid ? '' : 'Incorrect image, insert an URL',
    }));
  }

  //validar fecha
  if (name === 'fechaLanzamiento') {
    let formattedDate = isValidDate(value);
    let errorMessage = '';
    if (!isValidDate(value)) {
      errorMessage = 'La fecha de lanzamiento es inválida';
    }
    setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, [name]: errorMessage }));
    setInput((prevInput) => ({ ...prevInput, [name]: formattedDate }));
  }
  

  // Validar rating
  if (name === 'rating') {
    let formattedRating = formatRating(value);
    let errorMessage = '';
    if (formattedRating === '0.00' || formattedRating < 0 || formattedRating > 5.01) {
      errorMessage = 'The rating is wrong';
    }
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      [name]: errorMessage,
    }));
    setInput((prevInput) => ({ ...prevInput, [name]: formattedRating }));
  }

  // Validar descripcion
  if (name === 'descripcion') {
    let errorMessage = '';
    if (value.trim() === '') {
      errorMessage = 'The description cant be null';
    } 
    setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, [name]: errorMessage }));
  }

  // Validar plataformas
  if (name === 'plataforma') {
    let errorMessage = '';
    if (value.length === 0) {
      errorMessage = 'Check at least one Platform';
    }
    setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, [name]: errorMessage }));
  }

  // Validar generos
  if (name === 'genre') {
    let errorMessage = '';
    if (value.length === 0) {
      errorMessage = 'Check at least one Genre';
    }
    setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, [name]: errorMessage }));
  }

  };


const handleSubmit = (event) => {
    event.preventDefault();
    const { nombre, imagen, descripcion, plataformas, fechaLanzamiento, rating, genero } = input;
    const videogamesData = {
      nombre,
      imagen,
      descripcion,
      plataformas,
      fechaLanzamiento,
      rating,
      genero,
    };
    dispatch(postVideogames(videogamesData))
      .then(() => {
        setFormSubmitted(true); // Actualiza el estado si se crea exitosamente el formulario
        console.log('Videogame created');
      })
      .catch((error) => {
        setFormSubmitted(false); // Actualiza el estado si hay algún error al crear el formulario
        console.log('Error to create the videogame:', error);
      });
    console.log(videogamesData);
    
    formRef.current.reset();
    setInput({
      nombre: '',
      imagen: '',
      descripcion: '',
      plataformas: '',
      fechaLanzamiento: '',
      rating: 0.00,
      genero: [],
    });
    setErrorMessages({
        nombre: '',
        imagen: '',
        rating: '',
        fechaLanzamiento: '',
        plataformas: '',
        genero: [],
      });
  };

  
const isValidUrl = (url) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };
  

  const formatRating = (value) => {
    let formattedRating = value;
    if (formattedRating.length > 2) {
      if (formattedRating.charAt(1) !== '.') {
        formattedRating = formattedRating.slice(0, 1) + "." + formattedRating.slice(1, 4);
      }
    }
  if (formattedRating > '5.00') {
      formattedRating = '5.00';
    }
    if (formattedRating.length > 4) {
      formattedRating = formattedRating.slice(0, 4);
    }
    console.log(formattedRating);
    return formattedRating;
  };
  
  
  
  
  const isValidDate = (date) => {
    let formattedDate = date;
    if (formattedDate.length > 4) {
      if (formattedDate.charAt(4) !== '-') {
        formattedDate = formattedDate.slice(0, 4) + "-" + formattedDate.slice(4, 6);
      }
      if (formattedDate.length > 7) {
        if (formattedDate.charAt(7) !== '-') {
          formattedDate = formattedDate.slice(0, 7) + "-" + formattedDate.slice(7, 10);
        }
      }
    }
    if (formattedDate.length > 10) {
      formattedDate = formattedDate.slice(0, 10);
    }
    console.log(formattedDate);
    return formattedDate;
  };

const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setInput((prevInput) => ({
        ...prevInput,
        genero: [...prevInput.genero, value],
      }));
      setGenreError('');
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        genero: '',
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        genero: prevInput.genero.filter((genre) => genre !== value),
      }));
      if (input.genero.length === 1) {
        setGenreError('Check at least one Genre');
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          genero: 'Check at least one Genre',
        }));
      }
    }
  };
  
const handlePlataformaChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setInput((prevInput) => ({
        ...prevInput,
        plataformas: [...prevInput.plataformas, value],
      }));
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        plataformas: '',
      }));
      setPlatformError('');
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        plataformas: prevInput.plataformas.filter(
          (plataforma) => plataforma !== value
        ),
      }));
      if (input.plataformas.length === 1) {
        setPlatformError('Check at least one Platform');
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          plataformas: 'Check at least one Platform',
        }));
      }
    }
  };
  
  return (
    
    <div className={style.container}>
      
      <form className={style.formulario} onSubmit={handleSubmit} ref={formRef}>
        
        <div className={style.buttonContainer}>
          <button className={style.button} type="submit" id="submit-button" disabled={Object.values(errorMessages).some((message) => message !== '') || Object.values(input).some((value) => value === '') || input.genero.length === 0 || input.plataformas.length === 0}>Create a videogame</button>
          {formSubmitted === true ? (
            <Success />
          ) : formSubmitted === false ? (
            <Error />
          ) : (
            <Warning />
          )}
        </div>
          
        <div className={style.grid}>
          <div className={style.div1}>
            <label htmlFor="name">Name: </label>
            <input placeholder='Write a name...' type="text" name="nombre" value={input.nombre} onChange={handleInputChange} onBlur={handleInputChange}/>
                {errorMessages.nombre && <p>{errorMessages.nombre}</p>}
                        
            <label htmlFor="imagen">Image: </label>
            <input placeholder='Insert a URL' type="url" name="imagen" value={input.imagen} onChange={handleInputChange} onBlur={handleInputChange}/>
                {errorMessages.imagen && <p>{errorMessages.imagen}</p>}   
        
            <label htmlFor="fechalanzamiento">Release date: </label>
            <input placeholder='YYYY-MM-DD' type="text" name="fechaLanzamiento" value={input.fechaLanzamiento} onChange={handleInputChange} onBlur={handleInputChange}/>
                {errorMessages.fechaLanzamiento && <p>{errorMessages.fechaLanzamiento}</p>}

          </div>
          <div className={style.div2}>
            <label htmlFor="rating">Rating: </label>
            <input placeholder='Ej: 3,54' type="number" name="rating" step="0.01" value={input.rating} onChange={handleInputChange} onBlur={handleInputChange}/>
                {errorMessages.rating && <p>{errorMessages.rating}</p>}

            <label  htmlFor="descripcion">Descripcion: </label>
            <textarea placeholder='Embark on an epic adventure, where you must navigate treacherous challenges, uncover hidden secrets, and save the world from impending doom in this thrilling and immersive game.' className={style.descripcion} type="text" name="descripcion" value={input.descripcion} onChange={handleInputChange} onBlur={handleInputChange}/>
                {errorMessages.descripcion && <p>{errorMessages.descripcion}</p>}
          </div>
          <div className={style.div3}>
            <label htmlFor="plataformas">Platforms: </label>
            <div className={style.checktipes}>
              {plataformas.map((plataforma) => (
                  <label key={plataforma} className={style.checkboxesplat}>
                    <input
                      type="checkbox"
                      name="plataforma"
                      value={plataforma}
                      checked={input.plataformas.includes(plataforma)}
                      onChange={handlePlataformaChange}
                    />
                     <span className={style.checkboxText}>
                      {plataforma.charAt(0).toUpperCase() + plataforma.slice(1)}
                      </span>
                  </label>
              ))}
            </div>      
                {platformError && <p>{platformError}</p>}
          </div>
          <div className={style.div4}>
            <label htmlFor="genre">Genre(s): </label>
            <div className={style.checktipes}>
              {genres.map((genre) => (
                <label key={genre} className={style.checkboxes}>
                  <input
                    type="checkbox"
                    name="genre"
                    value={genre}
                    checked={input.genero.includes(genre)}
                    onChange={handleGenreChange}
                  />
                  <span className={style.checkboxText}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            {genreError && <p>{genreError}</p>}
        </div>

        </div>
      </form>

      <div className={style.presentacion}>
        <div className={style.card}>
          <div className={style.front}>
            <div className={style.imagenContainer}>
              <img src={input.imagen} alt={input.imagen} className={style.imagen} />
            </div>
              <h2 className={style.name}>{input.nombre}</h2>
          </div>
          <div className={style.genero}>
            {input.genero.map((genre) => (
              <span key={genre} className={style.tipo}>{genre}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

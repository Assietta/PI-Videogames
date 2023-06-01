import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogames, getGenres } from '../../redux/actions';
import React, { useEffect, useState, useRef } from 'react';

const Form = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const genres = useSelector((state) => state.genres);
  const plataformas = useSelector((state) => state.plataformas);
  const [platformError, setPlatformError] = useState('');
  const [genreError, setGenreError] = useState('');
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

useEffect(() => {
  dispatch(getGenres());
}, [dispatch]);


const handleInputChange = (event) => {
  const { name, value } = event.target;
  setInput((prevInput) => ({ ...prevInput, [name]: value }));

  // Validar nombre
  if (name === 'nombre') {
    let errorMessage = '';
    if (value.trim() === '') {
      errorMessage = 'El nombre no puede estar vacío';
    } else if (value.startsWith(' ')) {
      errorMessage = 'El nombre no puede empezar con espacios';
    } else if (value.length > 20) {
      errorMessage = 'El nombre no puede tener más de 20 caracteres';
    }
    setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, [name]: errorMessage }));
  }

  // Validar imagenn
  if (name === 'imagen') {
    const isValid = isValidUrl(value);
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      [name]: isValid ? '' : 'La imagenn es inválida, inserte URL',
    }));
  }

  //validar fecha
  if (name === 'fechaLanzamiento') {
    let errorMessage = '';
    if (!isValidDate(value)) {
      errorMessage = 'La fecha de lanzamiento es inválida';
    }
    setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, [name]: errorMessage }));
  }
  

  // Validar rating
  if (name === 'rating') {
    let formattedRating = value.trim() === '' ? '0.00' : formatRating(value);
    let errorMessage = '';
    if (formattedRating === '0.00' || parseFloat(formattedRating) < 0 || parseFloat(formattedRating) > 10) {
      errorMessage = 'El rating es inválido';
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
      errorMessage = 'La descripcion no puede estar vacía';
    } 
    setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, [name]: errorMessage }));
  }

  // Validar plataformas
  if (name === 'plataforma') {
    let errorMessage = '';
    if (value.length === 0) {
      errorMessage = 'Debe seleccionar al menos una plataforma';
    }
    setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, [name]: errorMessage }));
  }

  // Validar generos
  if (name === 'genre') {
    let errorMessage = '';
    if (value.length === 0) {
      errorMessage = 'Debe seleccionar al menos un genero';
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
    dispatch(postVideogames(videogamesData));
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
  
const formatRating = (rating) => {
    let formattedRating = parseFloat(rating).toFixed(2);
    if (formattedRating.length > 4) {
      formattedRating = formattedRating.slice(0, 4);
    }
    return formattedRating;
  };
  
const isValidDate = (date) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
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
        setGenreError('Debe seleccionar al menos un género');
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          genero: 'Debe seleccionar al menos un género',
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
        setPlatformError('Debe seleccionar al menos una plataforma');
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          plataformas: 'Debe seleccionar al menos una plataforma',
        }));
      }
    }
  };
  
  return (
    <div className={style.container}>
      <form className={style.formulario} onSubmit={handleSubmit} ref={formRef}>
        <div className={style.grid}>
          <div className={style.div1}>
            <label htmlFor="name">Nombre: </label>
            <input placeholder='Escriba un Nombre' type="text" name="nombre" value={input.nombre} onChange={handleInputChange} onBlur={handleInputChange}/>
                {errorMessages.nombre && <p>{errorMessages.nombre}</p>}
                        
            <label htmlFor="imagen">imagenn: </label>
            <input placeholder='Inserte una URL' type="url" name="imagen" value={input.imagen} onChange={handleInputChange} onBlur={handleInputChange}/>
                {errorMessages.imagen && <p>{errorMessages.imagen}</p>}   
        
            <label htmlFor="fechalanzamiento">Fecha de Lanzamiento  (Formato YYYY-MM-DD): </label>
            <input placeholder='YYYY-MM-DD' type="text" name="fechaLanzamiento" value={input.fechaLanzamiento} onChange={handleInputChange} onBlur={handleInputChange}/>
                {errorMessages.fechaLanzamiento && <p>{errorMessages.fechaLanzamiento}</p>}

          </div>
          <div className={style.div2}>
            <label htmlFor="rating">Rating: </label>
            <input placeholder='Ej: 3,54' type="number" name="rating" step="0.01" value={input.rating} onChange={handleInputChange} onBlur={handleInputChange}/>
                {errorMessages.rating && <p>{errorMessages.rating}</p>}

            <label  htmlFor="descripcion">Descripcion: </label>
            <textarea placeholder='este es un videojuego muy bueno ya que tiene muchas funcionalidades y cosas nuevas experimentales....' className={style.descripcion} type="text" name="descripcion" value={input.descripcion} onChange={handleInputChange} onBlur={handleInputChange}/>
                {errorMessages.descripcion && <p>{errorMessages.descripcion}</p>}
          </div>
          <div className={style.div3}>
            <label htmlFor="plataformas">Plataformas: </label>
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
            <label htmlFor="genre">Género(s): </label>
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
          <button type="submit" id="submit-button" disabled={ Object.values(errorMessages).some((message) => message !== '') || Object.values(input).some((value) => value === '') || input.genero.length === 0 || input.plataformas.length === 0 }>Crear Videogame</button>
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

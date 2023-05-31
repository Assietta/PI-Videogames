import style from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { postPokemon, getGenres } from '../../redux/actions';
import React, { useEffect, useState, useRef } from 'react';

const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const formRef = useRef(null);

  const [input, setInput] = useState({
    nombre: '',
    image: '',
    descripcion: '',
    plataformas: '',
    fechaLanzamiento: '',
    rating: '',
    genero: [],
});

const [errorMessages, setErrorMessages] = useState({
    nombre: '',
    image: '',
    rating: '',
    fechaLanzamiento: '',
});

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setInput((prevInput) => ({ ...prevInput, [name]: value }));

  // Validar nombre
  if (name === 'nombre') {
    let errorMessage = '';
    if (value.trim() === '') {
      errorMessage = 'El nombre no puede estar vacío';
    } else if (value.includes(' ')) {
      errorMessage = 'El nombre no puede contener espacios';
    } else if (value.length > 20) {
      errorMessage = 'El nombre no puede tener más de 20 caracteres';
    }
    setErrorMessages((prevErrorMessages) => ({ ...prevErrorMessages, [name]: errorMessage }));
  }

  // Validar imagen
  if (name === 'image') {
    const isValid = isValidUrl(value);
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      [name]: isValid ? '' : 'La imagen es inválida',
    }));
  }

  // Validar rating
  if (name === 'rating') {
    const formattedRating = formatRating(value);
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      [name]: formattedRating === '0.00' ? 'El rating es inválido' : '',
    }));
    setInput((prevInput) => ({ ...prevInput, [name]: formattedRating }));
  } else {
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  }
};


const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    // Validar nombre
    if (input.nombre.trim() === '' || input.nombre.includes(' ') || input.nombre.length > 20) {
      errors.nombre = 'El nombre es inválido';
    }

    // Validar imagen
    if (!isValidUrl(input.image)) {
      errors.image = 'La imagen es inválida';
    }

    // Validar rating
    if (input.rating === '0.00') {
        errors.rating = 'El rating es inválido';
    }

    // Validar fecha de lanzamiento
    if (!isValidDate(input.fechaLanzamiento)) {
      errors.fechaLanzamiento = 'La fecha de lanzamiento es inválida';
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }
  

    const { nombre, image, descripcion, plataformas, fechaLanzamiento, rating, genero } = input;
    const videogamesData = {
      nombre,
      image,
      descripcion,
      plataformas,
      fechaLanzamiento,
      rating,
      genero,
    };

    console.log(videogamesData);
    
    formRef.current.reset();
    setInput({
      nombre: '',
      image: '',
      descripcion: '',
      plataformas: '',
      fechaLanzamiento: '',
      rating: 0.00,
      genero: [],
    });
    setErrorMessages({
        nombre: '',
        image: '',
        rating: '',
        fechaLanzamiento: '',
      });
  };

  
    const isValidUrl = (url) => {
      // Validar si la URL cumple con un formato válido
      // Puedes usar expresiones regulares o cualquier otra lógica de validación
      // Aquí hay un ejemplo básico que verifica si la URL comienza con "http://" o "https://"
      return url.startsWith('http://') || url.startsWith('https://');
    };
  
    const formatRating = (rating) => {
      // Formatear el rating automáticamente a 0.00 y limitar a 3 dígitos
      let formattedRating = parseFloat(rating).toFixed(2);
      if (formattedRating.length > 4) {
        formattedRating = formattedRating.slice(0, 4);
      }
      return formattedRating;
    };
  
    const isValidDate = (date) => {
      // Validar si la fecha cumple con un formato válido
      // Puedes usar expresiones regulares o cualquier otra lógica de validación
      // Aquí hay un ejemplo básico que verifica si la fecha tiene el formato "YYYY-MM-DD"
      return /^\d{4}-\d{2}-\d{2}$/.test(date);
  };

    const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setInput((prevInput) => ({
        ...prevInput,
        genero: [...prevInput.genero, value],
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        genero: prevInput.genero.filter((genre) => genre !== value),
      }));
    }
  };

  return (
    <div className={style.container}>
      <form className={style.formulario} onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="name">Nombre: </label>
        <input type="text" name="nombre" value={input.nombre} onChange={handleInputChange} onBlur={handleInputChange}/>
            {errorMessages.nombre && <p>{errorMessages.nombre}</p>}
        <label htmlFor="image">Imagen: </label>
        <input type="url" name="image" value={input.image} onChange={handleInputChange} onBlur={handleInputChange}/>
            {errorMessages.image && <p>{errorMessages.image}</p>}   
        <label htmlFor="descripcion">Descripcion: </label>
        <input type="text" name="descripcion" value={input.descripcion} onChange={handleInputChange} onBlur={handleInputChange}/>

        <label htmlFor="plataformas">Plataformas: </label>
        <input type="text" name="plataformas" value={input.plataformas} onChange={handleInputChange} onBlur={handleInputChange}/>

        <label htmlFor="fechalanzamiento">Fecha de Lanzamiento  (Formato YYYY-MM-DD): </label>
        <input type="text" name="fechaLanzamiento" value={input.fechaLanzamiento} onChange={handleInputChange} onBlur={handleInputChange}/>
            {errorMessages.fechaLanzamiento && <p>{errorMessages.fechaLanzamiento}</p>}
        <label htmlFor="rating">Rating: </label>
        <input type="number" name="rating" step="0.01" value={input.rating} onChange={handleInputChange} onBlur={handleInputChange}/>
            {errorMessages.rating && <p>{errorMessages.rating}</p>}

        <label htmlFor="genre">Genero(s): </label>
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
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </label>
          ))}
        </div>

        <button type="submit" id="submit-button">Crear Videogame</button>
      </form>
    </div>
  );
};

export default Form;
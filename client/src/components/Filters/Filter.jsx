import { filterByGenre } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import style from './Filters.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const [selectedGenres, setselectedGenres] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [prevselectedGenres, setPrevselectedGenres] = useState([]);
  const genres = useSelector((state) => state.genres);


  useEffect(() => {
    if (JSON.stringify(selectedGenres) !== JSON.stringify(prevselectedGenres)) {
      dispatch(filterByGenre(selectedGenres));
      setPrevselectedGenres(selectedGenres);
    }
  }, [selectedGenres, prevselectedGenres, dispatch]);

  const handleTypeChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    const count = isChecked ? selectedCount + 1 : selectedCount - 1;

    if (count <= 80) {
      setSelectedCount(count);

      if (isChecked) {
        setselectedGenres([...selectedGenres, value]);
      } else {
        setselectedGenres(selectedGenres.filter((genres) => genres !== value));
      }
    } else {
      event.preventDefault();
    }
  };



  return (
    <div>
      <h3 className={style.texto3}>Filter for Genre:</h3>
      <div className={style.tipos}>
        {genres.map((genres) => ( 
          <label key={genres} className={style.checkboxes}>
            <input
              type="checkbox"
              name="type"
              value={genres}
              checked={selectedGenres.includes(genres)}
              onChange={handleTypeChange}
            />
            <span className={style.checkboxText}>{genres.charAt(0).toUpperCase() + genres.slice(1)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;

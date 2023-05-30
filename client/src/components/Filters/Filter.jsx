import { filterByType } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import style from './Filters.module.css'

const Filter = () => {
  const dispatch = useDispatch();
  const [selectedgenres, setSelectedgenres] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [prevSelectedgenres, setPrevSelectedgenres] = useState([]);
  const genres = useSelector((state) => state.genres);

  

  useEffect(() => {
    if (JSON.stringify(selectedgenres) !== JSON.stringify(prevSelectedgenres)) {
      dispatch(filterByType(selectedgenres));
      setPrevSelectedgenres(selectedgenres);
    }
  }, [selectedgenres, prevSelectedgenres, dispatch]);

  const handleTypeChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    const count = isChecked ? selectedCount + 1 : selectedCount - 1;

    if (count <= 2) {
      setSelectedCount(count);

      if (isChecked) {
        setSelectedgenres([...selectedgenres, value]);
      } else {
        setSelectedgenres(selectedgenres.filter((type) => type !== value));
      }
    } else {
      event.preventDefault();
    }
  };

  
  return (
    <div>
      <h3 className={style.texto3}>FILTRAR POR TIPO:</h3>
      <div className={style.tipos}>
         {genres.map((type) => (
           <label key={type} className={style.checkboxes}>
             <input
               type="checkbox"
               name="type"
               value={type}
               checked={selectedgenres.includes(type)}
               onChange={handleTypeChange}
             />
             <span className={style.checkboxText}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
           </label>
         ))}
       </div>
    </div>
  );
};

export default Filter;


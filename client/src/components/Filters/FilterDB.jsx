import { filterByCreated } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import style from './Filters.module.css'

const FilterDB = () => {
  const dispatch = useDispatch();
  const [isDB, setIsDB] = useState(null);

  useEffect(() => {
    if (isDB !== '') {
      dispatch(filterByCreated(isDB));
    }
  }, [isDB, dispatch]);

  const handleOrigenChange = (event) => {
    setIsDB(event.target.value === "true" ? true : event.target.value === "false" ? false : null);
  };


  
  return (
    <div>
      <h3 className={style.texto}>Filter by:</h3>
      <div>
        <label className={style.texto1}>
          <input
            type="radio"
            name="origen"
            value="false"
            checked={isDB === false}
            onChange={handleOrigenChange}
          />
          API
        </label>
        <label className={style.texto2}>
          <input
            type="radio"
            name="origen"
            value="true"
            checked={isDB === true}
            onChange={handleOrigenChange}
          />
          Database
        </label>
        <label className={style.texto1}>
          <input
            type="radio"
            name="origen"
            value="null"
            checked={isDB === null}
            onChange={handleOrigenChange}
          />
          All
        </label>
      </div>
    </div>
  );
};

export default FilterDB;


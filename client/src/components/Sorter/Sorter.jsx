import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { sortByName, sortByAtaque } from "../../redux/actions";
import style from './Sorter.module.css';

export default function Sorter({ selectedSort, setSelectedSort }){
    const dispatch = useDispatch(); // eslint-disable-next-line
    const [selectedValue, setSelectedValue] = useState(''); 
      
    function handlerSort(e) {
        e.preventDefault();
        const selectedValue = e.target.value;
        if (selectedValue === selectedSort) {
          setSelectedSort(selectedValue);
        } else {
          setSelectedValue(selectedValue);
          setSelectedSort(selectedValue);
        }
      }
      
      function handlerSort2(e) {
        e.preventDefault();
        const selectedValue = e.target.value;
        if (selectedValue === selectedSort) {
          setSelectedSort(selectedValue);
        } else {
          setSelectedValue(selectedValue);
          setSelectedSort(selectedValue);
        }
      }
      
    
      useEffect(() => {
        if (selectedSort === 'asc' || selectedSort === 'desc') {
          dispatch(sortByName(selectedSort));
        }
        if (selectedSort === 'ratmax' || selectedSort === 'ratmin') {
          dispatch(sortByAtaque(selectedSort));
        }
      }, [selectedSort, dispatch]);
    
      return (
        <>
          <select
            onChange={handlerSort}
            name=""
            id=""
            className={style.sortSelect1}
          >
            <option hidden>Sort by Alphabet:</option>
            <option value="asc" className={style.sortOption}>
              A-Z
            </option>
            <option value="desc" className={style.sortOption}>
              Z-A
            </option>
          </select>
          <select
            onChange={handlerSort2}
            name=""
            id=""
            className={style.sortSelect2}
          >
            <option hidden> Sort by Rating:</option>
            <option value="ratmin" className={style.sortOption}>
              Rating Max
            </option>
            <option value="ratmax" className={style.sortOption}>
              Rating Min
            </option>
          </select>
        </>
      );
    }

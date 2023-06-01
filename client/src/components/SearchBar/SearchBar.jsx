import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const videogames = useSelector((state) => state.videogames);

  useEffect(() => {
    if (name.trim() !== "") {
      dispatch(getName(name));
    } 
  }, [name, dispatch]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setName(inputValue);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(getName(name));
  };

  
  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        className={styles.input}
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder="Search Videogame..."
      />
      {videogames && videogames.name && (
        <div className={styles.result}>
          <h3>{videogames.name}</h3>
          <img
            className={styles.image}
            src={videogames.img}
            alt={videogames.name}
          />
        </div>
      )}
    </form>
  );
};

export default SearchBar;

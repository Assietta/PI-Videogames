import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getName } from "../../redux/actions";
import styles from "./SearchBar.module.css";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const videogames = useSelector((state) => state.videogames);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript.trim() !== "") {
      dispatch(getName(transcript));
      resetTranscript();
    }
  }, [transcript, dispatch, resetTranscript]);

  useEffect(() => {
      dispatch(getName(name));
  }, [name, dispatch]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setName(inputValue);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(getName(name));
  };

  const handleVoiceInput = () => {
    SpeechRecognition.startListening({ language: "es-ES" });
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
      <button type="button" onClick={handleVoiceInput}>
        Voice Search
      </button>
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

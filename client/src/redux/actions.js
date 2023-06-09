import axios from 'axios'

export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_NEWVIDEOGAMES = "GET_NEWVIDEOGAMES"
export const GET_GENRES = 'GET_GENRES'
export const GET_NAME = 'GET_NAME'
export const GET_ID = 'GET_ID'
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_ATAQUE = 'ORDER_BY_ATAQUE'
export const POST_VIDEOGAMES = 'POST_VIDEOGAMES'
export const GET_LIKE = 'GET_LIKE'

export function getVideogames(){
    return async function (dispatch){
        try {
            const response = await axios.get("/videogame");
            dispatch({
                type: GET_VIDEOGAMES,
                payload: response.data
            })
        } catch (error) {
            console.error("Error while getting videogames:", error);
        }
    }
}

export function getNewVideogames(payload){
  return {
    type: GET_NEWVIDEOGAMES,
    payload
  }
}

export function getGenres(){
    return async function (dispatch){
        try {
            const response = await axios.get("/genres");
            dispatch({
                type: GET_GENRES,
                payload: response.data
            })
        } catch (error) {
            console.error("Error while getting genres:", error);
        }
    }
}

export const getName = (name) => {
    console.log(name)
    return {
        type: GET_NAME,
        payload: name,
      };
  };
  

export function getID(id){
    return {
        type: GET_ID,
        payload: id,
      };
}

export function filterByCreated(isDB) {
    return {
      type: FILTER_BY_CREATED,
      payload: isDB
    }
  }


  export const filterByGenre = (selectedGenres) => {
    return {
      type: FILTER_BY_GENRE,
      payload: selectedGenres,
      filterFunction: (videogames) => {
        const filteredVideogames = videogames.filter((videogame) =>
          selectedGenres.includes(videogame.genero)
        );
        return filteredVideogames;
      },
    };
  };
  
  export function sortByName(payload){
    console.log(payload);
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function sortByAtaque(payload){
    console.log(payload);
    return {
        type: ORDER_BY_ATAQUE,
        payload
    }
}


export function postVideogames(videogamesData){
  return async function (dispatch){

      try {
          const response = await axios.post("/videogame", JSON.stringify(videogamesData), {
              headers: {
                "Content-Type": "application/json"
              }
            });
          console.log(response.data)
          dispatch({
              type: POST_VIDEOGAMES,
              payload: response.data
          })
          console.log(videogamesData)
      } catch (error) {
          console.error("Error while posting videogame:", error.response.data.message);
          console.log(error.message);

      }
  }
}

export function getLike(genre){
    return {
        type: GET_LIKE,
        payload: genre,
      };
}
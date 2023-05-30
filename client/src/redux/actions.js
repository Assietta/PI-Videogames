import axios from 'axios'

export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_GENRES = 'GET_GENRES'
export const GET_NAME = 'GET_NAME'
export const GET_ID = 'GET_ID'

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
    return {
        type: GET_NAME,
        payload: name,
      };
  };
  

export function getID(id){
    return async function (dispatch){
        try {
            const response = await axios.get(`/videogame/${id}`);
            dispatch({
                type: GET_ID,
                payload: response.data
            })
            console.log(response)
        } catch (error) {
            console.error("Error while getting types:", error);
        }
    }
}
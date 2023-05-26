import axios from 'axios'

export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_GENRES = 'GET_GENRES'

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

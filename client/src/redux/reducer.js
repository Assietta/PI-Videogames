import { GET_VIDEOGAMES, GET_GENRES, GET_NAME, GET_ID } from "./actions";

const initialState = {
  videogames: [],
  genres: [],
  videogamesID: {},
  filteredVideogames: [], // Inicializar como un array vacío
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        filteredVideogames: action.payload, // Incluir aquí también
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_NAME:
      const name = action.payload
      return {
        ...state,
        filteredVideogames: state.videogames.filter((videogames) =>
          videogames.name.includes(name)
        ),
      };
    case GET_ID:
      return {
        ...state,
        videogamesID: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;

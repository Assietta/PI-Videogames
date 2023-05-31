import { GET_VIDEOGAMES, GET_GENRES, GET_NAME, GET_ID, FILTER_BY_CREATED, FILTER_BY_GENRE} from "./actions";

const initialState = {
  videogames: [],
  genres: [],
  videogamesID: {},
  allgames: [], // Inicializar como un array vacío
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allgames: action.payload, // Incluir aquí también
      };
      case GET_GENRES:
        return {
          ...state,
          genres: action.payload,
        };
        case GET_NAME:
          const name = action.payload.toLowerCase();
          return {
            ...state,
        videogames: state.allgames.filter((videogame) =>
        videogame && videogame.nombre && videogame.nombre.toLowerCase().includes(name)
        ),
      };
      case GET_ID:
        return {
          ...state,
          videogamesID: action.payload,
        };
      case FILTER_BY_CREATED:    
        return {
          ...state,
          videogames: state.videogames.filter(
            (videogame) => videogame.isDB === action.payload)
          };
      case FILTER_BY_GENRE:    
          return {
            ...state,
            videogames: state.videogames.filter(
              (videogame) => videogame.genero.includes(action.payload))
            };

          default:
            return state;
          }
        };
        
        export default rootReducer;
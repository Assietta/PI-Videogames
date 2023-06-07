import { GET_VIDEOGAMES, GET_GENRES, GET_NAME, GET_ID, FILTER_BY_CREATED, FILTER_BY_GENRE, ORDER_BY_NAME, ORDER_BY_ATAQUE, POST_VIDEOGAMES, GET_LIKE, GET_NEWVIDEOGAMES} from "./actions";

const initialState = {
  videogames: [],
  genres: [],
  videogamesID: {},
  allgames: [],
  plataformas: [
    "PC",
    "PlayStation 5",
    "Xbox Series",
    "Nintendo Switch",
    "iOS",
    "Android",
    "macOS",
    "Linux",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "PlayStation 4",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation",
    "Xbox One",
    "Xbox 360",
    "Xbox",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "Game Boy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari",
    "SEGA",
    "3DO",
    "Neo Geo"
  ],
  apifilter: [],
  genrefilter:[],
  selectedapi: [],
  selectedgenres: [],
  likevideogame: [],
}
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allgames: action.payload,
        genrefilter: action.payload,
      };
      case GET_NEWVIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allgames: action.payload,
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
        let id = action.payload;
        const filterid = state.allgames.filter((videogame) =>
        String(videogame.id) === id
      );
        return {
          ...state,
          videogamesID: filterid,
        };
    case FILTER_BY_CREATED: {
          let selectedapi = action.payload;
          let selectedgenres = state.selectedgenres;
          let filteredbyapi;
          let filteredbygenre;
        
          if (selectedgenres.length > 0) {
            if (selectedapi === null) {
              filteredbyapi = state.allgames;
              filteredbygenre = state.allgames.filter((videogame) =>
                selectedgenres.every((genre) => videogame.genero.includes(genre))
              );
            } else {
              filteredbyapi = state.allgames.filter(
                (videogame) => videogame.isDB === selectedapi
              );
              filteredbygenre = filteredbyapi.filter((videogame) =>
                selectedgenres.every((genre) => videogame.genero.includes(genre))
              );
            }
          } else if (selectedapi === null) {
            filteredbyapi = state.allgames;
            filteredbygenre = state.allgames;
          } else {
            filteredbyapi = state.allgames.filter(
              (videogame) => videogame.isDB === selectedapi
            );
            filteredbygenre = filteredbyapi;
          }
        
          return {
            ...state,
            videogames: filteredbygenre,
            genrefilter: filteredbygenre,
            selectedapi: selectedapi,
          };}    
    case FILTER_BY_GENRE: {
          const selectedgenres = action.payload;
        
          let filteredbygenre;
          let filteredbyapi = state.selectedapi ? state.videogames : state.allgames;
        
          if (selectedgenres.length > 0) {
            filteredbygenre = filteredbyapi.filter((videogame) =>
              selectedgenres.every((genre) => videogame.genero.includes(genre))
            );
          } else {
            filteredbygenre = filteredbyapi;
          }
        
          return {
            ...state,
            videogames: filteredbygenre,
            selectedgenres: action.payload,
          };
    }
    case ORDER_BY_NAME:
          const sortedArr = [...state.videogames]; // Crear una copia del array
          sortedArr.sort((a, b) => {
            const nameA = a.nombre.toLowerCase();
            const nameB = b.nombre.toLowerCase();
            if (nameA > nameB) {
              return action.payload === 'asc' ? 1 : -1;
            }
            if (nameB > nameA) {
              return action.payload === 'asc' ? -1 : 1;
            }
            return 0;
          });
          return {
            ...state,
            videogames: sortedArr,
          };
    case ORDER_BY_ATAQUE:
            const sortedRating = [...state.videogames]; // Crear una copia del array
            sortedRating.sort((a, b) => {
              const ratingA = parseFloat(a.rating);
              const ratingB = parseFloat(b.rating);
              if (isNaN(ratingA) || isNaN(ratingB)) return -1;
              if (ratingA > ratingB) return action.payload === 'ratmax' ? 1 : -1;
              if (ratingA < ratingB) return action.payload === 'ratmax' ? -1 : 1;
              return 0;
            });
          

            return {
              ...state,
              videogames: sortedRating,
            };    
    case POST_VIDEOGAMES:
              return {
                ...state,
                videogames: action.payload,
              };
    case GET_LIKE:
                const like = state.allgames.filter((videogame) =>
                  videogame.genero.some((genre) => videogame.genero.includes(genre))
                );
                return {
                  ...state,
                  likevideogame: like,
              };

    default:
            return state;
          }
        };
        
        export default rootReducer;
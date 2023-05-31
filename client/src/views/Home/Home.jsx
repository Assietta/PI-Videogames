import style from './Home.module.css'
import Cards from "../../components/Cards/Cards"; // eslint-disable-next-line
import { useEffect, useState } from "react"; // eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
// import { getVideogames, getGenres } from "../../redux/actions";
import { SearchBar, FilterDB, Filter } from "../../components/components";
// , Filter, Sorter, FilterDB
const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogames);
  const genres = useSelector(state => state.genres);
//   const [loading, setLoading] = useState(true);
//   const [selectedSort, setSelectedSort] = useState('');

  // useEffect(() => {
  //   dispatch(getVideogames());
  //   dispatch(getGenres());
  // }, [dispatch]);


  return (
    <>
      <div >
      <div className={style.container}>
        {/* <div className={style.sorter}>
          <Sorter selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>
        </div> */}
        <div className={style.filter}>
          <div className={style.filterdb}>
            <FilterDB/>
          </div>
          <div className={style.filtertipos}>
            <Filter />
          </div>
        </div>
        <div className={style.search}>
          <SearchBar />
        </div>
      </div >
        {/* {loading ? (
          <div className={style.loading}> 
            <img className={style.loadinggif} src="https://i.pinimg.com/originals/66/89/dc/6689dc331be27e66349ce9a4d15ddff3.gif" alt="" />
            <h1 className={style.textogif}>Cargando...!</h1>  
          </div>
            
        ) : ( */}
      <div className={style.fondo}>
          <div className={style.acomodo}>
            <Cards />
          </div>
      </div>
      </div>
    </>
  );
};

export default Home;

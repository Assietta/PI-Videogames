import style from './Home.module.css'
import Cards from "../../components/Cards/Cards"; // eslint-disable-next-line
import { useEffect, useState } from "react"; // eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres } from "../../redux/actions";
import { SearchBar, FilterDB, Filter, Sorter } from "../../components/components";
const Home = () => {
  const dispatch = useDispatch();
  const [selectedSort, setSelectedSort] = useState('');

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);


  return (
    <>
      <div className={style.contenedor}>
      <div className={style.container}>
        <div className={style.search}>
          <SearchBar />
        </div>
        <div className={style.sorter}>
          <Sorter selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>
        </div>
        <div className={style.filter}>
          <div className={style.filterdb}>
            <FilterDB/>
          </div>
          <div className={style.filtergenre}>
            <Filter />
          </div>
        </div>
      </div >
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

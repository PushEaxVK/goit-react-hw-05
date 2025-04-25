import s from './HomePage.module.css';
import { lazy, useEffect } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { getTrending } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

const MovieList = lazy(() => import('../../components/MovieList/MovieList'));

const HomePage = () => {
  const {
    data: trendings,
    error: errorTrendings,
    fetchData: fetchTrendings,
    cancel: cancelTrendings,
    loading,
  } = useFetchData(getTrending);

  useEffect(() => {
    fetchTrendings();
    return () => cancelTrendings();
  }, [cancelTrendings, fetchTrendings]);

  return (
    <div className={s.home}>
      <h1>Trending today</h1>
      {loading && <Loader />}
      {errorTrendings && <Error error="Faild load trendings" />}
      <MovieList movies={trendings} />
    </div>
  );
};

export default HomePage;

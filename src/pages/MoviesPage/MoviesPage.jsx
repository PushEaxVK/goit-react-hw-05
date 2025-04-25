import { useFetchData } from '../../hooks/useFetchData';
import s from './MoviesPage.module.css';
import { searchByQuery } from '../../services/api';
import { useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import { Link, useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const { data, loading, error, fetchData, cancel } =
    useFetchData(searchByQuery);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const queryString = form.elements.query.value;
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set('query', queryString);
    setSearchParams(urlParams);
  };

  useEffect(() => {
    const queryString = searchParams.get('query');
    if (queryString && queryString.trim()) {
      fetchData(queryString);
    }
    return cancel;
  }, [searchParams, cancel, fetchData]);

  return (
    <div className={s.movies}>
      <form onSubmit={handleSearch} className={s.form}>
        <input type="text" name="query" id="query" />
        <button type="submit">Search</button>
      </form>
      {loading && <Loader />}
      {error && <Error error="Faild to load search results!" />}
      {data?.results && data.results.length && !error > 0 ? (
        <MovieList movies={data.results} />
      ) : (
        <p>No results!</p>
      )}
    </div>
  );
};

export default MoviesPage;

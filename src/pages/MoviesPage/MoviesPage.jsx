import { useFetchData } from '../../hooks/useFetchData';
import s from './MoviesPage.module.css';
import { searchByQuery } from '../../services/api';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import { Link } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const { data, loading, error, fetchData, cancel, reset } =
    useFetchData(searchByQuery);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const queryString = form.elements.query.value;
    setQuery(queryString);
  };

  useEffect(() => {
    console.log('Search: ', query);
    if (query && query.trim()) {
      // console.log('Search: ', query);
      fetchData(query);
    }
    return cancel;
  }, [query, cancel, fetchData]);

  return (
    <div className={s.movies}>
      <form onSubmit={handleSearch}>
        <input type="text" name="query" id="query" />
        <button type="submit">Search</button>
      </form>
      {loading && <Loader />}
      {error && <Error error="Faild to load search results!" />}
      {data && console.log('Data', data)}
      {data?.results && data.results.length && !error > 0 ? (
        <MovieList movies={data.results} />
      ) : (
        <p>No results!</p>
      )}
    </div>
  );
};

export default MoviesPage;

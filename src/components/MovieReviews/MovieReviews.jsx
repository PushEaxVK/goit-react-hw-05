import { useParams } from 'react-router-dom';
import s from './MovieReviews.module.css';
import { useFetchData } from '../../hooks/useFetchData';
import { getReviews } from '../../services/api';
import { useEffect } from 'react';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';

const MovieReviews = () => {
  const { movieId } = useParams();
  const { data, loading, error, fetchData, cancel } = useFetchData(getReviews);

  useEffect(() => {
    fetchData(movieId);
    return () => cancel();
  }, [movieId, fetchData, cancel]);

  return (
    <div className={s.reviews}>
      {error && <Error error="Faild load reviews" />}
      {loading && <Loader />}
      {!error && data?.results && data.results.length > 0 ? (
        <ul className={s.reviewsList}>
          {data.results.map((item) => (
            <li key={item.id}>
              <p className={s.author}>Author: {item.author}</p>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews!</p>
      )}
    </div>
  );
};

export default MovieReviews;

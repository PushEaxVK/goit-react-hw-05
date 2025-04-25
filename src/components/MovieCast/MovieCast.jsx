import { useParams } from 'react-router-dom';
import s from './MovieCast.module.css';
import { useFetchData } from '../../hooks/useFetchData';
import { getCredits } from '../../services/api';
import Loader from '../Loader/Loader';
import { useEffect } from 'react';
import Error from '../Error/Error';
import { useApp } from '../../appContext';

const MovieCast = () => {
  const { movieId } = useParams();
  const { data, loading, error, fetchData, cancel } = useFetchData(getCredits);
  const { config } = useApp();

  useEffect(() => {
    fetchData(movieId);
    return () => cancel();
  }, [movieId, fetchData, cancel]);

  return (
    <div className={s.cast}>
      {loading && <Loader />}
      {error && <Error error="Faild to load cast data!" />}
      {data && data?.cast && data.cast.length > 0 && (
        <ul className={s.castList}>
          {data.cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={`${config.images.secure_base_url}original${actor.profile_path}`}
                alt={actor.name}
                width={100}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;

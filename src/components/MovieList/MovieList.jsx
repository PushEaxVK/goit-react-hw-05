import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={s.movieList}>
      {movies && movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.original_title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;

import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import { useEffect } from 'react';
import { getDetails } from '../../services/api';
import { useApp } from '../../appContext';
import { useFetchData } from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const { config } = useApp();

  const {
    data: details,
    loading,
    error,
    fetchData,
    cancel,
  } = useFetchData(getDetails);

  useEffect(() => {
    fetchData(movieId);
    return () => cancel();
  }, [movieId, cancel, fetchData]);

  const backLink = location.state ?? '/movies';

  return (
    <div className={s.detail}>
      <Link to={backLink} className={s.back}>
        Go back
      </Link>
      {loading && <Loader />}
      {error && <Error error="Faild to load movie details!" />}
      {details && config && (
        <>
          <div className={s.thumb}>
            <img
              src={
                details?.poster_path
                  ? `${config.images.secure_base_url}original${details.poster_path}`
                  : 'https://placehold.co/250x375?text=No+Image&font=roboto'
              }
              alt={details.title}
              width="250"
              height="375"
            />
            <div className={s.detailsText}>
              <h2 className={s.title}>
                {details.title} ({details.release_date.slice(0, 4)})
              </h2>
              <p>User Score: {Math.round(details.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{details.overview}</p>
              <h4>Genres</h4>
              <p>{details.genres.map((genre) => genre.name).join(', ')}</p>
            </div>
          </div>
          <hr />
          <p>Aditional information</p>
          <ul className={s.list}>
            <li>
              <Link to="cast" state={location.state}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" state={location.state}>
                Reviews
              </Link>
            </li>
          </ul>
          <hr />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;

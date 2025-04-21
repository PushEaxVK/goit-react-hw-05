import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import { useEffect, useState } from 'react';
import { getDetails, cancelDetailsRequest } from '../../services/api';
import toast from 'react-hot-toast';
import { useApp } from '../../appContext';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const location = useLocation();
  const { config } = useApp();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailsData = await getDetails(movieId);
        if (detailsData) {
          console.log(detailsData);
          setDetails(detailsData);
        }
      } catch (error) {
        console.error(error);
        toast.error('Error when loading Movie Detail!');
      }
    };
    fetchDetails();
    return () => cancelDetailsRequest();
  }, [movieId, setDetails]);

  return (
    <div className={s.detail}>
      <Link to={location.state} className={s.back}>
        Go back
      </Link>
      {details && config && (
        <>
          <div className={s.thumb}>
            <img
              src={`${config.images.secure_base_url}original${details.poster_path}`}
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
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
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

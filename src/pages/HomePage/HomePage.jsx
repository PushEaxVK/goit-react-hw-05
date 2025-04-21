import s from './HomePage.module.css';
// import { getTrending, cancelTrendingRequest } from '../../services/api';
import { useApp } from '../../appContext';
import { Link } from 'react-router-dom';

// adult: false;
// backdrop_path: '/nAxGnGHOsfzufThz20zgmRwKur3.jpg';
// genre_ids: (3)[(18, 27, 10402)];
// id: 1233413;
// media_type: 'movie';
// original_language: 'en';
// original_title: 'Sinners';
// overview: 'Trying to leave their troubled lives behind, twin brothers return to their hometown to start again, only to discover that an even greater evil is waiting to welcome them back.';
// popularity: 256.9628;
// poster_path: '/fWPgbnt2LSqkQ6cdQc0SZN9CpLm.jpg';
// release_date: '2025-04-16';
// title: 'Sinners';
// video: false;
// vote_average: 7.503;
// vote_count: 192;

const HomePage = () => {
  // const [trends, setTrends] = useState();
  const { trendings } = useApp();

  return (
    <div className={s.home}>
      <h1>Trending today</h1>
      {trendings.length > 0 && (
        <ul>
          {trendings.map((trend) => (
            <li key={trend.id}>
              <Link to={`/movies/${trend.id}`}>{trend.original_title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;

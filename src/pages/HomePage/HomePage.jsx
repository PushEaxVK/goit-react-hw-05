import s from './HomePage.module.css';
import { useApp } from '../../appContext';
import { lazy } from 'react';

const MovieList = lazy(() => import('../../components/MovieList/MovieList'));

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
  const { trendings } = useApp();

  return (
    <div className={s.home}>
      <h1>Trending today</h1>
      <MovieList movies={trendings} />
    </div>
  );
};

export default HomePage;

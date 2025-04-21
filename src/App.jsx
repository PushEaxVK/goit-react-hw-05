import { lazy, Suspense, useEffect } from 'react';
import css from './App.module.css';
// import { getConfig } from './services/api';
import { Route, Routes } from 'react-router-dom';
import { useApp } from './appContext';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const Navigation = lazy(() => import('./components/Navigation/Navigation'));

function App() {
  const { config } = useApp();

  useEffect(() => {
    if (config) console.log(config);
  }, [config]);

  return (
    <Suspense
      fallback={
        <div>
          <p>Loading page...</p>
          <Loader />
        </div>
      }
    >
      <div className={css.app}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;

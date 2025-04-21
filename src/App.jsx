import { useEffect, useState, lazy, Suspense } from 'react';
import css from './App.module.css';
import { getConfig } from './services/api';
import { Route, Routes } from 'react-router-dom';

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
const MovieList = lazy(() => import('./components/MovieList/MovieList'));

function App() {
  useEffect(() => {
    const testFetch = async () => {
      console.log(await getConfig());
    };
    testFetch();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={css.app}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <h1>Hello from React!</h1>
        <MovieCast />
        <MovieReviews />
        <MovieList />
      </div>
    </Suspense>
  );
}

export default App;

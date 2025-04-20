import { useEffect, useState, lazy, Suspense } from 'react';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={css.app}>
        <h1>Hello from React!</h1>
        <HomePage />
        <MoviesPage />
        <MovieDetailsPage />
        <MovieCast />
        <MovieReviews />
        <NotFoundPage />
        <Navigation />
        <MovieList />
        <Toaster position="bottom-right" />
      </div>
    </Suspense>
  );
}

export default App;

import { useEffect, useState, lazy, Suspense } from 'react';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={css.app}>
        <h1>Hello from React!</h1>
        <HomePage />
        <Toaster position="bottom-right" />
      </div>
    </Suspense>
  );
}

export default App;

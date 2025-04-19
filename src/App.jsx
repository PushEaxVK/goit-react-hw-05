import { useEffect, useState } from 'react';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className={css.app}>
      <h1>Hello from React!</h1>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;

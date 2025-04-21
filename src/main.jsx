import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'modern-normalize';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="bottom-right" />
    </BrowserRouter>
  </StrictMode>
);

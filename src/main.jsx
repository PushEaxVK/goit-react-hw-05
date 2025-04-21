import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'modern-normalize';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './appContext.jsx';

const basename = import.meta.env.PUBLIC_URL || '/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <AppProvider>
        <App />
        <Toaster position="bottom-right" />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);

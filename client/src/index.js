import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import './global.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // MUI blue
    },
    secondary: {
      main: '#ff9800', // Orange
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* Decorative SVG blobs for background */}
    <svg className="background-blob top-right" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="200" cy="200" rx="200" ry="200" fill="url(#paint0_radial)" />
      <defs>
        <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(200 200) scale(200)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1976d2" />
          <stop offset="1" stopColor="#43a047" />
        </radialGradient>
      </defs>
    </svg>
    <svg className="background-blob bottom-left" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="160" cy="160" rx="160" ry="160" fill="url(#paint1_radial)" />
      <defs>
        <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientTransform="translate(160 160) scale(160)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff9800" />
          <stop offset="1" stopColor="#1976d2" />
        </radialGradient>
      </defs>
    </svg>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

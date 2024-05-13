import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e0dbd4',
    },
    secondary: {
      main: '#a85e4f'
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Navbar />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

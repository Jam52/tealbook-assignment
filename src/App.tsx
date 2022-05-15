import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Input } from '@mui/material';
import { theme } from './components/ui/theme';
import Header from './components/ui/Header';
import CityInput from './components/ui/CityInput';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <CityInput error={false} />
    </ThemeProvider>
  );
}

export default App;

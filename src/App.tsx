import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { Provider } from 'react-redux';
import { theme } from './components/ui/theme';
import store from './components/redux/store';
import Header from './components/ui/Header';
import CityInput from './components/ui/CityInput/CityInput';
import Forecast from './components/ui/Forecast/Forecast';
import forecastRes from './components/ui/Forecast/forecastRes.json';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container
          maxWidth="md"
          sx={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
        >
          <CityInput />
          <Forecast results={forecastRes.daily} />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

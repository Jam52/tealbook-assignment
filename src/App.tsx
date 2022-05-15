import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { theme } from './components/ui/theme';
import Header from './components/ui/Header';
import CityInput from './components/ui/CityInput/CityInput';
import Forcast from './components/ui/Forcast/Forcast';
import forcastRes from './components/ui/Forcast/forcastRes.json';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container
        maxWidth="md"
        sx={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
      >
        <CityInput
          isError={false}
          handleSubmit={() => {}}
          previousCities={[]}
          handlePreviousCityFetch={() => {}}
        />
        <Forcast results={forcastRes.daily} />
      </Container>
    </ThemeProvider>
  );
}

export default App;

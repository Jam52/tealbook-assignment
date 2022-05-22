import './App.css';
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { Provider } from 'react-redux';
import { theme } from './components/ui/theme';
import { store } from './components/redux/store';
import Header from './components/ui/Header';
import CityInput from './components/ui/CityInput/CityInput';
import Forecast from './components/ui/Forecast/Forecast';
import UserCity from './components/ui/UsersCity/UsersCity';
import WeatherComparison from './components/ui/WeatherComparison/WeatherComparison';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <CssBaseline />
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            padding: '0 1rem',
          }}
        >
          <Header />
          <UserCity />
          <CityInput />
          <WeatherComparison />
          <Forecast />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

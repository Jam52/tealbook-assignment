import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Grid,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useAppSelector } from '../../redux/hooks';

const Forecast = () => {
  const { currentCity, userCityData } = useAppSelector(
    (state) => state.weather,
  );

  const city = currentCity ? currentCity : userCityData;

  if (!city) {
    return <div />;
  }

  return (
    <Box data-testid="forecast" maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        Seven Day Forecast - {city.name}
      </Typography>
      <Grid container spacing={2}>
        {city.data.daily.map((day, index) => {
          const weather = day.weather[0];
          const date = dayjs.unix(day.dt);
          return (
            <Grid item xs>
              <Card
                key={index}
                data-testid="forecastCard"
                variant="outlined"
                sx={{ width: '100%', height: '100%' }}
              >
                <CardHeader
                  sx={{ padding: '0.5rem' }}
                  title={date.format('ddd')}
                  subheader={date.format('DD-MMM')}
                />
                <CardMedia
                  component="img"
                  height="70"
                  image={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                />
                <CardContent sx={{ padding: '0.5rem' }}>
                  <Typography variant="subtitle2">{day.temp.day} °C</Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: '0.7em' }}>
                    {weather.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Forecast;

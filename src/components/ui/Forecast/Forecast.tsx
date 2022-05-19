import { Box, Card, CardHeader, CardMedia, CardContent } from '@mui/material';
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
      <Typography variant="h4" gutterBottom>
        Seven Day Forecast - {city.name}
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}
      >
        {city.data.daily.map((day, index) => {
          const weather = day.weather[0];
          const date = dayjs.unix(day.dt);
          return (
            <Card
              key={index}
              data-testid="forecastCard"
              variant="outlined"
              sx={{ width: '100%' }}
            >
              <CardHeader
                title={date.format('ddd')}
                subheader={date.format('DD-MMM')}
              />
              <CardMedia
                component="img"
                height="80"
                image={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              />
              <CardContent>
                <Typography variant="subtitle2">
                  {weather.description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default Forecast;

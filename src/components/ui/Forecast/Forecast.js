import { Box, Card, CardHeader, CardMedia, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const Forecast = () => {
  const { currentCity } = useSelector((state) => state.weather);
  return currentCity ? (
    <Box data-testid="forecast" maxWidth="md">
      <Typography variant="h4">
        Seven Day Forecast - {currentCity.name}
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}
      >
        {currentCity?.data.map((result, index) => {
          const date = dayjs.unix(result.dt);

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
                image={`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
              />
              <CardContent>
                <Typography variant="subtitle2">
                  {result.weather[0].description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  ) : null;
};

export default Forecast;

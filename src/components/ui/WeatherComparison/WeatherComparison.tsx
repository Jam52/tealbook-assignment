import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';

const WeatherComparison = () => {
  const { currentCity, userCityData } = useAppSelector(
    (state) => state.weather,
  );
  if (!currentCity) {
    return null;
  }

  //   const tempComparison = currentCity.data[0].weather[0];

  return (
    <Box data-testid="weatherComparison">
      <Typography variant="body1">
        In {currentCity.name} is it {}
      </Typography>
    </Box>
  );
};

export default WeatherComparison;

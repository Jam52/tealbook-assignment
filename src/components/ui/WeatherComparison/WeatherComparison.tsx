import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';

const WeatherComparison = () => {
  const { currentCity, userCityData } = useAppSelector(
    (state) => state.weather,
  );
  if (!currentCity || !userCityData) {
    return null;
  }
  const currentCityWeather = currentCity.data.current;
  const userCityWeather = userCityData.data.current;

  const tempComparison =
    currentCityWeather?.temp > userCityWeather?.temp ? 'Hotter' : 'Colder';
  const tempComparisonNumber = parseFloat(
    Math.abs(currentCityWeather?.temp - userCityWeather?.temp).toFixed(2),
  );

  return (
    <Box data-testid="weatherComparison">
      <Typography variant="body1">
        In {currentCity.name} it is {tempComparison} by {tempComparisonNumber}{' '}
        °C!
      </Typography>
    </Box>
  );
};

export default WeatherComparison;

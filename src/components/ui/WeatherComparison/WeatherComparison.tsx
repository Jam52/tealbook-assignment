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

  const isHotter =
    currentCityWeather?.temp > userCityWeather?.temp ? true : false;

  const tempComparison = isHotter ? 'HOTTER' : 'COLDER';
  const tempComparisonNumber = parseFloat(
    Math.abs(currentCityWeather?.temp - userCityWeather?.temp).toFixed(2),
  );

  return (
    <Box data-testid="weatherComparison">
      <Typography variant="h5" textAlign="center" sx={{ color: 'white' }}>
        In {currentCity.name} it is{' '}
        <span style={{ color: isHotter ? 'red' : 'blue' }}>
          {tempComparison}
        </span>{' '}
        by {tempComparisonNumber} °C!
      </Typography>
    </Box>
  );
};

export default WeatherComparison;

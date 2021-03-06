import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import { theme } from '../theme';

const WeatherComparison = () => {
  const { currentCity, userCityData } = useAppSelector(
    (state) => state.weather,
  );
  if (!currentCity || !userCityData || currentCity.name === userCityData.name) {
    return null;
  }
  const currentCityWeather = currentCity.data.current;
  const userCityWeather = userCityData.data.current;

  const isHotter =
    currentCityWeather?.temp > userCityWeather?.temp ? true : false;

  const tempComparisonText = isHotter ? 'HOTTER' : 'COLDER';
  const tempComparisonNumber = parseFloat(
    Math.abs(currentCityWeather?.temp - userCityWeather?.temp).toFixed(2),
  );

  return (
    <Box data-testid="weatherComparison" sx={{ margin: '2rem 0' }}>
      <Typography variant="h5" textAlign="center" sx={{ color: 'white' }}>
        In {currentCity.name} it is{' '}
        <span
          style={{
            color: isHotter
              ? theme.palette.common.red
              : theme.palette.common.blue,
          }}
        >
          {tempComparisonText}
        </span>{' '}
        by {tempComparisonNumber} °C!
      </Typography>
    </Box>
  );
};

export default WeatherComparison;

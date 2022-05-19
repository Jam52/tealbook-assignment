import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { setUserCity } from '../../redux/features/weather';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const UserCity = () => {
  const dispatch = useAppDispatch();
  const { userCityData } = useAppSelector((state) => state.weather);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const location: IGeoLocation = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          name: 'unknown',
        };
        dispatch(setUserCity(location));
      });
    }
  }, [dispatch]);

  if (!userCityData) {
    return (
      <Box data-testid="userCity" alignItems="center">
        <img
          data-testid="userCityImage"
          src="logo.svg"
          alt="logo"
          style={{ width: '3rem' }}
        />
      </Box>
    );
  }

  const currentUserCityData = userCityData.data.current;

  return (
    <Box data-testid="userCity" alignItems="center">
      <Grid container data-testid="userInfo">
        <Grid
          item
          sm={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={`http://openweathermap.org/img/wn/${currentUserCityData?.weather[0].icon}@4x.png`}
            alt="logo"
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid
          item
          sm={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h2">Hello {userCityData.name}!</Typography>
        </Grid>
        <Grid
          item
          sm={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1">
            Humidity: {currentUserCityData?.humidity}
          </Typography>
          <Typography variant="body1">
            Pressure: {currentUserCityData?.pressure}
          </Typography>
          <Typography variant="body1">
            Wind Speed: {currentUserCityData?.wind_speed}
          </Typography>
          <Typography variant="body1">
            Uv Index: {currentUserCityData?.uvi}
          </Typography>
          <Typography variant="h5">
            {currentUserCityData?.weather[0].description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserCity;

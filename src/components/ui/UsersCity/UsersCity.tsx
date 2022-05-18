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

  return (
    <Box data-testid="userCity" alignItems="center">
      {userCityData ? (
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
              src={`http://openweathermap.org/img/wn/${userCityData.data.weather[0].icon}@4x.png`}
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
              Humidity: {userCityData.data.humidity}
            </Typography>
            <Typography variant="body1">
              Pressure: {userCityData.data.pressure}
            </Typography>
            <Typography variant="body1">
              Wind Speed: {userCityData.data.wind_speed}
            </Typography>
            <Typography variant="body1">
              Uv Index: {userCityData.data.uvi}
            </Typography>
            <Typography variant="h5">
              {userCityData.data.weather[0].description}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <img
          data-testid="image"
          src="logo.svg"
          alt="logo"
          style={{ width: '3rem' }}
        />
      )}
    </Box>
  );
};

export default UserCity;

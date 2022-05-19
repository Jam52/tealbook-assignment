import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { setUserCity } from '../../redux/features/weather';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { grey } from '@mui/material/colors';

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
    return <div />;
  }

  const currentUserCityData = userCityData.data.current;

  return (
    <Box data-testid="userCity">
      <Grid container data-testid="userInfo" spacing={4}>
        <Grid
          item
          sm={3}
          xs={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          order={{ xs: 2, sm: 1 }}
        >
          <img
            src={`http://openweathermap.org/img/wn/${currentUserCityData?.weather[0].icon}@4x.png`}
            alt="logo"
            style={{
              width: '100%',
              border: '2px solid white',
              borderRadius: '50%',
              maxWidth: '30vmin',
            }}
          />
        </Grid>
        <Grid
          item
          sm={6}
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
          order={{ xs: 1, sm: 2 }}
        >
          <Typography variant="h2" marginBottom={3}>
            Hello {userCityData.name}!
          </Typography>
        </Grid>
        <Grid
          item
          sm={3}
          xs={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            justifyContent: 'center',
            color: grey[300],
          }}
          order={{ xs: 3 }}
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
          <Typography variant="body1">
            {currentUserCityData?.weather[0].description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserCity;

import { Box } from '@mui/material';
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
        <Box data-testid="userInfo">
          <img
            src={`http://openweathermap.org/img/wn/${userCityData.data.weather[0].icon}@2x.png`}
            alt="logo"
            style={{ width: '4rem' }}
          />
          <Typography variant="h6">{userCityData.name}</Typography>
          <Typography variant="h6">{userCityData.data.temp}</Typography>
        </Box>
      ) : (
        PlaceHolderImage
      )}
    </Box>
  );
};

const PlaceHolderImage = (
  <img
    data-testid="image"
    src="logo.svg"
    alt="logo"
    style={{ width: '4rem' }}
  />
);

export default UserCity;

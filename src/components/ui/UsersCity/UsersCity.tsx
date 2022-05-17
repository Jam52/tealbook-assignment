import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const UserCity = () => {
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos.coords.latitude);
      });
    }
  });
  return (
    <Box data-testid="userCity">
      <img
        data-testid="image"
        src="logo.svg"
        alt="logo"
        style={{ width: '4rem' }}
      />
    </Box>
  );
};

export default UserCity;

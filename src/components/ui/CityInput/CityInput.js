import { Container, Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { theme } from '../theme';
import { useDispatch } from 'react-redux';
import { getCity } from '../../redux/features/weather';
import PreviousCities from './PreviousCities';

const CityInput = () => {
  const [formValue, changeValue] = useState('');
  const dispatch = useDispatch();
  const { cityStatus, searchedCities } = useSelector((state) => state.weather);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getCity(formValue));
  };
  return (
    <Box
      data-testid="city"
      sx={{
        backgroundColor: 'white',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(4),
      }}
    >
      <form onSubmit={(event) => handleSubmit(event)}>
        <Box sx={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
          <TextField
            data-testid="cityInput"
            variant="outlined"
            label="Weather by City"
            type="text"
            value={formValue}
            onChange={(event) => changeValue(event.target.value)}
            id="city-input"
            error={cityStatus === 'error'}
            helperText={
              cityStatus === 'error' ? 'City not found.' : 'Enter a city name.'
            }
          ></TextField>
          <Button type="submit" variant="contained" id="city-input">
            Submit
          </Button>
        </Box>
      </form>
      <PreviousCities cities={searchedCities.map((city) => city.name)} />
    </Box>
  );
};

export default CityInput;

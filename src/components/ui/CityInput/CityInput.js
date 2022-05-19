import { Grid, Box, TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { theme } from '../theme';
import { getCity } from '../../redux/features/weather';
import PreviousCities from './PreviousCities';

const CityInput = () => {
  const [formValue, setValue] = useState('');
  const dispatch = useAppDispatch();
  const { fetchCityStatus, searchedCities } = useAppSelector(
    (state) => state.weather,
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getCity(formValue));
    setValue('');
  };
  return (
    <Box
      container
      data-testid="city"
      sx={{
        backgroundColor: 'white',
        padding: '2rem',
        display: 'flex',
        flexDirection: ' column',
        gap: '1rem',
      }}
    >
      <Typography variant="h4" component="h2">
        Search for a City.
      </Typography>
      <form onSubmit={(event) => handleSubmit(event)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <TextField
              sx={{ width: '100%' }}
              data-testid="cityInput"
              variant="outlined"
              label="Weather by City"
              type="text"
              value={formValue}
              onChange={(event) => setValue(event.target.value)}
              id="city-input"
              error={fetchCityStatus !== ''}
              helperText={
                fetchCityStatus !== '' ? fetchCityStatus : 'Enter a city name.'
              }
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              sx={{
                width: '100%',
                height: '3.4rem',
                backgroundColor: theme.palette.secondary.main,
              }}
              data-testid="cityButton"
              type="submit"
              variant="contained"
              id="city-input"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      <PreviousCities cities={searchedCities} />
    </Box>
  );
};

export default CityInput;

import { Container, Box, TextField, Button } from '@mui/material';
import React from 'react';
import { theme } from './theme';

interface Props {
  isError: Boolean;
  handleSubmit: Function;
  previousCities: Array<string>;
  handlePreviousCityFetch: Function;
}

const CityInput: React.FC<Props> = ({
  isError,
  handleSubmit,
  previousCities,
  handlePreviousCityFetch,
}) => {
  return (
    <Container
      data-testid="cityInput"
      maxWidth="md"
      sx={{
        backgroundColor: 'white',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(4),
      }}
    >
      <form onSubmit={(event) => console.log('clicked')}>
        <Box sx={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            label="Weather by City"
            type="text"
            id="city-input"
            error={isError ? true : false}
            helperText={isError ? 'City not found.' : 'Enter a city name.'}
          ></TextField>
          <Button type="submit" variant="contained" id="city-input">
            Submit
          </Button>
        </Box>
      </form>
      {previousCities.length === 0 ? (
        ''
      ) : (
        <div>
          <h2 data-testid="previousCityHeader">Previous Cities:</h2>
          <Box sx={{ display: 'flex' }}>
            {previousCities.map((city, index) => (
              <Button
                data-testid="previousCityButton"
                key={index}
                onClick={() => handlePreviousCityFetch}
              >
                {city}
              </Button>
            ))}
          </Box>
        </div>
      )}
    </Container>
  );
};

export default CityInput;

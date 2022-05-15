import { Container, Box, TextField, Button } from '@mui/material';
import React from 'react';

interface Props {
  error: Boolean;
}

const CityInput: React.FC<Props> = ({ error }) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: 'white',
        padding: '3rem',
      }}
    >
      <form onSubmit={(event) => console.log('clicked')}>
        <Box sx={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            label="Weather by City"
            type="text"
            id="city-input"
            helperText="Enter a city name."
          ></TextField>
          <Button type="submit" variant="contained" id="city-input">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CityInput;

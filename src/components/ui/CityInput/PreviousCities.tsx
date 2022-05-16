import { Button, Box } from '@mui/material';

interface props {
  cities: Array<string>;
}
const PreviousCities: React.FC<props> = ({ cities }) => {
  return (
    <div>
      {cities.length === 0 ? (
        ''
      ) : (
        <div>
          <h2 data-testid="previousCityHeader">Previous Cities:</h2>
          <Box sx={{ display: 'flex' }}>
            {cities.map((city, index) => (
              <Button
                data-testid="previousCityButton"
                key={index}
                onClick={() => {}}
              >
                {city}
              </Button>
            ))}
          </Box>
        </div>
      )}
    </div>
  );
};

export default PreviousCities;

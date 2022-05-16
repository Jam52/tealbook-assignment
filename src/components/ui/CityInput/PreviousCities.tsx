import { Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPreviousCity } from '../../redux/features/weather';

interface props {
  cities: Array<{ name: string; data: Array<{}> }>;
}
const PreviousCities: React.FC<props> = ({ cities }) => {
  const dispatch = useDispatch();
  return (
    <div>
      {cities.length === 0 ? (
        ''
      ) : (
        <div data-testid="previousCities">
          <h2>Searched Cities:</h2>
          <Box sx={{ display: 'flex' }}>
            {cities.map((city, index) => {
              return (
                <Button
                  data-testid="previousCityButton"
                  key={index}
                  onClick={() => dispatch(setPreviousCity(city))}
                >
                  {city.name}
                </Button>
              );
            })}
          </Box>
        </div>
      )}
    </div>
  );
};

export default PreviousCities;

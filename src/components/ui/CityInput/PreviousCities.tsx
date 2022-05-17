import { Button, Box } from '@mui/material';
import { setPreviousCity } from '../../redux/features/weather';
import { useAppDispatch } from '../../redux/hooks';
import { ICity } from '../../redux/features/weather';

interface props {
  cities: Array<ICity>;
}
const PreviousCities: React.FC<props> = ({ cities }) => {
  const dispatch = useAppDispatch();
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

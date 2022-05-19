import { Button, Grid, Typography } from '@mui/material';
import { setPreviousCity } from '../../redux/features/weather';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { theme } from '../theme';

interface props {
  cities: Array<ICity>;
}
const PreviousCities: React.FC<props> = ({ cities }) => {
  const dispatch = useAppDispatch();
  const { currentCity } = useAppSelector((state) => state.weather);
  return (
    <div>
      {cities.length === 0 ? (
        ''
      ) : (
        <div data-testid="previousCities">
          <Typography component="h3" variant="h5" marginTop={3}>
            Searched Cities:
          </Typography>
          <Grid container spacing={2}>
            {cities.map((city, index) => {
              const isCurrentCity = city?.name === currentCity?.name;
              return (
                <Grid item>
                  <Button
                    data-testid="previousCityButton"
                    key={index}
                    onClick={() => dispatch(setPreviousCity(city))}
                    sx={{
                      backgroundColor: isCurrentCity
                        ? theme.palette.secondary.main
                        : '',
                      color: isCurrentCity ? 'white' : '',
                    }}
                  >
                    {city.name}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default PreviousCities;

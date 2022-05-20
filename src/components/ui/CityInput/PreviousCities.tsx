import { Button, Grid, Typography } from '@mui/material';
import { setPreviousCity } from '../../redux/features/weather';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { theme } from '../theme';

interface props {
  cities: Array<ICity>;
}
const PreviousCities: React.FC<props> = ({ cities }) => {
  const { userCityData } = useAppSelector((state) => state.weather);

  if (!userCityData || cities.length === 0) {
    return <div></div>;
  }
  return (
    <div data-testid="previousCities">
      <Typography component="h3" variant="h5" marginTop={3}>
        Cities:
      </Typography>
      <Grid container spacing={2}>
        {cities.map((city, index) => {
          return (
            <Grid item>
              <CityButton city={city} />
            </Grid>
          );
        })}
        <Grid item>
          <CityButton city={userCityData} />
        </Grid>
      </Grid>
    </div>
  );
};

const CityButton: React.FC<{ city: ICity }> = ({ city }) => {
  const dispatch = useAppDispatch();
  const { currentCity } = useAppSelector((state) => state.weather);
  const isCurrentCity = city?.name === currentCity?.name;
  return (
    <Button
      data-testid="previousCityButton"
      onClick={() => dispatch(setPreviousCity(city))}
      sx={{
        backgroundColor: isCurrentCity ? theme.palette.primary.main : '',
        color: isCurrentCity ? 'white' : '',
      }}
    >
      {city.name}
    </Button>
  );
};

export default PreviousCities;

import { Container, Box, Card, CardHeader, CardMedia } from '@mui/material';
import dayjs from 'dayjs';

interface props {
  results: Array<{
    dt: number;
    weather: Array<{ icon: string; description: string }>;
  }> | null;
}

const Forcast: React.FC<props> = ({ results }) => {
  return (
    <Container data-testid="forcast" maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {results?.map((result, index) => {
          console.log(dayjs.unix(result.dt).format('ddd'));
          return (
            <Card key={index} data-testid="forcastCard" variant="outlined">
              <CardMedia
                component="img"
                height="100"
                image={`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
              />
              <CardHeader
                title={dayjs.unix(result.dt).format('ddd')}
                subheader={result.weather[0].description}
              />
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default Forcast;

import { Container, Box, Typography } from '@mui/material';
import { theme } from './theme';

const Header = (props) => {
  return (
    <header>
      <Box className="header">
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '6rem',
            color: theme.palette.primary.main,
            gap: theme.spacing(4),
          }}
        >
          <img src="logo.svg" alt="logo" style={{ width: '4rem' }} />
          <Typography variant="h1" sx={{ fontSize: '2.5rem' }}>
            Tealbook Assignment - Weather Api
          </Typography>
        </Container>
      </Box>
    </header>
  );
};

export default Header;

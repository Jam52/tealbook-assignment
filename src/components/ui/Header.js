import { Container, Box } from '@mui/material';
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
          <h1>Tealbook Assignment - Weather</h1>
        </Container>
      </Box>
    </header>
  );
};

export default Header;

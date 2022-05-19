import { Container, Typography } from '@mui/material';
import { theme } from './theme';

const Header = (props) => {
  return (
    <header className="header">
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0',
          color: 'white',
          gap: theme.spacing(4),
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: theme.palette.secondary.main }}
        >
          Tealbook Assignment
        </Typography>
        <img src="logo.svg" style={{ width: '4rem' }} alt="" />
      </Container>
    </header>
  );
};

export default Header;

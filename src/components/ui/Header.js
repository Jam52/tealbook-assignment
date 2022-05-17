import { Container, Box, Typography } from '@mui/material';
import { theme } from './theme';
import UserCity from './UsersCity/UsersCity';

const Header = (props) => {
  return (
    <header>
      <Box className="header">
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '6rem',
            color: theme.palette.primary.main,
            gap: theme.spacing(4),
          }}
        >
          <UserCity />
          <Typography variant="h1" sx={{ fontSize: '2.5rem' }}>
            Tealbook Assignment - Weather Api
          </Typography>
        </Container>
      </Box>
    </header>
  );
};

export default Header;

import { createTheme } from '@mui/material/styles';

const primaryPurple = '#3A254C';
const secondaryOrange = '#E8A63A';

export const theme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: "'Nunito', 'sans-serif'",
  },
  palette: {
    common: {
      purple: primaryPurple,
      orange: secondaryOrange,
      white: '#fff',
    },
    primary: {
      main: primaryPurple,
    },
    secondary: {
      main: secondaryOrange,
    },
    background: {
      default: primaryPurple,
    },
  },
  status: {
    danger: '#E53C3C',
  },
  spacing: [0, 4, 8, 16, 32, 64],
});

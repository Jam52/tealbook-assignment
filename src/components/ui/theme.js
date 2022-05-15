import { createTheme } from '@mui/material/styles';

const primaryPurple = '#3A254C';
const secondaryOrange = '#E8A63A';

export const theme = createTheme({
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
      default: '#D3D1D3',
    },
  },
  status: {
    danger: '#E53C3C',
  },
  spacing: [0, 4, 8, 16, 32, 64],
});

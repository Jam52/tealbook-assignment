import { createTheme } from '@mui/material/styles';

import '@mui/material/styles/createPalette';
declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    purple: string;
    orange: string;
    white: string;
    red: string;
    blue: string;
  }
}

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
      red: '#CD5C5C',
      blue: '#5dd1e8',
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
  spacing: [0, 4, 8, 16, 32, 64],
});

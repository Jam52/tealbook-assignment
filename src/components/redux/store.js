import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './features/weather';

export default configureStore({
  reducer: {
    weather: weatherSlice,
  },
});

import { createSlice, createAsyncThunk, dispatchEvent } from '@reduxjs/toolkit';

export const getCity = createAsyncThunk(
  'weather/getCity',
  async (city, { dispatch }) => {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`,
    );
    const data = await res.json();
    const { lat, lon } = data[0];
    dispatch(getWeather({ lat, lon }));
    return data;
  },
);

export const getWeather = createAsyncThunk(
  'weather/weather',
  async ({ lat, lon }) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
    );
    const data = await res.json();
    return data;
  },
);

const weatherSlice = createSlice({
  name: ' weather',
  initialState: { cityStatus: 'ok', weatherStatus: '', searchedCities: [] },
  currentCity: { name: '', lat: '', lon: '' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCity.fulfilled, (state, { payload }) => {
      if (payload.length === 0) {
        state.cityStatus = 'error';
        return;
      }
      state.cityStatus = '';
    });
    builder.addCase(getCity.rejected, (state, action) => {
      state.cityStatus = 'error';
    });
    builder.addCase(getWeather.fulfilled, (state, { payload }) => {
      if (payload.length === 0) {
        state.weatherStatus = 'error';
        return;
      }
      console.log(payload);
    });
  },
});

export default weatherSlice.reducer;

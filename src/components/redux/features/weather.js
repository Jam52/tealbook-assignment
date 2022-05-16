import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCity = createAsyncThunk(
  'weather/getCity',
  async (city, { dispatch }) => {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`,
    );
    const data = await res.json();
    const { lat, lon, name } = data[0];
    dispatch(getWeather({ lat, lon, name }));
    return data;
  },
);

export const getWeather = createAsyncThunk(
  'weather/weather',
  async ({ lat, lon, name }) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
    );
    const data = await res.json();
    return { name, data: data };
  },
);

const weatherSlice = createSlice({
  name: ' weather',
  initialState: { cityStatus: 'ok', weatherStatus: '', searchedCities: [] },
  currentCity: { name: '', data: [] },
  reducers: {
    setPreviousCity: (state, { payload }) => {
      state.currentCity = payload;
    },
  },
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
    builder.addCase(getWeather.pending, (state, action) => {
      state.weatherStatus = 'pending';
    });
    builder.addCase(getWeather.fulfilled, (state, { payload }) => {
      if (payload.length === 0) {
        state.weatherStatus = 'error';
        return;
      }
      if (!state.searchedCities.some(({ name }) => name === payload.name)) {
        const cities = [
          { name: payload.name, data: payload.data.daily },
          ...state.searchedCities,
        ];
        state.searchedCities = [...cities.slice(0, 7)];
      }

      state.currentCity = { name: payload.name, data: payload.data.daily };
      state.weatherStatus = 'ok';
    });
    builder.addCase(getWeather.rejected, (state, action) => {
      state.weatherStatus = 'error';
    });
  },
});

export const { setPreviousCity } = weatherSlice.actions;

export default weatherSlice.reducer;

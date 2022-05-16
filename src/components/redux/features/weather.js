import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCity = createAsyncThunk(
  'weather/getCity',
  async (city, { dispatch }) => {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`,
    );
    const data = await res.json();

    if (data.length === 0) return data;
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
    console.log({ name, data: data.data });
    return { name, data: data };
  },
);

const weatherSlice = createSlice({
  name: ' weather',
  initialState: { cityStatus: 'ok', weatherStatus: '', searchedCities: [] },
  currentCity: { name: '', data: [] },
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
    builder.addCase(getWeather.pending, (state, action) => {
      state.weatherStatus = 'pending';
    });
    builder.addCase(getWeather.fulfilled, (state, { payload }) => {
      console.log('fullfilled', payload);
      if (payload.length === 0) {
        state.weatherStatus = 'error';
        return;
      }
      state.searchedCities = [
        ...state.searchedCities,
        { name: payload.name, data: payload.data },
      ];
      state.currentCity = { name: payload.name, data: payload.data.daily };
      state.weatherStatus = 'ok';
    });
    builder.addCase(getWeather.rejected, (state, action) => {
      state.weatherStatus = 'error';
    });
  },
});

export default weatherSlice.reducer;

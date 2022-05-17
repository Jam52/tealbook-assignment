import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

interface IGeoLocation {
  lat: number;
  lon: number;
  name: string;
}

export const getCity = createAsyncThunk<
  IGeoLocation,
  string,
  { dispatch: AppDispatch }
>('weather/getCity', async (city: string, { dispatch }) => {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`,
  );
  const data = await res.json();
  const { lat, lon, name } = data[0];

  const location: IGeoLocation = {
    lat,
    lon,
    name,
  };

  dispatch(getWeather(location));
  return location;
});

export const getWeather = createAsyncThunk<ICity, IGeoLocation>(
  'weather/weather',
  async (location: IGeoLocation) => {
    const { lat, lon, name } = location;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
    );
    const data = await res.json();
    const city: ICity = { name, data: data.daily };
    return city;
  },
);

export interface ICity {
  name: string;
  data: Array<{
    dt: number;
    weather: Array<{ icon: string; description: string }>;
  }>;
}

interface IWeatherState {
  fetchCityStatus: string;
  currentCity: ICity | null;
  searchedCities: Array<ICity>;
  fetchWeatherStatus: string;
}

// interface ISearchedCity {
//   name: string;
//   data: Array<{ weather: Array<{}> }>;
// }

const initialState: IWeatherState = {
  fetchCityStatus: '',
  fetchWeatherStatus: '',
  searchedCities: [],
  currentCity: null,
};

const weatherSlice = createSlice({
  name: ' weather',
  initialState,
  reducers: {
    setPreviousCity: (state, action: PayloadAction<ICity>) => {
      state.currentCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCity.pending, (state, action) => {
        state.fetchCityStatus = 'loading';
      })
      .addCase(
        getCity.fulfilled,
        (state, action: PayloadAction<IGeoLocation>) => {
          if (!action.payload) {
            state.fetchCityStatus = 'no cities found';
            return;
          }
          state.fetchCityStatus = '';
        },
      )
      .addCase(getCity.rejected, (state, action) => {
        state.fetchCityStatus = 'error fetching city';
      })
      .addCase(getWeather.pending, (state, action) => {
        state.fetchWeatherStatus = 'loading';
      })
      .addCase(getWeather.fulfilled, (state, { payload }) => {
        if (!payload) {
          state.fetchWeatherStatus = 'no weather found';
          return;
        }
        if (!state.searchedCities.some(({ name }) => name === payload.name)) {
          const cities = [
            { name: payload.name, data: payload.data },
            ...state.searchedCities,
          ];
          state.searchedCities = [...cities.slice(0, 7)];
          state.fetchWeatherStatus = '';
        }

        state.currentCity = { name: payload.name, data: payload.data };
        state.fetchWeatherStatus = 'ok';
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.fetchWeatherStatus = 'error';
      });
  },
});

export const { setPreviousCity } = weatherSlice.actions;

export default weatherSlice.reducer;

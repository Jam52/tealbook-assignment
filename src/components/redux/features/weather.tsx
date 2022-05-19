import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import {
  fetchGeoLocation,
  fetchWeatherData,
  fetchReverseGeoencoding,
} from '../../servises/weatherApi';

export const getCity = createAsyncThunk<
  IGeoLocation,
  string,
  { dispatch: AppDispatch }
>(
  'weather/getCity',
  async (city: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as any;
    const weatherState = state.weather as IWeatherState;
    if (city.toLowerCase() === weatherState?.userCityData?.name.toLowerCase()) {
      return rejectWithValue('Current city not vaild.');
    }

    if (
      weatherState?.searchedCities.some(
        ({ name }) => name.toLowerCase() === city.toLowerCase(),
      )
    ) {
      return rejectWithValue('City already in results.');
    }

    const data = await fetchGeoLocation(city);
    const { lat, lon, name } = data[0];

    const location: IGeoLocation = {
      lat,
      lon,
      name,
    };

    dispatch(getWeather(location));
    return location;
  },
);

export const getWeather = createAsyncThunk<ICity, IGeoLocation>(
  'weather/weather',
  async (location: IGeoLocation) => {
    const data = await fetchWeatherData(location);
    const city: ICity = { name: location.name, data: data };
    return city;
  },
);

export const setUserCity = createAsyncThunk(
  'weather/userCity',
  async (location: IGeoLocation) => {
    const weatherData = await fetchWeatherData(location);
    const cityNameData = await fetchReverseGeoencoding(location);
    const city: ICity = {
      name: cityNameData.name,
      data: weatherData,
    };
    return city;
  },
);

interface IWeatherState {
  fetchCityStatus: string;
  currentCity: ICity | null;
  searchedCities: Array<ICity>;
  fetchWeatherStatus: string;
  userCityData: ICity | null;
}

const initialState: IWeatherState = {
  fetchCityStatus: '',
  fetchWeatherStatus: '',
  searchedCities: [],
  currentCity: null,
  userCityData: null,
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
      .addCase(getCity.fulfilled, (state, { payload }) => {
        if (!payload) {
          state.fetchCityStatus = 'no cities found';
          return;
        }
        state.fetchCityStatus = '';
      })
      .addCase(getCity.rejected, (state, { payload }) => {
        state.fetchCityStatus = payload as string;
      })
      .addCase(getWeather.pending, (state, action) => {
        state.fetchWeatherStatus = 'loading';
      })
      .addCase(getWeather.fulfilled, (state, { payload }) => {
        if (!payload) {
          state.fetchWeatherStatus = 'no weather found';
          return;
        }

        const cities = [
          { name: payload.name, data: payload.data },
          ...state.searchedCities,
        ];
        state.searchedCities = [...cities.slice(0, 7)];
        state.fetchWeatherStatus = '';
        state.currentCity = { name: payload.name, data: payload.data };
        state.fetchWeatherStatus = 'ok';
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.fetchWeatherStatus = 'error';
      })
      .addCase(setUserCity.fulfilled, (state, { payload }) => {
        state.userCityData = payload;
      });
  },
});

export const { setPreviousCity } = weatherSlice.actions;

export default weatherSlice.reducer;

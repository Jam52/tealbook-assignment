import { utilRender, screen } from '../../../utils/test-utils';
import WeatherComparison from './WeatherComparison';
import forecastToJson from '../Forecast/forecastRes.json';
import tokyoForecast from './tokyoForecast.json';

describe('WeatherComparison Component', () => {
  const setup = (state) => utilRender(<WeatherComparison />, state);

  describe('if current searched city is not in state', () => {
    const state = {
      preloadedState: {
        weather: {
          userCityData: { name: 'Toronto', data: forecastToJson.daily },
        },
      },
    };
    it('does not render', () => {
      setup(state);
      const container = screen.queryByTestId('weatherComparison');
      expect(container).toBeFalsy();
    });
  });

  describe('if current searched city is selected in state', () => {
    const state = {
      preloadedState: {
        weather: {
          userCityData: { name: 'Toronto', data: forecastToJson },
          currentCity: { name: 'Tokyo', data: tokyoForecast },
        },
      },
    };
    it('renders correctly', () => {
      setup(state);
      const container = screen.queryByTestId('weatherComparison');
      expect(container).toBeTruthy();
    });
    it('renders city name of tokyo', () => {
      setup(state);
      const text = screen.getByText(/tokyo/i);
      expect(text).toBeTruthy();
    });
    it('renders "colder" comparison', () => {
      setup(state);
      const text = screen.getByText(/colder/i);
      expect(text).toBeTruthy();
    });
  });
});

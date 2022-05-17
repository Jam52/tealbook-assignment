import { utilRender, screen } from '../../../utils/test-utils';
import CityInput from './CityInput';
import forecastJson from '../Forecast/forecastRes.json';

describe('CityInput Component', () => {
  const setup = (state) => utilRender(<CityInput />, state);

  describe('Before any updates to state', () => {
    it('renders correctly', () => {
      setup();
      const container = screen.getByTestId('city');
      expect(container).toBeTruthy();
    });

    it('does not container previose city header', () => {
      setup();
      const searchedCitiesHeader = screen.queryByTestId('previousCites');
      expect(searchedCitiesHeader).toBeFalsy();
    });
  });

  describe('After update to state', () => {
    const state = {
      preloadedState: {
        weather: {
          cityStatus: '',
          searchedCities: [
            { name: 'Toronto', data: forecastJson.daily },
            { name: 'New York', data: forecastJson.daily },
            { name: 'Nottingham', data: forecastJson.daily },
          ],
        },
      },
    };

    it('renders correctly', () => {
      setup(state);
      const container = screen.getByTestId('city');
      expect(container).toBeTruthy();
    });

    it('contains previose city header', () => {
      setup(state);
      const searchedCitiesHeader = screen.getByTestId('previousCities');
      expect(searchedCitiesHeader).toBeTruthy();
    });

    it('contains 3 buttons', () => {
      setup(state);
      const cityButton = screen.queryAllByTestId('previousCityButton');
      expect(cityButton).toHaveLength(3);
    });
  });
});

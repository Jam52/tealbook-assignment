import { utilRender, screen } from '../../../utils/test-utils';
import CityInput from './CityInput';
import forecastJson from '../Forecast/forecastRes.json';

describe('CityInput Component ', () => {
  let container = null;
  let searchedCitiesHeader = null;
  let submitButton = null;
  let cityButton = null;

  describe('Before any updates to state', () => {
    beforeEach(() => {
      utilRender(<CityInput />);
      container = screen.getByTestId('city');
      searchedCitiesHeader = screen.queryByTestId('previousCites');
      submitButton = screen.findByTestId('cityButton');
    });

    it('renders correctly', () => {
      expect(container).toBeTruthy();
    });
    it('does not container previose city header', () => {
      expect(searchedCitiesHeader).toBeFalsy();
    });
  });

  describe('After update to state', () => {
    beforeEach(() => {
      utilRender(<CityInput />, {
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
      });
      container = screen.getByTestId('city');
      searchedCitiesHeader = screen.getByTestId('previousCities');
      cityButton = screen.getAllByTestId('previousCityButton');
    });

    it('renders correctly', () => {
      expect(container).toBeTruthy();
    });
    it('contains previose city header', () => {
      expect(searchedCitiesHeader).toBeTruthy();
    });
    it('contains 3 buttons', () => {
      expect(cityButton).toHaveLength(3);
    });
  });
});

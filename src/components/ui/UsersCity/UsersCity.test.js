import { utilRender, screen } from '../../../utils/test-utils';
import UsersCity from './UsersCity.tsx';
import forecastJson from '../Forecast/forecastRes.json';

describe('UsersCity Component', () => {
  const setup = (state) => utilRender(<UsersCity />, state);

  describe('if no users city is in state', () => {
    it('renders correctly', () => {
      setup();
      const container = screen.getByTestId('userCity');
      expect(container).toBeTruthy();
    });

    it('renders placeholder img', () => {
      setup();
      const image = screen.getByTestId('userCityImage');
      expect(image).toBeTruthy();
    });
  });

  describe('if users city is found in state', () => {
    const state = {
      preloadedState: {
        weather: {
          userCityData: { name: 'Toronto', data: forecastJson.daily },
        },
      },
    };

    it('does not render placeholder img', () => {
      setup(state);
      const image = screen.queryByTestId('image');
      expect(image).toBeFalsy();
    });
    it('renders user info section', () => {
      setup(state);
      const image = screen.queryByTestId('userInfo');
      expect(image).toBeTruthy();
    });
  });
});

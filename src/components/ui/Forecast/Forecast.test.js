import { utilRender, screen } from '../../../utils/test-utils';
import Forecast from './Forecast';
import forecastJson from './forecastRes.json';

describe('Forcast Component: ', () => {
  const setup = (state) => utilRender(<Forecast />, state);

  describe('when there is no state data', () => {
    it('does not render', () => {
      setup();
      const container = screen.queryByTestId('forecast');
      expect(container).toBeFalsy();
    });

    it('renders 0 forcast cards', () => {
      setup();
      const card = screen.queryAllByTestId('forecastCard');
      expect(card).toHaveLength(0);
    });
  });

  describe('contains city data in state', () => {
    const state = {
      preloadedState: {
        weather: {
          currentCity: { name: 'Toronto', data: forecastJson.daily },
        },
      },
    };

    it('renders container correctly', () => {
      setup(state);
      const container = screen.queryByTestId('forecast');
      expect(container).toBeTruthy();
    });

    it('render correct header', () => {
      setup(state);
      const headerText = screen.getByText('Seven Day Forecast - Toronto');
      expect(headerText).toBeTruthy();
    });

    it('contains 8 forcast cards', () => {
      setup(state);
      const card = screen.queryAllByTestId('forecastCard');
      expect(card).toHaveLength(8);
    });
  });
});

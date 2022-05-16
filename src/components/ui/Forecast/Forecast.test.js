import { utilRender, screen } from '../../../utils/test-utils';
import Forecast from './Forecast';
import forecastJson from './forecastRes.json';

describe('Forcast Component: ', () => {
  let container = null;
  let card = null;
  let headerText = null;
  describe('when there is no state data', () => {
    beforeEach(() => {
      utilRender(<Forecast />);
      container = screen.queryByTestId('forecast');
      card = screen.queryAllByTestId('forcastCard');
    });

    it('does not render', () => {
      expect(container).toBeFalsy();
    });

    it('renders 0 forcast cards', () => {
      expect(card).toHaveLength(0);
    });
  });

  describe(' contains city data in state', () => {
    beforeEach(() => {
      utilRender(<Forecast />, {
        preloadedState: {
          weather: {
            currentCity: { name: 'Toronto', data: forecastJson.daily },
          },
        },
      });
      container = screen.queryByTestId('forecast');
      card = screen.queryAllByTestId('forcastCard');
      headerText = screen.getByText('Seven Day Forecast - Toronto');
    });

    it('renders container correctly', () => {
      expect(container).toBeTruthy();
    });

    it('render correct header', () => {
      expect(headerText).toBeTruthy();
    });
  });
});

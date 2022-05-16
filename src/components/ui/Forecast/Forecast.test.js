import { render } from '../../../utils/test-utils';
import Forecast from './Forecast';

describe('Forcast component', () => {
  const forcast = <Forecast />;

  it('renders correctly', () => {
    const { queryByTestId } = render(forcast);
    const container = queryByTestId('forcast');
    expect(container).toBeTruthy();
  });

  it('renders 7 forcast cards from results', () => {
    const { queryAllByTestId } = render(forcast);
    const container = queryAllByTestId('forcastCard');
    expect(container).toHaveLength(8);
  });
});

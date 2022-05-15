import { render } from '@testing-library/react';
import Forecast from './Forecast';
import res from './forecastRes.json';

describe('Forcast component', () => {
  const forcast = <Forecast results={res.daily} />;

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

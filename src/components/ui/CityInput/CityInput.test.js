import { render, fireEvent, waitFor, screen } from '../../../utils/test-utils';
import CityInput from './CityInput';
import PreviousCities from './previousCities';

describe('City Input Component', () => {
  const props = {};
  it('rendered', () => {
    const { getByTestId } = render(<CityInput />);
    const input = getByTestId('city');
    expect(input).toBeTruthy();
  });

  it('Renderes previous city buttons when available', () => {
    const { getAllByTestId } = render(
      <PreviousCities {...props} cities={['London', 'Tokyo']} />,
    );
    const buttons = getAllByTestId('previousCityButton');
    expect(buttons).toHaveLength(2);
  });

  it('Renders no previos city header when no cities have been searched', () => {
    const { queryByTestId } = render(<PreviousCities cities={[]} />);
    const buttons = queryByTestId('previousCityHeader');
    expect(buttons).toBeNull();
  });
});

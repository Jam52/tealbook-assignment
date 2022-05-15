import { render } from '@testing-library/react';
import CityInput from './CityInput';

describe('City Input Component', () => {
  const props = {
    isError: false,
    previousCities: [],
  };
  it('rendered', () => {
    const { getByTestId } = render(<CityInput {...props} />);
    const input = getByTestId('cityInput');
    expect(input).toBeTruthy();
  });

  it('Rendered error msg when input was incorrect', () => {
    const { getByText } = render(<CityInput {...props} isError={true} />);
    const errorMsg = getByText('City not found.');
    expect(errorMsg).toBeTruthy();
  });

  it('Renderes previous city buttons when available', () => {
    const { getAllByTestId } = render(
      <CityInput {...props} previousCities={['London', 'Tokyo']} />,
    );
    const buttons = getAllByTestId('previousCityButton');
    expect(buttons).toHaveLength(2);
  });

  it('Renders no previos city header when no cities have been searched', () => {
    const { queryByTestId } = render(<CityInput {...props} />);
    const buttons = queryByTestId('previousCityHeader');
    expect(buttons).toBeNull();
  });
});

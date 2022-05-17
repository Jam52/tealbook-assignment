import { utilRender, screen } from '../../../utils/test-utils';
import UsersCity from './UsersCity.tsx';

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
      const image = screen.getByTestId('image');
      expect(image).toBeTruthy();
    });
  });

  describe('if users city is found in state', () => {
    const state = it('does not render placeholder img', () => {
      setup();
      const image = screen.getByTestId('image');
      expect(image).toBeFalsy();
    });
  });
});

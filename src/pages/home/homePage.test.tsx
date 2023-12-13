import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomePage from './homePage';
import { Home } from '../../components/home/home';

jest.mock('../../components/home/home');

describe('Given App component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      render(<HomePage></HomePage>);
    });
    test('renders App with Footer', () => {
      expect(Home).toHaveBeenCalled();
    });
  });
});

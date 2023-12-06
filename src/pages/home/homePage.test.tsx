import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HomeList } from '../../components/home/home';
import HomePage from './homePage';

jest.mock('../../components/home/home');

describe('Given App component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      render(<HomePage></HomePage>);
    });
    test('renders App with Footer', () => {
      expect(HomeList).toHaveBeenCalled();
    });
  });
});

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../store/store';
import HomePage from './homePage';

describe('Given HomePage component', () => {
  test('renders HomePage with HomeImages', () => {
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </Router>
    );

    expect(getByText(/Ver Todos los cascos/i)).toBeInTheDocument();
  });
});

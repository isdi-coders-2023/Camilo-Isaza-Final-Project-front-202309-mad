import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import { Header } from './header';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Header Component', () => {
  test('renders header with mock children', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header>
            <div>Test Children</div>
          </Header>
        </MemoryRouter>
      </Provider>
    );

    const headerElement = screen.getByRole('heading', { name: /SUPERKASKOS/i });

    expect(headerElement).toBeInTheDocument();
  });
});

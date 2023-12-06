import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Menu } from './menu';

describe('Menu Component', () => {
  test('renders menu with mock children', () => {
    const mockOptions = [{ label: 'a', path: 'b' }];
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Menu options={mockOptions}>
            <div>Test Children</div>
          </Menu>
        </MemoryRouter>
      </Provider>
    );

    const menuIcon = screen.getByAltText('icono de menu plegable');
    expect(menuIcon).toBeInTheDocument();

    const linkElements = screen.getByRole('link');

    expect(linkElements).toBeInTheDocument();
  });
});

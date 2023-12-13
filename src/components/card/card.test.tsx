import { Helmet } from '../../model/helmet';
import { MemoryRouter as Router } from 'react-router-dom';
import { Card } from './card';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Given card component', () => {
  const mockHelmet = {
    reference: 'MockReference',
    price: 50,
    images: { url: 'mockImageUrl' },
  } as Helmet;

  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Card helmet={mockHelmet}></Card>
        </Router>
      </Provider>
    );
  });

  test('Then it should render the list', () => {
    const element = screen.getByRole('listitem');
    expect(element).toBeInTheDocument();
  });
});

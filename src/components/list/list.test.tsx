import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { List } from './list';

describe('Given list component', () => {
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <Router>
          <List />
        </Router>
      </Provider>
    );
  });
  expect(screen.getByTestId('list-container')).toBeInTheDocument();
});

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../store/store';

import HelmetsPage from './helmets_page';

describe('Given DetailsPage component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Router>
            <HelmetsPage></HelmetsPage>
          </Router>
        </Provider>
      );
    });
    test('then render App with DetailsPage', () => {
      expect(HelmetsPage).toHaveBeenCalled();
    });
  });
});

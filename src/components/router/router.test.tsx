import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Router } from './router';
import '@testing-library/jest-dom';

test('renders error page when the route is not recognized', async () => {
  render(
    <MemoryRouter initialEntries={['/unknown']}>
      <Router />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Error/i)).toBeInTheDocument();
});

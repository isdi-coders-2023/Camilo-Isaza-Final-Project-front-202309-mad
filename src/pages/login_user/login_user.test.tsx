import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoginForm from './login_user';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/react';
import { useUsers } from '../../hooks/useUsers';

jest.mock('../../components/home/home');
jest.mock('../../hooks/useUsers');

describe('Given RegisterForm component', () => {
  test('It should be in the document', () => {
    const mockRegister = jest.fn();
    (useUsers as jest.Mock).mockReturnValue({
      register: mockRegister,
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoginForm />
        </Provider>
      </MemoryRouter>
    );

    const element = screen.getByTestId('login-form');
    expect(element).toBeInTheDocument();
  });
});

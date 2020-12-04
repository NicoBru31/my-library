import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Login, { LoginInterface } from '../pages/login';

const mockUseLogin = jest.fn((data: LoginInterface) => {});
jest.mock('../hooks/useLogin', () => ({
  __esModule: true,
  default: () => mockUseLogin,
}));

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({ query: {}, push: () => {} }),
}));

describe('Test Login Page', () => {
  beforeEach(() => {
    render(<Login />);
  });

  it('Login Page errors', async () => {
    const loginButton = screen.getByText('Je me connecte');
    expect(loginButton).toBeInTheDocument();
    fireEvent.submit(loginButton);

    await waitFor(() => {
      expect(screen.getAllByRole('alert')).toHaveLength(2);
      expect(mockUseLogin).not.toBeCalled();
    });
  });

  it('should display matching error when email is invalid', async () => {
    const loginButton = screen.getByText('Je me connecte');
    fireEvent.input(screen.getByRole('textbox', { name: 'E-mail' }), {
      target: {
        value: 'test',
      },
    });
    fireEvent.input(screen.getByRole('textbox', { name: 'Mot de passe' }), {
      target: {
        value: 'password',
      },
    });
    fireEvent.submit(loginButton);

    await waitFor(() => {
      expect(
        (screen.getByRole('textbox', { name: 'E-mail' }) as HTMLInputElement)
          .value,
      ).toBe('test');
      expect(
        (screen.getByRole('textbox', {
          name: 'Mot de passe',
        }) as HTMLInputElement).value,
      ).toBe('password');
      expect(screen.getAllByRole('alert')).toHaveLength(1);
      expect(mockUseLogin).not.toBeCalled();
    });
  });

  it('Should not display error when inputs are OK', async () => {
    const loginButton = screen.getByText('Je me connecte');
    fireEvent.input(screen.getByRole('textbox', { name: 'E-mail' }), {
      target: {
        value: 'test@mail.com',
      },
    });
    fireEvent.input(screen.getByRole('textbox', { name: 'Mot de passe' }), {
      target: {
        value: 'password',
      },
    });
    fireEvent.submit(loginButton);

    await waitFor(() => {
      expect(mockUseLogin).toBeCalledTimes(1);
      expect(mockUseLogin.mock.calls[0][0]).toEqual({
        email: 'test@mail.com',
        password: 'password',
      });
    });
  });

  it('Form should disappear when click create account', async () => {
    fireEvent.click(screen.getByText('Je crée mon compte'));

    await waitFor(() => {
      expect(screen.queryByText('Je crée mon compte')).not.toBeInTheDocument();
    });
  });
});

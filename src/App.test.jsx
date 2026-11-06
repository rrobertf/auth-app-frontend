import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import Register from './components/Register';

vi.mock('axios');
const user = { username: 'Roberto', email: 'roberto@example.com', role: 'user', id: 1 };
beforeEach(() => { localStorage.clear(); sessionStorage.clear(); vi.resetAllMocks(); });

test('restores a tab session and logout clears credentials', async () => {
  sessionStorage.setItem('token', 'valid-token');
  axios.get.mockResolvedValue({ data: { user } });
  render(<App />);
  expect(await screen.findByText(/Bienvenido,/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /cerrar sesión/i }));
  expect(screen.getByRole('heading', { name: /bienvenido de vuelta/i })).toBeInTheDocument();
  expect(sessionStorage.getItem('token')).toBeNull();
  expect(localStorage.getItem('token')).toBeNull();
});

test('invalid stored token returns to login and clears stale user', async () => {
  sessionStorage.setItem('token', 'expired-token');
  axios.get.mockRejectedValue({ response: { status: 401 } });
  render(<App />);
  expect(await screen.findByRole('heading', { name: /bienvenido de vuelta/i })).toBeInTheDocument();
  await waitFor(() => expect(sessionStorage.getItem('token')).toBeNull());
  expect(screen.queryByText(/Bienvenido,/)).not.toBeInTheDocument();
});

test('login stores the token for this tab and displays verified profile', async () => {
  axios.post.mockResolvedValue({ data: { token: 'new-token', user } });
  axios.get.mockResolvedValue({ data: { user } });
  render(<App />);
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: user.email } });
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'a secure passphrase' } });
  fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }).closest('form'));
  expect(await screen.findByText(/Bienvenido,/)).toBeInTheDocument();
  expect(sessionStorage.getItem('token')).toBe('new-token');
  expect(localStorage.getItem('token')).toBeNull();
});

test('registration rejects short passwords and bcrypt truncation in UTF-8', () => {
  render(<Register onRegister={() => { throw new Error('must not submit'); }} onSwitchToLogin={() => {}} />);
  fireEvent.change(screen.getByLabelText('Nombre completo'), { target: { value: 'Roberto' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: user.email } });
  fireEvent.click(screen.getByRole('button', { name: /siguiente/i }));
  fireEvent.click(screen.getByRole('checkbox'));
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234567' } });
  fireEvent.submit(screen.getByRole('button', { name: /crear cuenta/i }).closest('form'));
  expect(screen.getByText(/mínimo 8 caracteres/i)).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'é'.repeat(37) } });
  fireEvent.submit(screen.getByRole('button', { name: /crear cuenta/i }).closest('form'));
  expect(screen.getByText(/máximo 72 bytes/i)).toBeInTheDocument();
});

test('a late token verification cannot sign the user back in after logout', async () => {
  localStorage.setItem('token', 'legacy-token');
  let resolve;
  axios.get.mockImplementationOnce(() => new Promise(done => { resolve = done; }));
  render(<App />);
  // Cancel remains available while validating a restored session.
  fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
  await act(async () => { resolve({ data: { user } }); });
  expect(screen.getByRole('heading', { name: /bienvenido de vuelta/i })).toBeInTheDocument();
  expect(screen.queryByText(/Bienvenido,/)).not.toBeInTheDocument();
});

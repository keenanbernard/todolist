import { render, screen } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the GoogleOAuthProvider

import App from './App';

jest.mock('@restart/hooks/cjs/useMediaQuery', () => {
  return {
    __esModule: true,
    default: jest.fn(), // Mock useMediaQuery as a function
  };
});

test('renders learn react link', () => {
  render(
    <GoogleOAuthProvider clientId="3885365612-4k72g7a8h28vk1hcv7las95aihdaepvp.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  );
  const linkElement = screen.getByTestId('App');
  expect(linkElement).toBeInTheDocument();
});

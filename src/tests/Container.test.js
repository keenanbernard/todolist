import { render, screen } from '@testing-library/react';
import Container from "../components/Container/Containter";

test('renders container page', () => {
  render(<Container />);
  const linkElement = screen.getByTestId('Container');
  expect(linkElement).toBeInTheDocument();
});
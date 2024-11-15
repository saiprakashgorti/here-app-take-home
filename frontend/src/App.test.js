import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Student Attendance Management heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Student Attendance Management/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders attendance table', () => {
  render(<App />);
  const tableElement = screen.getByRole('table');
  expect(tableElement).toBeInTheDocument();
});

test('modal should not be visible initially', () => {
  render(<App />);
  const modalElement = screen.queryByText(/Add Attendance/i);
  expect(modalElement).not.toBeInTheDocument();
});
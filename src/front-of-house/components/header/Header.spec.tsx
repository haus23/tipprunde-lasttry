import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('FrontOfHouse/Header', () => {
  it('renders title', () => {
    render(<Header />);
    screen.getByText('runde.tips');
  });
});

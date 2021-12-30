import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('renders', () => {
    render(<Button />);
    screen.getByText('Button');
  });

  test('renders content', () => {
    render(<Button>Click me</Button>);
    screen.getByText('Click me');
  });

  test('handles click events', () => {
    const handler = vi.fn();

    render(<Button onClick={handler} />);

    const btn = screen.getByText('Button');
    fireEvent.click(btn);

    expect(handler).toHaveBeenCalled();
  });

  test('forwards ref to the button', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<Button ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test('has a primary variant flag', () => {
    render(<Button primary />);
  });

  test('has default type "button"', () => {
    render(<Button />);
    expect(screen.getByText<HTMLButtonElement>('Button').type).toBe('button');
  });

  test('accepts extra css classes', () => {
    render(<Button className="special" />);
    expect(
      screen.getByText('Button').classList.contains('special')
    ).toBeTruthy();
  });
});

import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { NavButton } from './NavButton';

describe('NavButton', () => {
  test('renders children', () => {
    render(<NavButton>Test!</NavButton>);
    screen.getByText('Test!');
  });

  test('has type button', () => {
    render(<NavButton>Test!</NavButton>);
    const btn = screen.getByText('Test!') as HTMLButtonElement;
    expect(btn.type).toBe('button');
  });

  test('forwards ref from the inner button', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<NavButton ref={ref}>Click</NavButton>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

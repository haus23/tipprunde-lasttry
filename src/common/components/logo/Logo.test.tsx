import { render } from '@testing-library/react';
import { Logo } from './Logo';

test('has classname property', () => {
  const { getByTestId } = render(<Logo className="hidden" />);
  const logoContainer = getByTestId('logoContainer');
  expect(logoContainer.classList.contains('hidden')).toBeTruthy();
});

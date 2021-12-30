import { createRef } from 'react';
import { render, screen } from '@testing-library/react';

import { TextField } from './TextField';

describe('TextField', () => {
  test('renders textbox', () => {
    render(<TextField />);
    screen.getByRole('textbox');
  });

  test('has label', () => {
    render(<TextField />);
    screen.getByLabelText('Label');
  });

  test('has label property', () => {
    render(<TextField label="Vorname" />);
    screen.getByLabelText('Vorname');
  });

  test('shares properties of input field', () => {
    render(
      <TextField className="block" type="text" placeholder="Platzhalter" />
    );
  });

  test('forwards ref to the input field', () => {
    const ref = createRef<HTMLInputElement>();

    render(<TextField ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('has labelHidden property', () => {
    render(<TextField label="Vorname" labelHidden />);
    expect(screen.getByText('Vorname')).not.toBeVisible();
  });

  test('has errorMsg property', () => {
    const error = 'Deutsche Postleitzahl mit 5 Ziffern';
    render(<TextField label="PLZ" errorMsg={error} />);
    expect(screen.getByTestId('errorMsg')).toHaveTextContent(error);
    expect(screen.getByTestId('errorIcon')).toBeInTheDocument();
  });

  test('shows no error for emtpy message but symbol', () => {
    render(<TextField label="PLZ" errorMsg={''} />);
    expect(screen.queryByTestId('errorMsg')).not.toBeInTheDocument();
    expect(screen.getByTestId('errorIcon')).toBeInTheDocument();
  });
});

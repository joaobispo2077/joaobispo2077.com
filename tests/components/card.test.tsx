import React, { ReactElement } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';

import { Card } from '@src/components/Card';

function renderWithProviders(ui: ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe('Card component', () => {
  it('renders children content', () => {
    renderWithProviders(
      <Card>
        <span>Card content</span>
      </Card>,
    );

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies custom Chakra props', () => {
    renderWithProviders(
      <Card data-testid="card" padding="2rem">
        <span>Styled card</span>
      </Card>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = renderWithProviders(
      <Card data-testid="card">
        <span>Snapshot card</span>
      </Card>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});


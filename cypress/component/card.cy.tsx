import { ChakraProvider } from '@chakra-ui/react';

import { Card } from '@src/components/Card';

describe('<Card />', () => {
  it('renders children content', () => {
    cy.mount(
      <ChakraProvider>
        <Card>
          <span>Card content</span>
        </Card>
      </ChakraProvider>,
    );

    cy.contains('Card content').should('be.visible');
  });
});


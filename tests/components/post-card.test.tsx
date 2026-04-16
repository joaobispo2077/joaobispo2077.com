import { ReactElement } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';

jest.mock('@src/hooks/useTranslation', () => ({
  useTranslation: () => ({
    locale: 'en-us',
  }),
}));

// Intl output for the same UTC instant differs by OS timezone; mock formatting for stable snapshots.
jest.mock('@src/utils/date', () => {
  const actual = jest.requireActual<typeof import('@src/utils/date')>('@src/utils/date');
  return {
    ...actual,
    formatDate: jest.fn(() => 'Mar 27, 2026'),
  };
});

import { PostCard } from '@src/components/PostCard';

function renderWithProviders(ui: ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe('PostCard component', () => {
  const props = {
    title: 'Normalization vs Access Patterns',
    description: 'A practical comparison for production systems.',
    createdAt: new Date('2026-03-27T00:00:00.000Z'),
    slug: 'normalization-vs-access-patterns',
    tags: ['database', 'architecture'],
  };

  it('renders title, description and tags', () => {
    renderWithProviders(<PostCard {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(screen.getByText('database')).toBeInTheDocument();
    expect(screen.getByText('architecture')).toBeInTheDocument();
  });

  it('renders a link to the blog post slug', () => {
    renderWithProviders(<PostCard {...props} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/blog/posts/${props.slug}`);
  });

  it('renders formatted date text', () => {
    renderWithProviders(<PostCard {...props} />);

    expect(screen.getByText(/2026/i)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = renderWithProviders(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});


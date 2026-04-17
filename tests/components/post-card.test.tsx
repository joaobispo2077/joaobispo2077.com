import React, { ReactElement } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';

import { PostCard, type PostCardProps } from '@src/components/PostCard';

jest.mock('@src/hooks/useTranslation', () => ({
  useTranslation: () => ({
    locale: 'en-us',
  }),
}));

function renderWithProviders(ui: ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
}

describe('PostCard component', () => {
  // jest.useFakeTimers + setSystemTime: stable `new Date()` for Intl (see Jest timer mocks + Fake Timers API).
  let props: PostCardProps;

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-27T12:00:00.000Z'));
    props = {
      title: 'Normalization vs Access Patterns',
      description: 'A practical comparison for production systems.',
      createdAt: new Date(),
      slug: 'normalization-vs-access-patterns',
      tags: ['database', 'architecture'],
    };
  });

  afterAll(() => {
    jest.useRealTimers();
  });

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


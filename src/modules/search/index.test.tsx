import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchList from './index';
import { useQuery } from '@apollo/client';

jest.mock('@apollo/client', () => ({ useQuery: jest.fn(), gql: jest.fn() }));

describe('SearchList', () => {
  const useQueryMock = useQuery as jest.Mock;

  it('shows loading state while waiting', () => {
    useQueryMock.mockReturnValueOnce({ loading: true });
    render(<SearchList />);

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });

  it('renders message when error occurred', () => {
    useQueryMock.mockReturnValueOnce({ loading: false, error: new Error('Unknown') });
    render(<SearchList />);

    expect(screen.getByText('Error: Unknown')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    const response = { search: { edges: [] } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<SearchList />);

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders list when loading succeeded', () => {
    const list = [{ node: { id: '1', name: 'Repo Name 1' } }];
    const response = { search: { edges: list } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<SearchList />);

    expect(screen.getByText('Repo Name 1')).toBeInTheDocument();
  });
});

import { useQuery } from '@apollo/client';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import SearchList from './index';
import { searchQuery } from './query';

jest.mock('@apollo/client', () => ({ useQuery: jest.fn(), gql: jest.fn() }));

describe('SearchList', () => {
  const pageInfoMock = { hasNextPage: false, hasPreviousPage: false };
  const useQueryMock = useQuery as jest.Mock;

  it('shows loading state while waiting', () => {
    useQueryMock.mockReturnValueOnce({ loading: true });
    render(<SearchList />);

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('renders message when error occurred', () => {
    useQueryMock.mockReturnValueOnce({ loading: false, error: new Error('Unknown') });
    render(<SearchList />);

    expect(screen.getByText('loading_error: Unknown')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    const response = { search: { edges: [], pageInfo: pageInfoMock } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<SearchList />);

    expect(screen.getByText('empty_results')).toBeInTheDocument();
  });

  it('renders list when loading succeeded', () => {
    const list = [{ node: { id: '1', name: 'Repo Name 1' } }];
    const response = { search: { edges: list, pageInfo: pageInfoMock } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<SearchList />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('sets pagination buttons disabled if there is nothing to load ', () => {
    const list = [{ node: { id: '1', name: 'Repo Name 1' } }];
    const response = { search: { edges: list, pageInfo: pageInfoMock } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<SearchList />);

    expect(screen.getByText('prev_page')).toBeDisabled();
    expect(screen.getByText('next_page')).toBeDisabled();
  });

  it('sets previous page buttons enabled if back pagination available', () => {
    const list = [{ node: { id: '1', name: 'Repo Name 1' } }];
    const pagination = { ...pageInfoMock, hasPreviousPage: true };
    const response = { search: { edges: list, pageInfo: pagination } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<SearchList />);

    expect(screen.getByText('prev_page')).toBeEnabled();
    expect(screen.getByText('next_page')).toBeDisabled();
  });

  it('sets next page buttons enabled if back forward available', () => {
    const list = [{ node: { id: '1', name: 'Repo Name 1' } }];
    const pagination = { ...pageInfoMock, hasNextPage: true };
    const response = { search: { edges: list, pageInfo: pagination } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<SearchList />);

    expect(screen.getByText('prev_page')).toBeDisabled();
    expect(screen.getByText('next_page')).toBeEnabled();
  });

  it('loads previous page on previous page button click', () => {
    const list = [{ node: { id: '1', name: 'Repo Name 1' } }];
    const pagination = { ...pageInfoMock, hasPreviousPage: true, startCursor: '10' };
    const response = { search: { edges: list, pageInfo: pagination } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<SearchList />);

    fireEvent.click(screen.getByText('prev_page'));

    expect(useQueryMock).toHaveBeenCalledWith(searchQuery, {
      variables: expect.objectContaining({
        before: pagination.startCursor,
      }),
    });
  });

  it('loads next page on next page button click', () => {
    const list = [{ node: { id: '1', name: 'Repo Name 1' } }];
    const pagination = { ...pageInfoMock, hasNextPage: true, endCursor: '10' };
    const response = { search: { edges: list, pageInfo: pagination } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<SearchList />);

    fireEvent.click(screen.getByText('next_page'));

    expect(useQueryMock).toHaveBeenCalledWith(searchQuery, {
      variables: expect.objectContaining({
        after: pagination.endCursor,
      }),
    });
  });

  it('renders search form', () => {
    render(<SearchList />);

    expect(screen.getByPlaceholderText('search_placeholder')).toBeInTheDocument();
    expect(screen.getByDisplayValue('search')).toBeInTheDocument();
  });

  it('reloads the query on search form submit', () => {
    const list = [{ node: { id: '1', name: 'Repo Name 1' } }];
    const pagination = { ...pageInfoMock, hasNextPage: true, endCursor: '10' };
    const response = { search: { edges: list, pageInfo: pagination } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<SearchList />);

    fireEvent.change(screen.getByPlaceholderText('search_placeholder'), {
      target: { value: 'demo' },
    });
    fireEvent.click(screen.getByDisplayValue('search'));

    expect(useQueryMock).toHaveBeenCalledWith(searchQuery, {
      variables: expect.objectContaining({
        query: 'is:public language:javascript sort:updatedAt demo',
      }),
    });
  });
});

import { useQuery } from '@apollo/client';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import SearchList from './index';
import { searchQuery } from './query';
import { ThemeProvider } from '../../ui/Theme';
import { type Repository } from './types';

jest.mock('@apollo/client', () => ({ useQuery: jest.fn(), gql: jest.fn() }));

describe('SearchList', () => {
  const pageInfoMock = { hasNextPage: false, hasPreviousPage: false };
  const repositoryMock: Repository = {
    id: '1',
    name: 'Demo',
    createdAt: '2012-05-21T16:09:09Z',
    forkCount: 2,
    owner: {
      avatarUrl: 'https://image_url',
      id: 'MDQ6VXNlcjEwNjAxMTU',
      login: 'github_user',
    },
    primaryLanguage: {
      name: 'TypeScript',
    },
    stargazerCount: 3,
    updatedAt: '2016-06-04T11:01:20Z',
    url: 'https://github.com/github_user/repo_name'
  };
  const listMock = [{ node: repositoryMock }];

  const useQueryMock = useQuery as jest.Mock;

  it('shows loading state while waiting', () => {
    useQueryMock.mockReturnValueOnce({ loading: true });
    render(<ThemeProvider><SearchList /></ThemeProvider>);

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('renders message when error occurred', () => {
    useQueryMock.mockReturnValueOnce({ loading: false, error: new Error('Unknown') });
    render(<ThemeProvider><SearchList /></ThemeProvider>);

    expect(screen.getByText('loading_error: Unknown')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    const response = { search: { edges: [], pageInfo: pageInfoMock } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<ThemeProvider><SearchList /></ThemeProvider>);

    expect(screen.getByText('empty_results')).toBeInTheDocument();
  });

  it('renders list when loading succeeded', () => {
    const response = { search: { edges: listMock, pageInfo: pageInfoMock } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<ThemeProvider><SearchList /></ThemeProvider>);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('sets pagination buttons disabled if there is nothing to load ', () => {
    const response = { search: { edges: listMock, pageInfo: pageInfoMock } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<ThemeProvider><SearchList /></ThemeProvider>);

    expect(screen.getByText('prev_page')).toBeDisabled();
    expect(screen.getByText('next_page')).toBeDisabled();
  });

  it('sets previous page buttons enabled if back pagination available', () => {
    const pagination = { ...pageInfoMock, hasPreviousPage: true };
    const response = { search: { edges: listMock, pageInfo: pagination } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<ThemeProvider><SearchList /></ThemeProvider>);

    expect(screen.getByText('prev_page')).toBeEnabled();
    expect(screen.getByText('next_page')).toBeDisabled();
  });

  it('sets next page buttons enabled if back forward available', () => {
    const pagination = { ...pageInfoMock, hasNextPage: true };
    const response = { search: { edges: listMock, pageInfo: pagination } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<ThemeProvider><SearchList /></ThemeProvider>);

    expect(screen.getByText('prev_page')).toBeDisabled();
    expect(screen.getByText('next_page')).toBeEnabled();
  });

  it('loads previous page on previous page button click', () => {
    const pagination = { ...pageInfoMock, hasPreviousPage: true, startCursor: '10' };
    const response = { search: { edges: listMock, pageInfo: pagination } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<ThemeProvider><SearchList /></ThemeProvider>);

    fireEvent.click(screen.getByText('prev_page'));

    expect(useQueryMock).toHaveBeenCalledWith(searchQuery, {
      variables: expect.objectContaining({
        before: pagination.startCursor,
      }),
    });
  });

  it('loads next page on next page button click', () => {
    const pagination = { ...pageInfoMock, hasNextPage: true, endCursor: '10' };
    const response = { search: { edges: listMock, pageInfo: pagination } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<ThemeProvider><SearchList /></ThemeProvider>);

    fireEvent.click(screen.getByText('next_page'));

    expect(useQueryMock).toHaveBeenCalledWith(searchQuery, {
      variables: expect.objectContaining({
        after: pagination.endCursor,
      }),
    });
  });

  it('renders search form', () => {
    render(<ThemeProvider><SearchList /></ThemeProvider>);

    expect(screen.getByPlaceholderText('search_placeholder')).toBeInTheDocument();
    expect(screen.getByDisplayValue('search')).toBeInTheDocument();
  });

  it('reloads the query on search form submit', () => {
    const pagination = { ...pageInfoMock, hasNextPage: true, endCursor: '10' };
    const response = { search: { edges: listMock, pageInfo: pagination } };
    useQueryMock.mockReturnValueOnce({ loading: false, data: response });
    render(<ThemeProvider><SearchList /></ThemeProvider>);

    fireEvent.change(screen.getByPlaceholderText('search_placeholder'), {
      target: { value: 'demo' },
    });
    fireEvent.click(screen.getByDisplayValue('search'));

    expect(useQueryMock).toHaveBeenCalledWith(searchQuery, {
      variables: expect.objectContaining({
        query: 'is:public sort:updatedAt demo',
      }),
    });
  });
});

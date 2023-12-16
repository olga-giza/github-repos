import { render, screen } from '@testing-library/react';
import React from 'react';

import { ThemeProvider } from '../../../ui/Theme';
import { type Repository } from '../types';
import { RepoDetails } from './RepoDetails';

describe('RepoDetails', () => {
  const repositoryMock: Repository = {
    id: '1',
    name: 'Demo',
    url: 'https://github.com/github_user/repo_name',
    createdAt: '2023-11-28T16:00:00Z',
    updatedAt: '2023-11-30T11:00:00Z',
    stargazerCount: 3,
    forkCount: 2,
    owner: {
      avatarUrl: 'https://image_url',
      id: 'MDQ6VXNlcjEwNjAxMTU',
      login: 'github_user',
    },
    primaryLanguage: {
      name: 'TypeScript',
    }
  };

  it('renders repository link', () => {
    render(<ThemeProvider><RepoDetails {...repositoryMock}/></ThemeProvider>);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent(repositoryMock.name);
  });

  it('renders owner avatar', () => {
    render(<ThemeProvider><RepoDetails {...repositoryMock}/></ThemeProvider>);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', repositoryMock.owner.login);
    expect(screen.getByRole('img')).toHaveAttribute('src', repositoryMock.owner.avatarUrl);
  });

  it('renders owner login', () => {
    render(<ThemeProvider><RepoDetails {...repositoryMock}/></ThemeProvider>);

    expect(screen.getByText(repositoryMock.owner.login)).toBeInTheDocument();
  });

  it('renders owner login', () => {
    render(<ThemeProvider><RepoDetails {...repositoryMock}/></ThemeProvider>);

    expect(screen.getByText(repositoryMock.owner.login)).toBeInTheDocument();
  });

  it('renders owner start count', () => {
    render(<ThemeProvider><RepoDetails {...repositoryMock}/></ThemeProvider>);

    expect(screen.getByText(repositoryMock.stargazerCount)).toBeInTheDocument();
  });

  it('renders owner forks count', () => {
    render(<ThemeProvider><RepoDetails {...repositoryMock}/></ThemeProvider>);

    expect(screen.getByText(repositoryMock.forkCount)).toBeInTheDocument();
  });

  it('renders update date', () => {
    render(<ThemeProvider><RepoDetails {...repositoryMock}/></ThemeProvider>);

    expect(screen.getByText('30 Nov 2023')).toBeInTheDocument();
  });

  it('renders create date', () => {
    render(<ThemeProvider><RepoDetails {...repositoryMock}/></ThemeProvider>);

    expect(screen.getByText('28 Nov 2023')).toBeInTheDocument();
  });

  it('renders primary language if available', () => {
    render(<ThemeProvider><RepoDetails {...repositoryMock}/></ThemeProvider>);

    expect(screen.getByText(repositoryMock.primaryLanguage!.name)).toBeInTheDocument();
  });
});

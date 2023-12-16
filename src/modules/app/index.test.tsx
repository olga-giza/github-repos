import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './index';

describe('App', () => {
  it('renders app', () => {
    render(<App />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

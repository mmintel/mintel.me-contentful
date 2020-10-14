import React from 'react';
import { render } from '@testing-library/react';
import Header from './header';

describe('Header', () => {
  it('renders without crashing', () => {
    const { container } = render(<Header />);
    expect(container).toBeInTheDocument();
  });
});

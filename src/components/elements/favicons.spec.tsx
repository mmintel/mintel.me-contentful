import React from 'react';
import { render } from '@testing-library/react';
import Favicons from './favicons';

describe('Favicons', () => {
  it('renders without crashing', () => {
    const { container } = render(<Favicons />);
    expect(container).toBeInTheDocument();
  });
});

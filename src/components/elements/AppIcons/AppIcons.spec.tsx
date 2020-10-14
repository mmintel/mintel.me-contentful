import React from 'react';
import { render } from '@testing-library/react';
import AppIcons from './AppIcons';

describe('AppIcons', () => {
  it('renders without crashing', () => {
    const { container } = render(<AppIcons />);
    expect(container).toBeInTheDocument();
  });
});

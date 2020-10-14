import React from 'react';
import { render } from '@testing-library/react';
import CircleImage from './CircleImage';

describe('CircleImage', () => {
  it('renders without crashing', () => {
    const { container } = render(<CircleImage src="foo" />);
    expect(container).toBeInTheDocument();
  });

  it('renders with alt without crashing', () => {
    const { container } = render(<CircleImage src="foo" alt="bar" />);
    expect(container).toBeInTheDocument();
  });
});

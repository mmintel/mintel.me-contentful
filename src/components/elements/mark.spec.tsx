import React from 'react';
import { render } from '@testing-library/react';
import Mark from './mark';

describe('Mark', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Mark>{text}</Mark>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Mark>{text}</Mark>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import Emphasis from './emphasis';

describe('Emphasis', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Emphasis>{text}</Emphasis>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Emphasis>{text}</Emphasis>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });
});

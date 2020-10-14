import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Button>{text}</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Button>{text}</Button>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });
});

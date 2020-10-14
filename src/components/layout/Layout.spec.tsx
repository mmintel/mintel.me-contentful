import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  it('renders without crashing', () => {
    const { container } = render(<Layout>Foo</Layout>);
    expect(container).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Layout>{text}</Layout>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });
});

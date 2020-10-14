import React from 'react';
import { render } from '@testing-library/react';
import Link from './Link';

describe('Link', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Link href="foo">{text}</Link>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Link href="foo">{text}</Link>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('sets the href', () => {
    const text = 'Test';
    const { getByText } = render(<Link href="foo">{text}</Link>);
    const node = getByText(text);
    expect(node.getAttribute('href')).toEqual('foo');
  });
});

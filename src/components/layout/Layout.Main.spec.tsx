import React from 'react';
import { render } from '@testing-library/react';
import LayoutMain from './Layout.Main';
import { useRouter } from 'next/router';

jest.mock('next/router');

describe('LayoutMain', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      route: '/',
    });
  });

  it('renders without crashing', () => {
    const { container } = render(<LayoutMain>Foo</LayoutMain>);
    expect(container).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<LayoutMain>{text}</LayoutMain>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders without crashing', () => {
    const { container } = render(<Avatar src="foo" />);
    expect(container).toBeInTheDocument();
  });
});

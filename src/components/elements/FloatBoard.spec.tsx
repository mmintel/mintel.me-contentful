import React from 'react';
import { render } from '@testing-library/react';
import FloatBoard from './FloatBoard';

describe('FloatBoard', () => {
  it('renders without crashing', () => {
    const { container } = render(<FloatBoard />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<FloatBoard>{text}</FloatBoard>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });
});

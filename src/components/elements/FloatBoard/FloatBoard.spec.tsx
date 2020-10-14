import React from 'react';
import { render } from '@testing-library/react';
import FloatBoard from '.';

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

  it('wraps children', () => {
    const { container } = render(
      <FloatBoard>
        <span>1</span>
        <span>2</span>
      </FloatBoard>,
    );
    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toEqual(2);
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import Title from './title';

describe('Title', () => {
  it('renders without crashing', () => {
    const { container } = render(<Title />);
    expect(container).toBeInTheDocument();
  });

  it('assigns a title to the document', () => {});
});

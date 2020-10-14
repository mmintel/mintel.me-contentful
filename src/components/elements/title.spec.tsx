import React from 'react';
import { render } from '@testing-library/react';
import Title from './title';
import { useApp } from '@/context/AppContext';

jest.mock('@/context/AppContext', () => ({
  useApp: jest.fn(),
}));

describe('Title', () => {
  beforeEach(() => {
    (useApp as jest.Mock).mockReturnValue({
      site: {
        title: 'foo',
      },
    });
  });

  it('renders without crashing', () => {
    const { container } = render(<Title />);
    expect(container).toBeInTheDocument();
  });

  // testing title doesn't make any sense here, should be done in e2e tests
});

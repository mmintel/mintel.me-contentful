import React from 'react';
import { render } from '@testing-library/react';
import MainNavigation from '.';

jest.mock('@/hooks/useActiveRoute');
jest.mock('@/hooks/useActivePathRoute');

describe('MainNavigation', () => {
  it('renders without crashing', () => {
    const { container } = render(<MainNavigation />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<MainNavigation>{text}</MainNavigation>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('wraps children', () => {
    const { container } = render(
      <MainNavigation>
        <MainNavigation.Item target="/">1</MainNavigation.Item>
        <MainNavigation.Item target="/foo">2</MainNavigation.Item>
      </MainNavigation>,
    );
    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toEqual(2);
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import HeaderBrand from './Header.Brand';

jest.mock('@/hooks/useActiveRoute');
jest.mock('@/hooks/useActivePathRoute');

describe('HeaderBrand', () => {
  it('renders without crashing', () => {
    const { container } = render(<HeaderBrand>Foo</HeaderBrand>);
    expect(container).toBeInTheDocument();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import InternalLink from './internal-link';
import { useActiveRoute } from '@/hooks/useActiveRoute';
import { useActivePathRoute } from '@/hooks/useActivePathRoute';

jest.mock('@/hooks/useActiveRoute', () => ({
  useActiveRoute: jest.fn(),
}));

jest.mock('@/hooks/useActivePathRoute', () => ({
  useActivePathRoute: jest.fn(),
}));

describe('InternalLink', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <InternalLink target="/foo">
        <a>Bar</a>
      </InternalLink>,
    );
    expect(container).toBeInTheDocument();
  });

  it('replaces existing classes with active class if target is active', () => {
    const mockText = 'Bar';
    const mockClassName = 'foo';
    const mockActiveClassName = 'isActive';
    (useActiveRoute as jest.Mock).mockReturnValue(true);
    const { getByText } = render(
      <InternalLink target="/foo" activeClassName={mockActiveClassName}>
        <a className={mockClassName}>{mockText}</a>
      </InternalLink>,
    );
    expect(getByText(mockText).classList).toContain(mockActiveClassName);
    expect(getByText(mockText).classList).toContain('cursor-default');
    expect(getByText(mockText).classList).not.toContain(mockClassName);
  });

  it('keeps original classes if target is not active', () => {
    const mockText = 'Bar';
    const mockClassName = 'foo';
    const mockActiveClassName = 'isActive';
    (useActiveRoute as jest.Mock).mockReturnValue(false);
    const { getByText } = render(
      <InternalLink target="/foo" activeClassName={mockActiveClassName}>
        <a className={mockClassName}>{mockText}</a>
      </InternalLink>,
    );
    expect(getByText(mockText).classList).not.toContain(mockActiveClassName);
    expect(getByText(mockText).classList).toContain(mockClassName);
  });

  it('replaces existing classes with activePath class if target is on active path', () => {
    const mockText = 'Bar';
    const mockClassName = 'foo';
    const mockActiveClassName = 'isActive';
    (useActivePathRoute as jest.Mock).mockReturnValue(true);
    const { getByText } = render(
      <InternalLink target="/foo" activePathClassName={mockActiveClassName}>
        <a className={mockClassName}>{mockText}</a>
      </InternalLink>,
    );
    expect(getByText(mockText).classList).toContain(mockActiveClassName);
    expect(getByText(mockText).classList).not.toContain(mockClassName);
  });

  it('keeps original classes if target is not on active path', () => {
    const mockText = 'Bar';
    const mockClassName = 'foo';
    const mockActiveClassName = 'isActive';
    (useActivePathRoute as jest.Mock).mockReturnValue(false);
    const { getByText } = render(
      <InternalLink target="/foo" activePathClassName={mockActiveClassName}>
        <a className={mockClassName}>{mockText}</a>
      </InternalLink>,
    );
    expect(getByText(mockText).classList).not.toContain(mockActiveClassName);
    expect(getByText(mockText).classList).toContain(mockClassName);
  });
});

import { renderHook } from '@testing-library/react-hooks';
import * as router from 'next/router';
import { useActivePathRoute } from './useActivePathRoute';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useActivePathRoute', () => {
  it('returns true if path is same as target path', () => {
    const path = '/foo';
    const targetPath = '/foo';
    (router.useRouter as jest.Mock).mockReturnValue({
      asPath: path,
    });
    const { result } = renderHook(() => useActivePathRoute(targetPath));
    expect(result.current).toEqual(true);
  });

  it('returns true if path contains target path', () => {
    const path = '/foo';
    const targetPath = '/foo/bar';
    (router.useRouter as jest.Mock).mockReturnValue({
      asPath: path,
    });
    const { result } = renderHook(() => useActivePathRoute(targetPath));
    expect(result.current).toEqual(true);
  });

  it('returns true if path and target path are root path', () => {
    const path = '/';
    const targetPath = '/';
    (router.useRouter as jest.Mock).mockReturnValue({
      asPath: path,
    });
    const { result } = renderHook(() => useActivePathRoute(targetPath));
    expect(result.current).toEqual(true);
  });

  it('returns false if path is root path', () => {
    const path = '/';
    const targetPath = '/foo';
    (router.useRouter as jest.Mock).mockReturnValue({
      asPath: path,
    });
    const { result } = renderHook(() => useActivePathRoute(targetPath));
    expect(result.current).toEqual(false);
  });

  it('returns false if path is not same as target path', () => {
    const path = '/foo';
    const targetPath = '/bar';
    (router.useRouter as jest.Mock).mockReturnValue({
      asPath: path,
    });
    const { result } = renderHook(() => useActivePathRoute(targetPath));
    expect(result.current).toEqual(false);
  });
});

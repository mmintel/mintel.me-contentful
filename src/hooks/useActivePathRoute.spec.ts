import { renderHook } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import { useActivePathRoute } from './useActivePathRoute';

jest.mock('next/router');

describe('useActivePathRoute', () => {
  it('returns true if path is same as target path', () => {
    const path = '/foo';
    const targetPath = '/foo';
    (useRouter as jest.Mock).mockReturnValueOnce({
      asPath: path,
    });
    const { result } = renderHook(() => useActivePathRoute(targetPath));
    expect(result.current).toEqual(true);
  });

  it('returns true if path contains target path', () => {
    const path = '/foo';
    const targetPath = '/foo/bar';
    (useRouter as jest.Mock).mockReturnValueOnce({
      asPath: path,
    });
    const { result } = renderHook(() => useActivePathRoute(targetPath));
    expect(result.current).toEqual(true);
  });

  it('returns true if path and target path are root path', () => {
    const path = '/';
    const targetPath = '/';
    (useRouter as jest.Mock).mockReturnValueOnce({
      asPath: path,
    });
    const { result } = renderHook(() => useActivePathRoute(targetPath));
    expect(result.current).toEqual(true);
  });

  it('returns false if path is root path', () => {
    const path = '/';
    const targetPath = '/foo';
    (useRouter as jest.Mock).mockReturnValueOnce({
      asPath: path,
    });
    const { result } = renderHook(() => useActivePathRoute(targetPath));
    expect(result.current).toEqual(false);
  });

  it('returns false if path is not same as target path', () => {
    const path = '/foo';
    const targetPath = '/bar';
    (useRouter as jest.Mock).mockReturnValueOnce({
      asPath: path,
    });
    const { result } = renderHook(() => useActivePathRoute(targetPath));
    expect(result.current).toEqual(false);
  });
});

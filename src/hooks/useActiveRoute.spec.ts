import { renderHook } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import { useActiveRoute } from './useActiveRoute';

jest.mock('next/router');

describe('useActiveRoute', () => {
  it('returns true if path is same as target path', () => {
    const path = '/foo';
    const targetPath = '/foo';
    (useRouter as jest.Mock).mockReturnValueOnce({
      asPath: path,
    });
    const { result } = renderHook(() => useActiveRoute(targetPath));
    expect(result.current).toEqual(true);
  });

  it('returns false if path is not same as target path', () => {
    const path = '/foo';
    const targetPath = '/bar';
    (useRouter as jest.Mock).mockReturnValueOnce({
      asPath: path,
    });
    const { result } = renderHook(() => useActiveRoute(targetPath));
    expect(result.current).toEqual(false);
  });
});

import { renderHook } from '@testing-library/react-hooks';
import * as router from 'next/router';
import { useActiveRoute } from './useActiveRoute';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useActiveRoute', () => {
  it('returns true if path is same as target path', () => {
    const path = '/foo';
    const targetPath = '/foo';
    (router.useRouter as jest.Mock).mockReturnValue({
      asPath: path,
    });
    const { result } = renderHook(() => useActiveRoute(targetPath));
    expect(result.current).toEqual(true);
  });

  it('returns false if path is not same as target path', () => {
    const path = '/foo';
    const targetPath = '/bar';
    (router.useRouter as jest.Mock).mockReturnValue({
      asPath: path,
    });
    const { result } = renderHook(() => useActiveRoute(targetPath));
    expect(result.current).toEqual(false);
  });
});

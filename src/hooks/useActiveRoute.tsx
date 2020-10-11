import { useRouter } from 'next/router';

interface activeRouteData {
  active: boolean;
  activePath: boolean;
}

export const useActiveRoute = (targetPath: string): activeRouteData => {
  const router = useRouter();
  const path = router.asPath;
  return {
    active: path === targetPath,
    activePath:
      path === '/' ? path === targetPath : targetPath.startsWith(path),
  };
};

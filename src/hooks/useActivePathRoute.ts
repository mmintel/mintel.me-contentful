import { useRouter } from 'next/router';

export const useActivePathRoute = (targetPath: string): boolean => {
  const router = useRouter();
  const path = router.asPath;
  return path === '/' ? path === targetPath : targetPath.startsWith(path);
};

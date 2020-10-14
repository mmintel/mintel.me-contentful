import { useRouter } from 'next/router';

export const useActiveRoute = (targetPath: string): boolean => {
  const router = useRouter();
  const path = router.asPath;
  return path === targetPath;
};

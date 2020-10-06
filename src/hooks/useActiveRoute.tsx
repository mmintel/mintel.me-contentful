import { useRouter } from 'next/router'

export const useActiveRoute = (pathname: string): boolean => {
  const router = useRouter();
  return router.asPath === pathname
}

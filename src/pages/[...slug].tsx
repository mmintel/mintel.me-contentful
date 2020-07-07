export { default, getStaticProps } from '../views/page';

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: ['about'] } }],
    fallback: false,
  };
}

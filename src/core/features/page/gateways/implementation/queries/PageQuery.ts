import { gql } from 'graphql-request';

export const PageQuery = gql`
  query PageQuery($slug: String!, $locale: String!) {
    pageCollection(limit: 1, locale: $locale, where: { slug: $slug }) {
      items {
        slug
        title
        description
        parent {
          slug
        }
        components {
          json
        }
        sys {
          id
          firstPublishedAt
          publishedAt
        }
      }
    }
  }
`;

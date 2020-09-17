import { gql } from 'graphql-request';

export const AllPagesQuery = gql`
  query AllPagesQuery($slug: String!, $locale: String!) {
    pageCollection(locale: $locale) {
      items {
        slug
      }
    }
  }
`;

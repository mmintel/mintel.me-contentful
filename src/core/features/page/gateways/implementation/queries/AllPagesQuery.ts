import { gql } from 'graphql-request';

export const AllPagesQuery = gql`
  query AllPagesQuery($locale: String!) {
    pageCollection(locale: $locale) {
      items {
        slug
      }
    }
  }
`;

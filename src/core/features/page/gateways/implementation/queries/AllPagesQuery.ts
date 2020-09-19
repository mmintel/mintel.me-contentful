import { gql } from 'graphql-request';

export const AllPagesQuery = gql`
  query AllPagesQuery() {
    pageCollection {
      items {
        slug
        title
        description
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

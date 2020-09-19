import { gql } from 'graphql-request';

export const NavigationQuery = gql`
  query NavigationQuery($name: String!, $locale: String!) {
    navigationCollection(locale: $locale, where: { name: $name }, limit: 1) {
      items {
        title
        name
        itemsCollection {
          items {
            internal
            url
            title
            page {
              slug
            }
            sys {
              id
              firstPublishedAt
              publishedAt
            }
          }
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

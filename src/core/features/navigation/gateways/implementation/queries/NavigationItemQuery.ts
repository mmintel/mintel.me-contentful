import { gql } from 'graphql-request';

export const NavigationItemQuery = gql`
  query NavigationItemQuery($id: String!, $locale: String!) {
    navigationItem(locale: $locale, id: $id) {
      internal
      url
      title
      page {
        sys {
          id
        }
      }
      sys {
        id
      }
    }
  }
`;

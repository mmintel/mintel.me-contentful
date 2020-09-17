import { gql } from 'graphql-request';

export const SiteQuery = gql`
  query SiteQuery($locale: String!) {
    siteCollection(locale: $locale, limit: 1) {
      items {
        title
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
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

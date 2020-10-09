import gql from 'graphql-tag';

export const SiteQuery = gql`
  query SiteQuery {
    siteCollection(limit: 1) {
      items {
        title
        description
        avatar {
          url
        }
        sys {
          id
          publishedAt
          firstPublishedAt
        }
      }
    }
  }
`

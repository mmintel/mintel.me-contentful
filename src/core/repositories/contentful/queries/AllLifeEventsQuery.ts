import gql from 'graphql-tag';

export const AllLifeEventsQuery = gql`
  query AllLifeEventsQuery {
    lifeEventCollection {
      items {
        title
        month
        year
        description
        sys {
          id
          publishedAt
          firstPublishedAt
        }
      }
    }
  }
`

import gql from 'graphql-tag';

export const AllLifeEventsQuery = gql`
  query AllLifeEventsQuery {
    lifeEventCollection(order: [year_DESC, month_DESC]) {
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

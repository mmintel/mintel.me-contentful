import gql from 'graphql-tag';

export const AllHighlightedTechnologiesQuery = gql`
  query AllHighlightedTechnologiesQuery {
    technologyCollection(where: { highlighted: true }) {
      items {
        name
        icon {
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

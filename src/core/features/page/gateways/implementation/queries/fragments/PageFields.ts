export const PageFields = `
  slug
  title
  description
  parent {
    sys {
      id
    }
  }
  componentsCollection {
    items {
      __typename
      ... on Timeline {
        title
        itemsCollection {
          items {
            title
            time
            description
            sys {
              id
            }
          }
        }
        sys {
          id
        }
      }
    }
  }
  sys {
    id
    firstPublishedAt
    publishedAt
  }
`;

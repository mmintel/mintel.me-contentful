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
            type: __typename
            ... on Conference {
              title
              time
              sys {
                id
              }
            }
            ... on Education {
              title
              time
              sys {
                id
              }
            }
            ... on Work {
              title
              time
              sys {
                id
              }
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

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
            ... on Conference {
              title
            }
            ... on Education {
              title
            }
            ... on Work {
              title
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

import { gql } from 'graphql-request';
import { PageFields } from './fragments/PageFields';

export const PageBySlugQuery = gql`
  query PageQuery($slug: String!, $locale: String!) {
    pageCollection(limit: 1, locale: $locale, where: { slug: $slug }) {
      items {
        ${PageFields}
      }
    }
  }
`;

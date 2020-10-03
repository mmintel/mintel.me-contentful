import { gql } from 'graphql-request';
import { PageFields } from './fragments/PageFields';

export const PageByIdQuery = gql`
  query PageQuery($id: String!, $locale: String!) {
    page(locale: $locale, id: $id) {
      ${PageFields}
    }
  }
`;

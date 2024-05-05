import { gql } from '@apollo/client';

export const FIND_PRODUCT_BY_TITLE = gql`
query Products($term: String) {
  products(where: {name: {contains: $term}}) {
    id
    categoryId
    name
    productMeasures {
      name
      value
      desc
    }
    productClearWeights {
      id
      value
      desc
      productId
    }
  }
}`;

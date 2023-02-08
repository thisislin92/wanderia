import gql from "graphql-tag";

export const PARTNERS_QUERY = gql`
  query Query {
    allPartnerBusiness {
      id
      name
      latitude
      longitude
      address
      price
      rating
      CategoryId
      PartnerId
      status
      imageUrl
    }
  }
`;

export const PARTNERS_BUSINESS_QUERY = gql`
  query Query($access_token: String) {
    partnerBusiness(access_token: $access_token) {
      id
      name
      latitude
      longitude
      address
      price
      rating
      CategoryId
      PartnerId
      status
      imageUrl
    }
  }
`;

export const ONE_BUSINESS = gql`
  query Query($onePartnerBusinessId: ID) {
    onePartnerBusiness(id: $onePartnerBusinessId) {
      CategoryId
      PartnerId
      address
      id
      author {
        id
        name
        email
      }
      category {
        id
        name
        symbol
      }
      createdAt
      imageUrl
      latitude
      longitude
      name
      posts {
        id
        name
        imageUrl
        link
      }
      price
      rating
      status
    }
  }
`;

export const ALL_CATEGORIES = gql`
  query Query {
    allPartnerCategories {
      id
      name
      symbol
    }
  }
`;

const { gql } = require("graphql-tag");

const USER_GET_ALL_USERS = gql`
  query {
    getAllUsers {
      _id
      name
      email
      phoneNumber
      dateOfBirth
      address
      createdAt
      updatedAt
    }
  }
`;

const USER_REGISTER_NEW_USER = gql`
  mutation Mutation($input: NewUser) {
    registerNewUser(input: $input) {
      _id
      name
      email
      phoneNumber
      dateOfBirth
      address
      createdAt
      updatedAt
    }
  }
`;

const USER_DELETE_USER_BY_ID = gql`
  mutation Mutation($_id: ID) {
    deleteUserById(_id: $_id) {
      message
      code
    }
  }
`;

module.exports = {
  USER_GET_ALL_USERS,
  USER_REGISTER_NEW_USER,
  USER_DELETE_USER_BY_ID
};

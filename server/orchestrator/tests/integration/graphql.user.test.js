const chai = require("chai");
const chaiGraphQL = require("chai-graphql");
const redis = require("../../configs/ioredis");
const expect = chai.expect;
const assert = chai.assert;
const app = require("../../app");
const {
  USER_GET_ALL_USERS,
  USER_REGISTER_NEW_USER,
  USER_DELETE_USER_BY_ID,
} = require("../../schema/queries/user");

chai.use(chaiGraphQL);

let newlyCreatedUserId = "";

describe("GraphQL: User - getAllUsers", () => {

  let beforeCache = { startTime: "", endTime: "", timeTaken: "" };
  let afterCache = { startTime: "", endTime: "", timeTaken: "" };

  before(async () => {
    await redis.flushall();
  });

  it("should return a list of users (before cache)", async () => {
    beforeCache.startTime = new Date();
    const res = await app.executeOperation({
      query: USER_GET_ALL_USERS,
    });
    beforeCache.endTime = new Date();
    beforeCache.timeTaken = beforeCache.endTime - beforeCache.startTime;

    const response = res.body.singleResult 
    assert.graphQL(response)
    expect(response.data.getAllUsers[0]).to.have.property("_id");
    expect(response.data.getAllUsers[0]).to.have.property("name");
    expect(response.data.getAllUsers[0]).to.have.property("email");
    expect(response.data.getAllUsers[0]).to.not.have.property(
      "password"
    );
    expect(response.data.getAllUsers[0]).to.have.property(
      "dateOfBirth"
    );
    expect(response.data.getAllUsers[0]).to.have.property(
      "createdAt"
    );
    expect(response.data.getAllUsers[0]).to.have.property(
      "updatedAt"
    );
  });
  it("should return a list of users (after cache)", async () => {
    afterCache.startTime = new Date();
    const res = await app.executeOperation({
      query: USER_GET_ALL_USERS,
    });
    afterCache.endTime = new Date();
    afterCache.timeTaken = afterCache.endTime - afterCache.startTime;
    expect(afterCache.timeTaken).to.be.lessThan(beforeCache.timeTaken);

    const response = res.body.singleResult 
    assert.graphQL(response)
    expect(response.data.getAllUsers[0]).to.have.property("_id");
    expect(response.data.getAllUsers[0]).to.have.property("name");
    expect(response.data.getAllUsers[0]).to.have.property("email");
    expect(response.data.getAllUsers[0]).to.not.have.property(
      "password"
    );
    expect(response.data.getAllUsers[0]).to.have.property(
      "dateOfBirth"
    );
    expect(response.data.getAllUsers[0]).to.have.property(
      "createdAt"
    );
    expect(response.data.getAllUsers[0]).to.have.property(
      "updatedAt"
    );
  });
});

describe("GraphQL: User - registerNewUser", () => {
  it("should successfully create a new user, and return it as a response", async () => {
    const res = await app.executeOperation({
      query: USER_REGISTER_NEW_USER,
      variables: {
        input: {
          name: "John Doe",
          email: "johndoe@gmail.com",
          password: "123456",
        },
      },
    });

    const response = res.body.singleResult 
    newlyCreatedUserId = response.data.registerNewUser._id; // save the newly created user to be deleted
    assert.graphQL(response)
    expect(response.data.registerNewUser).to.have.property("_id");
    expect(response.data.registerNewUser).to.have.property("name");
    expect(response.data.registerNewUser).to.have.property("email");
    expect(response.data.registerNewUser).to.not.have.property(
      "password"
    );
    expect(response.data.registerNewUser).to.have.property(
      "dateOfBirth"
    );
    expect(response.data.registerNewUser).to.have.property(
      "createdAt"
    );
    expect(response.data.registerNewUser).to.have.property(
      "updatedAt"
    );
  });
});

describe("GraphQL: User - deleteUserById", () => {
  it("should successfully delete a user, and return a success message", async () => {
    const res = await app.executeOperation({
      query: USER_DELETE_USER_BY_ID,
      variables: {
        _id: newlyCreatedUserId,
      },
    });

    const response = res.body.singleResult 
    assert.graphQL(response)
    expect(response.data.deleteUserById).to.have.property("code");
    expect(response.data.deleteUserById).to.have.property("message", " Successfully Deleted");
  });
});

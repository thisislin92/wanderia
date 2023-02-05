const chai = require("chai");
const { print } = require("graphql");
const chaiGraphQL = require("chai-graphql");
const redis = require("../../configs/ioredis");
const expect = chai.expect;
const assert = chai.assert;
const app = require("../../app");
const url = "http://localhost:4000";
const request = require("supertest");
const {
  USER_GET_ALL_USERS,
  USER_REGISTER_NEW_USER,
  USER_DELETE_USER_BY_ID,
  USER_UPDATE_USER,
  USER_LOGIN_USER,
} = require("../../schema/queries/user");

chai.use(chaiGraphQL);

let newlyCreatedUserId = "";
let newlyCreatedUserToken = "";

describe("GraphQL: User - registerNewUser", () => {
  it("should failed to create a new user, because email is empty", async () => {
    const queryData = {
      query: USER_REGISTER_NEW_USER,
      variables: {
        input: {
          name: "John Doe",
          password: "123456",
        },
      },
    };
    const res = await request(url).post("/").send(queryData);

    const response = JSON.parse(res.text);
    assert.graphQLError(response);
    console.log(response.errors[0].message)
    // expect(response.errors[0].message).to.contain("code: 400");
    // TODO: mungkin error message nya perlu dibikin consistent dari backend saja. berarti graphql schema nya perlu optional semua supaya requestnya loss ke backend (error nya dari backend semua)
    expect(response.errors[0].message).to.contain("email"); 
    expect(response.errors[0].message).to.contain("was not provided");
  });

  it("should successfully create a new user, and return it as a response", async () => {
    const queryData = {
      query: USER_REGISTER_NEW_USER,
      variables: {
        input: {
          name: "John Doe",
          email: "johndoe@gmail.com",
          password: "123456",
        },
      },
    };
    const res = await request(url).post("/").send(queryData);

    const response = JSON.parse(res.text);
    assert.graphQL(response);
    expect(response.data.registerNewUser).to.have.property("_id");
    expect(response.data.registerNewUser).to.have.property("name");
    expect(response.data.registerNewUser).to.have.property("email");
    expect(response.data.registerNewUser).to.not.have.property("password");
    expect(response.data.registerNewUser).to.have.property("dateOfBirth");
    expect(response.data.registerNewUser).to.have.property("createdAt");
    expect(response.data.registerNewUser).to.have.property("updatedAt");

    newlyCreatedUserId = response.data.registerNewUser._id; // save the newly created user to be deleted
  });

  it("should failed to create a new user, because email already exists", async () => {
    const queryData = {
      query: USER_REGISTER_NEW_USER,
      variables: {
        input: {
          name: "John Doe",
          email: "johndoe@gmail.com",
          password: "123456",
        },
      },
    };
    const res = await request(url).post("/").send(queryData);

    const response = JSON.parse(res.text);
    assert.graphQLError(response);
    expect(response.errors[0].message).to.contain("code: 409");
    expect(response.errors[0].message).to.contain("duplicate key");
    expect(response.errors[0].message).to.contain("email");
  });
});

describe("Graphql: User - loginUser", () => {
  it("should failed to login with response 'invalid credentials', because login with previously updated user", async () => {
    const queryData = {
      query: USER_LOGIN_USER,
      variables: {
        input: {
          email: "janedoe@gmail.com",
          password: "123456",
        },
      },
    };
    const res = await request(url).post("/").send(queryData);

    const response = JSON.parse(res.text);
    assert.graphQLError(response);
    expect(response.errors[0].message).to.contain("code: 401");
    expect(response.errors[0].message).to.contain("Invalid email/password");
  });

  it("should successfully login a user, and return a token", async () => {
    const queryData = {
      query: USER_LOGIN_USER,
      variables: {
        input: {
          email: "johndoe@gmail.com",
          password: "123456",
        },
      },
    };
    const res = await request(url).post("/").send(queryData);

    const response = JSON.parse(res.text);
    assert.graphQL(response);
    expect(response.data.loginUser).to.have.property("access_token");

    newlyCreatedUserToken = response.data.loginUser.access_token;
  });
});

describe("GraphQL: User - updateUser", () => {
  it("should successfully update an existing user and return it as a response", async () => {
    const queryData = {
      query: USER_UPDATE_USER,
      variables: {
        input: {
          _id: newlyCreatedUserId,
          name: "Jane Doe",
          email: "janedoe@gmail.com",
        },
      },
    };
    const res = await request(url)
      .post("/")
      .send(queryData)
      .set("access_token", newlyCreatedUserToken);

    const updateResponse = JSON.parse(res.text);
    assert.graphQL(updateResponse);
    expect(updateResponse.data.updateUser).to.have.property("_id");
    expect(updateResponse.data.updateUser._id).to.equal(newlyCreatedUserId);
    expect(updateResponse.data.updateUser).to.have.property("name");
    expect(updateResponse.data.updateUser.name).to.equal("Jane Doe");
    expect(updateResponse.data.updateUser).to.have.property("email");
    expect(updateResponse.data.updateUser.email).to.equal("janedoe@gmail.com");
    expect(updateResponse.data.updateUser).to.not.have.property("password");
  });

  it("should throw an error when the user id is invalid", async () => {
    const invalidId = "63da8d0c624ef9527e594d1a";
    const queryData = {
      query: USER_UPDATE_USER,
      variables: {
        input: {
          _id: invalidId,
          name: "Jane Doe",
          email: "janedoe@gmail.com",
        },
      },
    };
    const res = await request(url)
      .post("/")
      .send(queryData)
      .set("access_token", newlyCreatedUserToken);

    const errorResponse = JSON.parse(res.text);
    assert.graphQLError(errorResponse);
    expect(errorResponse.errors).to.not.be.empty;
    expect(errorResponse.errors[0].message).to.contain("code: 404");
    expect(errorResponse.errors[0].message).to.contain("Not found");
  });
});

describe("GraphQL: User - getAllUsers", () => {
  let beforeCache = { startTime: "", endTime: "", timeTaken: "" };
  let afterCache = { startTime: "", endTime: "", timeTaken: "" };

  before(async () => {
    await redis.flushall();
  });

  it("should return a list of users (before cache)", async () => {
    beforeCache.startTime = new Date();
    const queryData = {
      query: USER_GET_ALL_USERS,
    };
    const res = await request(url)
      .post("/")
      .set("access_token", newlyCreatedUserToken)
      .send(queryData);
    beforeCache.endTime = new Date();
    beforeCache.timeTaken = beforeCache.endTime - beforeCache.startTime;

    const response = JSON.parse(res.text);
    assert.graphQL(response);
    expect(response.data.getAllUsers[0]).to.have.property("_id");
    expect(response.data.getAllUsers[0]).to.have.property("name");
    expect(response.data.getAllUsers[0]).to.have.property("email");
    expect(response.data.getAllUsers[0]).to.not.have.property("password");
    expect(response.data.getAllUsers[0]).to.have.property("dateOfBirth");
    expect(response.data.getAllUsers[0]).to.have.property("createdAt");
    expect(response.data.getAllUsers[0]).to.have.property("updatedAt");
  });
  it("should return a list of users (after cache)", async () => {
    afterCache.startTime = new Date();
    // TODO: this is working, because it is getting the result through cache. need to change this into http call with supertest, for consistency
    const res = await app.executeOperation({
      query: USER_GET_ALL_USERS,
    });
    afterCache.endTime = new Date();
    afterCache.timeTaken = afterCache.endTime - afterCache.startTime;
    expect(afterCache.timeTaken).to.be.lessThan(beforeCache.timeTaken);

    const response = res.body.singleResult;
    assert.graphQL(response);
    expect(response.data.getAllUsers[0]).to.have.property("_id");
    expect(response.data.getAllUsers[0]).to.have.property("name");
    expect(response.data.getAllUsers[0]).to.have.property("email");
    expect(response.data.getAllUsers[0]).to.not.have.property("password");
    expect(response.data.getAllUsers[0]).to.have.property("dateOfBirth");
    expect(response.data.getAllUsers[0]).to.have.property("createdAt");
    expect(response.data.getAllUsers[0]).to.have.property("updatedAt");
  });
});

describe("GraphQL: User - deleteUserById", () => {
  it("should successfully delete a user, and return a success message", async () => {
    const queryData = {
      query: USER_DELETE_USER_BY_ID,
      variables: {
        _id: newlyCreatedUserId,
      },
    };
    const res = await request(url)
      .post("/")
      .set("access_token", newlyCreatedUserToken)
      .send(queryData);

    const response = JSON.parse(res.text);
    assert.graphQL(response);
    expect(response.data.deleteUserById).to.have.property("code");
    expect(response.data.deleteUserById).to.have.property(
      "message",
      " Successfully Deleted"
    );
  });
});

const chai = require("chai");
const { ObjectId } = require("mongodb");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../app");
const { runConnection, getDatabase } = require("../../config/mongodb");

let accessTokenDuringTesting;
let preferencesIdDuringTesting;

describe("Test GET /preferences endpoint", () => {
  it("should return an array of preferences with a 200 status code", async () => {
    const res = await request(app).get("/preferences/");
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body[0]).to.have.property("_id");
    expect(res.body[0]).to.have.property("name");
    expect(res.body[0]).to.have.property("createdAt");
    expect(res.body[0]).to.have.property("updatedAt");
  });
});

describe("Test POST /users/login endpoint", () => {
  it("should return a valid access token with a 200 status code", async () => {
    const loginCredentials = {
      email: "herlinalim93@gmail.com",
      password: "123456",
    };
    const res = await request(app).post("/users/login").send(loginCredentials);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("access_token");
    accessTokenDuringTesting = res.body.access_token;
  });
});

describe("Test POST /preferences endpoint", () => {
  it("should create a new preference and return it with a 201 status code", async () => {
    const newPreference = { name: "new preference" };
    const res = await request(app)
      .post("/preferences/")
      .send(newPreference)
      .set("access_token", accessTokenDuringTesting);
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("name", "new preference");
    expect(res.body).to.have.property("createdAt");
    expect(res.body).to.have.property("updatedAt");
    preferencesIdDuringTesting = res.body._id;
  });
});

describe("Test GET /preferences/:id endpoint", () => {
  it("should return a preference with a 200 status code", async () => {
    const res = await request(app).get(
      `/preferences/${preferencesIdDuringTesting}`
    );

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("name");
    expect(res.body).to.have.property("createdAt");
    expect(res.body).to.have.property("updatedAt");
  });
});

describe("Test DELETE /preferences/:id endpoint", () => {
  it("should delete a preference with a 200 status code", async () => {
    const res = await request(app)
      .delete(`/preferences/${preferencesIdDuringTesting}`)
      .set("access_token", accessTokenDuringTesting);

      console.log(res.body);
    expect(res.statusCode).to.equal(200);
  });
});

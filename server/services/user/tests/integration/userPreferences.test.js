const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../app");

let accessToken = "";
let newlyCreatedUserPreferencesId = "";

describe("Test POST /userPreferences endpoint", () => {
  it("should create a user preference", async () => {
    const accessTokenResponse = await request(app).post("/users/login").send({
      email: "herlinalim93@gmail.com",
      password: "123456",
    });
    accessToken = accessTokenResponse.body.access_token;

    const thePreferenceId = "63dfc05501c2fb5814358f1e";
    const res = await request(app)
      .post("/userPreferences")
      .send({
        PreferenceId: thePreferenceId,
      })
      .set("access_token", accessToken);

    expect(res.statusCode).to.equal(201);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("_id");
    expect(res.body).to.have.property("UserId");
    expect(res.body).to.have.property("PreferenceId", thePreferenceId);
    expect(res.body).to.have.property("createdAt");
    expect(res.body).to.have.property("updatedAt");

    newlyCreatedUserPreferencesId = res.body._id;
  });

  it("should return 400 when trying to create user preferences without PreferenceId", async () => {
    const res = await request(app)
      .post("/userPreferences")
      .set("access_token", accessToken);

    expect(res.statusCode).to.equal(400);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("PreferenceId is required");
  })

  it("should return 404 when trying to create user preferences with invalid PreferenceId", async () => {
    const res = await request(app)
      .post("/userPreferences")
      .send({
        PreferenceId: "63dfc05501c2fb5814358f1f",
      })
      .set("access_token", accessToken);
    
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("Not found");
  })
});

// get user preferences by user id successfuly
describe("Test GET /userPreferences endpoint", () => {
  it("should return all user preferences by user id", async () => {
    const res = await request(app)
      .get(`/userPreferences`)
      .set("access_token", accessToken);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body[0]).to.have.property("_id");
    expect(res.body[0]).to.have.property("UserId");
    expect(res.body[0]).to.not.have.property("PreferenceId");
    expect(res.body[0]).to.have.property("Preference");
    expect(res.body[0]).to.have.property("createdAt");
    expect(res.body[0]).to.have.property("updatedAt");
  });
});

describe("Test DELETE /userPreferences endpoint", () => {
  it("should return 500 when trying to delete invalid user preferences id", async () => {
    const res = await request(app)
      .delete(`/userPreferences/63dfc05501c2fb5814358f`)
      .set("access_token", accessToken);
      
    expect(res.statusCode).to.equal(500);
    expect(res.body).to.have.property("code",500)
    expect(res.body).to.have.property("message", "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer")
  })

  it("should return 404 when trying to delete non-existent user preferences", async () => {
    const res = await request(app)
      .delete(`/userPreferences/63dfc05501c2fb5814358fff`)
      .set("access_token", accessToken);
      
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property("message", "Not found")
  })

  it("should delete a user preference", async () => {
    const res = await request(app)
      .delete(`/userPreferences/${newlyCreatedUserPreferencesId}`)
      .set("access_token", accessToken);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property("message", " Successfully Deleted")
  });
});

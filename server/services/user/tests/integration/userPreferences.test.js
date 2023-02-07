const chai = require("chai");
const { ObjectId } = require("mongodb");
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
});

describe("Test DELETE /userPreferences endpoint", () => {
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

const request = require("supertest");
const app = require("../../app");
const { getClient, runConnection } = require("../../config/mongodb");
const UserPreferences = require("../../models/userPreferences");
const userPreferences = require("../../models/userPreferences");

let accessToken = "";
let newlyCreatedUserPreferencesId = "";

beforeAll(async () => {
  await runConnection();

  const loginResponse = await request(app).post("/users/login").send({
    email: "herlinalim93@gmail.com",
    password: "123456",
  })

  accessToken = loginResponse.body.access_token
});

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  const client = getClient();
  client.close();
});

describe("Test POST /userPreferences endpoint", () => {
  it("should create a user preference", async () => {
    const thePreferenceId = "63dfc05501c2fb5814358f1e";
    const res = await request(app)
      .post("/userPreferences")
      .send({
        PreferenceId: thePreferenceId,
      })
      .set("access_token", accessToken);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(expect.any(Object));;
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("UserId");
    expect(res.body).toHaveProperty("PreferenceId", thePreferenceId);
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");

    newlyCreatedUserPreferencesId = res.body._id;
  });

  it("should return 400 when trying to create user preferences without PreferenceId", async () => {
    const res = await request(app)
      .post("/userPreferences")
      .set("access_token", accessToken);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(expect.any(Object));;
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("PreferenceId is required");
  })

  it("should return 404 when trying to create user preferences with invalid PreferenceId", async () => {
    const res = await request(app)
      .post("/userPreferences")
      .send({
        PreferenceId: "63dfc05501c2fb5814358f1f",
      })
      .set("access_token", accessToken);
    
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(expect.any(Object));;
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Not found");
  })
});

// get user preferences by user id successfuly
describe("Test GET /userPreferences endpoint", () => {
  it("should return all user preferences by user id", async () => {
    const res = await request(app)
      .get(`/userPreferences`)
      .set("access_token", accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));;
    expect(res.body[0]).toHaveProperty("_id");
    expect(res.body[0]).toHaveProperty("UserId");
    expect(res.body[0]).not.toHaveProperty("PreferenceId");
    expect(res.body[0]).toHaveProperty("Preference");
    expect(res.body[0]).toHaveProperty("createdAt");
    expect(res.body[0]).toHaveProperty("updatedAt");
  });

  it("should return 500 status code and an error message (mocked)", async () => {
    jest
      .spyOn(UserPreferences, "dataPreferencesFromDb")
      .mockImplementationOnce(() => {
        throw {
          name: "InternalServerError"
        }
      });

    const res = await request(app)
      .get(`/userPreferences`)
      .set("access_token", accessToken);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty("message", "Internal Server Error");
  });

});

describe("Test DELETE /userPreferences endpoint", () => {
  it("should return 500 status code and an error message (mocked)", async () => {
    jest
      .spyOn(UserPreferences, "dataPreferencesFromDb")
      .mockImplementationOnce(() => {
        throw {
          name: "InternalServerError"
        }
      });

    const res = await request(app)
      .delete(`/userPreferences/${newlyCreatedUserPreferencesId}`)
      .set("access_token", accessToken);
    
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty("message", "Internal Server Error");
  });

  it("should return 500 when trying to delete invalid user preferences id", async () => {
    const res = await request(app)
      .delete(`/userPreferences/123123`)
      .set("access_token", accessToken);
      
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("code",500)
    expect(res.body).toHaveProperty("message", "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer")
  })

  it("should return 404 when trying to delete non-existent user preferences", async () => {
    const res = await request(app)
      .delete(`/userPreferences/63dfc05501c2fb5814358fff`)
      .set("access_token", accessToken);
      
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Not found")
  })

  it("should delete a user preference", async () => {
    const res = await request(app)
      .delete(`/userPreferences/${newlyCreatedUserPreferencesId}`)
      .set("access_token", accessToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", " Successfully Deleted")
  });
});

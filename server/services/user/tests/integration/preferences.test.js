const { ObjectId } = require("mongodb");
const request = require("supertest");
const app = require("../../app");
const {
  runConnection,
  getDatabase,
  getClient,
} = require("../../config/mongodb");
const Preferences = require("../../models/preferences");

let accessToken
let newlyCreatedPreferencesId

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

describe("Test GET /preferences endpoint", () => {
  it("should return an error with a 500 status code if there's an error with the findAllPreferences", async () => {
    jest.spyOn(Preferences, "findAllPreferences").mockImplementation(() => {
      throw {
        name: "InternalServerError",
      }
    })
    const res = await request(app).get("/preferences/");
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty("code", 500);
    // expect(res.body).toHaveProperty("message", "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
  })

  it("should return an array of preferences with a 200 status code", async () => {
    const res = await request(app).get("/preferences/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
    expect(res.body[0]).toHaveProperty("_id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[0]).toHaveProperty("createdAt");
    expect(res.body[0]).toHaveProperty("updatedAt");
  });
});

describe("Test POST /preferences endpoint", () => {
  it("should return an error with a 500 status code if there's an error with the createPreferences", async () => {
    jest.spyOn(Preferences, "createPreferences").mockImplementation(() => {
      throw {
        name: "InternalServerError",
      }
    })
    const res = await request(app).post("/preferences/").send({
      name: "Makanan Pedas",
    }).set("access_token", accessToken);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty("code", 500);
  })

  it("should return a preferences object with a 201 status code", async () => {
    const res = await request(app).post("/preferences/").send({
      name: "Makanan Pedas",
    }).set("access_token", accessToken);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name", "Makanan Pedas");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");

    newlyCreatedPreferencesId = res.body._id;
  })
})

describe("Test GET /preferences/:id endpoint", () => {
  it("should return a preferences object with a 200 status code", async () => {
    const res = await request(app)
      .get(`/preferences/${newlyCreatedPreferencesId}`)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));;
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name", "Makanan Pedas");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
  });

//   it("should return a 404 status code and an error message if the user is not found", async () => {
//     const res = await request(app)
//       .get(`/preferences/63dfc05501c2fb5814358f1e`)
//     expect(res.statusCode).toEqual(404);
//     expect(res.body).toEqual(expect.any(Object));;
//     expect(res.body).toHaveProperty("code", 404);
//     expect(res.body).toHaveProperty("message", "Not found");
//   })

//   it("should return a 500 status code and an error message if the user id is invalid", async () => {
//     const res = await request(app)
//       .get(`/preferences/invalid-preferences-id`)
//     expect(res.statusCode).toEqual(500);
//     expect(res.body).toEqual(expect.any(Object));;
//     expect(res.body).toHaveProperty("code", 500);
//     expect(res.body).toHaveProperty("message", "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
//   })
});

describe("Test GET /preferences/:id endpoint", () => {
  it("should return a preferences object with a 200 status code", async () => {
    const res = await request(app).get(`/preferences/`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
    expect(res.body[0]).toEqual(expect.any(Object));
    expect(res.body[0]).toHaveProperty("_id");
    // expect(res.body[0]).toHaveProperty("name", "John Doe");
    expect(res.body[0]).toHaveProperty("createdAt");
    expect(res.body[0]).toHaveProperty("updatedAt");
  });

  it("should return a 404 status code and an error message if the user is not found", async () => {
    const res = await request(app).get(`/preferences/63dfc05501c2fb5814358f1a`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty("code", 404);
    expect(res.body).toHaveProperty("message", "Not found");
  });

  it("should return a 500 status code and an error message if the user id is invalid", async () => {
    const res = await request(app).get(`/preferences/invalid-preferences-id`);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty("code", 500);
    expect(res.body).toHaveProperty(
      "message",
      "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
    );
  });
});

describe("Test DELETE /preferences/:id endpoint", () => {
  it("should return a 200 status code and a success message if the preferences is successfully deleted", async () => {
    const res = await request(app)
      .delete(`/preferences/${newlyCreatedPreferencesId}`)
      .set("access_token", accessToken);
      console.log(res.body, "ini res body");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty("message", " Successfully Deleted");
  })
})

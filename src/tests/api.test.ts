const request = require("supertest");
const app = require("../index.ts");

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const response = await request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach((user) => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("role");
    });
  });

  it("should return status 500 if an error occurs", async () => {
    jest.mock("../datasource", () => ({
      myDataSource2Pg: {
        getRepository: jest.fn(() => {
          throw new Error("Test error");
        }),
      },
    }));

    const response = await request(app)
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(500);

    expect(response.body).toEqual({ error: "Failed to fetch comments" });
  });
});

import supertest from "supertest";
import { app } from "../src/index";

const request = supertest(app);

describe("GET /tasks", () => {
  it("should return a list of tasks", async () => {
    const response = await request.get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toBeInstanceOf(Array);
  });
});

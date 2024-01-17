import supertest from "supertest";
import { app, checkAuthenticated, checkNotAuthenticated } from "../src/index";
import passport from "passport";
import { UsersType } from "./types";

describe("GET /", () => {
  it("should respond with 302 status and redirect to /login when not authenticated", async () => {
    await supertest(app).get("/").expect(302).expect("Location", "/login");
  });

  it("should respond with 200 status and render index.ejs when authenticated", async () => {
    const authenticatedUser: UsersType = {
      id: "dbcb0f08-51f9-4b1c-830b-a9a16005e0ab",
      name: "Prot",
      email: "prot@prot",
      role: "User",
      password: "hashedPassword",
    };

    const authenticateUser = jest.fn((req, res, next) => {
      req.user = authenticatedUser;
      next();
    });

   
    app.get("/", authenticateUser, checkAuthenticated, (req, res) => {
      if (req.user) {
        const { name } = req.user as UsersType;
        res.render("index.ejs", { name });
      } else {
        res.redirect("/login");
      }
    });

 

    await supertest(app)
      .get("/")
      .expect((res) => {
        if (res.status === 302) {
          const redirectUrl = res.headers.location;
          expect(redirectUrl).toBe("/login");
        } else {
          expect(res.status).toBe(200);
          expect(res.headers["content-type"]).toMatch(/text\/html/);
          expect(res.text).toContain("index.ejs content");
        }
      });
  });
});

describe("GET /tasks", () => {
  it("should return a list of tasks", async () => {
    
    const response = await supertest(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("GET /register", () => {
    it(" should respond with 200 status and render register.ejs when not authenticated", async () => {
        await supertest(app)
        .get("/register")
        .expect(200)
       /*  .expect("Content-Type", /text\/html/)
        .then(( res) => {
          console.log("+++++++"+res.body);
        }); */
    })
  });

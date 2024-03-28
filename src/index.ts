import express from "express";
import path from "path";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import initializePassport from "./config/passport-config";
import methodOverride from "method-override";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routes from "./routes/routes";
import "reflect-metadata";
import { getUserByEmail, getUserById } from "./controllers/auth.controllers";
import tasksRouter from "./routes/tasks.routes";
import usersRouter from "./routes/users.routes";
import commentsRouter from "./routes/comments.routes";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

export const app = express();

const port = 3000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

initializePassport(passport, getUserByEmail, getUserById);
app.use(express.json());

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(tasksRouter);
app.use(usersRouter);
app.use(commentsRouter);
app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`App listening port ${port}`);
});

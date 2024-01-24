import express, { NextFunction } from "express";
import path from "path";
import { v4 } from "uuid";

import { User, PartialUsersType } from "./models/user.model";
import { Comment } from "./models/comment.model";
import {
  TASKS,
  USERS,
  COMMENTS,
  updateUserList,
  updateTasksList,
  updateCommentsList,
} from "./db";
import bcrypt from "bcrypt";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import initializePassport from "./config/passport-config";
import methodOverride from "method-override";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routes from "./routes/routes";

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
  apis: ["./src/routes/routes.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

initializePassport(
  passport,
  (email: string) => USERS.find((user: User) => user.email === email),
  (id: string) => USERS.find((user: User) => user.id === id),
);
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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* export const createUser = (user: PartialUsersType): User => {
  const userId: string = v4();
  const newUser:User = {
    id: userId,
    ...user,
  };
  USERS.push(newUser);
  return newUser;
}; */

export const createComment = (comment: Comment) => {
  COMMENTS.push(comment);
};

app.get("/", checkAuthenticated, (req, res) => {
  if (req.user) {
    const { name } = req.user as User;
    res.render("index.ejs", { name });
  } else {
    res.redirect("/login");
  }
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  console.log("Flash messages:", req.flash("error"));
  res.render("login", { messages: req.flash("error") });
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
);

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    USERS.push({
      id: v4(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

//CRUD для users
/* app.get("/users", (req, res) => {
  res.json(USERS);
}); */
/* app.get("/users/:id", (req, res) => {
  const foundUser = USERS.find((c) => c.id === req.params.id);
  if (!foundUser) {
    res.sendStatus(404);
    return;
  }
  res.json(foundUser);
}); */

/* app.post("/users", (req, res) => {
  const newUser = createUser({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    role: "User",
    password: req.body.password,
  });


  res.status(201).json(USERS);
}); */

/* app.delete("/users/:id", (req, res) => {
  const updatedUsers = USERS.filter((c) => c.id !== req.params.id);
  updateUserList(updatedUsers);
  res.status(200).json({ message: `User '${req.params.id}' deleted` });
}); */

/* app.put("/users/:id", (req, res) => {
  const foundUser = USERS.find((c) => c.id === req.params.id);
  if (!foundUser) {
    res.sendStatus(404);
    return;
  }
  foundUser.name = req.body.name;
  foundUser.surname = req.body.surname;
  foundUser.email = req.body.email;
  foundUser.role = req.body.role;
  res.json(foundUser);
}); */
//CRUD для tasks
/* app.get("/tasks", (req, res) => {
  res.json(TASKS);
}); */
/* app.get("/tasks/:id", (req, res) => {
  const foundTask = TASKS.find((c) => c.id === req.params.id);
  if (!foundTask) {
    res.sendStatus(404);
    return;
  }
  res.json(foundTask);
}); */

/* app.delete("/tasks/:id", (req, res) => {
  const user = req.user as User;
  //console.log(user)
  if (user && user.role === "Interviewer") {
    const updatedTasks = TASKS.filter((c) => c.id !== req.params.id);
    updateTasksList(updatedTasks);
    res.status(200).json({ message: `Task '${req.params.id}' deleted` });
  } else {
    res.status(403).json({ message: "Permission denied" });
  }
}); */

/* app.put("/tasks/:id", (req, res) => {
  const foundTask = TASKS.find((c) => c.id === req.params.id);
  if (!foundTask) {
    res.sendStatus(404);
    return;
  }
  foundTask.description = req.body.description;
  foundTask.solution = req.body.solution;
  foundTask.complexity = req.body.complexity;
  foundTask.language = req.body.language;
  foundTask.tag = req.body.tag;
  res.json(foundTask);
}); */

//CRUDE для комментариев
/* app.get("/comments", (req, res) => {
  const idUser = req.query.idUser as string;
  const idTask = req.query.idTask as string;

  let filteredComments = COMMENTS;
  if (idUser) {
    filteredComments = filteredComments.filter(
      (comment) => comment.idUser === idUser,
    );
  }

  if (idTask) {
    filteredComments = filteredComments.filter(
      (comment) => comment.idTask === idTask,
    );
  }

  res.json(filteredComments);
}); */

/* app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const taskComments = COMMENTS.filter((comment) => comment.id === id);
  res.json(taskComments);
}); */

/* app.post("/comments", (req, res) => {
  const { idUser, idTask, commentText } = req.body;
  if (!idUser || !idTask || !commentText) {
    return res.status(400).json({
      error: "Необходимо передать idUser, idTask и comment в теле запроса",
    });
  }

  const newComment: Comment = {
    id: v4(),
    idUser,
    idTask,
    commentText,
  };
  createComment(newComment);
  res.json({ message: "Комментарий успешно создан", comment: newComment });
}); */
app.put("/comments/:id", (req, res) => {
  const foundComment = COMMENTS.find((c) => c.id === req.params.id);
  if (!foundComment) {
    res.sendStatus(404);
    return;
  }
  foundComment.commentText = req.body.commentText;

  res.json({ message: "Комментарий успешно изменен", comment: foundComment });
});
app.delete("/comments/:id", (req, res) => {
  const updatedComments = COMMENTS.filter((c) => c.id !== req.params.id);
  updateCommentsList(updatedComments);
  res.status(200).json({ message: `Comment '${req.params.id}' deleted` });
});

app.listen(port, () => {
  console.log(`App listening port ${port}`);
});
export function checkAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
export function checkNotAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
}

export { User, Comment };

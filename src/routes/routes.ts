import express from "express";
import passport from "passport";
 import {

  createUser

} from "../controllers/users.controllers"; 

/* import {
  createComment,
  deleteComment,
  getCommentById,
  getComments,
  updateComments,
} from "../controllers/comments.controller"; */
import {
  checkAuthenticated,
  checkNotAuthenticated,
} from "../controllers/auth.controllers";
import { User } from "../models/user.model";
import { NextFunction } from "express";

export const myDataSource2Pg = require("../config/db-config").default;

/* export async function initializeDataSource() {
  await myDataSource2Pg.initialize();
}
initializeDataSource(); */
export const router = express.Router();



router.get("/", checkAuthenticated, (req, res) => {
  if (req.user) {
    const { name } = req.user as User;
    res.render("index.ejs", { name });
  } else {
    res.redirect("/login");
  }
});

router.get("/login", checkNotAuthenticated, (req, res) => {
  console.log("Flash messages:", req.flash("error"));
  res.render("login", { messages: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
);
router.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

router.post("/register", createUser);

router.delete("/logout", (req, res, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

export default router;

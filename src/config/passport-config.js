import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
//import {getUserByEmail, getUserById} from '../controllers/auth.controllers'
export default async function initialize(
  passport,
  getUserByEmail,
  getUserById,
) {
  const authenticateUser = async (
    email,
    password,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    done,
  ) => {
    try {
      const user = await getUserByEmail(email);
      console.log("email", email);
      if (!user) {
        return done(null, false, { message: "No user with that email" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return done(null, false, { message: "Password incorrect" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      console.log("id ", id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

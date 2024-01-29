import bcrypt from "bcrypt";

import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.model";
import passport from "passport";

export default async function initialize(
  passport: passport.PassportStatic,
  getUserByEmail: (email: string) => User|undefined,
  getUserById:(id: string) => User|undefined,
) {
  const authenticateUser = async (
    email: string,
    password: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    done: any, 
  ) => {
    const user = getUserByEmail(email);
    console.log('user'+JSON.stringify(user));
    console.log("passport"+JSON.stringify(passport))
    if (user == null) {
      console.log("No user with that email");
      return done(null, false, { message: "No user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password as string)) {
        return done(null, user);
      } else {
        console.log("Password incorrect");
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  console.log(authenticateUser);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.serializeUser((user:any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done) => {
    const user = getUserById(id);
    done(null, user);
  });
}

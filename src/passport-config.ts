/* import bcrypt from "bcrypt";
import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;

//import { Strategy as LocalStrategy } from 'passport-local';


 export async function initialize(passport){
const authenticateUser = async (email, password, done)=>{
const user = getUserByEmail(email)
if (user==null){
    return done(null,false,{message:"No user with that email"})
}
try {
    if (await bcrypt.compare(password, user.password))
    {

        return done(null, user)
    }else{

        return done(null, false,{message:"Password incorrect"})
    }
} catch (error) {
    return done(error)
}
}

passport.use(new LocalStrategy({usernameField:'email'},
authenticateUser))

passport.serializeUser((user, done)=>{ 
    done(null, user.id); 
 })
passport.deserializeUser((id, done)=>{ 
    const user = getUserById(id);
    done(null, user);
 })

}
 */

import bcrypt from "bcrypt";
import passport from "passport";
//const passport = require('passport');
import { Strategy as LocalStrategy } from "passport-local";
const LocalStrategy = require("passport-local").Strategy;

export default async function initialize(
  passport: any,
  getUserByEmail: any,
  getUserById: any,
) {
  const authenticateUser = async (
    email: string,
    password: string,
    done: any,
  ) => {
    const user = getUserByEmail(email);
    console.log(user);
    if (user == null) {
      console.log("No user with that email");
      return done(null, false, { message: "No user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        console.log("Password incorrect");
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  };
  //console.log('/////'+ passport._strategies);
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  console.log(authenticateUser);
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    const user = getUserById(id);
    done(null, user);
  });
}

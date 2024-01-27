var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
export default function initialize(passport, getUserByEmail, getUserById) {
    return __awaiter(this, void 0, void 0, function* () {
        const authenticateUser = (email, password, done) => __awaiter(this, void 0, void 0, function* () {
            const user = getUserByEmail(email);
            console.log(user);
            if (user == null) {
                console.log("No user with that email");
                return done(null, false, { message: "No user with that email" });
            }
            try {
                if (yield bcrypt.compare(password, user.password)) {
                    return done(null, user);
                }
                else {
                    console.log("Password incorrect");
                    return done(null, false, { message: "Password incorrect" });
                }
            }
            catch (error) {
                return done(error);
            }
        });
        passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
        console.log(authenticateUser);
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser((id, done) => {
            const user = getUserById(id);
            done(null, user);
        });
    });
}

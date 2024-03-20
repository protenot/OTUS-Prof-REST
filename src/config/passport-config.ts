
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from './models/user.model'; // Подключите модель пользователя из вашего приложения
//import {getUserByEmail, getUserById} from '../controllers/auth.controllers'

export default async function initialize(
  passport: passport.PassportStatic,
  getUserByEmail: (email: string) => Promise<User | undefined>,
  getUserById: (id: string) => Promise<User | undefined>,
) {
  const authenticateUser = async (
    email: string,
    password: string,
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   done: any,
  ) => {
    try {
      const user = await getUserByEmail(email);
      console.log('email', email)
      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }
      
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return done(null, false, { message: 'Password incorrect' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await getUserById(id);
      console.log('id ',id)
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

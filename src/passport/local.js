import UserManager from "../daos/mongodb/UserDao.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const userManager = new UserManager();

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const signup = async (req, email, password, done) => {
  try {
    const user = await userManager.getByEmail(email);
    if (user) return done(null, false);
    const newUser = await userManager.registro(req.body);
    return done(null, newUser);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, email, password, done) => {
  const user = { email, password };
  const userLogin = await userManager.login(user);
  if (!userLogin) return done(null, false);
  return done(null, userLogin);
};

const signupStrategy = new LocalStrategy(strategyOptions, signup);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("register", signupStrategy);
passport.use("login", loginStrategy);

//registra al user en req.session.passport
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userManager.getById(id);
  return done(null, user);
});

export const frontResponseLogin = {
  failureRedirect: "/views/error-login",
  successRedirect: "/views/productos",
  passReqToCallback: true,
};

export const frontResponseRegister = {
  failureRedirect: "/views/error-registro",
  successRedirect: "/views/login",
  passReqToCallback: true,
};

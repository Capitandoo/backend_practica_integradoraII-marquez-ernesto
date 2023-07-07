import {
  registroService,
  loginService,
  loginResponseService,
} from "../services/UserService.js";
import UserManager from "../daos/mongodb/UserDao.js";
import { generateToken } from "../jwt/auth.js";
import {
  getCartService,
  createCartService,
  addProductToCartService,
  deleteProductToCartService,
  deleteAllProductToCartService,
  updateProductToCartService,
  updateProductQuantityService,
} from "../services/CartsService.js";

const userManager = new UserManager();


export const logoutController = async (req, res, next) => {
  try {
    res.clearCookie("token").json({msg: "Logout OK"});
  } catch (error) {
    console.log(error);
  }
};



export const githubResponse = async (req, res, next) => {
  try {
    const { first_name, last_name, email, role, isGithub } = req.user;
    res.json({
      msg: "Register/Login Github OK",
      session: req.session,
      userData: {
        first_name,
        last_name,
        email,
        role,
        isGithub,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const exist = await userManager.getByEmail(email);
    if (exist) return res.status(400).json({ msg: "User already exists" }).redirect("/views/error-registro");
    const user = { first_name, last_name, email, age, password };
    const newUser = await userManager.registro(user);
    const token = generateToken(newUser);
    console.log(token)
    res.json({
      msg: "Register OK",
      token,
    }); 
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userManager.login ({ email, password });
    if (!user) {
      res.json({ msg: "invalid credentials" }).redirect("/views/register");
    }
    const access_token = generateToken(user);
    console.log('access_token', access_token)
    //res.header('Authorization', access_token).json({msg: 'Login OK', access_token})
    res.cookie("token", access_token, { httpOnly: true }).json({ msg: "Login OK", access_token,});
  } catch (error) {
    next(error);
  }
};

export const currentController = async (req, res, next) => {
  try {
    const { user } = req.user;
    res.send ({ user });
  } catch (error) {
    next(error);
  }
};


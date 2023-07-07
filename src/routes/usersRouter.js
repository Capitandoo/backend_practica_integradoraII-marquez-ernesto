import { Router } from "express";
import passport from "passport";
import {
  loginController,
  logoutController,
  register,
  githubResponse,
} from "../controllers/UserController.js";
import { frontResponseLogin, frontResponseRegister } from "../passport/local.js";
import { passportCall, passportCallRedirect } from "../middlewares/sessions.js";
//import { checkAuth } from "../jwt/auth.js";

const router = Router();

router.post("/register", passportCall ("register"), register);
router.post("/login", passportCallRedirect ("jwtCookies"), loginController);
router.get("/register-github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/profile-github", passport.authenticate("github", { scope: ["user:email"] }), githubResponse);
router.get("/perfil", passportCall ("jwtCookies"), (req, res) => {
  res.send(req.user);
});
router.post("/logout", logoutController);


export default router;

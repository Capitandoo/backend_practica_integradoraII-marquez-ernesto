import { Router } from "express";
import { getAllProductsController, renderLoginController, renderLoginErrorController, renderLogout, renderPerfil, renderRegisterController, renderRegisterErrorController } from "../controllers/ViewsController.js";
import { passportCallRedirect } from "../middlewares/sessions.js"

const router = Router ();

router.get("/", passportCallRedirect("jwtCookies"),renderLoginController);
router.get("/login", passportCallRedirect("jwtCookies"), renderLoginController);
router.get("/register", renderRegisterController);
router.get("/perfil", renderPerfil);
router.get("/productos", getAllProductsController);
router.get("/logout", renderLogout);
router.get('/error-registro',renderRegisterErrorController);
router.get('/error-login',renderLoginErrorController);


export default router;

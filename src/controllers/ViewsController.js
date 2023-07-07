import CartDao from "../daos/mongodb/CartDao.js";
import ProductDao from "../daos/mongodb/ProductDao.js";
import UserManager from "../daos/mongodb/UserDao.js";

const userDao = new UserManager();
const cartDao = new CartDao();
const prodDao = new ProductDao();

export const getAllProductsController = async (req, res, next) => {
  try {
    const { page, limit, key, value, sortField, sortOrder } = req.query;
    const allProducts = await prodDao.getProducts(
      page,
      limit,
      key,
      value,
      sortField,
      sortOrder
    );
    const nextLink = allProducts.hasNextPage
      ? `http://localhost:8080/views/products?page=${allProducts.nextPage}`
      : null;
    const prevLink = allProducts.hasPrevPage
      ? `http://localhost:8080/views/products?page=${allProducts.prevPage}`
      : null;
    const userData = req.user;
    const productsFile = {
      results: allProducts.docs,
      userData: userData,
      info: {
        count: allProducts.totalDocs,
        pages: allProducts.totalPages,
        actualPage: allProducts.page,
        hasPrevPage: allProducts.hasPrevPage,
        hasNextPage: allProducts.hasNextPage,
        nextPageLink: nextLink,
        prevPageLink: prevLink,
      },
    };
    res.render("productos", { productsFile });
  } catch (error) {
    next(error);
  }
};
export const getCartController = async (req, res, next) => {
  try {
    if (!req.user) {
      res.redirect("/views/login");
    } else {
      const userData = req.user;
      const cartId = userData.cartId;
      const cart = await cartDao.getCartById(cartId);
      res.render("carts", { cart });
    }
  } catch (error) {
    next(error);
  }
};
export const renderRegisterController = async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    next(error);
  }
};
export const renderLoginController = async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    next(error);
  }
};
export const renderRegisterErrorController = async (req, res, next) => {
  try {
    res.render("errorRegistro");
  } catch (error) {
    next(error);
  }
};
export const renderLoginErrorController = async (req, res, next) => {
  try {
    res.render("errorLogin");
  } catch (error) {
    next(error);
  }
};
export const renderPerfil = async (req, res, next) => {
  try {
    const userData = req.user;
    if (!userData) {
      res.redirect("/views/login");
    } else {
      res.render("perfil", { userData });
    }
  } catch (error) {
    next(error);
  }
};

export const renderLogout = async (req, res) => {
  try {
    res.clearCookie("token").json({ msg: "Logout OK" });
  } catch (error) {
    console.log(error);
  }
};

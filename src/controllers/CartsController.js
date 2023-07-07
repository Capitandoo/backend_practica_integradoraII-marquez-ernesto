import {
  getCartService,
  createCartService,
  addProductToCartService,
  deleteProductToCartService,
  deleteAllProductToCartService,
  updateProductToCartService,
  updateProductQuantityService
} from "../services/CartsService.js";

export const getCartController = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await getCartService (cid);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const createCartController = async (req, res, next) => {
  try {
    const newCart = await createCartService ();
    res.json(newCart);
  } catch (error) {
    next(error);
  }
};

export const addProductToCartController = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    await getCartService (cid);
    const prodAdded = await addProductToCartService (cid, pid);
    res.json(prodAdded);
  } catch (error) {
    next(error);
  }
};

export const deleteProductToCartController = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const prodDelete = await deleteProductToCartService (cid, pid);
    res.json(prodDelete);
  } catch (error) {
    next(error);
  }
};

export const deleteAllProductToCartController = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const cartDelete = await deleteAllProductToCartService (cid);
    res.json (cartDelete);
  } catch (error) {
    next(error);
  }
;}

export const updateProductToCartController = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const data = {...req.body};
    const update = await updateProductToCartService (cid, data);
    res.json (update);
  } catch (error) {
    console.log (error);
    next(error);
    next(error);
  }
}

export const updateProductQuantityController = async (req, res, next) =>{
  try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const newQty = await updateProductQuantityService (cid, pid, quantity);
      res.json(newQty);
  } catch (error) {
      next(error);
  }
}
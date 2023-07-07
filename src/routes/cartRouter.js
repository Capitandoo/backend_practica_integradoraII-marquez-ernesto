import { Router } from "express";
import {
    getCartController,
    createCartController,
    addProductToCartController,
    deleteProductToCartController,
    deleteAllProductToCartController,
    updateProductToCartController,
    updateProductQuantityController
} from "../controllers/CartsController.js";

const router = Router();

router.get('/:cid', getCartController);
router.post('/', createCartController);
router.post('/:cid/products/:pid', addProductToCartController);
router.delete('/:cid/products/:pid', deleteProductToCartController);
router.delete('/:cid', deleteAllProductToCartController);
router.put('/:cid', updateProductToCartController);
router.put('/:cid/products/:pid', updateProductQuantityController);


export default router;

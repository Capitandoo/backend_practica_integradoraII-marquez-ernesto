import CartDao from "../daos/mongodb/CartDao.js";
import ProductDao from "../daos/mongodb/ProductDao.js";
import CartManager from "../daos/filesystem/CartDao.js";
import ProductManager from "../daos/filesystem/ProductDao.js";
import { pathCarritos } from "../path.js";
import { pathProducts } from "../path.js";


const cartDao = new CartDao ();
const prodDao = new ProductDao ();
//const cartDao = new CartManager (pathCarritos);
//const prodDao = new ProductManager (pathProducts);

export const getCartService = async (cid) =>{
    try {
        const cart = await cartDao.getCartById (cid);
        if (!cart) throw new Error("Carrito no encontrado");
        else return cart;
    } catch (error) {
        console.log (error);
    };
};
export const createCartService = async (product) =>{
    try {
        const newCart = await cartDao.addCart(product);
        if (!newCart) throw new Error ("No se pudo agregar al carrito");
        else return newCart;
    } catch (error) {
        console.log(error);
    };
};
export const addProductToCartService = async (cid, pid) =>{
    try {
        const consultacarrito = await cartDao.getCartById (cid);
        if (!consultacarrito) throw new Error ("El carrito no existe");
        const consultaproducto = await prodDao.getProductById (pid);
        if(!consultaproducto) throw new Error ("Producto no encontrado");
        const prodAdded = await cartDao.addProductToCart(cid, pid);
        return prodAdded;        
    } catch (error) {
        console.log (error);
    };
};

export const deleteProductToCartService = async (cid, pid) =>{
    try {
        const prodDelete = await cartDao.deleteProductToCart(cid, pid)
        if(!prodDelete) throw new Error ("El carrito no fue encontrado");
        return ({message: `El producto con id: ${pid} fue borrado`});
    } catch (error) {
        console.log (error);
    };
};

export const deleteAllProductToCartService = async (cid) => {
    try {
        const cartDelete = await cartDao.deleteAllProductsToCart (cid);
        if(!cartDelete) throw new Error ("El carrito no fue encontrado");
        return ({message: `El carrito con id: ${cid} fue borrado`});
    } catch (error) {
        console.log (error);
    }
}

export const updateProductToCartService = async (cid, product) => {
    try {
        let cart = await cartDao.getCartById(cid);
        if (!cart) {
            throw new Error("Cart not found!");
        } else {
            const newCart = await cartDao.updateProductToCart(cid, product);
            return newCart;
        }
    } catch (error) {
        console.log (error);
    }
}

export const updateProductQuantityService = async (cid, pid, quantity) => {
    try {
        let cart = await cartDao.getCartById(cid);
        if (!cart) {
            throw new Error("Cart not found!");
        } else {
            const newCart = await cartDao.updateProductQuantity(cid, pid, quantity);
            return newCart;
        }
    } catch (error) {
        console.log (error);
    }
}

export const addProToCartService = async (cid, pid) => {
    try {
      const exists = await cartDao.getCartsById (cid)
      const newProd = await cartDao.addProToCart (cid, pid);
      if (!exists) throw new Error("Pet not found!");
      else return newProd;
    } catch (error) {
      console.log(error);
    }
  };
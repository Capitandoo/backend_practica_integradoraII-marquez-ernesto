import ProductDao from "../daos/mongodb/ProductDao.js";
import ProductManager from "../daos/filesystem/ProductDao.js";
import { pathProducts } from '../path.js';

const prodDao = new ProductDao();
//const prodDao = new ProductManager (pathProducts);



export const getAllService = async (page, limit, key, value, sortField, sortOrder) => {
  try {
    const docs = await prodDao.getProducts (page, limit, key, value, sortField, sortOrder);
    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const getByIdService = async (id) => {
  try {
    const doc = await prodDao.getProductById(id);
    if (!doc) throw new Error("Producto no encontrado");
    else return doc;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (product) => {
  try {
    const newProd = await prodDao.addProduct(product);
    if (!newProd) throw new Error("Error de validacion!");
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (id, update) => {
  try {
    const doc = await prodDao.getProductById(id);
    if (!doc) {
      throw new Error("Producto no encontrado");
    } else {
      const prodUpd = await prodDao.updateProduct(id, update);
      return prodUpd;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (id) => {
  try {
    const prodDel = await prodDao.deleteProduct(id);
    return prodDel;
  } catch (error) {
    console.log(error);
  }
};

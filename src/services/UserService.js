import UserManager from "../daos/mongodb/UserDao.js";

const userManager = new UserManager ();

export const registroService = async (newUser) => {
  try {
    const data = await userManager.registro (newUser);
    return data;
  } catch (error) {
    console.log (error);
  }
};

export const loginService = async (userData) => {
  try {
    const usuario = await userManager.login (userData);
    if (!usuario) throw new Error("El usuario no existe!");
    else return usuario;
  } catch (error) {
    console.log (error);
  }
};

export const loginResponseService = async (userData) => {
  try {
    
    return usuario;
  } catch (error) {
    console.log (error);
  }
}
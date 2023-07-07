import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

export const __dirname = dirname (fileURLToPath (import.meta.url));
export const pathProducts = __dirname + "/daos/filesystem/productos.json";
export const pathCarritos = __dirname + "/daos/filesystem/carrito.json";
export const pathMessages = __dirname + "/daos/filesystem/messages.json";

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);


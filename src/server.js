import express from "express";
import { __dirname, pathMessages } from "./path.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import { errorHandler } from "./middlewares/errorHandler.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./passport/jwt.js";
import "./passport/local.js";
import "./passport/github.js";
import "./db/conexion.js";
import chatRouter from "./routes/chatRouter.js";
import productsRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import usersRouter from "./routes/usersRouter.js";
import ProductManager from "./daos/filesystem/ProductDao.js";
import ProductDao from "./daos/mongodb/ProductDao.js";
import MessagesDao from "./daos/mongodb/MessagesDao.js";
import MessageManager from "./daos/filesystem/MessagesDao.js";
import { initializePassport } from "./passport/jwt.js";
import 'dotenv/config';


const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Server iniciado en el puerto ${port}`);
});
const socketServer = new Server(httpServer);
//const productDao = new ProductManager ();
const productDao = new ProductDao ();
const messageDao = new MessagesDao ();
//const messageDao = new MessageManager ();

app.use(
  session({
    store: new MongoStore ({
      mongoUrl: "mongodb+srv://admin:12345@cluster0.cgr5nq9.mongodb.net/ecommerce",
      ttl: 10,
      crypto: {secret: "1234"},
      autoremove: "internal",
    }),
    secret: "12345",
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 1500},
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(errorHandler);
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/chat", chatRouter);
app.use("/", viewsRouter);
app.use("/users", usersRouter);

socketServer.on("connection", (socket) => {
  console.log("Usuario conectado", socket.id);
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  socket.on("newProduct", async (obj) => {
    await productDao.addProduct(obj);
    socketServer.emit("arrayProductsAdd", await productDao.getProducts());
  });

  socket.on("erase", async (id) => {
    await productDao.deleteProduct(id);
    socketServer.emit("arrayProductsErase", await productDao.getProducts());
  });

  socket.on("mostrar", async () => {
    const listado = await productDao.getProducts();
    socketServer.emit("mostrar", listado);
  });

  socket.on("newUser", (user) => {
    console.log(`${user} is logged in`);
  });

  socket.on("chat:message", async (msg) => {
    await messageDao.createMsg(msg);
    socketServer.emit("messages", await messageDao.getAll());
  });

  socket.on("newUser", (user) => {
    socket.broadcast.emit("newUser", user);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});

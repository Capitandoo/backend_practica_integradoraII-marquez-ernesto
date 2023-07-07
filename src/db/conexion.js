import mongoose from "mongoose";
import dotenv from 'dotenv';
import "dotenv/config"
import { MongoDBUrl } from '../config.js'

const connectionString = "mongodb+srv://admin:12345@cluster0.cgr5nq9.mongodb.net/ecommerce?retryWrites=true&w=majority";

  try {
    await mongoose.connect(connectionString);
    console.log("Conectado a la base de datos de MongoDB");
  } catch (error) {
    console.log(error);
  }


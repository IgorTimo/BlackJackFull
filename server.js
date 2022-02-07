import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { routes } from "./config/routes.js"
import { PORT } from './port.js';

export const TOKEN_SECRET = "extrimly secret words"

await mongoose.connect("mongodb://localhost/black_jack");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/", routes);

const port = PORT;

app.listen(port, ()=> console.log(`Listening port ${port}`));
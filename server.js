import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { routes } from "./config/routes.js"

await mongoose.connect("mongodb://localhost/black_jack");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/", routes);


const port = 3003;
app.listen(port, ()=> console.log(`Listening port ${port}`));
import express from 'express';
import cors from 'cors';
import { routes } from "./config/routes.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/", routes);


const port = process.env.PORT || 3003;
app.listen(port, ()=> console.log(`Listening port ${port}`));
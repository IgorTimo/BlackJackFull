import express from 'express';
import { GameController } from '../controllers/GameController.js';

export const routes = express.Router();

routes.get("/test", (req, res) => {
    res.send({messagge: "Hello, i'm working well!"})
})

routes.post("/test", (req, res) => {
    console.log("Request: ", req.body);
    res.send({message: "Ok, your are loged in!"})
})

routes.get("/start_game", (req, res) => {
    GameController.startGame(req, res);
})
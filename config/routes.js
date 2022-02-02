import express from 'express';
import { GameController } from '../controllers/GameController.js';
import { UserController } from '../controllers/UserController.js';

export const routes = express.Router();

routes.post("/sign_up", (req, res) => {
    UserController.addUser(req, res);
})

routes.post("/log_in", (req, res) => {
  UserController.logIn(req, res);
})

routes.post("/start_game", (req, res) => {
    GameController.startGame(req, res);
})

routes.post("/take_card", (req, res) => {
    GameController.takeCard(req, res)
})

routes.post("/dealer_game", (req, res) => {
    GameController.dealerGame(req, res)
})
import express from 'express';
import { AuthorizationController } from '../controllers/AuthorizationController.js';
import { GameController } from '../controllers/GameController.js';
import { UserController } from '../controllers/UserController.js';
import { checkAuthToken } from './auth.js';

export const routes = express.Router();

routes.post("/sign_up", (req, res) => {
    UserController.addUser(req, res);
})

routes.post("/auth", (req, res) => {
  AuthorizationController.auth(req, res);
})

routes.get("/get_user_by_id", checkAuthToken, (req, res) => {
    UserController.getUserById(req, res);
})

routes.post("/start_game", checkAuthToken, (req, res) => {
    GameController.startGame(req, res);
})

routes.get("/take_card", checkAuthToken, (req, res) => {
    GameController.takeCard(req, res)
})

routes.get("/dealer_game", checkAuthToken, (req, res) => {
    GameController.dealerGame(req, res)
})
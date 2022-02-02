import { createNewGameAndMessage } from "./utils.js";
import { User } from "../model/User.js";

export class GameController {
  static async startGame(req, res) {
    const { _id, bet } = req.body;

    let user; //проверяем есть ли юзер 
    try {
      user = await User.findOne({ _id: _id });
    } catch (err) {
      return res
        .status(400)
        .json({ e: err, message: "So, and who wanna play?!" });
    }


    if (user.currentGame) { //проверям чтобы у юзера не было незаконченных игр
      return res.send({ message: "You must finish your current game!" });
    }

    const response = await createNewGameAndMessage(_id, bet);

    if(response.game.status === "results" && response.game.dealerScore !== 21) { //случай моментально победы игрока
      await User.updateOne(
        { _id: _id },
        { ballance: user.ballance + bet }
      ); //начисляем ставку за быструю победу с блэк джеком
    }
    if(response.game.status === "user_move"){
      await User.updateOne(
        { _id: _id },
        { ballance: user.ballance - bet, currentGame: response.game._id }
      ); //снимаем ставку и ставим текущую игру
    }


    res.send( response );
  }

  static takeCard(req, res) {}
}

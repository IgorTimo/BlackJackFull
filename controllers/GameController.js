import {
  createNewGameAndMessage,
  playerTakeCard,
  dealerPlay,
} from "./gameUtils.js";
import { User } from "../model/User.js";
import { Game } from "../model/Game.js";
import { UserController } from "./UserController.js";
import { getUserById } from "./userUtils.js";

export class GameController {
  static async startGame(req, res) {
    const { _id, bet } = req.body;

    const user = await getUserById(_id); //подтягиваем юзера, которого добавили в миделвер checkAuthToken

    if (user.currentGame) {
      //проверям чтобы у юзера не было незаконченных игр
      return res.send({ message: "You must finish your current game!" });
    }

    const response = await createNewGameAndMessage(_id, bet);

    if (
      response.game.status === "results" &&
      response.game.dealerScore !== 21
    ) {
      //случай моментальной победы игрока
      await User.updateOne({ _id: _id }, { ballance: (user.ballance + parseInt(bet)) }); //начисляем ставку за быструю победу с блэк джеком
    }
    if (response.game.status === "user_move") {
      await User.updateOne(
        { _id: _id },
        { ballance: user.ballance - bet, currentGame: response.game._id }
      ); //снимаем ставку и ставим текущую игру
    }

    res.send(response);
  }

  static async takeCard(req, res) {
    const user = await getUserById(req.body._id);
    const game = await await Game.findOne({_id: user.currentGame})
    const response = await playerTakeCard(game);

    if (response.game.status === "results") {
      await User.updateOne({ _id: user._id }, { currentGame: null });
    }

    res.send(response);
  }

  static async dealerGame(req, res) {
    const user = await getUserById(req.body._id);
    const game = await Game.findOne({_id: user.currentGame})
    const response = await dealerPlay(game);

    if (
      response.message ===
      "Congratulations! It was an honest victory. Obviously it's time for another game!"
    ) {
      await User.updateOne(
        { _id: user._id },
        { ballance: user.ballance + game.bet * 2, currentGame: null }
      );
    } else if (
      response.message ===
      "It's draw. Nobody wins, nobody lose. May be you should try again?"
    ) {
      await User.updateOne(
        { _id: user._id },
        { ballance: user.ballance + game.bet, currentGame: null }
      );
    } else {
      await User.updateOne({ _id: user._id }, { currentGame: null });
    }

    res.send(response);
  }

  // static async getGameById(req, res) {
  //   try {
  //     return await Game.findOne({ _id: req.body.gameId });
  //   } catch (err) {
  //     return res
  //       .status(400)
  //       .json({ e: err, message: "User hasn't active games." });
  //   }
  // }
}

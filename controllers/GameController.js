import { createNewGame } from "./utils.js";
import { User } from "../model/User.js";

export class GameController {
  static async startGame(req, res) {
    const { _id, bet } = req.body;

    let user; //проверяем есть ли юзер и закончил ли он игру
    try {
      user = await User.findOne({ _id: _id });
    } catch (err) {
      console.log("error", err);
      return res
        .status(400)
        .json({ e: err, message: "So, and who wanna play?!" });
    }
    console.log("User", user);

    if (user.currentGame) {
      return res.send({ message: "You must finish your current game!" });
    }

    const game = await createNewGame(_id, bet);

    console.log("Game: ", game);

    console.log("ID: ", game._id);

    await User.updateOne(
      { _id: _id },
      { ballance: user.ballance - bet, currentGame: game._id }
    ); //снимаем ставку и ставим текущую игру

    res.send({ game });
  }

  static takeCard(req, res) {}
}

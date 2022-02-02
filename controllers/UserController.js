import { User } from "../model/User.js";

export class UserController {
  static addUser(req, res) {
    //FIXME: сделать нормальную логику добавления
    const user = new User({
      email: "test@test.com",
      password: "test",
      ballance: 1000,
      currentGame: null,
    });
    user.save().then(() => res.send({ message: "User added successfully." }));
  }

  static async getUserById(req, res, _id) {
    try {
      return await User.findOne({ _id: _id });
    } catch (err) {
      return res
        .status(400)
        .json({ e: err, message: "So, and who wanna play?!" });
    }
  }

  static logIn(req, res) {
      User.findOne({_id: req.body._id}).then(user => res.send(user))
  }
}

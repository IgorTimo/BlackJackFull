import { User } from "../model/User.js";
import { getUserByEmail } from "./userUtils.js";

export class UserController {
  static async addUser(req, res) {
    const {email, password} = req.body;
  
    if(await getUserByEmail(email)){//проверяем не занят ли email
      return res.status(400).send({message: "User with email '" + email +"' already exists"})
    }

    const user = new User({
      email: email,
      password: password,
      ballance: 0,
      currentGame: null,
    });
    user.save().then(() => res.send({ message: "User with email '" + email +"' added successfully." }));
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

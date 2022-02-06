import jwt from "jsonwebtoken";
import { User } from "../model/User.js";
import { TOKEN_SECRET } from "../server.js";

export class AuthorizationController {
  static auth(req, res) {
    const sessionTime = 60;
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user.password === req.body.password) {
          const token = jwt.sign({ email: user.email, sessionTime }, TOKEN_SECRET, { expiresIn: sessionTime });
          res.send({ 
            token: token, 
            userId: user._id, 
            sessionTime: sessionTime, 
            message: `Hello and good luck, ${user.email} Press start button to begin` 
          });
        }else{
            res.status(400).send({message: "Invalid password, try again."})
        }
      })
      .catch((err) => {
        res.status(400).json({ e: err });
      });
  }
}

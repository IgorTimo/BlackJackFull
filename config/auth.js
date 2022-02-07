import { TOKEN_SECRET } from "../server.js";
import jwt from "jsonwebtoken";

export function checkAuthToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.sendStatus(403);
    }

    console.log("User id >>>> ", data.userId); // добовляем к запросу айди юзера
    req.body._id = data.userId;

    next();
  });
}

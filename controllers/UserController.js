import {User} from "../model/User.js"

export class UserController{

    static addUser(req, res){

        //FIXME: сделать нормальную логику добавления
        const user = new User({
            email: "test@test.com",
            password: "test",
            ballance: 1000,
            currentGame: null
        });
        user.save().then(() => res.send({ message: "User added successfully."}))
    }
}
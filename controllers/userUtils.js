import { User } from "../model/User.js";

export async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserById(_id) {
  try {
    return await User.findOne({ _id: _id });
  } catch (err) {
    console.error(err);
  }
}

import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    password: String,
    ballance: Number,
    currentGame: Schema.Types.ObjectId
})

export const User = mongoose.model("User", userSchema);
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const gameSchema = new Schema({
    cards: Array,
    cardsHash: String,
    restOfCards: Array,
    userCards: Array,
    dealerCards: Array,
    userScore: Number,
    dealerScore: Number,
    status: String,
    bet: Number,
    user: {type: Schema.Types.ObjectId, ref: "User"}
})

export const Game = mongoose.model("Game", gameSchema);
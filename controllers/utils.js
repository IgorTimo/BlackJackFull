import { Game } from "../model/Game.js";

const cards = [
  "0C",
  "0D",
  "0H",
  "0S",
  "2C",
  "2D",
  "2H",
  "2S",
  "3C",
  "3D",
  "3H",
  "3S",
  "4C",
  "4D",
  "4H",
  "4S",
  "5C",
  "5D",
  "5H",
  "5S",
  "6C",
  "6D",
  "6H",
  "6S",
  "7C",
  "7D",
  "7H",
  "7S",
  "8C",
  "8D",
  "8H",
  "8S",
  "9C",
  "9D",
  "9H",
  "9S",
  "AC",
  "AD",
  "AH",
  "AS",
  "JC",
  "JD",
  "JH",
  "JS",
  "KC",
  "KD",
  "KH",
  "KS",
  "QC",
  "QD",
  "QH",
  "QS",
];

function getNewCards() {
  return cards.sort(() => Math.random() - 0.5);
}

function calculateScore(cards) {
  return cards.reduce((acc, card) => {
    if (
      card.charAt(0) === "K" ||
      card.charAt(0) === "Q" ||
      card.charAt(0) === "J" ||
      card.charAt(0) === "0"
    ) {
      return (acc += 10);
    }
    if (card.charAt(0) === "A" && acc < 11) {
      return (acc += 11);
    }
    if (card.charAt(0) === "A" && acc >= 11) {
      return (acc += 1);
    }

    return (acc += Number.parseInt(card.charAt(0)));
  }, 0);
}

export async function createNewGame(_id, bet) {
  const cards = getNewCards();
  const cardsHash = "hash";
  const restOfCards = [...cards];
  const userCards = [];
  const dealerCards = [];
  userCards.push(restOfCards.shift());
  userCards.push(restOfCards.shift());
  dealerCards.push(restOfCards.shift());
  const dealerScore = calculateScore(dealerCards);
  const userScore = calculateScore(userCards);
  const status = "user_move";

  const game = new Game({
    cards: cards,
    cardsHash: cardsHash,
    restOfCards: restOfCards,
    userCards: userCards,
    dealerCards: dealerCards,
    userScore: userScore,
    dealerScore: dealerScore,
    status: status,
    bet: bet,
    user: _id,
  });

  await game.save();

  return game;
}

import { Game } from "../model/Game.js";
import sha256 from "sha256";

export async function createNewGameAndMessage(_id, bet) {
  const cards = getNewCards();
  const cardsHash = sha256(cards.join(""));
  const restOfCards = [...cards];
  const userCards = [];
  const dealerCards = [];
  userCards.push(restOfCards.shift());
  userCards.push(restOfCards.shift());
  dealerCards.push(restOfCards.shift());

  const userScore = calculateScore(userCards);

  let status;
  let message;

  if (userScore === 21) {
    //проверяем наличие блэк джека
    status = "results";
    if (calculateScore(dealerCards) < 10) {
      message = "You have a Black Jack. No chance for Diller!";
    } else {
      dealerCards.push(restOfCards.shift());
      if (calculateScore(dealerCards) === 21) {
        message =
          "You have a Black Jack. But the diller have a Black Jack too! Draw.";
      } else {
        message =
          "You have a Black Jack. Diller have a chance but he isn't so lucky... You win!";
      }
    }
  } else {
    status = "user_move";
    message = "Take card or press enough.";
  }

  const dealerScore = calculateScore(dealerCards);

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

  if (status === "results") {
    //если игра оконена то пора и начальную колоду показать
    return { game, message };
  }

  return { game: getSafeGameInfo(game), message };
}

export async function playerTakeCard(game) {
  const { _id, restOfCards, userCards } = game;
  userCards.push(restOfCards.shift());
  const userScore = calculateScore(userCards);
  let status = "user_move"; //такой он и был изначально
  let message;
  if (userScore > 21) {
    status = "results";
    message = "You exceed 21 points. You loose!";
  } else {
    message = "May be another one?";
  }
  const updatedGame = {
    ...game._doc, //FIXME: это просто с ума сойти если док убрать
    userScore: userScore,
    status: status,
  };

  await Game.updateOne({ _id: _id }, updatedGame);

  if (status === "results") {
    //если игра оконена то пора и начальную колоду показать
    return { game: updatedGame, message };
  }

  return { game: getSafeGameInfo(updatedGame), message };
}

export async function dealerPlay(game) {
  const {_id, dealerCards, restOfCards, userScore } = game;
  while (calculateScore(dealerCards) < 17) {
    dealerCards.push(restOfCards.shift());
  }
  const dealerScore = calculateScore(dealerCards);
  const status = "results";
  let message;
  if (dealerScore === userScore) {
    message =
      "It's draw. Nobody wins, nobody lose. May be you should try again?";
  } else if (dealerScore > userScore && dealerScore < 22) {
    message =
      "I'm sorry but you lose... I'm sure next time you will be more lucky!";
  } else {
    message =
      "Congratulations! It was an honest victory. Obviously it's time for another game!";
  }

  const updatedGame = {
    ...game._doc, //FIXME: это просто с ума сойти если док убрать
    dealerScore: dealerScore,
    status: status,
  };

  await Game.updateOne({ _id: _id }, updatedGame);

  return { game: updatedGame, message };
}

function getNewCards() {
  return cards.sort(() => Math.random() - 0.5);
}

function getBlackJackQuickWinCards() {
  return ["AS", "JC", "8D", "8H"];
}

function getBlackJackCards() {
  return ["AS", "JC", "0D", "8H"];
}

function getBlackJackDrawCards() {
  return ["AS", "JC", "0D", "AH"];
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

function getSafeGameInfo(game) {
  const {
    _id,
    cardsHash,
    dealerCards,
    dealerScore,
    userCards,
    userScore,
    status,
  } = game;
  const safeGame = {
    _id,
    cardsHash,
    dealerCards,
    dealerScore,
    userCards,
    userScore,
    status,
  };
  return safeGame;
}

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

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

export function getNewCards() {
  return cards.sort(() => Math.random() - 0.5);
}


export function calculateScore(cards) {
    return cards.reduce((acc, card) => {
      if (
        card.code.charAt(0) === "K" ||
        card.code.charAt(0) === "Q" ||
        card.code.charAt(0) === "J" ||
        card.code.charAt(0) === "0"
      ) {
        return (acc += 10);
      }
      if (card.code.charAt(0) === "A" && acc < 11) {
        return (acc += 11);
      }
      if (card.code.charAt(0) === "A" && acc >= 11) {
        return (acc += 1);
      }
  
      return (acc += Number.parseInt(card.code.charAt(0)));
    }, 0);
  }

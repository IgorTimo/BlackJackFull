import {getNewCards} from "./utils.js"


export class GameController {
    //  isGameOn = false;

    static startGame(req, res) {
        // if(isGameOn) {
        //     return res.send({message: 'You must finish your current game!'})
        // }
        const cards = getNewCards();
        console.log(cards);
        const cardsHash = "hash";
        const restOfCards = [...cards];
        const userCards = [];
        const dealerCards = [];
        userCards.push(restOfCards.shift());
        userCards.push(restOfCards.shift());
        dealerCards.push(restOfCards.shift());

        res.send({cardsHash, userCards, dealerCards})
    }

    static takeCard(req, res) {

    }
}
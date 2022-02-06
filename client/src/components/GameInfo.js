const GameInfo = (props) => {
    const { game} = props;
    return (
        <>
          <h4>Hash of cards: {game.cardsHash}</h4>
          <h4>Dealer cards: {game.dealerCards.join(', ')}</h4>
          <h4>Dealer score: {game.dealerScore}</h4>
          <h4>Player cards: {game.userCards.join(', ')}</h4>
          <h4>Player score: {game.userScore}</h4>
          <h4>Status of game: {game.status}</h4>

        </>
      );
}

export default GameInfo;
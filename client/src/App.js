import { useEffect, useState } from "react";

function App() {
  const [userId, setUserId] = useState("61fa36ab35490f7d2258f5b5");
  const [message, setMessage] = useState("Press start button");
  const [game, setGame] = useState({});

  const handleStartGameClick = () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        _id: userId,
        bet: 1,
      }),
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3003/start_game", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("res: ", data);
        setMessage(data.message);
        if(data.game){
          setGame(data.game);
        }
      });
  };

  function renderSwitch() {
    if (!game.status) {
      return <button onClick={() => handleStartGameClick()}>Start game</button>;
    }

    if (game.status === "user_move") {
      return (
        <>
          <button>Take card</button>
          <button>Enougth</button>
        </>
      );
    }

    if (game.status === "results") {
      return (
        <button
          onClick={() => {
            setMessage("Press start button");
            setGame({});
          }}
        >
          Try again
        </button>
      );
    }
  }

  return (
    <>
      <h1>Hello</h1>
      <h2>{message}</h2>
      <h4>Hach of cards: {game.cardsHash}</h4>
      <h4>Dealer cards: {game.dealerCards}</h4>
      <h4>Dealer score: {game.dealerScore}</h4>
      <h4>Player cards: {game.userCards}</h4>
      <h4>Player score: {game.userScore}</h4>
      <h4>Status of game: {game.status}</h4>

      {renderSwitch()}
    </>
  );
}

export default App;

import { useEffect, useState } from "react";

function App() {
  const [userId, setUserId] = useState("61fa36ab35490f7d2258f5b5");
  const [message, setMessage] = useState("Press start button");
  const [game, setGame] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          _id: userId,
        }),
        headers: { "Content-Type": "application/json" },
      };
  
      fetch("http://localhost:3003/log_in", requestOptions)
        .then((response) => response.json())
        .then(user => setUser(user));
    
  }, [message]);

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
        setMessage(data.message);
        if (data.game) {
          setGame(data.game);
        }
      });
  };

  const handleTakeCardClick = () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        _id: userId,
      }),
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3003/take_card", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        if (data.game) {
          setGame(data.game);
        }
      });
  };

  const handleEnougthClick = () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        _id: userId,
      }),
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3003/dealer_game", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        if (data.game) {
          setGame(data.game);
        }
      });
  }

  function renderSwitch() {
    if (!game.status) {
      return <button onClick={() => handleStartGameClick()}>Start game</button>;
    }

    if (game.status === "user_move") {
      return (
        <>
          <button onClick={() => handleTakeCardClick()}>Take card</button>
          <button onClick={() => handleEnougthClick()}>Enougth</button>
        </>
      );
    }

    if (game.status === "results") {
      return (
        <>
          <h4>All cards we playing with: {game.cards}</h4>
          <button
            onClick={() => {
              setMessage("Press start button");
              setGame({});
            }}
          >
            Try again
          </button>
        </>
      );
    }
  }

  return (
    <>
      <h1>BlackJack Game</h1>
      <h2>Ballance: {user.ballance}   Email: {user.email}</h2>
      <h2>{message}</h2>
      <h4>Hash of cards: {game.cardsHash}</h4>
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

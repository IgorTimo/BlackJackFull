import { useEffect, useState } from "react";

function App() {
  const [userId, setUserId] = useState('61fa36ab35490f7d2258f5b5');
  const [message, setMessage] = useState("Press start button");

  // useEffect(() => {
  //   fetch("http://localhost:3003/test")
  //     .then((response) => response.json())
  //     .then((data) => setInfo(data.messagge));
  // }, []);

  const handleClick = () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        _id: userId,
        bet: 1
      }),
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3003/start_game", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <h1>Hello</h1>
      <h2>{message}</h2>
      <button onClick={() => handleClick()}>Start game</button>
    </>
  );
}

export default App;

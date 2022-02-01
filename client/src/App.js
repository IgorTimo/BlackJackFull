import { useEffect, useState } from "react";

function App() {
  const [info, setInfo] = useState("No info");

  useEffect(() => {
    fetch("http://localhost:3003/test")
      .then((response) => response.json())
      .then((data) => setInfo(data.messagge));
  }, []);

  const handleClick = () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        password: "password",
      }),
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:3003/test", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <h1>Hello</h1>
      <h2>{info}</h2>
      <button onClick={() => handleClick()}>send log in</button>
    </>
  );
}

export default App;

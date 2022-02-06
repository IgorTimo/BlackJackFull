import { useEffect, useState } from "react";
import GameButtons from "./components/GameButtons";
import GameInfo from "./components/GameInfo";
import Header from "./components/Header";
import LogInSingUp from "./components/LogInSingUp";
import StartButtton from "./components/StartButtton";
import TryAgainButton from "./components/TryAgainButton";
import useToken from "./hooks/useToken";



function App() {
  const [userId, setUserId] = useState("61fa36ab35490f7d2258f5b5");
  const {token, setToken} = useToken();
  const [message, setMessage] = useState("Press start button");
  const [game, setGame] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    
      // const requestOptions = {
      //   method: "POST",
      //   body: JSON.stringify({
      //     _id: userId,
      //   }),
      //   headers: { "Content-Type": "application/json" },
      // };
  
      // fetch("http://localhost:3003/log_in", requestOptions)
      //   .then((response) => response.json())
      //   .then(user => setUser(user));
    
  }, [message]);


  function renderView() {

    if(!token){
      return <LogInSingUp setToken = {setToken}/>
    }

    if (!game.status) {
      return <StartButtton userId = {userId} setMessage = {setMessage} setGame = {setGame}/>
    }

    if (game.status === "user_move") {
      return <GameButtons userId = {userId} setMessage = {setMessage} setGame = {setGame}/>
    }

    if (game.status === "results") {
      return <TryAgainButton game = {game} setMessage = {setMessage} setGame = {setGame}/>
    }
  }

  return (
    <>
      <h1>BlackJack Game</h1>
      {token && <Header user = {user} message = {message}/>}
      {game.status && <GameInfo game={game}/>}
      {renderView()}
    </>
  );
}



export default App;

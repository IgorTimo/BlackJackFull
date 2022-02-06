import { useEffect, useState } from "react";
import GameButtons from "./components/GameButtons";
import GameInfo from "./components/GameInfo";
import Header from "./components/Header";
import LogInSingUp from "./components/LogInSingUp";
import StartButtton from "./components/StartButtton";
import TryAgainButton from "./components/TryAgainButton";
import useToken from "./hooks/useToken";
import { getUserById } from "./requestAuthUtils";



function App() {
  //"61fa36ab35490f7d2258f5b5"
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const {token, setToken} = useToken();
  const [user, setUser] = useState({});
  const [sesionEndTime, setSesionEndTime] = useState(0);
  const [message, setMessage] = useState("Press start button");
  const [game, setGame] = useState({});

  const setAllInfoAfterAuth = {setUserId, setToken, setSesionEndTime, setMessage};

  // console.log(`Render app with user id: ${userId}, token: ${token} , sesionEndTime: ${sesionEndTime}, message: ${message}`);


  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  useEffect(() => {
    getUserById(userId).then(user => setUser(user));
  }, [message]);


  function renderView() {

    if(!token && sesionEndTime === 0 ){//FIXME: вот здесь не нужно дополнительное условие sesionEndTime === 0. Дево всё в том, что токен то приходит, но мой хук его не чутвует.
      return <LogInSingUp setAllInfoAfterAuth = {setAllInfoAfterAuth} />
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
      {/* {token && <Header user = {user} message = {message}/>} FIXME: здесь логичне проверять токен проверять то должны токен */}
      {user && <Header user = {user} message = {message}/>}
      {game.status && <GameInfo game={game}/>}
      {renderView()}
    </>
  );
}



export default App;

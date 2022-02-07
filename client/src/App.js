import { useEffect, useState } from "react";
import GameButtons from "./components/GameButtons";
import GameInfo from "./components/GameInfo";
import Header from "./components/Header";
import LogInSingUp from "./components/LogInSingUp";
import StartButtton from "./components/StartButtton";
import TryAgainButton from "./components/TryAgainButton";
import useToken from "./hooks/useToken";
import { getUserInfo } from "./utils/requestAuthUtils";
import { startSessionEndTimer } from "./utils/utils";

function App() {
  const { token, setToken } = useToken();
  const [user, setUser] = useState({});
  const [sesionEndTime, setSesionEndTime] = useState(localStorage.getItem("sesionEndTime") || 0);
  const [message, setMessage] = useState("Press start button");
  const [game, setGame] = useState({});

  const setAllInfoAfterAuth = { setToken, setSesionEndTime, setMessage }; // просто собрал 3 крюка вместе, чтобы удобнее было передавать в форму

  useEffect(() => {
    if (sesionEndTime) {
      //FIXME: незнаю нужны ли такие проверки, но без них много лишних перезаписей, поэтому сделал
      localStorage.setItem("sesionEndTime", sesionEndTime);
    }
  }, [sesionEndTime]);

  useEffect(() => {
    // каждый раз как обновляется игра мы заново грузим юзера, так как у него меняется балланс
    if(token){
      getUserInfo().then((user) => setUser(user));
    }
  }, [message]);

  useEffect(() => {
    //каждую секунду проверяем, что сессия не отвалилась. Так часто прост для теста
    // поменять можно в controllers/AuthorizationController, 7 строка, const sessionTime ;
    if (sesionEndTime > 0) {
      startSessionEndTimer(sesionEndTime);
    }
  }, [sesionEndTime]);

  function renderView() {
    if (!token && sesionEndTime === 0) {
      //FIXME: вот здесь не нужно дополнительное условие sesionEndTime === 0. Дево всё в том, что токен то приходит, но мой хук его не чуcтвует.
      return <LogInSingUp setAllInfoAfterAuth={setAllInfoAfterAuth} />
    }

    if (!game.status) {
      return <StartButtton setMessage={setMessage} setGame={setGame} />
    }

    if (game.status === "user_move") {
      return <GameButtons setMessage={setMessage} setGame={setGame} />
    }

    if (game.status === "results") {
      return <TryAgainButton game={game} setMessage={setMessage} setGame={setGame} />
    }
  }

  return (
    <>
      <h1>BlackJack Game</h1>
      {/* {token && <Header user = {user} message = {message}/>} FIXME: здесь логичне проверять токен но он не работает */}
      {/* {user && console.log("User: ",user)} FIXME: почему то и проверка юзера работать перестала, что странно. перестало работать когда юзера через токен стал подтягивать, хотя на фронте разницы никакой вообще */}
      {user && <Header  user={user} setUser={setUser} message={message} />}
      {game.status && <GameInfo game={game} />}
      {renderView()}
    </>
  );
}

export default App;

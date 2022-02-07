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
  const [sesionEndTime, setSesionEndTime] = useState(
    localStorage.getItem("sesionEndTime") || 0
  );
  const [message, setMessage] = useState("Press start button");
  const [game, setGame] = useState({});

  const setAllInfoAfterAuth = { setToken, setSesionEndTime, setMessage }; // просто собрал 3 крюка вместе, чтобы удобнее было передавать в форму

  useEffect(() => {
    if (sesionEndTime) {
      //незнаю нужны ли такие проверки, но без них много лишних перезаписей, поэтому сделал
      localStorage.setItem("sesionEndTime", sesionEndTime);
    }
  }, [ sesionEndTime]);

  useEffect(() => {
    // каждый раз как обновляется игра мы заново грузим юзера, так как у него меняется балланс
    getUserInfo().then((user) => setUser(user));
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
      //FIXME: вот здесь не нужно дополнительное условие sesionEndTime === 0. Дево всё в том, что токен то приходит, но мой хук его не чутвует.
      return <LogInSingUp setAllInfoAfterAuth={setAllInfoAfterAuth} />;
    }

    if (!game.status) {
      return (
        <StartButtton
          setMessage={setMessage}
          setGame={setGame}
        />
      );
    }

    if (game.status === "user_move") {
      return (
        <GameButtons
          setMessage={setMessage}
          setGame={setGame}
        />
      );
    }

    if (game.status === "results") {
      return (
        <TryAgainButton game={game} setMessage={setMessage} setGame={setGame} />
      );
    }
  }

  return (
    <>
      <h1>BlackJack Game</h1>
      {/* {token && <Header user = {user} message = {message}/>} FIXME: здесь логичне проверять токен проверять то должны токен */}
      {user && <Header user={user} message={message} />}
      {game.status && <GameInfo game={game} />}
      {renderView()}
    </>
  );
}

export default App;

import { useRef } from "react";
import { startGame } from "../requestGameUtils";

const StartButtton = (props) => {
  const { userId, setMessage, setGame } = props;
  const betRef = useRef();

  const handelStartGameClick = async () => {
    const data = await startGame(userId, betRef.current.value);
    setMessage(data.message);
    setGame(data.game);
  };

  return (
    <>
      <label htmlFor="bet">Your bet: </label>
      <input ref={betRef} type="number" name="bet" defaultValue="1" />
      <br />
      <button onClick={() => handelStartGameClick()}>Start game</button>
    </>
  );
};

export default StartButtton;

import { dealerGame, takeCard } from "../utils/requestGameUtils";


const GameButtons = (props) => {
  const { setMessage, setGame } = props;

 const handelTakeCardClick = async () => {
    const data = await takeCard();
    setMessage(data.message);
    setGame(data.game);
 }

 const handelDealerGameClick = async () => {
     const data = await dealerGame()
     setMessage(data.message);
     setGame(data.game);
     
}

    return ( 
        <>
        <button onClick={() => handelTakeCardClick()}>Take card</button>
        <button onClick={() => handelDealerGameClick()}>Enougth</button>
      </>
     );
}
 
export default GameButtons;
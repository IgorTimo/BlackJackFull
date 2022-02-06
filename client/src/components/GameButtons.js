import { dealerGame, takeCard } from "../requestGameUtils";


const GameButtons = (props) => {
  const { userId, setMessage, setGame } = props;

 const handelTakeCardClick = async () => {
    const data = await takeCard(userId);
    setMessage(data.message);
    setGame(data.game);
 }

 const handelDealerGameClick = async () => {
     const data = await dealerGame(userId)
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
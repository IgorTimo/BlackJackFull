const TryAgainButton = (props) => {
  const { game, setMessage, setGame } = props;

  const handleTryAgainClick = () => {
    setMessage("Press start button");
    setGame({});
  };

  return (
    <>
      <h4>All cards we playing with: {game.cards}</h4>
      <button onClick={() => handleTryAgainClick()}>Try Again</button>
    </>
  );
};

export default TryAgainButton;

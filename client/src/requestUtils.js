const SERVER_URL = "http://localhost:3003/";

function quickPost(req, url) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(req),
    headers: { "Content-Type": "application/json" },
  };

  // fetch(`http://localhost:3003/${url}`, requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setMessage(data.message);
  //     if (data.game) {
  //       setGame(data.game);
  //     }
  //   });
}

export async function startGame(userId, bet) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      _id: userId,
      bet: bet,
    }),
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${SERVER_URL}start_game`, requestOptions);
  return await response.json();
}


export async function takeCard(userId) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        _id: userId
      }),
      headers: { "Content-Type": "application/json" },
    };
  
    const response = await fetch(`${SERVER_URL}take_card`, requestOptions);
    return await response.json();
  }

  export async function dealerGame(userId) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        _id: userId
      }),
      headers: { "Content-Type": "application/json" },
    };
  
    const response = await fetch(`${SERVER_URL}dealer_game`, requestOptions);
    return await response.json();
  }





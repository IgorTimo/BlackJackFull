const SERVER_URL = "http://localhost:3003/";


export async function startGame(userId, bet) {

  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      _id: userId,
      bet: parseInt(bet)
    }),
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${SERVER_URL}start_game`, requestOptions);
  const data = await response.json();
  return data;
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





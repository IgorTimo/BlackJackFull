const SERVER_URL = "http://localhost:3003/";
const token = JSON.parse(sessionStorage.getItem("token"));

export async function startGame( bet) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      bet: parseInt(bet),
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };

  const response = await fetch(`${SERVER_URL}start_game`, requestOptions);
  const data = await response.json();
  return data;
}

export async function takeCard() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };

  const response = await fetch(`${SERVER_URL}take_card`, requestOptions);
  return await response.json();
}

export async function dealerGame() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  };

  const response = await fetch(`${SERVER_URL}dealer_game`, requestOptions);
  return await response.json();
}

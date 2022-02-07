import { PORT } from "../port";
const SERVER_URL = `http://localhost:${PORT}/`;
const token = JSON.parse(sessionStorage.getItem("token"));

export async function auth(email, password) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${SERVER_URL}auth`, requestOptions);
  return await response.json();
}


export async function signUp(email, password) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    };
  
    const response = await fetch(`${SERVER_URL}sign_up`, requestOptions);
    return await response.json();

  }

  export async function getUserInfo(){
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    }

    const response = await fetch(`${SERVER_URL}get_user_by_id`, requestOptions);
    const data = await response.json();
    return data.user;
  }

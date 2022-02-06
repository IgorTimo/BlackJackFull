const SERVER_URL = "http://localhost:3003/";

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

  export async function getUserById(userId){
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        userId: userId
      }),
      headers: { "Content-Type": "application/json" }
    }

    const response = await fetch(`${SERVER_URL}get_user_by_id`, requestOptions);
    const data = await response.json();
    return data.user;
  }
import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log("token", token);
    return token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    sessionStorage.setItem("token", JSON.stringify(token));
  };

  return { setToken: saveToken, token: token };
};

export default useToken;

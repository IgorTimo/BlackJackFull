import { useState } from "react";
import LogInSignUpButtons from "./LogInSignUpButtons";

const LogInSingUp = (props) => {
  const [message, setMessage] = useState("You need to log in or sing up:");
  const [whatForm, setWhatForm] = useState();

  return (
    <>
      <h2>{message}</h2>
      {!whatForm ?  <LogInSignUpButtons setToken = {props.setToken} setMessage={setMessage} setWhatForm = {setWhatForm} /> : <button onClick={() => setWhatForm(null)}>Back</button>}
      {whatForm}
    </>
  );
};

export default LogInSingUp;

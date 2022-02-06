import { useRef } from "react";
import { signUp } from "../requestAuthUtils";

const SignUpForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = await signUp(emailRef.current.value, passwordRef.current.value);
      props.setMessage(data.message);
      emailRef.current.value = "";
      passwordRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <label htmlFor="email">Email:</label>
      <input ref={emailRef} type="email" name="email" />
      <br />
      <label htmlFor="password">Password:</label>
      <input ref={passwordRef} type="password" name="password" />
      <br />
      <input type="submit" />
    </form>
  );
};

export default SignUpForm;

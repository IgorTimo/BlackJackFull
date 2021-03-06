import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

const LogInSignUpButtons = (props) => {
  const { setMessage, setWhatForm, setAllInfoAfterAuth } = props;

  const handleLogInClick = () => {
    setMessage("Enter you email and password to log in");
    setWhatForm(<LogInForm setAllInfoAfterAuth = {setAllInfoAfterAuth} setMessage = {setMessage}/>);
  };

  const handleSignUpClick = () => {
    setMessage("Enter you email and create password to sign up");
    setWhatForm(<SignUpForm setMessage = {setMessage} />);
  };

  return (
    <>
      <button onClick={() => handleLogInClick()}>Log In</button>
      <button onClick={() => handleSignUpClick()}>Sign Up</button>
    </>
  );
};

export default LogInSignUpButtons;

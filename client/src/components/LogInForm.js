import { useRef } from "react";
import { auth } from "../requestAuthUtils";

const LogInForm = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await auth(emailRef.current.value, passwordRef.current.value);
        console.log(data);
        props.setMessage(data.message);
        if(data.token){
            props.setToken(data.token);
        }
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
}
 
export default LogInForm;
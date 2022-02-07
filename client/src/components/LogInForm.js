import { useRef } from "react";
import { auth } from "../utils/requestAuthUtils";

const LogInForm = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();

   const { setToken, setSesionEndTime, setMessage} = props.setAllInfoAfterAuth;
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await auth(emailRef.current.value, passwordRef.current.value);
        props.setMessage(data.message);
        if(data.token){
            setToken(data.token);
            setSesionEndTime(new Date() / 1000 + data.sessionTime); //время когда сессия закончится в милисикундах
            setMessage(data.message);
        }else{
            passwordRef.current.value = "";
        }

        
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
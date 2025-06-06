import React from "react";
import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
function SignUp({setIsAuth}) {
    /*making user an object and setting it to null initially and then setting it to 
    the value of the input as its going because of the event listener on onChange*/
    const [user, setUser] = useState(null);
    const cookies = new Cookies();
    const signUp = () => {
        Axios.post("http://localhost:3001/signup", user).then(res => {
            const {token, userId, firstName, lastName, username, hashedPassword} = res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);  
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("username", username);
            cookies.set("hashedPassword", hashedPassword);
            setIsAuth(true);
        })
        
    }
    return (
        <div className ="signUp">
        <label>Sign Up</label>
            <input placeholder="First Name" onChange={(event) => {
                setUser({ ...user, firstName: event.target.value });
            }} />  
            <input placeholder="Last Name" onChange={(event) => {
                setUser({ ...user, lastName: event.target.value });
            }} />
            <input placeholder="Username" onChange={(event) => {
                setUser({ ...user, username: event.target.value });
            }} />
            <input placeholder="Password" type="password" onChange={(event) => {
                setUser({ ...user, password: event.target.value });
            }} />
            <button onClick={(signUp)}> signUp </button>
        </div>
    );
    }
    export default SignUp;
// This code defines a simple SignUp component using React.
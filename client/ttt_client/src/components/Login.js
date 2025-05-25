import React from "react";
import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
function Login({setIsAuth}) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const cookies = new Cookies();
    const login = () => {
        Axios.post("http://localhost:3001/login", { username, password }).then(res => {
            if (res.data.error) {
                alert(res.data.error);
                return;
            }
            const { token, firstName, lastName, username, userId } = res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("username", username);
            setIsAuth(true);
        });
    }
    return (
        <div className ="login">
        <label>Login</label>
            
            <input placeholder="Username" onChange={(event) => {
                setUsername(event.target.value );
            }} />
            <input placeholder="Password" type="password" onChange={(event) => {
                setPassword(event.target.value);
            }} />
            <button onClick={(login)}> login </button>
        </div>
    );
}
export default Login;
// This code defines a simple Login component using React.
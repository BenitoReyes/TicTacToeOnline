import React from "react";
function Login() {
    const login = () => {
        // This function will handle the login logic
    }
    const [user, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div classname ="Login">
        <label>Login</label>
        <h1>Login</h1>
            
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
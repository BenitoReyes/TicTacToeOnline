import React from "react";
function Login() {
    const [user, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const login = () => {
        // This function will handle the login logic
    }
    return (
        <div classname ="login">
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
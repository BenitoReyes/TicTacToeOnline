import './App.css';
import SignUp from './components/SignUp.js';
import Login from './components/Login.js';
import { StreamChat } from 'stream-chat';
import Cookies from 'universal-cookie';
import Axios from 'axios';

import { useState, useEffect } from 'react';
function App() {
  const [client, setClient] = useState(null);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_API_KEY);
  // const [apiKey, setApiKey] = useState(null);
  useEffect(() => {
    // Fetch the API key from the server
    Axios.get("http://localhost:3001/api-key")
      .then((res) => {
        setApiKey(res.data.apiKey);
      })
      .catch((err) => {
        console.error("Failed to fetch API key:", err);
      });
  }, []);

  useEffect(() => {
    if (apiKey) {
      const chatClient = StreamChat.getInstance(apiKey);
      setClient(chatClient);
    }
  }, [apiKey]);

  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    if (client && token) {
      client.connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      ).then((user) => {console.log(user)});
    }
  }, [client, token]);

  // Remove duplicate connectUser call outside of useEffect
  return (
    <div className="App">
      <SignUp/>
      <Login/>
      <h1>Welcome to Tic Tac Toe</h1>
      <h2>Choose your game mode:</h2>
      <button onClick={() => alert('Single Player Mode')}>Single Player</button>
      <button onClick={() => alert('Multiplayer Mode')}>Multiplayer</button>
      <h2>Choose your game difficulty:</h2>
      <button onClick={() => alert('Easy')}>Easy</button>
      <button onClick={() => alert('Medium')}>Medium</button>
      <button onClick={() => alert('Hard')}>Hard</button>
      <h2>Choose your game board size:</h2>
      <button onClick={() => alert('3x3')}>3x3</button>
      <button onClick={() => alert('4x4')}>4x4</button>
      <button onClick={() => alert('5x5')}>5x5</button>
    </div>
  );
}

export default App;

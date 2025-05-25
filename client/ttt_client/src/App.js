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
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isAuth, setIsAuth] = useState(false);
  const logOut = () =>{
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName")
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false); 
  }
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
      ).then((user) => {
        setIsAuth(true);
      });
    }
  }, [client, token]);

  // Remove duplicate connectUser call outside of useEffect
  return (
    <div className="App">
      {isAuth ? (<button onClick={logOut}>Log out</button>) : (<>
      <SignUp setIsAuth={setIsAuth}/>
      <Login setIsAuth={setIsAuth}/>
      </>
      )}
    </div>
  );
}

export default App;

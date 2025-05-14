import './App.css';
import SignUp from './components/signUp.js';
import Login from './components/login.js';
function App() {
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

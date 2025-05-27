import React, { useState } from 'react'
import Board from './Board'
import {Window, MessageList, MessageInput} from 'stream-chat-react';
function Game({ channel }) {
  const [playersJoined, setPlayersJoined] = React.useState(channel.state.watcher_count === 2);
    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    });
    const [result,setResult] = useState({winner: "none", state: "none"})
    if(!playersJoined){
        // If there are less than 2 members in the channel, show a waiting message
    return <div>Waiting for other player to connect</div>
  } else {
    return (
      <div classsName="gameContainer">
        <Board result={result} setResult={setResult}/>
        {/* CHAT */}
        {/*LEAVE GAME BUTTON*/}
      </div>
    )
  }
}

export default Game
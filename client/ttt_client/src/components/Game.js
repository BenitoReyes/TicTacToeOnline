import React from 'react'

function Game({ channel }) {
  const [playersJoined, setPlayersJoined] = React.useState(channel.state.watcher_count === 2);
    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    });
    if(!playersJoined){
        // If there are less than 2 members in the channel, show a waiting message
    return <div>Waiting for other player to connect</div>
  } else {
    return (
      <div classsName="gameContainer">
        <Board/>
        {/* CHAT */}
        {/*LEAVE GAME BUTTON*/}
      </div>
    )
  }
}

export default Game
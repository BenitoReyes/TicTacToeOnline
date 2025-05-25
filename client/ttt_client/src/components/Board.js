import React from 'react'

function Board() {
    const [board, setBoard] = useState("","","","","","","","","");
  return (
    <div className="board">
        <div className="row">
            <Square/>
            <Square/>
            <Square/>
        </div>
        <div className="row">
            <Square/>
            <Square/>
            <Square/>
        </div>
        <div className="row">
            <Square/>
            <Square/>
            <Square/>
        </div>
    </div>
  )
}

export default Board
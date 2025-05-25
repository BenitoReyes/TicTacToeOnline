import React from 'react'
import Square from './Square';
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
import React, { useState, useEffect } from 'react';
import Square from './Square';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import {Patterns} from './WinningPatterns.js'
function Board({result, setResult}) {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [player,setPlayer] = useState("X"); // or "O" based on the player's turn
    const [turn, setTurn] = useState("X"); // or "O" based on the player's turn
    const { channel } = useChannelStateContext();
    const { client } = useChatContext();

    useEffect(() => {
        checkWin(); 
        checkIfTie();
    },[board]);

    const chooseSquare = async(square) => {
        if(turn === player && board[square] === "") {
            setTurn(player === "X" ? "O" : "X");
            await channel.sendEvent({
                type: "game-move",
                data: { square, player }
            });
            setBoard(board.map((val, idx) => {
                if(idx === square && val === "") {
                    return player;
                }
                return val;
            }))
        }
    }
    const checkWin = () => {
        Patterns.forEach(currPattern => {
            const firstPlayer = board[currPattern[0]];
            if(firstPlayer === "") return;
            let foundWinningPattern = true;
            currPattern.forEach(idx => {
                if(board[idx] !== firstPlayer) {
                    foundWinningPattern = false;
                }
            });
            if(foundWinningPattern) {
                setResult({winner: board[currPattern[0]], state: "won"});
                alert(`${board[currPattern[0]]} wins!`);
                // Reset the board
                setBoard(Array(9).fill(""));
                setTurn("X");
                setPlayer("X");
                channel.sendEvent({
                    type: "game-reset",
                    data: {}
                });
            }
        })
    }
    const checkIfTie = () => {
        let filled = true;
        board.forEach((square) => {
            if(square === "") {
                filled = false;
            }
        });

        if(filled) {
            setResult({winner: "none", state: "tie"});
            alert("It's a tie!");
            // Reset the board
            setBoard(Array(9).fill(""));
            setTurn("X");
            setPlayer("X");
            channel.sendEvent({
                type: "game-reset",
                data: {}
            });
        }
    }
    channel.on(event => { 
        if(event.type === "game-move" && event.user.id !== client.userID) {
            const currentPlayer = event.data.player === "X" ? "O" : "X";
            setPlayer(currentPlayer);
            setTurn(currentPlayer);
            setBoard(board.map((val, idx) => {
                if(idx === event.data.square && val === "") {
                    return event.data.player;
                }
                return val;
            }))
        }
    })
  return (
    <div className="board">
        <div className="row">
            <Square chooseSquare={() => {chooseSquare(0)}} val={board[0]}/>
            <Square chooseSquare={() => {chooseSquare(1)}} val={board[1]}/>
            <Square chooseSquare={() => {chooseSquare(2)}} val={board[2]}/>
        </div>
        <div className="row">
            <Square chooseSquare={() => {chooseSquare(3)}} val={board[3]}/>
            <Square chooseSquare={() => {chooseSquare(4)}} val={board[4]}/>
            <Square chooseSquare={() => {chooseSquare(5)}} val={board[5]}/>
        </div>
        <div className="row">
            <Square chooseSquare={() => {chooseSquare(6)}} val={board[6]}/>
            <Square chooseSquare={() => {chooseSquare(7)}} val={board[7]}/>
            <Square chooseSquare={() => {chooseSquare(8)}}val={board[8]}/>
        </div>
    </div>
  )
}

export default Board
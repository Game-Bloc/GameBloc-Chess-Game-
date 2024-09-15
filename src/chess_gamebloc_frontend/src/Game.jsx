import { useState, useMemo, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import CustomDialog from "./components/CustomDialog";

function Game({ players, room, orientation, cleanup }) {
  const chess = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(chess.fen()); 
  const [over, setOver] = useState("");

    //   const makeAMove = useCallback (
    //     (move) => {
    //         try {
    //             const result = chess.move(move); // this is the function that updates the chess moves instances
    //             setFen(chess.fen()); // this works as a re-render trigger the FEN state/notation

    //             console.log("over, checkmate", chess.isGameOver(), chess.isCheckmate());
                
    //             if (chess.isGameOver()) { // this is to check if the pieces movement led to a game over
    //                 if (chess.isCheckmate()) { // this is to check if the pieces movement led to a checkmate
    //                     setOver (
    //                         `Checkmate! ${chess.turn() === "w" ? "black" : "white"} wins!` // the winner is determined by checking which side/color made the last move

    //                     )                  
    //                 } else if (chess.isDraw()) {
    //                     setOver("Draw"); // this sets a message is the game is draw
    //                 } else {
    //                     setOver("Game Over");
    //                 }
    //             }

    //             return result;
    //         } catch (e) {
    //             return null;
    //         }  // this return null is the move was illegal or invalid
    //     },
    //     [chess]
    //   );

  const makeAMove = useCallback(
    (move) => {
      try {
        const result = chess.move(move); // update Chess instance
        setFen(chess.fen()); // update fen state to trigger a re-render
  
        console.log("over, checkmate", chess.isGameOver(), chess.isCheckmate());
  
        if (chess.isGameOver()) { // check if move led to "game over"
          if (chess.isCheckmate()) { // if reason for game over is a checkmate
            // Set message to checkmate. 
            setOver(
              `Checkmate! ${chess.turn() === "w" ? "black" : "white"} wins!`
            ); 
            // The winner is determined by checking for which side made the last move
          } else if (chess.isDraw()) { // if it is a draw
            setOver("Draw"); // set message to "Draw"
          } else {
            setOver("Game over");
          }
        }
  
        return result;
      } catch (e) {
        return null;
      } // null if the move was illegal, the move object if the move was legal
    },
    [chess]
  );


    // the function that handles the pieces movement on the chessboard
    function onDrop(sourceSquare, targetSquare) {
        const moveData = {
            from: sourceSquare,
            to: targetSquare,
            color: chess.turn(),
            promotion: "q",
        }
        const move = makeAMove(moveData);
        if (move === null) return false;  // this function handles any false or illegal pieces movement
    }
  
  // this is the rendered UI of the chessboard
  return (
    <>
      <div className="board">
        <Chessboard position={fen} onPieceDrop={onDrop} /> 
      </div>
      <CustomDialog 
        open={Boolean(over)}
        title={over}
        contentText={over}
        handleContinue={() => {
          setOver("");
        }}
      />
    </>
  );
}

export default Game;

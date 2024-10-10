import { useState, useMemo, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import CustomDialog from "./components/CustomDialog";
import Login from "./Login.jsx"
import { useAuth } from "./auth/use_auth_client.tsx";


function Game({ players, room, orientation, cleanup }) {
  const chess = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(chess.fen()); 
  const [over, setOver] = useState("");

    const { isAuthenticated,login ,loginNFID:any } = useAuth();

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
        const result = chess.move(move); // renders the chess instance
        setFen(chess.fen()); // set the chessboard to the default position
  
        console.log("over, checkmate", chess.isGameOver(), chess.isCheckmate());
  
        if (chess.isGameOver()) { // the function to check if the move led to a 'game over'
          if (chess.isCheckmate()) { // this is to check if the move leads to game over
            setOver(
              `Checkmate! ${chess.turn() === "w" ? "black" : "white"} wins!`
            ); 
            // chess.turn checks for the last move made
          } else if (chess.isDraw()) { // if it is a draw...
            setOver("Draw"); // set message to "Draw"
          } else {
            setOver("Game over");
          }
        }
  
        return result;
      } catch (e) {
        return null;
      } // returns an empty response if the move is illegal.
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
        <Login />
        {/*<useAuthClient />*/}
      <div className="board">
          {!isAuthenticated ? (

              <button onClick={() => {
                  console.log('login:', login);
                  loginNFID.loginNFID();
              }}>Login Auth</button>
          ) : {}}
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

import { useState, useMemo, useCallback, useEffect, useContext } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import CustomDialog from "./components/CustomDialog";
import Login from "./Login.jsx"
import { useAuth } from "./auth/use_auth_client";
import { chessFunctions } from "./functions/functions";
import { UseProfileContext } from './functions/context';
import  GameError  from "./components/Noti/GameError";
import InitGame from "./components/stuntPull/InitGame";

// interface AppProps {{} : AppProps}

function Game() {
  const { whoamiActor, isAuthenticated } = useAuth();
  const profileContext = UseProfileContext();
  const { name, age } = UseProfileContext()
  const chesss = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(chesss.fen()); 
  const [over, setOver] = useState("");
  const { getProfile } = chessFunctions();


  const makeAMove = useCallback(
    (move) => {
      try {
        const result = chesss.move(move); // renders the chess instance
        setFen(chesss.fen()); // set the chessboard to the default position
  
        console.log("over, checkmate", chesss.isGameOver(), chesss.isCheckmate());
  
        if (chesss.isGameOver()) { // the function to check if the move led to a 'game over'
          if (chesss.isCheckmate()) { // this is to check if the move leads to game over
            setOver(
              `Checkmate! ${chesss.turn() === "w" ? "black" : "white"} wins!`
            ); 
            // chess.turn checks for the last move made
          } else if (chesss.isDraw()) { // if it is a draw...
            setOver("Draw"); 
          } else {
            setOver("Game over");
          }
        }
  
        return result;
      } catch (e) {
        return null;
      } 
    },
    [chesss]
  );


    
    const onDrop = (sourceSquare, targetSquare) => {
      const moveData = {
          from: sourceSquare,
          to: targetSquare,
          color: chesss.turn(),
          promotion: "q",
      }
      const move = makeAMove(moveData);
      if (move === null) {
        return false;  // this function handles any false or illegal pieces movement
      } else {
        return true;
      }
    }

    useEffect (() => {
      if (isAuthenticated) {  
        getProfile()
      }
    }, [isAuthenticated])
    
    // console.log("the username", grabName);
    const [gameRender, setGameRender] = useState(false)

  
  // this is the rendered UI of the chessboard
  return (
    <>
        <Login />
        {/*<useAuthClient />*/}
      <div className="board">

          

        <h1>Welcome:</h1>
        <p>{profileContext.profile.name}</p>
            
        {gameRender ? <Chessboard position={fen} onPieceDrop={onDrop} /> : <GameError /> }

        {/* <Chessboard position={fen} onPieceDrop={onDrop} /> */}
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

// : string | { from: string; to: string; promotion?: string; }

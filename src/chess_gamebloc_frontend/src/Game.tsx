import { useState, useMemo, useCallback, useEffect, useContext } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import CustomDialog from "./components/CustomDialog";
import Login from "./Login.jsx"
import { useAuth } from "./auth/use_auth_client";
import { chessFunctions } from "./functions/functions";
import { UseProfileContext } from './functions/context';
import  GameError  from "./components/Noti/GameError";
import { AppMessage } from "../../declarations/Chess_Kitchen/Chess_Kitchen.did"
import InitGame from "./components/stuntPull/InitGame";

// interface AppProps {{} : AppProps}

function Game() {
  const { whoamiActor, isAuthenticated, ws } = useAuth();
  const profileContext = UseProfileContext();
  UseProfileContext()
  const chesss = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(chesss.fen()); 
  const [over, setOver] = useState("");
  const { getProfile } = chessFunctions();
  // const [ wsTest, setWsTest ] = useState(false);


  const makeAMove = useCallback(
    (move: string | { from: string; to: string; promotion?: string; }) => {
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
 
  const onDrop = (sourceSquare: any, targetSquare: any) => {
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

  const sendJoinedChatMessage = async () => {
    const msg: AppMessage = {
      message: "chess moves",
    }
    // console.log("AppMessage", msg);
    
    ws?.send(msg)
  }

  useEffect (() => {
    if (isAuthenticated) {  
      getProfile()
      sendJoinedChatMessage()
    }
  }, [isAuthenticated])

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  //  WEBSOCKET / ///////////////////////////////////////////////////

  useEffect(() => {

    console.log("ws started ", ws)
    if (!ws) {
      return
    }
    console.log("ws ended ", ws)


    // ws.onopen()
    const wsTestt = () => {
      if (ws.onopen) {
        console.log("Connected to the canister")
      } else {
        console.log("ws not working well");
      }
    }

    wsTestt()

    // ws.onopen = () => {
    // }

    // console.log("on open check", ws.onopen)

    ws.onclose = () => {
      console.log("Disconnected from the canister")
    }

    ws.onerror = (error) => {
      try {
      } catch (err) {
        console.log("Error on websocket:", error)
      }
    }

    ws.onmessage = async (event) => {
      try {
        const recievedMessage = event.data
        console.log("received message content", recievedMessage);
        

        // If the message is a GroupMessage, check if it is a typing message
        // if ("message" in recievedMessage) {
        //   if (recievedMessage.message) {
        //     handleIsTypingMessage(recievedMessage.GroupMessage)
        //   } else {
        //     if (recievedMessage.GroupMessage.message.username !== userName) {
        //       setMessages((prev: any) => [...prev, recievedMessage.GroupMessage])
        //     }
        //   }
        // }
        // If the message is a JoinedChat message, add it to the messages
        // if ("JoinedChat" in recievedMessage) {
        //   const chat: AppMessage = {
        //     message: "users"
        //   }
        //   setMessages((prev: any) => [...prev, chat])
        // }
      } catch (error) {
        console.log("Error deserializing message", error)
      }
    }

  }, [ws])

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  //  WEBSOCKET / ///////////////////////////////////////////////////
  
  // console.log("the username", grabName);
  const [gameRender, setGameRender] = useState(true)

  
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

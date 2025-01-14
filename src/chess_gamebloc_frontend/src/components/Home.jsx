// import useWebSocket from "react-use-websocket"

// export function Home ( {username} ) {

//     const WS_URL = 'ws://127.0.0.1:8000'
//     const { sendJsonMessage } = useWebSocket(WS_URL, {
//         queryParams: {username}
//     });

    
//     return(
//         <>
//             <h1>Hello, {username}</h1>
//         </>
//     )
// }

import useWebSocket from "react-use-websocket"
import React, { useEffect, useRef } from "react"
import throttle from "lodash.throttle"
import { Cursor } from "./Cursor"


// const renderedCursors = users => {
//     return Object.keys(users).map( uuid => {
//         const users = users[uuid]

//         return (
//             <Cursor key={uuid} point={[users.state.x, users.state.y]} />
//         )

//     })
// }

const renderCursors = (users) => {
    return Object.keys(users).map((uuid) => {
      const user = users[uuid]
      return (
        <Cursor key={uuid} userId={uuid} point={[user.state.x, user.state.y]} />
      )
    })
}

export function Home({ username }) {
    const WS_URL = `ws://127.0.0.1:8000`
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
      share: true,
      queryParams: { username },
    })
  
    const THROTTLE = 50
    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE))
  
    useEffect(() => {
      sendJsonMessage({
        x: 0,
        y: 0,
      })
      window.addEventListener("mousemove", (e) => {
        sendJsonMessageThrottled.current({
          x: e.clientX,
          y: e.clientY,
        })
      })
    }, [])
  
    if (lastJsonMessage) {
      return <>{renderCursors(lastJsonMessage)}</>
    }
}
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

export function Home({ username }) {
  const WS_URL = `ws://127.0.0.1:8000`

  const { sendJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
    share: true,
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

  return <h1>Hello, {username}</h1>
}
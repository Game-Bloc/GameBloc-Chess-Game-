import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import { v4 as uuidv4 } from "uuid"

const url = require('url')
const server = createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000

wsServer.on(connection, (connection, request) => {
    // ws://localhost:8000?Username=Emma

    const { username } = url.parse(request.url, true).query
    console.log(username)

})

server.listen(port, () => {
    console.log(`Websocket is connected to port ${port}`);
    
})


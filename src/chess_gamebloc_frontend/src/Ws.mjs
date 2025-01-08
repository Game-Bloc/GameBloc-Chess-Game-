import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import { v4 as uuidv4 } from "uuid"
import url from 'node:url';

// import { URL } from 'url'
// var url = require('url')
const server = createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000
const connections = {}

wsServer.on("connection", (connection, request) => {
    // ws://localhost:8000?Username=Emma

    const { username } = url.parse(request.url, true).query
    const uuid = uuidv4()
    console.log(username)
    console.log(uuid)

    // broadcast of message
    connections[uuid] = connection

})

server.listen(port, () => {
    console.log(`Websocket is connected to port ${port}`);
    
})


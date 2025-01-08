import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import { v4 as uuidv4 } from "uuid"
import url from 'node:url';

// import { URL } from 'url'
// var url = require('url')
const server = createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000
const connections = { }
const users = { }

const broadcast = () => {
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid]
        const message = JSON.stringify(users)

        connection.send(message)
    })
}

const handleMessage = (bytes, uuid) => {
    const message = JSON.parse(bytes.toString())
    const user = users[uuid]
    user.state = message

    broadcast()

    console.log(`${users.username} updated their state ${JSON.stringify(user.state)}`)
}

const handleClose = uuid => {

    console.log(`${users[uuid].username} disconnected`);
    
    delete connections[uuid]
    delete users[uuid]

    // write a logic/function to make sure that a message is sent when a user disconnets
    // also write a function that can show that a user was currently active or active atm
    broadcast()
}

wsServer.on("connection", (connection, request) => {
    // ws://localhost:8000?Username=Emma

    const { username } = url.parse(request.url, true).query
    const uuid = uuidv4()
    console.log(username)
    console.log(uuid)

    // broadcast of message
    connections[uuid] = connection

    users[uuid] = {
        username,
        state: {}
    }

    connection.on("message", message => handleMessage( message, uuid ))
    // connection.close("message", () => handleClose( uuid ))

})

server.listen(port, () => {
    console.log(`Websocket is connected to port ${port}`);
    
})


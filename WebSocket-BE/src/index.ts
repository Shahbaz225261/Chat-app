import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({port: 1010});
interface Users{
    socket: WebSocket;
    name:   string;
    roomId: string;
}

let allSockets: Users[] = [];
let connectedUser = 0;

wss.on("connection",(socket: WebSocket)=>{
    
    socket.on("message",(message)=>{
        const parsedMessage = JSON.parse(message.toString());
        if(parsedMessage.type === "join"){
            allSockets.push({
                socket,
                name:parsedMessage.payload.name,
                roomId:parsedMessage.payload.roomId,
            })
            console.log("user joined room");
        }

        if (parsedMessage.type == "chat") {
            console.log("user wants to chat");

            let currentUserRoom = null;
            currentUserRoom = allSockets.find((x)=>x.socket == socket)?.roomId;

            allSockets.filter(user=>user.roomId == currentUserRoom)
            .forEach(user=>user.socket.send(parsedMessage.payload.message.toString()));
        }

    })
})


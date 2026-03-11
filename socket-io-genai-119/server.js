import app from "./src/app.js";
import {createServer} from "http";
import { Server } from "socket.io";


const httpSerer = createServer(app);
const io = new Server(httpSerer,{})

io.on("connection",(socket)=>{
    console.log("New connection created")

    socket.on("message",(msg)=>{
        console.log("user fired message event")
        console.log(msg)
    })
})

httpSerer.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
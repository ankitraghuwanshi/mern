const express=require("express");
const http=require("http");
const {Server}=require("socket.io");
const path=require("path");

const app=express();
const newServer=http.createServer(app);
const io=new Server(newServer);

app.use(express.static(path.join(__dirname,"public")));

io.on('connection',(socket)=>{
    //
    console.log(`a user connected: ${socket.id}`);

    //
    socket.emit('message',"hello welcome to websocket server");

    socket.on('client_message',(msg)=>{
        console.log("message from client",msg)
        io.emit("server message",msg)
    });

    socket.on('disconnect',()=>{
        console.log("user disconnected",socket.id)
    });
});

app.get('/',(req,res)=>{
    res.send("hello world")
});

newServer.listen(3000,()=>console.log("3000 port listening"));
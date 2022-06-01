import express from "express";
import http from "http";
import Websocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname+"/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);
//express는 http 프로토콜, ws는 다르기때문에 같이 합쳐서 쓸 것임.

const server = http.createServer(app);
const wss = new Websocket.Server({ server });


const sockets = [];

//아래코드는 브라우져가 다를 때 여러번 실행됨.
wss.on("connection",(socket) => {

    sockets.push(socket);
    socket["nickName"] = "Annaymous";
    //socket 메세지로 브라우져로 보냄/ wss 메서드아님
    console.log("Connected to Browser");
    socket.on("close", () => console.log("Disconnected from the Browser"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        console.log(message);
        
        switch(message.type) {
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickName}: ${message.payload.toString()}`));
            case "nickName":
                //socket은 객체기때문에 닉네임 누군지 넣어주면됨.
                socket["nickName"] = message.payload;
        }
        //접속된 모든 소켓들에게 메세지 보내기
    });
});

server.listen(3000, handleListen);
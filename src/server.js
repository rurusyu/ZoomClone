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

wss.on("connection",(socket) => {
    //socket 메세지로 브라우져로 보냄/ wss 메서드아님
    console.log("Connected to Browser");
    socket.on("close", () => console.log("Disconnected from the Browser"));
    socket.on("message", (message) => console.log(message.toString('utf8')));
    socket.send("hello!");
});

server.listen(3000, handleListen);
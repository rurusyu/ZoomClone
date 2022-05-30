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

server.listen(3000, handleListen);
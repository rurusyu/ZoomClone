//백엔드랑 연결해달라고 해야함.

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to Server");
})
//백엔드에서 보낸 메세지 받는것.
socket.addEventListener("message", (message) => {
    console.log("Just got this: ", message.data, "from the server");
})

socket.addEventListener("close", () => {
    console.log("Disconnected to Server");
})

setTimeout(() => {
    socket.send("Hello from the browser!");
},10000)
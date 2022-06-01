//백엔드랑 연결해달라고 해야함.
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickNameForm = document.querySelector("#nickname");
const socket = new WebSocket(`ws://${window.location.host}`);


const makeMessage = (type, payload) => {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

const handleNickNameSubmit = event => {
    event.preventDefault();
    const input = nickNameForm.querySelector("input");
    socket.send(makeMessage("nickName", input.value));
}

const handleMessageSubmit = event => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}


socket.addEventListener("open", () => {
    console.log("Connected to Server");
})

//백엔드에서 보낸 메세지 받는것.
socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
    console.log("Just got this: ", message.data, "from the server");
})

socket.addEventListener("close", () => {
    console.log("Disconnected to Server");
})
nickNameForm.addEventListener("submit", handleNickNameSubmit);
messageForm.addEventListener("submit",handleMessageSubmit);
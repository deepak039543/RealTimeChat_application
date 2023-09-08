const socket = io('http://localhost:3000');


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');

const messageContainer = document.querySelector(".container");
var audio = new Audio('Whatsapp 1 Message - Notification.mp3');

//here we use append function for messages
const append = (message, position) => {
    const messageElement = document.createElement("div");
    // messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    if (position === 'right') {
        messageElement.innerText = `You : ${message}`;
    } 
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }

}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    console.log(`Sending message: "${message}"`);
    append(`You : ${message}`, "right");
    socket.emit("send", message);
    messageInput.value = "";
})

//when any client use chat app then first he have to enter her name
const name = prompt("Enter your name to join ");
socket.emit('new-user-joined', name); //here client emit event ('new-user-joined) to a server

// handle this 'user-joined' event on client when any client joined the chat
socket.on("user-joined", name => {
    append(`${name} joined the chat`, "left");
})

// handle this 'receive' event on client when any client send the message
socket.on("receive", data => {
    append(`${data.name}:${data.message}`, "left");
})

// handle this 'left' event on client when any client left the chat 
socket.on("left", name => {
    append(`${name} left the chat!`, "left");
})

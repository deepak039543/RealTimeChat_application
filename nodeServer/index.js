/* In this real-time chat app  we create both a client file and a server file. Multiple clients can connect to the server, and when a client joins the chat, it emits an event with (socket.emit)b Then server handles this event with (socket.io) and broadcasts it with (socket.broadcast.emit) to all the clients. Similarly, when any client emits an event to the server, the server handles it and broadcasts it to all clients. And when server emit an event to a client then he handle the error.

here is the visual presentation how it works : =>
 step 1 ==>
 suppose a client name Ramji  :->  send a message using socket.emit to server 
 step 2 ==>
server  :-> then server receive message from Ramji using socket.io and now 
 step 3 ==>
server  :-> server broadcast the message to all multiple clients using socket.broadcast.emit 
step 4 ==>
multiple clients :->now when any clients send any message using socket.io then  
step 5 ==>
server:-> then server emit this message and broadcast to RAmji and all other clients

*/




const io = require("socket.io")(3000, {
    cors: {
        origin: "*",

    }
});


const users = {};

//when new client connect with server
io.on('connection', socket => {
    console.log(`User connected: ${socket.id}`);
    //when a new client joined the chat then server handle the event ('new-user-joined')
    socket.on('new-user-joined', name => {
        console.log(`${name} joined the chat`);
        // console.log("new client ", name);

        users[socket.id] = name;  //now save the unique socket-id of a new client save in 'users'

        socket.broadcast.emit('user-joined', name); //now  send the event(user-joined) from the server to all clients
    });


    //when any client emit the event('send') then server handle the 'send' event
    socket.on('send', message => {
        console.log(`Message received from ${users[socket.id]}: ${message}`);
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] }); //here send the event('send') to all clients
    });





    //when any client emit the 'disconnect' event then server handle this event
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]); //when any clients leave the chat then server emit the 'disconnect' event to all the clients
        delete users[socket.id]; //and delete the unique socket-id of that client
    });

});


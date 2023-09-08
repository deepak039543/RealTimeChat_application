
const io = require("socket.io")(3000, {
    cors: {
        origin: "*",

    }
});


const users = {};

io.on('connection', socket => {
    console.log(`User connected: ${socket.id}`);
    socket.on('new-user-joined', name => {
        console.log(`${name} joined the chat`);
        // console.log("New user ", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        console.log(`Message received from ${users[socket.id]}: ${message}`);
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

  




    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

});


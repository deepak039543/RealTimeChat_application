# RealTimeChat_application 
/* In this real-time chat app  we create both a client file and a server file. 
Multiple clients can connect to the server, and when a client joins the chat,
it emits an event with (socket.emit)b Then server handles this event with (socket.io) and broadcasts it with (socket.broadcast.emit) to all the clients.
Similarly, when any client emits an event to the server, the server handles it and broadcasts it to all clients.
And when server emit an event to a client then he handle the error.


Here is the visual presentation how it works : =>
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

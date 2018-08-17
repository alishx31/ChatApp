const express=require('express');
const path= require('path');
const http=require('http');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage}= require('./utils/message')

var app = express();
var port= process.env.PORT||3000;
const publicPath = path.join(__dirname,'../public');
var server =http.createServer((app));
var io =socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
   console.log('New user connected');

   socket.on('createMessage',(message,callback)=>{
      console.log('createMessage',message);
      io.emit('newMessage',generateMessage(message.from,message.text));
       callback('This is from server');
    });

socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
});


socket.emit('newMessage',generateMessage('admin', 'welcome to the chat app'));
   
socket.broadcast.emit('newMessage',generateMessage('admin','new user joined'));

//    socket.emit('newEmail',{
//     from:'alex@gm.com',
//     text:'what you doing buddy',
//     createdAt:123 
//    });

//    socket.emit('newMessage',{
//     from:'alexanderServer@gmail.com',
//     text:'what you doing buddy',
//     createdAt: Date() 
//    });

//    socket.on('createEmail',(newEmail)=>{
//       console.log('createEmail', newEmail);
//    });

//    socket.on('createMessage',(message)=>{
//     console.log('this is message to server', message);
//  });

  socket.on('disconnect',()=>{
  console.log('that user disconnected');
  });
});

server.listen('3000',()=>{
    console.log(`start in port${port}`);
});
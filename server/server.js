const express=require('express');
const path= require('path');
const http=require('http');
const socketIO = require('socket.io');


var app = express();
var port= process.env.PORT||3000;
const publicPath = path.join(__dirname,'../public');
var server =http.createServer((app));
var io =socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
   console.log('New user connected');

   socket.on('createMessage',(message)=>{
      console.log('createMessage',message);
      io.emit('newMessage',{
          from:message.from,
          text:message.text,
          createdAt: new Date().getTime()
      });
   });

   socket.emit('newMessage',{
    from:'admin',
    text:'welcome to the chat app',
    createdAt: new Date().getTime()
});

socket.broadcast.emit('newMessage',{
    from:'admmin',
    text:'new user joined',
    createdAt:new Date().getTime()
})

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
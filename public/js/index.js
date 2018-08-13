var socket = io();

socket.on('connect',function (){
 console.log('Connected to server');

// socket.emit('createEmail',{
// to:'ale@gm.com',
// text:'hey this is jojo.'
// });

// socket.emit('createMessage',{
//     from:'alexclient@gmail.com',
//     text:'hey this is jojo.'
//     });
 

});
 
// socket.on('newEmail',function(email){
//  console.log('new Email arrived',email);
// });

socket.on('newMessage',function(Message){
    console.log('new message arrived',Message);
   });

   socket.on('disconnect',function (){
    console.log('Disconnect from server');
   });
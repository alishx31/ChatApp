var socket = io();

socket.on('connect',function (){
 console.log('Connected to server');

// socket.emit('createEmail',{
// to:'ale@gm.com',
// text:'hey this is jojo.'
// });

});
 
// socket.on('newEmail',function(email){
//  console.log('new Email arrived',email);
// });
socket.on('newLocationMessage',function(message){
  var li=jQuery('<li></li>');
  var a= jQuery('<a target="_blank">Users current location</a>');
  li.text(`${message.from}:`);
  a.attr('href',message.url);

  li.append(a);
  jQuery('#messages').append(li);

});

socket.on('newMessage',function(Message){
    console.log('new message arrived',Message);
    var li = jQuery('<li></li>');
    li.text(`${Message.from}: ${Message.text}`);

    jQuery('#messages').append(li);
   });

   socket.on('disconnect',function (){
    console.log('Disconnect from server');
   }); 

  //  socket.emit('createMessage',{
  //    from:'frank',
  //    text:'Hi'
  //  },function(data){
  //      console.log('heyyy',data);
  //  });

   jQuery('#message-form').on('submit',function(e){
     e.preventDefault();
      socket.emit('createMessage',{
       from:'User',
       text:jQuery('[name=message]').val()
      },function(){
                 jQuery('[name=message]').val('')
      });
   });

   var locationButton = jQuery('#send-location');
   locationButton.on('click',function(){
      if(!navigator.geolocation){
        return alert('Geolocation not supported');
      }
      navigator.geolocation.getCurrentPosition(function(position){
              
        console.log(position);
       socket.emit('createLocationMessage',{
         latitude: position.coords.latitude,
         longitude:position.coords.longitude
       })

      },function(){
             alert('unable to fetch location.');
      });
   });
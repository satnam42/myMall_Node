Satnam Here's 



for-setup follow below setup 

1) run npm i 
2) add data base url in config/default.json file
3) npm run start






to chat please call below event with given param

to send data use  emit socket  event
to receive data use on  socket  event

setup 1
socket.emit('set-user-data', userId);



//event to set room and join.
setup 2
socket.emit('set-room', {
    covsersatioFrom: userId ,<=== your user id,
    covsersatioTo: userid , <== To user id
});
//send messages.
setup 3
socket.emit('chat-msg', {
    msg: $('#myMsg').val(),
    sender: user id,
    date: Date.now()
});
setup 4
//receiving messages.
socket.on('chat-msg', function (data) {
    console.log("chat:", data)
    socket.emit('typing');
}

// typing evnet send.
socket.emit('typing');

// typing evnet recevie.
socket.on('typing', function (msg) {}



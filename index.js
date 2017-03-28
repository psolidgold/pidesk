express = require('express');  //web server
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);	//web socket server
rpio = require('rpio');

server.listen(5555); //start the webserver on port 5555
app.use(express.static('public')); //tell the server that ./public/ contains the static webpages
console.log("Starting express server at port: 5555");

rpio.open(11, rpio.OUTPUT, rpio.LOW); // open GPIO 11 for output
console.log('Pin 11 is currently set ' + (rpio.read(11) ? 'high' : 'low')); // log the status of GPIO 11

rpio.open(12, rpio.OUTPUT, rpio.LOW); // open GPIO 12 for output
console.log('Pin 12 is currently set ' + (rpio.read(12) ? 'high' : 'low')); // log the status of GPIO 12

io.sockets.on('connection', function (socket) { //gets called whenever a client connects
  socket.emit('status', {state: 'GOOD'}); //send the new client connection status

  socket.on('deskUp', function (data) { //makes the socket react to 'deskUp' packets by calling this function

    console.log('Move Desk Up!');

    rpio.write(11, rpio.HIGH);

    rpio.sleep(2); // Hack for now

    rpio.write(11, rpio.LOW);

    io.sockets.emit('status', { state: 'GOOD' }); //sends the updated status
  });

  socket.on('deskDown', function (data) { //makes the socket react to 'deskDown' packets by calling this function

    console.log('Move Desk Down!');

    rpio.write(12, rpio.HIGH);

    rpio.sleep(2); // Hack for now

    rpio.write(12, rpio.LOW);

    io.sockets.emit('status', { state: 'GOOD' }); //sends the updated status
  });

});
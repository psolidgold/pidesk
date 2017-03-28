var socket = io.connect();
var statusEl = document.getElementById('socketStatus');

socket.on('deskMoved', function (data) {
  statusEl.innerHTML = data.state;
});

function handleMoveDeskUp() {
  socket.emit('deskUp');
}

function handleMoveDeskDown() {
  socket.emit('deskDown');
}

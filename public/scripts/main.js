var socket = io.connect();
var statusEl = document.getElementById('socketStatus');

socket.on('status', function (data) {
  console.log('status', data);
  statusEl.innerHTML = data.state;
});

function handleMoveDeskUp() {
  socket.emit('deskUp');
}

function handleMoveDeskDown() {
  socket.emit('deskDown');
}

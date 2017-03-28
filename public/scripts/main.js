var socket = io.connect();
var upButtonEl = document.getElementById('deskUp');
var downButtonEl = document.getElementById('deskDown');
var statusEl = document.getElementById('socketStatus');

upButtonEl.onclick = handleMoveDeskUp;
downButtonEl.onclick = handleMoveDeskDown;

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

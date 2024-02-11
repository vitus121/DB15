const socket = new WebSocket(`ws://${window.location.hostname}:${window.location.port}`);

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    document.getElementById('counter').innerText = data.counter;
};

function incrementCounter() {
    socket.send('increment');
}

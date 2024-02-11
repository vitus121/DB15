const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 3000;

let counter = 0;

// Websocket-Verbindung herstellen
wss.on('connection', function connection(ws) {
    // Nachrichten vom Client empfangen
    ws.on('message', function incoming(message) {
        // Wenn eine Nachricht "increment" lautet, den Zähler inkrementieren
        if (message === 'increment') {
            counter++;
            // Aktualisierten Zählerwert an alle Clients senden
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ counter }));
                }
            });
        }
    });

    // Zählerwert an den neuen Client senden
    ws.send(JSON.stringify({ counter }));
});

app.use(express.static('public'));

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

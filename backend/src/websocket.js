const socket = require('socket.io')

exports.setupWebSocket = (server) => {
    const io = socket(server);
    io.on('connection', socket => {
        console.log(socket.id);
    })
}
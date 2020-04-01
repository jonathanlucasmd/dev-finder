import socketio from "socket.io-client"

const socket = socketio("http://192.168.0.107:3333", {
    autoConnect: false
});


function connect(){
    socket.connect();
}

function disconnect(){
    socket.disconnect();
}

export {
    connect,
    disconnect
}
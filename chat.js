let net = require("net");

let sockets = [];

let server = net.Server((socket) => {
    sockets.push(socket);
    socket.on('data', (d) => {
        for (let i=0; i< sockets.length; i++) {

            if (sockets[i] == socket){
                continue;
            } 
            //console.log(d)
            sockets[i].write(d);
        }
    });

    socket.on('end', () => {
        let sockid = sockets.indexOf(socket);
        sockets.splice(sockid, 1);
    });
});

server.listen(8000);
server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log("Sever Listening On Port : " + addr.port);
}

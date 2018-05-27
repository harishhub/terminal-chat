let net = require("net");

let sockets = [];

let server = net.Server((socket) => {
    sockets.push(socket);
    socket.on('data', (d) => {
        for (var i=0; i< sockets.length; i++) {

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

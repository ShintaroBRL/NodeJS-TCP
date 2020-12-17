var net = require('net');
var server = net.createServer();    
server.on('connection', handleConnection);

server.listen(9000, function() {    
    console.log('server listening to %j', server.address());  
});

var currentConnections = [];

function handleConnection(conn) {

    currentConnections[conn] = {connection: conn};

    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  
    console.log('\nnew client connection from %s', remoteAddress);
    conn.setEncoding('utf8');
    conn.on('data', onConnData);  
    conn.once('close', onConnClose);  
    conn.on('error', onConnError);

    function onConnData(d) {  
      console.log('connection data from %s: ', remoteAddress);
      console.log(JSON.parse(d))
      console.log('Current Connections: ')
      console.log(currentConnections)
    }

    function onConnClose() {  
      console.log('connection from %s closed\n', remoteAddress);
    }

    function onConnError(err) {  
      console.log('Connection %s error: %s', remoteAddress, err.message);  
    } 

}
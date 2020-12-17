var net = require('net');

var client = new net.Socket();

var player_data = {
    location:{
        room: 10,
        position:{
            x: 10,
            y: 20,
            z: 1
        },
        rotation:{
            x: 10,
            y: -3,
            z: 3
        }
    },
    player:{
        avatar: 1,
        life: 10,
        max_life: 10,
        coins: 100,
        armor:{
            head: 1,
            body: 2,
            legs: 1,
            boots: 3,
            weapon: 6
        }
    }
}

client.connect(9000, '127.0.0.1', function() {
	console.log('Connected');
	client.write(JSON.stringify(player_data));
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy();
});

client.on('close', function() {
	console.log('Connection closed');
});
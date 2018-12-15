var robot = require("robotjs");
var connect = require('connect');
var serveStatic = require('serve-static');
const WebSocket = require('ws');

robot.setKeyboardDelay(1);
const wss = new WebSocket.Server({ port: 1337 });

connect().use(serveStatic(__dirname+"/html")).listen(8080, function(){
    console.log('HTML Server is running');
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    //console.log('received: %s', message);
    var arr = message.split("");
    switch(arr[0]){
        case "1":
            robot.keyToggle(arr[1], "down")
        break
        case "0":
            robot.keyToggle(arr[1], "up")
        break
    }
  });
});
var robot = require("robotjs");
robot.setKeyboardDelay(1);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 1337 });

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
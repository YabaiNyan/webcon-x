var ws = new WebSocket('ws://' + window.location.hostname + ':1337');

var vol = {
    "l":-1,
    "r":-1,
}

var volprevdir = {
    "l":-1,
    "r":-1,
}

var voldict = {
    "l":["q","w"],
    "r":["o","p"]
}

var voldictinverse = {
    "l":["w","q"],
    "r":["p","o"]
}

var keydict = {
    "a": "d",
    "b": "f",
    "c": "j",
    "d": "k",
    "fxa": "c",
    "fxb": "m",
    "start": "1"
};


ws.onmessage = function (event) {
    console.log(event.data);
};

function btdown(key){
    ws.send("1"+keydict[key])
}

function btup(key){
    ws.send("0"+keydict[key])
}

function volup(key){
    ws.send("0"+voldict[key][volprevdir[key]])
}

function voldown(event, key){
    vol[key] = event.touches[0].clientX;
}

function vollmove(event, key){
    var direction = -1;
    var x = event.touches[0].clientX;
    if(x>vol[key]){
        direction = 1;
    }else if(x<vol[key]){
        direction = 0;
    }else{
        return;
    }
    if(direction != volprevdir[key]){
        ws.send("0"+voldictinverse[key][direction])
        ws.send("1"+voldict[key][direction])
        volprevdir[key] = direction
    }
}


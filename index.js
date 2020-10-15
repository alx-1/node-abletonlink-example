const path = require('path');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function(client){
    client.on('event', function(data){});
    client.on('disconnect', function(){});
});

const abletonlink = require('abletonlink');
const link = new abletonlink(bpm = 120.0, quantum = 8.0, enable = true);

(() => {
    let lastBeat = 0.0;
    link.quantum = 8.0;
    link.isLinkEnable = true;
    link.isPlayStateSync = true;
    link.enablePlayStateSync;
    
    var test = link.isPlayStateSync;
    console.log('test : '+test);
    
     link.startUpdate(8, (beat, phase, bpm, playState) => { // playState // changed update freq from 60 to 8
        beat = 0 ^ beat;
        if(0 < beat - lastBeat) {
            io.emit('beat', { beat, phase, bpm, playState }); // playState returns 'undefined' regardless
            lastBeat = beat;
            }
         numUsers = link.numPeers;
         io.emit('numUsers',{numUsers});
         test = link.isPlayStateSync;
         io.emit('test',{test});
    });
})()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on('connection', (socket) => {  // start listening from events from the socket upon connection
    console.log('a user connected');
    
    socket.on('chBPM', (data) => {
        console.log(data);
        console.log('current bpm : '+link.bpm);
        if (data > 0) {
            link.bpm++;
        } else {
            link.bpm--;
        }
        
        });
    });

server.listen(3000, () => {
    console.log("**** listen on localhost:3000 ****");
    console.log("access to http://localhost:3000/ !!");
});

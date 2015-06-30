var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 4001, origin: '*'})
var stream = require('websocket-pull-stream')

wss.on('connection', function(ws) {
  bcast(ws);

  ws.onmessage = function (msg) {
    console.log(msg.data[0]);
  }

});


function bcast(ws) {
  var sink = stream(ws)();

  var bright = stream.Source(function () {
    return function src(end, cb) {
      if (end) { return cb(end); }
      process.stdin.on('data', function (d) {
        if (d + '' !== 'bright\n') {return;}
        cb(null, Math.random());  
      }, 500);
    }
  })

  var stormy = stream.Source(function () {
    return function src(end, cb) {
      if (end) { return cb(end); }
      process.stdin.on('data', function (d) { 
        if (d + '' !== 'stormy\n') {return;}
        cb(null, Math.random());  
      }, 500);
    }
  })

  bright().pipe(sink.mux.channel(0));
  stormy().pipe(sink.mux.channel(1));
}




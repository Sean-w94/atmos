var pull = require('websocket-pull-stream');
var ws = new WebSocket('ws://localhost:4001');
var srv = pull(ws)();

module.exports = (scope, chan, map) => {
  if (typeof chan !== 'number') { 
    throw Error('must supply channel');
  }

  const sink = pull.Funnel(function (obj) {
    Object.assign(scope, obj);
    scope.update();
  });

  if (map instanceof Function) {
    return srv
      .demux.channel(chan)
      .pipe(pull.Tunnel(map)())
      .pipe(sink());
  }

  return srv
    .demux.channel(chan)
    .pipe(sink());
}

module.exports.write = (val, chan) => {
  if (typeof chan !== 'number') { 
    throw Error('must supply channel');
  }

  ws.send(new Uint8Array([chan, val]));
}

module.exports.srv = srv;
module.exports.pull = pull;

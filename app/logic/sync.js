var pull = require('websocket-pull-stream');
var ws = new WebSocket('ws://' + location.hostname + ':4001');
var srv = pull(ws)();
var uid = require('./uid')().split('').map((c) => c.charCodeAt(0));

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

module.exports.vote = (chan) => {
  if (typeof chan !== 'number') { 
    throw Error('must supply channel');
  }

  ws.send(new Uint8Array(uid.concat(chan)));
}

module.exports.srv = srv;
module.exports.pull = pull;

var ws = new WebSocket('ws://' + location.hostname + ':4001');
ws.binaryType = 'arraybuffer';

var uid = require('./uid')().split('').map((c) => c.charCodeAt(0));

module.exports = (scope, chan, map) => {
  if (typeof chan !== 'number') { 
    throw Error('must supply channel');
  }
  if (!(map instanceof Function)) {
    throw Error('must supply object mapper');
  }

  ws.addEventListener('message', function (e) {
    var data = new Uint8Array(e.data)
    var channel = data[0];
    if (chan !== channel) { return; }
    data = [].slice.call(data);
    data.shift()
    data = map(+data.map(c => String.fromCharCode(c)).join(''))
    Object.assign(scope, data);
    scope.update();
  })
}

module.exports.vote = (chan) => {
  if (typeof chan !== 'number') { 
    throw Error('must supply channel');
  }
  ws.send(new Uint8Array(uid.concat(chan)));
}


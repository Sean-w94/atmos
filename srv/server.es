const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 4001, origin: '*'})
const stream = require('websocket-pull-stream')
const enums = require('@atmos/config/enums.json');
const { EXCITED, NEUTRAL, BORED } = enums;

const stats = {
  excitement: {
    voters: new Set(),
    [EXCITED]: Object.create(null),
    [NEUTRAL]: Object.create(null),
    [BORED]: Object.create(null)
  },
  pace: {
    voters: new Set()
  },
  topics: {
    voters: new Set()
  }
};

const voteRanges = {
  excitement: BORED,
  pace: 5,
  topic: 8
}


const makeSource = stream.Source((stat) => {
  return function src(end, cb) {
    if (end) { return cb(end); }
    const area = areaOf(stat);
    if (!area) { return cb(end); }
    const voters = stats[area].voters;
    const subject = stats[area][stat];

    Object.observe(subject, () => {
      var votes = Object.keys(subject)
        .map(uid => subject[uid])
        .filter(Boolean).length;
      console.log(votes / voters.size)
      cb(null, votes / voters.size);
    });
  }
})

wss.on('connection', function(ws) {
  bcast(ws);

  ws.onmessage = function (msg) {
    msg = [].slice.call(toUint8Array(msg.data));
    var stat = msg.pop();
    var uid = msg.map(c => String.fromCharCode(c)).join('');
    registerVoter(uid, stat);

    Object.keys(enums)
      .map(st => enums[st])
      .forEach(n => { 
        stats[areaOf(n)][n][uid] = (n === stat)
      });
  }
});

function bcast(ws) {
  var sink = stream(ws)();

  Object.keys(enums).forEach((stat) => {
    makeSource(enums[stat]).pipe(sink.mux.channel(enums[stat]));
  })
}

function toUint8Array(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return view;
}


function registerVoter(uid, stat) {
  const area = areaOf(stat);
  return area && stats[area].voters.add(uid)
}

function areaOf(stat) {
  if (stat <= BORED) return 'excitement'
  if (stat <= 5) return 'pace'
  if (stat <= 8) return 'topic'  
}

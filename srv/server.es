const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 4001, origin: '*'})
const through = require('through2');
const stream = require('websocket-stream')
const chans = require('@atmos/config/chans.json');
const { EXCITED, NEUTRAL, BORED } = chans.excitement;
const { FAST, PERFECT, SLOW } = chans.pace;
const { TOPIC_A, TOPIC_B, TOPIC_C } = chans.topic;

const enums = Object.keys(chans).reduce((o, area) => {
  return Object.keys(chans[area]).reduce((o, stat) => {
    o[stat] = chans[area][stat];
    return o;
  }, o);
}, Object.create(null));

const stats = {
  excitement: {
    voters: new Set(),
    [EXCITED]: Object.create(null),
    [NEUTRAL]: Object.create(null),
    [BORED]: Object.create(null)
  },
  pace: {
    voters: new Set(),
    [FAST]: Object.create(null),
    [PERFECT]: Object.create(null),
    [SLOW]: Object.create(null)
  },
  topic: {
    voters: new Set(),
    [TOPIC_A]: Object.create(null),
    [TOPIC_B]: Object.create(null),
    [TOPIC_C]: Object.create(null)
  }
};

const voteRanges = {
  excitement: BORED,
  pace: SLOW,
  topic: 8
}

const percentages = {
  [EXCITED]: 0,
  [NEUTRAL]: 0,
  [BORED]: 0,
  [FAST]: 0,
  [PERFECT]: 0,
  [SLOW]: 0,
  [TOPIC_A]: 0,
  [TOPIC_B]: 0,
  [TOPIC_C]: 0
}

// var r = require('repl').start({
//   prompt: '> ',
//   input: process.stdin,
//   output: process.stdout,
// })

// r.context.stats = stats;
// r.context.percentages = percentages;


const makeSource = (stat) => {
  var init;
  var stream = through();

  const area = areaOf(stat);
  const voters = stats[area].voters;
  const subject = stats[area][stat];

  if (!init) {
    init = true;
    stream.push(percentages[stat]+'');
  }

  Object.observe(subject, changes => {
    if (!changes.length) { return; }

    var votes = Object.keys(subject)
      .map(uid => subject[uid])
      .filter(Boolean).length;

    percentages[stat] = (votes / voters.size || 0);

    stream.push(percentages[stat]+'');

  });

  return stream;
}

wss.on('connection', function(ws) {
  bcast(ws);

  ws.on('message', function (msg) {
    //only allow 8 byte messages (these are sync messages)
    if (msg.length !== 8) { return; }

    msg = [].slice.call(toUint8Array(msg));
    
    var stat = msg.pop();
    var uid = msg.map(c => String.fromCharCode(c)).join('');
    var area = areaOf(stat);
    registerVoter(uid, stat, area);

    Object.keys(stats[area])
      .forEach(n => {
        n = +n;
        if (isNaN(n)) {return;}
        stats[area][n][uid] = (n === stat)
      });
  })

});

function channel(chan) {
  return through(function (data, enc, cb) {
    const b = Buffer(1);
    b[0] = chan;
    this.push(Buffer.concat([b, data]))
    cb();
  })
}

function bcast(ws) {
  var sink = stream(ws);

  // Object.keys(enums).forEach((stat) => {
  //   console.log(enums[stat], stat);
  //   makeSource(enums[stat]).pipe(sink.mux.channel(enums[stat]));
  // })

  makeSource(EXCITED).pipe(channel(EXCITED)).pipe(sink)
  makeSource(NEUTRAL).pipe(channel(NEUTRAL)).pipe(sink)
  makeSource(BORED).pipe(channel(BORED)).pipe(sink)
  makeSource(FAST).pipe(channel(FAST)).pipe(sink)
  makeSource(PERFECT).pipe(channel(PERFECT)).pipe(sink)
  makeSource(SLOW).pipe(channel(SLOW)).pipe(sink)

  makeSource(TOPIC_A).pipe(channel(TOPIC_A)).pipe(sink)
  makeSource(TOPIC_B).pipe(channel(TOPIC_B)).pipe(sink)
  makeSource(TOPIC_C).pipe(channel(TOPIC_C)).pipe(sink)

}

function toUint8Array(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return view;
}


function registerVoter(uid, stat, area) {
  return area && stats[area].voters.add(uid)
}

function areaOf(stat) {
  if (stat <= voteRanges.excitement) return 'excitement'
  if (stat <= voteRanges.pace) return 'pace'
  if (stat <= voteRanges.topic) return 'topic'  
}

const transport = require('./lib/transport')
const {source, channel, sink} = require('./lib/conduit')
const {
  EXCITED, NEUTRAL, BORED,
  FAST, PERFECT, SLOW,
  TOPIC_A, TOPIC_B, TOPIC_C
} = require('./lib/enums')

transport(stream => {
  // register incoming votes
  stream.pipe(sink())

  // send votes out to all clients
  broadcast(stream)
})

function broadcast (stream) {
  // declarative ftw.
  source(EXCITED).pipe(channel(EXCITED)).pipe(stream)
  source(NEUTRAL).pipe(channel(NEUTRAL)).pipe(stream)
  source(BORED).pipe(channel(BORED)).pipe(stream)
  source(FAST).pipe(channel(FAST)).pipe(stream)
  source(PERFECT).pipe(channel(PERFECT)).pipe(stream)
  source(SLOW).pipe(channel(SLOW)).pipe(stream)
  source(TOPIC_A).pipe(channel(TOPIC_A)).pipe(stream)
  source(TOPIC_B).pipe(channel(TOPIC_B)).pipe(stream)
  source(TOPIC_C).pipe(channel(TOPIC_C)).pipe(stream)
}

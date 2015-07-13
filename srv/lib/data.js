const [fs, path] = [require('fs'), require('path')]
const {prim, hash} = require('./o')

const data = path.resolve(__dirname, '..', 'data')
const at = name => path.join(data, name + '.json')

if (!fs.existsSync(data)) fs.mkdirSync(data)

const {
  EXCITED, NEUTRAL, BORED,
  FAST, PERFECT, SLOW,
  TOPIC_A, TOPIC_B, TOPIC_C, TOPIC_D, TOPIC_E
} = require('./enums')


const voteRanges = Object.freeze({
  excitement: BORED,
  pace: SLOW,
  topic: TOPIC_E
})

const stats = fs.existsSync(at('stats')) ?
  Object.seal(require(at('stats'))) :
  Object.seal({
    excitement: {
      voters: new Set(),
      [EXCITED]: hash(),
      [NEUTRAL]: hash(),
      [BORED]: hash()
    },
    pace: {
      voters: new Set(),
      [FAST]: hash(),
      [PERFECT]: hash(),
      [SLOW]: hash()
    },
    topic: {
      voters: new Set(),
      [TOPIC_A]: hash(),
      [TOPIC_B]: hash(),
      [TOPIC_C]: hash(),
      [TOPIC_D]: hash(),
      [TOPIC_E]: hash()
    }
  })

Object.values(stats)
  .forEach(o => o.voters = new Set(o.voters))

const percentages = fs.existsSync(at('percentages')) ?
  Object.seal(require(at('percentages'))) :
  Object.seal({
    [EXCITED]: 0,
    [NEUTRAL]: 0,
    [BORED]: 0,
    [FAST]: 0,
    [PERFECT]: 0,
    [SLOW]: 0,
    [TOPIC_A]: 0,
    [TOPIC_B]: 0,
    [TOPIC_C]: 0,
    [TOPIC_D]: 0,
    [TOPIC_E]: 0
  })

function areaOf (stat) {
  if (stat <= voteRanges.excitement) return 'excitement'
  if (stat <= voteRanges.pace) return 'pace'
  if (stat <= voteRanges.topic) return 'topic'
}

function persist (opts = {object, name, depth: 0}) {
  const write = () => {
    // console.log('write')
    fs.writeFile(at(name), JSON.stringify(object))
  }

  const {object, name} = opts
  var {depth} = opts
  if (prim(object)) return
  Object.observe(object, write)
  if (!depth) return

  (function walk (obj, dep) {
    if (prim(obj)) return
    if (dep <= 0) return

    Object.values(obj).forEach(
      o => {
        if (prim(o)) return
        if (o instanceof Set) return
        Object.observe(o, write)
        walk(o, dep - 1)
      }
    )

  })(object, depth)

}

persist({object: stats, name: 'stats', depth: 2})
persist({object: percentages, name: 'percentages'})

module.exports = () => ({areaOf, stats, percentages})

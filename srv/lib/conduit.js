const through = require('through2')
const {areaOf, stats, percentages} = require('./data')()

const source = stat => {
  var init
  var stream = through()

  const area = areaOf(stat)
  const voters = stats[area].voters
  const subject = stats[area][stat]

  if (!init) {
    init = true
    stream.push(percentages[stat] + '')
  }

  Object.observe(subject, () => {
    const votes = Object.keys(subject)
      .map(uid => subject[uid])
      .filter(Boolean).length

    percentages[stat] = (votes / voters.size || 0)

    stream.push(percentages[stat] + '')

  })

  return stream
}

const channel = chan => {
  return through((data, enc, cb) => {
    const b = Buffer(1)
    b[0] = chan
    this.push(Buffer.concat([b, data]))
    cb()
  })
}

const sink = () => through((msg, _, cb) => {
  msg = Array.from(msg)

  const stat = msg.pop() //grab the channel
  const uid = msg.map(c => String.fromCharCode(c)).join('')
  const area = areaOf(stat)

  registerVoter(uid, stat, area)

  Object.keys(stats[area])
    .forEach(n => {
      n = +n
      if (isNaN(n)) return
      //undefined instead of false, so that 
      //properties are stripped when stringified
      //(deleting is bad for perf)
      stats[area][n][uid] = (n === stat) || undefined
    })

  cb()
})

function registerVoter (uid, stat, area) {
  return area && stats[area].voters.add(uid)
}

module.exports = {source, channel, sink}

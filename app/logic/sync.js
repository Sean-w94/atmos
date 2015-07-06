/* eslint-env node, browser */

const uid = require('./uid')().split('').map(c => c.charCodeAt(0))

var ws = wsab('ws://' + location.hostname + ':4001')
var reg = false

const chans = {}

const update = data => {

  console.log('raw', data)
  data = new Uint8Array(data)
  console.log('wrapped', data)
  const channel = data[0]
  console.log('channel', data)
  const {scope, map} = chans[channel]
  data = Array.from(data)
  data.shift()
  console.log('arrayed and shifted', data)
  data = map(+data.map(c => String.fromCharCode(c)).join(''))
  console.log('stringified', data)
  Object.assign(scope, data)
  scope.update()
  console.log(scope)
}

const recon = (attempt = 0) => {
  const factor = (attempt + 1) / 3
  const t = ~~(Math.random() * (2e3 * factor)) + 1e3 * factor
  setTimeout(() => {
    ws = wsab('ws://' + location.hostname + ':4001')
    ws.addEventListener('error', () => recon(attempt + 1))
    wsRdy(ws, attach)
  }, t)
}

const attach = () => {
  ws.addEventListener('close', () => recon())
  ws.addEventListener('message', e => update(e.data))
  reg = true
}

function wsRdy (sock, cb) {
  setTimeout(() => sock.readyState === 1 ? cb() : wsRdy(sock, cb)
    , 15)
}

function wsab (uri) {
  const ws = new WebSocket(uri)
  ws.binaryType = 'arraybuffer'
  return ws
}

module.exports = (chan, scope, map) => {
  if (!reg) attach()

  if (typeof chan !== 'number') throw Error('must supply channel')

  if (!(map instanceof Function)) throw Error('must supply object mapper')

  chans[chan] = {scope, map}
}

module.exports.vote = (chan) => {
  if (typeof chan !== 'number') throw Error('must supply channel')
  ws.send(new Uint8Array(uid.concat(chan)))
}

/* eslint-env node, browser */

const uid = require('./uid')().split('').map(c => c.charCodeAt(0))

var ws = wsab('ws://' + location.hostname + ':4001')
var reg = false

const chans = {}

const update = data => {

  data = new Uint8Array(data)
  const channel = data[0]
  const {scope, map} = chans[channel]
  data = Array.from(data)
  console.log(data)
  data.shift()
  data = map(+data.map(c => String.fromCharCode(c)).join(''))
  Object.assign(scope, data)
  scope.update()
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

function wsRdy (sock, cb, max = 10000) {
  setTimeout(max => sock.readyState === 1 ? cb() : max > 0 && wsRdy(sock, cb, max - 1)
    , 15, max)
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

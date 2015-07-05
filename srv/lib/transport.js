const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({port: 4001, origin: '*'})
const stream = require('websocket-stream')

module.exports = fn =>
  wss.on('connection', ws => fn(stream(ws)))

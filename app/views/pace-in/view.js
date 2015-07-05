const sync = require('../../logic/sync')
const chans = require('@atmos/config/chans.json')

const {FAST, PERFECT, SLOW} = chans.pace

module.exports = (scope) => {
  scope.fast = () => {
    sync.vote(FAST)
  }

  scope.perfect = () => {
    sync.vote(PERFECT)
  }

  scope.slow = () => {
    sync.vote(SLOW)
  }
}

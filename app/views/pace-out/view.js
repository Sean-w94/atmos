const sync = require('../../logic/sync')
const prefix = require('../../logic/prefix')()
const chans = require('@atmos/config/chans.json')

const {FAST, PERFECT, SLOW} = chans.pace

const weights = {
  fast: 100,
  perfect: 50,
  slow: 0
}

const map = (name) => (n) => {
  return {
    [name]: parseInt(n * 100, 10) + '%',
    ['_' + name]: n
  }
}

function combined (scope) {
  return (weights.fast * scope._fast) +
    (weights.perfect * scope._perfect) +
    (weights.slow * scope._slow)
}

module.exports = (scope) => {
  sync(FAST, scope, map('fast'))
  sync(PERFECT, scope, map('perfect'))
  sync(SLOW, scope, map('slow'))

  scope._fast = scope._perfect = scope._slow = 0

  scope.aggregate = () => {
    return Math.floor(combined(scope)) + '%'
  }

  scope.rotation = () => {
    const percent = combined(scope) / 100

    scope.max = (percent === 1)

    const total = (240 * percent) - 120

    return total + 'deg'
  }

  scope.prefix = prefix

}

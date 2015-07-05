const sync = require('../../logic/sync')
const chans = require('@atmos/config/chans.json')

const {EXCITED, NEUTRAL, BORED} = chans.excitement

const weights = {
  excited: 100,
  neutral: 50,
  bored: 0
}

const map = (name) => (n) => {
  return {
    [name]: parseInt(n * 100, 10) + '%',
    ['_' + name]: n
  }
}

function combined (scope) {
  return (weights.excited * scope._excited) +
    (weights.neutral * scope._neutral) +
    (weights.bored * scope._bored)
}

module.exports = (scope) => {
  sync(EXCITED, scope, map('excited'))
  sync(NEUTRAL, scope, map('neutral'))
  sync(BORED, scope, map('bored'))

  scope._excited = scope._neutral = scope._bored = 0

  scope.aggregate = () => {
    return Math.floor(combined(scope)) + '%'
  }

  // line height calc - 1em is 100%, 28em is 0%
  scope.top = () => {
    const max = 28
    const min = 1
    const percent = combined(scope) / 100
    const total = Math.abs(((max + min) * percent) - max)
    return total + 'em'
  }

  // scaled thermometer background gradient points
  scope.gradient = () => {
    const percent = combined(scope)
    const top = Math.abs(percent - 99)
    const mid = Math.abs(percent - 75)
    const btm = Math.abs(percent - 25)
    return `linear-gradient(to bottom, #fff 0%, #fff ${top}%, #f20004 ${mid}%, #c1032d ${btm}%, #a90329 100%)`
  }

}

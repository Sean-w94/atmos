const sync = require('../../logic/sync')
const support = require('../../logic/support')
const chans = require('@atmos/config/chans.json')

const {EXCITED, NEUTRAL, BORED} = chans.excitement

module.exports = (scope) => {

  scope.excited = () => {
    sync.vote(EXCITED)
  }

  scope.neutral = () => {
    sync.vote(NEUTRAL)
  }

  scope.bored = () => {
    sync.vote(BORED)
  }

  scope.fastcheck = (stat) => {
    cache(stat).checked = true
    scope[stat]()
  }

  scope.ext = support.svg() ? 'svg' : 'png'
  

}

function cache (stat) {
  return cache[stat] || (cache[stat] = document.getElementById('r-' + stat))
}

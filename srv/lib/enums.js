const {hash} = require('./o')
const chans = Object.freeze(require('@atmos/config/chans.json'))

module.exports = Object.freeze(
  Object.keys(chans).reduce((o, area) => {
    return Object.keys(chans[area]).reduce((o, stat) => {
      o[stat] = chans[area][stat]
      return o
    }, o)
  }, hash()))

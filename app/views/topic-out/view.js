const sync = require('../../logic/sync')
const chans = require('@atmos/config/chans.json')

const {TOPIC_A, TOPIC_B, TOPIC_C, TOPIC_D, TOPIC_E} = chans.topic

const map = (name) => (n) => {
  return {
    [name]: parseInt(n * 100, 10) + '%',
    ['_' + name]: n
  }
}

module.exports = (scope) => {
  sync(TOPIC_A, scope, map('topicA'))
  sync(TOPIC_B, scope, map('topicB'))
  sync(TOPIC_C, scope, map('topicC'))
  sync(TOPIC_D, scope, map('topicD'))
  sync(TOPIC_E, scope, map('topicE'))
}

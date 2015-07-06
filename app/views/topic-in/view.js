const sync = require('../../logic/sync')
const chans = require('@atmos/config/chans.json')

const {TOPIC_A, TOPIC_B, TOPIC_C, TOPIC_D, TOPIC_E} = chans.topic

module.exports = (scope) => {

  scope.topicA = () => sync.vote(TOPIC_A)

  scope.topicB = () => sync.vote(TOPIC_B)

  scope.topicC = () => sync.vote(TOPIC_C)

  scope.topicD = () => sync.vote(TOPIC_D)

  scope.topicE = () => sync.vote(TOPIC_E)

}

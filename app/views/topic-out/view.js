const sync = require('../../logic/sync');
const chans = require('@atmos/config/chans.json');

const {
  TOPIC_A,
  TOPIC_B,
  TOPIC_C
} = chans.topic;


const map = (name) => (n) => {
  return {
    [name]: parseInt(n * 100, 10) + '%',
    ['_' + name]: n
  };
}

module.exports = (scope) => {
  sync(scope, TOPIC_A, map('topicA'));
  sync(scope, TOPIC_B, map('topicB'));
  sync(scope, TOPIC_C, map('topicC'));
}

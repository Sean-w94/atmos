const sync = require('../../logic/sync');
const enums = require('@atmos/config/enums.json');

const {
  EXCITED,
  NEUTRAL,
  BORED
} = enums;

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
}
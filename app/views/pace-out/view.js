const sync = require('../../logic/sync');
const enums = require('@atmos/config/enums.json');

const {
  EXCITED,
  NEUTRAL,
  BORED
} = enums;

const map = (name) => (n) => ({[name]: parseInt(n * 100, 10) + '%'});

module.exports = (scope) => {
  sync(scope, EXCITED, map('excited'));
  sync(scope, NEUTRAL, map('neutral'));
  sync(scope, BORED, map('bored'));
}
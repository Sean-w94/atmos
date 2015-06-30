const sync = require('../../logic/sync');
const enums = require('@atmos/config/enums.json');

const {
  EXCITED,
  NEUTRAL,
  BORED
} = enums;

const weights = {
  excited: 100,
  neutral: 50,
  bored: 0
}

const map = (name, scope) => (n) => {
  return {
    [name]: parseInt(n * 100, 10) + '%',
    ['_' + name]: n
  };
}

module.exports = (scope) => {
  sync(scope, EXCITED, map('excited', scope));
  sync(scope, NEUTRAL, map('neutral', scope));
  sync(scope, BORED, map('bored', scope));

  scope.aggregate = () => {
    return (weights.excited * ~~(scope._excited)) + 
     (weights.neutral * ~~(scope._neutral)) +
     (weights.bored * ~~(scope._bored)) + '%'
  }

}

const sync = require('../../logic/sync');
const chans = require('@atmos/config/chans.json');

const {
  EXCITED,
  NEUTRAL,
  BORED
} = chans.excitement;

const weights = {
  excited: 100,
  neutral: 50,
  bored: 0
}

const map = (name) => (n) => {
  return {
    [name]: parseInt(n * 100, 10) + '%',
    ['_' + name]: n
  };
}

module.exports = (scope) => {
  sync(scope, EXCITED, map('excited'));
  sync(scope, NEUTRAL, map('neutral'));
  sync(scope, BORED, map('bored'));

  scope._excited = scope._neutral = scope._bored = 0;

  scope.aggregate = () => {
    return (weights.excited * scope._excited) + 
     (weights.neutral * scope._neutral) +
     (weights.bored * scope._bored) + '%'
  }

}

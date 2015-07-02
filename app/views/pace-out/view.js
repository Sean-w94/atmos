const sync = require('../../logic/sync');
const chans = require('@atmos/config/chans.json');

const {
  FAST,
  PERFECT,
  SLOW
} = chans.pace;

const weights = {
  fast: 100,
  perfect: 50,
  slow: 0
}

const map = (name) => (n) => {
  return {
    [name]: parseInt(n * 100, 10) + '%',
    ['_' + name]: n
  };
}

function combined(scope) {
  return (weights.fast * scope._fast) + 
    (weights.perfect * scope._perfect) +
    (weights.slow * scope._slow) 
}

module.exports = (scope) => {
  sync(scope, FAST, map('fast'));
  sync(scope, PERFECT, map('perfect'));
  sync(scope, SLOW, map('slow'));

  scope._fast = scope._perfect = scope._slow = 0;

  scope.aggregate = () => {
    return Math.floor(combined(scope)) + '%'
  }

  scope.rotation = () => {
    const max = 120;
    const min = -120;
    const percent = combined(scope)/100;

    scope.max = (percent === 1);

    const total = (240 * percent) - 120;

    return total + 'deg';
  }



}

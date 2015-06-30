const sync = require('../../logic/sync');

const [
  BRIGHT,
  STORMY
] = enums(2)

module.exports = function (scope) {
  sync(scope, BRIGHT, perc('bright'));
  sync(scope, STORMY, perc('stormy'));
}

function perc(name) {
  return function (n) {
    return {[name]: parseInt(n * 100, 10) + '%'}
  }
}


function enums(n) {
  return Array.apply(null, {length: n}).map(Number.call, Number)
}
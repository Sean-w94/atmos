const sync = require('../../logic/sync');

module.exports = (scope) => {
  scope.stormy = () => {
    sync.write(1, 1)
  }

  scope.bright = () => {
    sync.write(1, 0)
  }
}
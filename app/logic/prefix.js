const prefix = '-' + ([].slice
  .call(getComputedStyle(document.documentElement))
  .join('')
  .match(/-(moz|webkit|ms)-/)[1] || 'o') + '-';

module.exports = () => prefix;
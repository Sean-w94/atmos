/* eslint-env node, browser */

const riot = require('riot')

// polyfills/behaviour consistency
require('core-js/fn/set');
require('core-js/fn/array/from');
require('core-js/fn/object/assign')

require('fastclick')(document.body)
require('./logic/support').blackberry()


// views
require('./views/tabs')
require('./views/ctrl')

require('./views/excitement-in')
require('./views/excitement-out')

require('./views/pace-in')
require('./views/pace-out')

require('./views/topic-in')
require('./views/topic-out')

// mount
riot.mount('*')

// paging
require('./logic/paging')

// routing
const router = require('./logic/router')
const tabs = [
  document.querySelector('results'),
  document.querySelector('mood'),
]

const [results, mood] = tabs

/*eslint-disable */
router({
  results() { tab(results) },
  mood() { tab(mood) }
})
/*eslint-enable */

function tab (target) {
  tabs
    .filter(t => t !== target)
    .forEach(t => t.classList.add('hidden'))

  target.classList.remove('hidden')
}

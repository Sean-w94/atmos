//polyfills
require('object.assign').shim()

//views
require('./views/tabs')

require('./views/excitement-in')
require('./views/excitement-out')

require('./views/pace-in')
require('./views/pace-out')

//mount
require('riot').mount('*')

//routing
const router = require('./logic/router');
const tabs = [
  document.querySelector('results'),
  document.querySelector('mood')
]

const [results, mood] = tabs;


router({
  results() { tab(results); },
  mood () { tab(mood);  }
})

function tab(target) {
    tabs
      .filter(t => t !== target)
      .forEach(t => t.classList.add('hidden'))

    target.classList.remove('hidden');
}
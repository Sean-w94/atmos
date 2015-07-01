//polyfills
require('object.assign').shim()

//views
require('./views/tabs')
require('./views/ctrl')

require('./views/excitement-in')
require('./views/excitement-out')

require('./views/pace-in')
require('./views/pace-out')

require('./views/topic-in')
require('./views/topic-out')

require('./views/compose')


//mount
require('riot').mount('*')

//paging
require('./logic/paging')

//routing
const router = require('./logic/router');
const tabs = [
  document.querySelector('results'),
  document.querySelector('mood'),
  document.querySelector('beam')
]

const [results, mood, beam] = tabs;


router({
  results() { tab(results); },
  mood () { tab(mood);  },
  beam () { tab(beam); }
})

function tab(target) {
    tabs
      .filter(t => t !== target)
      .forEach(t => t.classList.add('hidden'))

    target.classList.remove('hidden');
}
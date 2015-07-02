const riot = require('riot')

//polyfills/behaviour consistency
require('object.assign').shim()
require('fastclick')(document.body);

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
riot.mount('*')

//paging
require('./logic/paging')

//routing
const router = require('./logic/router');
const tabs = [
  document.querySelector('results'),
  document.querySelector('mood'),
  document.querySelector('share')
]

const [results, mood, share] = tabs;


router({
  results() { tab(results); },
  mood () { tab(mood);  },
  share () { tab(share); }
})

function tab(target) {
    tabs
      .filter(t => t !== target)
      .forEach(t => t.classList.add('hidden'))

    target.classList.remove('hidden');
}

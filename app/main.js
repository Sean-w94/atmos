require('./views/menu')

require('./views/excitement-in')
require('./views/excitement-out')

require('riot').mount('*')

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
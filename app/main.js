require('./views/menu')
require('./views/results')
require('./views/mood')
require('riot').mount('*')

const router = require('./logic/router');
const views = [
  document.querySelector('results'),
  document.querySelector('mood')
]

const [results, mood] = views;


router({
  results() { tab(results); },
  mood () { tab(mood);  }
})

function tab(target) {
    views
      .filter(view => view !== target)
      .forEach(view => view.classList.add('hidden'))

    target.classList.remove('hidden');
}
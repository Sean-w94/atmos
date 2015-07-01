//polyfills
require('object.assign').shim()

//views
require('./views/tabs')

require('./views/excitement-in')
require('./views/excitement-out')

require('./views/pace-in')
require('./views/pace-out')

require('./views/topic-in')
require('./views/topic-out')


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


document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null; 
var app = document.querySelector('app'); 
var page = 0;                                                  

function handleTouchStart(evt) {                                         
  xDown = evt.touches[0].clientX;                                      
  yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
  if (!xDown || !yDown) return;

  var xUp = evt.touches[0].clientX;                                    
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) <= Math.abs(yDiff)) return;
  if (Math.abs(xDiff) < 15) return;

  var w = Math.max(document.documentElement.clientWidth, innerWidth || 0);
  page = (page >= 2) ? 0 : page + 1;

  if (xDiff > 0) {
    console.log('left swipe', xDiff)
    app.style.transform = 'translateX(-' + (w * page) + 'px)';
    return;
  } 
      
  console.log('right swipe', xDiff)
  app.style.transform = 'translateX(' + (w * page) + 'px)';
  
  /* reset values */
  xDown = null;
  yDown = null;                                             
};
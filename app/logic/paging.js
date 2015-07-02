exports.next = next;
exports.prev = prev;

const prefix = require('./prefix')()
const app = document.querySelector('app'); 

var xDown = null;                                                        
var yDown = null; 
var page = 0;                                                  
var swiping = false;


document.addEventListener('touchstart', start, false);        
document.addEventListener('touchmove', move, false);
document.addEventListener('touchend', end, false);


function start(evt) {
  xDown = evt.touches[0].clientX;                                      
  yDown = evt.touches[0].clientY;                                      
}
function end() {
  swiping = false;
}                                          

function move(evt) {
  
  if (!matchMedia("(max-width: 48em)").matches) return;

  evt.preventDefault();  

  if (swiping) return; 
  if (!xDown) return;

  const xUp = evt.touches[0].clientX;                                    
  const yUp = evt.touches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if (Math.abs(xDiff) <= Math.abs(yDiff)) return;
  if (Math.abs(xDiff) < 60) return;
  swiping = true;

  xDown = null;
  yDown = null;   

  if (xDiff > 0) return next();
  prev();
                                 
};

function next() {
  if (page >= 2) return;

  // const w = Math.max(document.documentElement.clientWidth, innerWidth || 0);
  page += 1;
  app.style[prefix + 'transition'] = prefix + 'transform 300ms';
  app.style[prefix + 'transform'] = 'translateX(-' + (100 * page) + 'vw)';
  console.log(app.style)
  setTimeout(()=>(app.style[prefix + 'transition'] = ''), 310)
}

function prev() {
  if (page <= 0) return;
  // const w = Math.max(document.documentElement.clientWidth, innerWidth || 0);
  page -= 1;
  app.style[prefix + 'transition'] = prefix + 'transform 300ms';
  app.style[prefix + 'transform'] = 'translateX(-' + (100 * page) + 'vw)';
  setTimeout(()=>(app.style[prefix + 'transition'] = ''), 310)

}

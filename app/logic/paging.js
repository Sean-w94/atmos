exports.next = next;
exports.prev = prev;

var app = document.querySelector('app'); 

app.addEventListener('touchstart', start, false);        
app.addEventListener('touchmove', move, false);
app.addEventListener('touchend', end, false);

var xDown = null;                                                        
var yDown = null; 
var page = 0;                                                  
var swiping = false;
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
  if (!xDown || !yDown) return;

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
  const w = Math.max(document.documentElement.clientWidth, innerWidth || 0);
  page += 1;
  app.style.transform = 'translateX(-' + (w * page) + 'px)';
}

function prev() {
  if (page <= 0) return;
  const w = Math.max(document.documentElement.clientWidth, innerWidth || 0);
  page -= 1;
  app.style.transform = 'translateX(-' + (w * page) + 'px)';
}

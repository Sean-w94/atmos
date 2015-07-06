const ua = navigator.userAgent;


module.exports = () => {
  if (!(~ua.indexOf("BlackBerry") && ~ua.indexOf("WebKit"))) return

  document.documentElement.className = 
    document.documentElement.className + ' blackberry'
}
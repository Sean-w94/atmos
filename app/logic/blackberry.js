const ua = navigator.userAgent;

module.exports = () => {
  if (!~ua.indexOf("BB10")) return

  document.documentElement.className = 
    document.documentElement.className + ' blackberry'
}
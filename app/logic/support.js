const ua = navigator.userAgent;

const bb10 = !!~ua.indexOf("BB10")

module.exports.blackberry = () => {
  if (bb10) document.documentElement.className += ' blackberry'
}

module.exports.svg = () => {
  const el = document.createElement('div');
  const svg = el.nodeName.toLowerCase() === 'svg';
  return bb10 ? false : svg;
}
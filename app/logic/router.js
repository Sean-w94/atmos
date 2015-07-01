const riot = require('riot');

module.exports = (routes = {}) => {

  riot.route(function (...path) {
    path = path.filter(s => s.length);
    path = path[0];

    if (routes[path] instanceof Function) {
     routes[path]();
   }
  })

  riot.route(location.hash.split('#')[1] || 'mood');

}
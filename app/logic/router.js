const riot = require('riot');

module.exports = (routes = {}) => {

  riot.route(function (...path) {
    path = path.filter(s => s.length);
    path = path[0];

    ;['mood', 'results'].forEach((item) => {
      document.body.classList.remove(item);
    });

    document.body.classList.add(path);

    if (routes[path] instanceof Function) {
     routes[path]();
    }

  })

  riot.route(location.hash.split('#')[1] || 'mood');

}
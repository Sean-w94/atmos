const riot = require('riot');

module.exports = (routes = {}) => {

  riot.route(function (...path) {
    path = path.filter(s => s.length);
    const base = path[0];

    ;['mood', 'results'].forEach((item) => {
      document.body.classList.remove(item);
    });

    document.body.classList.add(base);

    if (routes[base] instanceof Function) {
     routes[base]();
    }

  })

  riot.route(location.hash.split('#')[1] || 'mood');

}
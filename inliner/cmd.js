#!/usr/bin/env node

var through = require('through2')
var jsdom = require('jsdom-little');
var fs = require('fs');
var path  = require('path');
var argv = process.argv.slice(2);


if (!argv.length) {
  throw Error('missing filename arg');
}

if (!fs.existsSync(argv[0])) {
  throw Error('file does not exist');
}

jsdom.env(fs.readFileSync(path.join(process.cwd(), argv[0])), function (err, window) {
  var document = window.document;
  var style = document.createElement('style');;
  var inline = through(function (data, enc, cb) {
    style.innerHTML += data + '';
    cb();
  })
  var head = document.head;

  document.head.appendChild(style);

  [].slice.call(head.querySelectorAll('link'))
    .forEach(function (link) {
      if (link.getAttribute('rel') !== 'stylesheet') {return;}
      head.removeChild(link)
    })

  process.stdin.pipe(inline);

  inline.on('finish', function () {
    process.stdout.write('<!doctype html>\n' + document.documentElement.outerHTML);
  })
});



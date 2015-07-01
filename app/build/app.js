(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";var riot=require("riot");module.exports=function(){var r=void 0===arguments[0]?{}:arguments[0];riot.route(function(){for(var t=arguments.length,n=Array(t),o=0;t>o;o++)n[o]=arguments[o];n=n.filter(function(r){return r.length}),n=n[0],r[n]instanceof Function&&r[n]()}),riot.route("mood")};
},{"riot":13}],2:[function(require,module,exports){
"use strict";var ws=new WebSocket("ws://"+location.hostname+":4001");ws.binaryType="arraybuffer";var uid=require("./uid")().split("").map(function(r){return r.charCodeAt(0)});module.exports=function(r,e,t){if("number"!=typeof e)throw Error("must supply channel");if(!(t instanceof Function))throw Error("must supply object mapper");ws.addEventListener("message",function(n){var o=new Uint8Array(n.data),a=o[0];e===a&&(o=[].slice.call(o),o.shift(),o=t(+o.map(function(r){return String.fromCharCode(r)}).join("")),Object.assign(r,o),r.update())})},module.exports.vote=function(r){if("number"!=typeof r)throw Error("must supply channel");ws.send(new Uint8Array(uid.concat(r)))};
},{"./uid":3}],3:[function(require,module,exports){
"use strict";module.exports=function(){return localStorage.uid=localStorage.uid||Math.random().toString(35).substr(2,7),localStorage.uid};
},{}],4:[function(require,module,exports){
"use strict";function tab(t){tabs.filter(function(e){return e!==t}).forEach(function(t){return t.classList.add("hidden")}),t.classList.remove("hidden")}require("object.assign").shim(),require("./views/tabs"),require("./views/excitement-in"),require("./views/excitement-out"),require("./views/pace-in"),require("./views/pace-out"),require("riot").mount("*");var router=require("./logic/router"),tabs=[document.querySelector("results"),document.querySelector("mood")],results=tabs[0],mood=tabs[1];router({results:function(t){var e=function(){return t.apply(this,arguments)};return e.toString=function(){return t.toString()},e}(function(){tab(results)}),mood:function(t){var e=function(){return t.apply(this,arguments)};return e.toString=function(){return t.toString()},e}(function(){tab(mood)})});
},{"./logic/router":1,"./views/excitement-in":15,"./views/excitement-out":17,"./views/pace-in":19,"./views/pace-out":21,"./views/tabs":23,"object.assign":8,"riot":13}],5:[function(require,module,exports){
module.exports={"excitement":{"EXCITED":0,"NEUTRAL":1,"BORED":2},"pace":{"FAST":3,"PERFECT":4,"SLOW":5},"topic":{}}
},{}],6:[function(require,module,exports){
module.exports=[{"href":"#mood","name":"Mood"},{"href":"#results","name":"Results"}]
},{}],7:[function(require,module,exports){
var keys=require("object-keys");module.exports=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var e={},t=Symbol("test");if("string"==typeof t)return!1;if(t instanceof Symbol)return!1;e[t]=42;for(t in e)return!1;if(0!==keys(e).length)return!1;if("function"==typeof Object.keys&&0!==Object.keys(e).length)return!1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(e).length)return!1;var r=Object.getOwnPropertySymbols(e);if(1!==r.length||r[0]!==t)return!1;if(!Object.prototype.propertyIsEnumerable.call(e,t))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var n=Object.getOwnPropertyDescriptor(e,t);if(42!==n.value||n.enumerable!==!0)return!1}return!0};
},{"object-keys":11}],8:[function(require,module,exports){
"use strict";var keys=require("object-keys"),canBeObject=function(e){return"undefined"!=typeof e&&null!==e},hasSymbols=require("./hasSymbols")(),defineProperties=require("define-properties"),toObject=Object,push=Array.prototype.push,propIsEnumerable=Object.prototype.propertyIsEnumerable,assignShim=function(e,t){if(!canBeObject(e))throw new TypeError("target must be an object");var r,s,n,i,o,a=toObject(e);for(r=1;r<arguments.length;++r){if(s=toObject(arguments[r]),i=keys(s),hasSymbols&&Object.getOwnPropertySymbols)for(o=Object.getOwnPropertySymbols(s),n=0;n<o.length;++n)propIsEnumerable.call(s,o[n])&&push.call(i,o[n]);for(n=0;n<i.length;++n)a[i[n]]=s[i[n]]}return a};defineProperties(assignShim,{shim:function(){var e=function(){if(!Object.assign||!Object.preventExtensions)return!1;var e=Object.preventExtensions({1:2});try{Object.assign(e,"xy")}catch(t){return"y"===e[1]}};return defineProperties(Object,{assign:assignShim},{assign:e}),Object.assign||assignShim}}),module.exports=assignShim;
},{"./hasSymbols":7,"define-properties":9,"object-keys":11}],9:[function(require,module,exports){
"use strict";var keys=require("object-keys"),foreach=require("foreach"),toStr=Object.prototype.toString,isFunction=function(e){return"function"==typeof e&&"[object Function]"===toStr.call(e)},arePropertyDescriptorsSupported=function(){var e={};try{return Object.defineProperty(e,"x",{value:e}),e.x===e}catch(r){return!1}},supportsDescriptors=Object.defineProperty&&arePropertyDescriptorsSupported(),defineProperty=function(e,r,t,o){(!(r in e)||isFunction(o)&&o())&&(supportsDescriptors?Object.defineProperty(e,r,{configurable:!0,enumerable:!1,writable:!0,value:t}):e[r]=t)},defineProperties=function(e,r){var t=arguments.length>2?arguments[2]:{};foreach(keys(r),function(o){defineProperty(e,o,r[o],t[o])})};defineProperties.supportsDescriptors=!!supportsDescriptors,module.exports=defineProperties;
},{"foreach":10,"object-keys":11}],10:[function(require,module,exports){
var hasOwn=Object.prototype.hasOwnProperty,toString=Object.prototype.toString;module.exports=function(t,r,o){if("[object Function]"!==toString.call(r))throw new TypeError("iterator must be a function");var e=t.length;if(e===+e)for(var n=0;e>n;n++)r.call(o,t[n],n,t);else for(var a in t)hasOwn.call(t,a)&&r.call(o,t[a],a,t)};
},{}],11:[function(require,module,exports){
"use strict";var has=Object.prototype.hasOwnProperty,toStr=Object.prototype.toString,slice=Array.prototype.slice,isArgs=require("./isArguments"),hasDontEnumBug=!{toString:null}.propertyIsEnumerable("toString"),hasProtoEnumBug=function(){}.propertyIsEnumerable("prototype"),dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],keysShim=function(t){var r=null!==t&&"object"==typeof t,e="[object Function]"===toStr.call(t),o=isArgs(t),n=r&&"[object String]"===toStr.call(t),s=[];if(!r&&!e&&!o)throw new TypeError("Object.keys called on a non-object");var u=hasProtoEnumBug&&e;if(n&&t.length>0&&!has.call(t,0))for(var i=0;i<t.length;++i)s.push(String(i));if(o&&t.length>0)for(var c=0;c<t.length;++c)s.push(String(c));else for(var l in t)u&&"prototype"===l||!has.call(t,l)||s.push(String(l));if(hasDontEnumBug)for(var a=t.constructor,p=a&&a.prototype===t,h=0;h<dontEnums.length;++h)p&&"constructor"===dontEnums[h]||!has.call(t,dontEnums[h])||s.push(dontEnums[h]);return s};keysShim.shim=function(){if(Object.keys){var t=function(){return 2===(Object.keys(arguments)||"").length}(1,2);if(!t){var r=Object.keys;Object.keys=function(t){return r(isArgs(t)?slice.call(t):t)}}}else Object.keys=keysShim;return Object.keys||keysShim},module.exports=keysShim;
},{"./isArguments":12}],12:[function(require,module,exports){
"use strict";var toStr=Object.prototype.toString;module.exports=function(t){var e=toStr.call(t),o="[object Arguments]"===e;return o||(o="[object Array]"!==e&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===toStr.call(t.callee)),o};
},{}],13:[function(require,module,exports){
!function(t){"use strict";function e(t){var e=$(0),n=t.slice(e.length).match(/\s*(\S+?)\s*(?:,\s*(\S)+)?\s+in\s+(.+)/);return n?{key:n[1],pos:n[2],val:e+n[3]}:{val:t}}function n(t,e,n){var r={};return r[t.key]=e,t.pos&&(r[t.pos]=n),r}function r(t,r,i){p(t,"each");var o,a=t.outerHTML,c=t.parentNode,f=document.createComment("riot placeholder"),s=[],l=N(t);c.insertBefore(f,t),i=e(i),r.one("premount",function(){c.stub&&(c=r.root),t.parentNode.removeChild(t)}).on("update",function(){var e,p=B(i.val,r);if(!k(p)){if(e=o,o=p?JSON.stringify(p):"",o===e)return;p=p?Object.keys(p).map(function(t){return n(i,t,p[t])}):[]}for(var d=document.createDocumentFragment(),m=s.length,v=p.length;m>v;)s[--m].unmount();for(s.length=v,e=!o&&!!i.key,m=0;v>m;++m){var h=e?n(i,p[m],m):p[m];s[m]||((s[m]=new u({tmpl:a},{parent:r,isLoop:!0,root:c,item:h})).mount(),d.appendChild(s[m].root)),s[m]._item=h,s[m].update(h)}c.insertBefore(d,f),l&&(r.tags[g(t)]=s)}).one("updated",function(){var t=Object.keys(r);h(c,function(e){1!=e.nodeType||e.isLoop||e._looped||(e._visited=!1,e._looped=!0,C(e,r,t))})})}function i(t,e,n){h(t,function(t){if(1==t.nodeType){t.isLoop=t.parentNode&&t.parentNode.isLoop||t.getAttribute("each")?1:0;var r=N(t);if(r&&!t.isLoop){for(var i,o=new u(r,{root:t,parent:e},t.innerHTML),a=g(t),c=e;!N(c.root)&&c.parent;)c=c.parent;o.parent=c,i=c.tags[a],i?(k(i)||(c.tags[a]=[i]),c.tags[a].push(o)):c.tags[a]=o,t.innerHTML="",n.push(o)}t.isLoop||C(t,e,[])}})}function o(t,e,n){function i(t,e,r){if(e.indexOf($(0))>=0){var i={dom:t,expr:e};n.push(m(i,r))}}h(t,function(t){var n=t.nodeType;if(3==n&&"STYLE"!=t.parentNode.tagName&&i(t,t.nodeValue),1==n){var o=t.getAttribute("each");return o?(r(t,e,o),!1):(s(t.attributes,function(e){var n=e.name,r=n.split("__")[1];return i(t,e.value,{attr:r||n,bool:r}),r?(p(t,n),!1):void 0}),N(t)?!1:void 0)}})}function u(t,e,n){function r(){s(T.attributes,function(t){l[t.name]=B(t.value,g||c)}),s(Object.keys(N),function(t){l[t]=B(N[t],g||c)})}function u(t){if(s(C,function(e){e[t?"mount":"unmount"]()}),g){var e=t?"on":"off";h?g[e]("unmount",c.unmount):g[e]("update",c.update)[e]("unmount",c.unmount)}}var a,c=S.observable(this),l=_(e.opts)||{},p=v(t.tmpl),g=e.parent,h=e.isLoop,y=e.item,L=[],C=[],T=e.root,M=t.fn,x=T.tagName.toLowerCase(),N={},A=/([\w\-]+)\s?=\s?['"]([^'"]+)["']/gim;if(M&&T._tag&&T._tag.unmount(!0),this.isMounted=!1,t.attrs){var H=t.attrs.match(A);s(H,function(t){var e=t.split(/\s?=\s?/);T.setAttribute(e[0],e[1].replace(/['"]/g,""))})}T._tag=this,this._id=d(~~((new Date).getTime()*Math.random())),m(this,{parent:g,root:T,opts:l,tags:{}},y),s(T.attributes,function(t){var e=t.value;$(/\{.*\}/).test(e)&&(N[t.name]=e)}),p.innerHTML&&!/select|select|optgroup|tbody|tr/.test(x)&&(p.innerHTML=w(p.innerHTML,n)),this.update=function(t){m(c,t),r(),c.trigger("update",t),f(L,c,t),c.trigger("updated")},this.mixin=function(){s(arguments,function(t){t="string"==typeof t?S.mixin(t):t,s(Object.keys(t),function(e){"init"!=e&&(c[e]="function"==typeof t[e]?t[e].bind(c):t[e])}),t.init&&t.init.bind(c)()})},this.mount=function(){if(r(),M&&M.call(c,l),u(!0),o(p,c,L),c.parent||c.update(),c.trigger("premount"),h)c.root=T=a=p.firstChild;else{for(;p.firstChild;)T.appendChild(p.firstChild);T.stub&&(c.root=T=g.root)}!c.parent||c.parent.isMounted?(c.isMounted=!0,c.trigger("mount")):c.parent.one("mount",function(){b(c.root)||(c.parent.isMounted=c.isMounted=!0,c.trigger("mount"))})},this.unmount=function(t){var e=a||T,n=e.parentNode;if(n){if(g)k(g.tags[x])?s(g.tags[x],function(t,e){t._id==c._id&&g.tags[x].splice(e,1)}):g.tags[x]=void 0;else for(;e.firstChild;)e.removeChild(e.firstChild);t||n.removeChild(e)}c.trigger("unmount"),u(),c.off("*"),T._tag=null},i(p,this,C)}function a(e,n,r,i,o){r[e]=function(e){e=e||t.event,e.which||(e.which=e.charCode||e.keyCode),e.target||(e.target=e.srcElement);try{e.currentTarget=r}catch(u){}if(e.item=i._item?i._item:o,n.call(i,e)===!0||/radio|check/.test(r.type)||(e.preventDefault&&e.preventDefault(),e.returnValue=!1),!e.preventUpdate){var a=o?i.parent:i;a.update()}}}function c(t,e,n){t&&(t.insertBefore(n,e),t.removeChild(e))}function f(t,e,n){s(t,function(t,r){var i=t.dom,o=t.attr,u=B(t.expr,e),f=t.dom.parentNode;if(null==u&&(u=""),f&&"TEXTAREA"==f.tagName&&(u=u.replace(/riot-/g,"")),t.value!==u){if(t.value=u,!o)return i.nodeValue=u.toString();if(p(i,o),"function"==typeof u)a(o,u,i,e,n);else if("if"==o){var s=t.stub;u?s&&(c(s.parentNode,s,i),i.inStub=!1,b(i)||h(i,function(t){t._tag&&!t._tag.isMounted&&(t._tag.isMounted=!!t._tag.trigger("mount"))})):(s=t.stub=s||document.createTextNode(""),c(i.parentNode,i,s),i.inStub=!0)}else if(/^(show|hide)$/.test(o))"hide"==o&&(u=!u),i.style.display=u?"":"none";else if("value"==o)i.value=u;else if("riot-"==o.slice(0,5)&&"riot-tag"!=o)o=o.slice(5),u?i.setAttribute(o,u):p(i,o);else{if(t.bool){if(i[o]=u,!u)return;u=o}"object"!=typeof u&&i.setAttribute(o,u)}}})}function s(t,e){for(var n,r=0,i=(t||[]).length;i>r;r++)n=t[r],null!=n&&e(n,r)===!1&&r--;return t}function l(t){return"function"==typeof t||!1}function p(t,e){t.removeAttribute(e)}function d(t){return(t^t>>31)-(t>>31)}function g(t){var e=N(t),n=t.getAttribute("name"),r=n&&n.indexOf($(0))<0?n:e.name;return r}function m(t){for(var e,n=arguments,r=1;r<n.length;++r)if(e=n[r])for(var i in e)t[i]=e[i];return t}function v(t){var e=O&&10>O,n=/^\s*<([\w-]+)/.exec(t),r=n?n[1].toLowerCase():"",i="th"===r||"td"===r?"tr":"tr"===r?"tbody":"div",o=y(i);return o.stub=!0,e&&("optgroup"===r?x(o,t):"option"===r?M(o,t):"div"!==i?T(o,t,r):e=0),e||(o.innerHTML=t),o}function h(t,e){if(t)if(e(t)===!1)h(t.nextSibling,e);else for(t=t.firstChild;t;)h(t,e),t=t.nextSibling}function b(t){for(;t;){if(t.inStub)return!0;t=t.parentNode}return!1}function y(t){return document.createElement(t)}function w(t,e){return t.replace(/<(yield)\/?>(<\/\1>)?/gim,e||"")}function L(t,e){return(e||document).querySelectorAll(t)}function _(t){function e(){}return e.prototype=t,new e}function C(t,e,n){s(t.attributes,function(r){if(!t._visited&&("id"===r.name||"name"===r.name)){t._visited=!0;var i,o=r.value;if(~n.indexOf(o))return;i=e[o],i?k(i)?i.push(t):e[o]=[i,t]:e[o]=t}})}function T(t,e,n){var r,i=y("div"),o=/td|th/.test(n)?3:2;for(i.innerHTML="<table>"+e+"</table>",r=i.firstChild;o--;)r=r.firstChild;t.appendChild(r)}function M(t,e){var n=y("option"),r=/value=[\"'](.+?)[\"']/,i=/selected=[\"'](.+?)[\"']/,o=/each=[\"'](.+?)[\"']/,u=/if=[\"'](.+?)[\"']/,a=/>([^<]*)</,c=e.match(r),f=e.match(i),s=e.match(a),l=e.match(o),p=e.match(u);s?n.innerHTML=s[1]:n.innerHTML=e,c&&(n.value=c[1]),f&&n.setAttribute("riot-selected",f[1]),l&&n.setAttribute("each",l[1]),p&&n.setAttribute("if",p[1]),t.appendChild(n)}function x(t,e){var n=y("optgroup"),r=/label=[\"'](.+?)[\"']/,i=/^<([^>]*)>/,o=/^<([^ \>]*)/,u=e.match(r),a=e.match(i),c=e.match(o),f=e;if(a){var s=e.slice(a[1].length+2,-c[1].length-3).trim();f=s}if(u&&n.setAttribute("riot-label",u[1]),f){var l=y("div");M(l,f),n.appendChild(l.firstChild)}t.appendChild(n)}function N(t){return R[t.getAttribute(V)||t.tagName.toLowerCase()]}function A(t){if(F=F||y("style"),document.head){if(F.styleSheet?F.styleSheet.cssText+=t:F.innerHTML+=t,!F._rendered)if(F.styleSheet)document.body.appendChild(F);else{var e=L("style[type=riot]")[0];e?(e.parentNode.insertBefore(F,e),e.parentNode.removeChild(e)):document.head.appendChild(F)}F._rendered=!0}}function H(t,e,n){var r=R[e],i=t._innerHTML=t._innerHTML||t.innerHTML;return t.innerHTML="",r&&t&&(r=new u(r,{root:t,opts:n},i)),r&&r.mount?(r.mount(),D.push(r),r.on("unmount",function(){D.splice(D.indexOf(r),1)})):void 0}var S={version:"v2.2.1",settings:{}},j="string",E="object",k=Array.isArray||function(){var t=Object.prototype.toString;return function(e){return"[object Array]"===t.call(e)}}(),O=function(t){return 0|(t&&t.document||{}).documentMode}(t);S.observable=function(t){t=t||{};var e={},n=0;return t.on=function(r,i){return l(i)&&(i._id="undefined"==typeof i._id?n++:i._id,r.replace(/\S+/g,function(t,n){(e[t]=e[t]||[]).push(i),i.typed=n>0})),t},t.off=function(n,r){return"*"==n?e={}:n.replace(/\S+/g,function(t){if(r)for(var n,i=e[t],o=0;n=i&&i[o];++o)n._id==r._id&&(i.splice(o,1),o--);else e[t]=[]}),t},t.one=function(e,n){function r(){t.off(e,r),n.apply(t,arguments)}return t.on(e,r)},t.trigger=function(n){for(var r,i=[].slice.call(arguments,1),o=e[n]||[],u=0;r=o[u];++u)r.busy||(r.busy=1,r.apply(t,r.typed?[n].concat(i):i),o[u]!==r&&u--,r.busy=0);return e.all&&"all"!=n&&t.trigger.apply(t,["all",n].concat(i)),t},t},S.mixin=function(){var t={};return function(e,n){return n?void(t[e]=n):t[e]}}(),function(t,e,n){function r(){return a.href.split("#")[1]||""}function i(t){return t.split("/")}function o(t){t.type&&(t=r()),t!=u&&(c.trigger.apply(null,["H"].concat(i(t))),u=t)}if(n){var u,a=n.location,c=t.observable(),f=n,s=!1,l=t.route=function(t){t[0]?(a.hash=t,o(t)):c.on("H",t)};l.exec=function(t){t.apply(null,i(r()))},l.parser=function(t){i=t},l.stop=function(){s&&(f.removeEventListener?f.removeEventListener(e,o,!1):f.detachEvent("on"+e,o),c.off("*"),s=!1)},l.start=function(){s||(f.addEventListener?f.addEventListener(e,o,!1):f.attachEvent("on"+e,o),s=!0)},l.start()}}(S,"hashchange",t);var F,$=function(t){var e,n,r,i=/[{}]/g;return function(o){var u=S.settings.brackets||t;return e!==u&&(e=u,r=u.split(" "),n=r.map(function(t){return t.replace(/(?=.)/g,"\\")})),o instanceof RegExp?u===t?o:new RegExp(o.source.replace(i,function(t){return n[~~("}"===t)]}),o.global?"g":""):r[o]}}("{ }"),B=function(){function e(t,e){return t=(t||$(0)+$(1)).replace($(/\\{/g),"￰").replace($(/\\}/g),"￱"),e=i(t,o(t,$(/{/),$(/}/))),new Function("d","return "+(e[0]||e[2]||e[3]?"["+e.map(function(t,e){return e%2?n(t,!0):'"'+t.replace(/\n/g,"\\n").replace(/"/g,'\\"')+'"'}).join(",")+'].join("")':n(e[1])).replace(/\uFFF0/g,$(0)).replace(/\uFFF1/g,$(1))+";")}function n(t,e){return t=t.replace(/\n/g," ").replace($(/^[{ ]+|[ }]+$|\/\*.+?\*\//g),""),/^\s*[\w- "']+ *:/.test(t)?"["+o(t,/["' ]*[\w- ]+["' ]*:/,/,(?=["' ]*[\w- ]+["' ]*:)|}|$/).map(function(t){return t.replace(/^[ "']*(.+?)[ "']*: *(.+?),? *$/,function(t,e,n){return n.replace(/[^&|=!><]+/g,r)+'?"'+e+'":"",'})}).join("")+'].join(" ").trim()':r(t,e)}function r(e,n){return e=e.trim(),e?"(function(v){try{v="+(e.replace(a,function(e,n,r){return r?"(d."+r+"===undefined?"+("undefined"==typeof t?"global.":"window.")+r+":d."+r+")":e})||"x")+"}catch(e){}finally{return "+(n===!0?'!v&&v!==0?"":v':"v")+"}}).call(d)":""}function i(t,e){var n=[];return e.map(function(e,r){r=t.indexOf(e),n.push(t.slice(0,r),e),t=t.slice(r+e.length)}),n.concat(t)}function o(t,e,n){var r,i=0,o=[],u=new RegExp("("+e.source+")|("+n.source+")","g");return t.replace(u,function(e,n,u,a){!i&&n&&(r=a),i+=n?1:-1,i||null==u||o.push(t.slice(r,a+u.length))}),o}var u={},a=/(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi;return function(t,n){return t&&(u[t]=u[t]||e(t))(n)}}(),D=[],R={},V="riot-tag";S.tag=function(t,e,n,r,i){return l(r)&&(i=r,/^[\w\-]+\s?=/.test(n)?(r=n,n=""):r=""),n&&(l(n)?i=n:A(n)),R[t]={name:t,tmpl:e,attrs:r,fn:i},t},S.mount=function(t,e,n){function r(t){var e="";return s(t,function(t){e+=', *[riot-tag="'+t.trim()+'"]'}),e}function i(){var t=Object.keys(R);return t+r(t)}function o(t){if(t.tagName){e&&!t.getAttribute(V)&&t.setAttribute(V,e);var r=H(t,e||t.getAttribute(V)||t.tagName.toLowerCase(),n);r&&c.push(r)}else t.length&&s(t,o)}var u,a,c=[];if(typeof e===E&&(n=e,e=0),typeof t===j?("*"===t?t=a=i():t+=r(t.split(",")),u=L(t)):u=t,"*"===e){if(e=a||i(),u.tagName)u=L(e,u);else{var f=[];s(u,function(t){f.push(L(e,t))}),u=f}e=0}return u.tagName?o(u):s(u,o),c},S.update=function(){return s(D,function(t){t.update()})},S.mountTo=S.mount,S.util={brackets:$,tmpl:B},"object"==typeof exports?module.exports=S:"function"==typeof define&&define.amd?define(function(){return S}):t.riot=S}("undefined"!=typeof window?window:void 0);
},{}],14:[function(require,module,exports){
"use strict";var sync=require("../../logic/sync"),chans=require("@atmos/config/chans.json"),_chans$excitement=chans.excitement,EXCITED=_chans$excitement.EXCITED,NEUTRAL=_chans$excitement.NEUTRAL,BORED=_chans$excitement.BORED;module.exports=function(e){e.excited=function(){sync.vote(EXCITED)},e.neutral=function(){sync.vote(NEUTRAL)},e.bored=function(){sync.vote(BORED)}};
},{"../../logic/sync":2,"@atmos/config/chans.json":5}],15:[function(require,module,exports){
var riot=require("riot");module.exports=riot.tag("excitement-in",'<p class=question>How excited are you?</p> <div> <input onclick="{ excited }" id="r-excited" type="radio" name="excitement" value="excited"> <label for="r-excited" class="pure-radio">😀</label> </div> <div> <input onclick="{ neutral }" id="r-neutral" type="radio" name="excitement" value="neutral"> <label for="r-neutral" class="pure-radio">😐</label> </div> <div> <input onclick="{ bored }" id="r-bored" type="radio" name="excitement" value="bored"> <label for="r-bored" class="pure-radio">😒</label> </div>','excitement-in label, [riot-tag="excitement-in"] label{font-size: 8em;opacity:0.75;} excitement-in input[type=radio], [riot-tag="excitement-in"] input[type=radio]{display:none;} excitement-in input[type=radio]:checked + label, [riot-tag="excitement-in"] input[type=radio]:checked + label{opacity:1;} excitement-in .question, [riot-tag="excitement-in"] .question{ margin: 0; margin-top: 0.7em; margin-bottom: 0.1em; }',function(e){require("./view")(this)});
},{"./view":14,"riot":13}],16:[function(require,module,exports){
"use strict";var _defineProperty=function(e,n,t){return Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0})},sync=require("../../logic/sync"),chans=require("@atmos/config/chans.json"),_chans$excitement=chans.excitement,EXCITED=_chans$excitement.EXCITED,NEUTRAL=_chans$excitement.NEUTRAL,BORED=_chans$excitement.BORED,weights={excited:100,neutral:50,bored:0},map=function(e){return function(n){return function(){var t={};return _defineProperty(t,e,parseInt(100*n,10)+"%"),_defineProperty(t,"_"+e,n),t}()}};module.exports=function(e){sync(e,EXCITED,map("excited")),sync(e,NEUTRAL,map("neutral")),sync(e,BORED,map("bored")),e._excited=e._neutral=e._bored=0,e.aggregate=function(){return weights.excited*e._excited+weights.neutral*e._neutral+weights.bored*e._bored+"%"}};
},{"../../logic/sync":2,"@atmos/config/chans.json":5}],17:[function(require,module,exports){
var riot=require("riot");module.exports=riot.tag("excitement-out","<h1> Excitement </h1> <span> { aggregate() }</span> <div> (excited: {excited}, neutral: {neutral}, bored: {bored}) </div>",'excitement-out span, [riot-tag="excitement-out"] span{ font-size: 4em; }',function(e){require("./view")(this)});
},{"./view":16,"riot":13}],18:[function(require,module,exports){
"use strict";var sync=require("../../logic/sync"),chans=require("@atmos/config/chans.json"),_chans$pace=chans.pace,FAST=_chans$pace.FAST,PERFECT=_chans$pace.PERFECT,SLOW=_chans$pace.SLOW;module.exports=function(c){c.fast=function(){sync.vote(FAST)},c.perfect=function(){sync.vote(PERFECT)},c.slow=function(){sync.vote(SLOW)}};
},{"../../logic/sync":2,"@atmos/config/chans.json":5}],19:[function(require,module,exports){
var riot=require("riot");module.exports=riot.tag("pace-in",'<p class=question>This talk is...</p> <div> <input onclick="{ fast }" id="r-fast" type="radio" name="pace" value="fast"> <label for="r-fast" class="pure-radio"> Too Fast </label> </div> <div> <input onclick="{ perfect }" id="r-perfect" type="radio" name="pace" value="perfect"> <label for="r-perfect" class="pure-radio"> Just Right</label> </div> <div> <input onclick="{ slow }" id="r-slow" type="radio" name="pace" value="slow"> <label for="r-slow" class="pure-radio"> Too Slow </label> </div>','pace-in label, [riot-tag="pace-in"] label{ font-size: 3.25em; outline: 1px solid #888; width: 5em; display: inline-block; height: 1.6em; padding-top: .5em; margin-top: 1.2em; background: #E6E6E6; } pace-in input[type=radio], [riot-tag="pace-in"] input[type=radio]{display:none;} pace-in input[type=radio]:checked + label, [riot-tag="pace-in"] input[type=radio]:checked + label{ background: #888; color: #E6E6E6; } pace-in .question, [riot-tag="pace-in"] .question{ margin: 0; margin-top: 0.7em; margin-bottom: -2.4em; }',function(e){require("./view")(this)});
},{"./view":18,"riot":13}],20:[function(require,module,exports){
"use strict";var _defineProperty=function(e,n,t){return Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0})},sync=require("../../logic/sync"),chans=require("@atmos/config/chans.json"),_chans$pace=chans.pace,FAST=_chans$pace.FAST,PERFECT=_chans$pace.PERFECT,SLOW=_chans$pace.SLOW,weights={fast:100,perfect:50,slow:0},map=function(e){return function(n){return function(){var t={};return _defineProperty(t,e,parseInt(100*n,10)+"%"),_defineProperty(t,"_"+e,n),t}()}};module.exports=function(e){sync(e,FAST,map("fast")),sync(e,PERFECT,map("perfect")),sync(e,SLOW,map("slow")),e._fast=e._perfect=e._slow=0,e.aggregate=function(){return weights.fast*e._fast+weights.perfect*e._perfect+weights.slow*e._slow+"%"}};
},{"../../logic/sync":2,"@atmos/config/chans.json":5}],21:[function(require,module,exports){
var riot=require("riot");module.exports=riot.tag("pace-out","<h1> Pace </h1> <span> { aggregate() }</span> <div> (fast: {fast}, perfect: {perfect}, slow: {slow}) </div>",'pace-out span, [riot-tag="pace-out"] span{ font-size: 4em; }',function(e){require("./view")(this)});
},{"./view":20,"riot":13}],22:[function(require,module,exports){
"use strict";var menu=require("@atmos/config/menu.json");module.exports=function(e){e.menu=menu};
},{"@atmos/config/menu.json":6}],23:[function(require,module,exports){
var riot=require("riot");module.exports=riot.tag("tabs",'<div class="pure-menu pure-menu-horizontal"> <ul class="pure-menu-list"> <li class="pure-menu-item" each="{item, i in menu}"> <a href="{item.href}" class="pure-menu-link">{item.name}</a> </li> </ul> </div>',function(e){require("./view")(this)});
},{"./view":22,"riot":13}]},{},[4])


//# sourceMappingURL=app.js.map
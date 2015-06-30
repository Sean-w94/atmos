(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[{"href":"#mood","name":"Mood"},{"href":"#results","name":"Results"}]
},{}],2:[function(require,module,exports){
"use strict";var riot=require("riot");module.exports=function(){var r=void 0===arguments[0]?{}:arguments[0];riot.route(function(){for(var t=arguments.length,n=Array(t),e=0;t>e;e++)n[e]=arguments[e];n=n.filter(function(r){return r.length}),n=n[0],r[n]instanceof Function&&r[n]()})};
},{"riot":5}],3:[function(require,module,exports){
"use strict";var pull=require("websocket-pull-stream"),ws=new WebSocket("ws://localhost:4001"),srv=pull(ws)();module.exports=function(e,n,r){if("number"!=typeof n)throw Error("must supply channel");var u=pull.Funnel(function(n){Object.assign(e,n),e.update()});return r instanceof Function?srv.demux.channel(n).pipe(pull.Tunnel(r)()).pipe(u()):srv.demux.channel(n).pipe(u())},module.exports.write=function(e,n){if("number"!=typeof n)throw Error("must supply channel");ws.send(new Uint8Array([n,e]))},module.exports.srv=srv,module.exports.pull=pull;
},{"websocket-pull-stream":7}],4:[function(require,module,exports){
"use strict";function tab(r){views.filter(function(t){return t!==r}).forEach(function(r){return r.classList.add("hidden")}),r.classList.remove("hidden")}require("./views/menu"),require("./views/results"),require("./views/mood"),require("riot").mount("*");var router=require("./logic/router"),views=[document.querySelector("results"),document.querySelector("mood")],results=views[0],mood=views[1];router({results:function(r){var t=function(){return r.apply(this,arguments)};return t.toString=function(){return r.toString()},t}(function(){tab(results)}),mood:function(r){var t=function(){return r.apply(this,arguments)};return t.toString=function(){return r.toString()},t}(function(){tab(mood)})});
},{"./logic/router":2,"./views/menu":19,"./views/mood":21,"./views/results":23,"riot":5}],5:[function(require,module,exports){
!function(t){"use strict";function e(t){var e=$(0),n=t.slice(e.length).match(/\s*(\S+?)\s*(?:,\s*(\S)+)?\s+in\s+(.+)/);return n?{key:n[1],pos:n[2],val:e+n[3]}:{val:t}}function n(t,e,n){var r={};return r[t.key]=e,t.pos&&(r[t.pos]=n),r}function r(t,r,i){p(t,"each");var o,a=t.outerHTML,c=t.parentNode,f=document.createComment("riot placeholder"),s=[],l=N(t);c.insertBefore(f,t),i=e(i),r.one("premount",function(){c.stub&&(c=r.root),t.parentNode.removeChild(t)}).on("update",function(){var e,p=B(i.val,r);if(!k(p)){if(e=o,o=p?JSON.stringify(p):"",o===e)return;p=p?Object.keys(p).map(function(t){return n(i,t,p[t])}):[]}for(var d=document.createDocumentFragment(),m=s.length,v=p.length;m>v;)s[--m].unmount();for(s.length=v,e=!o&&!!i.key,m=0;v>m;++m){var h=e?n(i,p[m],m):p[m];s[m]||((s[m]=new u({tmpl:a},{parent:r,isLoop:!0,root:c,item:h})).mount(),d.appendChild(s[m].root)),s[m]._item=h,s[m].update(h)}c.insertBefore(d,f),l&&(r.tags[g(t)]=s)}).one("updated",function(){var t=Object.keys(r);h(c,function(e){1!=e.nodeType||e.isLoop||e._looped||(e._visited=!1,e._looped=!0,C(e,r,t))})})}function i(t,e,n){h(t,function(t){if(1==t.nodeType){t.isLoop=t.parentNode&&t.parentNode.isLoop||t.getAttribute("each")?1:0;var r=N(t);if(r&&!t.isLoop){for(var i,o=new u(r,{root:t,parent:e},t.innerHTML),a=g(t),c=e;!N(c.root)&&c.parent;)c=c.parent;o.parent=c,i=c.tags[a],i?(k(i)||(c.tags[a]=[i]),c.tags[a].push(o)):c.tags[a]=o,t.innerHTML="",n.push(o)}t.isLoop||C(t,e,[])}})}function o(t,e,n){function i(t,e,r){if(e.indexOf($(0))>=0){var i={dom:t,expr:e};n.push(m(i,r))}}h(t,function(t){var n=t.nodeType;if(3==n&&"STYLE"!=t.parentNode.tagName&&i(t,t.nodeValue),1==n){var o=t.getAttribute("each");return o?(r(t,e,o),!1):(s(t.attributes,function(e){var n=e.name,r=n.split("__")[1];return i(t,e.value,{attr:r||n,bool:r}),r?(p(t,n),!1):void 0}),N(t)?!1:void 0)}})}function u(t,e,n){function r(){s(T.attributes,function(t){l[t.name]=B(t.value,g||c)}),s(Object.keys(N),function(t){l[t]=B(N[t],g||c)})}function u(t){if(s(C,function(e){e[t?"mount":"unmount"]()}),g){var e=t?"on":"off";h?g[e]("unmount",c.unmount):g[e]("update",c.update)[e]("unmount",c.unmount)}}var a,c=S.observable(this),l=_(e.opts)||{},p=v(t.tmpl),g=e.parent,h=e.isLoop,y=e.item,L=[],C=[],T=e.root,M=t.fn,x=T.tagName.toLowerCase(),N={},A=/([\w\-]+)\s?=\s?['"]([^'"]+)["']/gim;if(M&&T._tag&&T._tag.unmount(!0),this.isMounted=!1,t.attrs){var H=t.attrs.match(A);s(H,function(t){var e=t.split(/\s?=\s?/);T.setAttribute(e[0],e[1].replace(/['"]/g,""))})}T._tag=this,this._id=d(~~((new Date).getTime()*Math.random())),m(this,{parent:g,root:T,opts:l,tags:{}},y),s(T.attributes,function(t){var e=t.value;$(/\{.*\}/).test(e)&&(N[t.name]=e)}),p.innerHTML&&!/select|select|optgroup|tbody|tr/.test(x)&&(p.innerHTML=w(p.innerHTML,n)),this.update=function(t){m(c,t),r(),c.trigger("update",t),f(L,c,t),c.trigger("updated")},this.mixin=function(){s(arguments,function(t){t="string"==typeof t?S.mixin(t):t,s(Object.keys(t),function(e){"init"!=e&&(c[e]="function"==typeof t[e]?t[e].bind(c):t[e])}),t.init&&t.init.bind(c)()})},this.mount=function(){if(r(),M&&M.call(c,l),u(!0),o(p,c,L),c.parent||c.update(),c.trigger("premount"),h)c.root=T=a=p.firstChild;else{for(;p.firstChild;)T.appendChild(p.firstChild);T.stub&&(c.root=T=g.root)}!c.parent||c.parent.isMounted?(c.isMounted=!0,c.trigger("mount")):c.parent.one("mount",function(){b(c.root)||(c.parent.isMounted=c.isMounted=!0,c.trigger("mount"))})},this.unmount=function(t){var e=a||T,n=e.parentNode;if(n){if(g)k(g.tags[x])?s(g.tags[x],function(t,e){t._id==c._id&&g.tags[x].splice(e,1)}):g.tags[x]=void 0;else for(;e.firstChild;)e.removeChild(e.firstChild);t||n.removeChild(e)}c.trigger("unmount"),u(),c.off("*"),T._tag=null},i(p,this,C)}function a(e,n,r,i,o){r[e]=function(e){e=e||t.event,e.which||(e.which=e.charCode||e.keyCode),e.target||(e.target=e.srcElement);try{e.currentTarget=r}catch(u){}if(e.item=i._item?i._item:o,n.call(i,e)===!0||/radio|check/.test(r.type)||(e.preventDefault&&e.preventDefault(),e.returnValue=!1),!e.preventUpdate){var a=o?i.parent:i;a.update()}}}function c(t,e,n){t&&(t.insertBefore(n,e),t.removeChild(e))}function f(t,e,n){s(t,function(t,r){var i=t.dom,o=t.attr,u=B(t.expr,e),f=t.dom.parentNode;if(null==u&&(u=""),f&&"TEXTAREA"==f.tagName&&(u=u.replace(/riot-/g,"")),t.value!==u){if(t.value=u,!o)return i.nodeValue=u.toString();if(p(i,o),"function"==typeof u)a(o,u,i,e,n);else if("if"==o){var s=t.stub;u?s&&(c(s.parentNode,s,i),i.inStub=!1,b(i)||h(i,function(t){t._tag&&!t._tag.isMounted&&(t._tag.isMounted=!!t._tag.trigger("mount"))})):(s=t.stub=s||document.createTextNode(""),c(i.parentNode,i,s),i.inStub=!0)}else if(/^(show|hide)$/.test(o))"hide"==o&&(u=!u),i.style.display=u?"":"none";else if("value"==o)i.value=u;else if("riot-"==o.slice(0,5)&&"riot-tag"!=o)o=o.slice(5),u?i.setAttribute(o,u):p(i,o);else{if(t.bool){if(i[o]=u,!u)return;u=o}"object"!=typeof u&&i.setAttribute(o,u)}}})}function s(t,e){for(var n,r=0,i=(t||[]).length;i>r;r++)n=t[r],null!=n&&e(n,r)===!1&&r--;return t}function l(t){return"function"==typeof t||!1}function p(t,e){t.removeAttribute(e)}function d(t){return(t^t>>31)-(t>>31)}function g(t){var e=N(t),n=t.getAttribute("name"),r=n&&n.indexOf($(0))<0?n:e.name;return r}function m(t){for(var e,n=arguments,r=1;r<n.length;++r)if(e=n[r])for(var i in e)t[i]=e[i];return t}function v(t){var e=O&&10>O,n=/^\s*<([\w-]+)/.exec(t),r=n?n[1].toLowerCase():"",i="th"===r||"td"===r?"tr":"tr"===r?"tbody":"div",o=y(i);return o.stub=!0,e&&("optgroup"===r?x(o,t):"option"===r?M(o,t):"div"!==i?T(o,t,r):e=0),e||(o.innerHTML=t),o}function h(t,e){if(t)if(e(t)===!1)h(t.nextSibling,e);else for(t=t.firstChild;t;)h(t,e),t=t.nextSibling}function b(t){for(;t;){if(t.inStub)return!0;t=t.parentNode}return!1}function y(t){return document.createElement(t)}function w(t,e){return t.replace(/<(yield)\/?>(<\/\1>)?/gim,e||"")}function L(t,e){return(e||document).querySelectorAll(t)}function _(t){function e(){}return e.prototype=t,new e}function C(t,e,n){s(t.attributes,function(r){if(!t._visited&&("id"===r.name||"name"===r.name)){t._visited=!0;var i,o=r.value;if(~n.indexOf(o))return;i=e[o],i?k(i)?i.push(t):e[o]=[i,t]:e[o]=t}})}function T(t,e,n){var r,i=y("div"),o=/td|th/.test(n)?3:2;for(i.innerHTML="<table>"+e+"</table>",r=i.firstChild;o--;)r=r.firstChild;t.appendChild(r)}function M(t,e){var n=y("option"),r=/value=[\"'](.+?)[\"']/,i=/selected=[\"'](.+?)[\"']/,o=/each=[\"'](.+?)[\"']/,u=/if=[\"'](.+?)[\"']/,a=/>([^<]*)</,c=e.match(r),f=e.match(i),s=e.match(a),l=e.match(o),p=e.match(u);s?n.innerHTML=s[1]:n.innerHTML=e,c&&(n.value=c[1]),f&&n.setAttribute("riot-selected",f[1]),l&&n.setAttribute("each",l[1]),p&&n.setAttribute("if",p[1]),t.appendChild(n)}function x(t,e){var n=y("optgroup"),r=/label=[\"'](.+?)[\"']/,i=/^<([^>]*)>/,o=/^<([^ \>]*)/,u=e.match(r),a=e.match(i),c=e.match(o),f=e;if(a){var s=e.slice(a[1].length+2,-c[1].length-3).trim();f=s}if(u&&n.setAttribute("riot-label",u[1]),f){var l=y("div");M(l,f),n.appendChild(l.firstChild)}t.appendChild(n)}function N(t){return R[t.getAttribute(V)||t.tagName.toLowerCase()]}function A(t){if(F=F||y("style"),document.head){if(F.styleSheet?F.styleSheet.cssText+=t:F.innerHTML+=t,!F._rendered)if(F.styleSheet)document.body.appendChild(F);else{var e=L("style[type=riot]")[0];e?(e.parentNode.insertBefore(F,e),e.parentNode.removeChild(e)):document.head.appendChild(F)}F._rendered=!0}}function H(t,e,n){var r=R[e],i=t._innerHTML=t._innerHTML||t.innerHTML;return t.innerHTML="",r&&t&&(r=new u(r,{root:t,opts:n},i)),r&&r.mount?(r.mount(),D.push(r),r.on("unmount",function(){D.splice(D.indexOf(r),1)})):void 0}var S={version:"v2.2.1",settings:{}},j="string",E="object",k=Array.isArray||function(){var t=Object.prototype.toString;return function(e){return"[object Array]"===t.call(e)}}(),O=function(t){return 0|(t&&t.document||{}).documentMode}(t);S.observable=function(t){t=t||{};var e={},n=0;return t.on=function(r,i){return l(i)&&(i._id="undefined"==typeof i._id?n++:i._id,r.replace(/\S+/g,function(t,n){(e[t]=e[t]||[]).push(i),i.typed=n>0})),t},t.off=function(n,r){return"*"==n?e={}:n.replace(/\S+/g,function(t){if(r)for(var n,i=e[t],o=0;n=i&&i[o];++o)n._id==r._id&&(i.splice(o,1),o--);else e[t]=[]}),t},t.one=function(e,n){function r(){t.off(e,r),n.apply(t,arguments)}return t.on(e,r)},t.trigger=function(n){for(var r,i=[].slice.call(arguments,1),o=e[n]||[],u=0;r=o[u];++u)r.busy||(r.busy=1,r.apply(t,r.typed?[n].concat(i):i),o[u]!==r&&u--,r.busy=0);return e.all&&"all"!=n&&t.trigger.apply(t,["all",n].concat(i)),t},t},S.mixin=function(){var t={};return function(e,n){return n?void(t[e]=n):t[e]}}(),function(t,e,n){function r(){return a.href.split("#")[1]||""}function i(t){return t.split("/")}function o(t){t.type&&(t=r()),t!=u&&(c.trigger.apply(null,["H"].concat(i(t))),u=t)}if(n){var u,a=n.location,c=t.observable(),f=n,s=!1,l=t.route=function(t){t[0]?(a.hash=t,o(t)):c.on("H",t)};l.exec=function(t){t.apply(null,i(r()))},l.parser=function(t){i=t},l.stop=function(){s&&(f.removeEventListener?f.removeEventListener(e,o,!1):f.detachEvent("on"+e,o),c.off("*"),s=!1)},l.start=function(){s||(f.addEventListener?f.addEventListener(e,o,!1):f.attachEvent("on"+e,o),s=!0)},l.start()}}(S,"hashchange",t);var F,$=function(t){var e,n,r,i=/[{}]/g;return function(o){var u=S.settings.brackets||t;return e!==u&&(e=u,r=u.split(" "),n=r.map(function(t){return t.replace(/(?=.)/g,"\\")})),o instanceof RegExp?u===t?o:new RegExp(o.source.replace(i,function(t){return n[~~("}"===t)]}),o.global?"g":""):r[o]}}("{ }"),B=function(){function e(t,e){return t=(t||$(0)+$(1)).replace($(/\\{/g),"￰").replace($(/\\}/g),"￱"),e=i(t,o(t,$(/{/),$(/}/))),new Function("d","return "+(e[0]||e[2]||e[3]?"["+e.map(function(t,e){return e%2?n(t,!0):'"'+t.replace(/\n/g,"\\n").replace(/"/g,'\\"')+'"'}).join(",")+'].join("")':n(e[1])).replace(/\uFFF0/g,$(0)).replace(/\uFFF1/g,$(1))+";")}function n(t,e){return t=t.replace(/\n/g," ").replace($(/^[{ ]+|[ }]+$|\/\*.+?\*\//g),""),/^\s*[\w- "']+ *:/.test(t)?"["+o(t,/["' ]*[\w- ]+["' ]*:/,/,(?=["' ]*[\w- ]+["' ]*:)|}|$/).map(function(t){return t.replace(/^[ "']*(.+?)[ "']*: *(.+?),? *$/,function(t,e,n){return n.replace(/[^&|=!><]+/g,r)+'?"'+e+'":"",'})}).join("")+'].join(" ").trim()':r(t,e)}function r(e,n){return e=e.trim(),e?"(function(v){try{v="+(e.replace(a,function(e,n,r){return r?"(d."+r+"===undefined?"+("undefined"==typeof t?"global.":"window.")+r+":d."+r+")":e})||"x")+"}catch(e){}finally{return "+(n===!0?'!v&&v!==0?"":v':"v")+"}}).call(d)":""}function i(t,e){var n=[];return e.map(function(e,r){r=t.indexOf(e),n.push(t.slice(0,r),e),t=t.slice(r+e.length)}),n.concat(t)}function o(t,e,n){var r,i=0,o=[],u=new RegExp("("+e.source+")|("+n.source+")","g");return t.replace(u,function(e,n,u,a){!i&&n&&(r=a),i+=n?1:-1,i||null==u||o.push(t.slice(r,a+u.length))}),o}var u={},a=/(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi;return function(t,n){return t&&(u[t]=u[t]||e(t))(n)}}(),D=[],R={},V="riot-tag";S.tag=function(t,e,n,r,i){return l(r)&&(i=r,/^[\w\-]+\s?=/.test(n)?(r=n,n=""):r=""),n&&(l(n)?i=n:A(n)),R[t]={name:t,tmpl:e,attrs:r,fn:i},t},S.mount=function(t,e,n){function r(t){var e="";return s(t,function(t){e+=', *[riot-tag="'+t.trim()+'"]'}),e}function i(){var t=Object.keys(R);return t+r(t)}function o(t){if(t.tagName){e&&!t.getAttribute(V)&&t.setAttribute(V,e);var r=H(t,e||t.getAttribute(V)||t.tagName.toLowerCase(),n);r&&c.push(r)}else t.length&&s(t,o)}var u,a,c=[];if(typeof e===E&&(n=e,e=0),typeof t===j?("*"===t?t=a=i():t+=r(t.split(",")),u=L(t)):u=t,"*"===e){if(e=a||i(),u.tagName)u=L(e,u);else{var f=[];s(u,function(t){f.push(L(e,t))}),u=f}e=0}return u.tagName?o(u):s(u,o),c},S.update=function(){return s(D,function(t){t.update()})},S.mountTo=S.mount,S.util={brackets:$,tmpl:B},"object"==typeof exports?module.exports=S:"function"==typeof define&&define.amd?define(function(){return S}):t.riot=S}("undefined"!=typeof window?window:void 0);
},{}],6:[function(require,module,exports){
module.exports={"READ":114,"END":101}
},{}],7:[function(require,module,exports){
function webSocketPullStream(n,e){facade(n),e=defaults(e||{});var u,t=plex(),r="flow"===e.mode,c=e.View,o=makeCommandHandler(c),i=pull.Source(function(){return function e(u,t){function r(n){t(0,n)}e.ran||(e.ran=!0,n.on("message",r))}})(),l=pull.Sink(function(e){function u(t,c){return t?(t=o.pull.indexOf(u.r),void(~~t&&o.pull.splice(t,1))):n.readyState>1?e(Error("Socket closed"),u):(n.send(c),r?setImmediate(e,0,u):void(u.r=function(){e(t,u)}))}e(null,function(n,e){u(n,e),o.pull.push(u.r)})}),p=pull.Through(function(e){return function u(t,r){return 1!==n.readyState?n.on("open",function(){u(t,r)}):void e(null,function(n,u){e(n,r)})}}),a=Funnel(function(n){return o(n)})(),s=Tunnel(function(){r||n.send(new c(encCmds.READ))})(),f=Tunnel(function(n){return wrap(n,c)})(),d={stringify:Tunnel(function(n){return n&&(n.constructor===Object||Array.isArray(n))?JSON.stringify(n):n})(),parse:Tunnel(function(n,e){try{e(null,JSON.parse(n))}catch(u){e(u)}})()},m=t(i);return m.channel(0).pipe(a),m.demux(),t(noop),t(l()),t(l()),u=p().pipe(Tunnel(function(n){return"number"==typeof n?n+"":n})()).pipe(t.channel(1)),u.objects=d.stringify.pipe(encase(p().pipe(t.channel(2)))()),u.source=m.channel(1).pipe(f).pipe(s),u.objects.source=m.channel(2).pipe(d.parse).pipe(s),u.sink=u.data=u.objects.data=u,u.objects.sink=u.objects,u.pipe=function(n){return u.source.pipe(n)},u.objects.pipe=function(n){return u.objects.source.pipe(n)},u.demux=m,u.mux=t,t.offset(3),t.channel=function(n){return function(e){return t.channels[e+3]||t(l()),n(e)}}(t.channel),m.channel=function(n){return function(e){var u=n(e),t=u.pipe(s);return t.__proto__=u,t}}(m.channel),encase(u)}function Tunnel(n){return encase(pull.Through(function(e){return function(u,t){e(null,function(e,u){var r;return n.length<2?(r=n(u),void t(e,"undefined"!=typeof r?r:u)):void n(u,function(n,e){t(n,"undefined"!=typeof e?e:u)})})}})())}function Funnel(n){return pull.Sink(function(e){e(null,function(e,u){(e||n(u))&&socket.close()})})}function makeCommandHandler(n){function e(u,t){return u=new n(u)[0],~cmds.indexOf(u)?u===e.END?e.END:void e.pull.forEach(function(n){n()}):void 0}return e.pull=[],e}require("setimmediate-min")();var pull=require("pull-core"),plex=require("pull-plex"),utils=require("./lib/utils"),cmd=require("./cmds.json"),cmdKeys=Object.keys(cmd),cmds=cmdKeys.map(function(n){return cmd[n]}),encCmds=cmdKeys.reduce(function(n,e){return n[e]=[0,cmd[e]],n},{}),noop=utils.noop,wrap=utils.wrap,encase=utils.encase,facade=utils.facade,defaults=utils.defaults;module.exports=webSocketPullStream,module.exports.__proto__=require("pull-core"),webSocketPullStream.Tunnel=Tunnel,webSocketPullStream.Funnel=Funnel;
},{"./cmds.json":6,"./lib/utils":8,"pull-core":9,"pull-plex":10,"setimmediate-min":17}],8:[function(require,module,exports){
function noop(){}function wrap(e,n){return"string"==typeof e?e:new n(e)}function encase(e){return function(n){return n===Object?e.objects:e}}function facade(e){e.binaryType="arraybuffer",e.on=e.on||function(n,t){function r(e){t(e.data||e)}t.cb=r,e.addEventListener(n,r)},e.removeListener=e.removeListener||function(n,t){e.removeEventListener(n,t.cb||t)}}function defaults(e){return e.View=e.View||window.Uint8Array||String,e}module.exports={noop:noop,wrap:wrap,encase:encase,facade:facade,defaults:defaults};
},{}],9:[function(require,module,exports){
function addPipe(n){return"function"!=typeof n?n:(n.pipe=n.pipe||function(r){if("function"!=typeof r&&"function"!=typeof r.sink)throw new Error("must pipe to reader");var t=addPipe(r.sink?r.sink(n):r(n));return r.source||t},n.type="Source",n)}exports.id=function(n){return n},exports.prop=function(n){if("string"==typeof n){var r=n;return function(n){return n[r]}}return n},exports.tester=function(n){return n?"object"==typeof n&&"function"==typeof n.test?n.test.bind(n):exports.prop(n)||exports.id:exports.id},exports.addPipe=addPipe;var Source=exports.Source=function(n){function r(){var r=[].slice.call(arguments);return addPipe(n.apply(null,r))}return r.type="Source",r},Through=exports.Through=function(n){return function(){function r(r){for(t.unshift(r),r=n.apply(null,t);e.length;)r=e.shift()(r);return r}var t=[].slice.call(arguments),e=[];return r.pipe=function(n){if(e.push(n),"Source"===n.type)throw new Error("cannot pipe "+r.type+" to Source");return r.type="Sink"===n.type?"Sink":"Through",r},r.type="Through",r}},Sink=exports.Sink=function(n){return function(){function r(r){return t.unshift(r),n.apply(null,t)}var t=[].slice.call(arguments);if(!n)throw new Error("must be createReader function");return r.type="Sink",r}};exports.maybeSink=exports.maybeDrain=function(n,r){return r?Sink(function(t){return n(r)(t)})():Through(function(r){var t;return function(e,o){return e?r(e,o):t?o(t):void n(function(n,r){t=n||!0,n?o(t):o(null,r)})(r)}})()};
},{}],10:[function(require,module,exports){
function remover(n,e){return function(){var u=n.index;n.abort(),e.slice(u).forEach(function(n){n.index-=1}),e.splice(u,1)}}var pull=require("pull-core"),encdec=require("./lib/encdec"),devnull=pull.Sink(function(n){n(0,function e(u,r){u||n(u,e)})}),recieverChannel=pull.Source(function(){function n(n,e){n||~u.indexOf(e)||u.push(e)}var e,u=[];return n.abort=function(){e=!0},n.next=function(n){u.forEach(function(u){u(e,n)})},n}),mux=pull.Through(function(n,e,u){function r(e,r){e||n(0,function(n,e){n||r(c||n,encdec(e,u))})}var c;return r.abort=function(){c=!0},r}),demux=pull.Through(function(n,e,u,r){function c(e,t){e||n(0,function(n,e){if(!n){var o=encdec(e),i=o.chan;i-=r.by,u[i]=c.channel(i),u[i].next(o.data),t(n,e)}})}return c.channels=u,c.channel=function(n){return n+=r.by,u[n]||(u[n]=recieverChannel())},c});module.exports=function(){function n(n){var c,t;return"Source"===n.type?(n=n.pipe(demux(n,r,e)),n.demux=function o(){return o.ed=o.ed||n.pipe(devnull())},n):(c=u.length,t=mux(n,c).pipe(n),t.remove=remover(t,u),u.push(t),t)}function e(n){e.by=n}var u=[],r=[];return n.channels=u,n.channel=function(n){return u[n+e.by]},n.offset=e,e.by=0,n};
},{"./lib/encdec":11,"pull-core":9}],11:[function(require,module,exports){
var string=require("./encdec-string"),varint=require("varint");module.exports=function(e,r){var n,t;return"string"==typeof e?string.apply(0,arguments):(e=new Uint8Array(e.buffer||e),arguments.length>1?(t=varint.encodingLength(r),n=new Uint8Array(new ArrayBuffer(e.byteLength+t)),varint.encode(r,n),n.set(e,t),n.buffer):{chan:varint.decode(e),data:e.buffer.slice(varint.decode.bytes)})};
},{"./encdec-string":12,"varint":15}],12:[function(require,module,exports){
var varint=require("varint"),FILL=String.fromCharCode(128);module.exports=function(r,e){if(arguments.length>1)return varint.encode(e).map(function(r){return String.fromCharCode(r)}).join("")+r;for(var n=0;++n&&r[n]===FILL;);return n+=8,{chan:varint.decode(r.slice(0,n).split("").map(function(r){return r.charCodeAt(0)})),data:r.slice(varint.decode.bytes)}};
},{"varint":15}],13:[function(require,module,exports){
function read(e,r){var a,d=0,r=r||0,t=0,o=r,n=e.length;do{if(o>=n)return void(read.bytesRead=0);a=e[o++],d+=28>t?(a&REST)<<t:(a&REST)*Math.pow(2,t),t+=7}while(a>=MSB);return read.bytes=o-r,d}module.exports=read;var MSB=128,REST=127;
},{}],14:[function(require,module,exports){
function encode(e,o,r){o=o||[],r=r||0;for(var S=r;e>=INT;)o[r++]=255&e|MSB,e/=128;for(;e&MSBALL;)o[r++]=255&e|MSB,e>>>=7;return o[r]=0|e,encode.bytes=r-S+1,o}module.exports=encode;var MSB=128,REST=127,MSBALL=~REST,INT=Math.pow(2,31);
},{}],15:[function(require,module,exports){
module.exports={encode:require("./encode.js"),decode:require("./decode.js"),encodingLength:require("./length.js")};
},{"./decode.js":13,"./encode.js":14,"./length.js":16}],16:[function(require,module,exports){
var N1=Math.pow(2,7),N2=Math.pow(2,14),N3=Math.pow(2,21),N4=Math.pow(2,28),N5=Math.pow(2,35),N6=Math.pow(2,42),N7=Math.pow(2,49);module.exports=function(N){return N1>N?1:N2>N?2:N3>N?3:N4>N?4:N5>N?5:N6>N?6:N7>N?7:8};
},{}],17:[function(require,module,exports){
var global=function(){return this}();module.exports=function(){global.setImmediate=global.setImmediate||function(){var e=[].slice.apply(arguments);e.splice(1,0,0),setTimeout.apply(null,e)}};
},{}],18:[function(require,module,exports){
"use strict";var menu=require("../../config/menu.json");module.exports=function(e){e.menu=menu};
},{"../../config/menu.json":1}],19:[function(require,module,exports){
var riot=require("riot");module.exports=riot.tag("menu",'<div class="pure-menu pure-menu-horizontal"> <ul class="pure-menu-list"> <li class="pure-menu-item" each="{item, i in menu}"> <a href="{item.href}" class="pure-menu-link">{item.name}</a> </li> </ul> </div>',function(e){require("./view")(this)});
},{"./view":18,"riot":5}],20:[function(require,module,exports){
"use strict";var sync=require("../../logic/sync");module.exports=function(n){n.stormy=function(){sync.write(1,1)},n.bright=function(){sync.write(1,0)}};
},{"../../logic/sync":3}],21:[function(require,module,exports){
var riot=require("riot");module.exports=riot.tag("mood",'<p>I am feeling..</p> <label for="bright" class="pure-radio"> <input onclick="{ bright }" id="bright" type="radio" name="optionsRadios" value="bright"> Bright </label> <label for="stormy" class="pure-radio"> <input onclick="{ stormy }" id="stormy" type="radio" name="optionsRadios" value="stormy"> Stormy </label>',function(i){require("./view")(this)});
},{"./view":20,"riot":5}],22:[function(require,module,exports){
"use strict";function perc(e){return function(r){return _defineProperty({},e,parseInt(100*r,10)+"%")}}function enums(e){return Array.apply(null,{length:e}).map(Number.call,Number)}var _slicedToArray=function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e)){for(var n,t=[],u=e[Symbol.iterator]();!(n=u.next()).done&&(t.push(n.value),!r||t.length!==r););return t}throw new TypeError("Invalid attempt to destructure non-iterable instance")},_defineProperty=function(e,r,n){return Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0})},sync=require("../../logic/sync"),_enums=enums(2),_enums2=_slicedToArray(_enums,2),BRIGHT=_enums2[0],STORMY=_enums2[1];module.exports=function(e){sync(e,BRIGHT,perc("bright")),sync(e,STORMY,perc("stormy"))};
},{"../../logic/sync":3}],23:[function(require,module,exports){
var riot=require("riot");module.exports=riot.tag("results","<p> Bright: { bright } </p> <p> Stormy: { stormy } </p>",function(r){require("./view")(this)});
},{"./view":22,"riot":5}]},{},[4])


//# sourceMappingURL=app.js.map
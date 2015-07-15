# How to quickly build a social real-time application

---

This article has been reproduced from the Costa Digital blog at TODO:URL.

We've been assisting Costa as they strengthen their digital presence and infrastructure. 

This post provides a modicum of insight into how nearForm consultants plan and execute technical solutions.

---

## Combining RiotJS, Node.js, Browserify, PureCSS and ES6 to rapidly prototype a performant conference voting application

Business demands change and fluctuate constantly, there are occasions that require a quick turn around with a hard deadline.

This was one of those occasions.

The hard deadline in this case was an internal conference where our goal was to engender excitement for technology among stakeholders.

We decided to build a real-time application that took input from personal devices (mobile, tablet, laptop) and displayed results on the presenters screen.

We called our concept "Atmos", the real-time conference voting application. 

![](results.png)
We had one developer (myself) and two and a half days to have a working proof of concept, followed by the weekend and Monday for tidy-up, polishing, cross browser and performance testing. All told, from the backend to the frontend, Atmos was completed in around five days.

# Live Demo
A running demo of Atmos can be found at <http://atmos.costadigital.io>

![](mood.png)

Try using the demo in a browser and on a tablet or mobile device at the same time. 

# Viewing the Source

Atmos can be found on GitHub [here](https://github.com/costacruise/atmos/tree/v1). The code is intended both as a reference for this article and as a potential starting point for anyone wanting to build a scalable (both in project scope and deployment) real-time application using some of the latest tools and techniques available.

# Setting up

To run Atmos locally, you'll need [Node.js][] 0.12+ or [io.js][] 2+.

Clone from the v1 branch:

```sh
$ git clone --branch v1 http://github.com/costacruise/atmos
$ cd atmos && npm run setup
$ npm run start:dev # start dev and real-time servers
$ npm run stop:dev # power down servers
```

There's a large amount of development dependencies, setup takes approximately 3-5 minutes to complete. 

Several of the `npm run` scripts will likely fail on Windows, however examining `package.json` contents should reveal how to get going on a Windows machine.

## Considerations

Interestingly the primary constraints for our scenario match those of many other projects, though for different reasons and at difference scales.

### Time
As mentioned, we had 5 days and there was no room for deadline extension.

### Network
There's no such thing as a reliable network. In particular though, conference WiFi is typically poor at handling high load, and there was potential for esoteric firewall or proxy setups at the venue to cause issues.

### Robustness
This was a live demo to demonstrate the virtues of technology to non-developers. Noticeable failure could significantly hinder our message.

## Process

With little time for bike shedding, the top considerations had to influence our tools, priorities and workflow.

### Device Support

Given the time constraints we opted to support modern browsers and modern devices only. All conference participants had received iPhones and iPads, however there was still an inclination towards blackberry devices. 

As a trade-off we supported touch screen blackberries, but did not implement support for key-only blackberries (adjusting the user interface alone would demand a significant time investment that we could not afford). 

We also didn't pay much attention to IE. Even IE11 can be a time hog when it comes to compatibility and ~99% of our audience would be on (non-windows) mobile devices anyway.

Progressive enhancement for SEO and accessibility was not followed on this project. However our design and tool choices have made it easy to retrofit progressive enhancement with server side rendering. 

### EcmaScript 6

[There's a direct correlation][] between code size and product quality. Defect density can be measured in bugs per 1000 lines of code and averages around .59 bugs per line for open source projects or .72 bugs per line on proprietary code bases. Either way, there will always be a ratio of bugs to code size.The more boilerplate we can shed the better. 

EcmaScript 6 (a.k.a EcmaScript 2015) was finalized in June 2015. Parts of it have already been implemented in modern browsers and in Node. However for cross-browser consistency and to run Node
without additional flags we transpiled the ES6 code into ES5 code as part of the build process (see the Build Process section for details).

There was only a subset of ES6 features we wanted to use for this project to help keep the code clean and readable. 

We stuck with micro-syntax extensions such as

* [lambdas (arrow functions)][]
* [destructuring][]
* [default parameters][]
* [enhanced object literals][]
* [rest operator][]
* [spread operator][]
* [const][]

These little pieces of sugar helped keep code clean, light and descriptive.

In particular we used destructuring to emulate configuration based enums which were then used to establish light-weight multiplexing (more on this later).

Since `const` keywords are transpiled to `var` keywords usage of `const` was more of a mental assist. It prevented the (generally) bad habit of reassignment, and made us think about what exactly constitutes an actual variable reference. Whilst there wouldn't be a direct performance benefit from using `const` in a transpilation context, we're still facilitating the JavaScript engine by using variables that won't be reassigned. In other words the interpreter has to jump through hoops when a reference keeps changing. Employing an enforceable practice of non-reassignment should make runtime
optimizations more likely.

Another gem is the lambdas. The removal of noise around a function enhances readability. However there are a couple of caveats.

First there's a potential debugging issue (a similar problem to [using anonymous functions][]). The code base was small enough in our case to let that go on this occasion. Secondly the lexical treatment of `this` differs from standard functions. 

The context (represented by `this`) in an arrow function takes on the context of the surrounding closure. If the surrounding closure isn't called with `new`, or given a context via `call`, `apply` or `bind` then `this` in a lambda function defaults to either the global object or `undefined` when in strict mode. All of that is fine, what may be unexpected though, is that the lexical lambda context rule *supercedes* the context binding methods (e.g. `call`, `bind`, `apply`). 

```js
function f(fn) { fn.call({some: 'instance'}) }
(function () { 
  'use strict';
  f(function () { console.log('ƒ this: ', this) })
  f(() => console.log('λ this: ', this) )
}())

// logs:
//   ƒ this:  Object {some: "instance"}
//   λ this:  undefined
```

It's important to know this difference. Some libraries do set callback function context. 

For instance the [through2][] module allows us to call `this.push` inside the user supplied callback. If the supplied callback is an arrow function, calling `this.push` will fail (or worse, if there's a global push method). Instead of the object which `through2` attempted to supply as the context for the callback function the `this` keyword will refer to the global object or `undefined` (depending on the mode). In such cases we either have to supply a normal function, or pass values via the second parameter of the `cb` argument (we'll talk more about `through2` later).

Adopting ES6 syntax resulted in less code being written than using ES5, without obfuscating the intent of the code (in some cases, quite the opposite).

For this project we steered clear of macro-syntax extensions such as classes, modules and generators. 

For one thing, whilst learning the syntax of these language additions is straightforward, understanding the implications of their usage is a longer journey than we had time for. 

Further, there's the issue of code bloat during transpilation of macro-syntax extensions, plus runtime inefficiency (generators being the prime candidate for slow execution when transpiled). 

Finally, it was important to keep the project simple. [Classes][] aren't the right paradigm for linear/cyclical data flow management (actually.. they aren't the right paradigm for a prototypal language but that's another story!). [Iterators][] (counterpart to generators) encourage a procedural approach (which is somewhat backwards). Finally the [ES6 module][] system isn't a good fit for current tooling. Also it may only be opinion, but CommonJS modules are cleaner.

We also used some ES6 language additions

* [Set][]
* [Object.assign][]
* [Array.from][]

The `Object.assign` and `Array.from` methods simply afforded a nice way to do mixins and convert array like objects to arrays-proper (no more `Array.prototype.slice.call(ArrayLikeThing)`, hooray!).

The `Set` constructor returns a unique list object. By pushing unique id's (determined browserside), onto a set we could keep a constant running total of voters which allowed us to calculate aggregated percentages.

And one EcmaScript 7 method: [Object.observe][].

`Object.observe` was fundamental to model management. 

Using `Object.observe` meant that we could store data in a plain JavaScript object and react to changes in that object. This drove the data flow: when a vote for an item came into the server, the relevant corresponding object was modified. When the object was changed, the change was both broadcast to all open sockets and persisted to disk.


### Backend platform

We considered building a peer-to-peer real-time application using WebRTC, but it wasn't practical. 

For one thing, iOS Safari does not support WebRTC. Even if it did we would need to research and define an adequate peer-to-peer network architecture for sharing data among the 300 devices. Whilst this would be an interesting diversion there wasn't time to spare. 

On top of that WebRTC peer connections aren't serverless. We would still have needed a switchboard (for making connections) and relay servers (for bypassing firewall restrictions).

We settled instead on creating a mediator server that would count incoming votes and broadcasting totals. We used [Node.js][] for this task.

Node is excellent at high concurrency real-time connections, much higher concurrency than our needs. 

Also the language of Node is JavaScript. 

Working in multiple languages isn't just about switching syntax, it's about approach. The flow of logic is different. Writing everything in one language sped up full-stack prototyping because it eliminated the need to context switch between languages. It also made sharing code and configuration between environments trivial.

We built the backend against Node 0.12 and [io.js][] 2.3. This allowed us to compare reliability and speed of platforms. `Object.observe` is natively implemented in Node 0.12 and [io.js][] 2.3 which means our server wont run on Node 0.10 (polyfilling `Object.observe` is expensive, so that's not an option, it's also why it wasn't used in the browser).

Node's ecosystem was also leveraged for the build process, we talk more about this as we go.


### Choosing a frontend framework

To speed up development time we wanted some form of view-layer that provides data-binding capabilities 

We also wanted to be able to isolate features into components in order to reduce time-wasting bugs that result from global collisions and general state confusion.

Angular is the predominant framework in use at Costa Digital. Whilst componentization is a little muddied, Angular is nevertheless an excellent framework with a strong ecosystem. 

However, for this project we chose RiotJS. The driving factor in this decision was file size.

The less data we have to send across the wire, the faster the app will load and establish a real-time connection. Ideally, use of a framework should result in less code than writing an equivalent implementation sans-framework.

When minified Angular is 145.5kb whereas RiotJS is 11 times smaller at 12.75kb. 

<table><thead><tr> <th>Framework</th><th>Version</th><th>Minified</th><th>gzip -1</th><th>gzip -6</th></tr></thead><tbody> <tr><td>Angular</td><td>1.4.2</td><td>145.5kb</td><td>59.4kb</td><td>51.7kb</td></tr> <tr><td>Ember</td><td>1.13.3</td><td>493.3kb</td><td>155.8kb</td><td>126.3kb</td></tr> <tr><td>React</td><td>0.13.3</td><td>121.7kb</td><td>42.9kb</td><td>36.2kb</td></tr> <tr><td>Riot</td><td>2.2.2-beta</td><td>12.75kb</td><td>5.8kb</td><td>5.3kb</td></tr> <tr><td>Web Components Polyfill</td><td>0.7.5</td><td>117.1kb</td><td>39.8kb</td><td>33.4kb</td></tr> </tbody></table>

Other alternatives were also deemed too large: Ember clocks in at a whopping 493kb, almost half a megabyte before we write a single line of application code! 

Whilst Ember is between 126kb and 155kb gzipped, mobile browsers, (Safari in particular) have low cache sizes.

Ember will still decompress in the browser to take up half a megabyte prior to any initialization, taking up a significant portion of the cache (increasing the likelihood of a reload after switching tabs).

In fairness, Ember isn't primarily a view layer like React and Riot, it's an entire MVC suite. But then so is Angular and it's a third of the size of Ember.

React is 121.7kb and that's before you include a flux implementation.

Another possibility was writing Atmos using future-standards with the Web Components Polyfill (which is the basis for Polymer). The promise of this approach, is that over time we'll be able shed pieces of the (currently 117kb) polyfill as browser support grows. However, WebComponents haven't been implemented as fast as expected by browser vendors, and anyway we had 5 days not 5 years. 

### RiotJS

We built our real-time application in RiotJS.

Riot feels like Angular: templates are essentially HTML with a DSL overlay. It's also inspired by React's virtual DOM, where changes are measured and executed by diffing an efficient DOM representation. 

The API surface of Riot is a small yet powerful set of primitives, which makes for a short and shallow learning curve. Perfect for our time-limited needs.

Unlike React where HTML can be written inline alongside JavaScript code (the JSX format), Riot's paradigm leads us to declare component specific JavaScript code inline, among the HTML.

For instance here's how a React component might be written

```js 
var Hello = React.createClass({
  change: function (e) {
    this.setState({msg: e.target.value})
  },
  getInitialState: function () {
    return {msg: this.props.msg}
  },
  render: function() {
    return (<div>
      <div>Hello {this.state.msg}</div>
      <input onBlur={this.change}/>
    </div>)
  }
});

React.render(<Hello msg="World" />, document.body)
```

We can view the results [here](http://jsfiddle.net/hkpx3qwh/)

Here's the equivalent in RiotJS

```js
<hello msg=World></hello>

<script type="riot/tag">
  <hello>
    <div> Hello {msg} </div>
    <input onchange={change} />
    this.msg = opts.msg;
    this.change = function (e) {
      this.msg = e.target.value
    }
  </hello>
</script>
```

The `script` element with type `riot/tag` creates a Riot context inside a standard HTML page. We don't use inline `riot/tag` `script` elements on the Atmos code base. Instead we compile tag files separately (which also eliminates the need to load the Riot compiler in the client).

To inject a Riot tag into the DOM we use `riot.mount`:

```js
riot.mount('msg')
```

See this in action [here](http://jsfiddle.net/vr91n6j1/).

In some ways this looks like the return of the 90's but there is a vital difference. 

The lack of componentization and handler scoping we're the primary driving forces
behind the failure of attribute references handlers in early web applications. Not
least because the early web was document-centric, it wasn't the application delivery 
platform it is today.

The event handler attributes in a Riot component can only reference methods that exist in their scope (which is determined by the base element, e.g. the element which gets mounted, `<hello>` in the example). Vanilla HTML handler attributes can only reference methods on the global scope - which we know is a recipe for disaster. 


## Application Structure

The RiotJS philosophy is one of "tools not policy" which means we had to define our own structural approach for our application. To establish clean code boundaries we wanted a modular structure. Writing small single purpose modules helps to avoid human error.

### Client-side Modularity

For modules in the browser we used Browserify. Browserify enables us to write CommonJS modules for our frontend code. CommonJS is the module system implemented in Node. Use `require` to load a module, use `module.exports` to export a module.

For example, Atmos has a frontend module (located in [app/logic/uid.js][]) which enables us to consistently identify a devices browser between page refreshes or closing and opening the browser. 

```js 
//app/logic/uid.js
const uid = () => Math.random().toString(35).substr(2, 7)
module.exports = () => (localStorage.uid = localStorage.uid || uid())
```

The `sync.js` module [app/logic/sync.js][] (which provides real-time communication) uses the `uid` module by requiring it (also converting it into an array of integers representing byte values, in preparation for sending binary data across the wire):

```js
const uid = require('./uid')().split('').map(c => c.charCodeAt(0))
```

For demonstration purposes, let's see how Browserify processes a `require` statement. 

In the `atmos/app` folder we can run the following:

```sh
sudo npm install -g browserify
browserify <(echo "require('"$PWD"/logic/uid')") 
```

![](browserify-eg.png)


Standardizing a paradigm across environments by using the same module system for server and client implementations yields similar cognitive benefits to writing the entire stack in the same language.

### View Components

Browserify can be augmented with transforms. Riotify is a Browserify transform that allows us to `require` a Riot view (a `.tag` file).

This allows us to create view-packages, where a view is a folder that contains `package.json`, `view.tag` and `view.js` files (and optionally a `style.tag` file).

In Atmos, the `tabs` view is a tiny component that outputs links based on the configuration of a menu array.

[app/views/tabs/package.json][]
```js
{ "main": "view.tag" }
```

The `package.json` file has one purpose: define the entry-point for the `tabs` folder as the `view.tag` file instead of the default `index.js` as per Node's module loading algorithm. This allows us to require the `tabs` folder (instead of `tabs/view.tag`). Requiring a view folder helps to enforce the idea that the view is an independent module.


[app/views/tabs/view.tag][]

```js
<tabs>
  <div class="pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
          <li class="pure-menu-item" each={item, i in menu}>
            <a href="{item.href}" class="pure-menu-link">{item.name}</a>
          </li>
      </ul>
  </div>
  <script> require('./view')(this) </script>
</tabs>
```

The `view.tag` file employs the `each` attribute (part of Riot's markup-level DSL), to loop through objects in `menu`, referencing each object as `item`. Then we output the `item.name` linking into to the `item.href` for each item.

At the bottom we `require` the `view.js` file (`.js` is implied when omitted).

It's important to understand that the `tag` file actually represents a sort of component object. We're just building that object using HTML syntax. 

The root tag (`<tabs>` in this case) is a declaration of a component. When we pass `this` to the function returned by `require('./view')` we are giving the `view.js`' exported function the components *instance*. Another way to think of it is: we're giving `view.js` the components *scope*.


[app/views/tabs/view.js][]

```js
const menu = require('@atmos/config/menu.json')

module.exports = (scope) => scope.menu = menu
```

The `view.js` file is the component controller (or perhaps it's a ViewController...). When we attach the `menu` array to the `scope` object (e.g. the `this` object from the `view.tag` file) we make it available to the component. 

Finally our applications entry point can load the tab view and mount it.

[app/main.js][]

```js
const riot = require('riot')
/* ... snip ... */
require('./views/tabs')
/* ... snip ... */
riot.mount('*')
/* .. snip ... */
```

Passing the asterisk to `riot.mount` essentially tells `riot` to mount all required tags.


### Scoped Styles

Modularizing CSS seems to be the final frontier of frontend development. Due to the global nature of CSS selectors, it's all too easy for web application styles to become entangled and confusing. Disciplines such as [OOCSS][] and [SMACSS][] have arisen to tackle this problem. 

But when it comes to protecting the sanity of a code-base, tools are better than convention.

RiotJS supports scoped style tags. For instance:

```html
<my-tag>
  <p> Awesome </p>
  <style scoped> 
    p {font-size: 40em} 
    :scope {display:block; outline: 1px solid red}
  </style>
</my-tag>
```

This won't style **all** `p` tags at size 40em, only `p` tags inside `my-tag`. Also the special pseudo-selector `:scope` applies to the `my-tag` tag.

Scoped styles were proposed as a [native specification][], but sadly [may never be][] [implemented][] [across all browsers][]. Fortunately RiotJS does supports the syntax. 

### Style Modules

It's possible to compose a tag from several sources by redeclaring the tag and compiling each declaration separately. Browserify in conjunction with Riotify automatically compiles the tags via the `require` statement. 

This means we can decouple style from structure whilst also isolating its domain of influence
to a particular view.

Let's take a look at the `excitement-in` view (this is the view that uses emoticons for user input)

[app/views/excitement-in/view.tag][]

```html
<excitement-in>
  <p class=question>How excited are you?</p>
  <face onclick={ fastcheck.bind(null, 'excited') }>
      <input onclick={ excited } id="r-excited" type="radio" name="excitement" value="excited">
      <label for="r-excited" class="pure-radio"><img src="assets/excited.{ext}"></label>
  </face>
  <face onclick={ fastcheck.bind(null, 'neutral') }>
      <input onclick={ neutral } id="r-neutral" type="radio" name="excitement" value="neutral">
      <label for="r-neutral" class="pure-radio"><img src="assets/neutral.{ext}"></label>
  </face>
  <face onclick={ fastcheck.bind(null, 'bored') }>
      <input onclick={ bored } id="r-bored" type="radio" name="excitement" value="bored">
      <label for="r-bored" class="pure-radio"><img src="assets/bored.{ext}"></label>
  </face>
  <script> 
    require('./view')(this)
    require('./style.tag')
  </script>
</excitement-in>
```

The views `style.tag` is required in in the `view.tag`. 

[app/views/excitement-in/style.tag][]

```html
<excitement-in>
  <style scoped>
    face {display:block;margin-top:1em;margin-bottom:1em;text-align:center;}
    label {opacity:0.5;width:9em;}
    label img {width:9em;}
    input[type=radio] {display:none;}
    input[type=radio]:checked + label {opacity:1;}
    .question { margin: 0; margin-top: 0.7em; margin-bottom: 0.1em; }
  </style>
</excitement-in>
```

In the `style.tag` file, the base element (`<excitement-in>`) is declared again and the view components styles are placed inside a scoped style element.

There's a little more boilerplate than the standard CSS file. The advantage of having 
the base tag in the styles file is that it reinforces the specific relationship between 
the styles and the view.

The styles for each component are pulled into the JavaScript bundle during the build process. Consequently there is a single HTTP connection for all JavaScript and component styles.

## Scoped Package Names

Let's take a look at the `package.json` file in the `config` folder:

```js
{
  "name": "@atmos/config",
  "version": "1.0.0"
}
```

The `name` is using a fairly new [npm][] feature: [scoped package names][].

Using scoped names prevents us from accidental public publishing, whilst leaving the door open for private publishing.

If we don't have a paid npm account called "atmos" and we accidentally run `npm publish`, it will fail.

If we have an unpaid account called "atmos" it will still fail unless we run `npm publish --access public` - which is much less likely to happen by accident. 

The `app`, `config`, `inliner` and `srv` packages all have names scoped to `@atmos`.

Using scopes also makes it easy for us to self-host modules on our own repository.

Let's take a look at `.npmrc`

```js
@atmos:registry = "http://localhost:4873"
```

An `.npmrc` file alters npm settings for that folder only. In this case we associated the @atmos namespace with `localhost` port `4873`. So if we tried to `npm publish` (with or without the `--access`) flag npm won't publish to the public npm repository, but instead will attempt to publish to `localhost:4873`.

We can run a local repository with the excellent [sinopia][] module (which defaults to running on localhost:4873).

Whilst Sinopia was setup and left for future use (see the `scripts.repo` field in [app/package.json][]), we ended up using `npm link` because it eliminates the need to reinstall updated packages. Additionally, only two of the packages (inliner and config) were sub-dependencies of `app` and/or `srv` so it didn't seem worth it.


### Shared Configuration

Dependency resolution in Browserify and Node is generally equivalent. We can also require package-modules as opposed to just referencing files by path. 

The `npm link` command creates a symbolic link to a package. If we `sudo npm link` in a folder containing a `package.json` file, the module will be linked from the global npm installs directory (type `npm get prefix` to see where that's located on your system). We can then link to the global link by running `npm link <package name>` in a folder which requires the linked package as a sub-dependency.

With `npm link` we can share our configuration with both the frontend and backend code:

```sh
$ sudo npm link config
$ pushd app
$ npm link @atmos/config
$ popd
$ pushd srv
$ npm link @atmos/config
```

The `npm link` command removes the need reinstall every time we change configuration settings.

This was the process we used during most of the development, however for convenience the
linking process has been automated. Simply execute `npm run setup` in the `atmos` directory.

In the [config][] folder we have four files

* package.json
* .npmrc
* menu.json
* chans.json

We've examined `package.json` and `.npmrc` already, let's take a look at `menu.json`:

```js
[
  {"href": "#mood", "name": "Mood"},
  {"href": "#results", "name": "Results"}
]
```

This is only used on the frontend, we've seen it already in the `app/views/tabs/view.js`
file. 

The final (and most interesting) file is `chans.json`:

```js
{
  "excitement": {
    "EXCITED": 0,
    "NEUTRAL": 1,
    "BORED": 2
  },
  "pace": {
    "FAST": 3,
    "PERFECT": 4,
    "SLOW": 5
  },
  "topic": {
    "TOPIC_A": 6,
    "TOPIC_B": 7,
    "TOPIC_C": 8,
    "TOPIC_D": 9,
    "TOPIC_E": 10
  }
}
```

The `chans.json` file is used in both the client and server, it provides a shared contract allowing us to segregate data sent across the wire into channels. We use it to multiplex real-time streams.


## Real-time Connections

### Transport

We decided to use WebSockets, which are supported in all current major desktop browsers, iOS Safari, all modern Android webKit browsers and even Blackberry 10 OS. 

Employing WebSockets kept the JavaScript payload small. For instance the [engine.io][] library (which provides transport progressive enhancement), is an additional 54kb when Browserified and minified.

We also chose to build our own thin abstraction around the transport on the server side ([app/logic/sync.js][]). Again this avoided the extra weight that [socket.io][] (91kb) or [websocket-stream][] (200kb) would add on the client side. Our small abstraction isolates transport communication logic, making it easy to dynamically switch out the transport in the future (in order to provide support for old browsers, implement a new paradigm like peer-to-peer, or interact with a third-party data service like Firebase).

We did use [websocket-stream][] on the server side so we could easily attach our data pipeline to each connection.

### Streams

For any server task that involves shuffling data around, [Node streams][] are almost always the right way to go. They're essentially an implementation of asynchronous functional programming, where the immutable objects are binary chunks of a data set (or actual objects in the case of object streams). They've been called "arrays in time", and that's a great way to think about them. 

With streams we can process data in a memory-controlled way. In this particular project that's of no major benefit because we're only taking in 8 bytes per vote, and sending out floating point numbers to every connection when a percentage changes. Pipeline capacity is not a problem in our case.

The main benefit of streams in this project is the ability to architect data-flow as a pipeline.

Let's take a look at the [srv/server.es][] file, on line 9 we call the `transport` function and pass it a callback. The `transport` function can be found in [srv/lib/transport.js][], all it does is accept an incoming WebSocket and wrap it in a stream. 

In the callback we use that stream:

```js
transport(stream => {
  // register incoming votes
  stream.pipe(sink())

  // send votes out to all clients
  broadcast(stream)
})
```

Incoming data flow is extremely simple. We pipe incoming data to a `sink` stream. The `sink` function can be found in [srv/lib/conduit.js][], and it looks like this:

```js
const sink = () => through((msg, _, cb) => {
  msg = Array.from(msg)

  const stat = msg.pop() //grab the channel
  const uid = msg.map(c => String.fromCharCode(c)).join('')
  const area = areaOf(stat)

  registerVoter(uid, stat, area)

  Object.keys(stats[area])
    .forEach(n => {
      n = +n
      if (isNaN(n)) return
      //undefined instead of false, so that 
      //properties are stripped when stringified
      //(deleting is bad for perf)
      stats[area][n][uid] = (n === stat) || undefined
    })

  cb()
})
```

The `through` function is imported from the [through2][] module. It provides a minimal way to create a stream. This stream processes each incoming message from the client, registers new voters and records or updates their votes.

Using streams allows us to describe a birds eye view (the pipeline), that can be zoomed into at each processing point (the stream implementation).


### Channels

HTTP connections are expensive: they take time and resources to establish. 

WebSockets are effectively bidirectional long lived HTTP connections (once established, more like TCP connections).

WebSocket connections are resource intensive: constantly using a devices antenna, requiring power, CPU and memory. This affects mobile devices in particular.

We wanted a way to segregate and identify incoming and outgoing data, without using multiple transports. This is called multiplexing, where multiple signals can be sent through one transport.

Let's take a look at the `transport` call at [line 9 of server.es][]
again:

```js
transport(stream => {
  // register incoming votes
  stream.pipe(sink())

  // send votes out to all clients
  broadcast(stream)
})
```

We've already discussed incoming data, let's see how we send data out by
taking a look at the `broadcast` function on [line 17 of server.es][]:

```js
function broadcast (stream) {
  stream.setMaxListeners(12)
  // declarative ftw.
  source(EXCITED).pipe(channel(EXCITED)).pipe(stream)
  source(NEUTRAL).pipe(channel(NEUTRAL)).pipe(stream)
  source(BORED).pipe(channel(BORED)).pipe(stream)
  source(FAST).pipe(channel(FAST)).pipe(stream)
  source(PERFECT).pipe(channel(PERFECT)).pipe(stream)
  source(SLOW).pipe(channel(SLOW)).pipe(stream)
  source(TOPIC_A).pipe(channel(TOPIC_A)).pipe(stream)
  source(TOPIC_B).pipe(channel(TOPIC_B)).pipe(stream)
  source(TOPIC_C).pipe(channel(TOPIC_C)).pipe(stream)
  source(TOPIC_D).pipe(channel(TOPIC_D)).pipe(stream)
  source(TOPIC_E).pipe(channel(TOPIC_E)).pipe(stream)
}
```
The astute may note that this could have been written in about three lines of code. This code is repetitive *on purpose*.

Whilst it's true that in many cases "Don't Repeat Yourself" is an axiom worth observing, there are times when a declarative approach has more value. In this case we're describing data flow at the top level, we want to be explicit.

Our channels are represented by constants that refer to an integer. These constants are set in [config/chans.json][] and are shared between the server and the client. In [srv/lib/enums.js][] we load the `chans.json` file and flatten out the object structure, leaving us with a shallow object containing the channel names and numbers. 

`enums.js` processes `chan.json` into an object that looks like this:

```js
{
 EXCITED: 0, NEUTRAL: 1, BORED: 2, FAST: 3, PERFECT: 4, SLOW: 5
 TOPIC_A: 6, TOPIC_B: 7, TOPIC_C: 8, TOPIC_D: 9, TOPIC_E: 10
}
```

At the top of `server.es` we load these as constants:

```js
const {
  EXCITED, NEUTRAL, BORED,
  FAST, PERFECT, SLOW,
  TOPIC_A, TOPIC_B, TOPIC_C, TOPIC_D, TOPIC_E
} = require('./lib/enums')
```

This is where EcmaScript 6 destructuring really shines. It doesn't matter what order we specify the constants, as long as they match the properties of the object. This means as long as we keep the names the same in `chans.json` we can change the number of each channel and add new channels without disrupting anything. 

Streams are built on [EventEmitters][], which have a default soft limit of 11 listeners. Nothing breaks if this limit is met, however a warning of a potential memory leak is displayed. We happen to be creating eleven pipelines and attaching them all to the same stream. This leads to an `end` event listener getting added to the `stream` object eleven times. Since we know it's not a memory leak, we call `stream.setMaxListeners` and bump the limit from 11 to 12 to avoid outputting the warning. 

If we wanted to added hundreds of channels, we could pass an object as the second argument to each of the `.pipe(stream)` calls, the object would contain an `end` property with value false, e.g.

```js
source(TOPIC_A).pipe(channel(TOPIC_A)).pipe(stream, {end: false})
```

This would stop the listener from being added. If necessary we could then add a single listener for clean up. However, since we're only exceeding by one we simply bumped the maximum listeners setting.

Let's take a look at the `channel` stream, at [line 31 of srv/lib/conduit.js][].

```js
const channel = chan => through((data, enc, cb) => {
  cb(null, Buffer.concat([Buffer([chan]), data]))
})
```

Each time a chunk passes through the stream, we prefix the channel number to it. This gives us a maximum of 256 channels. If we wanted more than that we would consider using the [varint][] module which can create and recognize variable byte-length integers in a chunk of binary data. We only needed 12 channels, so we stuck with a one byte limit.

Notice how we us `cb` instead of `this.push` to pass data down-stream. As discussed
in the **EcmaScript 6** section, this is because we're using a lambda function as
the callback so in the above case `this` would refer to `undefined` instead
of our stream instance.

Finally we'll take a look at the `source` stream on [line 4 of srv/lib/conduit.js][].

```js
const source = stat => {
  var init
  var stream = through()

  const area = areaOf(stat)
  const voters = stats[area].voters
  const subject = stats[area][stat]

  if (!init) {
    init = true
    stream.push(percentages[stat] + '')
  }

  Object.observe(subject, () => {
    const votes = Object.keys(subject)
      .map(uid => subject[uid])
      .filter(Boolean).length

    percentages[stat] = (votes / voters.size || 0)

    stream.push(percentages[stat] + '')

  })

  return stream
}
```

Here we refer to the channel as the `stat`. For our purposes, these terms are interchangeable depending on context.  In [srv/lib/data.js][] we take advantage of the ES6 computed properties to set up clean and clear models. 

For example here's the `stats` object

```js
const stats = fs.existsSync(at('stats')) ?
  Object.seal(require(at('stats'))) :
  Object.seal({
    excitement: {
      voters: new Set(),
      [EXCITED]: hash(),
      [NEUTRAL]: hash(),
      [BORED]: hash()
    },
    pace: {
      voters: new Set(),
      [FAST]: hash(),
      [PERFECT]: hash(),
      [SLOW]: hash()
    },
    topic: {
      voters: new Set(),
      [TOPIC_A]: hash(),
      [TOPIC_B]: hash(),
      [TOPIC_C]: hash(),
      [TOPIC_D]: hash(),
      [TOPIC_E]: hash()
    }
  })
```

Again we're being purposefully declarative (and therefore somewhat repetitive).

Whenever we set up a `source` stream in `server.es` we begin to observe the object that exists at the property corresponding to the channel number in the `stats` object (the `subject`).

Any time the `subject` changes, we recalculate the vote percentages for that particular subject area.Then we push the new percentage along the stream (where the channel number is added then
sent out across the WebSocket transport).

We also use EcmaScript 6 destructuring to manage channels on the browser side. 
For instance, in [app/views/topic-out/view.js][]:

```js
const sync = require('../../logic/sync')
const chans = require('@atmos/config/chans.json')

const {TOPIC_A, TOPIC_B, TOPIC_C, TOPIC_D, TOPIC_E} = chans.topic

const map = (name) => (n) => {
  return {
    [name]: parseInt(n * 100, 10) + '%',
    ['_' + name]: n
  }
}

module.exports = (scope) => {
  sync(TOPIC_A, scope, map('topicA'))
  sync(TOPIC_B, scope, map('topicB'))
  sync(TOPIC_C, scope, map('topicC'))
  sync(TOPIC_D, scope, map('topicD'))
  sync(TOPIC_E, scope, map('topicE'))
}
```

We're only interested in the topic channels. Each of these channel numbers are passed to the `sync` function which listens for data on the transport whose prefix corresponds to a specified channel number. It then pops the channel number off the chunk, converts the byte array into floating point number, runs it through the supplied `map` function and mixes the resulting object into the `scope`, calling `scope.update` to ensure the UI reflects the updated object.

See [app/logic/sync.js][] for implementation details. 

Channels are used in the same way when sending data to the server, for instance [app/views/pace-in/view.js][]:

```js
const sync = require('../../logic/sync')
const chans = require('@atmos/config/chans.json')

const {FAST, PERFECT, SLOW} = chans.pace

module.exports = (scope) => {
  scope.fast = () => sync.vote(FAST)

  scope.perfect = () => sync.vote(PERFECT)

  scope.slow = () => sync.vote(SLOW)
}
```

Each of the channels are passed to `sync.vote` adds the channel number to the outgoing byte-array (the outgoing byte-array in this case is the 7 byte `uid` we created for the device).

We don't use streams on the client-side, once the core `stream` module is required it adds `100kb` to the payload when Browserified. There is the very light weight implementation of streams called `pull-stream` by Dominic Tarr which we could have used. However for this project simple callbacks on the browser side was sufficient.


## UI

As with every other part of the project, we wanted to create the UI quickly, and with minimal resource impact.

### Pure.css

For styling the application, we used [Pure.css][], mostly for its responsive grids. 

This was our first time using Pure.css, but we found it was easy to get moving quickly and it made responsive prototyping effortless. 

Whilst Pure.css already has a small footprint we used an optimization process only pull out the styles we needed (see Preprocessing). 

### Visual Scaling

The app needed to work on a wide range of screen sizes. From small mobile screens up to 1080p resolution on a large projector screen. To allow limitless scaling without pixelation, everything had to be created with vectors. Which means all graphics had to be created with HTML and CSS or with SVG. The smiley faces are SVG images, with small PNG fallback images on blackberry. 

We used `em` units for all measurements (instead of pixels or percentages). This means we could scale all elements by changing the base font-size. However with time running out we simply used browser zoom at the venue to get the right size for the projector screen. Whereas we used responsive grids to reflow the layout on smaller devices. 


## Preprocessing

All of our code needed to be processed prior to deployment, both on the server side and client side. On the server we needed ES6 to ES5 transpilation and linting. On the client we needed Browserification, Riotification (.. if those are words), and ES6 transpilation, CSS, JavaScript and HTML minification.

### npm: The Task Runner

There's a couple of strong task runners with great ecosystem out there.

Well known task runners include [Grunt][], [Gulp][] and [Broccoli][]. 

Nevertheless, if we're not dealing with a massive application with complex build process requirements, we prefer to use `package.json` `scripts`.

The `scripts` field in `package.json` allows us to define shell tasks that run in a context-specific environment - in that the path of these shell tasks includes the `node_modules/bin` folder. This allow us to drop the relative path when referencing executable dependencies. 

The shell is extremely powerful, and works well with streaming interfaces. We can use the pipe (`|`) to connect outputs. We can also use `&&` to create task chains, `&` to run tasks in parallel and `||` for fallback tasks.

To execute a task we us `npm run`. For instance the `dev` task in [app/package.json][] `scripts` object looks like this:

```js
"dev": "light-server -s . -w 'views/**, logic/**, main.js, index.dev.html' -c 'npm run build:app'"
```

This starts a server on `http://localhost:4000` and watches files, rebuilding when they change.

To run this we execute:

```sh
npm run dev
```

### EcmaScript 6

To transpile our ES6 code for the client side we included the following in [app/package.json][]
`scripts` field:

```js
"build:app": "Browserify -t babelify -t riotify ./main.js -o build/app.js",
```

We already know about Browserify and the Riotify transform. 

Babelify is another Browserify transform, that uses the [babel][] 
library to convert our ES6 code into ES5 code. 

On the server, `babel` itself is listed as dependency. 

In [srv/index.js][] we do the following:

```js
require('babel/register')
require('./server.es')
```

Requiring `babel/register` alters the requiring process itself, so any modules required after that will be transpiled (if necessary). In effect, we transpile on initialization.

### Standard

During rapid development, code discipline is not a primary focus. Ultimately, though, we want neat, readable code to come back to. 

[Standard][] is a type of linter that enforces a non-configurable code style. The idea behind this is philosophical, the premise being let's stop bike-shedding and just go with something. This seemed to have cohesion with project priorities so we used it to determine code discipline for this project.

Standard has a `--format` mode which rewrites code according to the rules of Standard. With this we could partially automate (it's not perfect) the tidy up process, thus saving time for more thought-intensive tasks. 

Standard uses [eslint][] as the parser. We're able to change the parser to [babel-eslint][] to apply standard linting and formatting to EcmaScript 6 code by installing [babel-eslint][] as a dependency and adding a `standard.parser` property set to `babel-eslint` in the `package.json` files.

For instance in the [srv/package.json][] file we have:
```js
...
  "standard": {
    "parser": "babel-eslint"
  },
  "scripts": {
    "lint": "standard"
  },
  "dependencies": {
    "babel": "^5.6.14",
    "babel-eslint": "^3.1.20",
...
```

The notable thing about Standard, is it *restricts* semi-colon usage to the rare edge cases. This is why there are no semi-colons in the code examples. 

It's difficult to talk about semi-colons without bikes-shedding, so we won't.

If Standard offends sensibilities there's also [Semistandard][] (..of course there is).


### Uncss, Inliner & HTML Minify

We didn't use a CSS preprocessor like Sass, LESS, or Stylus. The benefits of scoped styles combined with Pure.css was sufficient for our purposes. 

We did use [uncss][], an awesome utility that loads the page in a headless browser and cross references stylesheets DOM selector matches. Then it outputs the net CSS.

Let's take a look at the `build:compress` task in [app/package.json][] `scripts` field.

```js
"build:compress": "uncss http://localhost:4000/index.dev.html | cleancss --s0 --skip-import --skip-aggressive-merging | ./node_modules/.bin/@atmos/inliner index.dev.html | html-minifier --collapse-whitespace --remove-attribute-quotes --collapse-boolean-attributes > index.html",
``` 

For this to work, we have to also be running the `dev` task so we have a server on `localhost:4000`.

Notice how we load the [index.dev.html][] page (rather than the [index.html][] page).

Each of the executables in this tasks pipeline are project dependencies. 

Once we have the CSS subset, we pass it through the [cleancss][] utility cutting further bytes. 

Then we pipe it through `@atmos/inliner`, which was written for the project.

Unfortunately, `npm` currently [has a bug][] with scoped package executables. The relative path has to be specified, which is why we couldn't simply write `inliner` or `@atmos/inliner`.

The `inliner` takes an HTML file, and parses it using JSDOM, removing all `link` tags (it leaves inlined `style` tags alone). Then it creates a new `style` tag and writes the CSS that is piped to the process (our minified CSS subset). Finally the `inliner` outputs HTML file when done.

On both mobile networks (which participants ended up using due to slow WiFi), and strained WiFi networks the major issue is not broadband speed, but connection latency. 

In other words, making the connection is the bottleneck. This is why watching video over 3G isn't always terrible, but it generally takes longer for the video to start playing than on a typical functioning WiFi connection.

The `link` tag blocks page rendering until it has downloaded, which means in unoptimized form rendering is reliant on three (probably low-latency) HTTP connections.

By inlining the CSS we reduce render blocking connections down to zero, avoiding potential sluggish page loading. 

Each views' CSS is actually compiled by Riot into JavaScript. The `script` tag to load the applications JavaScript is placed at the bottom of the page. This setup allows styles for page structure to load close to instantly even on a slow connection, while component styles load alongside component functionality.

The only other HTTP request on page load is the font import. Again we place this at the bottom of the HTML structure to avoid render blocking.

Finally we pass it through `html-minifier` to squeeze out all the slack we can.


### Task Composition, Flag Delegation & Minifyify

Let's take a look at the `build:dist` and `build` tasks in `package.json` `script` field:

```js
"build:dist": "npm run build:assets; npm run build:app -- -d -p [minifyify --map app.js.map --output build/app.js.map]",
"build": "npm run build:compress && npm run build:app && npm run build:dist",
```

Because `npm run` is just another shell command, we can execute other tasks by their `script` alias. Now we can compose tasks from other tasks. This is what our `build` task does. 

We can also pass flags by proxy to the executables that are called within another task. In the `build:dist` we use a double dash (`--`) to instruct the task runner that the following flags apply to the last executable in the `build:app` tasks (which is the `Browserify` executable). 

We specify the `-d` flag which tells Browserify to retain data for creating [sourcemaps][], then we add the `-p` flag to load the Minifyify plugin (Minifyify is a Browserify plugin, not a Browserify transform). 

Long story short, by the end of the build process we have minified JavaScript (with a sourcemap). 


## Reliability and Recovery

There were some significant unknowns. We didn't know whether a bug in our code, or in a sub-dependency might be triggered by interactions between ~300 active WebSocket connection and we didn't have time to stress test. Even if we had time, there's no guarantee that we would perfectly emulate a live environment.

So if the server crashed, we needed to fail gracefully (or rather, fail in a way that nobody notices). 

### Persistence

If the server crashed we needed to retain state which could be reloaded on server restart. Various database options we're considered, but this meant another process to deploy and monitor. [LevelDB][] was a prime candidate because it runs in-process with the [leveldown][]/[levelup][] modules). However, since our deployment environment ([Digital Ocean][]) ran on solid state disks we decided to keep it simple and persist directly to disk. This was one of the last things we added. With time running out choosing straightforward filesystem manipulation meant avoiding learning another API. 

### Reconnection
If the server crashed, the client would lose their connection. The clients needed to be able to reconnect when the server came back online, without the user noticing.

In addition the ability to reconnect would smooth over any short-term intermittent connectivity issues the mobile or WiFi networks at the venue might have.

Thanks to closure scope and asynchronous mutual recursion we were able to implement a reconnection strategy in `sync.js` quickly and with a small amount of code.

On [line 5 of app/logic/sync.js][] we create out WebSocket connection:

```js
var ws = wsab('ws://' + location.hostname + ':4001')
```

`wsab` is a small function near the bottom of `sync.js`. It simply creates a binary WebSocket that uses [ArrayBuffers][] instead of the default [Blobs][].

 This is one of the few places where we use `var` to declare a reference. The `ws` token is a variable because if the client should disconnect for any reason we point `ws` to a new `WebSocket` instance holding the new (hopefully live) connection.

[Lines 22-36 of app/logic/sync.js] contain most of the rest of the magic:

```js
const recon = (attempt = 0) => {
  const factor = (attempt + 1) / 3
  const t = ~~(Math.random() * (2e3 * factor)) + 1e3 * factor
  setTimeout(() => {
    ws = wsab('ws://' + location.hostname + ':4001')
    ws.addEventListener('error', () => recon(attempt + 1))
    ws.addEventListener('open', attach);
  }, t)
}

const attach = () => {
  ws.addEventListener('close', () => recon())
  ws.addEventListener('message', e => update(e.data))
  reg = true
}
```

Whilst the WebSocket connection is created as soon as `app/logic/sync.js` is required, the `attach` function is invoked the first time its exported function is called. 

The `attach` function has two roles. It routes incoming messages to the `update` function  (which parses incoming messages then populates and updates a relevant components scope accordingly). It also attaches a `close` listener to the WebSocket. This is where the `recon` function comes in. 

The `recon` function returns a function that will repeatedly attempt to establish a new connection to the server. There is no limit to the  amount of attempts, however each attempt will take longer than the last.

Whilst the server could probably handle 300 simultaneous connection requests, time for proving this assertion was lacking. So we introduced pseudo-randomness to the exponential backoff strategy to prevent such a scenario.

Time-allowing, we could have made a completely seamless offline-first experience by recording current selections in `localStorage` and sending the selections back to the server upon reconnection.

### Supervisor
Finally we used the [supervisor][] utility to secure minimal downtime in the event of a server crash. 

```sh
npm install -g supervisor
```

Supervisor watches a process and restarts it if the process dies. 

This was the command we ran from the `atmos` directory to start our server

```sh
nohup supervisor srv &
```

## Behaviour Consistency

Near the top of [app/main.js][] (the entry point the client-side), several libraries are required to ensure cross-platform consistency. 

[Lines 5-11 of app/main.js][]:

```js
// polyfills/behaviour consistency
require('core-js/fn/set');
require('core-js/fn/array/from');
require('core-js/fn/object/assign')

require('fastclick')(document.body)
require('./logic/support').blackberry()
```

The [core-js][] module is divided up by feature. So we get to load only what we need.

The [fastclick][] module removes the 300ms delay before a touch is registered on mobile devices. Without this, mobile interaction seems lethargic.

Finally our purpose written [app/logic/support.js][] library is used to customize the display by adding a `blackberry` class to the `html` element if the device is a blackberry. The `support` library is used elsewhere to detect SVG support, and load PNG faces instead of SVG faces (again this primarily for blackberry).


## Deployment

We kept deployment very simple. We used an Ubuntu digital ocean instance,  with `node` and `git` installed on it. We pulled in changes onto the server with git, and ran the server with `nohup`. The `nohup` ("no hangup") command allows us to start a process over SSH and terminate the client session without killing the process. 

Due to its high performance and aggressive caching policy  we used [nginx][] to serve static files, simply creating symlinks to the local atmos git repository from the nginx serving folder.


## Testing

Unfortunately, like most time-constrained projects we didn't set up any automated tests.

TDD is awesome when there's time and forethought, however we were prototyping and exploring possibilities as we went. 

Moving forward, the testing strategy will mostly be at the component level. 

We could also do with a stress-testing suite to see how much activity the server can take before it comes under strain.


## Future

We'd like to break Atmos up more, decouple the view components and make them interchangeable. We'd like to make it very easy to create custom components so Atmos can be repurposed yet utilize the real-time infrastructure. We'll also look into an easy zero-config deployment strategy (possibly with docker containers).

Offline vote recording as discussed in the **Reconnection** section  would also be a nice feature.

We could look into using nginx to round-robin multiple WebSocket servers as well as serving static files. This would further protect availability in the event of a server crash: disconnected clients would quickly reconnect to the an alternative WebSocket server while the crashed server restarts. We would at this point either switch to a database to manage persistence across processes (LevelDB looks like a good choice) or implement a lateral transport layer (e.g. TCP or maybe a message bus) that achieves eventual consistency across the services (maybe we'd use [SenecaJS][] to abstract away the details).

We should probably also fix the layout issue in Internet Explorer.

## Conclusion

Being informed about current progressions in the ecosystem allowed us to make decisions that increased productivity whilst avoiding time sink-holes.

Before commencing a project it's worth weighing up the priorities and choosing an approach
that meets the criteria. For us it was mainly about payload size because we wanted the 
real-time application to feel instant, in spite of poor network conditions. 

Cross-platform functionality was less important, because we had a specific target audience. 
Therefore we sacrificed universal compatibility in favour of small file size. For instance we used 
plain WebSockets instead of [engine.io][] or [socket.io][] because old browsers simply weren't
important.

We hadn't heard of RiotJS before starting this project, but it was a breeze to work with. 
We think reasons for this include Riot's small API ideology, single-minded purpose, and 
concepts that parallel pre-existing paradigms without wrapping abstractions
in esoteric language (transclusion, anyone?). 

In summary, small is beautiful, research time is never lost time, tailor tools to priorities and always be open to different approaches.

Stay curious, see you next time!



[config]: https://github.com/costacruise/atmos/blob/v1/config
[config/chans.json]: https://github.com/costacruise/atmos/blob/v1/config/chans.json
[app/main.js]: https://github.com/costacruise/atmos/blob/v1/app/main.js
[index.dev.html]: https://github.com/costacruise/atmos/blob/v1/app/index.dev.html
[index.html]: https://github.com/costacruise/atmos/blob/v1/app/index.html

[app/package.json]: https://github.com/costacruise/atmos/blob/v1/app/package.json
[app/logic/uid.js]: https://github.com/costacruise/atmos/blob/v1/app/logic/uid.js
[app/logic/sync.js]: https://github.com/costacruise/atmos/blob/v1/app/logic/sync.js
[app/logic/support.js]: https://github.com/costacruise/atmos/blob/v1/app/logic/support.js
[app/views/tabs/package.json]: https://github.com/costacruise/atmos/blob/v1/app/views/tabs/package.json
[app/views/tabs/view.tag]: https://github.com/costacruise/atmos/blob/v1/app/views/tabs/view.tag
[app/views/tabs/view.js]: https://github.com/costacruise/atmos/blob/v1/app/views/tabs/view.js
[app/views/excitement-in/view.tag]: https://github.com/costacruise/atmos/blob/v1/app/views/excitement-in/view.tag
[app/views/topic-out/view.js]: https://github.com/costacruise/atmos/blob/v1/app/views/topic-out/view.js
[app/views/pace-in/view.js]: https://github.com/costacruise/atmos/blob/v1/app/views/pace-in/view.js
[app/views/excitement-in/style.tag]: https://github.com/costacruise/atmos/blob/v1/app/views/excitement-in/style.tag

[srv/index.js]: https://github.com/costacruise/atmos/blob/v1/srv/index.js
[srv/server.es]: https://github.com/costacruise/atmos/blob/v1/srv/server.es
[srv/package.json]: https://github.com/costacruise/atmos/blob/v1/srv/package.json
[srv/lib/transport.js]: https://github.com/costacruise/atmos/blob/v1/srv/lib/transport.js
[srv/lib/conduit.js]: https://github.com/costacruise/atmos/blob/v1/srv/lib/conduit.js
[srv/lib/enums.js]: https://github.com/costacruise/atmos/blob/v1/srv/lib/enums.js
[srv/lib/data.js]: https://github.com/costacruise/atmos/blob/v1/srv/lib/data.js

[lambdas (arrow functions)]: https://github.com/lukehoban/es6features#arrows
[destructuring]: https://github.com/lukehoban/es6features#destructuring
[default parameters]: https://github.com/lukehoban/es6features#default--rest--spread
[enhanced object literals]: https://github.com/lukehoban/es6features#enhanced-object-literals
[rest operator]: https://github.com/lukehoban/es6features#default--rest--spread
[spread operator]: https://github.com/lukehoban/es6features#default--rest--spread
[const]: https://github.com/lukehoban/es6features#let--const
[Classes]: https://github.com/lukehoban/es6features#classes
[Iterators]: https://github.com/lukehoban/es6features#iterators--forof
[ES6 module]: https://github.com/lukehoban/es6features#modules
[Set]: https://github.com/lukehoban/es6features#map--set--weakmap--weakset
[Object.observe]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
[Set]: https://github.com/lukehoban/es6features#map--set--weakmap--weakset
[Object.assign]: https://github.com/lukehoban/es6features#math--number--string--array--object-apis
[Array.from]: https://github.com/lukehoban/es6features#math--number--string--array--object-apis
[EventEmitters]: http://nodejs.org/api/events.html
[Node streams]: http://nodejs.org/api/stream.html
[ArrayBuffers]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
[Blobs]: https://developer.mozilla.org/en/docs/Web/API/Blob


[line 9 of server.es]: https://github.com/costacruise/atmos/blob/v1/srv/server.es#L9
[line 17 of server.es]: https://github.com/costacruise/atmos/blob/v1/srv/server.es#L17
[line 31 of srv/lib/conduit.js]: https://github.com/costacruise/atmos/blob/v1/srv/lib/conduit.js#L31
[line 4 of srv/lib/conduit.js]: https://github.com/costacruise/atmos/blob/v1/srv/lib/conduit.js#L4
[Lines 5-11 of app/main.js]: https://github.com/costacruise/atmos/blob/v1/app/main.js#L5-L11
[line 5 of app/logic/sync.js]: https://github.com/costacruise/atmos/blob/v1/app/logic/sync.js#L5
[Lines 22-36 of app/logic/sync.js]: https://github.com/costacruise/atmos/blob/v1/app/logic/sync.js#L22-L36



[has a bug]: https://github.com/npm/npm/issues/8640
[sourcemaps]: http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
[scoped package names]: https://docs.npmjs.com/misc/scope
[using anonymous functions]: http://www.nearform.com/nodecrunch/node-js-develop-debugging-techniques
[There's a direct correlation]: http://www.coverity.com/press-releases/coverity-scan-report-finds-open-source-software-quality-outpaces-proprietary-code-for-the-first-time/
[native specification]: https://html.spec.whatwg.org/multipage/semantics.html#attr-style-scoped
[may never be]: https://www.chromestatus.com/features/5374137958662144
[implemented]: http://caniuse.com/#feat=style-scoped
[across all browsers]: https://status.modern.ie/scopedstyles


[varint]: http://npmjs.com/varint
[babel]: http://npmjs.org/babel
[through2]: http://npmjs.com/through2
[eslint]: http://npmjs.com/eslint
[babel-eslint]: http://npmjs.com/babel-eslint
[Standard]: https://npmjs.com/standard 
[standard]: https://npmjs.com/standard
[semistandard]: http://npmjs.com/semistandard
[uncss]: http://npmjs.com/uncss
[cleancss]: http://npmjs.com/cleancss
[core-js]: http://npmjs.com/core-js
[fastclick]: http://npmjs.com/fastclick
[SenecaJS]: https://www.npmjs.com/package/seneca
[sinopia]: http://npmjs.com/sinopia
[levelup]: http://npmjs.com/levelup
[leveldown]: http://npmjs.com/leveldown
[supervisor]: http://npmjs.com/supervisor
[engine.io]: http://npmjs.org/engine.io
[socket.io]: http://npmjs.org/socket.io
[websocket-stream]: http://npmjs.org/websocket-stream


[npm]: http://npmjs.org
[Node.js]: http://nodejs.org
[io.js]: http://iojs.org
[Pure.css]: http://purecss.io
[Digital Ocean]: http://digitalocean.com
[nginx]: http://nginx.org/en/
[LevelDB]: http://leveldb.org/
[OOCSS]: http://oocss.org/
[SMACSS]: http://smacss.com/
[Gulp]: http://gulpjs.com
[Grunt]: http://gruntjs.com
[Broccoli]: broccolijs.com
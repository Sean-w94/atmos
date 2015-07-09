# Travelling Light
## Combining RiotJS, Node, Browserify, PureCSS and ES6 to rapidly prototype a performant realtime application

Business demands change and fluctuate constantly, there are occasions 
that require a quick turn around with a hard deadline.

This was one of those occasions.

The hard deadline in this case was an internal conference where our 
goal was to engender excitement for technology among stakeholders.

We decided to build a real-time conference voting application that 
allowed for input via personal devices (mobile, tablet, laptop) 
immediately displaying results on the presenters screen. We called our 
concept "Atmos".

We had one developer (myself) and two and a half days to have a working 
proof of concept, followed by the weekend and Monday for tidy-up, 
polishing, cross browser and performance testing. All told, from the 
back-end to the front-end, Atmos was completed in around five days.

# Viewing the Source

Atmos can be found on github 
[here](http://github.com/costacruise/atmos). The code is intended both 
as a reference for this article and as a potential starting point for 
anyone wanting to build a scalable (both in project scope and 
deployment) realtime application using some of the latest tools and 
techniques available.

```
git clone --branch v1 http://github.com/costacruise/atmos
```

## Considerations

Interestingly the primary constraints for our scenario match those of 
many other projects, though for different reasons and at difference 
scales.

### Time
As mentioned, we had 5 days and there was no room for deadline 
extension.

### Network
There's no such thing as a reliable network. In particular though, 
conference WiFi is typically poor at handling high load, and there was 
potential for esoteric firewall or proxy setups at the venue to cause 
issues.

### Robustness
This was a live demo to demonstrate the virtues of technology to 
non-developers. Noticeable failure could significantly hinder our 
message.

## Process

With little time for bike shedding, the top considerations had to 
influence our tools, priorities and workflow.

### Device Support

Given the time constraints we opted to support modern browsers and modern
devices only. All conference participants had received iPhones and iPads, 
however there was still an inclination towards blackberry devices. 

As a trade-off we supported touch screen blackberries, but did not implement 
support for key-only blackberries (adjusting the user interface alone would 
demand a significant time investment that we could not afford). 

We also didn't pay much attention to IE, even IE11 can be a time hog when 
it comes to compatibility and ~99% of our audience would be on mobile 
devices anyway.

Progressive enhancement for SEO and accessibility was not followed on this 
project, however our design and tool choices have made it easy to retrofit
progressive enhancement with server side rendering. 

### EcmaScript 6

[There's a direct correlation][] between code size and product quality.
Defect density can be measured in bugs per 1000 lines of code and averages
around 0.59 bugs per line for open source projects or .72 bugs per line
on proprietary code bases. Either way, there will always be a ratio of 
bugs to code size, thus the more boilerplate we can shed the better. 

EcmaScript 6 (a.k.a EcmaScript 2015) was finalized in June 2015. 
Parts of it have already been implemented in modern browsers and
in Node. However for cross-browser consistency and to run Node
without additional flags we transpiled the ES6 code into ES5 code
as part of the build process (see the Build Process section for details).

There was only a subset of ES6 features we wanted to use
for this project to help keep the code clean and readable. 

We stuck with micro-syntax extensions such as

* lambda functions
* property reflection
* destructuring
* default parameters
* methods shorthand
* property value shorthand
* rest operator
* spread operator
* const

These little pieces of sugar helped keep code cleaner and lighter.

In particular we used destructuring to emulate configuration based
enums which were then used to establish light-weight multiplexor 
(more on this later).

Another gem is the lamdas, the removal of noise around a function 
accelerates readability. However there is a potential debugging 
issue there (a similar issue to using anonymous functions). The code
base was small enough in our case to let that go on this occasion.

Usage of const was more of a mental assist, it prevented the (generally)
bad habit of reassignment, and made us think about what exactly
constitutes an actual variable reference.

Adopting ES6 syntax resulted in less code being written than using ES5, 
without obfuscating the intent of the code (in some cases, quite the opposite).

For this project we steered clear of macro-syntax extensions 
such as classes, modules and generators. 

For one thing, whilst learning the syntax of these language additions
is straightforward understanding the implications of their usage is a 
longer journey than we had time for. 

Further, there's the issue of code bloat during transpilation, 
plus runtime inefficiency (generators being the prime candidate slow 
execution when transpiled). 

Finally, it was important to keep the project simple, 
classes aren't the right paradigm for linear/cyclical data 
flow management (actually.. they aren't the right paradigm for
a prototypal language but that's another story!), 
iterators encourage a procedural approach 
(which is somewhat backwards) and the ES6 module system isn't
a good fit for current tooling. Also it may only be 
opinion but CommonJS modules are cleaner.

Finally we also used some ES6 language additions

* Object.observe
* Set
* Object.assign
* Array.from

The `Object.assign` and `Array.from` methods simply afforded a nice way
to do mixins and convert array like objects to arrays-proper (no more
`Array.prototype.slice.call(ThingThatsLikeAnArray)`, hooray!).

`Object.observe` and the `Set` constructor were fundamental to model
management. 

Using `Object.observe` meant that we could store data in a plain 
JavaScript object and react to changes in that object. This drove
the data flow: when a vote for an item came into the server, the
appropriate observed object was modified. When the object was changed,
the change was both broadcast to all open sockets and persisted to disk.

The `Set` constructor returns a unique list object. 
By pushing unique id's (determined browserside), onto a set 
we could keep a constant running total of voters which allowed us to 
calculate aggregated percentages.

### StandardJS


### Backend platform


### Choosing a frontend framework

To speed up development time we ideally wanted some form of view-layer
that provides data-binding capabilities. We also wanted to be able to
isolate features into components in order to reduce time-wasting bugs
that result from global collisions and general state confusion.

Angular is the predominant framework in use at Costa Digital. Whilst
componentization is a little muddied in Angular, it is nevertheless an 
excellent framework with a strong ecosystem. However, for this project 
we chose RiotJS. The driving factor in this decision was file size.

The less data we have to send across the wire, the faster the app will 
load and establish a realtime connection. Ideally, use of a 
framework should result in less code than writing an equivalent 
implementation sans-framework.

When minified Angular is 145.5kb whereas RiotJS is 11 times smaller at 12.75kb. 

| Framework              | Version    | Minified Size |
|------------------------|------------|---------------|
| Ember                  | 1.13.3     | 493.3kb       |
| Angular                | 1.4.2      | 145.5kb       |
| React                  | 0.13.3     | 121.7kb       |
| Web Components Polyfill| 0.7.5      | 117.1kb       |
| Riot                   | 2.2.2-beta | 12.75kb       |

Other alternatives were also deemed too large: Ember clocks in at a whopping 493kb,
almost half a megabyte before we write a single line of application code!
In fairness, Ember isn't primarily a view layer like React and Riot, it's an entire
MVC suite. But then so is Angular and it's a third of the size of Ember.

React is 121.7kb and that's before you include a flux implementation.

Another possibility was writing Atmos using future-standards with
the Web Components Polyfill (which is the basis for Polymer). The 
promise of this approach, is that over time we'll be able shed pieces
of the (currently 117kb) polyfill as browser support grows. 
However, WebComponents haven't been implemented as fast as expected 
by browser vendors, and anyway we had 5 days not 5 years. 

### RiotJS

Riot feels like Angular: templates are essentially HTML with a DSL 
layer. It's also inspired by React's virtual DOM, where changes are 
measured and executed by diffing an efficient DOM representation. The 
API surface of Riot is a small yet powerful set of primitives, which 
makes for a short and shallow learning curve. Perfect for our 
time-limited needs.

Unlike React where HTML can be written inline among JavaScript code 
(the JSX format), the Riot paradigm is to write JavaScript code 
inline among HTML.

For instance here's how a react component might be written

```js
 react comp 
 ```

Here's the equivalent in RiotJS

```js
 riot comp 
```

In some ways this looks like the return of the 90's but there is a 
vital difference. The event handler attributes in a Riot component 
can only reference methods that exist in their scope, whereas vanilla HTML 
handler attributes can only reference methods on the global scope - 
which we know is a recipe for disaster.

The scope is defined by the outer tag, which is initialized via 
`riot.mount`

```js 
riot.mount('... 
```

## Application Structure

The RiotJS philosophy is one of "tools not policy" which means we 
needed to define a structural approach for our application. To 
establish clean code boundaries we wanted a modular structure. Writing 
small single purpose modules helps to avoid human error.

### Client-side Modularity

For modules in the browser we used Browserify. Browserify allows us to write 
CommonJS modules for our frontend code. CommonJS is the module system 
implemented in Node. Use `require` to load a module, use 
`module.exports` to export a module.

For example, Atmos has a front-end local module (located in [app/logic/uid.js][]) 
which enables us to consistently identify a devices browser between page 
refreshes or closing and opening the browser. 

```js 
//app/logic/uid.js
const uid = () => Math.random().toString(35).substr(2, 7)
module.exports = () => (localStorage.uid = localStorage.uid || uid())
```

The `sync.js` module [app/logic/sync.js][] (which provides realtime communication) 
uses the `uid` module by requiring it (also converting it into an array of integers
representing byte values, in preparation for sending binary data across the wire):

```js
const uid = require('./uid')().split('').map(c => c.charCodeAt(0))
```

JavaScripters will note that this code uses some of the latest syntax
from EcmaScript (syntax that isn't supported by default in Node). We'll
talk more about this later (see EcmaScript 6).

For demonstration purposes, let's see how Browserify processes a require
statement. 

In the `atmos/app` folder we can run the following:

```sh
sudo npm install -g browserify
browserify <(echo "require('"$PWD"/logic/uid')") 
```

---screenshot of code run---


Standardizing a paradigm across environments by using the same module 
system for server and client implementations yields similar cognitive 
benefits to writing the entire stack in the same language.

## View Components

Browserify can be augmented with transforms. Riotify is a browserify
transform that allows us to `require` a riot view (a `.tag` file).

This allows us to create view-packages, where a view is a folder
that contains `package.json`, `view.tag` and `view.js` files, and
optionally a `style.tag` file.

In Atmos, the `tabs` view is a tiny component that outputs links 
based on the configuration of a menu array.

[app/views/tabs/package.json][]
```js
{ "main": "view.tag" }
```

The `package.json` file has one purpose: define the entry-point
for the `tabs` folder as the `view.tag` file instead of the default
`index.js` file as per Node's module loading algorithm. This allows
us to require the `tabs` folder (instead of `tabs/view.tag`).
Requiring a views folder helps to enforce the idea that the view
is a module that can stand on it's own. 


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

The `view.tag` file employs the `each` attribute (part of the Riot's DSL), 
to loop through objects in a `menu`, referencing each object as `item`.
Then we output the `item.name` linking into to the `item.href` for each item.

At the bottom we `require` the `view.js` file (`.js` is implied when omitted).

It's important to understand that the `tag` file actually represents a sort of
component object, we're just building that object using HTML syntax. The root
tag (`<tabs>` in this case) is a declaration of a component. When we pass
`this` to the function returned by `require('./view')` we are giving the `view.js`' 
exported function the components *instance*. Another way to think of it, is 
we're giving `view.js` the components *scope* object.


[app/views/tabs/view.js][]
```js
const menu = require('@atmos/config/menu.json')

module.exports = (scope) => scope.menu = menu
```

The `view.js` is the component controller (or perhaps it's a ViewController...).
When we attach the menu array to the scope object (e.g. the `this` object from
the `view.tag` file) we make it available to the component. 

Finally the apps entry point can load the tab view and mount it.

[app/main.js][]
```js
const riot = require('riot')
/* ... snip ... */
require('./views/tabs')
/* ... snip ... */
riot.mount('*')
/* .. snip ... */
```

Passing the asterisk to `riot.mount` essentially tells `riot` to mount all
required tags.


## Scoped Styles

Modularizing CSS seems to be the final frontier of frontend development. 
It's all too easy for web app styles to become entangled and confusing
because CSS selectors are global. Disciplines such as OOCSS and SMACSS
have arisen to tackle this problem. But when it comes to protecting the
sanity of a code-base, tools are better than convention.

RiotJS supports scoped style tags, for instance

```html
<my-tag>
  <p> Awesome </p>
  <style scoped> 
    p {font-size: 40em} 
    :scope {display:block; outline: 1px solid red}
  </style>
</my-tag>
```

This won't style **all** `p` tags at size 40em, only `p` tags
inside `my-tag`. Also the special pseduo-selector `:scope` 
applies to the `my-tag` tag.

Scoped styles were proposed as a native spec for browsers, 
but sadly may never be implemented across all browsers.

## Style Modules

It's possible to compose a tag from several sources
by redeclaring the tag and compiling each declaration 
separately. Browserify in conjunction with Riotify 
automatically compiles the tags via the `require` statement,
which means we can decouple style from structure whilst 
keeping it associated and scoped to the view.

Let's take a look at the `excitement-in` view
(this is the view that uses emoticons for user input)

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

In the `style.tag` file, the base element (`<excitement-in>`) is declared again
and the view components styles are placed inside a scoped style element.

There's a little more boilerplate than the standard CSS file, however the 
advantage of having the base tag in the styles file reinforces which view
the styles apply to.



## Shared Configuration


## Realtime Connections




## Development Environment

## Polyfills



## Deployment

## Testing

- test at a view level - include test descripting inside the view - 
also, have global e2e tests for general realtime func

## How did it go?

## Future


---

# Scratch Pad

* Time - we had to have rapid prototyping, along with structural 
choices that avoid time wasting bugs like global collisions yet provide 
good performance. We also saved time by writing one codebase that 
served as both the presentation app and the mobile/tablet/laptop ap



## Setting up

Thanks to Browserify our frontend application can take on the same form 
as our backend application and use the same package manager (npm).

To setup our app we simply created a folder and ran `npm init` in the folder.

```sh
mkdir app
cd app
npm init
npm install browserify --save-dev
```

After answering the questions, we get a `package.json` file.

```js
initial package.json file...

```




Notice we named our app `@atmos/app` instead of just `app`. 

This is known as a scoped package name. npm has a paid option 
that allows us to push to a private repo, it's also possible
to publish scoped packages to public by setting the `access`
flag

```
npm publish --access public
```

The fact that `npm` needs to be explitly told to publish
scoped packages publically, we've found that scoping our
packages prevents accidental publishing. 

We take an additional measure by adding an `.npmrc` file to
the  

[app/main.js]: https://github.com/costacruise/atmos/blob/master/app/main.js
[app/logic/uid.js]: https://github.com/costacruise/atmos/blob/master/app/logic/uid.js
[app/logic/sync.js]: https://github.com/costacruise/atmos/blob/master/app/logic/sync.js
[app/views/tabs/package.json]: https://github.com/costacruise/atmos/blob/master/app/views/tabs/package.json
[app/views/tabs/view.tag]: https://github.com/costacruise/atmos/blob/master/app/views/tabs/view.tag
[app/views/tabs/view.js]: https://github.com/costacruise/atmos/blob/master/app/views/tabs/view.js
[app/views/excitement-in/view.tag]: https://github.com/costacruise/atmos/blob/master/app/views/excitement-in/view.tag
[app/views/excitement-in/style.tag]: https://github.com/costacruise/atmos/blob/master/app/views/excitement-in/style.tag
[There's a direct correlation]: http://www.coverity.com/press-releases/coverity-scan-report-finds-open-source-software-quality-outpaces-proprietary-code-for-the-first-time/
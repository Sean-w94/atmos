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
influence our tools and workflow.

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
load and establish a WebSocket connection. Ideally, a use of a 
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
MVC suite. But then so is Angular and it's a third of the size.

React is 121.7kb and that's before you include a flux implementation.

Another consideration was writing Atmos using future-standards with
the Web Components Polyfill (which is the basis for Polymer). The 
promise of this approach, is that over time we'll be able shed pieces
of the (currently 117kb) polyfill as browser support grows. 
However, we had 5 days not 5 years. 

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
CommonJS modules for our front end code. CommonJS is the module system 
implemented in Node. Use `require` to load a module, use 
`module.exports` to export a module.

For example, Atmos has a front-end local module (located in [app/logic/uid.js][]) 
which enables us to
consistently identify a devices browser between page refreshes or closing
and opening the browser. 


```js 
const uid = () => Math.random().toString(35).substr(2, 7)
module.exports = () => (localStorage.uid = localStorage.uid || uid())
```



Standardizing a paradigm across environments by using the same module 
system for server and client implementations yields similar cognitive 
benefits to writing everything in the same language.


## View Components

Indicator inputs were divided up into views

## Realtime Connections

## Shared Configuration

## EcmaScript 6

## StandardJS

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


[app/logic/uid.js]: https://github.com/costacruise/atmos/blob/master/app/logic/uid.js
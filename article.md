# Travelling Light
## Combining RiotJS, Node, Browserify and ES6 to rapidly prototype a performant realtime application

Business demands change and fluctuate constantly, there are occasions 
that require a quick turn around with a hard deadline.

This was one of those occasions.

The hard deadline in this case was an internal conference where our 
goal was to engendre excitement for technology among stakeholders.

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
[here](http://github.com/costadigital/atmos). The code is intended both 
as a reference for this article and as a potential starting point for 
anyone wanting to build a scalable (both in project scope and 
deployment) realtime application using some of the latest tools and 
techniques available.

## Considerations

Interestingly the primary constriants for our scenario match those of 
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
non-developers. Noticeable failure could siginificantly hinder our 
message.

## Process

With little time for bike shedding, the top considerations had to 
influence our tools and workflow.

### Backend platform


### Choosing a frontend framework

To speed up development time and reduce time-wasting bugs like global 
collisions, the project needed structure and some form of data-binding 
for reactive elements.

Angular is the predominant framework in use at Costa Digital. It's an 
excellent framework with a strong ecosystem. However, for this project 
we chose RiotJS.

Angular is XXkb RiotJS is only XXkb. Similarly other alternatives are 
much to big for our purposes: Ember clocks in at a whopping XXkb, 
ReactJS is XXkb and that's before you include a flux implementation.

---frameworks and sizes table---

The less data we have to send accross the wire, the faster the app will 
load and establish a WebSocket connection. Ideally, a use of a 
framework should result in less code than writing an equivalent 
implementation sans-framework.

RiotJS feels like Angular: templates are essentially HTML with a DSL 
layer. It's also inspired by React's virtual DOM, where changes are 
measured and executed by diffing an efficient DOM representation. The 
API surface of RiotJS is a small yet powerful set of primitives, which 
makes for a short and shallow learning curve. Perfect for our 
time-limited needs.

Unlike React where HTML can be written inline among JavaScript code 
(the JSX format), the RiotJS paradigm is to write JavaScript code 
inline among HTML.

For instance here's how a react component might be written

```js react comp ```

Here's the equivalent in RiotJS

```js riot comp ```

In some ways this looks like the return of the 90's but there is a 
vital difference. The event handler attributes in the HTML can only 
reference methods that exist in their scope, whereas vanilla HTML 
handler attributes can only reference methods on the global scope - 
which we know is a recipe for disaster.

The scope is defined by the outer tag, which is initialized via 
`riot.mount`

``` riot.mount('... ```

## Application Structure

The RiotJS philosophy is one of "tools not policy" which means we 
needed to define a structural approach for our application. To 
establish clean code boundaries we wanted a modular structure. Writing 
small single purpose modules helps to avoid human error.

We achieved this with browserify. Browserify allows us to write 
CommonJS modules for our front end code. CommonJS is the module system 
implemented in Node. Use `require` to load a module, use 
`module.exports` to export a module.

```js require and export

```

Standardizing a paradigm accross environments by using the same module 
system for server and client implementions yields similar cognitive 
benefits to writing everything in the same language.

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


* Time - we had to have rapid prototyping, along with structural 
choices that avoid time wasting bugs like global collisions yet provide 
good performance. We also saved time by writing one codebase that 
served as both the presentation app and the mobile/tablet/laptop ap

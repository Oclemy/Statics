This page serves as a quick overview over all exported functions.



---



---

## Component

`Component` is a base class that can be extended to create stateful Preact components.

Rather than being instantiated directly, Components are managed by the renderer and created as-needed.


```javascript
import { Component } from 'preact';

class MyComponent extends Component {
  // (see below)
}
```
### Component.render(props, state)

All components must provide a `render()` function. The render function is passed the component's current props and state, and should return a Virtual DOM Element (typically a JSX "element"), an Array, or `null`.


```javascript
import { Component } from 'preact';

class MyComponent extends Component {
    render(props, state) {
        // props is the same as this.props
        // state is the same as this.state

        return <h1>Hello, {props.name}!</h1>;
    }
}
```
To learn more about components and how they can be used, check out the [Components Documentation](https://preactjs.com/guide/v10/components).

## render()

`render(virtualDom, containerNode, [replaceNode])`

Render a Virtual DOM Element into a parent DOM element `containerNode`. Does not return anything.


```javascript
// DOM tree before render:
// <div id="container"></div>

import { render } from 'preact';

const Foo = () => <div>foo</div>;

render(<Foo />, document.getElementById('container'));

// After render:
// <div id="container">
// <div>foo</div>
// </div>
```
[Run in REPL](https://preactjs.com/repl?code=%2F%2F%20DOM%20tree%20before%20render%3A%0A%2F%2F%20%3Cdiv%20id%3D%22container%22%3E%3C%2Fdiv%3E%0A%0Aimport%20%7B%20render%20%7D%20from%20'preact'%3B%0A%0Aconst%20Foo%20%3D%20()%20%3D%3E%20%3Cdiv%3Efoo%3C%2Fdiv%3E%3B%0A%0Arender(%3CFoo%20%2F%3E%2C%20document.getElementById('container'))%3B%0A%0A%2F%2F%20After%20render%3A%0A%2F%2F%20%3Cdiv%20id%3D%22container%22%3E%0A%2F%2F%20%20%3Cdiv%3Efoo%3C%2Fdiv%3E%0A%2F%2F%20%3C%2Fdiv%3E)If the optional `replaceNode` parameter is provided, it must be a child of `containerNode`. Instead of inferring where to start rendering, Preact will update or replace the passed element using its diffing algorithm.


> ⚠️ The `replaceNode`-argument will be removed with Preact `v11`. It introduces too many edge cases and bugs which need to be accounted for in the rest of Preact's source code. We're leaving this section up for historical reasons, but we don't recommend anyone to use the third `replaceNode` argument.
> 
> 


```javascript
// DOM tree before render:
// <div id="container">
// <div>bar</div>
// <div id="target">foo</div>
// </div>

import { render } from 'preact';

const Foo = () => <div id="target">BAR</div>;

render(
  <Foo />,
  document.getElementById('container'),
  document.getElementById('target')
);

// After render:
// <div id="container">
// <div>bar</div>
// <div id="target">BAR</div>
// </div>
```
The first argument must be a valid Virtual DOM Element, which represents either a component or an element. When passing a Component, it's important to let Preact do the instantiation rather than invoking your component directly, which will break in unexpected ways:


```javascript
const App = () => <div>foo</div>;

// DON'T: Invoking components directly breaks hooks and update ordering:
render(App(), rootElement); // ERROR
render(App, rootElement); // ERROR

// DO: Passing components using h() or JSX allows Preact to render correctly:
render(h(App), rootElement); // success
render(<App />, rootElement); // success
```
## hydrate()

If you've already pre-rendered or server-side-rendered your application to HTML, Preact can bypass most rendering work when loading in the browser. This can be enabled by switching from `render()` to `hydrate()`, which skips most diffing while still attaching event listeners and setting up your component tree. This works only when used in conjunction with [pre-rendering](https://preactjs.com/guide/v10/cli/pre-rendering) or [Server-Side Rendering](https://preactjs.com/guide/v10/server-side-rendering).


```javascript
import { hydrate } from 'preact';

const Foo = () => <div>foo</div>;
hydrate(<Foo />, document.getElementById('container'));
```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20hydrate%20%7D%20from%20'preact'%3B%0A%0Aconst%20Foo%20%3D%20()%20%3D%3E%20%3Cdiv%3Efoo%3C%2Fdiv%3E%3B%0Ahydrate(%3CFoo%20%2F%3E%2C%20document.getElementById('container'))%3B)## h() / createElement()

`h(type, props, ...children)`

Returns a Virtual DOM Element with the given `props`. Virtual DOM Elements are lightweight descriptions of a node in your application's UI hierarchy, essentially an object of the form `{ type, props }`.

After `type` and `props`, any remaining parameters are collected into a `children` property. Children may be any of the following:

* Scalar values (string, number, boolean, null, undefined, etc)
* Nested Virtual DOM Elements
* Infinitely nested Arrays of the above


```javascript
import { h } from 'preact';

h('div', { id: 'foo' }, 'Hello!');
// <div id="foo">Hello!</div>

h('div', { id: 'foo' }, 'Hello', null, ['Preact!']);
// <div id="foo">Hello Preact!</div>

h(
    'div',
    { id: 'foo' },
    h('span', null, 'Hello!')
);
// <div id="foo"><span>Hello!</span></div>
```
## toChildArray

This helper function converts a `props.children` value to a flattened Array regardless of its structure or nesting. If `props.children` is already an array, a copy is returned. This function is useful in cases where `props.children` may not be an array, which can happen with certain combinations of static and dynamic expressions in JSX.

For Virtual DOM Elements with a single child, `props.children` is a reference to the child. When there are multiple children, `props.children` is always an Array. The `toChildArray` helper provides a way to consistently handle all cases.


```javascript
import { toChildArray } from 'preact';

function Foo(props) {
  const count = toChildArray(props.children).length;
  return <div>I have {count} children</div>;
}

// props.children is "bar"
render(
  <Foo>bar</Foo>,
  container
);

// props.children is [<p>A</p>, <p>B</p>]
render(
  <Foo>
 <p>A</p>
 <p>B</p>
 </Foo>,
  container
);
```
## cloneElement

`cloneElement(virtualElement, props, ...children)`

This function allows you to create a shallow copy of a Virtual DOM Element. It's generally used to add or overwrite `props` of an element:


```javascript
function Linkout(props) {
  // add target="_blank" to the link:
  return cloneElement(props.children, { target: '_blank' });
}
render(<Linkout><a href="/">home</a></Linkout>);
// <a href="/" target="_blank">home</a>
```
## createContext

See the section in the [Context documentation](https://preactjs.com/guide/v10/context#createcontext).

## createRef

Provides a way to reference an element or component once it has been rendered.

See the [References documentation](https://preactjs.com/guide/v10/refs#createref) for more details.

## Fragment

A special kind of component that can have children, but is not rendered as a DOM element. Fragments make it possible to return multiple sibling children without needing to wrap them in a DOM container:


```javascript
import { Fragment, render } from 'preact';

render(
  <Fragment>
 <div>A</div>
 <div>B</div>
 <div>C</div>
 </Fragment>,
  document.getElementById('container')
);
// Renders:
// <div id="container>
// <div>A</div>
// <div>B</div>
// <div>C</div>
// </div>
```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20Fragment%2C%20render%20%7D%20from%20'preact'%3B%0A%0Arender(%0A%20%20%3CFragment%3E%0A%20%20%20%20%3Cdiv%3EA%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%3EB%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%3EC%3C%2Fdiv%3E%0A%20%20%3C%2FFragment%3E%2C%0A%20%20document.getElementById('container')%0A)%3B%0A%2F%2F%20Renders%3A%0A%2F%2F%20%3Cdiv%20id%3D%22container%3E%0A%2F%2F%20%20%20%3Cdiv%3EA%3C%2Fdiv%3E%0A%2F%2F%20%20%20%3Cdiv%3EB%3C%2Fdiv%3E%0A%2F%2F%20%20%20%3Cdiv%3EC%3C%2Fdiv%3E%0A%2F%2F%20%3C%2Fdiv%3E)



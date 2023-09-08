Components represent the basic building block in Preact. They are fundamental in making it easy to build complex UIs from little building blocks. They're also responsible for attaching state to our rendered output.

There are two kinds of components in Preact, which we'll talk about in this guide.



---



---

## Functional Components

Functional components are plain functions that receive `props` as the first argument. The function name **must** start with an uppercase letter in order for them to work in JSX.


```javascript
function MyComponent(props) {
  return <div>My name is {props.name}.</div>;
}

// Usage
const App = <MyComponent name="John Doe" />;

// Renders: <div>My name is John Doe.</div>
render(App, document.body);
```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%20%7D%20from%20'preact'%3B%0A%0A%0Afunction%20MyComponent(props)%20%7B%0A%20%20return%20%3Cdiv%3EMy%20name%20is%20%7Bprops.name%7D.%3C%2Fdiv%3E%3B%0A%7D%0A%0A%2F%2F%20Usage%0Aconst%20App%20%3D%20%3CMyComponent%20name%3D%22John%20Doe%22%20%2F%3E%3B%0A%0A%2F%2F%20Renders%3A%20%3Cdiv%3EMy%20name%20is%20John%20Doe.%3C%2Fdiv%3E%0Arender(App%2C%20document.body)%3B)
> Note in earlier versions they were known as `"Stateless Components"`. This doesn't hold true anymore with the [hooks-addon](https://preactjs.com/guide/v10/hooks).
> 
> 

## Class Components

Class components can have state and lifecycle methods. The latter are special methods, that will be called when a component is attached to the DOM or destroyed for example.

Here we have a simple class component called `<Clock>` that displays the current time:


```javascript
class Clock extends Component {

  constructor() {
    super();
    this.state = { time: Date.now() };
  }

  // Lifecycle: Called whenever our component is created
  componentDidMount() {
    // update time every second
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  // Lifecycle: Called just before our component will be destroyed
  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer);
  }

  render() {
    let time = new Date(this.state.time).toLocaleTimeString();
    return <span>{time}</span>;
  }
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20Component%2C%20render%20%7D%20from%20'preact'%3B%0A%0A%0Aclass%20Clock%20extends%20Component%20%7B%0A%0A%20%20constructor()%20%7B%0A%20%20%20%20super()%3B%0A%20%20%20%20this.state%20%3D%20%7B%20time%3A%20Date.now()%20%7D%3B%0A%20%20%7D%0A%0A%20%20%2F%2F%20Lifecycle%3A%20Called%20whenever%20our%20component%20is%20created%0A%20%20componentDidMount()%20%7B%0A%20%20%20%20%2F%2F%20update%20time%20every%20second%0A%20%20%20%20this.timer%20%3D%20setInterval(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20this.setState(%7B%20time%3A%20Date.now()%20%7D)%3B%0A%20%20%20%20%7D%2C%201000)%3B%0A%20%20%7D%0A%0A%20%20%2F%2F%20Lifecycle%3A%20Called%20just%20before%20our%20component%20will%20be%20destroyed%0A%20%20componentWillUnmount()%20%7B%0A%20%20%20%20%2F%2F%20stop%20when%20not%20renderable%0A%20%20%20%20clearInterval(this.timer)%3B%0A%20%20%7D%0A%0A%20%20render()%20%7B%0A%20%20%20%20let%20time%20%3D%20new%20Date(this.state.time).toLocaleTimeString()%3B%0A%20%20%20%20return%20%3Cspan%3E%7Btime%7D%3C%2Fspan%3E%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CClock%20%2F%3E%2C%20document.getElementById('app'))%3B%0A)### Lifecycle Methods

In order to have the clock's time update every second, we need to know when `<Clock>` gets mounted to the DOM. *If you've used HTML5 Custom Elements, this is similar to the `attachedCallback` and `detachedCallback` lifecycle methods.* Preact invokes the following lifecycle methods if they are defined for a Component:



| Lifecycle method | When it gets called |
| --- | --- |
| `componentWillMount()` | (deprecated) before the component gets mounted to the DOM |
| `componentDidMount()` | after the component gets mounted to the DOM |
| `componentWillUnmount()` | prior to removal from the DOM |
| `componentWillReceiveProps(nextProps, nextState)` | before new props get accepted *(deprecated)* |
| `getDerivedStateFromProps(nextProps)` | just before `shouldComponentUpdate`. Use with care. |
| `shouldComponentUpdate(nextProps, nextState)` | before `render()`. Return `false` to skip render |
| `componentWillUpdate(nextProps, nextState)` | before `render()` *(deprecated)* |
| `getSnapshotBeforeUpdate(prevProps, prevState)` | called just before `render()`. return value is passed to `componentDidUpdate`. |
| `componentDidUpdate(prevProps, prevState, snapshot)` | after `render()` |


> See [this diagram](https://twitter.com/dan_abramov/status/981712092611989509) to get a visual overview of how they relate to each other.
> 
> 

#### componentDidCatch

There is one lifecycle method that deserves a special recognition and that is `componentDidCatch`. It's special because it allows you to handle any errors that happen during rendering. This includes errors that happened in a lifecycle hook but excludes any asynchronously thrown errors, like after a `fetch()` call.

When an error is caught, we can use this lifecycle to react to any errors and display a nice error message or any other fallback content.


```javascript
class Catcher extends Component {

  constructor() {
    super();
    this.state = { errored: false };
  }

  componentDidCatch(error) {
    this.setState({ errored: true });
  }

  render(props, state) {
    if (state.errored) {
      return <p>Something went badly wrong</p>;
    }
    return props.children;
  }
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20Component%2C%20render%20%7D%20from%20'preact'%3B%0A%0Aclass%20Catcher%20extends%20Component%20%7B%0A%0A%20%20constructor()%20%7B%0A%20%20%20%20super()%3B%0A%20%20%20%20this.state%20%3D%20%7B%20errored%3A%20false%20%7D%3B%0A%20%20%7D%0A%0A%20%20componentDidCatch(error)%20%7B%0A%20%20%20%20this.setState(%7B%20errored%3A%20true%20%7D)%3B%0A%20%20%7D%0A%0A%20%20render(props%2C%20state)%20%7B%0A%20%20%20%20if%20(state.errored)%20%7B%0A%20%20%20%20%20%20return%20%3Cp%3ESomething%20went%20badly%20wrong%3C%2Fp%3E%3B%0A%20%20%20%20%7D%0A%20%20%20%20return%20props.children%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CCatcher%20%2F%3E%2C%20document.getElementById('app'))%3B%0A)## Fragments

A `Fragment` allows you to return multiple elements at once. They solve the limitation of JSX where every "block" must have a single root element. You'll often encounter them in combination with lists, tables or with CSS flexbox where any intermediate element would otherwise affect styling.


```javascript
import { Fragment, render } from 'preact';

function TodoItems() {
  return (
    <Fragment>
 <li>A</li>
 <li>B</li>
 <li>C</li>
 </Fragment>
  )
}

const App = (
  <ul>
 <TodoItems />
 <li>D</li>
 </ul>
);

render(App, container);
// Renders:
// <ul>
// <li>A</li>
// <li>B</li>
// <li>C</li>
// <li>D</li>
// </ul>
```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20Fragment%2C%20render%20%7D%20from%20'preact'%3B%0A%0Afunction%20TodoItems()%20%7B%0A%20%20return%20(%0A%20%20%20%20%3CFragment%3E%0A%20%20%20%20%20%20%3Cli%3EA%3C%2Fli%3E%0A%20%20%20%20%20%20%3Cli%3EB%3C%2Fli%3E%0A%20%20%20%20%20%20%3Cli%3EC%3C%2Fli%3E%0A%20%20%20%20%3C%2FFragment%3E%0A%20%20)%0A%7D%0A%0Aconst%20App%20%3D%20(%0A%20%20%3Cul%3E%0A%20%20%20%20%3CTodoItems%20%2F%3E%0A%20%20%20%20%3Cli%3ED%3C%2Fli%3E%0A%20%20%3C%2Ful%3E%0A)%3B%0A%0Arender(App%2C%20container)%3B%0A%2F%2F%20Renders%3A%0A%2F%2F%20%3Cul%3E%0A%2F%2F%20%20%20%3Cli%3EA%3C%2Fli%3E%0A%2F%2F%20%20%20%3Cli%3EB%3C%2Fli%3E%0A%2F%2F%20%20%20%3Cli%3EC%3C%2Fli%3E%0A%2F%2F%20%20%20%3Cli%3ED%3C%2Fli%3E%0A%2F%2F%20%3C%2Ful%3E)Note that most modern transpilers allow you to use a shorter syntax for `Fragments`. The shorter one is a lot more common and is the one you'll typically encounter.


```javascript
// This:
const Foo = <Fragment>foo</Fragment>;
// ...is the same as this:
const Bar = <>foo</>;
```
You can also return arrays from your components:


```javascript
function Columns() {
  return [
    <td>Hello</td>,
    <td>World</td>
  ];
}
```
Don't forget to add keys to `Fragments` if you create them in a loop:


```javascript
function Glossary(props) {
  return (
    <dl>
 {props.items.map(item => (
        // Without a key, Preact has to guess which elements have
        // changed when re-rendering.
        <Fragment key={item.id}>
 <dt>{item.term}</dt>
 <dd>{item.description}</dd>
 </Fragment>
      ))}
 </dl>
  );
}
```




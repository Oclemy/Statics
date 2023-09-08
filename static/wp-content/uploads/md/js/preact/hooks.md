Hooks is a new concept that allows you to compose state and side effects. They allow you to reuse stateful logic between components.

If you've worked with Preact for a while, you may be familiar with patterns like "render props" and "higher order components" that try to solve these challenges. These solutions have tended to make code harder to follow and more abstract. The hooks API makes it possible to neatly extract the logic for state and side effects, and also simplifies unit testing that logic independently from the components that rely on it.

Hooks can be used in any component, and avoid many pitfalls of the `this` keyword relied on by the class components API. Instead of accessing properties from the component instance, hooks rely on closures. This makes them value-bound and eliminates a number of stale data problems that can occur when dealing with asynchronous state updates.

There are two ways to import hooks: from `preact/hooks` or `preact/compat`.



---



---

## Introduction

The easiest way to understand hooks is to compare them to equivalent class-based Components.

We'll use a simple counter component as our example, which renders a number and a button that increases it by one:


```javascript
class Counter extends Component {
  state = {
    value: 0
  };

  increment = () => {
    this.setState(prev => ({ value: prev.value +1 }));
  };

  render(props, state) {
    return (
      <div>
 <p>Counter: {state.value}</p>
 <button onClick={this.increment}>Increment</button>
 </div>
    );
  }
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%2C%20Component%20%7D%20from%20%22preact%22%3B%0A%0Aclass%20Counter%20extends%20Component%20%7B%0A%20%20state%20%3D%20%7B%0A%20%20%20%20value%3A%200%0A%20%20%7D%3B%0A%0A%20%20increment%20%3D%20()%20%3D%3E%20%7B%0A%20%20%20%20this.setState(prev%20%3D%3E%20(%7B%20value%3A%20prev.value%20%2B1%20%7D))%3B%0A%20%20%7D%3B%0A%0A%20%20render(props%2C%20state)%20%7B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%3Cp%3ECounter%3A%20%7Bstate.value%7D%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%3Cbutton%20onClick%3D%7Bthis.increment%7D%3EIncrement%3C%2Fbutton%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20)%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CCounter%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)Now, here's an equivalent function component built with hooks:


```javascript
function Counter() {
  const [value, setValue] = useState(0);
  const increment = useCallback(() => {
    setValue(value + 1);
  }, [value]);

  return (
    <div>
 <p>Counter: {value}</p>
 <button onClick={increment}>Increment</button>
 </div>
  );
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20useState%2C%20useCallback%20%7D%20from%20%22preact%2Fhooks%22%3B%0Aimport%20%7B%20render%20%7D%20from%20%22preact%22%3B%0A%0Afunction%20Counter()%20%7B%0A%20%20const%20%5Bvalue%2C%20setValue%5D%20%3D%20useState(0)%3B%0A%20%20const%20increment%20%3D%20useCallback(()%20%3D%3E%20%7B%0A%20%20%20%20setValue(value%20%2B%201)%3B%0A%20%20%7D%2C%20%5Bvalue%5D)%3B%0A%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%3Cp%3ECounter%3A%20%7Bvalue%7D%3C%2Fp%3E%0A%20%20%20%20%20%20%3Cbutton%20onClick%3D%7Bincrement%7D%3EIncrement%3C%2Fbutton%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%0A%0Arender(%3CCounter%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)At this point they seem pretty similar, however we can further simplify the hooks version.

Let's extract the counter logic into a custom hook, making it easily reusable across components:


```javascript
function useCounter() {
  const [value, setValue] = useState(0);
  const increment = useCallback(() => {
    setValue(value + 1);
  }, [value]);
  return { value, increment };
}

// First counter
function CounterA() {
  const { value, increment } = useCounter();
  return (
    <div>
 <p>Counter A: {value}</p>
 <button onClick={increment}>Increment</button>
 </div>
  );
}

// Second counter which renders a different output.
function CounterB() {
  const { value, increment } = useCounter();
  return (
    <div>
 <h1>Counter B: {value}</h1>
 <p>I'm a nice counter</p>
 <button onClick={increment}>Increment</button>
 </div>
  );
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20useState%2C%20useCallback%20%7D%20from%20%22preact%2Fhooks%22%3B%0Aimport%20%7B%20render%20%7D%20from%20%22preact%22%3B%0A%0Afunction%20useCounter()%20%7B%0A%20%20const%20%5Bvalue%2C%20setValue%5D%20%3D%20useState(0)%3B%0A%20%20const%20increment%20%3D%20useCallback(()%20%3D%3E%20%7B%0A%20%20%20%20setValue(value%20%2B%201)%3B%0A%20%20%7D%2C%20%5Bvalue%5D)%3B%0A%20%20return%20%7B%20value%2C%20increment%20%7D%3B%0A%7D%0A%0A%2F%2F%20First%20counter%0Afunction%20CounterA()%20%7B%0A%20%20const%20%7B%20value%2C%20increment%20%7D%20%3D%20useCounter()%3B%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%3Cp%3ECounter%20A%3A%20%7Bvalue%7D%3C%2Fp%3E%0A%20%20%20%20%20%20%3Cbutton%20onClick%3D%7Bincrement%7D%3EIncrement%3C%2Fbutton%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%0A%0A%2F%2F%20Second%20counter%20which%20renders%20a%20different%20output.%0Afunction%20CounterB()%20%7B%0A%20%20const%20%7B%20value%2C%20increment%20%7D%20%3D%20useCounter()%3B%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%3Ch1%3ECounter%20B%3A%20%7Bvalue%7D%3C%2Fh1%3E%0A%20%20%20%20%20%20%3Cp%3EI'm%20a%20nice%20counter%3C%2Fp%3E%0A%20%20%20%20%20%20%3Cbutton%20onClick%3D%7Bincrement%7D%3EIncrement%3C%2Fbutton%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%0A%0Arender(%0A%20%20%3Cdiv%3E%0A%20%20%20%20%3CCounterA%20%2F%3E%0A%20%20%20%20%3CCounterB%20%2F%3E%0A%20%20%3C%2Fdiv%3E%2C%0A%20%20document.getElementById(%22app%22)%0A)%3B%0A)Note that both `CounterA` and `CounterB` are completely independent of each other. They both use the `useCounter()` custom hook, but each has its own instance of that hook's associated state.


> Thinking this looks a little strange? You're not alone!
> 
> It took many of us a while to grow accustomed to this approach.
> 
> 

## The dependency argument

Many hooks accept an argument that can be used to limit when a hook should be updated. Preact inspects each value in a dependency array and checks to see if it has changed since the last time a hook was called. When the dependency argument is not specified, the hook is always executed.

In our `useCounter()` implementation above, we passed an array of dependencies to `useCallback()`:


```javascript
function useCounter() {
  const [value, setValue] = useState(0);
  const increment = useCallback(() => {
    setValue(value + 1);
  }, [value]);  // <-- the dependency array
  return { value, increment };
}
```
Passing `value` here causes `useCallback` to return a new function reference whenever `value` changes. This is necessary in order to avoid "stale closures", where the callback would always reference the first render's `value` variable from when it was created, causing `increment` to always set a value of `1`.


> This creates a new `increment` callback every time `value` changes. For performance reasons, it's often better to use a [callback](https://preactjs.com/#usestate) to update state values rather than retaining the current value using dependencies.
> 
> 

## Stateful hooks

Here we'll see how we can introduce stateful logic into functional components.

Prior to the introduction of hooks, class components were required anywhere state was needed.

### useState

This hook accepts an argument, this will be the initial state. When invoked this hook returns an array of two variables. The first being the current state and the second being the setter for our state.

Our setter behaves similar to the setter of our classic state. It accepts a value or a function with the currentState as argument.

When you call the setter and the state is different, it will trigger a rerender starting from the component where that useState has been used.


```javascript
import { useState } from 'preact/hooks';

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  // You can also pass a callback to the setter
  const decrement = () => setCount((currentCount) => currentCount - 1);

  return (
    <div>
 <p>Count: {count}</p>
 <button onClick={increment}>Increment</button>
 <button onClick={decrement}>Decrement</button>
 </div>
  )
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%20%7D%20from%20'preact'%3B%0A%0Aimport%20%7B%20useState%20%7D%20from%20'preact%2Fhooks'%3B%0A%0Aconst%20Counter%20%3D%20()%20%3D%3E%20%7B%0A%20%20const%20%5Bcount%2C%20setCount%5D%20%3D%20useState(0)%3B%0A%20%20const%20increment%20%3D%20()%20%3D%3E%20setCount(count%20%2B%201)%3B%0A%20%20%2F%2F%20You%20can%20also%20pass%20a%20callback%20to%20the%20setter%0A%20%20const%20decrement%20%3D%20()%20%3D%3E%20setCount((currentCount)%20%3D%3E%20currentCount%20-%201)%3B%0A%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%3Cp%3ECount%3A%20%7Bcount%7D%3C%2Fp%3E%0A%20%20%20%20%20%20%3Cbutton%20onClick%3D%7Bincrement%7D%3EIncrement%3C%2Fbutton%3E%0A%20%20%20%20%20%20%3Cbutton%20onClick%3D%7Bdecrement%7D%3EDecrement%3C%2Fbutton%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%0A%7D%0A%0Arender(%3CCounter%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)
> When our initial state is expensive it's better to pass a function instead of a value.
> 
> 

### useReducer

The `useReducer` hook has a close resemblance to [redux](https://redux.js.org/). Compared to [useState](https://preactjs.com/#usestate) it's easier to use when you have complex state logic where the next state depends on the previous one.


```javascript
import { useReducer } from 'preact/hooks';

const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    case 'reset': return 0;
    default: throw new Error('Unexpected action');
  }
};

function Counter() {
  // Returns the current state and a dispatch function to
  // trigger an action
  const [count, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
 {count}
 <button onClick={() => dispatch('increment')}>+1</button>
 <button onClick={() => dispatch('decrement')}>-1</button>
 <button onClick={() => dispatch('reset')}>reset</button>
 </div>
  );
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%20%7D%20from%20'preact'%3B%0A%0Aimport%20%7B%20useReducer%20%7D%20from%20'preact%2Fhooks'%3B%0A%0Aconst%20initialState%20%3D%200%3B%0Aconst%20reducer%20%3D%20(state%2C%20action)%20%3D%3E%20%7B%0A%20%20switch%20(action)%20%7B%0A%20%20%20%20case%20'increment'%3A%20return%20state%20%2B%201%3B%0A%20%20%20%20case%20'decrement'%3A%20return%20state%20-%201%3B%0A%20%20%20%20case%20'reset'%3A%20return%200%3B%0A%20%20%20%20default%3A%20throw%20new%20Error('Unexpected%20action')%3B%0A%20%20%7D%0A%7D%3B%0A%0Afunction%20Counter()%20%7B%0A%20%20%2F%2F%20Returns%20the%20current%20state%20and%20a%20dispatch%20function%20to%0A%20%20%2F%2F%20trigger%20an%20action%0A%20%20const%20%5Bcount%2C%20dispatch%5D%20%3D%20useReducer(reducer%2C%20initialState)%3B%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%7Bcount%7D%0A%20%20%20%20%20%20%3Cbutton%20onClick%3D%7B()%20%3D%3E%20dispatch('increment')%7D%3E%2B1%3C%2Fbutton%3E%0A%20%20%20%20%20%20%3Cbutton%20onClick%3D%7B()%20%3D%3E%20dispatch('decrement')%7D%3E-1%3C%2Fbutton%3E%0A%20%20%20%20%20%20%3Cbutton%20onClick%3D%7B()%20%3D%3E%20dispatch('reset')%7D%3Ereset%3C%2Fbutton%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%0A%0Arender(%3CCounter%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)## Memoization

In UI programming there is often some state or result that's expensive to calculate. Memoization can cache the results of that calculation allowing it to be reused when the same input is used.

### useMemo

With the `useMemo` hook we can memoize the results of that computation and only recalculate it when one of the dependencies changes.


```javascript
const memoized = useMemo(
  () => expensive(a, b),
  // Only re-run the expensive function when any of these
  // dependencies change
  [a, b]
);
```

> Don't run any effectful code inside `useMemo`. Side-effects belong in `useEffect`.
> 
> 

### useCallback

The `useCallback` hook can be used to ensure that the returned function will remain referentially equal for as long as no dependencies have changed. This can be used to optimize updates of child components when they rely on referential equality to skip updates (e.g. `shouldComponentUpdate`).


```javascript
const onClick = useCallback(
  () => console.log(a, b),
  [a, b]
);
```

> Fun fact: `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.
> 
> 

## useRef

To get a reference to a DOM node inside a functional components there is the `useRef` hook. It works similar to [createRef](https://preactjs.com/guide/v10/refs#createref).


```javascript
function Foo() {
  // Initialize useRef with an initial value of `null`
  const input = useRef(null);
  const onClick = () => input.current && input.current.focus();

  return (
    <>
 <input ref={input} />
 <button onClick={onClick}>Focus input</button>
 </>
  );
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20useRef%20%7D%20from%20'preact%2Fhooks'%3B%0Aimport%20%7B%20render%20%7D%20from%20'preact'%3B%0A%0Afunction%20Foo()%20%7B%0A%20%20%2F%2F%20Initialize%20useRef%20with%20an%20initial%20value%20of%20%60null%60%0A%20%20const%20input%20%3D%20useRef(null)%3B%0A%20%20const%20onClick%20%3D%20()%20%3D%3E%20input.current%20%26%26%20input.current.focus()%3B%0A%0A%20%20return%20(%0A%20%20%20%20%3C%3E%0A%20%20%20%20%20%20%3Cinput%20ref%3D%7Binput%7D%20%2F%3E%0A%20%20%20%20%20%20%3Cbutton%20onClick%3D%7BonClick%7D%3EFocus%20input%3C%2Fbutton%3E%0A%20%20%20%20%3C%2F%3E%0A%20%20)%3B%0A%7D%0A%0Arender(%3CFoo%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)
> Be careful not to confuse `useRef` with `createRef`.
> 
> 

## useContext

To access context in a functional component we can use the `useContext` hook, without any higher-order or wrapper components. The first argument must be the context object that's created from a `createContext` call.


```javascript
const Theme = createContext('light');

function DisplayTheme() {
  const theme = useContext(Theme);
  return <p>Active theme: {theme}</p>;
}

// ...later
function App() {
  return (
    <Theme.Provider value="light">
 <OtherComponent>
 <DisplayTheme />
 </OtherComponent>
 </Theme.Provider>
  )
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%2C%20createContext%20%7D%20from%20'preact'%3B%0Aimport%20%7B%20useContext%20%7D%20from%20'preact%2Fhooks'%3B%0A%0Aconst%20OtherComponent%20%3D%20props%20%3D%3E%20props.children%3B%0A%0Aconst%20Theme%20%3D%20createContext('light')%3B%0A%0Afunction%20DisplayTheme()%20%7B%0A%20%20const%20theme%20%3D%20useContext(Theme)%3B%0A%20%20return%20%3Cp%3EActive%20theme%3A%20%7Btheme%7D%3C%2Fp%3E%3B%0A%7D%0A%0A%2F%2F%20...later%0Afunction%20App()%20%7B%0A%20%20return%20(%0A%20%20%20%20%3CTheme.Provider%20value%3D%22light%22%3E%0A%20%20%20%20%20%20%3COtherComponent%3E%0A%20%20%20%20%20%20%20%20%3CDisplayTheme%20%2F%3E%0A%20%20%20%20%20%20%3C%2FOtherComponent%3E%0A%20%20%20%20%3C%2FTheme.Provider%3E%0A%20%20)%0A%7D%0A%0Arender(%3CFoo%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)## Side-Effects

Side-Effects are at the heart of many modern Apps. Whether you want to fetch some data from an API or trigger an effect on the document, you'll find that the `useEffect` fits nearly all your needs. It's one of the main advantages of the hooks API, that it reshapes your mind into thinking in effects instead of a component's lifecycle.

### useEffect

As the name implies, `useEffect` is the main way to trigger various side-effects. You can even return a cleanup function from your effect if one is needed.


```javascript
useEffect(() => {
  // Trigger your effect
  return () => {
    // Optional: Any cleanup code
  };
}, []);
```
We'll start with a `Title` component which should reflect the title to the document, so that we can see it in the address bar of our tab in our browser.


```javascript
function PageTitle(props) {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return <h1>{props.title}</h1>;
}
```
The first argument to `useEffect` is an argument-less callback that triggers the effect. In our case we only want to trigger it, when the title really has changed. There'd be no point in updating it when it stayed the same. That's why we're using the second argument to specify our [dependency-array](https://preactjs.com/#the-dependency-argument).

But sometimes we have a more complex use case. Think of a component which needs to subscribe to some data when it mounts and needs to unsubscribe when it unmounts. This can be accomplished with `useEffect` too. To run any cleanup code we just need to return a function in our callback.


```javascript
// Component that will always display the current window width
function WindowWidth(props) {
  const [width, setWidth] = useState(0);

  function onResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return <p>Window width: {width}</p>;
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20useState%2C%20useEffect%20%7D%20from%20'preact%2Fhooks'%3B%0Aimport%20%7B%20render%20%7D%20from%20'preact'%3B%0A%0A%2F%2F%20Component%20that%20will%20always%20display%20the%20current%20window%20width%0Afunction%20WindowWidth(props)%20%7B%0A%20%20const%20%5Bwidth%2C%20setWidth%5D%20%3D%20useState(0)%3B%0A%0A%20%20function%20onResize()%20%7B%0A%20%20%20%20setWidth(window.innerWidth)%3B%0A%20%20%7D%0A%0A%20%20useEffect(()%20%3D%3E%20%7B%0A%20%20%20%20window.addEventListener('resize'%2C%20onResize)%3B%0A%20%20%20%20return%20()%20%3D%3E%20window.removeEventListener('resize'%2C%20onResize)%3B%0A%20%20%7D%2C%20%5B%5D)%3B%0A%0A%20%20return%20%3Cp%3EWindow%20width%3A%20%7Bwidth%7D%3C%2Fp%3E%3B%0A%7D%0A%0Arender(%3CWindowWidth%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)
> The cleanup function is optional. If you don't need to run any cleanup code, you don't need to return anything in the callback that's passed to `useEffect`.
> 
> 

### useLayoutEffect

The signature is identical to [useEffect](https://preactjs.com/#useeffect), but it will fire as soon as the component is diffed and the browser has a chance to paint.

### useErrorBoundary

Whenever a child component throws an error you can use this hook to catch it and display a custom error UI to the user.


```javascript
// error = The error that was caught or `undefined` if nothing errored.
// resetError = Call this function to mark an error as resolved. It's
// up to your app to decide what that means and if it is possible
// to recover from errors.
const [error, resetError] = useErrorBoundary();
```
For monitoring purposes it's often incredibly useful to notify a service of any errors. For that we can leverage an optional callback and pass that as the first argument to `useErrorBoundary`.


```javascript
const [error] = useErrorBoundary(error => callMyApi(error.message));
```
A full usage example may look like this:


```javascript
const App = props => {
  const [error, resetError] = useErrorBoundary(
    error => callMyApi(error.message)
  );

  // Display a nice error message
  if (error) {
    return (
      <div>
 <p>{error.message}</p>
 <button onClick={resetError}>Try again</button>
 </div>
    );
  } else {
    return <div>{props.children}</div>
  }
};
```

> If you've been using the class based component API in the past, then this hook is essentially an alternative to the [componentDidCatch](https://preactjs.com/guide/v10/whats-new/#componentdidcatch) lifecycle method. This hook was introduced with Preact 10.2.0 .
> 
> 

## Utility hooks

### useId

This hook will generate a unique identifier for each invocation and guarantees that these will be consistent when rendering both [on the server](https://preactjs.com/guide/v10/server-side-rendering) and the client. A common use case for consistent IDs are forms, where `<label>`-elements use the [`for`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#attr-for) attribute to associate them with a specific `<input>`-element. The `useId` hook isn't tied to just forms though and can be used whenever you need a unique ID.


> To make the hook consistent you will need to use Preact on both the server as well as on the client.
> 
> 

A full usage example may look like this:


```javascript
const App = props => {
  const mainId = useId();
  const inputId = useId();

  useLayoutEffect(() => {
    document.getElementById(inputId).focus()
  }, [])

  // Display a nice error message
  return (
    <main id={mainId}>
 <input id={inputId}>
 </main>
 )
};
```

> This hook was introduced with Preact 10.11.0 and needs preact-render-to-string 5.2.4.
> 
> 





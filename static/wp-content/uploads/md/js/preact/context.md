Context allows you to pass a value to a child deep down the tree without having to pass it through every component in-between via props. A very popular use case for this is theming. In a nutshell context can be thought of a way to do pub-sub-style updates in Preact.

There are two different ways to use context: Via the newer `createContext` API and the legacy context API. The difference between the two is that the legacy one can't update a child when a component inbetween aborts rendering via `shouldComponentUpdate`. That's why we highly recommend to always use `createContext`.



---



---

## createContext

First we need to create a context object we can pass around. This is done via the `createContext(initialValue)` function. It returns a `Provider` component that is used to set the context value and a `Consumer` one which retrieves the value from the context.


```javascript
const Theme = createContext('light');

function ThemedButton(props) {
  return (
    <Theme.Consumer>
 {theme => {
        return <button {...props} class={'btn ' + theme}>Themed Button</button>;
      }}
 </Theme.Consumer>
  );
}

function App() {
  return (
    <Theme.Provider value="dark">
 <SomeComponent>
 <ThemedButton />
 </SomeComponent>
 </Theme.Provider>
  );
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%2C%20createContext%20%7D%20from%20'preact'%3B%0A%0Aconst%20SomeComponent%20%3D%20props%20%3D%3E%20props.children%3B%0A%0Aconst%20Theme%20%3D%20createContext('light')%3B%0A%0Afunction%20ThemedButton(props)%20%7B%0A%20%20return%20(%0A%20%20%20%20%3CTheme.Consumer%3E%0A%20%20%20%20%20%20%7Btheme%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20return%20%3Cbutton%20%7B...props%7D%20class%3D%7B'btn%20'%20%2B%20theme%7D%3EThemed%20Button%3C%2Fbutton%3E%3B%0A%20%20%20%20%20%20%7D%7D%0A%20%20%20%20%3C%2FTheme.Consumer%3E%0A%20%20)%3B%0A%7D%0A%0Afunction%20App()%20%7B%0A%20%20return%20(%0A%20%20%20%20%3CTheme.Provider%20value%3D%22dark%22%3E%0A%20%20%20%20%20%20%3CSomeComponent%3E%0A%20%20%20%20%20%20%20%20%3CThemedButton%20%2F%3E%0A%20%20%20%20%20%20%3C%2FSomeComponent%3E%0A%20%20%20%20%3C%2FTheme.Provider%3E%0A%20%20)%3B%0A%7D%0A%0Arender(%3CApp%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)
> An easier way to use context is via the [useContext](https://preactjs.com/guide/v10/hooks#usecontext) hook.
> 
> 

## Legacy Context API

We include the legacy API mainly for backwards-compatibility reasons. It has been superseded by the `createContext` API. The legacy API has known issues like blocking updates if there are components in-between that return `false` in `shouldComponentUpdate`. If you nonetheless need to use it, keep reading.

To pass down a custom variable through the context, a component needs to have the `getChildContext` method. There you return the new values you want to store in the context. The context can be accessed via the second argument in function components or `this.context` in a class-based component.


```javascript
function ThemedButton(props, context) {
  return (
    <button {...props} class={'btn ' + context.theme}>
 Themed Button
 </button>
  );
}

class App extends Component {
  getChildContext() {
    return {
      theme: 'light'
    }
  }

  render() {
    return (
      <div>
 <SomeOtherComponent>
 <ThemedButton />
 </SomeOtherComponent>
 </div>
    );
  }
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%20%7D%20from%20'preact'%3B%0A%0Aconst%20SomeOtherComponent%20%3D%20props%20%3D%3E%20props.children%3B%0A%0Afunction%20ThemedButton(props%2C%20context)%20%7B%0A%20%20return%20(%0A%20%20%20%20%3Cbutton%20%7B...props%7D%20class%3D%7B'btn%20'%20%2B%20context.theme%7D%3E%0A%20%20%20%20%20%20Themed%20Button%0A%20%20%20%20%3C%2Fbutton%3E%0A%20%20)%3B%0A%7D%0A%0Aclass%20App%20extends%20Component%20%7B%0A%20%20getChildContext()%20%7B%0A%20%20%20%20return%20%7B%0A%20%20%20%20%20%20theme%3A%20'light'%0A%20%20%20%20%7D%0A%20%20%7D%0A%0A%20%20render()%20%7B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%3CSomeOtherComponent%3E%0A%20%20%20%20%20%20%20%20%20%20%3CThemedButton%20%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FSomeOtherComponent%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20)%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CApp%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)



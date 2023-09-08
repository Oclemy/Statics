This guide walks through building a simple "ticking clock" component. If you're new to Virtual DOM, try the [full Preact tutorial](https://preactjs.com/tutorial).


> :information_desk_person: This guide assumes that you completed the [Getting Started](https://preactjs.com/guide/v10/getting-started) document and have successfully set up your tooling. If not, start with [preact-cli](https://preactjs.com/guide/v10/getting-started#best-practices-powered-with-preact-cli).
> 
> 



---



---

## Hello World

Out of the box, the two functions you'll always see in any Preact codebase are `h()` and `render()`. The `h()` function is used to turn JSX into a structure Preact understands. But it can also be used directly without any JSX involved:


```javascript
// With JSX
const App = <h1>Hello World!</h1>;

// ...the same without JSX
const App = h('h1', null, 'Hello World');
```
This alone doesn't do anything and we need a way to inject our Hello-World app into the DOM. For this we use the `render()` function.


```javascript
import { render } from 'preact';

const App = <h1>Hello World!</h1>;

// Inject our app into the DOM
render(App, document.getElementById('app'));
```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%20%7D%20from%20'preact'%3B%0A%0Aconst%20App%20%3D%20%3Ch1%3EHello%20World!%3C%2Fh1%3E%3B%0A%0A%2F%2F%20Inject%20our%20app%20into%20the%20DOM%0Arender(App%2C%20document.getElementById('app'))%3B)Congratulations, you've build your first Preact app!

## Interactive Hello World

Rendering text is a start, but we want to make our app a little more interactive. We want to update it when data changes. :star2:

Our end goal is that we have an app where the user can enter a name and display it, when the form is submitted. For this we need to have something where we can store what we submitted. This is where [Components](https://preactjs.com/guide/v10/components) come into play.

So let's turn our existing App into a [Components](https://preactjs.com/guide/v10/components):


```javascript
import { h, render, Component } from 'preact';

class App extends Component {
  render() {
    return <h1>Hello, world!</h1>;
  }
}

render(<App />, document.getElementById("app"));
```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20h%2C%20render%2C%20Component%20%7D%20from%20'preact'%3B%0A%0Aclass%20App%20extends%20Component%20%7B%0A%20%20render()%20%7B%0A%20%20%20%20return%20%3Ch1%3EHello%2C%20world!%3C%2Fh1%3E%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CApp%20%2F%3E%2C%20document.getElementById(%22app%22))%3B)You'll notice that we added a new `Component` import at the top and that we turned `App` into a class. This alone isn't useful but it's the precursor for what we're going to do next. To make things a little more exciting we'll add a form with a text input and a submit button.


```javascript
import { h, render, Component } from 'preact';

class App extends Component {
  render() {
    return (
      <div>
 <h1>Hello, world!</h1>
 <form>
 <input type="text" />
 <button type="submit">Update</button>
 </form>
 </div>
    );
  }
}

render(<App />, document.getElementById("app"));
```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20h%2C%20render%2C%20Component%20%7D%20from%20'preact'%3B%0A%0Aclass%20App%20extends%20Component%20%7B%0A%20%20render()%20%7B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%3Ch1%3EHello%2C%20world!%3C%2Fh1%3E%0A%20%20%20%20%20%20%20%20%3Cform%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cinput%20type%3D%22text%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cbutton%20type%3D%22submit%22%3EUpdate%3C%2Fbutton%3E%0A%20%20%20%20%20%20%20%20%3C%2Fform%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20)%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CApp%20%2F%3E%2C%20document.getElementById(%22app%22))%3B)Now we're talking! It's starting to look like a real app! We still need to make it interactive though. Remember that we'll want to change `"Hello world!"` to `"Hello, [userinput]!"`, so we need a way to know the current input value.

We'll store it in a special property called `state` of our Component. It's special, because when it's updated via the `setState` method, Preact will not just update the state, but also schedule a render request for this component. Once the request is handled, our component will be re-rendered with the updated state.

Lastly we need to attach the new state to our input by setting `value` and attaching an event handler to the `input` event.


```javascript
import { h, render, Component } from 'preact';

class App extends Component {
  // Initialise our state. For now we only store the input value
  state = { value: '' }

  onInput = ev => {
    // This will schedule a state update. Once updated the component
    // will automatically re-render itself.
    this.setState({ value: ev.target.value });
  }

  render() {
    return (
      <div>
 <h1>Hello, world!</h1>
 <form>
 <input type="text" value={this.state.value} onInput={this.onInput} />
 <button type="submit">Update</button>
 </form>
 </div>
    );
  }
}

render(<App />, document.getElementById("app"));
```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20h%2C%20render%2C%20Component%20%7D%20from%20'preact'%3B%0A%0Aclass%20App%20extends%20Component%20%7B%0A%20%20%2F%2F%20Initialise%20our%20state.%20For%20now%20we%20only%20store%20the%20input%20value%0A%20%20state%20%3D%20%7B%20value%3A%20''%20%7D%0A%0A%20%20onInput%20%3D%20ev%20%3D%3E%20%7B%0A%20%20%20%20%2F%2F%20This%20will%20schedule%20a%20state%20update.%20Once%20updated%20the%20component%0A%20%20%20%20%2F%2F%20will%20automatically%20re-render%20itself.%0A%20%20%20%20this.setState(%7B%20value%3A%20ev.target.value%20%7D)%3B%0A%20%20%7D%0A%0A%20%20render()%20%7B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%3Ch1%3EHello%2C%20world!%3C%2Fh1%3E%0A%20%20%20%20%20%20%20%20%3Cform%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cinput%20type%3D%22text%22%20value%3D%7Bthis.state.value%7D%20onInput%3D%7Bthis.onInput%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cbutton%20type%3D%22submit%22%3EUpdate%3C%2Fbutton%3E%0A%20%20%20%20%20%20%20%20%3C%2Fform%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20)%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CApp%20%2F%3E%2C%20document.getElementById(%22app%22))%3B)At this point the app shouldn't have changed much from a users point of view, but we'll bring all the pieces together in our next step.

We'll add a handler to the `submit` event of our `<form>` in similar fashion like we just did for the input. The difference is that it writes into a different property of our `state` called `name`. Then we swap out our heading and insert our `state.name` value there.


```javascript
import { h, render, Component } from 'preact';

class App extends Component {
  // Add `name` to the initial state
  state = { value: '', name: 'world' }

  onInput = ev => {
    this.setState({ value: ev.target.value });
  }

  // Add a submit handler that updates the `name` with the latest input value
  onSubmit = ev => {
    // Prevent default browser behavior (aka don't submit the form here)
    ev.preventDefault();

    this.setState({ name: this.state.value });
  }

  render() {
    return (
      <div>
 <h1>Hello, {this.state.name}!</h1>
 <form onSubmit={this.onSubmit}>
 <input type="text" value={this.state.value} onInput={this.onInput} />
 <button type="submit">Update</button>
 </form>
 </div>
    );
  }
}

render(<App />, document.getElementById("app"));
```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20h%2C%20render%2C%20Component%20%7D%20from%20'preact'%3B%0A%0Aclass%20App%20extends%20Component%20%7B%0A%20%20%2F%2F%20Add%20%60name%60%20to%20the%20initial%20state%0A%20%20state%20%3D%20%7B%20value%3A%20''%2C%20name%3A%20'world'%20%7D%0A%0A%20%20onInput%20%3D%20ev%20%3D%3E%20%7B%0A%20%20%20%20this.setState(%7B%20value%3A%20ev.target.value%20%7D)%3B%0A%20%20%7D%0A%0A%20%20%2F%2F%20Add%20a%20submit%20handler%20that%20updates%20the%20%60name%60%20with%20the%20latest%20input%20value%0A%20%20onSubmit%20%3D%20ev%20%3D%3E%20%7B%0A%20%20%20%20%2F%2F%20Prevent%20default%20browser%20behavior%20(aka%20don't%20submit%20the%20form%20here)%0A%20%20%20%20ev.preventDefault()%3B%0A%0A%20%20%20%20this.setState(%7B%20name%3A%20this.state.value%20%7D)%3B%0A%20%20%7D%0A%0A%20%20render()%20%7B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%3Ch1%3EHello%2C%20%7Bthis.state.name%7D!%3C%2Fh1%3E%0A%20%20%20%20%20%20%20%20%3Cform%20onSubmit%3D%7Bthis.onSubmit%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cinput%20type%3D%22text%22%20value%3D%7Bthis.state.value%7D%20onInput%3D%7Bthis.onInput%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cbutton%20type%3D%22submit%22%3EUpdate%3C%2Fbutton%3E%0A%20%20%20%20%20%20%20%20%3C%2Fform%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20)%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CApp%20%2F%3E%2C%20document.getElementById(%22app%22))%3B)Boom! We're done! We can now enter a custom name, click "Update" and our new name appears in our heading.

## A Clock Component

We wrote our first component, so let's get a little more practice. This time we build a clock.


```javascript
import { h, render, Component } from 'preact';

class Clock extends Component {
  render() {
    let time = new Date().toLocaleTimeString();
    return <span>{time}</span>;
  }
}

render(<Clock />, document.getElementById("app"));
```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20h%2C%20render%2C%20Component%20%7D%20from%20'preact'%3B%0A%0Aclass%20Clock%20extends%20Component%20%7B%0A%20%20render()%20%7B%0A%20%20%20%20let%20time%20%3D%20new%20Date().toLocaleTimeString()%3B%0A%20%20%20%20return%20%3Cspan%3E%7Btime%7D%3C%2Fspan%3E%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CClock%20%2F%3E%2C%20document.getElementById(%22app%22))%3B)Ok, that was easy enough! Problem is, that the time doesn't change. It's frozen at the moment we rendered our clock component.

So, we want to have a 1-second timer start once the Component gets added to the DOM, and stop if it is removed. We'll create the timer and store a reference to it in `componentDidMount`, and stop the timer in `componentWillUnmount`. On each timer tick, we'll update the component's `state` object with a new time value. Doing this will automatically re-render the component.


```javascript
import { h, render, Component } from 'preact';

class Clock extends Component {
  state = { time: Date.now() };

  // Called whenever our component is created
  componentDidMount() {
    // update time every second
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  // Called just before our component will be destroyed
  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer);
  }

  render() {
    let time = new Date(this.state.time).toLocaleTimeString();
    return <span>{time}</span>;
  }
}

render(<Clock />, document.getElementById("app"));
```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20h%2C%20render%2C%20Component%20%7D%20from%20'preact'%3B%0A%0Aclass%20Clock%20extends%20Component%20%7B%0A%20%20state%20%3D%20%7B%20time%3A%20Date.now()%20%7D%3B%0A%0A%20%20%2F%2F%20Called%20whenever%20our%20component%20is%20created%0A%20%20componentDidMount()%20%7B%0A%20%20%20%20%2F%2F%20update%20time%20every%20second%0A%20%20%20%20this.timer%20%3D%20setInterval(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20this.setState(%7B%20time%3A%20Date.now()%20%7D)%3B%0A%20%20%20%20%7D%2C%201000)%3B%0A%20%20%7D%0A%0A%20%20%2F%2F%20Called%20just%20before%20our%20component%20will%20be%20destroyed%0A%20%20componentWillUnmount()%20%7B%0A%20%20%20%20%2F%2F%20stop%20when%20not%20renderable%0A%20%20%20%20clearInterval(this.timer)%3B%0A%20%20%7D%0A%0A%20%20render()%20%7B%0A%20%20%20%20let%20time%20%3D%20new%20Date(this.state.time).toLocaleTimeString()%3B%0A%20%20%20%20return%20%3Cspan%3E%7Btime%7D%3C%2Fspan%3E%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CClock%20%2F%3E%2C%20document.getElementById(%22app%22))%3B)And we did it again! Now we have [a ticking clock](https://jsfiddle.net/developit/u9m5x0L7/embedded/result,js/)!





There will always be scenarios where you need a direct reference to the DOM-Element or Component that was rendered by Preact. Refs allow you to do just that.

A typical use case for it is measuring the actual size of a DOM node. While it's possible to get the reference to the component instance via `ref` we don't generally recommend it. It will create a hard coupling between a parent and a child which breaks the composability of the component model. In most cases it's more natural to just pass the callback as a prop instead of trying to call the method of a class component directly.



---



---

## `createRef`

The `createRef` function will return a plain object with just one property: `current`. Whenever the `render` method is called, Preact will assign the DOM node or component to `current`.


```javascript
class Foo extends Component {
  ref = createRef();

  componentDidMount() {
    console.log(this.ref.current);
    // Logs: [HTMLDivElement]
  }

  render() {
    return <div ref={this.ref}>foo</div>
  }
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%2C%20Component%2C%20createRef%20%7D%20from%20%22preact%22%3B%0A%0Aclass%20Foo%20extends%20Component%20%7B%0A%20%20ref%20%3D%20createRef()%3B%0A%0A%20%20componentDidMount()%20%7B%0A%20%20%20%20console.log(this.ref.current)%3B%0A%20%20%20%20%2F%2F%20Logs%3A%20%5BHTMLDivElement%5D%0A%20%20%7D%0A%0A%20%20render()%20%7B%0A%20%20%20%20return%20%3Cdiv%20ref%3D%7Bthis.ref%7D%3Efoo%3C%2Fdiv%3E%0A%20%20%7D%0A%7D%0A%0Arender(%3CFoo%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)## Callback Refs

Another way to get the reference to an element can be done by passing a function callback. It's a little more to type, but it works in a similar fashion as `createRef`.


```javascript
class Foo extends Component {
  ref = null;
  setRef = (dom) => this.ref = dom;

  componentDidMount() {
    console.log(this.ref);
    // Logs: [HTMLDivElement]
  }

  render() {
    return <div ref={this.setRef}>foo</div>
  }
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%2C%20Component%20%7D%20from%20%22preact%22%3B%0A%0Aclass%20Foo%20extends%20Component%20%7B%0A%20%20ref%20%3D%20null%3B%0A%20%20setRef%20%3D%20(dom)%20%3D%3E%20this.ref%20%3D%20dom%3B%0A%0A%20%20componentDidMount()%20%7B%0A%20%20%20%20console.log(this.ref)%3B%0A%20%20%20%20%2F%2F%20Logs%3A%20%5BHTMLDivElement%5D%0A%20%20%7D%0A%0A%20%20render()%20%7B%0A%20%20%20%20return%20%3Cdiv%20ref%3D%7Bthis.setRef%7D%3Efoo%3C%2Fdiv%3E%0A%20%20%7D%0A%7D%0A%0Arender(%3CFoo%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)
> If the ref callback is defined as an inline function it will be called twice. Once with `null` and then with the actual reference. This is a common error and the `createRef` API makes this a little easier by forcing user to check if `ref.current` is defined.
> 
> 

## Putting it all together

Let's say we have a scenario where we need to get the reference to a DOM node to measure its width and height. We have a simple component where we need to replace the placeholder values with the actual measured ones.


```javascript
class Foo extends Component {
  // We want to use the real width from the DOM node here
  state = {
    width: 0,
    height: 0,
  };

  render(_, { width, height }) {
    return <div>Width: {width}, Height: {height}</div>;
  }
}
```
Measurement only makes sense once the `render` method has been called and the component is mounted into the DOM. Before that the DOM node won't exist and there wouldn't make much sense to try to measure it.


```javascript
class Foo extends Component {
  state = {
    width: 0,
    height: 0,
  };

  ref = createRef();

  componentDidMount() {
    // For safety: Check if a ref was supplied
    if (this.ref.current) {
      const dimensions = this.ref.current.getBoundingClientRect();
      this.setState({
        width: dimensions.width,
        height: dimensions.height,
      });
    }
  }

  render(_, { width, height }) {
    return (
      <div ref={this.ref}>
 Width: {width}, Height: {height}
 </div>
    );
  }
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%2C%20Component%20%7D%20from%20%22preact%22%3B%0A%0Aclass%20Foo%20extends%20Component%20%7B%0A%20%20state%20%3D%20%7B%0A%20%20%20%20width%3A%200%2C%0A%20%20%20%20height%3A%200%2C%0A%20%20%7D%3B%0A%0A%20%20ref%20%3D%20createRef()%3B%0A%0A%20%20componentDidMount()%20%7B%0A%20%20%20%20%2F%2F%20For%20safety%3A%20Check%20if%20a%20ref%20was%20supplied%0A%20%20%20%20if%20(this.ref.current)%20%7B%0A%20%20%20%20%20%20const%20dimensions%20%3D%20this.ref.current.getBoundingClientRect()%3B%0A%20%20%20%20%20%20this.setState(%7B%0A%20%20%20%20%20%20%20%20width%3A%20dimensions.width%2C%0A%20%20%20%20%20%20%20%20height%3A%20dimensions.height%2C%0A%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%7D%0A%20%20%7D%0A%0A%20%20render(_%2C%20%7B%20width%2C%20height%20%7D)%20%7B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%3Cdiv%20ref%3D%7Bthis.ref%7D%3E%0A%20%20%20%20%20%20%20%20Width%3A%20%7Bwidth%7D%2C%20Height%3A%20%7Bheight%7D%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20)%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CFoo%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)That's it! Now the component will always display the width and height when it's mounted.





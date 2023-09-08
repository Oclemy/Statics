Forms in Preact work much the same as they do in HTML. You render a control, and attach an event listener to it.

The main difference is that in most cases the `value` is not controlled by the DOM node, but by Preact.



---



---

## Controlled & Uncontrolled Components

When talking about form controls you'll often encounter the words "Controlled Component" and "Uncontrolled Component". The description refers to the way data flow is handled. The DOM has a bidirectional data flow, because every form control will manage the user input themselves. A simple text input will always update its value when a user typed into it.

A framework like Preact in contrast generally has a unidirectional data flow. The component doesn't manage the value itself there, but something else higher up in the component tree.


```javascript
// Uncontrolled, because Preact doesn't set the value
<input onInput={myEventHandler} />;

// Controlled, because Preact manages the input's value now
<input value={someValue} onInput={myEventHandler} />;
```
Generally, you should try to use *Controlled* Components at all times. However, when building standalone Components or wrapping third-party UI libraries, it can still be useful to simply use your component as a mount point for non-preact functionality. In these cases, "Uncontrolled" Components are nicely suited to the task.


> One gotcha to note here is that setting the value to `undefined` or `null` will essentially become uncontrolled.
> 
> 

## Creating A Simple Form

Let's create a simple form to submit todo items. For this we create a `<form>`-Element and bind an event handler that is called whenever the form is submitted. We do a similar thing for the text input field, but note that we are storing the value in our class ourselves. You guessed it, we're using a *controlled* input here. In this example it's very useful, because we need to display the input's value in another element.


```javascript
class TodoForm extends Component {
  state = { value: '' };

  onSubmit = e => {
    alert("Submitted a todo");
    e.preventDefault();
  }

  onInput = e => {
    const { value } = e.target;
    this.setState({ value })
  }

  render(_, { value }) {
    return (
      <form onSubmit={this.onSubmit}>
 <input type="text" value={value} onInput={this.onInput} />
 <p>You typed this value: {value}</p>
 <button type="submit">Submit</button>
 </form>
    );
  }
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%2C%20Component%20%7D%20from%20%22preact%22%3B%0A%0Aclass%20TodoForm%20extends%20Component%20%7B%0A%20%20state%20%3D%20%7B%20value%3A%20''%20%7D%3B%0A%0A%20%20onSubmit%20%3D%20e%20%3D%3E%20%7B%0A%20%20%20%20alert(%22Submitted%20a%20todo%22)%3B%0A%20%20%20%20e.preventDefault()%3B%0A%20%20%7D%0A%0A%20%20onInput%20%3D%20e%20%3D%3E%20%7B%0A%20%20%20%20const%20%7B%20value%20%7D%20%3D%20e.target%3B%0A%20%20%20%20this.setState(%7B%20value%20%7D)%0A%20%20%7D%0A%0A%20%20render(_%2C%20%7B%20value%20%7D)%20%7B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%3Cform%20onSubmit%3D%7Bthis.onSubmit%7D%3E%0A%20%20%20%20%20%20%20%20%3Cinput%20type%3D%22text%22%20value%3D%7Bvalue%7D%20onInput%3D%7Bthis.onInput%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%3Cp%3EYou%20typed%20this%20value%3A%20%7Bvalue%7D%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%3Cbutton%20type%3D%22submit%22%3ESubmit%3C%2Fbutton%3E%0A%20%20%20%20%20%20%3C%2Fform%3E%0A%20%20%20%20)%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CTodoForm%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)## Select Input

A `<select>`-Element is a little more involved, but works similar to all other form controls:


```javascript
class MySelect extends Component {
  state = { value: '' };

  onChange = e => {
    this.setState({ value: e.target.value });
  }

  onSubmit = e => {
    alert("Submitted " + this.state.value);
    e.preventDefault();
  }

  render(_, { value }) {
    return (
      <form onSubmit={this.onSubmit}>
 <select value={value} onChange={this.onChange}>
 <option value="A">A</option>
 <option value="B">B</option>
 <option value="C">C</option>
 </select>
 <button type="submit">Submit</button>
 </form>
    );
  }
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%2C%20Component%20%7D%20from%20%22preact%22%3B%0A%0A%0Aclass%20MySelect%20extends%20Component%20%7B%0A%20%20state%20%3D%20%7B%20value%3A%20''%20%7D%3B%0A%0A%20%20onChange%20%3D%20e%20%3D%3E%20%7B%0A%20%20%20%20this.setState(%7B%20value%3A%20e.target.value%20%7D)%3B%0A%20%20%7D%0A%0A%20%20onSubmit%20%3D%20e%20%3D%3E%20%7B%0A%20%20%20%20alert(%22Submitted%20%22%20%2B%20this.state.value)%3B%0A%20%20%20%20e.preventDefault()%3B%0A%20%20%7D%0A%0A%20%20render(_%2C%20%7B%20value%20%7D)%20%7B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%3Cform%20onSubmit%3D%7Bthis.onSubmit%7D%3E%0A%20%20%20%20%20%20%20%20%3Cselect%20value%3D%7Bvalue%7D%20onChange%3D%7Bthis.onChange%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%3Coption%20value%3D%22A%22%3EA%3C%2Foption%3E%0A%20%20%20%20%20%20%20%20%20%20%3Coption%20value%3D%22B%22%3EB%3C%2Foption%3E%0A%20%20%20%20%20%20%20%20%20%20%3Coption%20value%3D%22C%22%3EC%3C%2Foption%3E%0A%20%20%20%20%20%20%20%20%3C%2Fselect%3E%0A%20%20%20%20%20%20%20%20%3Cbutton%20type%3D%22submit%22%3ESubmit%3C%2Fbutton%3E%0A%20%20%20%20%20%20%3C%2Fform%3E%0A%20%20%20%20)%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CMySelect%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)## Checkboxes & Radio Buttons

Checkboxes and radio buttons (`<input type="checkbox|radio">`) can initially cause confusion when building controlled forms. This is because in an uncontrolled environment, we would typically allow the browser to "toggle" or "check" a checkbox or radio button for us, listening for a change event and reacting to the new value. However, this technique does not transition well into a world view where the UI is always updated automatically in response to state and prop changes.


> **Walk-Through:** Say we listen for a "change" event on a checkbox, which is fired when the checkbox is checked or unchecked by the user. In our change event handler, we set a value in `state` to the new value received from the checkbox. Doing so will trigger a re-render of our component, which will re-assign the value of the checkbox to the value from state. This is unnecessary, because we just asked the DOM for a value but then told it to render again with whatever value we wanted.
> 
> 

So, instead of listening for a `input` event we should listen for a `click` event, which is fired any time the user clicks on the checkbox *or an associated `<label>`*. Checkboxes just toggle between Boolean `true` and `false`, so clicking the checkbox or the label, we'll just invert whatever value we have in state, triggering a re-render, setting the checkbox's displayed value to the one we want.

### Checkbox Example


```javascript
class MyForm extends Component {
  toggle = e => {
      let checked = !this.state.checked;
      this.setState({ checked });
  };

  render(_, { checked }) {
    return (
      <label>
 <input
 type="checkbox"
 checked={checked}
 onClick={this.toggle}
 />
 check this box
 </label>
    );
  }
}

```
[Run in REPL](https://preactjs.com/repl?code=import%20%7B%20render%2C%20Component%20%7D%20from%20%22preact%22%3B%0A%0Aclass%20MyForm%20extends%20Component%20%7B%0A%20%20toggle%20%3D%20e%20%3D%3E%20%7B%0A%20%20%20%20%20%20let%20checked%20%3D%20!this.state.checked%3B%0A%20%20%20%20%20%20this.setState(%7B%20checked%20%7D)%3B%0A%20%20%7D%3B%0A%0A%20%20render(_%2C%20%7B%20checked%20%7D)%20%7B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%3Clabel%3E%0A%20%20%20%20%20%20%20%20%3Cinput%0A%20%20%20%20%20%20%20%20%20%20type%3D%22checkbox%22%0A%20%20%20%20%20%20%20%20%20%20checked%3D%7Bchecked%7D%0A%20%20%20%20%20%20%20%20%20%20onClick%3D%7Bthis.toggle%7D%0A%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20check%20this%20box%0A%20%20%20%20%20%20%3C%2Flabel%3E%0A%20%20%20%20)%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CMyForm%20%2F%3E%2C%20document.getElementById(%22app%22))%3B%0A)



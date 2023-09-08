# JSX

Would you like some HTML syntax in your ReScript? If not, quickly skip over this section and pretend you didn't see anything!

ReScript supports the JSX syntax, with some slight differences compared to the one in [ReactJS](https://facebook.github.io/react/docs/introducing-jsx.html). ReScript JSX isn't tied to ReactJS; they translate to normal function calls:

**Note** for [ReScriptReact](https://rescript-lang.org/docs/react/latest/introduction) readers: this isn't what ReScriptReact turns JSX into, in the end. See Usage section for more info.

## Capitalized


```javascript
<MyComponent name={"ReScript"} />

```
becomes


```javascript
MyComponent.createElement(~name="ReScript", ~children=list{}, ())

```
## Uncapitalized


```javascript
<div onClick={handler}> child1 child2 </div>

```
becomes


```javascript
div(~onClick=handler, ~children=list{child1, child2}, ())

```
## Fragment

becomes

### Children


```javascript
<MyComponent> child1 child2 </MyComponent>

```
This is the syntax for passing a list of two items, `child1` and `child2`, to the children position. It transforms to a list containing `child1` and `child2`:


```javascript
MyComponent.createElement(~children=list{child1, child2}, ())

```
**Note** again that this isn't the transform for ReScriptReact; ReScriptReact turns the final list into an array. But the idea still applies.

So naturally, `<MyComponent> myChild </MyComponent>` is transformed to `MyComponent.createElement(~children=list{myChild}, ())`. I.e. whatever you do, the arguments passed to the children position will be wrapped in a list.

## Usage

See [ReScriptReact Elements & JSX](https://rescript-lang.org/docs/react/latest/elements-and-jsx) for an example application of JSX, which transforms the above calls into a ReScriptReact-specific call.

Here's a JSX tag that shows most of the features.


```javascript
<MyComponent
  booleanAttribute={true}
  stringAttribute="string"
  intAttribute=1
  forcedOptional=?{Some("hello")}
  onClick={handleClick}>
  <div> {React.string("hello")} </div>
</MyComponent>

```
## Departures From JS JSX

* Attributes and children don't mandate `{}`, but we show them anyway for ease of learning. Once you format your file, some of them go away and some turn into parentheses.
* Props spread is supported, but there are some restrictions (see below).
* Punning!

### Spread Props (from v10.1)

JSX props spread is supported now, but in a stricter way than in JS.


```javascript
<Comp {...props} a="a" />

```
Multiple spreads are not allowed:

RES

`<NotAllowed {...props1} {...props2} />`

The spread must be at the first position, followed by other props:

RES

`<NotAllowed a="a" {...props} />`

### Punning

"Punning" refers to the syntax shorthand for when a label and a value are the same. For example, in JavaScript, instead of doing `return {name: name}`, you can do `return {name}`.

JSX supports punning. `<input checked />` is just a shorthand for `<input checked=checked />`. The formatter will help you format to the punned syntax whenever possible. This is convenient in the cases where there are lots of props to pass down:


```javascript
<MyComponent isLoading text onClick />

```
Consequently, a JSX component can cram in a few more props before reaching for extra libraries solutions that avoids props passing.

**Note** that this is a departure from ReactJS JSX, which does **not** have punning. ReactJS' `<input checked />` desugars to `<input checked=true />`, in order to conform to DOM's idioms and for backward compatibility.

## Tip & Tricks

For library authors wanting to take advantage of the JSX: the `@JSX` attribute is a hook for potential ppx macros to spot a function wanting to format as JSX. Once you spot the function, you can turn it into any other expression.

This way, everyone gets to benefit the JSX syntax without needing to opt into a specific library using it, e.g. ReScriptReact.

JSX calls supports the features of [labeled arguments](function#labeled-arguments): optional, explicitly passed optional and optional with default.





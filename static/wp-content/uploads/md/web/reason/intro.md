# Reason

![alt](https://reasonml.github.io/img/reason.svg)

> Reason lets you write simple, fast and quality type safe code while leveraging both the JavaScript & OCaml ecosystems.

```js
type schoolPerson = Teacher | Director | Student(string);

let greeting = person =>
  switch (person) {
  | Teacher => "Hey Professor!"
  | Director => "Hello Director."
  | Student("Richard") => "Still here Ricky?"
  | Student(anyOtherName) => "Hey, " ++ anyOtherName ++ "."
  };
```

## Types without hassle

Powerful, safe type inference means you rarely have to annotate types, but everything gets checked for you.

## Use the power of the OCaml ecosystem

Get access to the powerful systems programming language OCaml with an easier to learn syntax. Use js\_of\_ocaml to compile to JavaScript!


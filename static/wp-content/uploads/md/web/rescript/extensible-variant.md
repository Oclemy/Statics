
```javascript
let print = v =>
  switch v {
  | Point(x, y) => Js.log2("Point", (x, y))
  | Line(ax, ay, bx, by) => Js.log2("Line", (ax, ay, bx, by))
  | Other
  | _ => Js.log("Other")
  }

```




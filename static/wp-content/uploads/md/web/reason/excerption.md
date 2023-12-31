# Exception

Exceptions are just a special kind of variant, "thrown" in **exceptional** cases (don't abuse them!).

## [](#usage)Usage

```reason
let getItem = (theList) =>
  if (callSomeFunctionThatThrows()) {
    /* return the found item here */
  } else {
    raise(Not_found)
  };

let result =
  try (getItem([1, 2, 3])) {
  | Not_found => 0 /* Default value if getItem throws */
  };

```

Note that the above is just for demonstration purposes; in reality, you'd return an `option(int)` directly from `getItem` and avoid the `try` altogether.

You can directly match on exceptions *while* getting another return value from a function:

```reason
switch (List.find((i) => i === theItem, myItems)) {
| item => print_endline(item)
| exception Not_found => print_endline("No such item found!")
};

```

You can also make your own exceptions like you'd make a variant (exceptions need to be capitalized too).

```
exception InputClosed(string);
...
raise(InputClosed("the stream has closed!"));

```

## [](#tips-tricks)Tips & Tricks

When you have ordinary variants, you often don't **need** exceptions. For example, instead of throwing when `item` can't be found in a collection, try to return an `option(item)` (`None` in this case) instead.

## [](#design-decisions)Design Decisions

The above tip seems to contradict what's happening in the OCaml standard library; prominent functions in modules such as [List](https://reasonml.github.io/api/List.html) and [String](https://reasonml.github.io/api/String.html) seems to throw exceptions overly often. This is partially a historical sediment, and partially out of extreme care for performance. Native OCaml/Reason is incredibly performant; exception throwing was designed to be very cheap, cheaper than allocating and returning e.g. an `option`. This is unfortunately not the case for JavaScript.

Newer standard library alternatives usually come with `option`-returning functions rather than exception-throwing ones. For example, `List.find` has the `option`-returning counterpart `List.find_opt`, which doesn't throw.

Exceptions are actually just variants too. In fact, they all belong to a single variant type, called `exn`. It's an [extensible variant](https://caml.inria.fr/pub/docs/manual-ocaml/extn.html#sec252), meaning you can add new constructors to it, such as `InputClosed` above. `exception Foo` is just a sugar for adding a constructor to `exn`.
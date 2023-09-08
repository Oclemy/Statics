
```javascript
@@warning("-27")


@unboxed
type a = Name(string)

@val external message: string = "message"

type student = {
  age: int,
  @as("aria-label") ariaLabel: string,
}

@deprecated
let customDouble = foo => foo * 2

@deprecated("Use SomeOther.customTriple instead")
let customTriple = foo => foo * 3 

```




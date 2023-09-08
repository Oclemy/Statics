
```javascript

type data = {names: array<string>}


@scope("JSON") @val
external parseIntoMyData: string => data = "parse"

let result = parseIntoMyData(`{"names": ["Luke", "Christine"]}`)
let name1 = result.names[0]

```





```javascript
let myPromise = Js.Promise.make((~resolve, ~reject) => resolve(. 2))

myPromise->Js.Promise.then_(value => {
  Js.log(value)
  Js.Promise.resolve(value + 2)
}, _)->Js.Promise.then_(value => {
  Js.log(value)
  Js.Promise.resolve(value + 3)
}, _)->Js.Promise.catch(err => {
  Js.log2("Failure!!", err)
  Js.Promise.resolve(-2)
}, _)

```




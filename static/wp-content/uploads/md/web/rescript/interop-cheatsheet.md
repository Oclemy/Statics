
```javascript
@send external map: (array<'a>, 'a => 'b) => array<'b> = "map"
@send external filter: (array<'a>, 'a => 'b) => array<'b> = "filter"
[1, 2, 3]
  ->map(a => a + 1)
  ->filter(a => mod(a, 2) == 0)
  ->Js.log

```




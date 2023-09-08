The `Future` module implements future behavior of already existing functions, which will replace the current version in a future release of Julia.


```julia
Future.copy!(dst, src) -> dst
```
Copy `src` into `dst`.

This function has moved to `Base` with Julia 1.1, consider using `copy!(dst, src)` instead. `Future.copy!` will be deprecated in the future.


```julia
randjump(r::MersenneTwister, steps::Integer) -> MersenneTwister
```
Create an initialized `MersenneTwister` object, whose state is moved forward (without generating numbers) from `r` by `steps` steps. One such step corresponds to the generation of two `Float64` numbers. For each different value of `steps`, a large polynomial has to be generated internally. One is already pre-computed for `steps=big(10)^20`.





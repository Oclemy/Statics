Sparse matrix solvers call functions from [SuiteSparse](http://suitesparse.com). The following factorizations are available:



| Type | Description |
| --- | --- |
| `SuiteSparse.CHOLMOD.Factor` | Cholesky factorization |
| `SuiteSparse.UMFPACK.UmfpackLU` | LU factorization |
| `SuiteSparse.SPQR.QRSparse` | QR factorization |

Other solvers such as [Pardiso.jl](https://github.com/JuliaSparse/Pardiso.jl/) are as external packages. [Arpack.jl](https://julialinearalgebra.github.io/Arpack.jl/stable/) provides `eigs` and `svds` for iterative solution of eigensystems and singular value decompositions.

These factorizations are described in the [`Linear Algebra`](https://docs.julialang.org/en/v1/stdlib/LinearAlgebra/) section of the manual:

1. [`cholesky`](https://docs.julialang.org/../LinearAlgebra/#LinearAlgebra.cholesky)
2. [`ldlt`](https://docs.julialang.org/../LinearAlgebra/#LinearAlgebra.ldlt)
3. [`lu`](https://docs.julialang.org/../LinearAlgebra/#LinearAlgebra.lu)
4. [`qr`](https://docs.julialang.org/../LinearAlgebra/#LinearAlgebra.qr)


```julia
lowrankupdate(F::CHOLMOD.Factor, C::AbstractArray) -> FF::CHOLMOD.Factor
```
Get an `LDLt` Factorization of `A + C*C'` given an `LDLt` or `LLt` factorization `F` of `A`.

The returned factor is always an `LDLt` factorization.

See also [`lowrankupdate!`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankupdate!), [`lowrankdowndate`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankdowndate), [`lowrankdowndate!`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankdowndate!).


```julia
lowrankupdate!(F::CHOLMOD.Factor, C::AbstractArray)
```
Update an `LDLt` or `LLt` Factorization `F` of `A` to a factorization of `A + C*C'`.

`LLt` factorizations are converted to `LDLt`.

See also [`lowrankupdate`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankupdate), [`lowrankdowndate`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankdowndate), [`lowrankdowndate!`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankdowndate!).


```julia
lowrankupdate(F::CHOLMOD.Factor, C::AbstractArray) -> FF::CHOLMOD.Factor
```
Get an `LDLt` Factorization of `A + C*C'` given an `LDLt` or `LLt` factorization `F` of `A`.

The returned factor is always an `LDLt` factorization.

See also [`lowrankdowndate!`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankdowndate!), [`lowrankupdate`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankupdate), [`lowrankupdate!`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankupdate!).


```julia
lowrankdowndate!(F::CHOLMOD.Factor, C::AbstractArray)
```
Update an `LDLt` or `LLt` Factorization `F` of `A` to a factorization of `A - C*C'`.

`LLt` factorizations are converted to `LDLt`.

See also [`lowrankdowndate`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankdowndate), [`lowrankupdate`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankupdate), [`lowrankupdate!`](https://docs.julialang.org/#SuiteSparse.CHOLMOD.lowrankupdate!).


```julia
lowrankupdowndate!(F::CHOLMOD.Factor, C::Sparse, update::Cint)
```
Update an `LDLt` or `LLt` Factorization `F` of `A` to a factorization of `A ± C*C'`.

If sparsity preserving factorization is used, i.e. `L*L' == P*A*P'` then the new factor will be `L*L' == P*A*P' + C'*C`

`update`: `Cint(1)` for `A + CC'`, `Cint(0)` for `A - CC'`





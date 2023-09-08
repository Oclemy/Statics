In addition to (and as part of) its support for multi-dimensional arrays, Julia provides native implementations of many common and useful linear algebra operations which can be loaded with `using LinearAlgebra`. Basic operations, such as [`tr`](https://docs.julialang.org/#LinearAlgebra.tr), [`det`](https://docs.julialang.org/#LinearAlgebra.det), and [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D) are all supported:


```julia
julia> A = [1 2 3; 4 1 6; 7 8 1]
3×3 Matrix{Int64}:
 1  2  3
 4  1  6
 7  8  1

julia> tr(A)
3

julia> det(A)
104.0

julia> inv(A)
3×3 Matrix{Float64}:
 -0.451923   0.211538    0.0865385
  0.365385  -0.192308    0.0576923
  0.240385   0.0576923  -0.0673077
```
As well as other useful operations, such as finding eigenvalues or eigenvectors:


```julia
julia> A = [-4. -17.; 2. 2.]
2×2 Matrix{Float64}:
 -4.0  -17.0
  2.0    2.0

julia> eigvals(A)
2-element Vector{ComplexF64}:
 -1.0 - 5.0im
 -1.0 + 5.0im

julia> eigvecs(A)
2×2 Matrix{ComplexF64}:
  0.945905-0.0im        0.945905+0.0im
 -0.166924+0.278207im  -0.166924-0.278207im
```
In addition, Julia provides many [factorizations](https://docs.julialang.org/#man-linalg-factorizations) which can be used to speed up problems such as linear solve or matrix exponentiation by pre-factorizing a matrix into a form more amenable (for performance or memory reasons) to the problem. See the documentation on [`factorize`](https://docs.julialang.org/#LinearAlgebra.factorize) for more information. As an example:


```julia
julia> A = [1.5 2 -4; 3 -1 -6; -10 2.3 4]
3×3 Matrix{Float64}:
   1.5   2.0  -4.0
   3.0  -1.0  -6.0
 -10.0   2.3   4.0

julia> factorize(A)
LU{Float64, Matrix{Float64}, Vector{Int64}}
L factor:
3×3 Matrix{Float64}:
  1.0    0.0       0.0
 -0.15   1.0       0.0
 -0.3   -0.132196  1.0
U factor:
3×3 Matrix{Float64}:
 -10.0  2.3     4.0
   0.0  2.345  -3.4
   0.0  0.0    -5.24947
```
Since `A` is not Hermitian, symmetric, triangular, tridiagonal, or bidiagonal, an LU factorization may be the best we can do. Compare with:


```julia
julia> B = [1.5 2 -4; 2 -1 -3; -4 -3 5]
3×3 Matrix{Float64}:
  1.5   2.0  -4.0
  2.0  -1.0  -3.0
 -4.0  -3.0   5.0

julia> factorize(B)
BunchKaufman{Float64, Matrix{Float64}, Vector{Int64}}
D factor:
3×3 Tridiagonal{Float64, Vector{Float64}}:
 -1.64286   0.0   ⋅
  0.0      -2.8  0.0
   ⋅        0.0  5.0
U factor:
3×3 UnitUpperTriangular{Float64, Matrix{Float64}}:
 1.0  0.142857  -0.8
  ⋅   1.0       -0.6
  ⋅    ⋅         1.0
permutation:
3-element Vector{Int64}:
 1
 2
 3
```
Here, Julia was able to detect that `B` is in fact symmetric, and used a more appropriate factorization. Often it's possible to write more efficient code for a matrix that is known to have certain properties e.g. it is symmetric, or tridiagonal. Julia provides some special types so that you can "tag" matrices as having these properties. For instance:


```julia
julia> B = [1.5 2 -4; 2 -1 -3; -4 -3 5]
3×3 Matrix{Float64}:
  1.5   2.0  -4.0
  2.0  -1.0  -3.0
 -4.0  -3.0   5.0

julia> sB = Symmetric(B)
3×3 Symmetric{Float64, Matrix{Float64}}:
  1.5   2.0  -4.0
  2.0  -1.0  -3.0
 -4.0  -3.0   5.0
```
`sB` has been tagged as a matrix that's (real) symmetric, so for later operations we might perform on it, such as eigenfactorization or computing matrix-vector products, efficiencies can be found by only referencing half of it. For example:


```julia
julia> B = [1.5 2 -4; 2 -1 -3; -4 -3 5]
3×3 Matrix{Float64}:
  1.5   2.0  -4.0
  2.0  -1.0  -3.0
 -4.0  -3.0   5.0

julia> sB = Symmetric(B)
3×3 Symmetric{Float64, Matrix{Float64}}:
  1.5   2.0  -4.0
  2.0  -1.0  -3.0
 -4.0  -3.0   5.0

julia> x = [1; 2; 3]
3-element Vector{Int64}:
 1
 2
 3

julia> sBx
3-element Vector{Float64}:
 -1.7391304347826084
 -1.1086956521739126
 -1.4565217391304346
```
The `` operation here performs the linear solution. The left-division operator is pretty powerful and it's easy to write compact, readable code that is flexible enough to solve all sorts of systems of linear equations.

[Matrices with special symmetries and structures](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=3274) arise often in linear algebra and are frequently associated with various matrix factorizations. Julia features a rich collection of special matrix types, which allow for fast computation with specialized routines that are specially developed for particular matrix types.

The following tables summarize the types of special matrices that have been implemented in Julia, as well as whether hooks to various optimized methods for them in LAPACK are available.



| Matrix type | `+` | `-` | `*` | `` | Other functions with optimized methods |
| --- | --- | --- | --- | --- | --- |
| [`Symmetric`](https://docs.julialang.org/#LinearAlgebra.Symmetric) |  |  |  | MV | [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`sqrt`](https://docs.julialang.org/../../base/math/#Base.sqrt-Tuple%7BNumber%7D), [`exp`](https://docs.julialang.org/../../base/math/#Base.exp-Tuple%7BFloat64%7D) |
| [`Hermitian`](https://docs.julialang.org/#LinearAlgebra.Hermitian) |  |  |  | MV | [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`sqrt`](https://docs.julialang.org/../../base/math/#Base.sqrt-Tuple%7BNumber%7D), [`exp`](https://docs.julialang.org/../../base/math/#Base.exp-Tuple%7BFloat64%7D) |
| [`UpperTriangular`](https://docs.julialang.org/#LinearAlgebra.UpperTriangular) |  |  | MV | MV | [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det) |
| [`UnitUpperTriangular`](https://docs.julialang.org/#LinearAlgebra.UnitUpperTriangular) |  |  | MV | MV | [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det) |
| [`LowerTriangular`](https://docs.julialang.org/#LinearAlgebra.LowerTriangular) |  |  | MV | MV | [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det) |
| [`UnitLowerTriangular`](https://docs.julialang.org/#LinearAlgebra.UnitLowerTriangular) |  |  | MV | MV | [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det) |
| [`UpperHessenberg`](https://docs.julialang.org/#LinearAlgebra.UpperHessenberg) |  |  |  | MM | [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det) |
| [`SymTridiagonal`](https://docs.julialang.org/#LinearAlgebra.SymTridiagonal) | M | M | MS | MV | [`eigmax`](https://docs.julialang.org/#LinearAlgebra.eigmax), [`eigmin`](https://docs.julialang.org/#LinearAlgebra.eigmin) |
| [`Tridiagonal`](https://docs.julialang.org/#LinearAlgebra.Tridiagonal) | M | M | MS | MV |  |
| [`Bidiagonal`](https://docs.julialang.org/#LinearAlgebra.Bidiagonal) | M | M | MS | MV |  |
| [`Diagonal`](https://docs.julialang.org/#LinearAlgebra.Diagonal) | M | M | MV | MV | [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det), [`logdet`](https://docs.julialang.org/#LinearAlgebra.logdet), [`/`](https://docs.julialang.org/../../base/math/#Base.:/) |
| [`UniformScaling`](https://docs.julialang.org/#LinearAlgebra.UniformScaling) | M | M | MVS | MVS | [`/`](https://docs.julialang.org/../../base/math/#Base.:/) |

Legend:



| Key | Description |
| --- | --- |
| M (matrix) | An optimized method for matrix-matrix operations is available |
| V (vector) | An optimized method for matrix-vector operations is available |
| S (scalar) | An optimized method for matrix-scalar operations is available |

Legend:



| Key | Description | Example |
| --- | --- | --- |
| A (all) | An optimized method to find all the characteristic values and/or vectors is available | e.g. `eigvals(M)` |
| R (range) | An optimized method to find the `il`th through the `ih`th characteristic values are available | `eigvals(M, il, ih)` |
| I (interval) | An optimized method to find the characteristic values in the interval [`vl`, `vh`] is available | `eigvals(M, vl, vh)` |
| V (vectors) | An optimized method to find the characteristic vectors corresponding to the characteristic values `x=[x1, x2,...]` is available | `eigvecs(M, x)` |

A [`UniformScaling`](https://docs.julialang.org/#LinearAlgebra.UniformScaling) operator represents a scalar times the identity operator, `λ*I`. The identity operator `I` is defined as a constant and is an instance of `UniformScaling`. The size of these operators are generic and match the other matrix in the binary operations [`+`](https://docs.julialang.org/../../base/math/#Base.:+), [`-`](https://docs.julialang.org/../../base/math/#Base.:--Tuple%7BAny%7D), [`*`](https://docs.julialang.org/../../base/math/#Base.:*-Tuple%7BAny,%20Vararg%7BAny%7D%7D) and [``](https://docs.julialang.org/../../base/math/#Base.:%5C%5C-Tuple%7BAny,%20Any%7D). For `A+I` and `A-I` this means that `A` must be square. Multiplication with the identity operator `I` is a noop (except for checking that the scaling factor is one) and therefore almost without overhead.

To see the `UniformScaling` operator in action:


```julia
julia> U = UniformScaling(2);

julia> a = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> a + U
2×2 Matrix{Int64}:
 3  2
 3  6

julia> a * U
2×2 Matrix{Int64}:
 2  4
 6  8

julia> [a U]
2×4 Matrix{Int64}:
 1  2  2  0
 3  4  0  2

julia> b = [1 2 3; 4 5 6]
2×3 Matrix{Int64}:
 1  2  3
 4  5  6

julia> b - U
ERROR: DimensionMismatch: matrix is not square: dimensions are (2, 3)
Stacktrace:
[...]
```
If you need to solve many systems of the form `(A+μI)x = b` for the same `A` and different `μ`, it might be beneficial to first compute the Hessenberg factorization `F` of `A` via the [`hessenberg`](https://docs.julialang.org/#LinearAlgebra.hessenberg) function. Given `F`, Julia employs an efficient algorithm for `(F+μ*I)  b` (equivalent to `(A+μ*I)x  b`) and related operations like determinants.

[Matrix factorizations (a.k.a. matrix decompositions)](https://en.wikipedia.org/wiki/Matrix_decomposition) compute the factorization of a matrix into a product of matrices, and are one of the central concepts in linear algebra.

The following table summarizes the types of matrix factorizations that have been implemented in Julia. Details of their associated methods can be found in the [Standard functions](https://docs.julialang.org/#Standard-functions) section of the Linear Algebra documentation.

Linear algebra functions in Julia are largely implemented by calling functions from [LAPACK](http://www.netlib.org/lapack/). Sparse matrix factorizations call functions from [SuiteSparse](http://suitesparse.com). Other sparse solvers are available as Julia packages.


```julia
*(A::AbstractMatrix, B::AbstractMatrix)
```
Matrix multiplication.

**Examples**


```julia
julia> [1 1; 0 1] * [1 0; 1 1]
2×2 Matrix{Int64}:
 2  1
 1  1
```

```julia
(A, B)
```
Matrix division using a polyalgorithm. For input matrices `A` and `B`, the result `X` is such that `A*X == B` when `A` is square. The solver that is used depends upon the structure of `A`. If `A` is upper or lower triangular (or diagonal), no factorization of `A` is required and the system is solved with either forward or backward substitution. For non-triangular square matrices, an LU factorization is used.

For rectangular `A` the result is the minimum-norm least squares solution computed by a pivoted QR factorization of `A` and a rank estimate of `A` based on the R factor.

When `A` is sparse, a similar polyalgorithm is used. For indefinite matrices, the `LDLt` factorization does not use pivoting during the numerical factorization and therefore the procedure can fail even for invertible matrices.

See also: [`factorize`](https://docs.julialang.org/#LinearAlgebra.factorize), [`pinv`](https://docs.julialang.org/#LinearAlgebra.pinv).

**Examples**


```julia
julia> A = [1 0; 1 -2]; B = [32; -4];

julia> X = A  B
2-element Vector{Float64}:
 32.0
 18.0

julia> A * X == B
true
```

```julia
A / B
```
Matrix right-division: `A / B` is equivalent to `(B'  A')'` where [``](https://docs.julialang.org/#Base.:%5C%5C-Tuple%7BAny,%20Any%7D) is the left-division operator. For square matrices, the result `X` is such that `A == X*B`.

See also: [`rdiv!`](https://docs.julialang.org/../stdlib/LinearAlgebra/#LinearAlgebra.rdiv!).

**Examples**


```julia
julia> A = Float64[1 4 5; 3 9 2]; B = Float64[1 4 2; 3 4 2; 8 7 1];

julia> X = A / B
2×3 Matrix{Float64}:
 -0.65   3.75  -1.2
  3.25  -2.75   1.0

julia> isapprox(A, X*B)
true

julia> isapprox(X, A*pinv(B))
true
```

```julia
SingularException
```
Exception thrown when the input matrix has one or more zero-valued eigenvalues, and is not invertible. A linear solve involving such a matrix cannot be computed. The `info` field indicates the location of (one of) the singular value(s).


```julia
PosDefException
```
Exception thrown when the input matrix was not [positive definite](https://en.wikipedia.org/wiki/Definiteness_of_a_matrix). Some linear algebra functions and factorizations are only applicable to positive definite matrices. The `info` field indicates the location of (one of) the eigenvalue(s) which is (are) less than/equal to 0.


```julia
ZeroPivotException <: Exception
```
Exception thrown when a matrix factorization/solve encounters a zero in a pivot (diagonal) position and cannot proceed. This may *not* mean that the matrix is singular: it may be fruitful to switch to a diffent factorization such as pivoted LU that can re-order variables to eliminate spurious zero pivots. The `info` field indicates the location of (one of) the zero pivot(s).


```julia
dot(x, y)
x ⋅ y
```
Compute the dot product between two vectors. For complex vectors, the first vector is conjugated.

`dot` also works on arbitrary iterable objects, including arrays of any dimension, as long as `dot` is defined on the elements.

`dot` is semantically equivalent to `sum(dot(vx,vy) for (vx,vy) in zip(x, y))`, with the added restriction that the arguments must have equal lengths.

`x ⋅ y` (where `⋅` can be typed by tab-completing `cdot` in the REPL) is a synonym for `dot(x, y)`.

**Examples**


```julia
julia> dot([1; 1], [2; 3])
5

julia> dot([im; im], [1; 1])
0 - 2im

julia> dot(1:5, 2:6)
70

julia> x = fill(2., (5,5));

julia> y = fill(3., (5,5));

julia> dot(x, y)
150.0
```

```julia
dot(x, A, y)
```
Compute the generalized dot product `dot(x, A*y)` between two vectors `x` and `y`, without storing the intermediate result of `A*y`. As for the two-argument [`dot(_,_)`](https://docs.julialang.org/#LinearAlgebra.dot), this acts recursively. Moreover, for complex vectors, the first vector is conjugated.

Three-argument `dot` requires at least Julia 1.4.

**Examples**


```julia
julia> dot([1; 1], [1 2; 3 4], [2; 3])
26

julia> dot(1:5, reshape(1:25, 5, 5), 2:6)
4850

julia> ⋅(1:5, reshape(1:25, 5, 5), 2:6) == dot(1:5, reshape(1:25, 5, 5), 2:6)
true
```

```julia
cross(x, y)
×(x,y)
```
Compute the cross product of two 3-vectors.

**Examples**


```julia
julia> a = [0;1;0]
3-element Vector{Int64}:
 0
 1
 0

julia> b = [0;0;1]
3-element Vector{Int64}:
 0
 0
 1

julia> cross(a,b)
3-element Vector{Int64}:
 1
 0
 0
```

```julia
factorize(A)
```
Compute a convenient factorization of `A`, based upon the type of the input matrix. `factorize` checks `A` to see if it is symmetric/triangular/etc. if `A` is passed as a generic matrix. `factorize` checks every element of `A` to verify/rule out each property. It will short-circuit as soon as it can rule out symmetry/triangular structure. The return value can be reused for efficient solving of multiple systems. For example: `A=factorize(A); x=Ab; y=AC`.



| Properties of `A` | type of factorization |
| --- | --- |
| Positive-definite | Cholesky (see [`cholesky`](https://docs.julialang.org/#LinearAlgebra.cholesky)) |
| Dense Symmetric/Hermitian | Bunch-Kaufman (see [`bunchkaufman`](https://docs.julialang.org/#LinearAlgebra.bunchkaufman)) |
| Sparse Symmetric/Hermitian | LDLt (see [`ldlt`](https://docs.julialang.org/#LinearAlgebra.ldlt)) |
| Triangular | Triangular |
| Diagonal | Diagonal |
| Bidiagonal | Bidiagonal |
| Tridiagonal | LU (see [`lu`](https://docs.julialang.org/#LinearAlgebra.lu)) |
| Symmetric real tridiagonal | LDLt (see [`ldlt`](https://docs.julialang.org/#LinearAlgebra.ldlt)) |
| General square | LU (see [`lu`](https://docs.julialang.org/#LinearAlgebra.lu)) |
| General non-square | QR (see [`qr`](https://docs.julialang.org/#LinearAlgebra.qr)) |

If `factorize` is called on a Hermitian positive-definite matrix, for instance, then `factorize` will return a Cholesky factorization.

**Examples**


```julia
julia> A = Array(Bidiagonal(fill(1.0, (5, 5)), :U))
5×5 Matrix{Float64}:
 1.0  1.0  0.0  0.0  0.0
 0.0  1.0  1.0  0.0  0.0
 0.0  0.0  1.0  1.0  0.0
 0.0  0.0  0.0  1.0  1.0
 0.0  0.0  0.0  0.0  1.0

julia> factorize(A) # factorize will check to see that A is already factorized
5×5 Bidiagonal{Float64, Vector{Float64}}:
 1.0  1.0   ⋅    ⋅    ⋅
  ⋅   1.0  1.0   ⋅    ⋅
  ⋅    ⋅   1.0  1.0   ⋅
  ⋅    ⋅    ⋅   1.0  1.0
  ⋅    ⋅    ⋅    ⋅   1.0
```
This returns a `5×5 Bidiagonal{Float64}`, which can now be passed to other linear algebra functions (e.g. eigensolvers) which will use specialized methods for `Bidiagonal` types.


```julia
Diagonal(V::AbstractVector)
```
Construct a matrix with `V` as its diagonal.

See also [`diag`](https://docs.julialang.org/#LinearAlgebra.diag), [`diagm`](https://docs.julialang.org/#LinearAlgebra.diagm).

**Examples**


```julia
julia> Diagonal([1, 10, 100])
3×3 Diagonal{Int64, Vector{Int64}}:
 1   ⋅    ⋅
 ⋅  10    ⋅
 ⋅   ⋅  100

julia> diagm([7, 13])
2×2 Matrix{Int64}:
 7   0
 0  13
```

```julia
Diagonal(A::AbstractMatrix)
```
Construct a matrix from the diagonal of `A`.

**Examples**


```julia
julia> A = permutedims(reshape(1:15, 5, 3))
3×5 Matrix{Int64}:
  1   2   3   4   5
  6   7   8   9  10
 11  12  13  14  15

julia> Diagonal(A)
3×3 Diagonal{Int64, Vector{Int64}}:
 1  ⋅   ⋅
 ⋅  7   ⋅
 ⋅  ⋅  13

julia> diag(A, 2)
3-element Vector{Int64}:
  3
  9
 15
```

```julia
Diagonal{T}(undef, n)
```
Construct an uninitialized `Diagonal{T}` of length `n`. See `undef`.


```julia
Bidiagonal(dv::V, ev::V, uplo::Symbol) where V <: AbstractVector
```
Constructs an upper (`uplo=:U`) or lower (`uplo=:L`) bidiagonal matrix using the given diagonal (`dv`) and off-diagonal (`ev`) vectors. The result is of type `Bidiagonal` and provides efficient specialized linear solvers, but may be converted into a regular matrix with [`convert(Array, _)`](https://docs.julialang.org/../../base/base/#Base.convert) (or `Array(_)` for short). The length of `ev` must be one less than the length of `dv`.

**Examples**


```julia
julia> dv = [1, 2, 3, 4]
4-element Vector{Int64}:
 1
 2
 3
 4

julia> ev = [7, 8, 9]
3-element Vector{Int64}:
 7
 8
 9

julia> Bu = Bidiagonal(dv, ev, :U) # ev is on the first superdiagonal
4×4 Bidiagonal{Int64, Vector{Int64}}:
 1  7  ⋅  ⋅
 ⋅  2  8  ⋅
 ⋅  ⋅  3  9
 ⋅  ⋅  ⋅  4

julia> Bl = Bidiagonal(dv, ev, :L) # ev is on the first subdiagonal
4×4 Bidiagonal{Int64, Vector{Int64}}:
 1  ⋅  ⋅  ⋅
 7  2  ⋅  ⋅
 ⋅  8  3  ⋅
 ⋅  ⋅  9  4
```

```julia
Bidiagonal(A, uplo::Symbol)
```
Construct a `Bidiagonal` matrix from the main diagonal of `A` and its first super- (if `uplo=:U`) or sub-diagonal (if `uplo=:L`).

**Examples**


```julia
julia> A = [1 1 1 1; 2 2 2 2; 3 3 3 3; 4 4 4 4]
4×4 Matrix{Int64}:
 1  1  1  1
 2  2  2  2
 3  3  3  3
 4  4  4  4

julia> Bidiagonal(A, :U) # contains the main diagonal and first superdiagonal of A
4×4 Bidiagonal{Int64, Vector{Int64}}:
 1  1  ⋅  ⋅
 ⋅  2  2  ⋅
 ⋅  ⋅  3  3
 ⋅  ⋅  ⋅  4

julia> Bidiagonal(A, :L) # contains the main diagonal and first subdiagonal of A
4×4 Bidiagonal{Int64, Vector{Int64}}:
 1  ⋅  ⋅  ⋅
 2  2  ⋅  ⋅
 ⋅  3  3  ⋅
 ⋅  ⋅  4  4
```

```julia
SymTridiagonal(dv::V, ev::V) where V <: AbstractVector
```
Construct a symmetric tridiagonal matrix from the diagonal (`dv`) and first sub/super-diagonal (`ev`), respectively. The result is of type `SymTridiagonal` and provides efficient specialized eigensolvers, but may be converted into a regular matrix with [`convert(Array, _)`](https://docs.julialang.org/../../base/base/#Base.convert) (or `Array(_)` for short).

For `SymTridiagonal` block matrices, the elements of `dv` are symmetrized. The argument `ev` is interpreted as the superdiagonal. Blocks from the subdiagonal are (materialized) transpose of the corresponding superdiagonal blocks.

**Examples**


```julia
julia> dv = [1, 2, 3, 4]
4-element Vector{Int64}:
 1
 2
 3
 4

julia> ev = [7, 8, 9]
3-element Vector{Int64}:
 7
 8
 9

julia> SymTridiagonal(dv, ev)
4×4 SymTridiagonal{Int64, Vector{Int64}}:
 1  7  ⋅  ⋅
 7  2  8  ⋅
 ⋅  8  3  9
 ⋅  ⋅  9  4

julia> A = SymTridiagonal(fill([1 2; 3 4], 3), fill([1 2; 3 4], 2));

julia> A[1,1]
2×2 Symmetric{Int64, Matrix{Int64}}:
 1  2
 2  4

julia> A[1,2]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> A[2,1]
2×2 Matrix{Int64}:
 1  3
 2  4
```

```julia
SymTridiagonal(A::AbstractMatrix)
```
Construct a symmetric tridiagonal matrix from the diagonal and first superdiagonal of the symmetric matrix `A`.

**Examples**


```julia
julia> A = [1 2 3; 2 4 5; 3 5 6]
3×3 Matrix{Int64}:
 1  2  3
 2  4  5
 3  5  6

julia> SymTridiagonal(A)
3×3 SymTridiagonal{Int64, Vector{Int64}}:
 1  2  ⋅
 2  4  5
 ⋅  5  6

julia> B = reshape([[1 2; 2 3], [1 2; 3 4], [1 3; 2 4], [1 2; 2 3]], 2, 2);

julia> SymTridiagonal(B)
2×2 SymTridiagonal{Matrix{Int64}, Vector{Matrix{Int64}}}:
 [1 2; 2 3]  [1 3; 2 4]
 [1 2; 3 4]  [1 2; 2 3]
```

```julia
Tridiagonal(dl::V, d::V, du::V) where V <: AbstractVector
```
Construct a tridiagonal matrix from the first subdiagonal, diagonal, and first superdiagonal, respectively. The result is of type `Tridiagonal` and provides efficient specialized linear solvers, but may be converted into a regular matrix with [`convert(Array, _)`](https://docs.julialang.org/../../base/base/#Base.convert) (or `Array(_)` for short). The lengths of `dl` and `du` must be one less than the length of `d`.

**Examples**


```julia
julia> dl = [1, 2, 3];

julia> du = [4, 5, 6];

julia> d = [7, 8, 9, 0];

julia> Tridiagonal(dl, d, du)
4×4 Tridiagonal{Int64, Vector{Int64}}:
 7  4  ⋅  ⋅
 1  8  5  ⋅
 ⋅  2  9  6
 ⋅  ⋅  3  0
```

```julia
Tridiagonal(A)
```
Construct a tridiagonal matrix from the first sub-diagonal, diagonal and first super-diagonal of the matrix `A`.

**Examples**


```julia
julia> A = [1 2 3 4; 1 2 3 4; 1 2 3 4; 1 2 3 4]
4×4 Matrix{Int64}:
 1  2  3  4
 1  2  3  4
 1  2  3  4
 1  2  3  4

julia> Tridiagonal(A)
4×4 Tridiagonal{Int64, Vector{Int64}}:
 1  2  ⋅  ⋅
 1  2  3  ⋅
 ⋅  2  3  4
 ⋅  ⋅  3  4
```

```julia
Symmetric(A, uplo=:U)
```
Construct a `Symmetric` view of the upper (if `uplo = :U`) or lower (if `uplo = :L`) triangle of the matrix `A`.

**Examples**


```julia
julia> A = [1 0 2 0 3; 0 4 0 5 0; 6 0 7 0 8; 0 9 0 1 0; 2 0 3 0 4]
5×5 Matrix{Int64}:
 1  0  2  0  3
 0  4  0  5  0
 6  0  7  0  8
 0  9  0  1  0
 2  0  3  0  4

julia> Supper = Symmetric(A)
5×5 Symmetric{Int64, Matrix{Int64}}:
 1  0  2  0  3
 0  4  0  5  0
 2  0  7  0  8
 0  5  0  1  0
 3  0  8  0  4

julia> Slower = Symmetric(A, :L)
5×5 Symmetric{Int64, Matrix{Int64}}:
 1  0  6  0  2
 0  4  0  9  0
 6  0  7  0  3
 0  9  0  1  0
 2  0  3  0  4
```
Note that `Supper` will not be equal to `Slower` unless `A` is itself symmetric (e.g. if `A == transpose(A)`).


```julia
Hermitian(A, uplo=:U)
```
Construct a `Hermitian` view of the upper (if `uplo = :U`) or lower (if `uplo = :L`) triangle of the matrix `A`.

**Examples**


```julia
julia> A = [1 0 2+2im 0 3-3im; 0 4 0 5 0; 6-6im 0 7 0 8+8im; 0 9 0 1 0; 2+2im 0 3-3im 0 4];

julia> Hupper = Hermitian(A)
5×5 Hermitian{Complex{Int64}, Matrix{Complex{Int64}}}:
 1+0im  0+0im  2+2im  0+0im  3-3im
 0+0im  4+0im  0+0im  5+0im  0+0im
 2-2im  0+0im  7+0im  0+0im  8+8im
 0+0im  5+0im  0+0im  1+0im  0+0im
 3+3im  0+0im  8-8im  0+0im  4+0im

julia> Hlower = Hermitian(A, :L)
5×5 Hermitian{Complex{Int64}, Matrix{Complex{Int64}}}:
 1+0im  0+0im  6+6im  0+0im  2-2im
 0+0im  4+0im  0+0im  9+0im  0+0im
 6-6im  0+0im  7+0im  0+0im  3+3im
 0+0im  9+0im  0+0im  1+0im  0+0im
 2+2im  0+0im  3-3im  0+0im  4+0im
```
Note that `Hupper` will not be equal to `Hlower` unless `A` is itself Hermitian (e.g. if `A == adjoint(A)`).

All non-real parts of the diagonal will be ignored.


```julia
Hermitian(fill(complex(1,1), 1, 1)) == fill(1, 1, 1)
```

```julia
LowerTriangular(A::AbstractMatrix)
```
Construct a `LowerTriangular` view of the matrix `A`.

**Examples**


```julia
julia> A = [1.0 2.0 3.0; 4.0 5.0 6.0; 7.0 8.0 9.0]
3×3 Matrix{Float64}:
 1.0  2.0  3.0
 4.0  5.0  6.0
 7.0  8.0  9.0

julia> LowerTriangular(A)
3×3 LowerTriangular{Float64, Matrix{Float64}}:
 1.0   ⋅    ⋅
 4.0  5.0   ⋅
 7.0  8.0  9.0
```

```julia
UpperTriangular(A::AbstractMatrix)
```
Construct an `UpperTriangular` view of the matrix `A`.

**Examples**


```julia
julia> A = [1.0 2.0 3.0; 4.0 5.0 6.0; 7.0 8.0 9.0]
3×3 Matrix{Float64}:
 1.0  2.0  3.0
 4.0  5.0  6.0
 7.0  8.0  9.0

julia> UpperTriangular(A)
3×3 UpperTriangular{Float64, Matrix{Float64}}:
 1.0  2.0  3.0
  ⋅   5.0  6.0
  ⋅    ⋅   9.0
```

```julia
UnitLowerTriangular(A::AbstractMatrix)
```
Construct a `UnitLowerTriangular` view of the matrix `A`. Such a view has the [`oneunit`](https://docs.julialang.org/../../base/numbers/#Base.oneunit) of the [`eltype`](https://docs.julialang.org/../../base/collections/#Base.eltype) of `A` on its diagonal.

**Examples**


```julia
julia> A = [1.0 2.0 3.0; 4.0 5.0 6.0; 7.0 8.0 9.0]
3×3 Matrix{Float64}:
 1.0  2.0  3.0
 4.0  5.0  6.0
 7.0  8.0  9.0

julia> UnitLowerTriangular(A)
3×3 UnitLowerTriangular{Float64, Matrix{Float64}}:
 1.0   ⋅    ⋅
 4.0  1.0   ⋅
 7.0  8.0  1.0
```

```julia
UnitUpperTriangular(A::AbstractMatrix)
```
Construct an `UnitUpperTriangular` view of the matrix `A`. Such a view has the [`oneunit`](https://docs.julialang.org/../../base/numbers/#Base.oneunit) of the [`eltype`](https://docs.julialang.org/../../base/collections/#Base.eltype) of `A` on its diagonal.

**Examples**


```julia
julia> A = [1.0 2.0 3.0; 4.0 5.0 6.0; 7.0 8.0 9.0]
3×3 Matrix{Float64}:
 1.0  2.0  3.0
 4.0  5.0  6.0
 7.0  8.0  9.0

julia> UnitUpperTriangular(A)
3×3 UnitUpperTriangular{Float64, Matrix{Float64}}:
 1.0  2.0  3.0
  ⋅   1.0  6.0
  ⋅    ⋅   1.0
```

```julia
UpperHessenberg(A::AbstractMatrix)
```
Construct an `UpperHessenberg` view of the matrix `A`. Entries of `A` below the first subdiagonal are ignored.

Efficient algorithms are implemented for `H  b`, `det(H)`, and similar.

See also the [`hessenberg`](https://docs.julialang.org/#LinearAlgebra.hessenberg) function to factor any matrix into a similar upper-Hessenberg matrix.

If `F::Hessenberg` is the factorization object, the unitary matrix can be accessed with `F.Q` and the Hessenberg matrix with `F.H`. When `Q` is extracted, the resulting type is the `HessenbergQ` object, and may be converted to a regular matrix with [`convert(Array, _)`](https://docs.julialang.org/../../base/base/#Base.convert) (or `Array(_)` for short).

Iterating the decomposition produces the factors `F.Q` and `F.H`.

**Examples**


```julia
julia> A = [1 2 3 4; 5 6 7 8; 9 10 11 12; 13 14 15 16]
4×4 Matrix{Int64}:
  1   2   3   4
  5   6   7   8
  9  10  11  12
 13  14  15  16

julia> UpperHessenberg(A)
4×4 UpperHessenberg{Int64, Matrix{Int64}}:
 1   2   3   4
 5   6   7   8
 ⋅  10  11  12
 ⋅   ⋅  15  16
```

```julia
UniformScaling{T<:Number}
```
Generically sized uniform scaling operator defined as a scalar times the identity operator, `λ*I`. Although without an explicit `size`, it acts similarly to a matrix in many cases and includes support for some indexing. See also [`I`](https://docs.julialang.org/#LinearAlgebra.I).

Indexing using ranges is available as of Julia 1.6.

**Examples**


```julia
julia> J = UniformScaling(2.)
UniformScaling{Float64}
2.0*I

julia> A = [1. 2.; 3. 4.]
2×2 Matrix{Float64}:
 1.0  2.0
 3.0  4.0

julia> J*A
2×2 Matrix{Float64}:
 2.0  4.0
 6.0  8.0

julia> J[1:2, 1:2]
2×2 Matrix{Float64}:
 2.0  0.0
 0.0  2.0
```

```julia
I
```
An object of type [`UniformScaling`](https://docs.julialang.org/#LinearAlgebra.UniformScaling), representing an identity matrix of any size.

**Examples**


```julia
julia> fill(1, (5,6)) * I == fill(1, (5,6))
true

julia> [1 2im 3; 1im 2 3] * I
2×3 Matrix{Complex{Int64}}:
 1+0im  0+2im  3+0im
 0+1im  2+0im  3+0im
```

```julia
(I::UniformScaling)(n::Integer)
```
Construct a `Diagonal` matrix from a `UniformScaling`.

This method is available as of Julia 1.2.

**Examples**


```julia
julia> I(3)
3×3 Diagonal{Bool, Vector{Bool}}:
 1  ⋅  ⋅
 ⋅  1  ⋅
 ⋅  ⋅  1

julia> (0.7*I)(3)
3×3 Diagonal{Float64, Vector{Float64}}:
 0.7   ⋅    ⋅
  ⋅   0.7   ⋅
  ⋅    ⋅   0.7
```

```julia
LU <: Factorization
```
Matrix factorization type of the `LU` factorization of a square matrix `A`. This is the return type of [`lu`](https://docs.julialang.org/#LinearAlgebra.lu), the corresponding matrix factorization function.

The individual components of the factorization `F::LU` can be accessed via [`getproperty`](https://docs.julialang.org/../../base/base/#Base.getproperty):



| Component | Description |
| --- | --- |
| `F.L` | `L` (unit lower triangular) part of `LU` |
| `F.U` | `U` (upper triangular) part of `LU` |
| `F.p` | (right) permutation `Vector` |
| `F.P` | (right) permutation `Matrix` |

Iterating the factorization produces the components `F.L`, `F.U`, and `F.p`.

**Examples**


```julia
julia> A = [4 3; 6 3]
2×2 Matrix{Int64}:
 4  3
 6  3

julia> F = lu(A)
LU{Float64, Matrix{Float64}, Vector{Int64}}
L factor:
2×2 Matrix{Float64}:
 1.0       0.0
 0.666667  1.0
U factor:
2×2 Matrix{Float64}:
 6.0  3.0
 0.0  1.0

julia> F.L * F.U == A[F.p, :]
true

julia> l, u, p = lu(A); # destructuring via iteration

julia> l == F.L && u == F.U && p == F.p
true
```

```julia
lu(A, pivot = RowMaximum(); check = true) -> F::LU
```
Compute the LU factorization of `A`.

When `check = true`, an error is thrown if the decomposition fails. When `check = false`, responsibility for checking the decomposition's validity (via [`issuccess`](https://docs.julialang.org/#LinearAlgebra.issuccess)) lies with the user.

In most cases, if `A` is a subtype `S` of `AbstractMatrix{T}` with an element type `T` supporting `+`, `-`, `*` and `/`, the return type is `LU{T,S{T}}`. If pivoting is chosen (default) the element type should also support [`abs`](https://docs.julialang.org/../../base/math/#Base.abs) and [`<`](https://docs.julialang.org/../../base/math/#Base.:<). Pivoting can be turned off by passing `pivot = NoPivot()`.

The individual components of the factorization `F` can be accessed via [`getproperty`](https://docs.julialang.org/../../base/base/#Base.getproperty):



| Component | Description |
| --- | --- |
| `F.L` | `L` (lower triangular) part of `LU` |
| `F.U` | `U` (upper triangular) part of `LU` |
| `F.p` | (right) permutation `Vector` |
| `F.P` | (right) permutation `Matrix` |

Iterating the factorization produces the components `F.L`, `F.U`, and `F.p`.

The relationship between `F` and `A` is

`F.L*F.U == A[F.p, :]`

`F` further supports the following functions:

**Examples**


```julia
julia> A = [4 3; 6 3]
2×2 Matrix{Int64}:
 4  3
 6  3

julia> F = lu(A)
LU{Float64, Matrix{Float64}, Vector{Int64}}
L factor:
2×2 Matrix{Float64}:
 1.0       0.0
 0.666667  1.0
U factor:
2×2 Matrix{Float64}:
 6.0  3.0
 0.0  1.0

julia> F.L * F.U == A[F.p, :]
true

julia> l, u, p = lu(A); # destructuring via iteration

julia> l == F.L && u == F.U && p == F.p
true
```

```julia
lu(A::SparseMatrixCSC; check = true) -> F::UmfpackLU
```
Compute the LU factorization of a sparse matrix `A`.

For sparse `A` with real or complex element type, the return type of `F` is `UmfpackLU{Tv, Ti}`, with `Tv` = [`Float64`](https://docs.julialang.org/../../base/numbers/#Core.Float64) or `ComplexF64` respectively and `Ti` is an integer type ([`Int32`](https://docs.julialang.org/../../base/numbers/#Core.Int32) or [`Int64`](https://docs.julialang.org/../../base/numbers/#Core.Int64)).

When `check = true`, an error is thrown if the decomposition fails. When `check = false`, responsibility for checking the decomposition's validity (via [`issuccess`](https://docs.julialang.org/#LinearAlgebra.issuccess)) lies with the user.

The individual components of the factorization `F` can be accessed by indexing:



| Component | Description |
| --- | --- |
| `L` | `L` (lower triangular) part of `LU` |
| `U` | `U` (upper triangular) part of `LU` |
| `p` | right permutation `Vector` |
| `q` | left permutation `Vector` |
| `Rs` | `Vector` of scaling factors |
| `:` | `(L,U,p,q,Rs)` components |

The relation between `F` and `A` is

`F.L*F.U == (F.Rs .* A)[F.p, F.q]`

`F` further supports the following functions:

`lu(A::SparseMatrixCSC)` uses the UMFPACK library that is part of SuiteSparse. As this library only supports sparse matrices with [`Float64`](https://docs.julialang.org/../../base/numbers/#Core.Float64) or `ComplexF64` elements, `lu` converts `A` into a copy that is of type `SparseMatrixCSC{Float64}` or `SparseMatrixCSC{ComplexF64}` as appropriate.


```julia
lu!(A, pivot = RowMaximum(); check = true) -> LU
```
`lu!` is the same as [`lu`](https://docs.julialang.org/#LinearAlgebra.lu), but saves space by overwriting the input `A`, instead of creating a copy. An [`InexactError`](https://docs.julialang.org/../../base/base/#Core.InexactError) exception is thrown if the factorization produces a number not representable by the element type of `A`, e.g. for integer types.

**Examples**


```julia
julia> A = [4. 3.; 6. 3.]
2×2 Matrix{Float64}:
 4.0  3.0
 6.0  3.0

julia> F = lu!(A)
LU{Float64, Matrix{Float64}, Vector{Int64}}
L factor:
2×2 Matrix{Float64}:
 1.0       0.0
 0.666667  1.0
U factor:
2×2 Matrix{Float64}:
 6.0  3.0
 0.0  1.0

julia> iA = [4 3; 6 3]
2×2 Matrix{Int64}:
 4  3
 6  3

julia> lu!(iA)
ERROR: InexactError: Int64(0.6666666666666666)
Stacktrace:
[...]
```

```julia
lu!(F::UmfpackLU, A::SparseMatrixCSC; check=true) -> F::UmfpackLU
```
Compute the LU factorization of a sparse matrix `A`, reusing the symbolic factorization of an already existing LU factorization stored in `F`. The sparse matrix `A` must have an identical nonzero pattern as the matrix used to create the LU factorization `F`, otherwise an error is thrown.

When `check = true`, an error is thrown if the decomposition fails. When `check = false`, responsibility for checking the decomposition's validity (via [`issuccess`](https://docs.julialang.org/#LinearAlgebra.issuccess)) lies with the user.

`lu!(F::UmfpackLU, A::SparseMatrixCSC)` uses the UMFPACK library that is part of SuiteSparse. As this library only supports sparse matrices with [`Float64`](https://docs.julialang.org/../../base/numbers/#Core.Float64) or `ComplexF64` elements, `lu!` converts `A` into a copy that is of type `SparseMatrixCSC{Float64}` or `SparseMatrixCSC{ComplexF64}` as appropriate.

`lu!` for `UmfpackLU` requires at least Julia 1.5.

**Examples**


```julia
julia> A = sparse(Float64[1.0 2.0; 0.0 3.0]);

julia> F = lu(A);

julia> B = sparse(Float64[1.0 1.0; 0.0 1.0]);

julia> lu!(F, B);

julia> F  ones(2)
2-element Vector{Float64}:
 0.0
 1.0
```

```julia
Cholesky <: Factorization
```
Matrix factorization type of the Cholesky factorization of a dense symmetric/Hermitian positive definite matrix `A`. This is the return type of [`cholesky`](https://docs.julialang.org/#LinearAlgebra.cholesky), the corresponding matrix factorization function.

The triangular Cholesky factor can be obtained from the factorization `F::Cholesky` via `F.L` and `F.U`, where `A ≈ F.U' * F.U ≈ F.L * F.L'`.

The following functions are available for `Cholesky` objects: [`size`](https://docs.julialang.org/../../base/arrays/#Base.size), [``](https://docs.julialang.org/../../base/math/#Base.:%5C%5C-Tuple%7BAny,%20Any%7D), [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det), [`logdet`](https://docs.julialang.org/#LinearAlgebra.logdet) and [`isposdef`](https://docs.julialang.org/#LinearAlgebra.isposdef).

Iterating the decomposition produces the components `L` and `U`.

**Examples**


```julia
julia> A = [4. 12. -16.; 12. 37. -43.; -16. -43. 98.]
3×3 Matrix{Float64}:
   4.0   12.0  -16.0
  12.0   37.0  -43.0
 -16.0  -43.0   98.0

julia> C = cholesky(A)
Cholesky{Float64, Matrix{Float64}}
U factor:
3×3 UpperTriangular{Float64, Matrix{Float64}}:
 2.0  6.0  -8.0
  ⋅   1.0   5.0
  ⋅    ⋅    3.0

julia> C.U
3×3 UpperTriangular{Float64, Matrix{Float64}}:
 2.0  6.0  -8.0
  ⋅   1.0   5.0
  ⋅    ⋅    3.0

julia> C.L
3×3 LowerTriangular{Float64, Matrix{Float64}}:
  2.0   ⋅    ⋅
  6.0  1.0   ⋅
 -8.0  5.0  3.0

julia> C.L * C.U == A
true

julia> l, u = C; # destructuring via iteration

julia> l == C.L && u == C.U
true
```

```julia
CholeskyPivoted
```
Matrix factorization type of the pivoted Cholesky factorization of a dense symmetric/Hermitian positive semi-definite matrix `A`. This is the return type of [`cholesky(_, ::RowMaximum)`](https://docs.julialang.org/#LinearAlgebra.cholesky), the corresponding matrix factorization function.

The triangular Cholesky factor can be obtained from the factorization `F::CholeskyPivoted` via `F.L` and `F.U`, and the permutation via `F.p`, where `A[F.p, F.p] ≈ Ur' * Ur ≈ Lr * Lr'` with `Ur = F.U[1:F.rank, :]` and `Lr = F.L[:, 1:F.rank]`, or alternatively `A ≈ Up' * Up ≈ Lp * Lp'` with `Up = F.U[1:F.rank, invperm(F.p)]` and `Lp = F.L[invperm(F.p), 1:F.rank]`.

The following functions are available for `CholeskyPivoted` objects: [`size`](https://docs.julialang.org/../../base/arrays/#Base.size), [``](https://docs.julialang.org/../../base/math/#Base.:%5C%5C-Tuple%7BAny,%20Any%7D), [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det), and [`rank`](https://docs.julialang.org/#LinearAlgebra.rank).

Iterating the decomposition produces the components `L` and `U`.

**Examples**


```julia
julia> X = [1.0, 2.0, 3.0, 4.0];

julia> A = X * X';

julia> C = cholesky(A, RowMaximum(), check = false)
CholeskyPivoted{Float64, Matrix{Float64}, Vector{Int64}}
U factor with rank 1:
4×4 UpperTriangular{Float64, Matrix{Float64}}:
 4.0  2.0  3.0  1.0
  ⋅   0.0  6.0  2.0
  ⋅    ⋅   9.0  3.0
  ⋅    ⋅    ⋅   1.0
permutation:
4-element Vector{Int64}:
 4
 2
 3
 1

julia> C.U[1:C.rank, :]' * C.U[1:C.rank, :] ≈ A[C.p, C.p]
true

julia> l, u = C; # destructuring via iteration

julia> l == C.L && u == C.U
true
```

```julia
cholesky(A::SparseMatrixCSC; shift = 0.0, check = true, perm = nothing) -> CHOLMOD.Factor
```
Compute the Cholesky factorization of a sparse positive definite matrix `A`. `A` must be a [`SparseMatrixCSC`](https://docs.julialang.org/../SparseArrays/#SparseArrays.SparseMatrixCSC) or a [`Symmetric`](https://docs.julialang.org/#LinearAlgebra.Symmetric)/[`Hermitian`](https://docs.julialang.org/#LinearAlgebra.Hermitian) view of a `SparseMatrixCSC`. Note that even if `A` doesn't have the type tag, it must still be symmetric or Hermitian. If `perm` is not given, a fill-reducing permutation is used. `F = cholesky(A)` is most frequently used to solve systems of equations with `Fb`, but also the methods [`diag`](https://docs.julialang.org/#LinearAlgebra.diag), [`det`](https://docs.julialang.org/#LinearAlgebra.det), and [`logdet`](https://docs.julialang.org/#LinearAlgebra.logdet) are defined for `F`. You can also extract individual factors from `F`, using `F.L`. However, since pivoting is on by default, the factorization is internally represented as `A == P'*L*L'*P` with a permutation matrix `P`; using just `L` without accounting for `P` will give incorrect answers. To include the effects of permutation, it's typically preferable to extract "combined" factors like `PtL = F.PtL` (the equivalent of `P'*L`) and `LtP = F.UP` (the equivalent of `L'*P`).

When `check = true`, an error is thrown if the decomposition fails. When `check = false`, responsibility for checking the decomposition's validity (via [`issuccess`](https://docs.julialang.org/#LinearAlgebra.issuccess)) lies with the user.

Setting the optional `shift` keyword argument computes the factorization of `A+shift*I` instead of `A`. If the `perm` argument is provided, it should be a permutation of `1:size(A,1)` giving the ordering to use (instead of CHOLMOD's default AMD ordering).

**Examples**

In the following example, the fill-reducing permutation used is `[3, 2, 1]`. If `perm` is set to `1:3` to enforce no permutation, the number of nonzero elements in the factor is 6.


```julia
julia> A = [2 1 1; 1 2 0; 1 0 2]
3×3 Matrix{Int64}:
 2  1  1
 1  2  0
 1  0  2

julia> C = cholesky(sparse(A))
SuiteSparse.CHOLMOD.Factor{Float64}
type:    LLt
method:  simplicial
maxnnz:  5
nnz:     5
success: true

julia> C.p
3-element Vector{Int64}:
 3
 2
 1

julia> L = sparse(C.L);

julia> Matrix(L)
3×3 Matrix{Float64}:
 1.41421   0.0       0.0
 0.0       1.41421   0.0
 0.707107  0.707107  1.0

julia> L * L' ≈ A[C.p, C.p]
true

julia> P = sparse(1:3, C.p, ones(3))
3×3 SparseMatrixCSC{Float64, Int64} with 3 stored entries:
  ⋅    ⋅   1.0
  ⋅   1.0   ⋅
 1.0   ⋅    ⋅

julia> P' * L * L' * P ≈ A
true

julia> C = cholesky(sparse(A), perm=1:3)
SuiteSparse.CHOLMOD.Factor{Float64}
type:    LLt
method:  simplicial
maxnnz:  6
nnz:     6
success: true

julia> L = sparse(C.L);

julia> Matrix(L)
3×3 Matrix{Float64}:
 1.41421    0.0       0.0
 0.707107   1.22474   0.0
 0.707107  -0.408248  1.1547

julia> L * L' ≈ A
true
```
This method uses the CHOLMOD library from SuiteSparse, which only supports doubles or complex doubles. Input matrices not of those element types will be converted to `SparseMatrixCSC{Float64}` or `SparseMatrixCSC{ComplexF64}` as appropriate.

Many other functions from CHOLMOD are wrapped but not exported from the `Base.SparseArrays.CHOLMOD` module.


```julia
cholesky(A, NoPivot(); check = true) -> Cholesky
```
Compute the Cholesky factorization of a dense symmetric positive definite matrix `A` and return a [`Cholesky`](https://docs.julialang.org/#LinearAlgebra.Cholesky) factorization. The matrix `A` can either be a [`Symmetric`](https://docs.julialang.org/#LinearAlgebra.Symmetric) or [`Hermitian`](https://docs.julialang.org/#LinearAlgebra.Hermitian) [`AbstractMatrix`](https://docs.julialang.org/../../base/arrays/#Base.AbstractMatrix) or a *perfectly* symmetric or Hermitian `AbstractMatrix`.

The triangular Cholesky factor can be obtained from the factorization `F` via `F.L` and `F.U`, where `A ≈ F.U' * F.U ≈ F.L * F.L'`.

The following functions are available for `Cholesky` objects: [`size`](https://docs.julialang.org/../../base/arrays/#Base.size), [``](https://docs.julialang.org/../../base/math/#Base.:%5C%5C-Tuple%7BAny,%20Any%7D), [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det), [`logdet`](https://docs.julialang.org/#LinearAlgebra.logdet) and [`isposdef`](https://docs.julialang.org/#LinearAlgebra.isposdef).

If you have a matrix `A` that is slightly non-Hermitian due to roundoff errors in its construction, wrap it in `Hermitian(A)` before passing it to `cholesky` in order to treat it as perfectly Hermitian.

When `check = true`, an error is thrown if the decomposition fails. When `check = false`, responsibility for checking the decomposition's validity (via [`issuccess`](https://docs.julialang.org/#LinearAlgebra.issuccess)) lies with the user.

**Examples**


```julia
julia> A = [4. 12. -16.; 12. 37. -43.; -16. -43. 98.]
3×3 Matrix{Float64}:
   4.0   12.0  -16.0
  12.0   37.0  -43.0
 -16.0  -43.0   98.0

julia> C = cholesky(A)
Cholesky{Float64, Matrix{Float64}}
U factor:
3×3 UpperTriangular{Float64, Matrix{Float64}}:
 2.0  6.0  -8.0
  ⋅   1.0   5.0
  ⋅    ⋅    3.0

julia> C.U
3×3 UpperTriangular{Float64, Matrix{Float64}}:
 2.0  6.0  -8.0
  ⋅   1.0   5.0
  ⋅    ⋅    3.0

julia> C.L
3×3 LowerTriangular{Float64, Matrix{Float64}}:
  2.0   ⋅    ⋅
  6.0  1.0   ⋅
 -8.0  5.0  3.0

julia> C.L * C.U == A
true
```

```julia
cholesky(A, RowMaximum(); tol = 0.0, check = true) -> CholeskyPivoted
```
Compute the pivoted Cholesky factorization of a dense symmetric positive semi-definite matrix `A` and return a [`CholeskyPivoted`](https://docs.julialang.org/#LinearAlgebra.CholeskyPivoted) factorization. The matrix `A` can either be a [`Symmetric`](https://docs.julialang.org/#LinearAlgebra.Symmetric) or [`Hermitian`](https://docs.julialang.org/#LinearAlgebra.Hermitian) [`AbstractMatrix`](https://docs.julialang.org/../../base/arrays/#Base.AbstractMatrix) or a *perfectly* symmetric or Hermitian `AbstractMatrix`.

The triangular Cholesky factor can be obtained from the factorization `F` via `F.L` and `F.U`, and the permutation via `F.p`, where `A[F.p, F.p] ≈ Ur' * Ur ≈ Lr * Lr'` with `Ur = F.U[1:F.rank, :]` and `Lr = F.L[:, 1:F.rank]`, or alternatively `A ≈ Up' * Up ≈ Lp * Lp'` with `Up = F.U[1:F.rank, invperm(F.p)]` and `Lp = F.L[invperm(F.p), 1:F.rank]`.

The following functions are available for `CholeskyPivoted` objects: [`size`](https://docs.julialang.org/../../base/arrays/#Base.size), [``](https://docs.julialang.org/../../base/math/#Base.:%5C%5C-Tuple%7BAny,%20Any%7D), [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det), and [`rank`](https://docs.julialang.org/#LinearAlgebra.rank).

The argument `tol` determines the tolerance for determining the rank. For negative values, the tolerance is the machine precision.

If you have a matrix `A` that is slightly non-Hermitian due to roundoff errors in its construction, wrap it in `Hermitian(A)` before passing it to `cholesky` in order to treat it as perfectly Hermitian.

When `check = true`, an error is thrown if the decomposition fails. When `check = false`, responsibility for checking the decomposition's validity (via [`issuccess`](https://docs.julialang.org/#LinearAlgebra.issuccess)) lies with the user.

**Examples**


```julia
julia> X = [1.0, 2.0, 3.0, 4.0];

julia> A = X * X';

julia> C = cholesky(A, RowMaximum(), check = false)
CholeskyPivoted{Float64, Matrix{Float64}, Vector{Int64}}
U factor with rank 1:
4×4 UpperTriangular{Float64, Matrix{Float64}}:
 4.0  2.0  3.0  1.0
  ⋅   0.0  6.0  2.0
  ⋅    ⋅   9.0  3.0
  ⋅    ⋅    ⋅   1.0
permutation:
4-element Vector{Int64}:
 4
 2
 3
 1

julia> C.U[1:C.rank, :]' * C.U[1:C.rank, :] ≈ A[C.p, C.p]
true

julia> l, u = C; # destructuring via iteration

julia> l == C.L && u == C.U
true
```

```julia
cholesky!(F::CHOLMOD.Factor, A::SparseMatrixCSC; shift = 0.0, check = true) -> CHOLMOD.Factor
```
Compute the Cholesky ($LL'$) factorization of `A`, reusing the symbolic factorization `F`. `A` must be a [`SparseMatrixCSC`](https://docs.julialang.org/../SparseArrays/#SparseArrays.SparseMatrixCSC) or a [`Symmetric`](https://docs.julialang.org/#LinearAlgebra.Symmetric)/ [`Hermitian`](https://docs.julialang.org/#LinearAlgebra.Hermitian) view of a `SparseMatrixCSC`. Note that even if `A` doesn't have the type tag, it must still be symmetric or Hermitian.

See also [`cholesky`](https://docs.julialang.org/#LinearAlgebra.cholesky).

This method uses the CHOLMOD library from SuiteSparse, which only supports doubles or complex doubles. Input matrices not of those element types will be converted to `SparseMatrixCSC{Float64}` or `SparseMatrixCSC{ComplexF64}` as appropriate.


```julia
cholesky!(A::AbstractMatrix, NoPivot(); check = true) -> Cholesky
```
The same as [`cholesky`](https://docs.julialang.org/#LinearAlgebra.cholesky), but saves space by overwriting the input `A`, instead of creating a copy. An [`InexactError`](https://docs.julialang.org/../../base/base/#Core.InexactError) exception is thrown if the factorization produces a number not representable by the element type of `A`, e.g. for integer types.

**Examples**


```julia
julia> A = [1 2; 2 50]
2×2 Matrix{Int64}:
 1   2
 2  50

julia> cholesky!(A)
ERROR: InexactError: Int64(6.782329983125268)
Stacktrace:
[...]
```

```julia
cholesky!(A::AbstractMatrix, RowMaximum(); tol = 0.0, check = true) -> CholeskyPivoted
```
The same as [`cholesky`](https://docs.julialang.org/#LinearAlgebra.cholesky), but saves space by overwriting the input `A`, instead of creating a copy. An [`InexactError`](https://docs.julialang.org/../../base/base/#Core.InexactError) exception is thrown if the factorization produces a number not representable by the element type of `A`, e.g. for integer types.


```julia
lowrankupdate(C::Cholesky, v::AbstractVector) -> CC::Cholesky
```
Update a Cholesky factorization `C` with the vector `v`. If `A = C.U'C.U` then `CC = cholesky(C.U'C.U + v*v')` but the computation of `CC` only uses `O(n^2)` operations.


```julia
lowrankdowndate(C::Cholesky, v::AbstractVector) -> CC::Cholesky
```
Downdate a Cholesky factorization `C` with the vector `v`. If `A = C.U'C.U` then `CC = cholesky(C.U'C.U - v*v')` but the computation of `CC` only uses `O(n^2)` operations.


```julia
lowrankupdate!(C::Cholesky, v::AbstractVector) -> CC::Cholesky
```
Update a Cholesky factorization `C` with the vector `v`. If `A = C.U'C.U` then `CC = cholesky(C.U'C.U + v*v')` but the computation of `CC` only uses `O(n^2)` operations. The input factorization `C` is updated in place such that on exit `C == CC`. The vector `v` is destroyed during the computation.


```julia
lowrankdowndate!(C::Cholesky, v::AbstractVector) -> CC::Cholesky
```
Downdate a Cholesky factorization `C` with the vector `v`. If `A = C.U'C.U` then `CC = cholesky(C.U'C.U - v*v')` but the computation of `CC` only uses `O(n^2)` operations. The input factorization `C` is updated in place such that on exit `C == CC`. The vector `v` is destroyed during the computation.


```julia
LDLt <: Factorization
```
Matrix factorization type of the `LDLt` factorization of a real [`SymTridiagonal`](https://docs.julialang.org/#LinearAlgebra.SymTridiagonal) matrix `S` such that `S = L*Diagonal(d)*L'`, where `L` is a [`UnitLowerTriangular`](https://docs.julialang.org/#LinearAlgebra.UnitLowerTriangular) matrix and `d` is a vector. The main use of an `LDLt` factorization `F = ldlt(S)` is to solve the linear system of equations `Sx = b` with `Fb`. This is the return type of [`ldlt`](https://docs.julialang.org/#LinearAlgebra.ldlt), the corresponding matrix factorization function.

The individual components of the factorization `F::LDLt` can be accessed via `getproperty`:



| Component | Description |
| --- | --- |
| `F.L` | `L` (unit lower triangular) part of `LDLt` |
| `F.D` | `D` (diagonal) part of `LDLt` |
| `F.Lt` | `Lt` (unit upper triangular) part of `LDLt` |
| `F.d` | diagonal values of `D` as a `Vector` |

**Examples**


```julia
julia> S = SymTridiagonal([3., 4., 5.], [1., 2.])
3×3 SymTridiagonal{Float64, Vector{Float64}}:
 3.0  1.0   ⋅
 1.0  4.0  2.0
  ⋅   2.0  5.0

julia> F = ldlt(S)
LDLt{Float64, SymTridiagonal{Float64, Vector{Float64}}}
L factor:
3×3 UnitLowerTriangular{Float64, SymTridiagonal{Float64, Vector{Float64}}}:
 1.0        ⋅         ⋅
 0.333333  1.0        ⋅
 0.0       0.545455  1.0
D factor:
3×3 Diagonal{Float64, Vector{Float64}}:
 3.0   ⋅        ⋅
  ⋅   3.66667   ⋅
  ⋅    ⋅       3.90909
```

```julia
ldlt(A::SparseMatrixCSC; shift = 0.0, check = true, perm=nothing) -> CHOLMOD.Factor
```
Compute the $LDL'$ factorization of a sparse matrix `A`. `A` must be a [`SparseMatrixCSC`](https://docs.julialang.org/../SparseArrays/#SparseArrays.SparseMatrixCSC) or a [`Symmetric`](https://docs.julialang.org/#LinearAlgebra.Symmetric)/[`Hermitian`](https://docs.julialang.org/#LinearAlgebra.Hermitian) view of a `SparseMatrixCSC`. Note that even if `A` doesn't have the type tag, it must still be symmetric or Hermitian. A fill-reducing permutation is used. `F = ldlt(A)` is most frequently used to solve systems of equations `A*x = b` with `Fb`. The returned factorization object `F` also supports the methods [`diag`](https://docs.julialang.org/#LinearAlgebra.diag), [`det`](https://docs.julialang.org/#LinearAlgebra.det), [`logdet`](https://docs.julialang.org/#LinearAlgebra.logdet), and [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D). You can extract individual factors from `F` using `F.L`. However, since pivoting is on by default, the factorization is internally represented as `A == P'*L*D*L'*P` with a permutation matrix `P`; using just `L` without accounting for `P` will give incorrect answers. To include the effects of permutation, it is typically preferable to extract "combined" factors like `PtL = F.PtL` (the equivalent of `P'*L`) and `LtP = F.UP` (the equivalent of `L'*P`). The complete list of supported factors is `:L, :PtL, :D, :UP, :U, :LD, :DU, :PtLD, :DUP`.

When `check = true`, an error is thrown if the decomposition fails. When `check = false`, responsibility for checking the decomposition's validity (via [`issuccess`](https://docs.julialang.org/#LinearAlgebra.issuccess)) lies with the user.

Setting the optional `shift` keyword argument computes the factorization of `A+shift*I` instead of `A`. If the `perm` argument is provided, it should be a permutation of `1:size(A,1)` giving the ordering to use (instead of CHOLMOD's default AMD ordering).

This method uses the CHOLMOD library from SuiteSparse, which only supports doubles or complex doubles. Input matrices not of those element types will be converted to `SparseMatrixCSC{Float64}` or `SparseMatrixCSC{ComplexF64}` as appropriate.

Many other functions from CHOLMOD are wrapped but not exported from the `Base.SparseArrays.CHOLMOD` module.


```julia
ldlt(S::SymTridiagonal) -> LDLt
```
Compute an `LDLt` (i.e., $LDL^T$) factorization of the real symmetric tridiagonal matrix `S` such that `S = L*Diagonal(d)*L'` where `L` is a unit lower triangular matrix and `d` is a vector. The main use of an `LDLt` factorization `F = ldlt(S)` is to solve the linear system of equations `Sx = b` with `Fb`.

See also [`bunchkaufman`](https://docs.julialang.org/#LinearAlgebra.bunchkaufman) for a similar, but pivoted, factorization of arbitrary symmetric or Hermitian matrices.

**Examples**


```julia
julia> S = SymTridiagonal([3., 4., 5.], [1., 2.])
3×3 SymTridiagonal{Float64, Vector{Float64}}:
 3.0  1.0   ⋅
 1.0  4.0  2.0
  ⋅   2.0  5.0

julia> ldltS = ldlt(S);

julia> b = [6., 7., 8.];

julia> ldltS  b
3-element Vector{Float64}:
 1.7906976744186047
 0.627906976744186
 1.3488372093023255

julia> S  b
3-element Vector{Float64}:
 1.7906976744186047
 0.627906976744186
 1.3488372093023255
```

```julia
ldlt!(F::CHOLMOD.Factor, A::SparseMatrixCSC; shift = 0.0, check = true) -> CHOLMOD.Factor
```
Compute the $LDL'$ factorization of `A`, reusing the symbolic factorization `F`. `A` must be a [`SparseMatrixCSC`](https://docs.julialang.org/../SparseArrays/#SparseArrays.SparseMatrixCSC) or a [`Symmetric`](https://docs.julialang.org/#LinearAlgebra.Symmetric)/[`Hermitian`](https://docs.julialang.org/#LinearAlgebra.Hermitian) view of a `SparseMatrixCSC`. Note that even if `A` doesn't have the type tag, it must still be symmetric or Hermitian.

See also [`ldlt`](https://docs.julialang.org/#LinearAlgebra.ldlt).

This method uses the CHOLMOD library from SuiteSparse, which only supports doubles or complex doubles. Input matrices not of those element types will be converted to `SparseMatrixCSC{Float64}` or `SparseMatrixCSC{ComplexF64}` as appropriate.


```julia
ldlt!(S::SymTridiagonal) -> LDLt
```
Same as [`ldlt`](https://docs.julialang.org/#LinearAlgebra.ldlt), but saves space by overwriting the input `S`, instead of creating a copy.

**Examples**


```julia
julia> S = SymTridiagonal([3., 4., 5.], [1., 2.])
3×3 SymTridiagonal{Float64, Vector{Float64}}:
 3.0  1.0   ⋅
 1.0  4.0  2.0
  ⋅   2.0  5.0

julia> ldltS = ldlt!(S);

julia> ldltS === S
false

julia> S
3×3 SymTridiagonal{Float64, Vector{Float64}}:
 3.0       0.333333   ⋅
 0.333333  3.66667   0.545455
  ⋅        0.545455  3.90909
```

```julia
QR <: Factorization
```
A QR matrix factorization stored in a packed format, typically obtained from [`qr`](https://docs.julialang.org/#LinearAlgebra.qr). If $A$ is an `m`×`n` matrix, then

[A = Q R]

where $Q$ is an orthogonal/unitary matrix and $R$ is upper triangular. The matrix $Q$ is stored as a sequence of Householder reflectors $v_i$ and coefficients $tau_i$ where:

[Q = prod_{i=1}^{min(m,n)} (I - tau_i v_i v_i^T).]

Iterating the decomposition produces the components `Q` and `R`.

The object has two fields:


```julia
QRCompactWY <: Factorization
```
A QR matrix factorization stored in a compact blocked format, typically obtained from [`qr`](https://docs.julialang.org/#LinearAlgebra.qr). If $A$ is an `m`×`n` matrix, then

[A = Q R]

where $Q$ is an orthogonal/unitary matrix and $R$ is upper triangular. It is similar to the [`QR`](https://docs.julialang.org/#LinearAlgebra.QR) format except that the orthogonal/unitary matrix $Q$ is stored in *Compact WY* format . For the block size $n_b$, it is stored as a `m`×`n` lower trapezoidal matrix $V$ and a matrix $T = (T_1 ; T_2 ; ... ; T_{b-1} ; T_b')$ composed of $b = lceil min(m,n) / n_b rceil$ upper triangular matrices $T_j$ of size $n_b$×$n_b$ ($j = 1, ..., b-1$) and an upper trapezoidal $n_b$×$min(m,n) - (b-1) n_b$ matrix $T_b'$ ($j=b$) whose upper square part denoted with $T_b$ satisfying

[Q = prod_{i=1}^{min(m,n)} (I - tau_i v_i v_i^T)
= prod_{j=1}^{b} (I - V_j T_j V_j^T)]

such that $v_i$ is the $i$th column of $V$, $tau_i$ is the $i$th element of `[diag(T_1); diag(T_2); …; diag(T_b)]`, and $(V_1 ; V_2 ; ... ; V_b)$ is the left `m`×`min(m, n)` block of $V$. When constructed using [`qr`](https://docs.julialang.org/#LinearAlgebra.qr), the block size is given by $n_b = min(m, n, 36)$.

Iterating the decomposition produces the components `Q` and `R`.

The object has two fields:

* `factors`, as in the [`QR`](https://docs.julialang.org/#LinearAlgebra.QR) type, is an `m`×`n` matrix.


	+ The upper triangular part contains the elements of $R$, that is `R = triu(F.factors)` for a `QR` object `F`.
	+ The subdiagonal part contains the reflectors $v_i$ stored in a packed format such that `V = I + tril(F.factors, -1)`.
* `T` is a $n_b$-by-$min(m,n)$ matrix as described above. The subdiagonal elements for each triangular matrix $T_j$ are ignored.

This format should not to be confused with the older *WY* representation .


```julia
QRPivoted <: Factorization
```
A QR matrix factorization with column pivoting in a packed format, typically obtained from [`qr`](https://docs.julialang.org/#LinearAlgebra.qr). If $A$ is an `m`×`n` matrix, then

[A P = Q R]

where $P$ is a permutation matrix, $Q$ is an orthogonal/unitary matrix and $R$ is upper triangular. The matrix $Q$ is stored as a sequence of Householder reflectors:

[Q = prod_{i=1}^{min(m,n)} (I - tau_i v_i v_i^T).]

Iterating the decomposition produces the components `Q`, `R`, and `p`.

The object has three fields:

* `factors` is an `m`×`n` matrix.


	+ The upper triangular part contains the elements of $R$, that is `R = triu(F.factors)` for a `QR` object `F`.
	+ The subdiagonal part contains the reflectors $v_i$ stored in a packed format where $v_i$ is the $i$th column of the matrix `V = I + tril(F.factors, -1)`.
* `τ` is a vector of length `min(m,n)` containing the coefficients $au_i$.
* `jpvt` is an integer vector of length `n` corresponding to the permutation $P$.

```julia
qr(A::SparseMatrixCSC; tol=_default_tol(A), ordering=ORDERING_DEFAULT) -> QRSparse
```
Compute the `QR` factorization of a sparse matrix `A`. Fill-reducing row and column permutations are used such that `F.R = F.Q'*A[F.prow,F.pcol]`. The main application of this type is to solve least squares or underdetermined problems with [``](https://docs.julialang.org/../../base/math/#Base.:%5C%5C-Tuple%7BAny,%20Any%7D). The function calls the C library SPQR.

`qr(A::SparseMatrixCSC)` uses the SPQR library that is part of SuiteSparse. As this library only supports sparse matrices with [`Float64`](https://docs.julialang.org/../../base/numbers/#Core.Float64) or `ComplexF64` elements, as of Julia v1.4 `qr` converts `A` into a copy that is of type `SparseMatrixCSC{Float64}` or `SparseMatrixCSC{ComplexF64}` as appropriate.

**Examples**


```julia
julia> A = sparse([1,2,3,4], [1,1,2,2], [1.0,1.0,1.0,1.0])
4×2 SparseMatrixCSC{Float64, Int64} with 4 stored entries:
 1.0   ⋅
 1.0   ⋅
  ⋅   1.0
  ⋅   1.0

julia> qr(A)
SuiteSparse.SPQR.QRSparse{Float64, Int64}
Q factor:
4×4 SuiteSparse.SPQR.QRSparseQ{Float64, Int64}:
 -0.707107   0.0        0.0       -0.707107
  0.0       -0.707107  -0.707107   0.0
  0.0       -0.707107   0.707107   0.0
 -0.707107   0.0        0.0        0.707107
R factor:
2×2 SparseMatrixCSC{Float64, Int64} with 2 stored entries:
 -1.41421    ⋅
   ⋅       -1.41421
Row permutation:
4-element Vector{Int64}:
 1
 3
 4
 2
Column permutation:
2-element Vector{Int64}:
 1
 2
```

```julia
qr(A, pivot = NoPivot(); blocksize) -> F
```
Compute the QR factorization of the matrix `A`: an orthogonal (or unitary if `A` is complex-valued) matrix `Q`, and an upper triangular matrix `R` such that

[A = Q R]

The returned object `F` stores the factorization in a packed format:

* if `pivot == ColumnNorm()` then `F` is a [`QRPivoted`](https://docs.julialang.org/#LinearAlgebra.QRPivoted) object,
* otherwise if the element type of `A` is a BLAS type ([`Float32`](https://docs.julialang.org/../../base/numbers/#Core.Float32), [`Float64`](https://docs.julialang.org/../../base/numbers/#Core.Float64), `ComplexF32` or `ComplexF64`), then `F` is a [`QRCompactWY`](https://docs.julialang.org/#LinearAlgebra.QRCompactWY) object,
* otherwise `F` is a [`QR`](https://docs.julialang.org/#LinearAlgebra.QR) object.

The individual components of the decomposition `F` can be retrieved via property accessors:

* `F.Q`: the orthogonal/unitary matrix `Q`
* `F.R`: the upper triangular matrix `R`
* `F.p`: the permutation vector of the pivot ([`QRPivoted`](https://docs.julialang.org/#LinearAlgebra.QRPivoted) only)
* `F.P`: the permutation matrix of the pivot ([`QRPivoted`](https://docs.julialang.org/#LinearAlgebra.QRPivoted) only)

Iterating the decomposition produces the components `Q`, `R`, and if extant `p`.

The following functions are available for the `QR` objects: [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`size`](https://docs.julialang.org/../../base/arrays/#Base.size), and [``](https://docs.julialang.org/../../base/math/#Base.:%5C%5C-Tuple%7BAny,%20Any%7D). When `A` is rectangular, `` will return a least squares solution and if the solution is not unique, the one with smallest norm is returned. When `A` is not full rank, factorization with (column) pivoting is required to obtain a minimum norm solution.

Multiplication with respect to either full/square or non-full/square `Q` is allowed, i.e. both `F.Q*F.R` and `F.Q*A` are supported. A `Q` matrix can be converted into a regular matrix with [`Matrix`](https://docs.julialang.org/../../base/arrays/#Base.Matrix). This operation returns the "thin" Q factor, i.e., if `A` is `m`×`n` with `m>=n`, then `Matrix(F.Q)` yields an `m`×`n` matrix with orthonormal columns. To retrieve the "full" Q factor, an `m`×`m` orthogonal matrix, use `F.Q*I`. If `m<=n`, then `Matrix(F.Q)` yields an `m`×`m` orthogonal matrix.

The block size for QR decomposition can be specified by keyword argument `blocksize :: Integer` when `pivot == NoPivot()` and `A isa StridedMatrix{<:BlasFloat}`. It is ignored when `blocksize > minimum(size(A))`. See [`QRCompactWY`](https://docs.julialang.org/#LinearAlgebra.QRCompactWY).

The `blocksize` keyword argument requires Julia 1.4 or later.

**Examples**


```julia
julia> A = [3.0 -6.0; 4.0 -8.0; 0.0 1.0]
3×2 Matrix{Float64}:
 3.0  -6.0
 4.0  -8.0
 0.0   1.0

julia> F = qr(A)
LinearAlgebra.QRCompactWY{Float64, Matrix{Float64}, Matrix{Float64}}
Q factor:
3×3 LinearAlgebra.QRCompactWYQ{Float64, Matrix{Float64}, Matrix{Float64}}:
 -0.6   0.0   0.8
 -0.8   0.0  -0.6
  0.0  -1.0   0.0
R factor:
2×2 Matrix{Float64}:
 -5.0  10.0
  0.0  -1.0

julia> F.Q * F.R == A
true
```
`qr` returns multiple types because LAPACK uses several representations that minimize the memory storage requirements of products of Householder elementary reflectors, so that the `Q` and `R` matrices can be stored compactly rather as two separate dense matrices.


```julia
qr!(A, pivot = NoPivot(); blocksize)
```
`qr!` is the same as [`qr`](https://docs.julialang.org/#LinearAlgebra.qr) when `A` is a subtype of [`StridedMatrix`](https://docs.julialang.org/../../base/arrays/#Base.StridedMatrix), but saves space by overwriting the input `A`, instead of creating a copy. An [`InexactError`](https://docs.julialang.org/../../base/base/#Core.InexactError) exception is thrown if the factorization produces a number not representable by the element type of `A`, e.g. for integer types.

The `blocksize` keyword argument requires Julia 1.4 or later.

**Examples**


```julia
julia> a = [1. 2.; 3. 4.]
2×2 Matrix{Float64}:
 1.0  2.0
 3.0  4.0

julia> qr!(a)
LinearAlgebra.QRCompactWY{Float64, Matrix{Float64}, Matrix{Float64}}
Q factor:
2×2 LinearAlgebra.QRCompactWYQ{Float64, Matrix{Float64}, Matrix{Float64}}:
 -0.316228  -0.948683
 -0.948683   0.316228
R factor:
2×2 Matrix{Float64}:
 -3.16228  -4.42719
  0.0      -0.632456

julia> a = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> qr!(a)
ERROR: InexactError: Int64(3.1622776601683795)
Stacktrace:
[...]
```

```julia
LQ <: Factorization
```
Matrix factorization type of the `LQ` factorization of a matrix `A`. The `LQ` decomposition is the [`QR`](https://docs.julialang.org/#LinearAlgebra.QR) decomposition of `transpose(A)`. This is the return type of [`lq`](https://docs.julialang.org/#LinearAlgebra.lq), the corresponding matrix factorization function.

If `S::LQ` is the factorization object, the lower triangular component can be obtained via `S.L`, and the orthogonal/unitary component via `S.Q`, such that `A ≈ S.L*S.Q`.

Iterating the decomposition produces the components `S.L` and `S.Q`.

**Examples**


```julia
julia> A = [5. 7.; -2. -4.]
2×2 Matrix{Float64}:
  5.0   7.0
 -2.0  -4.0

julia> S = lq(A)
LQ{Float64, Matrix{Float64}, Vector{Float64}}
L factor:
2×2 Matrix{Float64}:
 -8.60233   0.0
  4.41741  -0.697486
Q factor:
2×2 LinearAlgebra.LQPackedQ{Float64, Matrix{Float64}, Vector{Float64}}:
 -0.581238  -0.813733
 -0.813733   0.581238

julia> S.L * S.Q
2×2 Matrix{Float64}:
  5.0   7.0
 -2.0  -4.0

julia> l, q = S; # destructuring via iteration

julia> l == S.L &&  q == S.Q
true
```

```julia
lq(A) -> S::LQ
```
Compute the LQ decomposition of `A`. The decomposition's lower triangular component can be obtained from the [`LQ`](https://docs.julialang.org/#LinearAlgebra.LQ) object `S` via `S.L`, and the orthogonal/unitary component via `S.Q`, such that `A ≈ S.L*S.Q`.

Iterating the decomposition produces the components `S.L` and `S.Q`.

The LQ decomposition is the QR decomposition of `transpose(A)`, and it is useful in order to compute the minimum-norm solution `lq(A)  b` to an underdetermined system of equations (`A` has more columns than rows, but has full row rank).

**Examples**


```julia
julia> A = [5. 7.; -2. -4.]
2×2 Matrix{Float64}:
  5.0   7.0
 -2.0  -4.0

julia> S = lq(A)
LQ{Float64, Matrix{Float64}, Vector{Float64}}
L factor:
2×2 Matrix{Float64}:
 -8.60233   0.0
  4.41741  -0.697486
Q factor:
2×2 LinearAlgebra.LQPackedQ{Float64, Matrix{Float64}, Vector{Float64}}:
 -0.581238  -0.813733
 -0.813733   0.581238

julia> S.L * S.Q
2×2 Matrix{Float64}:
  5.0   7.0
 -2.0  -4.0

julia> l, q = S; # destructuring via iteration

julia> l == S.L &&  q == S.Q
true
```

```julia
lq!(A) -> LQ
```
Compute the [`LQ`](https://docs.julialang.org/#LinearAlgebra.LQ) factorization of `A`, using the input matrix as a workspace. See also [`lq`](https://docs.julialang.org/#LinearAlgebra.lq).


```julia
BunchKaufman <: Factorization
```
Matrix factorization type of the Bunch-Kaufman factorization of a symmetric or Hermitian matrix `A` as `P'UDU'P` or `P'LDL'P`, depending on whether the upper (the default) or the lower triangle is stored in `A`. If `A` is complex symmetric then `U'` and `L'` denote the unconjugated transposes, i.e. `transpose(U)` and `transpose(L)`, respectively. This is the return type of [`bunchkaufman`](https://docs.julialang.org/#LinearAlgebra.bunchkaufman), the corresponding matrix factorization function.

If `S::BunchKaufman` is the factorization object, the components can be obtained via `S.D`, `S.U` or `S.L` as appropriate given `S.uplo`, and `S.p`.

Iterating the decomposition produces the components `S.D`, `S.U` or `S.L` as appropriate given `S.uplo`, and `S.p`.

**Examples**


```julia
julia> A = [1 2; 2 3]
2×2 Matrix{Int64}:
 1  2
 2  3

julia> S = bunchkaufman(A) # A gets wrapped internally by Symmetric(A)
BunchKaufman{Float64, Matrix{Float64}, Vector{Int64}}
D factor:
2×2 Tridiagonal{Float64, Vector{Float64}}:
 -0.333333  0.0
  0.0       3.0
U factor:
2×2 UnitUpperTriangular{Float64, Matrix{Float64}}:
 1.0  0.666667
  ⋅   1.0
permutation:
2-element Vector{Int64}:
 1
 2

julia> d, u, p = S; # destructuring via iteration

julia> d == S.D && u == S.U && p == S.p
true

julia> S = bunchkaufman(Symmetric(A, :L))
BunchKaufman{Float64, Matrix{Float64}, Vector{Int64}}
D factor:
2×2 Tridiagonal{Float64, Vector{Float64}}:
 3.0   0.0
 0.0  -0.333333
L factor:
2×2 UnitLowerTriangular{Float64, Matrix{Float64}}:
 1.0        ⋅
 0.666667  1.0
permutation:
2-element Vector{Int64}:
 2
 1
```

```julia
bunchkaufman(A, rook::Bool=false; check = true) -> S::BunchKaufman
```
Compute the Bunch-Kaufman factorization of a symmetric or Hermitian matrix `A` as `P'*U*D*U'*P` or `P'*L*D*L'*P`, depending on which triangle is stored in `A`, and return a [`BunchKaufman`](https://docs.julialang.org/#LinearAlgebra.BunchKaufman) object. Note that if `A` is complex symmetric then `U'` and `L'` denote the unconjugated transposes, i.e. `transpose(U)` and `transpose(L)`.

Iterating the decomposition produces the components `S.D`, `S.U` or `S.L` as appropriate given `S.uplo`, and `S.p`.

If `rook` is `true`, rook pivoting is used. If `rook` is false, rook pivoting is not used.

When `check = true`, an error is thrown if the decomposition fails. When `check = false`, responsibility for checking the decomposition's validity (via [`issuccess`](https://docs.julialang.org/#LinearAlgebra.issuccess)) lies with the user.

The following functions are available for `BunchKaufman` objects: [`size`](https://docs.julialang.org/../../base/arrays/#Base.size), ``, [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`issymmetric`](https://docs.julialang.org/#LinearAlgebra.issymmetric), [`ishermitian`](https://docs.julialang.org/#LinearAlgebra.ishermitian), [`getindex`](https://docs.julialang.org/../../base/collections/#Base.getindex).

**Examples**


```julia
julia> A = [1 2; 2 3]
2×2 Matrix{Int64}:
 1  2
 2  3

julia> S = bunchkaufman(A) # A gets wrapped internally by Symmetric(A)
BunchKaufman{Float64, Matrix{Float64}, Vector{Int64}}
D factor:
2×2 Tridiagonal{Float64, Vector{Float64}}:
 -0.333333  0.0
  0.0       3.0
U factor:
2×2 UnitUpperTriangular{Float64, Matrix{Float64}}:
 1.0  0.666667
  ⋅   1.0
permutation:
2-element Vector{Int64}:
 1
 2

julia> d, u, p = S; # destructuring via iteration

julia> d == S.D && u == S.U && p == S.p
true

julia> S.U*S.D*S.U' - S.P*A*S.P'
2×2 Matrix{Float64}:
 0.0  0.0
 0.0  0.0

julia> S = bunchkaufman(Symmetric(A, :L))
BunchKaufman{Float64, Matrix{Float64}, Vector{Int64}}
D factor:
2×2 Tridiagonal{Float64, Vector{Float64}}:
 3.0   0.0
 0.0  -0.333333
L factor:
2×2 UnitLowerTriangular{Float64, Matrix{Float64}}:
 1.0        ⋅
 0.666667  1.0
permutation:
2-element Vector{Int64}:
 2
 1

julia> S.L*S.D*S.L' - A[S.p, S.p]
2×2 Matrix{Float64}:
 0.0  0.0
 0.0  0.0
```

```julia
bunchkaufman!(A, rook::Bool=false; check = true) -> BunchKaufman
```
`bunchkaufman!` is the same as [`bunchkaufman`](https://docs.julialang.org/#LinearAlgebra.bunchkaufman), but saves space by overwriting the input `A`, instead of creating a copy.


```julia
Eigen <: Factorization
```
Matrix factorization type of the eigenvalue/spectral decomposition of a square matrix `A`. This is the return type of [`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen), the corresponding matrix factorization function.

If `F::Eigen` is the factorization object, the eigenvalues can be obtained via `F.values` and the eigenvectors as the columns of the matrix `F.vectors`. (The `k`th eigenvector can be obtained from the slice `F.vectors[:, k]`.)

Iterating the decomposition produces the components `F.values` and `F.vectors`.

**Examples**


```julia
julia> F = eigen([1.0 0.0 0.0; 0.0 3.0 0.0; 0.0 0.0 18.0])
Eigen{Float64, Float64, Matrix{Float64}, Vector{Float64}}
values:
3-element Vector{Float64}:
  1.0
  3.0
 18.0
vectors:
3×3 Matrix{Float64}:
 1.0  0.0  0.0
 0.0  1.0  0.0
 0.0  0.0  1.0

julia> F.values
3-element Vector{Float64}:
  1.0
  3.0
 18.0

julia> F.vectors
3×3 Matrix{Float64}:
 1.0  0.0  0.0
 0.0  1.0  0.0
 0.0  0.0  1.0

julia> vals, vecs = F; # destructuring via iteration

julia> vals == F.values && vecs == F.vectors
true
```

```julia
GeneralizedEigen <: Factorization
```
Matrix factorization type of the generalized eigenvalue/spectral decomposition of `A` and `B`. This is the return type of [`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen), the corresponding matrix factorization function, when called with two matrix arguments.

If `F::GeneralizedEigen` is the factorization object, the eigenvalues can be obtained via `F.values` and the eigenvectors as the columns of the matrix `F.vectors`. (The `k`th eigenvector can be obtained from the slice `F.vectors[:, k]`.)

Iterating the decomposition produces the components `F.values` and `F.vectors`.

**Examples**


```julia
julia> A = [1 0; 0 -1]
2×2 Matrix{Int64}:
 1   0
 0  -1

julia> B = [0 1; 1 0]
2×2 Matrix{Int64}:
 0  1
 1  0

julia> F = eigen(A, B)
GeneralizedEigen{ComplexF64, ComplexF64, Matrix{ComplexF64}, Vector{ComplexF64}}
values:
2-element Vector{ComplexF64}:
 0.0 - 1.0im
 0.0 + 1.0im
vectors:
2×2 Matrix{ComplexF64}:
  0.0+1.0im   0.0-1.0im
 -1.0+0.0im  -1.0-0.0im

julia> F.values
2-element Vector{ComplexF64}:
 0.0 - 1.0im
 0.0 + 1.0im

julia> F.vectors
2×2 Matrix{ComplexF64}:
  0.0+1.0im   0.0-1.0im
 -1.0+0.0im  -1.0-0.0im

julia> vals, vecs = F; # destructuring via iteration

julia> vals == F.values && vecs == F.vectors
true
```

```julia
eigvals(A; permute::Bool=true, scale::Bool=true, sortby) -> values
```
Return the eigenvalues of `A`.

For general non-symmetric matrices it is possible to specify how the matrix is balanced before the eigenvalue calculation. The `permute`, `scale`, and `sortby` keywords are the same as for [`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen).

**Examples**


```julia
julia> diag_matrix = [1 0; 0 4]
2×2 Matrix{Int64}:
 1  0
 0  4

julia> eigvals(diag_matrix)
2-element Vector{Float64}:
 1.0
 4.0
```
For a scalar input, `eigvals` will return a scalar.

**Example**


```julia
julia> eigvals(-2)
-2
```

```julia
eigvals(A, B) -> values
```
Compute the generalized eigenvalues of `A` and `B`.

**Examples**


```julia
julia> A = [1 0; 0 -1]
2×2 Matrix{Int64}:
 1   0
 0  -1

julia> B = [0 1; 1 0]
2×2 Matrix{Int64}:
 0  1
 1  0

julia> eigvals(A,B)
2-element Vector{ComplexF64}:
 0.0 - 1.0im
 0.0 + 1.0im
```

```julia
eigvals(A::Union{SymTridiagonal, Hermitian, Symmetric}, irange::UnitRange) -> values
```
Return the eigenvalues of `A`. It is possible to calculate only a subset of the eigenvalues by specifying a [`UnitRange`](https://docs.julialang.org/../../base/collections/#Base.UnitRange) `irange` covering indices of the sorted eigenvalues, e.g. the 2nd to 8th eigenvalues.

**Examples**


```julia
julia> A = SymTridiagonal([1.; 2.; 1.], [2.; 3.])
3×3 SymTridiagonal{Float64, Vector{Float64}}:
 1.0  2.0   ⋅
 2.0  2.0  3.0
  ⋅   3.0  1.0

julia> eigvals(A, 2:2)
1-element Vector{Float64}:
 0.9999999999999996

julia> eigvals(A)
3-element Vector{Float64}:
 -2.1400549446402604
  1.0000000000000002
  5.140054944640259
```

```julia
eigvals(A::Union{SymTridiagonal, Hermitian, Symmetric}, vl::Real, vu::Real) -> values
```
Return the eigenvalues of `A`. It is possible to calculate only a subset of the eigenvalues by specifying a pair `vl` and `vu` for the lower and upper boundaries of the eigenvalues.

**Examples**


```julia
julia> A = SymTridiagonal([1.; 2.; 1.], [2.; 3.])
3×3 SymTridiagonal{Float64, Vector{Float64}}:
 1.0  2.0   ⋅
 2.0  2.0  3.0
  ⋅   3.0  1.0

julia> eigvals(A, -1, 2)
1-element Vector{Float64}:
 1.0000000000000009

julia> eigvals(A)
3-element Vector{Float64}:
 -2.1400549446402604
  1.0000000000000002
  5.140054944640259
```

```julia
eigvals!(A; permute::Bool=true, scale::Bool=true, sortby) -> values
```
Same as [`eigvals`](https://docs.julialang.org/#LinearAlgebra.eigvals), but saves space by overwriting the input `A`, instead of creating a copy. The `permute`, `scale`, and `sortby` keywords are the same as for [`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen).

The input matrix `A` will not contain its eigenvalues after `eigvals!` is called on it - `A` is used as a workspace.

**Examples**


```julia
julia> A = [1. 2.; 3. 4.]
2×2 Matrix{Float64}:
 1.0  2.0
 3.0  4.0

julia> eigvals!(A)
2-element Vector{Float64}:
 -0.3722813232690143
  5.372281323269014

julia> A
2×2 Matrix{Float64}:
 -0.372281  -1.0
  0.0        5.37228
```

```julia
eigvals!(A, B; sortby) -> values
```
Same as [`eigvals`](https://docs.julialang.org/#LinearAlgebra.eigvals), but saves space by overwriting the input `A` (and `B`), instead of creating copies.

The input matrices `A` and `B` will not contain their eigenvalues after `eigvals!` is called. They are used as workspaces.

**Examples**


```julia
julia> A = [1. 0.; 0. -1.]
2×2 Matrix{Float64}:
 1.0   0.0
 0.0  -1.0

julia> B = [0. 1.; 1. 0.]
2×2 Matrix{Float64}:
 0.0  1.0
 1.0  0.0

julia> eigvals!(A, B)
2-element Vector{ComplexF64}:
 0.0 - 1.0im
 0.0 + 1.0im

julia> A
2×2 Matrix{Float64}:
 -0.0  -1.0
  1.0  -0.0

julia> B
2×2 Matrix{Float64}:
 1.0  0.0
 0.0  1.0
```

```julia
eigvals!(A::Union{SymTridiagonal, Hermitian, Symmetric}, irange::UnitRange) -> values
```
Same as [`eigvals`](https://docs.julialang.org/#LinearAlgebra.eigvals), but saves space by overwriting the input `A`, instead of creating a copy. `irange` is a range of eigenvalue *indices* to search for - for instance, the 2nd to 8th eigenvalues.


```julia
eigvals!(A::Union{SymTridiagonal, Hermitian, Symmetric}, vl::Real, vu::Real) -> values
```
Same as [`eigvals`](https://docs.julialang.org/#LinearAlgebra.eigvals), but saves space by overwriting the input `A`, instead of creating a copy. `vl` is the lower bound of the interval to search for eigenvalues, and `vu` is the upper bound.


```julia
eigmax(A; permute::Bool=true, scale::Bool=true)
```
Return the largest eigenvalue of `A`. The option `permute=true` permutes the matrix to become closer to upper triangular, and `scale=true` scales the matrix by its diagonal elements to make rows and columns more equal in norm. Note that if the eigenvalues of `A` are complex, this method will fail, since complex numbers cannot be sorted.

**Examples**


```julia
julia> A = [0 im; -im 0]
2×2 Matrix{Complex{Int64}}:
 0+0im  0+1im
 0-1im  0+0im

julia> eigmax(A)
1.0

julia> A = [0 im; -1 0]
2×2 Matrix{Complex{Int64}}:
  0+0im  0+1im
 -1+0im  0+0im

julia> eigmax(A)
ERROR: DomainError with Complex{Int64}[0+0im 0+1im; -1+0im 0+0im]:
`A` cannot have complex eigenvalues.
Stacktrace:
[...]
```

```julia
eigmin(A; permute::Bool=true, scale::Bool=true)
```
Return the smallest eigenvalue of `A`. The option `permute=true` permutes the matrix to become closer to upper triangular, and `scale=true` scales the matrix by its diagonal elements to make rows and columns more equal in norm. Note that if the eigenvalues of `A` are complex, this method will fail, since complex numbers cannot be sorted.

**Examples**


```julia
julia> A = [0 im; -im 0]
2×2 Matrix{Complex{Int64}}:
 0+0im  0+1im
 0-1im  0+0im

julia> eigmin(A)
-1.0

julia> A = [0 im; -1 0]
2×2 Matrix{Complex{Int64}}:
  0+0im  0+1im
 -1+0im  0+0im

julia> eigmin(A)
ERROR: DomainError with Complex{Int64}[0+0im 0+1im; -1+0im 0+0im]:
`A` cannot have complex eigenvalues.
Stacktrace:
[...]
```

```julia
eigvecs(A::SymTridiagonal[, eigvals]) -> Matrix
```
Return a matrix `M` whose columns are the eigenvectors of `A`. (The `k`th eigenvector can be obtained from the slice `M[:, k]`.)

If the optional vector of eigenvalues `eigvals` is specified, `eigvecs` returns the specific corresponding eigenvectors.

**Examples**


```julia
julia> A = SymTridiagonal([1.; 2.; 1.], [2.; 3.])
3×3 SymTridiagonal{Float64, Vector{Float64}}:
 1.0  2.0   ⋅
 2.0  2.0  3.0
  ⋅   3.0  1.0

julia> eigvals(A)
3-element Vector{Float64}:
 -2.1400549446402604
  1.0000000000000002
  5.140054944640259

julia> eigvecs(A)
3×3 Matrix{Float64}:
  0.418304  -0.83205      0.364299
 -0.656749  -7.39009e-16  0.754109
  0.627457   0.5547       0.546448

julia> eigvecs(A, [1.])
3×1 Matrix{Float64}:
  0.8320502943378438
  4.263514128092366e-17
 -0.5547001962252291
```

```julia
eigvecs(A; permute::Bool=true, scale::Bool=true, `sortby`) -> Matrix
```
Return a matrix `M` whose columns are the eigenvectors of `A`. (The `k`th eigenvector can be obtained from the slice `M[:, k]`.) The `permute`, `scale`, and `sortby` keywords are the same as for [`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen).

**Examples**


```julia
julia> eigvecs([1.0 0.0 0.0; 0.0 3.0 0.0; 0.0 0.0 18.0])
3×3 Matrix{Float64}:
 1.0  0.0  0.0
 0.0  1.0  0.0
 0.0  0.0  1.0
```

```julia
eigvecs(A, B) -> Matrix
```
Return a matrix `M` whose columns are the generalized eigenvectors of `A` and `B`. (The `k`th eigenvector can be obtained from the slice `M[:, k]`.)

**Examples**


```julia
julia> A = [1 0; 0 -1]
2×2 Matrix{Int64}:
 1   0
 0  -1

julia> B = [0 1; 1 0]
2×2 Matrix{Int64}:
 0  1
 1  0

julia> eigvecs(A, B)
2×2 Matrix{ComplexF64}:
  0.0+1.0im   0.0-1.0im
 -1.0+0.0im  -1.0-0.0im
```

```julia
eigen(A; permute::Bool=true, scale::Bool=true, sortby) -> Eigen
```
Compute the eigenvalue decomposition of `A`, returning an [`Eigen`](https://docs.julialang.org/#LinearAlgebra.Eigen) factorization object `F` which contains the eigenvalues in `F.values` and the eigenvectors in the columns of the matrix `F.vectors`. (The `k`th eigenvector can be obtained from the slice `F.vectors[:, k]`.)

Iterating the decomposition produces the components `F.values` and `F.vectors`.

The following functions are available for `Eigen` objects: [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det), and [`isposdef`](https://docs.julialang.org/#LinearAlgebra.isposdef).

For general nonsymmetric matrices it is possible to specify how the matrix is balanced before the eigenvector calculation. The option `permute=true` permutes the matrix to become closer to upper triangular, and `scale=true` scales the matrix by its diagonal elements to make rows and columns more equal in norm. The default is `true` for both options.

By default, the eigenvalues and vectors are sorted lexicographically by `(real(λ),imag(λ))`. A different comparison function `by(λ)` can be passed to `sortby`, or you can pass `sortby=nothing` to leave the eigenvalues in an arbitrary order. Some special matrix types (e.g. [`Diagonal`](https://docs.julialang.org/#LinearAlgebra.Diagonal) or [`SymTridiagonal`](https://docs.julialang.org/#LinearAlgebra.SymTridiagonal)) may implement their own sorting convention and not accept a `sortby` keyword.

**Examples**


```julia
julia> F = eigen([1.0 0.0 0.0; 0.0 3.0 0.0; 0.0 0.0 18.0])
Eigen{Float64, Float64, Matrix{Float64}, Vector{Float64}}
values:
3-element Vector{Float64}:
  1.0
  3.0
 18.0
vectors:
3×3 Matrix{Float64}:
 1.0  0.0  0.0
 0.0  1.0  0.0
 0.0  0.0  1.0

julia> F.values
3-element Vector{Float64}:
  1.0
  3.0
 18.0

julia> F.vectors
3×3 Matrix{Float64}:
 1.0  0.0  0.0
 0.0  1.0  0.0
 0.0  0.0  1.0

julia> vals, vecs = F; # destructuring via iteration

julia> vals == F.values && vecs == F.vectors
true
```

```julia
eigen(A, B; sortby) -> GeneralizedEigen
```
Compute the generalized eigenvalue decomposition of `A` and `B`, returning a [`GeneralizedEigen`](https://docs.julialang.org/#LinearAlgebra.GeneralizedEigen) factorization object `F` which contains the generalized eigenvalues in `F.values` and the generalized eigenvectors in the columns of the matrix `F.vectors`. (The `k`th generalized eigenvector can be obtained from the slice `F.vectors[:, k]`.)

Iterating the decomposition produces the components `F.values` and `F.vectors`.

By default, the eigenvalues and vectors are sorted lexicographically by `(real(λ),imag(λ))`. A different comparison function `by(λ)` can be passed to `sortby`, or you can pass `sortby=nothing` to leave the eigenvalues in an arbitrary order.

**Examples**


```julia
julia> A = [1 0; 0 -1]
2×2 Matrix{Int64}:
 1   0
 0  -1

julia> B = [0 1; 1 0]
2×2 Matrix{Int64}:
 0  1
 1  0

julia> F = eigen(A, B);

julia> F.values
2-element Vector{ComplexF64}:
 0.0 - 1.0im
 0.0 + 1.0im

julia> F.vectors
2×2 Matrix{ComplexF64}:
  0.0+1.0im   0.0-1.0im
 -1.0+0.0im  -1.0-0.0im

julia> vals, vecs = F; # destructuring via iteration

julia> vals == F.values && vecs == F.vectors
true
```

```julia
eigen(A::Union{SymTridiagonal, Hermitian, Symmetric}, irange::UnitRange) -> Eigen
```
Compute the eigenvalue decomposition of `A`, returning an [`Eigen`](https://docs.julialang.org/#LinearAlgebra.Eigen) factorization object `F` which contains the eigenvalues in `F.values` and the eigenvectors in the columns of the matrix `F.vectors`. (The `k`th eigenvector can be obtained from the slice `F.vectors[:, k]`.)

Iterating the decomposition produces the components `F.values` and `F.vectors`.

The following functions are available for `Eigen` objects: [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det), and [`isposdef`](https://docs.julialang.org/#LinearAlgebra.isposdef).

The [`UnitRange`](https://docs.julialang.org/../../base/collections/#Base.UnitRange) `irange` specifies indices of the sorted eigenvalues to search for.

If `irange` is not `1:n`, where `n` is the dimension of `A`, then the returned factorization will be a *truncated* factorization.


```julia
eigen(A::Union{SymTridiagonal, Hermitian, Symmetric}, vl::Real, vu::Real) -> Eigen
```
Compute the eigenvalue decomposition of `A`, returning an [`Eigen`](https://docs.julialang.org/#LinearAlgebra.Eigen) factorization object `F` which contains the eigenvalues in `F.values` and the eigenvectors in the columns of the matrix `F.vectors`. (The `k`th eigenvector can be obtained from the slice `F.vectors[:, k]`.)

Iterating the decomposition produces the components `F.values` and `F.vectors`.

The following functions are available for `Eigen` objects: [`inv`](https://docs.julialang.org/../../base/math/#Base.inv-Tuple%7BNumber%7D), [`det`](https://docs.julialang.org/#LinearAlgebra.det), and [`isposdef`](https://docs.julialang.org/#LinearAlgebra.isposdef).

`vl` is the lower bound of the window of eigenvalues to search for, and `vu` is the upper bound.

If [`vl`, `vu`] does not contain all eigenvalues of `A`, then the returned factorization will be a *truncated* factorization.


```julia
eigen!(A; permute, scale, sortby)
eigen!(A, B; sortby)
```
Same as [`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen), but saves space by overwriting the input `A` (and `B`), instead of creating a copy.


```julia
Hessenberg <: Factorization
```
A `Hessenberg` object represents the Hessenberg factorization `QHQ'` of a square matrix, or a shift `Q(H+μI)Q'` thereof, which is produced by the [`hessenberg`](https://docs.julialang.org/#LinearAlgebra.hessenberg) function.


```julia
hessenberg(A) -> Hessenberg
```
Compute the Hessenberg decomposition of `A` and return a `Hessenberg` object. If `F` is the factorization object, the unitary matrix can be accessed with `F.Q` (of type `LinearAlgebra.HessenbergQ`) and the Hessenberg matrix with `F.H` (of type [`UpperHessenberg`](https://docs.julialang.org/#LinearAlgebra.UpperHessenberg)), either of which may be converted to a regular matrix with `Matrix(F.H)` or `Matrix(F.Q)`.

If `A` is [`Hermitian`](https://docs.julialang.org/#LinearAlgebra.Hermitian) or real-[`Symmetric`](https://docs.julialang.org/#LinearAlgebra.Symmetric), then the Hessenberg decomposition produces a real-symmetric tridiagonal matrix and `F.H` is of type [`SymTridiagonal`](https://docs.julialang.org/#LinearAlgebra.SymTridiagonal).

Note that the shifted factorization `A+μI = Q (H+μI) Q'` can be constructed efficiently by `F + μ*I` using the [`UniformScaling`](https://docs.julialang.org/#LinearAlgebra.UniformScaling) object [`I`](https://docs.julialang.org/#LinearAlgebra.I), which creates a new `Hessenberg` object with shared storage and a modified shift. The shift of a given `F` is obtained by `F.μ`. This is useful because multiple shifted solves `(F + μ*I)  b` (for different `μ` and/or `b`) can be performed efficiently once `F` is created.

Iterating the decomposition produces the factors `F.Q, F.H, F.μ`.

**Examples**


```julia
julia> A = [4. 9. 7.; 4. 4. 1.; 4. 3. 2.]
3×3 Matrix{Float64}:
 4.0  9.0  7.0
 4.0  4.0  1.0
 4.0  3.0  2.0

julia> F = hessenberg(A)
Hessenberg{Float64, UpperHessenberg{Float64, Matrix{Float64}}, Matrix{Float64}, Vector{Float64}, Bool}
Q factor:
3×3 LinearAlgebra.HessenbergQ{Float64, Matrix{Float64}, Vector{Float64}, false}:
 1.0   0.0        0.0
 0.0  -0.707107  -0.707107
 0.0  -0.707107   0.707107
H factor:
3×3 UpperHessenberg{Float64, Matrix{Float64}}:
  4.0      -11.3137       -1.41421
 -5.65685    5.0           2.0
   ⋅        -8.88178e-16   1.0

julia> F.Q * F.H * F.Q'
3×3 Matrix{Float64}:
 4.0  9.0  7.0
 4.0  4.0  1.0
 4.0  3.0  2.0

julia> q, h = F; # destructuring via iteration

julia> q == F.Q && h == F.H
true
```

```julia
hessenberg!(A) -> Hessenberg
```
`hessenberg!` is the same as [`hessenberg`](https://docs.julialang.org/#LinearAlgebra.hessenberg), but saves space by overwriting the input `A`, instead of creating a copy.


```julia
Schur <: Factorization
```
Matrix factorization type of the Schur factorization of a matrix `A`. This is the return type of [`schur(_)`](https://docs.julialang.org/#LinearAlgebra.schur), the corresponding matrix factorization function.

If `F::Schur` is the factorization object, the (quasi) triangular Schur factor can be obtained via either `F.Schur` or `F.T` and the orthogonal/unitary Schur vectors via `F.vectors` or `F.Z` such that `A = F.vectors * F.Schur * F.vectors'`. The eigenvalues of `A` can be obtained with `F.values`.

Iterating the decomposition produces the components `F.T`, `F.Z`, and `F.values`.

**Examples**


```julia
julia> A = [5. 7.; -2. -4.]
2×2 Matrix{Float64}:
  5.0   7.0
 -2.0  -4.0

julia> F = schur(A)
Schur{Float64, Matrix{Float64}, Vector{Float64}}
T factor:
2×2 Matrix{Float64}:
 3.0   9.0
 0.0  -2.0
Z factor:
2×2 Matrix{Float64}:
  0.961524  0.274721
 -0.274721  0.961524
eigenvalues:
2-element Vector{Float64}:
  3.0
 -2.0

julia> F.vectors * F.Schur * F.vectors'
2×2 Matrix{Float64}:
  5.0   7.0
 -2.0  -4.0

julia> t, z, vals = F; # destructuring via iteration

julia> t == F.T && z == F.Z && vals == F.values
true
```

```julia
GeneralizedSchur <: Factorization
```
Matrix factorization type of the generalized Schur factorization of two matrices `A` and `B`. This is the return type of [`schur(_, _)`](https://docs.julialang.org/#LinearAlgebra.schur), the corresponding matrix factorization function.

If `F::GeneralizedSchur` is the factorization object, the (quasi) triangular Schur factors can be obtained via `F.S` and `F.T`, the left unitary/orthogonal Schur vectors via `F.left` or `F.Q`, and the right unitary/orthogonal Schur vectors can be obtained with `F.right` or `F.Z` such that `A=F.left*F.S*F.right'` and `B=F.left*F.T*F.right'`. The generalized eigenvalues of `A` and `B` can be obtained with `F.α./F.β`.

Iterating the decomposition produces the components `F.S`, `F.T`, `F.Q`, `F.Z`, `F.α`, and `F.β`.


```julia
schur(A) -> F::Schur
```
Computes the Schur factorization of the matrix `A`. The (quasi) triangular Schur factor can be obtained from the `Schur` object `F` with either `F.Schur` or `F.T` and the orthogonal/unitary Schur vectors can be obtained with `F.vectors` or `F.Z` such that `A = F.vectors * F.Schur * F.vectors'`. The eigenvalues of `A` can be obtained with `F.values`.

For real `A`, the Schur factorization is "quasitriangular", which means that it is upper-triangular except with 2×2 diagonal blocks for any conjugate pair of complex eigenvalues; this allows the factorization to be purely real even when there are complex eigenvalues. To obtain the (complex) purely upper-triangular Schur factorization from a real quasitriangular factorization, you can use `Schur{Complex}(schur(A))`.

Iterating the decomposition produces the components `F.T`, `F.Z`, and `F.values`.

**Examples**


```julia
julia> A = [5. 7.; -2. -4.]
2×2 Matrix{Float64}:
  5.0   7.0
 -2.0  -4.0

julia> F = schur(A)
Schur{Float64, Matrix{Float64}, Vector{Float64}}
T factor:
2×2 Matrix{Float64}:
 3.0   9.0
 0.0  -2.0
Z factor:
2×2 Matrix{Float64}:
  0.961524  0.274721
 -0.274721  0.961524
eigenvalues:
2-element Vector{Float64}:
  3.0
 -2.0

julia> F.vectors * F.Schur * F.vectors'
2×2 Matrix{Float64}:
  5.0   7.0
 -2.0  -4.0

julia> t, z, vals = F; # destructuring via iteration

julia> t == F.T && z == F.Z && vals == F.values
true
```

```julia
schur(A, B) -> F::GeneralizedSchur
```
Computes the Generalized Schur (or QZ) factorization of the matrices `A` and `B`. The (quasi) triangular Schur factors can be obtained from the `Schur` object `F` with `F.S` and `F.T`, the left unitary/orthogonal Schur vectors can be obtained with `F.left` or `F.Q` and the right unitary/orthogonal Schur vectors can be obtained with `F.right` or `F.Z` such that `A=F.left*F.S*F.right'` and `B=F.left*F.T*F.right'`. The generalized eigenvalues of `A` and `B` can be obtained with `F.α./F.β`.

Iterating the decomposition produces the components `F.S`, `F.T`, `F.Q`, `F.Z`, `F.α`, and `F.β`.


```julia
schur!(A::StridedMatrix) -> F::Schur
```
Same as [`schur`](https://docs.julialang.org/#LinearAlgebra.schur) but uses the input argument `A` as workspace.

**Examples**


```julia
julia> A = [5. 7.; -2. -4.]
2×2 Matrix{Float64}:
  5.0   7.0
 -2.0  -4.0

julia> F = schur!(A)
Schur{Float64, Matrix{Float64}, Vector{Float64}}
T factor:
2×2 Matrix{Float64}:
 3.0   9.0
 0.0  -2.0
Z factor:
2×2 Matrix{Float64}:
  0.961524  0.274721
 -0.274721  0.961524
eigenvalues:
2-element Vector{Float64}:
  3.0
 -2.0

julia> A
2×2 Matrix{Float64}:
 3.0   9.0
 0.0  -2.0
```

```julia
schur!(A::StridedMatrix, B::StridedMatrix) -> F::GeneralizedSchur
```
Same as [`schur`](https://docs.julialang.org/#LinearAlgebra.schur) but uses the input matrices `A` and `B` as workspace.


```julia
ordschur(F::Schur, select::Union{Vector{Bool},BitVector}) -> F::Schur
```
Reorders the Schur factorization `F` of a matrix `A = Z*T*Z'` according to the logical array `select` returning the reordered factorization `F` object. The selected eigenvalues appear in the leading diagonal of `F.Schur` and the corresponding leading columns of `F.vectors` form an orthogonal/unitary basis of the corresponding right invariant subspace. In the real case, a complex conjugate pair of eigenvalues must be either both included or both excluded via `select`.


```julia
ordschur(F::GeneralizedSchur, select::Union{Vector{Bool},BitVector}) -> F::GeneralizedSchur
```
Reorders the Generalized Schur factorization `F` of a matrix pair `(A, B) = (Q*S*Z', Q*T*Z')` according to the logical array `select` and returns a GeneralizedSchur object `F`. The selected eigenvalues appear in the leading diagonal of both `F.S` and `F.T`, and the left and right orthogonal/unitary Schur vectors are also reordered such that `(A, B) = F.Q*(F.S, F.T)*F.Z'` still holds and the generalized eigenvalues of `A` and `B` can still be obtained with `F.α./F.β`.


```julia
ordschur!(F::Schur, select::Union{Vector{Bool},BitVector}) -> F::Schur
```
Same as [`ordschur`](https://docs.julialang.org/#LinearAlgebra.ordschur) but overwrites the factorization `F`.


```julia
ordschur!(F::GeneralizedSchur, select::Union{Vector{Bool},BitVector}) -> F::GeneralizedSchur
```
Same as `ordschur` but overwrites the factorization `F`.


```julia
SVD <: Factorization
```
Matrix factorization type of the singular value decomposition (SVD) of a matrix `A`. This is the return type of [`svd(_)`](https://docs.julialang.org/#LinearAlgebra.svd), the corresponding matrix factorization function.

If `F::SVD` is the factorization object, `U`, `S`, `V` and `Vt` can be obtained via `F.U`, `F.S`, `F.V` and `F.Vt`, such that `A = U * Diagonal(S) * Vt`. The singular values in `S` are sorted in descending order.

Iterating the decomposition produces the components `U`, `S`, and `V`.

**Examples**


```julia
julia> A = [1. 0. 0. 0. 2.; 0. 0. 3. 0. 0.; 0. 0. 0. 0. 0.; 0. 2. 0. 0. 0.]
4×5 Matrix{Float64}:
 1.0  0.0  0.0  0.0  2.0
 0.0  0.0  3.0  0.0  0.0
 0.0  0.0  0.0  0.0  0.0
 0.0  2.0  0.0  0.0  0.0

julia> F = svd(A)
SVD{Float64, Float64, Matrix{Float64}, Vector{Float64}}
U factor:
4×4 Matrix{Float64}:
 0.0  1.0  0.0   0.0
 1.0  0.0  0.0   0.0
 0.0  0.0  0.0  -1.0
 0.0  0.0  1.0   0.0
singular values:
4-element Vector{Float64}:
 3.0
 2.23606797749979
 2.0
 0.0
Vt factor:
4×5 Matrix{Float64}:
 -0.0       0.0  1.0  -0.0  0.0
  0.447214  0.0  0.0   0.0  0.894427
 -0.0       1.0  0.0  -0.0  0.0
  0.0       0.0  0.0   1.0  0.0

julia> F.U * Diagonal(F.S) * F.Vt
4×5 Matrix{Float64}:
 1.0  0.0  0.0  0.0  2.0
 0.0  0.0  3.0  0.0  0.0
 0.0  0.0  0.0  0.0  0.0
 0.0  2.0  0.0  0.0  0.0

julia> u, s, v = F; # destructuring via iteration

julia> u == F.U && s == F.S && v == F.V
true
```

```julia
GeneralizedSVD <: Factorization
```
Matrix factorization type of the generalized singular value decomposition (SVD) of two matrices `A` and `B`, such that `A = F.U*F.D1*F.R0*F.Q'` and `B = F.V*F.D2*F.R0*F.Q'`. This is the return type of [`svd(_, _)`](https://docs.julialang.org/#LinearAlgebra.svd), the corresponding matrix factorization function.

For an M-by-N matrix `A` and P-by-N matrix `B`,

* `U` is a M-by-M orthogonal matrix,
* `V` is a P-by-P orthogonal matrix,
* `Q` is a N-by-N orthogonal matrix,
* `D1` is a M-by-(K+L) diagonal matrix with 1s in the first K entries,
* `D2` is a P-by-(K+L) matrix whose top right L-by-L block is diagonal,
* `R0` is a (K+L)-by-N matrix whose rightmost (K+L)-by-(K+L) block is nonsingular upper block triangular,

`K+L` is the effective numerical rank of the matrix `[A; B]`.

Iterating the decomposition produces the components `U`, `V`, `Q`, `D1`, `D2`, and `R0`.

The entries of `F.D1` and `F.D2` are related, as explained in the LAPACK documentation for the [generalized SVD](http://www.netlib.org/lapack/lug/node36.html) and the [xGGSVD3](http://www.netlib.org/lapack/explore-html/d6/db3/dggsvd3_8f.html) routine which is called underneath (in LAPACK 3.6.0 and newer).

**Examples**


```julia
julia> A = [1. 0.; 0. -1.]
2×2 Matrix{Float64}:
 1.0   0.0
 0.0  -1.0

julia> B = [0. 1.; 1. 0.]
2×2 Matrix{Float64}:
 0.0  1.0
 1.0  0.0

julia> F = svd(A, B)
GeneralizedSVD{Float64, Matrix{Float64}, Float64, Vector{Float64}}
U factor:
2×2 Matrix{Float64}:
 1.0  0.0
 0.0  1.0
V factor:
2×2 Matrix{Float64}:
 -0.0  -1.0
  1.0   0.0
Q factor:
2×2 Matrix{Float64}:
 1.0  0.0
 0.0  1.0
D1 factor:
2×2 Matrix{Float64}:
 0.707107  0.0
 0.0       0.707107
D2 factor:
2×2 Matrix{Float64}:
 0.707107  0.0
 0.0       0.707107
R0 factor:
2×2 Matrix{Float64}:
 1.41421   0.0
 0.0      -1.41421

julia> F.U*F.D1*F.R0*F.Q'
2×2 Matrix{Float64}:
 1.0   0.0
 0.0  -1.0

julia> F.V*F.D2*F.R0*F.Q'
2×2 Matrix{Float64}:
 -0.0  1.0
  1.0  0.0
```

```julia
svd(A; full::Bool = false, alg::Algorithm = default_svd_alg(A)) -> SVD
```
Compute the singular value decomposition (SVD) of `A` and return an `SVD` object.

`U`, `S`, `V` and `Vt` can be obtained from the factorization `F` with `F.U`, `F.S`, `F.V` and `F.Vt`, such that `A = U * Diagonal(S) * Vt`. The algorithm produces `Vt` and hence `Vt` is more efficient to extract than `V`. The singular values in `S` are sorted in descending order.

Iterating the decomposition produces the components `U`, `S`, and `V`.

If `full = false` (default), a "thin" SVD is returned. For an $M times N$ matrix `A`, in the full factorization `U` is $M times M$ and `V` is $N times N$, while in the thin factorization `U` is $M times K$ and `V` is $N times K$, where $K = min(M,N)$ is the number of singular values.

If `alg = DivideAndConquer()` a divide-and-conquer algorithm is used to calculate the SVD. Another (typically slower but more accurate) option is `alg = QRIteration()`.

The `alg` keyword argument requires Julia 1.3 or later.

**Examples**


```julia
julia> A = rand(4,3);

julia> F = svd(A); # Store the Factorization Object

julia> A ≈ F.U * Diagonal(F.S) * F.Vt
true

julia> U, S, V = F; # destructuring via iteration

julia> A ≈ U * Diagonal(S) * V'
true

julia> Uonly, = svd(A); # Store U only

julia> Uonly == U
true
```

```julia
svd(A, B) -> GeneralizedSVD
```
Compute the generalized SVD of `A` and `B`, returning a `GeneralizedSVD` factorization object `F` such that `[A;B] = [F.U * F.D1; F.V * F.D2] * F.R0 * F.Q'`

* `U` is a M-by-M orthogonal matrix,
* `V` is a P-by-P orthogonal matrix,
* `Q` is a N-by-N orthogonal matrix,
* `D1` is a M-by-(K+L) diagonal matrix with 1s in the first K entries,
* `D2` is a P-by-(K+L) matrix whose top right L-by-L block is diagonal,
* `R0` is a (K+L)-by-N matrix whose rightmost (K+L)-by-(K+L) block is nonsingular upper block triangular,

`K+L` is the effective numerical rank of the matrix `[A; B]`.

Iterating the decomposition produces the components `U`, `V`, `Q`, `D1`, `D2`, and `R0`.

The generalized SVD is used in applications such as when one wants to compare how much belongs to `A` vs. how much belongs to `B`, as in human vs yeast genome, or signal vs noise, or between clusters vs within clusters. (See Edelman and Wang for discussion: https://arxiv.org/abs/1901.00485)

It decomposes `[A; B]` into `[UC; VS]H`, where `[UC; VS]` is a natural orthogonal basis for the column space of `[A; B]`, and `H = RQ'` is a natural non-orthogonal basis for the rowspace of `[A;B]`, where the top rows are most closely attributed to the `A` matrix, and the bottom to the `B` matrix. The multi-cosine/sine matrices `C` and `S` provide a multi-measure of how much `A` vs how much `B`, and `U` and `V` provide directions in which these are measured.

**Examples**


```julia
julia> A = randn(3,2); B=randn(4,2);

julia> F = svd(A, B);

julia> U,V,Q,C,S,R = F;

julia> H = R*Q';

julia> [A; B] ≈ [U*C; V*S]*H
true

julia> [A; B] ≈ [F.U*F.D1; F.V*F.D2]*F.R0*F.Q'
true

julia> Uonly, = svd(A,B);

julia> U == Uonly
true
```

```julia
svd!(A; full::Bool = false, alg::Algorithm = default_svd_alg(A)) -> SVD
```
`svd!` is the same as [`svd`](https://docs.julialang.org/#LinearAlgebra.svd), but saves space by overwriting the input `A`, instead of creating a copy. See documentation of [`svd`](https://docs.julialang.org/#LinearAlgebra.svd) for details.


```julia
svd!(A, B) -> GeneralizedSVD
```
`svd!` is the same as [`svd`](https://docs.julialang.org/#LinearAlgebra.svd), but modifies the arguments `A` and `B` in-place, instead of making copies. See documentation of [`svd`](https://docs.julialang.org/#LinearAlgebra.svd) for details.


```julia
svdvals(A)
```
Return the singular values of `A` in descending order.

**Examples**


```julia
julia> A = [1. 0. 0. 0. 2.; 0. 0. 3. 0. 0.; 0. 0. 0. 0. 0.; 0. 2. 0. 0. 0.]
4×5 Matrix{Float64}:
 1.0  0.0  0.0  0.0  2.0
 0.0  0.0  3.0  0.0  0.0
 0.0  0.0  0.0  0.0  0.0
 0.0  2.0  0.0  0.0  0.0

julia> svdvals(A)
4-element Vector{Float64}:
 3.0
 2.23606797749979
 2.0
 0.0
```

```julia
svdvals(A, B)
```
Return the generalized singular values from the generalized singular value decomposition of `A` and `B`. See also [`svd`](https://docs.julialang.org/#LinearAlgebra.svd).

**Examples**


```julia
julia> A = [1. 0.; 0. -1.]
2×2 Matrix{Float64}:
 1.0   0.0
 0.0  -1.0

julia> B = [0. 1.; 1. 0.]
2×2 Matrix{Float64}:
 0.0  1.0
 1.0  0.0

julia> svdvals(A, B)
2-element Vector{Float64}:
 1.0
 1.0
```

```julia
svdvals!(A)
```
Return the singular values of `A`, saving space by overwriting the input. See also [`svdvals`](https://docs.julialang.org/#LinearAlgebra.svdvals) and [`svd`](https://docs.julialang.org/#LinearAlgebra.svd). ```


```julia
svdvals!(A, B)
```
Return the generalized singular values from the generalized singular value decomposition of `A` and `B`, saving space by overwriting `A` and `B`. See also [`svd`](https://docs.julialang.org/#LinearAlgebra.svd) and [`svdvals`](https://docs.julialang.org/#LinearAlgebra.svdvals).


```julia
LinearAlgebra.Givens(i1,i2,c,s) -> G
```
A Givens rotation linear operator. The fields `c` and `s` represent the cosine and sine of the rotation angle, respectively. The `Givens` type supports left multiplication `G*A` and conjugated transpose right multiplication `A*G'`. The type doesn't have a `size` and can therefore be multiplied with matrices of arbitrary size as long as `i2<=size(A,2)` for `G*A` or `i2<=size(A,1)` for `A*G'`.

See also [`givens`](https://docs.julialang.org/#LinearAlgebra.givens).


```julia
givens(f::T, g::T, i1::Integer, i2::Integer) where {T} -> (G::Givens, r::T)
```
Computes the Givens rotation `G` and scalar `r` such that for any vector `x` where


```julia
x[i1] = f
x[i2] = g
```
the result of the multiplication


```julia
y = G*x
```
has the property that


```julia
y[i1] = r
y[i2] = 0
```
See also [`LinearAlgebra.Givens`](https://docs.julialang.org/#LinearAlgebra.Givens).


```julia
givens(A::AbstractArray, i1::Integer, i2::Integer, j::Integer) -> (G::Givens, r)
```
Computes the Givens rotation `G` and scalar `r` such that the result of the multiplication


```julia
B = G*A
```
has the property that


```julia
B[i1,j] = r
B[i2,j] = 0
```
See also [`LinearAlgebra.Givens`](https://docs.julialang.org/#LinearAlgebra.Givens).


```julia
givens(x::AbstractVector, i1::Integer, i2::Integer) -> (G::Givens, r)
```
Computes the Givens rotation `G` and scalar `r` such that the result of the multiplication


```julia
B = G*x
```
has the property that


```julia
B[i1] = r
B[i2] = 0
```
See also [`LinearAlgebra.Givens`](https://docs.julialang.org/#LinearAlgebra.Givens).


```julia
triu(M)
```
Upper triangle of a matrix.

**Examples**


```julia
julia> a = fill(1.0, (4,4))
4×4 Matrix{Float64}:
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0

julia> triu(a)
4×4 Matrix{Float64}:
 1.0  1.0  1.0  1.0
 0.0  1.0  1.0  1.0
 0.0  0.0  1.0  1.0
 0.0  0.0  0.0  1.0
```

```julia
triu(M, k::Integer)
```
Returns the upper triangle of `M` starting from the `k`th superdiagonal.

**Examples**


```julia
julia> a = fill(1.0, (4,4))
4×4 Matrix{Float64}:
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0

julia> triu(a,3)
4×4 Matrix{Float64}:
 0.0  0.0  0.0  1.0
 0.0  0.0  0.0  0.0
 0.0  0.0  0.0  0.0
 0.0  0.0  0.0  0.0

julia> triu(a,-3)
4×4 Matrix{Float64}:
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
```

```julia
triu!(M)
```
Upper triangle of a matrix, overwriting `M` in the process. See also [`triu`](https://docs.julialang.org/#LinearAlgebra.triu).


```julia
triu!(M, k::Integer)
```
Return the upper triangle of `M` starting from the `k`th superdiagonal, overwriting `M` in the process.

**Examples**


```julia
julia> M = [1 2 3 4 5; 1 2 3 4 5; 1 2 3 4 5; 1 2 3 4 5; 1 2 3 4 5]
5×5 Matrix{Int64}:
 1  2  3  4  5
 1  2  3  4  5
 1  2  3  4  5
 1  2  3  4  5
 1  2  3  4  5

julia> triu!(M, 1)
5×5 Matrix{Int64}:
 0  2  3  4  5
 0  0  3  4  5
 0  0  0  4  5
 0  0  0  0  5
 0  0  0  0  0
```

```julia
tril(M)
```
Lower triangle of a matrix.

**Examples**


```julia
julia> a = fill(1.0, (4,4))
4×4 Matrix{Float64}:
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0

julia> tril(a)
4×4 Matrix{Float64}:
 1.0  0.0  0.0  0.0
 1.0  1.0  0.0  0.0
 1.0  1.0  1.0  0.0
 1.0  1.0  1.0  1.0
```

```julia
tril(M, k::Integer)
```
Returns the lower triangle of `M` starting from the `k`th superdiagonal.

**Examples**


```julia
julia> a = fill(1.0, (4,4))
4×4 Matrix{Float64}:
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0

julia> tril(a,3)
4×4 Matrix{Float64}:
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0
 1.0  1.0  1.0  1.0

julia> tril(a,-3)
4×4 Matrix{Float64}:
 0.0  0.0  0.0  0.0
 0.0  0.0  0.0  0.0
 0.0  0.0  0.0  0.0
 1.0  0.0  0.0  0.0
```

```julia
tril!(M)
```
Lower triangle of a matrix, overwriting `M` in the process. See also [`tril`](https://docs.julialang.org/#LinearAlgebra.tril).


```julia
tril!(M, k::Integer)
```
Return the lower triangle of `M` starting from the `k`th superdiagonal, overwriting `M` in the process.

**Examples**


```julia
julia> M = [1 2 3 4 5; 1 2 3 4 5; 1 2 3 4 5; 1 2 3 4 5; 1 2 3 4 5]
5×5 Matrix{Int64}:
 1  2  3  4  5
 1  2  3  4  5
 1  2  3  4  5
 1  2  3  4  5
 1  2  3  4  5

julia> tril!(M, 2)
5×5 Matrix{Int64}:
 1  2  3  0  0
 1  2  3  4  0
 1  2  3  4  5
 1  2  3  4  5
 1  2  3  4  5
```

```julia
diagind(M, k::Integer=0)
```
An `AbstractRange` giving the indices of the `k`th diagonal of the matrix `M`.

See also: [`diag`](https://docs.julialang.org/#LinearAlgebra.diag), [`diagm`](https://docs.julialang.org/#LinearAlgebra.diagm), [`Diagonal`](https://docs.julialang.org/#LinearAlgebra.Diagonal).

**Examples**


```julia
julia> A = [1 2 3; 4 5 6; 7 8 9]
3×3 Matrix{Int64}:
 1  2  3
 4  5  6
 7  8  9

julia> diagind(A,-1)
2:4:6
```

```julia
diag(M, k::Integer=0)
```
The `k`th diagonal of a matrix, as a vector.

See also [`diagm`](https://docs.julialang.org/#LinearAlgebra.diagm), [`diagind`](https://docs.julialang.org/#LinearAlgebra.diagind), [`Diagonal`](https://docs.julialang.org/#LinearAlgebra.Diagonal), [`isdiag`](https://docs.julialang.org/#LinearAlgebra.isdiag).

**Examples**


```julia
julia> A = [1 2 3; 4 5 6; 7 8 9]
3×3 Matrix{Int64}:
 1  2  3
 4  5  6
 7  8  9

julia> diag(A,1)
2-element Vector{Int64}:
 2
 6
```

```julia
diagm(kv::Pair{<:Integer,<:AbstractVector}...)
diagm(m::Integer, n::Integer, kv::Pair{<:Integer,<:AbstractVector}...)
```
Construct a matrix from `Pair`s of diagonals and vectors. Vector `kv.second` will be placed on the `kv.first` diagonal. By default the matrix is square and its size is inferred from `kv`, but a non-square size `m`×`n` (padded with zeros as needed) can be specified by passing `m,n` as the first arguments. For repeated diagonal indices `kv.first` the values in the corresponding vectors `kv.second` will be added.

`diagm` constructs a full matrix; if you want storage-efficient versions with fast arithmetic, see [`Diagonal`](https://docs.julialang.org/#LinearAlgebra.Diagonal), [`Bidiagonal`](https://docs.julialang.org/#LinearAlgebra.Bidiagonal) [`Tridiagonal`](https://docs.julialang.org/#LinearAlgebra.Tridiagonal) and [`SymTridiagonal`](https://docs.julialang.org/#LinearAlgebra.SymTridiagonal).

**Examples**


```julia
julia> diagm(1 => [1,2,3])
4×4 Matrix{Int64}:
 0  1  0  0
 0  0  2  0
 0  0  0  3
 0  0  0  0

julia> diagm(1 => [1,2,3], -1 => [4,5])
4×4 Matrix{Int64}:
 0  1  0  0
 4  0  2  0
 0  5  0  3
 0  0  0  0

julia> diagm(1 => [1,2,3], 1 => [1,2,3])
4×4 Matrix{Int64}:
 0  2  0  0
 0  0  4  0
 0  0  0  6
 0  0  0  0
```

```julia
diagm(v::AbstractVector)
diagm(m::Integer, n::Integer, v::AbstractVector)
```
Construct a matrix with elements of the vector as diagonal elements. By default, the matrix is square and its size is given by `length(v)`, but a non-square size `m`×`n` can be specified by passing `m,n` as the first arguments.

**Examples**


```julia
julia> diagm([1,2,3])
3×3 Matrix{Int64}:
 1  0  0
 0  2  0
 0  0  3
```

```julia
rank(A::AbstractMatrix; atol::Real=0, rtol::Real=atol>0 ? 0 : n*ϵ)
rank(A::AbstractMatrix, rtol::Real)
```
Compute the rank of a matrix by counting how many singular values of `A` have magnitude greater than `max(atol, rtol*σ₁)` where `σ₁` is `A`'s largest singular value. `atol` and `rtol` are the absolute and relative tolerances, respectively. The default relative tolerance is `n*ϵ`, where `n` is the size of the smallest dimension of `A`, and `ϵ` is the [`eps`](https://docs.julialang.org/../../base/base/#Base.eps-Tuple%7BType%7B<:AbstractFloat%7D%7D) of the element type of `A`.

The `atol` and `rtol` keyword arguments requires at least Julia 1.1. In Julia 1.0 `rtol` is available as a positional argument, but this will be deprecated in Julia 2.0.

**Examples**


```julia
julia> rank(Matrix(I, 3, 3))
3

julia> rank(diagm(0 => [1, 0, 2]))
2

julia> rank(diagm(0 => [1, 0.001, 2]), rtol=0.1)
2

julia> rank(diagm(0 => [1, 0.001, 2]), rtol=0.00001)
3

julia> rank(diagm(0 => [1, 0.001, 2]), atol=1.5)
1
```

```julia
norm(A, p::Real=2)
```
For any iterable container `A` (including arrays of any dimension) of numbers (or any element type for which `norm` is defined), compute the `p`-norm (defaulting to `p=2`) as if `A` were a vector of the corresponding length.

The `p`-norm is defined as

[|A|_p = left( sum_{i=1}^n | a_i | ^p right)^{1/p}]

with $a_i$ the entries of $A$, $| a_i |$ the [`norm`](https://docs.julialang.org/#LinearAlgebra.norm) of $a_i$, and $n$ the length of $A$. Since the `p`-norm is computed using the [`norm`](https://docs.julialang.org/#LinearAlgebra.norm)s of the entries of `A`, the `p`-norm of a vector of vectors is not compatible with the interpretation of it as a block vector in general if `p != 2`.

`p` can assume any numeric value (even though not all values produce a mathematically valid vector norm). In particular, `norm(A, Inf)` returns the largest value in `abs.(A)`, whereas `norm(A, -Inf)` returns the smallest. If `A` is a matrix and `p=2`, then this is equivalent to the Frobenius norm.

The second argument `p` is not necessarily a part of the interface for `norm`, i.e. a custom type may only implement `norm(A)` without second argument.

Use [`opnorm`](https://docs.julialang.org/#LinearAlgebra.opnorm) to compute the operator norm of a matrix.

**Examples**


```julia
julia> v = [3, -2, 6]
3-element Vector{Int64}:
  3
 -2
  6

julia> norm(v)
7.0

julia> norm(v, 1)
11.0

julia> norm(v, Inf)
6.0

julia> norm([1 2 3; 4 5 6; 7 8 9])
16.881943016134134

julia> norm([1 2 3 4 5 6 7 8 9])
16.881943016134134

julia> norm(1:9)
16.881943016134134

julia> norm(hcat(v,v), 1) == norm(vcat(v,v), 1) != norm([v,v], 1)
true

julia> norm(hcat(v,v), 2) == norm(vcat(v,v), 2) == norm([v,v], 2)
true

julia> norm(hcat(v,v), Inf) == norm(vcat(v,v), Inf) != norm([v,v], Inf)
true
```

```julia
norm(x::Number, p::Real=2)
```
For numbers, return $left( |x|^p right)^{1/p}$.

**Examples**


```julia
julia> norm(2, 1)
2.0

julia> norm(-2, 1)
2.0

julia> norm(2, 2)
2.0

julia> norm(-2, 2)
2.0

julia> norm(2, Inf)
2.0

julia> norm(-2, Inf)
2.0
```

```julia
opnorm(A::AbstractMatrix, p::Real=2)
```
Compute the operator norm (or matrix norm) induced by the vector `p`-norm, where valid values of `p` are `1`, `2`, or `Inf`. (Note that for sparse matrices, `p=2` is currently not implemented.) Use [`norm`](https://docs.julialang.org/#LinearAlgebra.norm) to compute the Frobenius norm.

When `p=1`, the operator norm is the maximum absolute column sum of `A`:

[|A|_1 = max_{1 ≤ j ≤ n} sum_{i=1}^m | a_{ij} |]

with $a_{ij}$ the entries of $A$, and $m$ and $n$ its dimensions.

When `p=2`, the operator norm is the spectral norm, equal to the largest singular value of `A`.

When `p=Inf`, the operator norm is the maximum absolute row sum of `A`:

[|A|_infty = max_{1 ≤ i ≤ m} sum _{j=1}^n | a_{ij} |]

**Examples**


```julia
julia> A = [1 -2 -3; 2 3 -1]
2×3 Matrix{Int64}:
 1  -2  -3
 2   3  -1

julia> opnorm(A, Inf)
6.0

julia> opnorm(A, 1)
5.0
```

```julia
opnorm(x::Number, p::Real=2)
```
For numbers, return $left( |x|^p right)^{1/p}$. This is equivalent to [`norm`](https://docs.julialang.org/#LinearAlgebra.norm).


```julia
opnorm(A::Adjoint{<:Any,<:AbstracVector}, q::Real=2)
opnorm(A::Transpose{<:Any,<:AbstracVector}, q::Real=2)
```
For Adjoint/Transpose-wrapped vectors, return the operator $q$-norm of `A`, which is equivalent to the `p`-norm with value `p = q/(q-1)`. They coincide at `p = q = 2`. Use [`norm`](https://docs.julialang.org/#LinearAlgebra.norm) to compute the `p` norm of `A` as a vector.

The difference in norm between a vector space and its dual arises to preserve the relationship between duality and the dot product, and the result is consistent with the operator `p`-norm of a `1 × n` matrix.

**Examples**


```julia
julia> v = [1; im];

julia> vc = v';

julia> opnorm(vc, 1)
1.0

julia> norm(vc, 1)
2.0

julia> norm(v, 1)
2.0

julia> opnorm(vc, 2)
1.4142135623730951

julia> norm(vc, 2)
1.4142135623730951

julia> norm(v, 2)
1.4142135623730951

julia> opnorm(vc, Inf)
2.0

julia> norm(vc, Inf)
1.0

julia> norm(v, Inf)
1.0
```

```julia
normalize!(a::AbstractArray, p::Real=2)
```
Normalize the array `a` in-place so that its `p`-norm equals unity, i.e. `norm(a, p) == 1`. See also [`normalize`](https://docs.julialang.org/#LinearAlgebra.normalize) and [`norm`](https://docs.julialang.org/#LinearAlgebra.norm).


```julia
normalize(a::AbstractArray, p::Real=2)
```
Normalize the array `a` so that its `p`-norm equals unity, i.e. `norm(a, p) == 1`. See also [`normalize!`](https://docs.julialang.org/#LinearAlgebra.normalize!) and [`norm`](https://docs.julialang.org/#LinearAlgebra.norm).

**Examples**


```julia
julia> a = [1,2,4];

julia> b = normalize(a)
3-element Vector{Float64}:
 0.2182178902359924
 0.4364357804719848
 0.8728715609439696

julia> norm(b)
1.0

julia> c = normalize(a, 1)
3-element Vector{Float64}:
 0.14285714285714285
 0.2857142857142857
 0.5714285714285714

julia> norm(c, 1)
1.0

julia> a = [1 2 4 ; 1 2 4]
2×3 Matrix{Int64}:
 1  2  4
 1  2  4

julia> norm(a)
6.48074069840786

julia> normalize(a)
2×3 Matrix{Float64}:
 0.154303  0.308607  0.617213
 0.154303  0.308607  0.617213

```

```julia
cond(M, p::Real=2)
```
Condition number of the matrix `M`, computed using the operator `p`-norm. Valid values for `p` are `1`, `2` (default), or `Inf`.


```julia
condskeel(M, [x, p::Real=Inf])
```
[kappa_S(M, p) = leftVert leftvert M rightvert leftvert M^{-1} rightvert rightVert_p 
kappa_S(M, x, p) = frac{leftVert leftvert M rightvert leftvert M^{-1} rightvert leftvert x rightvert rightVert_p}{left Vert x right Vert_p}]

Skeel condition number $kappa_S$ of the matrix `M`, optionally with respect to the vector `x`, as computed using the operator `p`-norm. $leftvert M rightvert$ denotes the matrix of (entry wise) absolute values of $M$; $leftvert M rightvert_{ij} = leftvert M_{ij} rightvert$. Valid values for `p` are `1`, `2` and `Inf` (default).

This quantity is also known in the literature as the Bauer condition number, relative condition number, or componentwise relative condition number.


```julia
tr(M)
```
Matrix trace. Sums the diagonal elements of `M`.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> tr(A)
5
```

```julia
det(M)
```
Matrix determinant.

See also: [`logdet`](https://docs.julialang.org/#LinearAlgebra.logdet) and [`logabsdet`](https://docs.julialang.org/#LinearAlgebra.logabsdet).

**Examples**


```julia
julia> M = [1 0; 2 2]
2×2 Matrix{Int64}:
 1  0
 2  2

julia> det(M)
2.0
```

```julia
logdet(M)
```
Log of matrix determinant. Equivalent to `log(det(M))`, but may provide increased accuracy and/or speed.

**Examples**


```julia
julia> M = [1 0; 2 2]
2×2 Matrix{Int64}:
 1  0
 2  2

julia> logdet(M)
0.6931471805599453

julia> logdet(Matrix(I, 3, 3))
0.0
```

```julia
logabsdet(M)
```
Log of absolute value of matrix determinant. Equivalent to `(log(abs(det(M))), sign(det(M)))`, but may provide increased accuracy and/or speed.

**Examples**


```julia
julia> A = [-1. 0.; 0. 1.]
2×2 Matrix{Float64}:
 -1.0  0.0
  0.0  1.0

julia> det(A)
-1.0

julia> logabsdet(A)
(0.0, -1.0)

julia> B = [2. 0.; 0. 1.]
2×2 Matrix{Float64}:
 2.0  0.0
 0.0  1.0

julia> det(B)
2.0

julia> logabsdet(B)
(0.6931471805599453, 1.0)
```

```julia
inv(M)
```
Matrix inverse. Computes matrix `N` such that `M * N = I`, where `I` is the identity matrix. Computed by solving the left-division `N = M  I`.

**Examples**


```julia
julia> M = [2 5; 1 3]
2×2 Matrix{Int64}:
 2  5
 1  3

julia> N = inv(M)
2×2 Matrix{Float64}:
  3.0  -5.0
 -1.0   2.0

julia> M*N == N*M == Matrix(I, 2, 2)
true
```

```julia
pinv(M; atol::Real=0, rtol::Real=atol>0 ? 0 : n*ϵ)
pinv(M, rtol::Real) = pinv(M; rtol=rtol) # to be deprecated in Julia 2.0
```
Computes the Moore-Penrose pseudoinverse.

For matrices `M` with floating point elements, it is convenient to compute the pseudoinverse by inverting only singular values greater than `max(atol, rtol*σ₁)` where `σ₁` is the largest singular value of `M`.

The optimal choice of absolute (`atol`) and relative tolerance (`rtol`) varies both with the value of `M` and the intended application of the pseudoinverse. The default relative tolerance is `n*ϵ`, where `n` is the size of the smallest dimension of `M`, and `ϵ` is the [`eps`](https://docs.julialang.org/../../base/base/#Base.eps-Tuple%7BType%7B<:AbstractFloat%7D%7D) of the element type of `M`.

For inverting dense ill-conditioned matrices in a least-squares sense, `rtol = sqrt(eps(real(float(one(eltype(M))))))` is recommended.

For more information, see , , , .

**Examples**


```julia
julia> M = [1.5 1.3; 1.2 1.9]
2×2 Matrix{Float64}:
 1.5  1.3
 1.2  1.9

julia> N = pinv(M)
2×2 Matrix{Float64}:
  1.47287   -1.00775
 -0.930233   1.16279

julia> M * N
2×2 Matrix{Float64}:
 1.0          -2.22045e-16
 4.44089e-16   1.0
```

```julia
nullspace(M; atol::Real=0, rtol::Real=atol>0 ? 0 : n*ϵ)
nullspace(M, rtol::Real) = nullspace(M; rtol=rtol) # to be deprecated in Julia 2.0
```
Computes a basis for the nullspace of `M` by including the singular vectors of `M` whose singular values have magnitudes smaller than `max(atol, rtol*σ₁)`, where `σ₁` is `M`'s largest singular value.

By default, the relative tolerance `rtol` is `n*ϵ`, where `n` is the size of the smallest dimension of `M`, and `ϵ` is the [`eps`](https://docs.julialang.org/../../base/base/#Base.eps-Tuple%7BType%7B<:AbstractFloat%7D%7D) of the element type of `M`.

**Examples**


```julia
julia> M = [1 0 0; 0 1 0; 0 0 0]
3×3 Matrix{Int64}:
 1  0  0
 0  1  0
 0  0  0

julia> nullspace(M)
3×1 Matrix{Float64}:
 0.0
 0.0
 1.0

julia> nullspace(M, rtol=3)
3×3 Matrix{Float64}:
 0.0  1.0  0.0
 1.0  0.0  0.0
 0.0  0.0  1.0

julia> nullspace(M, atol=0.95)
3×1 Matrix{Float64}:
 0.0
 0.0
 1.0
```

```julia
kron(A, B)
```
Kronecker tensor product of two vectors or two matrices.

For real vectors `v` and `w`, the Kronecker product is related to the outer product by `kron(v,w) == vec(w * transpose(v))` or `w * transpose(v) == reshape(kron(v,w), (length(w), length(v)))`. Note how the ordering of `v` and `w` differs on the left and right of these expressions (due to column-major storage). For complex vectors, the outer product `w * v'` also differs by conjugation of `v`.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> B = [im 1; 1 -im]
2×2 Matrix{Complex{Int64}}:
 0+1im  1+0im
 1+0im  0-1im

julia> kron(A, B)
4×4 Matrix{Complex{Int64}}:
 0+1im  1+0im  0+2im  2+0im
 1+0im  0-1im  2+0im  0-2im
 0+3im  3+0im  0+4im  4+0im
 3+0im  0-3im  4+0im  0-4im

julia> v = [1, 2]; w = [3, 4, 5];

julia> w*transpose(v)
3×2 Matrix{Int64}:
 3   6
 4   8
 5  10

julia> reshape(kron(v,w), (length(w), length(v)))
3×2 Matrix{Int64}:
 3   6
 4   8
 5  10
```

```julia
kron!(C, A, B)
```
`kron!` is the in-place version of [`kron`](https://docs.julialang.org/#Base.kron). Computes `kron(A, B)` and stores the result in `C` overwriting the existing value of `C`.

Bounds checking can be disabled by [`@inbounds`](https://docs.julialang.org/../../base/base/#Base.@inbounds), but you need to take care of the shape of `C`, `A`, `B` yourself.

This function requires Julia 1.6 or later.


```julia
exp(A::AbstractMatrix)
```
Compute the matrix exponential of `A`, defined by

[e^A = sum_{n=0}^{infty} frac{A^n}{n!}.]

For symmetric or Hermitian `A`, an eigendecomposition ([`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen)) is used, otherwise the scaling and squaring algorithm (see ) is chosen.

**Examples**


```julia
julia> A = Matrix(1.0I, 2, 2)
2×2 Matrix{Float64}:
 1.0  0.0
 0.0  1.0

julia> exp(A)
2×2 Matrix{Float64}:
 2.71828  0.0
 0.0      2.71828
```

```julia
cis(A::AbstractMatrix)
```
More efficient method for `exp(im*A)` of square matrix `A` (especially if `A` is `Hermitian` or real-`Symmetric`).

See also [`cispi`](https://docs.julialang.org/../../base/math/#Base.cispi), [`sincos`](https://docs.julialang.org/../../base/math/#Base.Math.sincos-Tuple%7BFloat64%7D), [`exp`](https://docs.julialang.org/../../base/math/#Base.exp-Tuple%7BFloat64%7D).

Support for using `cis` with matrices was added in Julia 1.7.

**Examples**


```julia
julia> cis([π 0; 0 π]) ≈ -I
true
```

```julia
^(A::AbstractMatrix, p::Number)
```
Matrix power, equivalent to $exp(plog(A))$

**Examples**


```julia
julia> [1 2; 0 3]^3
2×2 Matrix{Int64}:
 1  26
 0  27
```

```julia
^(b::Number, A::AbstractMatrix)
```
Matrix exponential, equivalent to $exp(log(b)A)$.

Support for raising `Irrational` numbers (like `ℯ`) to a matrix was added in Julia 1.1.

**Examples**


```julia
julia> 2^[1 2; 0 3]
2×2 Matrix{Float64}:
 2.0  6.0
 0.0  8.0

julia> ℯ^[1 2; 0 3]
2×2 Matrix{Float64}:
 2.71828  17.3673
 0.0      20.0855
```

```julia
log(A::StridedMatrix)
```
If `A` has no negative real eigenvalue, compute the principal matrix logarithm of `A`, i.e. the unique matrix $X$ such that $e^X = A$ and $-pi < Im(lambda) < pi$ for all the eigenvalues $lambda$ of $X$. If `A` has nonpositive eigenvalues, a nonprincipal matrix function is returned whenever possible.

If `A` is symmetric or Hermitian, its eigendecomposition ([`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen)) is used, if `A` is triangular an improved version of the inverse scaling and squaring method is employed (see and ). If `A` is real with no negative eigenvalues, then the real Schur form is computed. Otherwise, the complex Schur form is computed. Then the upper (quasi-)triangular algorithm in is used on the upper (quasi-)triangular factor.

**Examples**


```julia
julia> A = Matrix(2.7182818*I, 2, 2)
2×2 Matrix{Float64}:
 2.71828  0.0
 0.0      2.71828

julia> log(A)
2×2 Matrix{Float64}:
 1.0  0.0
 0.0  1.0
```

```julia
sqrt(A::AbstractMatrix)
```
If `A` has no negative real eigenvalues, compute the principal matrix square root of `A`, that is the unique matrix $X$ with eigenvalues having positive real part such that $X^2 = A$. Otherwise, a nonprincipal square root is returned.

If `A` is real-symmetric or Hermitian, its eigendecomposition ([`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen)) is used to compute the square root. For such matrices, eigenvalues λ that appear to be slightly negative due to roundoff errors are treated as if they were zero. More precisely, matrices with all eigenvalues `≥ -rtol*(max |λ|)` are treated as semidefinite (yielding a Hermitian square root), with negative eigenvalues taken to be zero. `rtol` is a keyword argument to `sqrt` (in the Hermitian/real-symmetric case only) that defaults to machine precision scaled by `size(A,1)`.

Otherwise, the square root is determined by means of the Björck-Hammarling method , which computes the complex Schur form ([`schur`](https://docs.julialang.org/#LinearAlgebra.schur)) and then the complex square root of the triangular factor. If a real square root exists, then an extension of this method that computes the real Schur form and then the real square root of the quasi-triangular factor is instead used.

**Examples**


```julia
julia> A = [4 0; 0 4]
2×2 Matrix{Int64}:
 4  0
 0  4

julia> sqrt(A)
2×2 Matrix{Float64}:
 2.0  0.0
 0.0  2.0
```

```julia
cos(A::AbstractMatrix)
```
Compute the matrix cosine of a square matrix `A`.

If `A` is symmetric or Hermitian, its eigendecomposition ([`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen)) is used to compute the cosine. Otherwise, the cosine is determined by calling [`exp`](https://docs.julialang.org/../../base/math/#Base.exp-Tuple%7BFloat64%7D).

**Examples**


```julia
julia> cos(fill(1.0, (2,2)))
2×2 Matrix{Float64}:
  0.291927  -0.708073
 -0.708073   0.291927
```

```julia
sin(A::AbstractMatrix)
```
Compute the matrix sine of a square matrix `A`.

If `A` is symmetric or Hermitian, its eigendecomposition ([`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen)) is used to compute the sine. Otherwise, the sine is determined by calling [`exp`](https://docs.julialang.org/../../base/math/#Base.exp-Tuple%7BFloat64%7D).

**Examples**


```julia
julia> sin(fill(1.0, (2,2)))
2×2 Matrix{Float64}:
 0.454649  0.454649
 0.454649  0.454649
```

```julia
sincos(A::AbstractMatrix)
```
Compute the matrix sine and cosine of a square matrix `A`.

**Examples**


```julia
julia> S, C = sincos(fill(1.0, (2,2)));

julia> S
2×2 Matrix{Float64}:
 0.454649  0.454649
 0.454649  0.454649

julia> C
2×2 Matrix{Float64}:
  0.291927  -0.708073
 -0.708073   0.291927
```

```julia
tan(A::AbstractMatrix)
```
Compute the matrix tangent of a square matrix `A`.

If `A` is symmetric or Hermitian, its eigendecomposition ([`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen)) is used to compute the tangent. Otherwise, the tangent is determined by calling [`exp`](https://docs.julialang.org/../../base/math/#Base.exp-Tuple%7BFloat64%7D).

**Examples**


```julia
julia> tan(fill(1.0, (2,2)))
2×2 Matrix{Float64}:
 -1.09252  -1.09252
 -1.09252  -1.09252
```

```julia
sec(A::AbstractMatrix)
```
Compute the matrix secant of a square matrix `A`.


```julia
csc(A::AbstractMatrix)
```
Compute the matrix cosecant of a square matrix `A`.


```julia
cot(A::AbstractMatrix)
```
Compute the matrix cotangent of a square matrix `A`.


```julia
cosh(A::AbstractMatrix)
```
Compute the matrix hyperbolic cosine of a square matrix `A`.


```julia
sinh(A::AbstractMatrix)
```
Compute the matrix hyperbolic sine of a square matrix `A`.


```julia
tanh(A::AbstractMatrix)
```
Compute the matrix hyperbolic tangent of a square matrix `A`.


```julia
sech(A::AbstractMatrix)
```
Compute the matrix hyperbolic secant of square matrix `A`.


```julia
csch(A::AbstractMatrix)
```
Compute the matrix hyperbolic cosecant of square matrix `A`.


```julia
coth(A::AbstractMatrix)
```
Compute the matrix hyperbolic cotangent of square matrix `A`.


```julia
acos(A::AbstractMatrix)
```
Compute the inverse matrix cosine of a square matrix `A`.

If `A` is symmetric or Hermitian, its eigendecomposition ([`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen)) is used to compute the inverse cosine. Otherwise, the inverse cosine is determined by using [`log`](https://docs.julialang.org/../../base/math/#Base.log-Tuple%7BNumber%7D) and [`sqrt`](https://docs.julialang.org/../../base/math/#Base.sqrt-Tuple%7BNumber%7D). For the theory and logarithmic formulas used to compute this function, see .

**Examples**


```julia
julia> acos(cos([0.5 0.1; -0.2 0.3]))
2×2 Matrix{ComplexF64}:
  0.5-8.32667e-17im  0.1+0.0im
 -0.2+2.63678e-16im  0.3-3.46945e-16im
```

```julia
asin(A::AbstractMatrix)
```
Compute the inverse matrix sine of a square matrix `A`.

If `A` is symmetric or Hermitian, its eigendecomposition ([`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen)) is used to compute the inverse sine. Otherwise, the inverse sine is determined by using [`log`](https://docs.julialang.org/../../base/math/#Base.log-Tuple%7BNumber%7D) and [`sqrt`](https://docs.julialang.org/../../base/math/#Base.sqrt-Tuple%7BNumber%7D). For the theory and logarithmic formulas used to compute this function, see .

**Examples**


```julia
julia> asin(sin([0.5 0.1; -0.2 0.3]))
2×2 Matrix{ComplexF64}:
  0.5-4.16334e-17im  0.1-5.55112e-17im
 -0.2+9.71445e-17im  0.3-1.249e-16im
```

```julia
atan(A::AbstractMatrix)
```
Compute the inverse matrix tangent of a square matrix `A`.

If `A` is symmetric or Hermitian, its eigendecomposition ([`eigen`](https://docs.julialang.org/#LinearAlgebra.eigen)) is used to compute the inverse tangent. Otherwise, the inverse tangent is determined by using [`log`](https://docs.julialang.org/../../base/math/#Base.log-Tuple%7BNumber%7D). For the theory and logarithmic formulas used to compute this function, see .

**Examples**


```julia
julia> atan(tan([0.5 0.1; -0.2 0.3]))
2×2 Matrix{ComplexF64}:
  0.5+1.38778e-17im  0.1-2.77556e-17im
 -0.2+6.93889e-17im  0.3-4.16334e-17im
```

```julia
asec(A::AbstractMatrix)
```
Compute the inverse matrix secant of `A`. 


```julia
acsc(A::AbstractMatrix)
```
Compute the inverse matrix cosecant of `A`. 


```julia
acot(A::AbstractMatrix)
```
Compute the inverse matrix cotangent of `A`. 


```julia
acosh(A::AbstractMatrix)
```
Compute the inverse hyperbolic matrix cosine of a square matrix `A`. For the theory and logarithmic formulas used to compute this function, see .


```julia
asinh(A::AbstractMatrix)
```
Compute the inverse hyperbolic matrix sine of a square matrix `A`. For the theory and logarithmic formulas used to compute this function, see .


```julia
atanh(A::AbstractMatrix)
```
Compute the inverse hyperbolic matrix tangent of a square matrix `A`. For the theory and logarithmic formulas used to compute this function, see .


```julia
asech(A::AbstractMatrix)
```
Compute the inverse matrix hyperbolic secant of `A`. 


```julia
acsch(A::AbstractMatrix)
```
Compute the inverse matrix hyperbolic cosecant of `A`. 


```julia
acoth(A::AbstractMatrix)
```
Compute the inverse matrix hyperbolic cotangent of `A`. 


```julia
lyap(A, C)
```
Computes the solution `X` to the continuous Lyapunov equation `AX + XA' + C = 0`, where no eigenvalue of `A` has a zero real part and no two eigenvalues are negative complex conjugates of each other.

**Examples**


```julia
julia> A = [3. 4.; 5. 6]
2×2 Matrix{Float64}:
 3.0  4.0
 5.0  6.0

julia> B = [1. 1.; 1. 2.]
2×2 Matrix{Float64}:
 1.0  1.0
 1.0  2.0

julia> X = lyap(A, B)
2×2 Matrix{Float64}:
  0.5  -0.5
 -0.5   0.25

julia> A*X + X*A' + B
2×2 Matrix{Float64}:
 0.0          6.66134e-16
 6.66134e-16  8.88178e-16
```

```julia
sylvester(A, B, C)
```
Computes the solution `X` to the Sylvester equation `AX + XB + C = 0`, where `A`, `B` and `C` have compatible dimensions and `A` and `-B` have no eigenvalues with equal real part.

**Examples**


```julia
julia> A = [3. 4.; 5. 6]
2×2 Matrix{Float64}:
 3.0  4.0
 5.0  6.0

julia> B = [1. 1.; 1. 2.]
2×2 Matrix{Float64}:
 1.0  1.0
 1.0  2.0

julia> C = [1. 2.; -2. 1]
2×2 Matrix{Float64}:
  1.0  2.0
 -2.0  1.0

julia> X = sylvester(A, B, C)
2×2 Matrix{Float64}:
 -4.46667   1.93333
  3.73333  -1.8

julia> A*X + X*B + C
2×2 Matrix{Float64}:
  2.66454e-15  1.77636e-15
 -3.77476e-15  4.44089e-16
```

```julia
issuccess(F::Factorization)
```
Test that a factorization of a matrix succeeded.

`issuccess(::CholeskyPivoted)` requires Julia 1.6 or later.


```julia
julia> F = cholesky([1 0; 0 1]);

julia> LinearAlgebra.issuccess(F)
true

julia> F = lu([1 0; 0 0]; check = false);

julia> LinearAlgebra.issuccess(F)
false
```

```julia
issymmetric(A) -> Bool
```
Test whether a matrix is symmetric.

**Examples**


```julia
julia> a = [1 2; 2 -1]
2×2 Matrix{Int64}:
 1   2
 2  -1

julia> issymmetric(a)
true

julia> b = [1 im; -im 1]
2×2 Matrix{Complex{Int64}}:
 1+0im  0+1im
 0-1im  1+0im

julia> issymmetric(b)
false
```

```julia
isposdef(A) -> Bool
```
Test whether a matrix is positive definite (and Hermitian) by trying to perform a Cholesky factorization of `A`.

See also [`isposdef!`](https://docs.julialang.org/#LinearAlgebra.isposdef!), [`cholesky`](https://docs.julialang.org/#LinearAlgebra.cholesky).

**Examples**


```julia
julia> A = [1 2; 2 50]
2×2 Matrix{Int64}:
 1   2
 2  50

julia> isposdef(A)
true
```

```julia
isposdef!(A) -> Bool
```
Test whether a matrix is positive definite (and Hermitian) by trying to perform a Cholesky factorization of `A`, overwriting `A` in the process. See also [`isposdef`](https://docs.julialang.org/#LinearAlgebra.isposdef).

**Examples**


```julia
julia> A = [1. 2.; 2. 50.];

julia> isposdef!(A)
true

julia> A
2×2 Matrix{Float64}:
 1.0  2.0
 2.0  6.78233
```

```julia
istril(A::AbstractMatrix, k::Integer = 0) -> Bool
```
Test whether `A` is lower triangular starting from the `k`th superdiagonal.

**Examples**


```julia
julia> a = [1 2; 2 -1]
2×2 Matrix{Int64}:
 1   2
 2  -1

julia> istril(a)
false

julia> istril(a, 1)
true

julia> b = [1 0; -im -1]
2×2 Matrix{Complex{Int64}}:
 1+0im   0+0im
 0-1im  -1+0im

julia> istril(b)
true

julia> istril(b, -1)
false
```

```julia
istriu(A::AbstractMatrix, k::Integer = 0) -> Bool
```
Test whether `A` is upper triangular starting from the `k`th superdiagonal.

**Examples**


```julia
julia> a = [1 2; 2 -1]
2×2 Matrix{Int64}:
 1   2
 2  -1

julia> istriu(a)
false

julia> istriu(a, -1)
true

julia> b = [1 im; 0 -1]
2×2 Matrix{Complex{Int64}}:
 1+0im   0+1im
 0+0im  -1+0im

julia> istriu(b)
true

julia> istriu(b, 1)
false
```

```julia
isdiag(A) -> Bool
```
Test whether a matrix is diagonal.

**Examples**


```julia
julia> a = [1 2; 2 -1]
2×2 Matrix{Int64}:
 1   2
 2  -1

julia> isdiag(a)
false

julia> b = [im 0; 0 -im]
2×2 Matrix{Complex{Int64}}:
 0+1im  0+0im
 0+0im  0-1im

julia> isdiag(b)
true
```

```julia
ishermitian(A) -> Bool
```
Test whether a matrix is Hermitian.

**Examples**


```julia
julia> a = [1 2; 2 -1]
2×2 Matrix{Int64}:
 1   2
 2  -1

julia> ishermitian(a)
true

julia> b = [1 im; -im 1]
2×2 Matrix{Complex{Int64}}:
 1+0im  0+1im
 0-1im  1+0im

julia> ishermitian(b)
true
```

```julia
transpose(A)
```
Lazy transpose. Mutating the returned object should appropriately mutate `A`. Often, but not always, yields `Transpose(A)`, where `Transpose` is a lazy transpose wrapper. Note that this operation is recursive.

This operation is intended for linear algebra usage - for general data manipulation see [`permutedims`](https://docs.julialang.org/../../base/arrays/#Base.permutedims), which is non-recursive.

**Examples**


```julia
julia> A = [3+2im 9+2im; 8+7im  4+6im]
2×2 Matrix{Complex{Int64}}:
 3+2im  9+2im
 8+7im  4+6im

julia> transpose(A)
2×2 transpose(::Matrix{Complex{Int64}}) with eltype Complex{Int64}:
 3+2im  8+7im
 9+2im  4+6im
```

```julia
transpose!(dest,src)
```
Transpose array `src` and store the result in the preallocated array `dest`, which should have a size corresponding to `(size(src,2),size(src,1))`. No in-place transposition is supported and unexpected results will happen if `src` and `dest` have overlapping memory regions.

**Examples**


```julia
julia> A = [3+2im 9+2im; 8+7im  4+6im]
2×2 Matrix{Complex{Int64}}:
 3+2im  9+2im
 8+7im  4+6im

julia> B = zeros(Complex{Int64}, 2, 2)
2×2 Matrix{Complex{Int64}}:
 0+0im  0+0im
 0+0im  0+0im

julia> transpose!(B, A);

julia> B
2×2 Matrix{Complex{Int64}}:
 3+2im  8+7im
 9+2im  4+6im

julia> A
2×2 Matrix{Complex{Int64}}:
 3+2im  9+2im
 8+7im  4+6im
```

```julia
Transpose
```
Lazy wrapper type for a transpose view of the underlying linear algebra object, usually an `AbstractVector`/`AbstractMatrix`, but also some `Factorization`, for instance. Usually, the `Transpose` constructor should not be called directly, use [`transpose`](https://docs.julialang.org/#Base.transpose) instead. To materialize the view use [`copy`](https://docs.julialang.org/../../base/base/#Base.copy).

This type is intended for linear algebra usage - for general data manipulation see [`permutedims`](https://docs.julialang.org/../../base/arrays/#Base.permutedims).

**Examples**


```julia
julia> A = [3+2im 9+2im; 8+7im  4+6im]
2×2 Matrix{Complex{Int64}}:
 3+2im  9+2im
 8+7im  4+6im

julia> transpose(A)
2×2 transpose(::Matrix{Complex{Int64}}) with eltype Complex{Int64}:
 3+2im  8+7im
 9+2im  4+6im
```

```julia
A'
adjoint(A)
```
Lazy adjoint (conjugate transposition). Note that `adjoint` is applied recursively to elements.

For number types, `adjoint` returns the complex conjugate, and therefore it is equivalent to the identity function for real numbers.

This operation is intended for linear algebra usage - for general data manipulation see [`permutedims`](https://docs.julialang.org/../../base/arrays/#Base.permutedims).

**Examples**


```julia
julia> A = [3+2im 9+2im; 8+7im  4+6im]
2×2 Matrix{Complex{Int64}}:
 3+2im  9+2im
 8+7im  4+6im

julia> adjoint(A)
2×2 adjoint(::Matrix{Complex{Int64}}) with eltype Complex{Int64}:
 3-2im  8-7im
 9-2im  4-6im

julia> x = [3, 4im]
2-element Vector{Complex{Int64}}:
 3 + 0im
 0 + 4im

julia> x'x
25 + 0im
```

```julia
adjoint!(dest,src)
```
Conjugate transpose array `src` and store the result in the preallocated array `dest`, which should have a size corresponding to `(size(src,2),size(src,1))`. No in-place transposition is supported and unexpected results will happen if `src` and `dest` have overlapping memory regions.

**Examples**


```julia
julia> A = [3+2im 9+2im; 8+7im  4+6im]
2×2 Matrix{Complex{Int64}}:
 3+2im  9+2im
 8+7im  4+6im

julia> B = zeros(Complex{Int64}, 2, 2)
2×2 Matrix{Complex{Int64}}:
 0+0im  0+0im
 0+0im  0+0im

julia> adjoint!(B, A);

julia> B
2×2 Matrix{Complex{Int64}}:
 3-2im  8-7im
 9-2im  4-6im

julia> A
2×2 Matrix{Complex{Int64}}:
 3+2im  9+2im
 8+7im  4+6im
```

```julia
Adjoint
```
Lazy wrapper type for an adjoint view of the underlying linear algebra object, usually an `AbstractVector`/`AbstractMatrix`, but also some `Factorization`, for instance. Usually, the `Adjoint` constructor should not be called directly, use [`adjoint`](https://docs.julialang.org/#Base.adjoint) instead. To materialize the view use [`copy`](https://docs.julialang.org/../../base/base/#Base.copy).

This type is intended for linear algebra usage - for general data manipulation see [`permutedims`](https://docs.julialang.org/../../base/arrays/#Base.permutedims).

**Examples**


```julia
julia> A = [3+2im 9+2im; 8+7im  4+6im]
2×2 Matrix{Complex{Int64}}:
 3+2im  9+2im
 8+7im  4+6im

julia> adjoint(A)
2×2 adjoint(::Matrix{Complex{Int64}}) with eltype Complex{Int64}:
 3-2im  8-7im
 9-2im  4-6im
```

```julia
copy(A::Transpose)
copy(A::Adjoint)
```
Eagerly evaluate the lazy matrix transpose/adjoint. Note that the transposition is applied recursively to elements.

This operation is intended for linear algebra usage - for general data manipulation see [`permutedims`](https://docs.julialang.org/../../base/arrays/#Base.permutedims), which is non-recursive.

**Examples**


```julia
julia> A = [1 2im; -3im 4]
2×2 Matrix{Complex{Int64}}:
 1+0im  0+2im
 0-3im  4+0im

julia> T = transpose(A)
2×2 transpose(::Matrix{Complex{Int64}}) with eltype Complex{Int64}:
 1+0im  0-3im
 0+2im  4+0im

julia> copy(T)
2×2 Matrix{Complex{Int64}}:
 1+0im  0-3im
 0+2im  4+0im
```

```julia
stride1(A) -> Int
```
Return the distance between successive array elements in dimension 1 in units of element size.

**Examples**


```julia
julia> A = [1,2,3,4]
4-element Vector{Int64}:
 1
 2
 3
 4

julia> LinearAlgebra.stride1(A)
1

julia> B = view(A, 2:2:4)
2-element view(::Vector{Int64}, 2:2:4) with eltype Int64:
 2
 4

julia> LinearAlgebra.stride1(B)
2
```

```julia
LinearAlgebra.checksquare(A)
```
Check that a matrix is square, then return its common dimension. For multiple arguments, return a vector.

**Examples**


```julia
julia> A = fill(1, (4,4)); B = fill(1, (5,5));

julia> LinearAlgebra.checksquare(A, B)
2-element Vector{Int64}:
 4
 5
```

```julia
LinearAlgebra.peakflops(n::Integer=2000; parallel::Bool=false)
```
`peakflops` computes the peak flop rate of the computer by using double precision [`gemm!`](https://docs.julialang.org/#LinearAlgebra.BLAS.gemm!). By default, if no arguments are specified, it multiplies a matrix of size `n x n`, where `n = 2000`. If the underlying BLAS is using multiple threads, higher flop rates are realized. The number of BLAS threads can be set with [`BLAS.set_num_threads(n)`](https://docs.julialang.org/#LinearAlgebra.BLAS.set_num_threads).

If the keyword argument `parallel` is set to `true`, `peakflops` is run in parallel on all the worker processors. The flop rate of the entire parallel computer is returned. When running in parallel, only 1 BLAS thread is used. The argument `n` still refers to the size of the problem that is solved on each processor.

This function requires at least Julia 1.1. In Julia 1.0 it is available from the standard library `InteractiveUtils`.

In many cases there are in-place versions of matrix operations that allow you to supply a pre-allocated output vector or matrix. This is useful when optimizing critical code in order to avoid the overhead of repeated allocations. These in-place operations are suffixed with `!` below (e.g. `mul!`) according to the usual Julia convention.


```julia
mul!(Y, A, B) -> Y
```
Calculates the matrix-matrix or matrix-vector product $AB$ and stores the result in `Y`, overwriting the existing value of `Y`. Note that `Y` must not be aliased with either `A` or `B`.

**Examples**


```julia
julia> A=[1.0 2.0; 3.0 4.0]; B=[1.0 1.0; 1.0 1.0]; Y = similar(B); mul!(Y, A, B);

julia> Y
2×2 Matrix{Float64}:
 3.0  3.0
 7.0  7.0
```
**Implementation**

For custom matrix and vector types, it is recommended to implement 5-argument `mul!` rather than implementing 3-argument `mul!` directly if possible.


```julia
mul!(C, A, B, α, β) -> C
```
Combined inplace matrix-matrix or matrix-vector multiply-add $A B α + C β$. The result is stored in `C` by overwriting it. Note that `C` must not be aliased with either `A` or `B`.

Five-argument `mul!` requires at least Julia 1.3.

**Examples**


```julia
julia> A=[1.0 2.0; 3.0 4.0]; B=[1.0 1.0; 1.0 1.0]; C=[1.0 2.0; 3.0 4.0];

julia> mul!(C, A, B, 100.0, 10.0) === C
true

julia> C
2×2 Matrix{Float64}:
 310.0  320.0
 730.0  740.0
```

```julia
lmul!(a::Number, B::AbstractArray)
```
Scale an array `B` by a scalar `a` overwriting `B` in-place. Use [`rmul!`](https://docs.julialang.org/#LinearAlgebra.rmul!) to multiply scalar from right. The scaling operation respects the semantics of the multiplication [`*`](https://docs.julialang.org/../../base/math/#Base.:*-Tuple%7BAny,%20Vararg%7BAny%7D%7D) between `a` and an element of `B`. In particular, this also applies to multiplication involving non-finite numbers such as `NaN` and `±Inf`.

Prior to Julia 1.1, `NaN` and `±Inf` entries in `B` were treated inconsistently.

**Examples**


```julia
julia> B = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> lmul!(2, B)
2×2 Matrix{Int64}:
 2  4
 6  8

julia> lmul!(0.0, [Inf])
1-element Vector{Float64}:
 NaN
```

```julia
lmul!(A, B)
```
Calculate the matrix-matrix product $AB$, overwriting `B`, and return the result. Here, `A` must be of special matrix type, like, e.g., [`Diagonal`](https://docs.julialang.org/#LinearAlgebra.Diagonal), [`UpperTriangular`](https://docs.julialang.org/#LinearAlgebra.UpperTriangular) or [`LowerTriangular`](https://docs.julialang.org/#LinearAlgebra.LowerTriangular), or of some orthogonal type, see [`QR`](https://docs.julialang.org/#LinearAlgebra.QR).

**Examples**


```julia
julia> B = [0 1; 1 0];

julia> A = LinearAlgebra.UpperTriangular([1 2; 0 3]);

julia> LinearAlgebra.lmul!(A, B);

julia> B
2×2 Matrix{Int64}:
 2  1
 3  0

julia> B = [1.0 2.0; 3.0 4.0];

julia> F = qr([0 1; -1 0]);

julia> lmul!(F.Q, B)
2×2 Matrix{Float64}:
 3.0  4.0
 1.0  2.0
```

```julia
rmul!(A::AbstractArray, b::Number)
```
Scale an array `A` by a scalar `b` overwriting `A` in-place. Use [`lmul!`](https://docs.julialang.org/#LinearAlgebra.lmul!) to multiply scalar from left. The scaling operation respects the semantics of the multiplication [`*`](https://docs.julialang.org/../../base/math/#Base.:*-Tuple%7BAny,%20Vararg%7BAny%7D%7D) between an element of `A` and `b`. In particular, this also applies to multiplication involving non-finite numbers such as `NaN` and `±Inf`.

Prior to Julia 1.1, `NaN` and `±Inf` entries in `A` were treated inconsistently.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> rmul!(A, 2)
2×2 Matrix{Int64}:
 2  4
 6  8

julia> rmul!([NaN], 0.0)
1-element Vector{Float64}:
 NaN
```

```julia
rmul!(A, B)
```
Calculate the matrix-matrix product $AB$, overwriting `A`, and return the result. Here, `B` must be of special matrix type, like, e.g., [`Diagonal`](https://docs.julialang.org/#LinearAlgebra.Diagonal), [`UpperTriangular`](https://docs.julialang.org/#LinearAlgebra.UpperTriangular) or [`LowerTriangular`](https://docs.julialang.org/#LinearAlgebra.LowerTriangular), or of some orthogonal type, see [`QR`](https://docs.julialang.org/#LinearAlgebra.QR).

**Examples**


```julia
julia> A = [0 1; 1 0];

julia> B = LinearAlgebra.UpperTriangular([1 2; 0 3]);

julia> LinearAlgebra.rmul!(A, B);

julia> A
2×2 Matrix{Int64}:
 0  3
 1  2

julia> A = [1.0 2.0; 3.0 4.0];

julia> F = qr([0 1; -1 0]);

julia> rmul!(A, F.Q)
2×2 Matrix{Float64}:
 2.0  1.0
 4.0  3.0
```

```julia
ldiv!(Y, A, B) -> Y
```
Compute `A  B` in-place and store the result in `Y`, returning the result.

The argument `A` should *not* be a matrix. Rather, instead of matrices it should be a factorization object (e.g. produced by [`factorize`](https://docs.julialang.org/#LinearAlgebra.factorize) or [`cholesky`](https://docs.julialang.org/#LinearAlgebra.cholesky)). The reason for this is that factorization itself is both expensive and typically allocates memory (although it can also be done in-place via, e.g., [`lu!`](https://docs.julialang.org/#LinearAlgebra.lu!)), and performance-critical situations requiring `ldiv!` usually also require fine-grained control over the factorization of `A`.

**Examples**


```julia
julia> A = [1 2.2 4; 3.1 0.2 3; 4 1 2];

julia> X = [1; 2.5; 3];

julia> Y = zero(X);

julia> ldiv!(Y, qr(A), X);

julia> Y
3-element Vector{Float64}:
  0.7128099173553719
 -0.051652892561983674
  0.10020661157024757

julia> AX
3-element Vector{Float64}:
  0.7128099173553719
 -0.05165289256198333
  0.10020661157024785
```

```julia
ldiv!(A, B)
```
Compute `A  B` in-place and overwriting `B` to store the result.

The argument `A` should *not* be a matrix. Rather, instead of matrices it should be a factorization object (e.g. produced by [`factorize`](https://docs.julialang.org/#LinearAlgebra.factorize) or [`cholesky`](https://docs.julialang.org/#LinearAlgebra.cholesky)). The reason for this is that factorization itself is both expensive and typically allocates memory (although it can also be done in-place via, e.g., [`lu!`](https://docs.julialang.org/#LinearAlgebra.lu!)), and performance-critical situations requiring `ldiv!` usually also require fine-grained control over the factorization of `A`.

**Examples**


```julia
julia> A = [1 2.2 4; 3.1 0.2 3; 4 1 2];

julia> X = [1; 2.5; 3];

julia> Y = copy(X);

julia> ldiv!(qr(A), X);

julia> X
3-element Vector{Float64}:
  0.7128099173553719
 -0.051652892561983674
  0.10020661157024757

julia> AY
3-element Vector{Float64}:
  0.7128099173553719
 -0.05165289256198333
  0.10020661157024785
```

```julia
ldiv!(a::Number, B::AbstractArray)
```
Divide each entry in an array `B` by a scalar `a` overwriting `B` in-place. Use [`rdiv!`](https://docs.julialang.org/#LinearAlgebra.rdiv!) to divide scalar from right.

**Examples**


```julia
julia> B = [1.0 2.0; 3.0 4.0]
2×2 Matrix{Float64}:
 1.0  2.0
 3.0  4.0

julia> ldiv!(2.0, B)
2×2 Matrix{Float64}:
 0.5  1.0
 1.5  2.0
```

```julia
rdiv!(A, B)
```
Compute `A / B` in-place and overwriting `A` to store the result.

The argument `B` should *not* be a matrix. Rather, instead of matrices it should be a factorization object (e.g. produced by [`factorize`](https://docs.julialang.org/#LinearAlgebra.factorize) or [`cholesky`](https://docs.julialang.org/#LinearAlgebra.cholesky)). The reason for this is that factorization itself is both expensive and typically allocates memory (although it can also be done in-place via, e.g., [`lu!`](https://docs.julialang.org/#LinearAlgebra.lu!)), and performance-critical situations requiring `rdiv!` usually also require fine-grained control over the factorization of `B`.


```julia
rdiv!(A::AbstractArray, b::Number)
```
Divide each entry in an array `A` by a scalar `b` overwriting `A` in-place. Use [`ldiv!`](https://docs.julialang.org/#LinearAlgebra.ldiv!) to divide scalar from left.

**Examples**


```julia
julia> A = [1.0 2.0; 3.0 4.0]
2×2 Matrix{Float64}:
 1.0  2.0
 3.0  4.0

julia> rdiv!(A, 2.0)
2×2 Matrix{Float64}:
 0.5  1.0
 1.5  2.0
```
In Julia (as in much of scientific computation), dense linear-algebra operations are based on the [LAPACK library](http://www.netlib.org/lapack/), which in turn is built on top of basic linear-algebra building-blocks known as the [BLAS](http://www.netlib.org/blas/). There are highly optimized implementations of BLAS available for every computer architecture, and sometimes in high-performance linear algebra routines it is useful to call the BLAS functions directly.

`LinearAlgebra.BLAS` provides wrappers for some of the BLAS functions. Those BLAS functions that overwrite one of the input arrays have names ending in `'!'`. Usually, a BLAS function has four methods defined, for [`Float64`](https://docs.julialang.org/../../base/numbers/#Core.Float64), [`Float32`](https://docs.julialang.org/../../base/numbers/#Core.Float32), `ComplexF64`, and `ComplexF32` arrays.

Many BLAS functions accept arguments that determine whether to transpose an argument (`trans`), which triangle of a matrix to reference (`uplo` or `ul`), whether the diagonal of a triangular matrix can be assumed to be all ones (`dA`) or which side of a matrix multiplication the input argument belongs on (`side`). The possibilities are:



| `side` | Meaning |
| --- | --- |
| `'L'` | The argument goes on the *left* side of a matrix-matrix operation. |
| `'R'` | The argument goes on the *right* side of a matrix-matrix operation. |



| `uplo`/`ul` | Meaning |
| --- | --- |
| `'U'` | Only the *upper* triangle of the matrix will be used. |
| `'L'` | Only the *lower* triangle of the matrix will be used. |



| `trans`/`tX` | Meaning |
| --- | --- |
| `'N'` | The input matrix `X` is not transposed or conjugated. |
| `'T'` | The input matrix `X` will be transposed. |
| `'C'` | The input matrix `X` will be conjugated and transposed. |



| `diag`/`dX` | Meaning |
| --- | --- |
| `'N'` | The diagonal values of the matrix `X` will be read. |
| `'U'` | The diagonal of the matrix `X` is assumed to be all ones. |

Interface to BLAS subroutines.


```julia
dot(n, X, incx, Y, incy)
```
Dot product of two vectors consisting of `n` elements of array `X` with stride `incx` and `n` elements of array `Y` with stride `incy`.

**Examples**


```julia
julia> BLAS.dot(10, fill(1.0, 10), 1, fill(1.0, 20), 2)
10.0
```

```julia
dotu(n, X, incx, Y, incy)
```
Dot function for two complex vectors consisting of `n` elements of array `X` with stride `incx` and `n` elements of array `Y` with stride `incy`.

**Examples**


```julia
julia> BLAS.dotu(10, fill(1.0im, 10), 1, fill(1.0+im, 20), 2)
-10.0 + 10.0im
```

```julia
dotc(n, X, incx, U, incy)
```
Dot function for two complex vectors, consisting of `n` elements of array `X` with stride `incx` and `n` elements of array `U` with stride `incy`, conjugating the first vector.

**Examples**


```julia
julia> BLAS.dotc(10, fill(1.0im, 10), 1, fill(1.0+im, 20), 2)
10.0 - 10.0im
```

```julia
blascopy!(n, X, incx, Y, incy)
```
Copy `n` elements of array `X` with stride `incx` to array `Y` with stride `incy`. Returns `Y`.


```julia
nrm2(n, X, incx)
```
2-norm of a vector consisting of `n` elements of array `X` with stride `incx`.

**Examples**


```julia
julia> BLAS.nrm2(4, fill(1.0, 8), 2)
2.0

julia> BLAS.nrm2(1, fill(1.0, 8), 2)
1.0
```

```julia
asum(n, X, incx)
```
Sum of the magnitudes of the first `n` elements of array `X` with stride `incx`.

For a real array, the magnitude is the absolute value. For a complex array, the magnitude is the sum of the absolute value of the real part and the absolute value of the imaginary part.

**Examples**


```julia
julia> BLAS.asum(5, fill(1.0im, 10), 2)
5.0

julia> BLAS.asum(2, fill(1.0im, 10), 5)
2.0
```

```julia
axpy!(a, X, Y)
```
Overwrite `Y` with `X*a + Y`, where `a` is a scalar. Return `Y`.

**Examples**


```julia
julia> x = [1; 2; 3];

julia> y = [4; 5; 6];

julia> BLAS.axpy!(2, x, y)
3-element Vector{Int64}:
  6
  9
 12
```

```julia
axpby!(a, X, b, Y)
```
Overwrite `Y` with `X*a + Y*b`, where `a` and `b` are scalars. Return `Y`.

**Examples**


```julia
julia> x = [1., 2, 3];

julia> y = [4., 5, 6];

julia> BLAS.axpby!(2., x, 3., y)
3-element Vector{Float64}:
 14.0
 19.0
 24.0
```

```julia
scal!(n, a, X, incx)
scal!(a, X)
```
Overwrite `X` with `a*X` for the first `n` elements of array `X` with stride `incx`. Returns `X`.

If `n` and `incx` are not provided, `length(X)` and `stride(X,1)` are used.


```julia
scal(n, a, X, incx)
scal(a, X)
```
Return `X` scaled by `a` for the first `n` elements of array `X` with stride `incx`.

If `n` and `incx` are not provided, `length(X)` and `stride(X,1)` are used.


```julia
iamax(n, dx, incx)
iamax(dx)
```
Find the index of the element of `dx` with the maximum absolute value. `n` is the length of `dx`, and `incx` is the stride. If `n` and `incx` are not provided, they assume default values of `n=length(dx)` and `incx=stride1(dx)`.


```julia
ger!(alpha, x, y, A)
```
Rank-1 update of the matrix `A` with vectors `x` and `y` as `alpha*x*y' + A`.


```julia
syr!(uplo, alpha, x, A)
```
Rank-1 update of the symmetric matrix `A` with vector `x` as `alpha*x*transpose(x) + A`. [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) controls which triangle of `A` is updated. Returns `A`.


```julia
syrk!(uplo, trans, alpha, A, beta, C)
```
Rank-k update of the symmetric matrix `C` as `alpha*A*transpose(A) + beta*C` or `alpha*transpose(A)*A + beta*C` according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans). Only the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `C` is used. Returns `C`.


```julia
syrk(uplo, trans, alpha, A)
```
Returns either the upper triangle or the lower triangle of `A`, according to [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo), of `alpha*A*transpose(A)` or `alpha*transpose(A)*A`, according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans).


```julia
syr2k!(uplo, trans, alpha, A, B, beta, C)
```
Rank-2k update of the symmetric matrix `C` as `alpha*A*transpose(B) + alpha*B*transpose(A) + beta*C` or `alpha*transpose(A)*B + alpha*transpose(B)*A + beta*C` according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans). Only the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `C` is used. Returns `C`.


```julia
syr2k(uplo, trans, alpha, A, B)
```
Returns the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `alpha*A*transpose(B) + alpha*B*transpose(A)` or `alpha*transpose(A)*B + alpha*transpose(B)*A`, according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans).


```julia
syr2k(uplo, trans, A, B)
```
Returns the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A*transpose(B) + B*transpose(A)` or `transpose(A)*B + transpose(B)*A`, according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans).


```julia
her!(uplo, alpha, x, A)
```
Methods for complex arrays only. Rank-1 update of the Hermitian matrix `A` with vector `x` as `alpha*x*x' + A`. [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) controls which triangle of `A` is updated. Returns `A`.


```julia
herk!(uplo, trans, alpha, A, beta, C)
```
Methods for complex arrays only. Rank-k update of the Hermitian matrix `C` as `alpha*A*A' + beta*C` or `alpha*A'*A + beta*C` according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans). Only the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `C` is updated. Returns `C`.


```julia
herk(uplo, trans, alpha, A)
```
Methods for complex arrays only. Returns the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `alpha*A*A'` or `alpha*A'*A`, according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans).


```julia
her2k!(uplo, trans, alpha, A, B, beta, C)
```
Rank-2k update of the Hermitian matrix `C` as `alpha*A*B' + alpha*B*A' + beta*C` or `alpha*A'*B + alpha*B'*A + beta*C` according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans). The scalar `beta` has to be real. Only the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `C` is used. Returns `C`.


```julia
her2k(uplo, trans, alpha, A, B)
```
Returns the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `alpha*A*B' + alpha*B*A'` or `alpha*A'*B + alpha*B'*A`, according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans).


```julia
her2k(uplo, trans, A, B)
```
Returns the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A*B' + B*A'` or `A'*B + B'*A`, according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans).


```julia
gbmv!(trans, m, kl, ku, alpha, A, x, beta, y)
```
Update vector `y` as `alpha*A*x + beta*y` or `alpha*A'*x + beta*y` according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans). The matrix `A` is a general band matrix of dimension `m` by `size(A,2)` with `kl` sub-diagonals and `ku` super-diagonals. `alpha` and `beta` are scalars. Return the updated `y`.


```julia
gbmv(trans, m, kl, ku, alpha, A, x)
```
Return `alpha*A*x` or `alpha*A'*x` according to [`trans`](https://docs.julialang.org/#stdlib-blas-trans). The matrix `A` is a general band matrix of dimension `m` by `size(A,2)` with `kl` sub-diagonals and `ku` super-diagonals, and `alpha` is a scalar.


```julia
sbmv!(uplo, k, alpha, A, x, beta, y)
```
Update vector `y` as `alpha*A*x + beta*y` where `A` is a symmetric band matrix of order `size(A,2)` with `k` super-diagonals stored in the argument `A`. The storage layout for `A` is described the reference BLAS module, level-2 BLAS at <http://www.netlib.org/lapack/explore-html/>. Only the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used.

Return the updated `y`.


```julia
sbmv(uplo, k, alpha, A, x)
```
Return `alpha*A*x` where `A` is a symmetric band matrix of order `size(A,2)` with `k` super-diagonals stored in the argument `A`. Only the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used.


```julia
sbmv(uplo, k, A, x)
```
Return `A*x` where `A` is a symmetric band matrix of order `size(A,2)` with `k` super-diagonals stored in the argument `A`. Only the [`uplo`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used.


```julia
gemm!(tA, tB, alpha, A, B, beta, C)
```
Update `C` as `alpha*A*B + beta*C` or the other three variants according to [`tA`](https://docs.julialang.org/#stdlib-blas-trans) and `tB`. Return the updated `C`.


```julia
gemm(tA, tB, alpha, A, B)
```
Return `alpha*A*B` or the other three variants according to [`tA`](https://docs.julialang.org/#stdlib-blas-trans) and `tB`.


```julia
gemm(tA, tB, A, B)
```
Return `A*B` or the other three variants according to [`tA`](https://docs.julialang.org/#stdlib-blas-trans) and `tB`.


```julia
gemv!(tA, alpha, A, x, beta, y)
```
Update the vector `y` as `alpha*A*x + beta*y` or `alpha*A'x + beta*y` according to [`tA`](https://docs.julialang.org/#stdlib-blas-trans). `alpha` and `beta` are scalars. Return the updated `y`.


```julia
gemv(tA, alpha, A, x)
```
Return `alpha*A*x` or `alpha*A'x` according to [`tA`](https://docs.julialang.org/#stdlib-blas-trans). `alpha` is a scalar.


```julia
gemv(tA, A, x)
```
Return `A*x` or `A'x` according to [`tA`](https://docs.julialang.org/#stdlib-blas-trans).


```julia
symm!(side, ul, alpha, A, B, beta, C)
```
Update `C` as `alpha*A*B + beta*C` or `alpha*B*A + beta*C` according to [`side`](https://docs.julialang.org/#stdlib-blas-side). `A` is assumed to be symmetric. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. Return the updated `C`.


```julia
symm(side, ul, alpha, A, B)
```
Return `alpha*A*B` or `alpha*B*A` according to [`side`](https://docs.julialang.org/#stdlib-blas-side). `A` is assumed to be symmetric. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used.


```julia
symm(side, ul, A, B)
```
Return `A*B` or `B*A` according to [`side`](https://docs.julialang.org/#stdlib-blas-side). `A` is assumed to be symmetric. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used.


```julia
symv!(ul, alpha, A, x, beta, y)
```
Update the vector `y` as `alpha*A*x + beta*y`. `A` is assumed to be symmetric. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. `alpha` and `beta` are scalars. Return the updated `y`.


```julia
symv(ul, alpha, A, x)
```
Return `alpha*A*x`. `A` is assumed to be symmetric. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. `alpha` is a scalar.


```julia
symv(ul, A, x)
```
Return `A*x`. `A` is assumed to be symmetric. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used.


```julia
hemm!(side, ul, alpha, A, B, beta, C)
```
Update `C` as `alpha*A*B + beta*C` or `alpha*B*A + beta*C` according to [`side`](https://docs.julialang.org/#stdlib-blas-side). `A` is assumed to be Hermitian. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. Return the updated `C`.


```julia
hemm(side, ul, alpha, A, B)
```
Return `alpha*A*B` or `alpha*B*A` according to [`side`](https://docs.julialang.org/#stdlib-blas-side). `A` is assumed to be Hermitian. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used.


```julia
hemm(side, ul, A, B)
```
Return `A*B` or `B*A` according to [`side`](https://docs.julialang.org/#stdlib-blas-side). `A` is assumed to be Hermitian. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used.


```julia
hemv!(ul, alpha, A, x, beta, y)
```
Update the vector `y` as `alpha*A*x + beta*y`. `A` is assumed to be Hermitian. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. `alpha` and `beta` are scalars. Return the updated `y`.


```julia
hemv(ul, alpha, A, x)
```
Return `alpha*A*x`. `A` is assumed to be Hermitian. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. `alpha` is a scalar.


```julia
hemv(ul, A, x)
```
Return `A*x`. `A` is assumed to be Hermitian. Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used.


```julia
trmm!(side, ul, tA, dA, alpha, A, B)
```
Update `B` as `alpha*A*B` or one of the other three variants determined by [`side`](https://docs.julialang.org/#stdlib-blas-side) and [`tA`](https://docs.julialang.org/#stdlib-blas-trans). Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. [`dA`](https://docs.julialang.org/#stdlib-blas-diag) determines if the diagonal values are read or are assumed to be all ones. Returns the updated `B`.


```julia
trmm(side, ul, tA, dA, alpha, A, B)
```
Returns `alpha*A*B` or one of the other three variants determined by [`side`](https://docs.julialang.org/#stdlib-blas-side) and [`tA`](https://docs.julialang.org/#stdlib-blas-trans). Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. [`dA`](https://docs.julialang.org/#stdlib-blas-diag) determines if the diagonal values are read or are assumed to be all ones.


```julia
trsm!(side, ul, tA, dA, alpha, A, B)
```
Overwrite `B` with the solution to `A*X = alpha*B` or one of the other three variants determined by [`side`](https://docs.julialang.org/#stdlib-blas-side) and [`tA`](https://docs.julialang.org/#stdlib-blas-trans). Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. [`dA`](https://docs.julialang.org/#stdlib-blas-diag) determines if the diagonal values are read or are assumed to be all ones. Returns the updated `B`.


```julia
trsm(side, ul, tA, dA, alpha, A, B)
```
Return the solution to `A*X = alpha*B` or one of the other three variants determined by determined by [`side`](https://docs.julialang.org/#stdlib-blas-side) and [`tA`](https://docs.julialang.org/#stdlib-blas-trans). Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. [`dA`](https://docs.julialang.org/#stdlib-blas-diag) determines if the diagonal values are read or are assumed to be all ones.


```julia
trmv!(ul, tA, dA, A, b)
```
Return `op(A)*b`, where `op` is determined by [`tA`](https://docs.julialang.org/#stdlib-blas-trans). Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. [`dA`](https://docs.julialang.org/#stdlib-blas-diag) determines if the diagonal values are read or are assumed to be all ones. The multiplication occurs in-place on `b`.


```julia
trmv(ul, tA, dA, A, b)
```
Return `op(A)*b`, where `op` is determined by [`tA`](https://docs.julialang.org/#stdlib-blas-trans). Only the [`ul`](https://docs.julialang.org/#stdlib-blas-uplo) triangle of `A` is used. [`dA`](https://docs.julialang.org/#stdlib-blas-diag) determines if the diagonal values are read or are assumed to be all ones.


```julia
trsv!(ul, tA, dA, A, b)
```
Overwrite `b` with the solution to `A*x = b` or one of the other two variants determined by [`tA`](https://docs.julialang.org/#stdlib-blas-trans) and [`ul`](https://docs.julialang.org/#stdlib-blas-uplo). [`dA`](https://docs.julialang.org/#stdlib-blas-diag) determines if the diagonal values are read or are assumed to be all ones. Return the updated `b`.


```julia
trsv(ul, tA, dA, A, b)
```
Return the solution to `A*x = b` or one of the other two variants determined by [`tA`](https://docs.julialang.org/#stdlib-blas-trans) and [`ul`](https://docs.julialang.org/#stdlib-blas-uplo). [`dA`](https://docs.julialang.org/#stdlib-blas-diag) determines if the diagonal values are read or are assumed to be all ones.


```julia
set_num_threads(n::Integer)
set_num_threads(::Nothing)
```
Set the number of threads the BLAS library should use equal to `n::Integer`.

Also accepts `nothing`, in which case julia tries to guess the default number of threads. Passing `nothing` is discouraged and mainly exists for historical reasons.


```julia
get_num_threads()
```
Get the number of threads the BLAS library is using.

`get_num_threads` requires at least Julia 1.6.

`LinearAlgebra.LAPACK` provides wrappers for some of the LAPACK functions for linear algebra. Those functions that overwrite one of the input arrays have names ending in `'!'`.

Usually a function has 4 methods defined, one each for [`Float64`](https://docs.julialang.org/../../base/numbers/#Core.Float64), [`Float32`](https://docs.julialang.org/../../base/numbers/#Core.Float32), `ComplexF64` and `ComplexF32` arrays.

Note that the LAPACK API provided by Julia can and will change in the future. Since this API is not user-facing, there is no commitment to support/deprecate this specific set of functions in future releases.

Interfaces to LAPACK subroutines.


```julia
gbtrf!(kl, ku, m, AB) -> (AB, ipiv)
```
Compute the LU factorization of a banded matrix `AB`. `kl` is the first subdiagonal containing a nonzero band, `ku` is the last superdiagonal containing one, and `m` is the first dimension of the matrix `AB`. Returns the LU factorization in-place and `ipiv`, the vector of pivots used.


```julia
gbtrs!(trans, kl, ku, m, AB, ipiv, B)
```
Solve the equation `AB * X = B`. `trans` determines the orientation of `AB`. It may be `N` (no transpose), `T` (transpose), or `C` (conjugate transpose). `kl` is the first subdiagonal containing a nonzero band, `ku` is the last superdiagonal containing one, and `m` is the first dimension of the matrix `AB`. `ipiv` is the vector of pivots returned from `gbtrf!`. Returns the vector or matrix `X`, overwriting `B` in-place.


```julia
gebal!(job, A) -> (ilo, ihi, scale)
```
Balance the matrix `A` before computing its eigensystem or Schur factorization. `job` can be one of `N` (`A` will not be permuted or scaled), `P` (`A` will only be permuted), `S` (`A` will only be scaled), or `B` (`A` will be both permuted and scaled). Modifies `A` in-place and returns `ilo`, `ihi`, and `scale`. If permuting was turned on, `A[i,j] = 0` if `j > i` and `1 < j < ilo` or `j > ihi`. `scale` contains information about the scaling/permutations performed.


```julia
gebak!(job, side, ilo, ihi, scale, V)
```
Transform the eigenvectors `V` of a matrix balanced using `gebal!` to the unscaled/unpermuted eigenvectors of the original matrix. Modifies `V` in-place. `side` can be `L` (left eigenvectors are transformed) or `R` (right eigenvectors are transformed).


```julia
gebrd!(A) -> (A, d, e, tauq, taup)
```
Reduce `A` in-place to bidiagonal form `A = QBP'`. Returns `A`, containing the bidiagonal matrix `B`; `d`, containing the diagonal elements of `B`; `e`, containing the off-diagonal elements of `B`; `tauq`, containing the elementary reflectors representing `Q`; and `taup`, containing the elementary reflectors representing `P`.


```julia
gelqf!(A, tau)
```
Compute the `LQ` factorization of `A`, `A = LQ`. `tau` contains scalars which parameterize the elementary reflectors of the factorization. `tau` must have length greater than or equal to the smallest dimension of `A`.

Returns `A` and `tau` modified in-place.


```julia
gelqf!(A) -> (A, tau)
```
Compute the `LQ` factorization of `A`, `A = LQ`.

Returns `A`, modified in-place, and `tau`, which contains scalars which parameterize the elementary reflectors of the factorization.


```julia
geqlf!(A, tau)
```
Compute the `QL` factorization of `A`, `A = QL`. `tau` contains scalars which parameterize the elementary reflectors of the factorization. `tau` must have length greater than or equal to the smallest dimension of `A`.

Returns `A` and `tau` modified in-place.


```julia
geqlf!(A) -> (A, tau)
```
Compute the `QL` factorization of `A`, `A = QL`.

Returns `A`, modified in-place, and `tau`, which contains scalars which parameterize the elementary reflectors of the factorization.


```julia
geqrf!(A, tau)
```
Compute the `QR` factorization of `A`, `A = QR`. `tau` contains scalars which parameterize the elementary reflectors of the factorization. `tau` must have length greater than or equal to the smallest dimension of `A`.

Returns `A` and `tau` modified in-place.


```julia
geqrf!(A) -> (A, tau)
```
Compute the `QR` factorization of `A`, `A = QR`.

Returns `A`, modified in-place, and `tau`, which contains scalars which parameterize the elementary reflectors of the factorization.


```julia
geqp3!(A, [jpvt, tau]) -> (A, tau, jpvt)
```
Compute the pivoted `QR` factorization of `A`, `AP = QR` using BLAS level 3. `P` is a pivoting matrix, represented by `jpvt`. `tau` stores the elementary reflectors. The arguments `jpvt` and `tau` are optional and allow for passing preallocated arrays. When passed, `jpvt` must have length greater than or equal to `n` if `A` is an `(m x n)` matrix and `tau` must have length greater than or equal to the smallest dimension of `A`.

`A`, `jpvt`, and `tau` are modified in-place.


```julia
gerqf!(A, tau)
```
Compute the `RQ` factorization of `A`, `A = RQ`. `tau` contains scalars which parameterize the elementary reflectors of the factorization. `tau` must have length greater than or equal to the smallest dimension of `A`.

Returns `A` and `tau` modified in-place.


```julia
gerqf!(A) -> (A, tau)
```
Compute the `RQ` factorization of `A`, `A = RQ`.

Returns `A`, modified in-place, and `tau`, which contains scalars which parameterize the elementary reflectors of the factorization.


```julia
geqrt!(A, T)
```
Compute the blocked `QR` factorization of `A`, `A = QR`. `T` contains upper triangular block reflectors which parameterize the elementary reflectors of the factorization. The first dimension of `T` sets the block size and it must be between 1 and `n`. The second dimension of `T` must equal the smallest dimension of `A`.

Returns `A` and `T` modified in-place.


```julia
geqrt!(A, nb) -> (A, T)
```
Compute the blocked `QR` factorization of `A`, `A = QR`. `nb` sets the block size and it must be between 1 and `n`, the second dimension of `A`.

Returns `A`, modified in-place, and `T`, which contains upper triangular block reflectors which parameterize the elementary reflectors of the factorization.


```julia
geqrt3!(A, T)
```
Recursively computes the blocked `QR` factorization of `A`, `A = QR`. `T` contains upper triangular block reflectors which parameterize the elementary reflectors of the factorization. The first dimension of `T` sets the block size and it must be between 1 and `n`. The second dimension of `T` must equal the smallest dimension of `A`.

Returns `A` and `T` modified in-place.


```julia
geqrt3!(A) -> (A, T)
```
Recursively computes the blocked `QR` factorization of `A`, `A = QR`.

Returns `A`, modified in-place, and `T`, which contains upper triangular block reflectors which parameterize the elementary reflectors of the factorization.


```julia
getrf!(A) -> (A, ipiv, info)
```
Compute the pivoted `LU` factorization of `A`, `A = LU`.

Returns `A`, modified in-place, `ipiv`, the pivoting information, and an `info` code which indicates success (`info = 0`), a singular value in `U` (`info = i`, in which case `U[i,i]` is singular), or an error code (`info < 0`).


```julia
tzrzf!(A) -> (A, tau)
```
Transforms the upper trapezoidal matrix `A` to upper triangular form in-place. Returns `A` and `tau`, the scalar parameters for the elementary reflectors of the transformation.


```julia
ormrz!(side, trans, A, tau, C)
```
Multiplies the matrix `C` by `Q` from the transformation supplied by `tzrzf!`. Depending on `side` or `trans` the multiplication can be left-sided (`side = L, Q*C`) or right-sided (`side = R, C*Q`) and `Q` can be unmodified (`trans = N`), transposed (`trans = T`), or conjugate transposed (`trans = C`). Returns matrix `C` which is modified in-place with the result of the multiplication.


```julia
gels!(trans, A, B) -> (F, B, ssr)
```
Solves the linear equation `A * X = B`, `transpose(A) * X = B`, or `adjoint(A) * X = B` using a QR or LQ factorization. Modifies the matrix/vector `B` in place with the solution. `A` is overwritten with its `QR` or `LQ` factorization. `trans` may be one of `N` (no modification), `T` (transpose), or `C` (conjugate transpose). `gels!` searches for the minimum norm/least squares solution. `A` may be under or over determined. The solution is returned in `B`.


```julia
gesv!(A, B) -> (B, A, ipiv)
```
Solves the linear equation `A * X = B` where `A` is a square matrix using the `LU` factorization of `A`. `A` is overwritten with its `LU` factorization and `B` is overwritten with the solution `X`. `ipiv` contains the pivoting information for the `LU` factorization of `A`.


```julia
getrs!(trans, A, ipiv, B)
```
Solves the linear equation `A * X = B`, `transpose(A) * X = B`, or `adjoint(A) * X = B` for square `A`. Modifies the matrix/vector `B` in place with the solution. `A` is the `LU` factorization from `getrf!`, with `ipiv` the pivoting information. `trans` may be one of `N` (no modification), `T` (transpose), or `C` (conjugate transpose).


```julia
getri!(A, ipiv)
```
Computes the inverse of `A`, using its `LU` factorization found by `getrf!`. `ipiv` is the pivot information output and `A` contains the `LU` factorization of `getrf!`. `A` is overwritten with its inverse.


```julia
gesvx!(fact, trans, A, AF, ipiv, equed, R, C, B) -> (X, equed, R, C, B, rcond, ferr, berr, work)
```
Solves the linear equation `A * X = B` (`trans = N`), `transpose(A) * X = B` (`trans = T`), or `adjoint(A) * X = B` (`trans = C`) using the `LU` factorization of `A`. `fact` may be `E`, in which case `A` will be equilibrated and copied to `AF`; `F`, in which case `AF` and `ipiv` from a previous `LU` factorization are inputs; or `N`, in which case `A` will be copied to `AF` and then factored. If `fact = F`, `equed` may be `N`, meaning `A` has not been equilibrated; `R`, meaning `A` was multiplied by `Diagonal(R)` from the left; `C`, meaning `A` was multiplied by `Diagonal(C)` from the right; or `B`, meaning `A` was multiplied by `Diagonal(R)` from the left and `Diagonal(C)` from the right. If `fact = F` and `equed = R` or `B` the elements of `R` must all be positive. If `fact = F` and `equed = C` or `B` the elements of `C` must all be positive.

Returns the solution `X`; `equed`, which is an output if `fact` is not `N`, and describes the equilibration that was performed; `R`, the row equilibration diagonal; `C`, the column equilibration diagonal; `B`, which may be overwritten with its equilibrated form `Diagonal(R)*B` (if `trans = N` and `equed = R,B`) or `Diagonal(C)*B` (if `trans = T,C` and `equed = C,B`); `rcond`, the reciprocal condition number of `A` after equilbrating; `ferr`, the forward error bound for each solution vector in `X`; `berr`, the forward error bound for each solution vector in `X`; and `work`, the reciprocal pivot growth factor.


```julia
gesvx!(A, B)
```
The no-equilibration, no-transpose simplification of `gesvx!`.


```julia
gelsd!(A, B, rcond) -> (B, rnk)
```
Computes the least norm solution of `A * X = B` by finding the `SVD` factorization of `A`, then dividing-and-conquering the problem. `B` is overwritten with the solution `X`. Singular values below `rcond` will be treated as zero. Returns the solution in `B` and the effective rank of `A` in `rnk`.


```julia
gelsy!(A, B, rcond) -> (B, rnk)
```
Computes the least norm solution of `A * X = B` by finding the full `QR` factorization of `A`, then dividing-and-conquering the problem. `B` is overwritten with the solution `X`. Singular values below `rcond` will be treated as zero. Returns the solution in `B` and the effective rank of `A` in `rnk`.


```julia
gglse!(A, c, B, d) -> (X,res)
```
Solves the equation `A * x = c` where `x` is subject to the equality constraint `B * x = d`. Uses the formula `||c - A*x||^2 = 0` to solve. Returns `X` and the residual sum-of-squares.


```julia
geev!(jobvl, jobvr, A) -> (W, VL, VR)
```
Finds the eigensystem of `A`. If `jobvl = N`, the left eigenvectors of `A` aren't computed. If `jobvr = N`, the right eigenvectors of `A` aren't computed. If `jobvl = V` or `jobvr = V`, the corresponding eigenvectors are computed. Returns the eigenvalues in `W`, the right eigenvectors in `VR`, and the left eigenvectors in `VL`.


```julia
gesdd!(job, A) -> (U, S, VT)
```
Finds the singular value decomposition of `A`, `A = U * S * V'`, using a divide and conquer approach. If `job = A`, all the columns of `U` and the rows of `V'` are computed. If `job = N`, no columns of `U` or rows of `V'` are computed. If `job = O`, `A` is overwritten with the columns of (thin) `U` and the rows of (thin) `V'`. If `job = S`, the columns of (thin) `U` and the rows of (thin) `V'` are computed and returned separately.


```julia
gesvd!(jobu, jobvt, A) -> (U, S, VT)
```
Finds the singular value decomposition of `A`, `A = U * S * V'`. If `jobu = A`, all the columns of `U` are computed. If `jobvt = A` all the rows of `V'` are computed. If `jobu = N`, no columns of `U` are computed. If `jobvt = N` no rows of `V'` are computed. If `jobu = O`, `A` is overwritten with the columns of (thin) `U`. If `jobvt = O`, `A` is overwritten with the rows of (thin) `V'`. If `jobu = S`, the columns of (thin) `U` are computed and returned separately. If `jobvt = S` the rows of (thin) `V'` are computed and returned separately. `jobu` and `jobvt` can't both be `O`.

Returns `U`, `S`, and `Vt`, where `S` are the singular values of `A`.


```julia
ggsvd!(jobu, jobv, jobq, A, B) -> (U, V, Q, alpha, beta, k, l, R)
```
Finds the generalized singular value decomposition of `A` and `B`, `U'*A*Q = D1*R` and `V'*B*Q = D2*R`. `D1` has `alpha` on its diagonal and `D2` has `beta` on its diagonal. If `jobu = U`, the orthogonal/unitary matrix `U` is computed. If `jobv = V` the orthogonal/unitary matrix `V` is computed. If `jobq = Q`, the orthogonal/unitary matrix `Q` is computed. If `jobu`, `jobv` or `jobq` is `N`, that matrix is not computed. This function is only available in LAPACK versions prior to 3.6.0.


```julia
ggsvd3!(jobu, jobv, jobq, A, B) -> (U, V, Q, alpha, beta, k, l, R)
```
Finds the generalized singular value decomposition of `A` and `B`, `U'*A*Q = D1*R` and `V'*B*Q = D2*R`. `D1` has `alpha` on its diagonal and `D2` has `beta` on its diagonal. If `jobu = U`, the orthogonal/unitary matrix `U` is computed. If `jobv = V` the orthogonal/unitary matrix `V` is computed. If `jobq = Q`, the orthogonal/unitary matrix `Q` is computed. If `jobu`, `jobv`, or `jobq` is `N`, that matrix is not computed. This function requires LAPACK 3.6.0.


```julia
geevx!(balanc, jobvl, jobvr, sense, A) -> (A, w, VL, VR, ilo, ihi, scale, abnrm, rconde, rcondv)
```
Finds the eigensystem of `A` with matrix balancing. If `jobvl = N`, the left eigenvectors of `A` aren't computed. If `jobvr = N`, the right eigenvectors of `A` aren't computed. If `jobvl = V` or `jobvr = V`, the corresponding eigenvectors are computed. If `balanc = N`, no balancing is performed. If `balanc = P`, `A` is permuted but not scaled. If `balanc = S`, `A` is scaled but not permuted. If `balanc = B`, `A` is permuted and scaled. If `sense = N`, no reciprocal condition numbers are computed. If `sense = E`, reciprocal condition numbers are computed for the eigenvalues only. If `sense = V`, reciprocal condition numbers are computed for the right eigenvectors only. If `sense = B`, reciprocal condition numbers are computed for the right eigenvectors and the eigenvectors. If `sense = E,B`, the right and left eigenvectors must be computed.


```julia
ggev!(jobvl, jobvr, A, B) -> (alpha, beta, vl, vr)
```
Finds the generalized eigendecomposition of `A` and `B`. If `jobvl = N`, the left eigenvectors aren't computed. If `jobvr = N`, the right eigenvectors aren't computed. If `jobvl = V` or `jobvr = V`, the corresponding eigenvectors are computed.


```julia
gtsv!(dl, d, du, B)
```
Solves the equation `A * X = B` where `A` is a tridiagonal matrix with `dl` on the subdiagonal, `d` on the diagonal, and `du` on the superdiagonal.

Overwrites `B` with the solution `X` and returns it.


```julia
gttrf!(dl, d, du) -> (dl, d, du, du2, ipiv)
```
Finds the `LU` factorization of a tridiagonal matrix with `dl` on the subdiagonal, `d` on the diagonal, and `du` on the superdiagonal.

Modifies `dl`, `d`, and `du` in-place and returns them and the second superdiagonal `du2` and the pivoting vector `ipiv`.


```julia
gttrs!(trans, dl, d, du, du2, ipiv, B)
```
Solves the equation `A * X = B` (`trans = N`), `transpose(A) * X = B` (`trans = T`), or `adjoint(A) * X = B` (`trans = C`) using the `LU` factorization computed by `gttrf!`. `B` is overwritten with the solution `X`.


```julia
orglq!(A, tau, k = length(tau))
```
Explicitly finds the matrix `Q` of a `LQ` factorization after calling `gelqf!` on `A`. Uses the output of `gelqf!`. `A` is overwritten by `Q`.


```julia
orgqr!(A, tau, k = length(tau))
```
Explicitly finds the matrix `Q` of a `QR` factorization after calling `geqrf!` on `A`. Uses the output of `geqrf!`. `A` is overwritten by `Q`.


```julia
orgql!(A, tau, k = length(tau))
```
Explicitly finds the matrix `Q` of a `QL` factorization after calling `geqlf!` on `A`. Uses the output of `geqlf!`. `A` is overwritten by `Q`.


```julia
orgrq!(A, tau, k = length(tau))
```
Explicitly finds the matrix `Q` of a `RQ` factorization after calling `gerqf!` on `A`. Uses the output of `gerqf!`. `A` is overwritten by `Q`.


```julia
ormlq!(side, trans, A, tau, C)
```
Computes `Q * C` (`trans = N`), `transpose(Q) * C` (`trans = T`), `adjoint(Q) * C` (`trans = C`) for `side = L` or the equivalent right-sided multiplication for `side = R` using `Q` from a `LQ` factorization of `A` computed using `gelqf!`. `C` is overwritten.


```julia
ormqr!(side, trans, A, tau, C)
```
Computes `Q * C` (`trans = N`), `transpose(Q) * C` (`trans = T`), `adjoint(Q) * C` (`trans = C`) for `side = L` or the equivalent right-sided multiplication for `side = R` using `Q` from a `QR` factorization of `A` computed using `geqrf!`. `C` is overwritten.


```julia
ormql!(side, trans, A, tau, C)
```
Computes `Q * C` (`trans = N`), `transpose(Q) * C` (`trans = T`), `adjoint(Q) * C` (`trans = C`) for `side = L` or the equivalent right-sided multiplication for `side = R` using `Q` from a `QL` factorization of `A` computed using `geqlf!`. `C` is overwritten.


```julia
ormrq!(side, trans, A, tau, C)
```
Computes `Q * C` (`trans = N`), `transpose(Q) * C` (`trans = T`), `adjoint(Q) * C` (`trans = C`) for `side = L` or the equivalent right-sided multiplication for `side = R` using `Q` from a `RQ` factorization of `A` computed using `gerqf!`. `C` is overwritten.


```julia
gemqrt!(side, trans, V, T, C)
```
Computes `Q * C` (`trans = N`), `transpose(Q) * C` (`trans = T`), `adjoint(Q) * C` (`trans = C`) for `side = L` or the equivalent right-sided multiplication for `side = R` using `Q` from a `QR` factorization of `A` computed using `geqrt!`. `C` is overwritten.


```julia
posv!(uplo, A, B) -> (A, B)
```
Finds the solution to `A * X = B` where `A` is a symmetric or Hermitian positive definite matrix. If `uplo = U` the upper Cholesky decomposition of `A` is computed. If `uplo = L` the lower Cholesky decomposition of `A` is computed. `A` is overwritten by its Cholesky decomposition. `B` is overwritten with the solution `X`.


```julia
potrf!(uplo, A)
```
Computes the Cholesky (upper if `uplo = U`, lower if `uplo = L`) decomposition of positive-definite matrix `A`. `A` is overwritten and returned with an info code.


```julia
potri!(uplo, A)
```
Computes the inverse of positive-definite matrix `A` after calling `potrf!` to find its (upper if `uplo = U`, lower if `uplo = L`) Cholesky decomposition.

`A` is overwritten by its inverse and returned.


```julia
potrs!(uplo, A, B)
```
Finds the solution to `A * X = B` where `A` is a symmetric or Hermitian positive definite matrix whose Cholesky decomposition was computed by `potrf!`. If `uplo = U` the upper Cholesky decomposition of `A` was computed. If `uplo = L` the lower Cholesky decomposition of `A` was computed. `B` is overwritten with the solution `X`.


```julia
pstrf!(uplo, A, tol) -> (A, piv, rank, info)
```
Computes the (upper if `uplo = U`, lower if `uplo = L`) pivoted Cholesky decomposition of positive-definite matrix `A` with a user-set tolerance `tol`. `A` is overwritten by its Cholesky decomposition.

Returns `A`, the pivots `piv`, the rank of `A`, and an `info` code. If `info = 0`, the factorization succeeded. If `info = i > 0`, then `A` is indefinite or rank-deficient.


```julia
ptsv!(D, E, B)
```
Solves `A * X = B` for positive-definite tridiagonal `A`. `D` is the diagonal of `A` and `E` is the off-diagonal. `B` is overwritten with the solution `X` and returned.


```julia
pttrf!(D, E)
```
Computes the LDLt factorization of a positive-definite tridiagonal matrix with `D` as diagonal and `E` as off-diagonal. `D` and `E` are overwritten and returned.


```julia
pttrs!(D, E, B)
```
Solves `A * X = B` for positive-definite tridiagonal `A` with diagonal `D` and off-diagonal `E` after computing `A`'s LDLt factorization using `pttrf!`. `B` is overwritten with the solution `X`.


```julia
trtri!(uplo, diag, A)
```
Finds the inverse of (upper if `uplo = U`, lower if `uplo = L`) triangular matrix `A`. If `diag = N`, `A` has non-unit diagonal elements. If `diag = U`, all diagonal elements of `A` are one. `A` is overwritten with its inverse.


```julia
trtrs!(uplo, trans, diag, A, B)
```
Solves `A * X = B` (`trans = N`), `transpose(A) * X = B` (`trans = T`), or `adjoint(A) * X = B` (`trans = C`) for (upper if `uplo = U`, lower if `uplo = L`) triangular matrix `A`. If `diag = N`, `A` has non-unit diagonal elements. If `diag = U`, all diagonal elements of `A` are one. `B` is overwritten with the solution `X`.


```julia
trcon!(norm, uplo, diag, A)
```
Finds the reciprocal condition number of (upper if `uplo = U`, lower if `uplo = L`) triangular matrix `A`. If `diag = N`, `A` has non-unit diagonal elements. If `diag = U`, all diagonal elements of `A` are one. If `norm = I`, the condition number is found in the infinity norm. If `norm = O` or `1`, the condition number is found in the one norm.


```julia
trevc!(side, howmny, select, T, VL = similar(T), VR = similar(T))
```
Finds the eigensystem of an upper triangular matrix `T`. If `side = R`, the right eigenvectors are computed. If `side = L`, the left eigenvectors are computed. If `side = B`, both sets are computed. If `howmny = A`, all eigenvectors are found. If `howmny = B`, all eigenvectors are found and backtransformed using `VL` and `VR`. If `howmny = S`, only the eigenvectors corresponding to the values in `select` are computed.


```julia
trrfs!(uplo, trans, diag, A, B, X, Ferr, Berr) -> (Ferr, Berr)
```
Estimates the error in the solution to `A * X = B` (`trans = N`), `transpose(A) * X = B` (`trans = T`), `adjoint(A) * X = B` (`trans = C`) for `side = L`, or the equivalent equations a right-handed `side = R` `X * A` after computing `X` using `trtrs!`. If `uplo = U`, `A` is upper triangular. If `uplo = L`, `A` is lower triangular. If `diag = N`, `A` has non-unit diagonal elements. If `diag = U`, all diagonal elements of `A` are one. `Ferr` and `Berr` are optional inputs. `Ferr` is the forward error and `Berr` is the backward error, each component-wise.


```julia
stev!(job, dv, ev) -> (dv, Zmat)
```
Computes the eigensystem for a symmetric tridiagonal matrix with `dv` as diagonal and `ev` as off-diagonal. If `job = N` only the eigenvalues are found and returned in `dv`. If `job = V` then the eigenvectors are also found and returned in `Zmat`.


```julia
stebz!(range, order, vl, vu, il, iu, abstol, dv, ev) -> (dv, iblock, isplit)
```
Computes the eigenvalues for a symmetric tridiagonal matrix with `dv` as diagonal and `ev` as off-diagonal. If `range = A`, all the eigenvalues are found. If `range = V`, the eigenvalues in the half-open interval `(vl, vu]` are found. If `range = I`, the eigenvalues with indices between `il` and `iu` are found. If `order = B`, eigvalues are ordered within a block. If `order = E`, they are ordered across all the blocks. `abstol` can be set as a tolerance for convergence.


```julia
stegr!(jobz, range, dv, ev, vl, vu, il, iu) -> (w, Z)
```
Computes the eigenvalues (`jobz = N`) or eigenvalues and eigenvectors (`jobz = V`) for a symmetric tridiagonal matrix with `dv` as diagonal and `ev` as off-diagonal. If `range = A`, all the eigenvalues are found. If `range = V`, the eigenvalues in the half-open interval `(vl, vu]` are found. If `range = I`, the eigenvalues with indices between `il` and `iu` are found. The eigenvalues are returned in `w` and the eigenvectors in `Z`.


```julia
stein!(dv, ev_in, w_in, iblock_in, isplit_in)
```
Computes the eigenvectors for a symmetric tridiagonal matrix with `dv` as diagonal and `ev_in` as off-diagonal. `w_in` specifies the input eigenvalues for which to find corresponding eigenvectors. `iblock_in` specifies the submatrices corresponding to the eigenvalues in `w_in`. `isplit_in` specifies the splitting points between the submatrix blocks.


```julia
syconv!(uplo, A, ipiv) -> (A, work)
```
Converts a symmetric matrix `A` (which has been factorized into a triangular matrix) into two matrices `L` and `D`. If `uplo = U`, `A` is upper triangular. If `uplo = L`, it is lower triangular. `ipiv` is the pivot vector from the triangular factorization. `A` is overwritten by `L` and `D`.


```julia
sysv!(uplo, A, B) -> (B, A, ipiv)
```
Finds the solution to `A * X = B` for symmetric matrix `A`. If `uplo = U`, the upper half of `A` is stored. If `uplo = L`, the lower half is stored. `B` is overwritten by the solution `X`. `A` is overwritten by its Bunch-Kaufman factorization. `ipiv` contains pivoting information about the factorization.


```julia
sytrf!(uplo, A) -> (A, ipiv, info)
```
Computes the Bunch-Kaufman factorization of a symmetric matrix `A`. If `uplo = U`, the upper half of `A` is stored. If `uplo = L`, the lower half is stored.

Returns `A`, overwritten by the factorization, a pivot vector `ipiv`, and the error code `info` which is a non-negative integer. If `info` is positive the matrix is singular and the diagonal part of the factorization is exactly zero at position `info`.


```julia
sytri!(uplo, A, ipiv)
```
Computes the inverse of a symmetric matrix `A` using the results of `sytrf!`. If `uplo = U`, the upper half of `A` is stored. If `uplo = L`, the lower half is stored. `A` is overwritten by its inverse.


```julia
sytrs!(uplo, A, ipiv, B)
```
Solves the equation `A * X = B` for a symmetric matrix `A` using the results of `sytrf!`. If `uplo = U`, the upper half of `A` is stored. If `uplo = L`, the lower half is stored. `B` is overwritten by the solution `X`.


```julia
hesv!(uplo, A, B) -> (B, A, ipiv)
```
Finds the solution to `A * X = B` for Hermitian matrix `A`. If `uplo = U`, the upper half of `A` is stored. If `uplo = L`, the lower half is stored. `B` is overwritten by the solution `X`. `A` is overwritten by its Bunch-Kaufman factorization. `ipiv` contains pivoting information about the factorization.


```julia
hetrf!(uplo, A) -> (A, ipiv, info)
```
Computes the Bunch-Kaufman factorization of a Hermitian matrix `A`. If `uplo = U`, the upper half of `A` is stored. If `uplo = L`, the lower half is stored.

Returns `A`, overwritten by the factorization, a pivot vector `ipiv`, and the error code `info` which is a non-negative integer. If `info` is positive the matrix is singular and the diagonal part of the factorization is exactly zero at position `info`.


```julia
hetri!(uplo, A, ipiv)
```
Computes the inverse of a Hermitian matrix `A` using the results of `sytrf!`. If `uplo = U`, the upper half of `A` is stored. If `uplo = L`, the lower half is stored. `A` is overwritten by its inverse.


```julia
hetrs!(uplo, A, ipiv, B)
```
Solves the equation `A * X = B` for a Hermitian matrix `A` using the results of `sytrf!`. If `uplo = U`, the upper half of `A` is stored. If `uplo = L`, the lower half is stored. `B` is overwritten by the solution `X`.


```julia
syev!(jobz, uplo, A)
```
Finds the eigenvalues (`jobz = N`) or eigenvalues and eigenvectors (`jobz = V`) of a symmetric matrix `A`. If `uplo = U`, the upper triangle of `A` is used. If `uplo = L`, the lower triangle of `A` is used.


```julia
syevr!(jobz, range, uplo, A, vl, vu, il, iu, abstol) -> (W, Z)
```
Finds the eigenvalues (`jobz = N`) or eigenvalues and eigenvectors (`jobz = V`) of a symmetric matrix `A`. If `uplo = U`, the upper triangle of `A` is used. If `uplo = L`, the lower triangle of `A` is used. If `range = A`, all the eigenvalues are found. If `range = V`, the eigenvalues in the half-open interval `(vl, vu]` are found. If `range = I`, the eigenvalues with indices between `il` and `iu` are found. `abstol` can be set as a tolerance for convergence.

The eigenvalues are returned in `W` and the eigenvectors in `Z`.


```julia
sygvd!(itype, jobz, uplo, A, B) -> (w, A, B)
```
Finds the generalized eigenvalues (`jobz = N`) or eigenvalues and eigenvectors (`jobz = V`) of a symmetric matrix `A` and symmetric positive-definite matrix `B`. If `uplo = U`, the upper triangles of `A` and `B` are used. If `uplo = L`, the lower triangles of `A` and `B` are used. If `itype = 1`, the problem to solve is `A * x = lambda * B * x`. If `itype = 2`, the problem to solve is `A * B * x = lambda * x`. If `itype = 3`, the problem to solve is `B * A * x = lambda * x`.


```julia
bdsqr!(uplo, d, e_, Vt, U, C) -> (d, Vt, U, C)
```
Computes the singular value decomposition of a bidiagonal matrix with `d` on the diagonal and `e_` on the off-diagonal. If `uplo = U`, `e_` is the superdiagonal. If `uplo = L`, `e_` is the subdiagonal. Can optionally also compute the product `Q' * C`.

Returns the singular values in `d`, and the matrix `C` overwritten with `Q' * C`.


```julia
bdsdc!(uplo, compq, d, e_) -> (d, e, u, vt, q, iq)
```
Computes the singular value decomposition of a bidiagonal matrix with `d` on the diagonal and `e_` on the off-diagonal using a divide and conqueq method. If `uplo = U`, `e_` is the superdiagonal. If `uplo = L`, `e_` is the subdiagonal. If `compq = N`, only the singular values are found. If `compq = I`, the singular values and vectors are found. If `compq = P`, the singular values and vectors are found in compact form. Only works for real types.

Returns the singular values in `d`, and if `compq = P`, the compact singular vectors in `iq`.


```julia
gecon!(normtype, A, anorm)
```
Finds the reciprocal condition number of matrix `A`. If `normtype = I`, the condition number is found in the infinity norm. If `normtype = O` or `1`, the condition number is found in the one norm. `A` must be the result of `getrf!` and `anorm` is the norm of `A` in the relevant norm.


```julia
gehrd!(ilo, ihi, A) -> (A, tau)
```
Converts a matrix `A` to Hessenberg form. If `A` is balanced with `gebal!` then `ilo` and `ihi` are the outputs of `gebal!`. Otherwise they should be `ilo = 1` and `ihi = size(A,2)`. `tau` contains the elementary reflectors of the factorization.


```julia
orghr!(ilo, ihi, A, tau)
```
Explicitly finds `Q`, the orthogonal/unitary matrix from `gehrd!`. `ilo`, `ihi`, `A`, and `tau` must correspond to the input/output to `gehrd!`.


```julia
gees!(jobvs, A) -> (A, vs, w)
```
Computes the eigenvalues (`jobvs = N`) or the eigenvalues and Schur vectors (`jobvs = V`) of matrix `A`. `A` is overwritten by its Schur form.

Returns `A`, `vs` containing the Schur vectors, and `w`, containing the eigenvalues.


```julia
gges!(jobvsl, jobvsr, A, B) -> (A, B, alpha, beta, vsl, vsr)
```
Computes the generalized eigenvalues, generalized Schur form, left Schur vectors (`jobsvl = V`), or right Schur vectors (`jobvsr = V`) of `A` and `B`.

The generalized eigenvalues are returned in `alpha` and `beta`. The left Schur vectors are returned in `vsl` and the right Schur vectors are returned in `vsr`.


```julia
trexc!(compq, ifst, ilst, T, Q) -> (T, Q)
trexc!(ifst, ilst, T, Q) -> (T, Q)
```
Reorder the Schur factorization `T` of a matrix, such that the diagonal block of `T` with row index `ifst` is moved to row index `ilst`. If `compq = V`, the Schur vectors `Q` are reordered. If `compq = N` they are not modified. The 4-arg method calls the 5-arg method with `compq = V`.


```julia
trsen!(job, compq, select, T, Q) -> (T, Q, w, s, sep)
trsen!(select, T, Q) -> (T, Q, w, s, sep)
```
Reorder the Schur factorization of a matrix and optionally finds reciprocal condition numbers. If `job = N`, no condition numbers are found. If `job = E`, only the condition number for this cluster of eigenvalues is found. If `job = V`, only the condition number for the invariant subspace is found. If `job = B` then the condition numbers for the cluster and subspace are found. If `compq = V` the Schur vectors `Q` are updated. If `compq = N` the Schur vectors are not modified. `select` determines which eigenvalues are in the cluster. The 3-arg method calls the 5-arg method with `job = N` and `compq = V`.

Returns `T`, `Q`, reordered eigenvalues in `w`, the condition number of the cluster of eigenvalues `s`, and the condition number of the invariant subspace `sep`.


```julia
tgsen!(select, S, T, Q, Z) -> (S, T, alpha, beta, Q, Z)
```
Reorders the vectors of a generalized Schur decomposition. `select` specifies the eigenvalues in each cluster.


```julia
trsyl!(transa, transb, A, B, C, isgn=1) -> (C, scale)
```
Solves the Sylvester matrix equation `A * X +/- X * B = scale*C` where `A` and `B` are both quasi-upper triangular. If `transa = N`, `A` is not modified. If `transa = T`, `A` is transposed. If `transa = C`, `A` is conjugate transposed. Similarly for `transb` and `B`. If `isgn = 1`, the equation `A * X + X * B = scale * C` is solved. If `isgn = -1`, the equation `A * X - X * B = scale * C` is solved.

Returns `X` (overwriting `C`) and `scale`.





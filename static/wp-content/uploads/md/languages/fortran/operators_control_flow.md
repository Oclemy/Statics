

# Operators and flow control


One of the powerful advantages of computer algorithms, compared to simple mathematical formulae,
comes in the form of program *branching* whereby the program can decide which instructions to
execute next based on a logical condition.


There are two main forms of controlling program flow:




# Logical operators


Before we use a conditional branching operator, we need to be able to form
a logical expression.


To form a logical expression, the following set of relational operators are available:




| Operator   | Alternative   | Description |
| --- | --- | --- |
| `==` | `.eq.` | Tests for equality of two operands |
| `/=` | `.ne.` | Test for inequality of two operands |
| `>`  | `.gt.` | Tests if left operand is strictly greater than right operand |
| `<`  | `.lt.` | Tests if left operand is strictly less than right operand |
| `>=` | `.ge.` | Tests if left operand is greater than or equal to right operand |
| `<=` | `.le.` | Tests if left operand is less than or equal to right operand |


  

as well as the following logical operators:




| Operator   | Description |
| --- | --- |
| `.and.` | TRUE if both left and right operands are TRUE |
| `.or.` | TRUE if either left or right or both operands are TRUE |
| `.not.` | TRUE if right operand is FALSE |
| `.eqv.` | TRUE if left operand has same logical value as right operand |
| `.neqv.` | TRUE if left operand has the opposite logical value as right operand |


  


## Conditional construct (`if`)


In the following examples, a conditional `if` construct is used to print out a
message to describe the nature of the `angle` variable:


**Example:** single branch `if`



```f
if (angle < 90.0) then
 print *, 'Angle is acute'
end if

```


In this first example, the code within the `if` construct is *only executed if* the
test expression (`angle < 90.0`) is true.



Tip


It is good practice to indent code within constructs such as `if` and `do`
to make code more readable.



We can add an alternative branch to the construct using the `else` keyword:


**Example:** two-branch `if`-`else`



```f
if (angle < 90.0) then
 print *, 'Angle is acute'
else
 print *, 'Angle is obtuse'
end if

```


Now there are two *branches* in the `if` construct, but *only one branch is executed* depending
on the logical expression following the `if` keyword.


We can actually add any number of branches using `else if` to specify more conditions:


**Example:** multi-branch `if`-`else if`-`else`



```f
if (angle < 90.0) then
 print *, 'Angle is acute'
else if (angle < 180.0) then
 print *, 'Angle is obtuse'
else
 print *, 'Angle is reflex'
end if

```


When multiple conditional expressions are used, each conditional expression is tested only if none of the previous
expressions have evaluated to true.




## Loop constructs (`do`)


In the following example, a `do` loop construct is used to print out the numbers in
a sequence.
The `do` loop has an integer *counter* variable which is used to track which iteration of the loop
is currently executing. In this example we use a common name for this counter variable: `i`.


When we define the start of the `do` loop, we use our counter variable name followed by an equals (`=`) sign
to specify the start value and final value of our counting variable.


**Example:** `do` loop



```f
integer :: i

do i = 1, 10
 print *, i
end do

```


**Example:** `do` loop with skip



```f
integer :: i

do i = 1, 10, 2
 print *, i ! Print odd numbers
end do

```



### Conditional loop (`do while`)


A condition may be added to a `do` loop with the `while` keyword. The loop will be executed while the condition given
in `while()` evaluates to `.true.`.


**Example:** `do while()` loop



```f
integer :: i

i = 1
do while (i < 11)
 print *, i
 i = i + 1
end do
! Here i = 11

```




### Loop control statements (`exit` and `cycle`)


Most often than not, loops need to be stopped if a condition is met. Fortran provides two executable statements to deal
with such cases.


`exit` is used to quit the loop prematurely. It is usually enclosed inside an `if`.


**Example:** loop with `exit`



```f
integer :: i

do i = 1, 100
 if (i > 10) then
 exit ! Stop printing numbers
 end if
 print *, i
end do
! Here i = 11

```


On the other hand, `cycle` skips whatever is left of the loop and goes into the next cycle.


**Example:** loop with `cycle`



```f
integer :: i

do i = 1, 10
 if (mod(i, 2) == 0) then
 cycle ! Don't print even numbers
 end if
 print *, i
end do

```



Note


When used within nested loops, the `cycle` and `exit` statements operate on the innermost loop.





### Parallelizable loop (`do concurrent`)


The `do concurrent` loop is used to explicitly specify that the *inside of the loop has no interdependencies*; this informs the compiler that it may use parallelization/*SIMD* to speed up execution of the loop and conveys programmer intention more clearly. More specifically, this means
that any given loop iteration does not depend on the prior execution of other loop iterations. It is also necessary that any state changes that may occur must only happen within each `do concurrent` loop.
These requirements place restrictions on what can be placed within the loop body.



> 
> Simply replacing a `do` loop with a `do concurrent` does not guarantee parallel execution.
> The explanation given above does not detail all the requirements that need to be met in order to write a correct `do concurrent` loop.
> Compilers are also free to do as they see fit, meaning they may not optimize the loop (e.g., a small number of iterations doing a simple calculation, like the
> below example).
> In general, compiler flags are required to activate possible parallelization for `do concurrent` loops.
> 
> 
> 


**Example:** `do concurrent()` loop



```f
real, parameter :: pi = 3.14159265
integer, parameter :: n = 10
real :: result_sin(n)
integer :: i

do concurrent (i = 1:n) ! Careful, the syntax is slightly different
 result_sin(i) = sin(i * pi/4.)
end do

print *, result_sin

```














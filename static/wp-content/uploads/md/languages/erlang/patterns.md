

# 4 Pattern Matching


### 4.1  Pattern Matching


Variables are bound to values through the **pattern matching** mechanism. Pattern matching occurs when
 evaluating a function call, case- receive-
 try- expressions and match operator (=) expressions.


In a pattern matching, a left-hand side
 [pattern](https://www.erlang.org/expressions.html#pattern) is matched
 against a right-hand side
 [term](https://www.erlang.org/expressions.html#term). If
 the matching succeeds, any unbound variables in the pattern
 become bound. If the matching fails, a run-time error occurs.


**Examples:**



```erlang

1> X.
** 1:1: variable 'X' is unbound **
2> X = 2.
2
3> X + 1.
3
4> {X, Y} = {1, 2}.
** exception error: no match of right hand side value {1,2}
5> {X, Y} = {2, 3}.
{2,3}
6> Y.
3
```







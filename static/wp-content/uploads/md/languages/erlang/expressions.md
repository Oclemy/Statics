
# 9 Expressions


In this section, all valid Erlang expressions are listed.
 When writing Erlang programs, it is also allowed to use macro-
 and record expressions. However, these expressions are expanded
 during compilation and are in that sense not true Erlang
 expressions. Macro- and record expressions are covered in
 separate sections:
 

<!--#expression-evaluation#-->
### 9.1  Expression Evaluation


All subexpressions are evaluated before an expression itself is
 evaluated, unless explicitly stated otherwise. For example,
 consider the expression:


Expr1 and Expr2, which are also expressions, are
 evaluated first - in any order - before the addition is
 performed.


Many of the operators can only be applied to arguments of a
 certain type. For example, arithmetic operators can only be
 applied to numbers. An argument of the wrong type causes
 a badarg runtime error.

<!--#terms#-->
### 9.2  Terms


The simplest form of expression is a term, that is an integer,
 float, atom, string, list, map, or tuple.
 The return value is the term itself.

<!--#variables#-->
### 9.3  Variables


A variable is an expression. If a variable is bound to a value,
 the return value is this value. Unbound variables are only
 allowed in patterns.


Variables start with an uppercase letter or underscore (_).
 Variables can contain alphanumeric characters, underscore and @.
 


**Examples:**



```erlang

X
Name1
PhoneNumber
Phone_number
_
_Height
```

Variables are bound to values using
 [pattern matching](https://www.erlang.org/patterns.html). Erlang
 uses **single assignment**, that is, a variable can only be bound
 once.


The **anonymous variable** is denoted by underscore (_) and
 can be used when a variable is required but its value can be
 ignored.


**Example:**


Variables starting with underscore (_), for example,
 _Height, are normal variables, not anonymous. However,
 they are ignored by the compiler in the sense that they do not
 generate warnings.


**Example:**


The following code:


can be rewritten to be more readable:


This causes a warning for an unused variable,
 Elem, if the code is compiled with the flag
 warn_unused_vars set. Instead, the code can be rewritten
 to:


Notice that since variables starting with an underscore are
 not anonymous, this matches:


But this fails:


The scope for a variable is its function clause.
 Variables bound in a branch of an if, case, 
 or receive expression must be bound in all branches 
 to have a value outside the expression. Otherwise they
 are regarded as 'unsafe' outside the expression.


For the try expression variable scoping is limited so that
 variables bound in the expression are always 'unsafe' outside 
 the expression.

<!--#patterns#-->
### 9.4  Patterns


A pattern has the same structure as a term but can contain
 unbound variables.


**Example:**



```erlang

Name1
[H|T]
{error,Reason}
```

Patterns are allowed in clause heads, case and
 receive expressions, and match expressions.


#### Match Operator = in Patterns


If Pattern1 and Pattern2 are valid patterns,
 the following is also a valid pattern:


When matched against a term, both Pattern1 and
 Pattern2 are matched against the term. The idea
 behind this feature is to avoid reconstruction of terms.


**Example:**



```erlang

f({connect,From,To,Number,Options}, To) ->
    Signal = {connect,From,To,Number,Options},
    ...;
f(Signal, To) ->
    ignore.
```

can instead be written as



```erlang

f({connect,_,To,_,_} = Signal, To) ->
    ...;
f(Signal, To) ->
    ignore.
```

#### String Prefix in Patterns


When matching strings, the following is a valid pattern:



```erlang

f("prefix" ++ Str) -> ...
```

This is syntactic sugar for the equivalent, but harder to
 read:



```erlang

f([$p,$r,$e,$f,$i,$x | Str]) -> ...
```

#### Expressions in Patterns


An arithmetic expression can be used within a pattern if
 it meets both of the following two conditions:


* It uses only numeric or bitwise operators.
* Its value can be evaluated to a constant when complied.


**Example:**



```erlang

case {Value, Result} of
    {?THRESHOLD+1, ok} -> ...
```

<!--#match#-->
### 9.5  Match


The following matches Expr1, a pattern, against
 Expr2:


If the matching succeeds, any unbound variable in the pattern
 becomes bound and the value of Expr2 is returned.


If the matching fails, a badmatch run-time error occurs.


**Examples:**



```erlang

1> {A, B} = {answer, 42}.
{answer,42}
2> A.
answer
3> {C, D} = [1, 2].
** exception error: no match of right-hand side value [1,2]
```
<!--#function-calls#-->
### 9.6  Function Calls



```erlang

ExprF(Expr1,...,ExprN)
ExprM:ExprF(Expr1,...,ExprN)
```

In the first form of function calls,
 ExprM:ExprF(Expr1,...,ExprN), each of ExprM and
 ExprF must be an atom or an expression that evaluates to
 an atom. The function is said to be called by using the
 **fully qualified function name**. This is often referred
 to as a **remote** or **external function call**.


**Example:**



```erlang
lists:keysearch(Name, 1, List)
```

In the second form of function calls,
 ExprF(Expr1,...,ExprN), ExprF must be an atom or
 evaluate to a fun.


If ExprF is an atom, the function is said to be called by
 using the **implicitly qualified function name**. If the
 function ExprF is locally defined, it is called.
 Alternatively, if ExprF is explicitly imported from the
 M module, M:ExprF(Expr1,...,ExprN) is called. If
 ExprF is neither declared locally nor explicitly
 imported, ExprF must be the name of an automatically
 imported BIF. 


**Examples:**



```erlang
handle(Msg, State)
spawn(m, init, [])
```

**Examples** where ExprF is a fun:



```erlang

1> Fun1 = fun(X) -> X+1 end,
Fun1(3).
4
2> fun lists:append/2([1,2], [3,4]).
[1,2,3,4]
3> 
```

Notice that when calling a local function, there is a difference
 between using the implicitly or fully qualified function name.
 The latter always refers to the latest version of the module.
 See [Compilation and Code Loading](https://www.erlang.org/code_loading.html)  and [Function Evaluation](https://www.erlang.org/functions.html#eval).


#### Local Function Names Clashing With Auto-Imported BIFs


If a local function has the same name as an auto-imported BIF,
 the semantics is that implicitly qualified function calls are
 directed to the locally defined function, not to the BIF. To avoid
 confusion, there is a compiler directive available,
 -compile({no_auto_import,[F/A]}), that makes a BIF not
 being auto-imported. In certain situations, such a compile-directive
 is mandatory.



Warning


Before OTP R14A (ERTS version 5.8), an implicitly
 qualified function call to a function having the same name as an
 auto-imported BIF always resulted in the BIF being called. In
 newer versions of the compiler, the local function is called instead.
 This is to avoid that future additions to the
 set of auto-imported BIFs do not silently change the behavior
 of old code.


However, to avoid that old (pre R14) code changed its
 behavior when compiled with OTP version R14A or later, the
 following restriction applies: If you override the name of a BIF
 that was auto-imported in OTP versions prior to R14A (ERTS version
 5.8) and have an implicitly qualified call to that function in
 your code, you either need to explicitly remove the auto-import
 using a compiler directive, or replace the call with a fully
 qualified function call. Otherwise you get a compilation
 error. See the following example:

 


```erlang
-export([length/1,f/1]).

-compile({no_auto_import,[length/1]}). % erlang:length/1 no longer autoimported

length([]) ->
    0;
length([H|T]) ->
    1 + length(T). %% Calls the local function length/1

f(X) when erlang:length(X) > 3 -> %% Calls erlang:length/1,
                                  %% which is allowed in guards
    long.
```

The same logic applies to explicitly imported functions from
 other modules, as to locally defined functions.
 It is not allowed to both import a
 function from another module and have the function declared in the
 module at the same time:



```erlang
-export([f/1]).

-compile({no_auto_import,[length/1]}). % erlang:length/1 no longer autoimported

-import(mod,[length/1]).

f(X) when erlang:length(X) > 33 -> %% Calls erlang:length/1,
                                   %% which is allowed in guards

    erlang:length(X);              %% Explicit call to erlang:length in body

f(X) ->
    length(X).                     %% mod:length/1 is called
```

For auto-imported BIFs added in Erlang/OTP R14A and thereafter,
 overriding the name with a local function or explicit import is always
 allowed. However, if the -compile({no_auto_import,[F/A])
 directive is not used, the compiler issues a warning whenever
 the function is called in the module using the implicitly qualified
 function name.

<!--#if#-->
### 9.7  If



```erlang

if
    GuardSeq1 ->
        Body1;
    ...;
    GuardSeqN ->
        BodyN
end
```

The branches of an if-expression are scanned sequentially
 until a guard sequence GuardSeq that evaluates to true is
 found. Then the corresponding Body (sequence of expressions
 separated by ',') is evaluated.


The return value of Body is the return value of
 the if expression.


If no guard sequence is evaluated as true,
 an if_clause run-time error
 occurs. If necessary, the guard expression true can be
 used in the last branch, as that guard sequence is always true.


**Example:**



```erlang

is_greater_than(X, Y) ->
    if
        X>Y ->
            true;
        true -> % works as an 'else' branch
            false
    end
```

<!--#case#-->
### 9.8  Case



```erlang

case Expr of
    Pattern1 [when GuardSeq1] ->
        Body1;
    ...;
    PatternN [when GuardSeqN] ->
        BodyN
end
```

The expression Expr is evaluated and the patterns
 Pattern are sequentially matched against the result. If a
 match succeeds and the optional guard sequence GuardSeq is
 true, the corresponding Body is evaluated.


The return value of Body is the return value of
 the case expression.


If there is no matching pattern with a true guard sequence,
 a case_clause run-time error occurs.


**Example:**



```erlang

is_valid_signal(Signal) ->
    case Signal of
        {signal, _What, _From, _To} ->
            true;
        {signal, _What, _To} ->
            true;
        _Else ->
            false
    end.
```

<!--#maybe#-->
### 9.9  Maybe



Note


maybe is an experimental new [feature](https://www.erlang.org/../reference_manual/features.html#features)
 introduced in OTP 25. By default, it is disabled. To enable
 maybe, either use the -feature(maybe_expr,enable)
 directive (from within source code), or the compiler option
 {feature,maybe_expr,enable}. The feature must also be enabled
 in runtime using the -enable-feature option to erl.





```erlang
maybe
    Expr1,
    ...,
    ExprN
end
```

The expressions in a maybe block are evaluated sequentially. If all
 expressions are evaluated successfully, the return value of the maybe
 block is ExprN. However, execution can be short-circuited by a
 conditional match expression:


?= is called the conditional match operator. It is only
 allowed to be used at the top-level of a maybe block. It
 matches the pattern Expr1 against Expr2. If the
 matching succeeds, any unbound variable in the pattern becomes
 bound. If the expression is the last expression in the
 maybe block, it also returns the value of Expr2. If the
 matching is unsuccessful, the rest of the expressions in the maybe
 block are skipped and the return value of the maybe
 block is Expr2.


None of the variables bound in a maybe block must be
 used in the code that follows the block.


Here is an example:



```erlang
maybe
    {ok, A} ?= a(),
    true = A >= 0,
    {ok, B} ?= b(),
    A + B
end
```

Let us first assume that a() returns {ok,42} and
 b() returns {ok,58}. With those return values, all
 of the match operators will succeed, and the return value of the
 maybe block is A + B, which is equal to 42 +
 58 = 100.


Now let us assume that a() returns error. The
 conditional match operator in {ok, A} ?= a() fails to
 match, and the return value of the maybe block is the
 value of the expression that failed to match, namely error.
 Similarly, if b() returns wrong, the return value of
 the maybe block is wrong.


Finally, let us assume that a() returns
 -1. Because true = A >= 0 uses the match operator
 `=`, a {badmatch,false} run-time error occurs when the
 expression fails to match the pattern.


The example can be written in a less succient way using nested
 case expressions:



```erlang
case a() of
    {ok, A} ->
        true = A >= 0,
        case b() of
            {ok, B} ->
                A + B;
            Other1 ->
                Other1
        end;
    Other2 ->
        Other2
end
```

The maybe block can be augmented with else clauses:



```erlang
maybe
    Expr1,
    ...,
    ExprN
else
    Pattern1 [when GuardSeq1] ->
        Body1;
    ...;
    PatternN [when GuardSeqN] ->
        BodyN
end
```

If a conditional match operator fails, the failed expression is
 matched against the patterns in all clauses between the
 else and end keywords. If a match succeeds and the
 optional guard sequence GuardSeq is true, the corresponding
 Body is evaluated. The value returned from the body is the
 return value of the maybe block.


If there is no matching pattern with a true guard sequence,
 an else_clause run-time error occurs.


None of the variables bound in a maybe block must be used in
 the else clauses. None of the variables bound in the else clauses
 must be used in the code that follows the maybe block.


Here is the previous example augmented with a else clauses:



```erlang
maybe
    {ok, A} ?= a(),
    true = A >= 0,
    {ok, B} ?= b(),
    A + B
else
    error -> error;
    wrong -> error
end
```

The else clauses translate the failing value from
 the conditional match operators to the value error. If the
 failing value is not one of the recognized values, a
 else_clause run-time error occurs.

<!--#send#-->
### 9.10  Send


Sends the value of Expr2 as a message to the process
 specified by Expr1. The value of Expr2 is also
 the return value of the expression.


Expr1 must evaluate to a pid, an alias (reference),
 a port, a registered name (atom), or
 a tuple {Name,Node}. Name is an atom and
 Node is a node name, also an atom.


* If Expr1 evaluates to a name, but this name is not
 registered, a badarg run-time error occurs.
* Sending a message to a reference never fails, even if the
 reference is no longer (or never was) an alias.
* Sending a message to a pid never fails, even if the pid
 identifies a non-existing process.
* Distributed message sending, that is, if Expr1
 evaluates to a tuple {Name,Node} (or a pid located at
 another node), also never fails.

<!--#receive#-->
### 9.11  Receive



```erlang

receive
    Pattern1 [when GuardSeq1] ->
        Body1;
    ...;
    PatternN [when GuardSeqN] ->
        BodyN
end
```


 Fetches a received message present in the message queue of
 the process. The first message in the message queue is matched
 sequentially against the patterns from top to bottom. If no
 match was found, the matching sequence is repeated for the second
 message in the queue, and so on. Messages are queued in the
 [order they were
 received](https://www.erlang.org/processes.html#message-queue-order). If a match succeeds, that
 is, if the Pattern matches and the optional guard sequence
 GuardSeq is true, then the message is removed from the message
 queue and the corresponding Body is evaluated. All other
 messages in the message queue remain unchanged.
 


The return value of Body is the return value of
 the receive expression.


receive never fails. The execution is suspended, possibly
 indefinitely, until a message arrives that matches one of
 the patterns and with a true guard sequence. 


**Example:**



```erlang

wait_for_onhook() ->
    receive
        onhook ->
            disconnect(),
            idle();
        {connect, B} ->
            B ! {busy, self()},
            wait_for_onhook()
    end.
```

The receive expression can be augmented with a
 timeout:



```erlang

receive
    Pattern1 [when GuardSeq1] ->
        Body1;
    ...;
    PatternN [when GuardSeqN] ->
        BodyN
after
    ExprT ->
        BodyT
end
```

receive..after works exactly as receive, except
 that if no matching message has arrived within ExprT
 milliseconds, then BodyT is evaluated instead. The
 return value of BodyT then becomes the return value
 of the receive..after expression. ExprT is to
 evaluate to an integer, or the atom infinity. The allowed
 integer range is from 0 to 4294967295, that is, the longest possible
 timeout is almost 50 days. With a zero value the timeout occurs
 immediately if there is no matching message in the message queue.
 



 The atom infinity will make the process wait indefinitely for a
 matching message. This is the same as not using a timeout. It can be
 useful for timeout values that are calculated at runtime.
 


**Example:**



```erlang

wait_for_onhook() ->
    receive
        onhook ->
            disconnect(),
            idle();
        {connect, B} ->
            B ! {busy, self()},
            wait_for_onhook()
    after
        60000 ->
            disconnect(),
            error()
    end.
```

It is legal to use a receive..after expression with no
 branches:



```erlang

receive
after
    ExprT ->
        BodyT
end
```

This construction does not consume any messages, only suspends
 execution in the process for ExprT milliseconds. This can be
 used to implement simple timers.


**Example:**



```erlang

timer() ->
    spawn(m, timer, [self()]).

timer(Pid) ->
    receive
    after
        5000 ->
            Pid ! timeout
    end.
```

<!--#term-comparisons#-->
### 9.12  Term Comparisons





|  |  |
| --- | --- |
| **op** | **Description** |
| == | Equal to |
| /= | Not equal to |
| =< | Less than or equal to |
| < | Less than |
| >= | Greater than or equal to |
| > | Greater than |
| =:= | Exactly equal to |
| =/= | Exactly not equal to |


Table
 9.1:
  
 Term Comparison Operators.



The arguments can be of different data types. The following
 order is defined:



```erlang

number < atom < reference < fun < port < pid < tuple < map < nil < list < bit string
```

nil in the previous expression represents the empty list
 ([]), which is regarded as a separate type from
 list/0. That is why nil < list.
 


Lists are compared element by element. Tuples are ordered by
 size, two tuples with the same size are compared element by
 element.


Bit strings are compared bit by bit. If one bit string is a
 prefix of the other, the shorter bit string is considered smaller.


Maps are ordered by size, two maps with the same size are compared by keys in
 ascending term order and then by values in key order.
 In maps key order integers types are considered less than floats types.
 


Atoms are compared using their string value, codepoint by codepoint.


When comparing an integer to a float, the term with the lesser
 precision is converted into the type of the other term, unless the
 operator is one of =:= or =/=. A float is more precise than
 an integer until all significant figures of the float are to the left of
 the decimal point. This happens when the float is larger/smaller than
 +/-9007199254740992.0. The conversion strategy is changed
 depending on the size of the float because otherwise comparison of large
 floats and integers would lose their transitivity.


Term comparison operators return the Boolean value of the
 expression, true or false.


**Examples:**



```erlang

1> 1==1.0.
true
2> 1=:=1.0.
false
3> 1 > a.
false
4> #{c => 3} > #{a => 1, b => 2}.
false
5> #{a => 1, b => 2} == #{a => 1.0, b => 2.0}.
true
6> <<2:2>> < <<128>>.
true
7> <<3:2>> < <<128>>.
false

```

<!--#arithmetic-expressions#-->
### 9.13  Arithmetic Expressions





|  |  |  |
| --- | --- | --- |
| **Operator** | **Description** | **Argument Type** |
| + | Unary + | Number |
| - | Unary - | Number |
| + |  | number |
| - |  | Number |
| * |  | Number |
| / | Floating point division | Number |
| bnot | Unary bitwise NOT | Integer |
| div | Integer division | Integer |
| rem | Integer remainder of X/Y | Integer |
| band | Bitwise AND | Integer |
| bor | Bitwise OR | Integer |
| bxor | Arithmetic bitwise XOR | Integer |
| bsl | Arithmetic bitshift left | Integer |
| bsr | Bitshift right | Integer |


Table
 9.2:
  
 Arithmetic Operators.



**Examples:**



```erlang

1> +1.
1
2> -1.
-1
3> 1+1.
2
4> 4/2.
2.0
5> 5 div 2.
2
6> 5 rem 2.
1
7> 2#10 band 2#01.
0
8> 2#10 bor 2#01.
3
9> a + 10.
** exception error: an error occurred when evaluating an arithmetic expression
     in operator  +/2
        called as a + 10
10> 1 bsl (1 bsl 64).
** exception error: a system limit has been reached
     in operator  bsl/2
        called as 1 bsl 18446744073709551616
```

<!--#boolean-expressions#-->
### 9.14  Boolean Expressions





|  |  |
| --- | --- |
| **Operator** | **Description** |
| not | Unary logical NOT |
| and | Logical AND |
| or | Logical OR |
| xor | Logical XOR |


Table
 9.3:
  
 Logical Operators.



**Examples:**



```erlang

1> not true.
false
2> true and false.
false
3> true xor false.
true
4> true or garbage.
** exception error: bad argument
     in operator  or/2
        called as true or garbage
```

<!--#short-circuit-expressions#-->
### 9.15  Short-Circuit Expressions



```erlang

Expr1 orelse Expr2
Expr1 andalso Expr2
```

Expr2 is evaluated only if
 necessary. That is, Expr2 is evaluated only if:


or


Returns either the value of Expr1 (that is,
 true or false) or the value of Expr2
 (if Expr2 is evaluated).


**Example 1:**



```erlang

case A >= -1.0 andalso math:sqrt(A+1) > B of
```

This works even if A is less than -1.0,
 since in that case, math:sqrt/1 is never evaluated.


**Example 2:**



```erlang

OnlyOne = is_atom(L) orelse
         (is_list(L) andalso length(L) == 1),
```

From Erlang/OTP R13A, Expr2 is no longer required to evaluate to a
 Boolean value. As a consequence, andalso and orelse
 are now tail-recursive. For instance, the following function is
 tail-recursive in Erlang/OTP R13A and later:



```erlang

all(Pred, [Hd|Tail]) ->
    Pred(Hd) andalso all(Pred, Tail);
all(_, []) ->
    true.
```

<!--#list-operations#-->
### 9.16  List Operations



```erlang

Expr1 ++ Expr2
Expr1 -- Expr2
```

The list concatenation operator ++ appends its second
 argument to its first and returns the resulting list.


The list subtraction operator -- produces a list that
 is a copy of the first argument. The procedure is as follows:
 for each element in the second argument, the first
 occurrence of this element (if any) is removed.


**Example:**



```erlang

1> [1,2,3]++[4,5].
[1,2,3,4,5]
2> [1,2,3,2,1,2]--[2,1,2].
[3,1,2]
```

<!--#map-expressions#-->
### 9.17  Map Expressions


#### Creating Maps



 Constructing a new map is done by letting an expression K be associated with
 another expression V:
 



 New maps can include multiple associations at construction by listing every
 association:
 



```erlang
#{ K1 => V1, .., Kn => Vn }
```


 An empty map is constructed by not associating any terms with each other:
 



 All keys and values in the map are terms. Any expression is first evaluated and
 then the resulting terms are used as **key** and **value** respectively.
 



 Keys and values are separated by the => arrow and associations are
 separated by a comma ,.
 



**Examples:**




```erlang
M0 = #{},                 % empty map
M1 = #{a => <<"hello">>}, % single association with literals
M2 = #{1 => 2, b => b},   % multiple associations with literals
M3 = #{k => {A,B}},       % single association with variables
M4 = #{{"w", 1} => f()}.  % compound key associated with an evaluated expression
```


 Here, A and B are any expressions and M0 through M4
 are the resulting map terms.
 



 If two matching keys are declared, the latter key takes precedence.
 



**Example:**




```erlang

1> #{1 => a, 1 => b}.
#{1 => b }
2> #{1.0 => a, 1 => b}.
#{1 => b, 1.0 => a}

```


 The order in which the expressions constructing the keys (and their
 associated values) are evaluated is not defined. The syntactic order of
 the key-value pairs in the construction is of no relevance, except in
 the recently mentioned case of two matching keys.
 


#### Updating Maps



 Updating a map has a similar syntax as constructing it.
 



 An expression defining the map to be updated, is put in front of the expression
 defining the keys to be updated and their respective values:
 



 Here M is a term of type map and K and V are any expression.
 



 If key K does not match any existing key in the map, a new association
 is created from key K to value V.
 


 If key K matches an existing key in map M,
 its associated value
 is replaced by the new value V. In both cases, the evaluated map expression
 returns a new map.
 



 If M is not of type map, an exception of type badmap is thrown.
 



 To only update an existing value, the following syntax is used:
 



 Here M is a term of type map, V is an expression and K
 is an expression that evaluates to an existing key in M.
 



 If key K does not match any existing keys in map M, an exception
 of type badarg is triggered at runtime. If a matching key K
 is present in map M, its associated value is replaced by the new
 value V, and the evaluated map expression returns a new map.
 



 If M is not of type map, an exception of type badmap is thrown.
 



**Examples:**




```erlang
M0 = #{},
M1 = M0#{a => 0},
M2 = M1#{a => 1, b => 2},
M3 = M2#{"function" => fun() -> f() end},
M4 = M3#{a := 2, b := 3}.  % 'a' and 'b' was added in `M1` and `M2`.
```


 Here M0 is any map. It follows that M1 .. M4 are maps as well.
 



**More examples:**




```erlang

1> M = #{1 => a}.
#{1 => a }
2> M#{1.0 => b}.
#{1 => a, 1.0 => b}.
3> M#{1 := b}.
#{1 => b}
4> M#{1.0 := b}.
** exception error: bad argument

```


 As in construction, the order in which the key and value expressions
 are evaluated is not defined. The
 syntactic order of the key-value pairs in the update is of no
 relevance, except in the case where two keys match.
 In that case, the latter value is used.
 


#### Maps in Patterns



 Matching of key-value associations from maps is done as follows:
 



 Here M is any map. The key K must be a
 [guard
 expression](https://www.erlang.org/#guard_expressions), with all variables already bound.
 V can be any pattern with either bound or unbound
 variables.
 



 If the variable V is unbound, it becomes bound to the value associated
 with the key K, which must exist in the map M. If the variable
 V is bound, it must match the value associated with K in M.
 



Note


Before OTP 23, the expression defining the key
 K was restricted to be either a single variable or a
 literal.



**Example:**



```erlang

1> M = #{"tuple" => {1,2}}.
#{"tuple" => {1,2}}
2> #{"tuple" := {1,B}} = M.
#{"tuple" => {1,2}}
3> B.
2.
```


 This binds variable B to integer 2.
 



 Similarly, multiple values from the map can be matched:
 



```erlang
#{ K1 := V1, .., Kn := Vn } = M
```


 Here keys K1 .. Kn are any expressions with
 literals or bound variables. If all key expressions
 evaluate successfully and all keys exist in map
 M, all variables in V1 .. Vn is
 matched to the associated values of their respective
 keys.
 



 If the matching conditions are not met, the match fails, either with:
 



 Matching in maps only allows for := as delimiters of associations.
 



 The order in which keys are declared in matching has no relevance.
 



 Duplicate keys are allowed in matching and match each pattern associated
 to the keys:
 



```erlang
#{ K := V1, K := V2 } = M
```


 Matching an expression against an empty map literal, matches its type but
 no variables are bound:
 



 This expression matches if the expression Expr is of type map, otherwise
 it fails with an exception badmatch.
 


Here the key to be retrieved is constructed from an expression:



```erlang
#{{tag,length(List)} := V} = Map
```

List must be an already bound variable.


##### Matching Syntax



 Matching of literals as keys are allowed in function heads:
 



```erlang
%% only start if not_started
handle_call(start, From, #{ state := not_started } = S) ->
...
    {reply, ok, S#{ state := start }};

%% only change if started
handle_call(change, From, #{ state := start } = S) ->
...
    {reply, ok, S#{ state := changed }};
```

#### Maps in Guards



 Maps are allowed in guards as long as all subexpressions are valid guard expressions.
 



 The following guard BIFs handle maps:
 

<!--#bit-syntax-expressions#-->
### 9.18  Bit Syntax Expressions


Each element Ei specifies a **segment** of
 the bit string. Each element Ei is a value, followed by an
 optional **size expression** and an optional **type specifier list**.



```erlang

Ei = Value |
     Value:Size |
     Value/TypeSpecifierList |
     Value:Size/TypeSpecifierList
```

Used in a bit string construction, Value is an expression
 that is to evaluate to an integer, float, or bit string. If the
 expression is not a single literal or variable, it
 is to be enclosed in parentheses.


Used in a bit string matching, Value must be a variable,
 or an integer, float, or string.


Notice that, for example, using a string literal as in
 <<"abc">> is syntactic sugar for
 <<$a,$b,$c>>.


Used in a bit string construction, Size is an expression
 that is to evaluate to an integer.


Used in a bit string matching, Size must be a
 [guard expression](https://www.erlang.org/#guard_expressions)
 that evaluates to an integer. All variables in the guard expression
 must be already bound.



Note


Before OTP 23, Size was restricted to be an
 integer or a variable bound to an integer.



The value of Size specifies the size of the segment in
 units (see below). The default value depends on the type (see
 below):


* For integer it is 8.
* For float it is 64.
* For binary and bitstring it is
 the whole binary or bit string.


In matching, this default value is only
 valid for the last element. All other bit string or binary
 elements in the matching must have a size specification.


For the utf8, utf16, and utf32 types,
 Size must not be given. The size of the segment is implicitly
 determined by the type and value itself.


TypeSpecifierList is a list of type specifiers, in any
 order, separated by hyphens (-). Default values are used for any
 omitted type specifiers.



**Type= integer | float | binary |
 bytes | bitstring | bits |
 utf8 | utf16 | utf32** 
The default is integer. bytes is a shorthand for 
 binary and bits is a shorthand for bitstring.
 See below for more information about the utf types.
 
**Signedness= signed | unsigned**
Only matters for matching and when the type is integer. 
 The default is unsigned.
**Endianness= big | little | native**
Native-endian means that the endianness is resolved at load
 time to be either big-endian or little-endian, depending on
 what is native for the CPU that the Erlang machine is run on.
 Endianness only matters when the Type is either integer,
 utf16, utf32, or float. The default is big.
 
**Unit= unit:IntegerLiteral**
The allowed range is 1..256. Defaults to 1 for integer,
 float, and bitstring, and to 8 for binary.
 No unit specifier must be given for the types 
 utf8, utf16, and utf32.
 

The value of Size multiplied with the unit gives
 the number of bits. A segment of type binary must have 
 a size that is evenly divisible by 8. For a segment of type float
 the size must be either 64, 32, or 16.



Note


When constructing binaries, if the size N of an integer
 segment is too small to contain the given integer, the most significant
 bits of the integer are silently discarded and only the N least
 significant bits are put into the binary.



The types utf8, utf16, and utf32 specifies
 encoding/decoding of the **Unicode Transformation Format**s UTF-8, UTF-16,
 and UTF-32, respectively.


When constructing a segment of a utf type, Value
 must be an integer in the range 0..16#D7FF or
 16#E000....16#10FFFF. Construction
 fails with a badarg exception if Value is
 outside the allowed ranges. The size of the resulting binary
 segment depends on the type or Value, or both:


* For utf8, Value is encoded in 1-4 bytes.
* For utf16, Value is encoded in 2 or 4 bytes.
* For utf32, Value is always be encoded in 4 bytes.


When constructing, a literal string can be given followed
 by one of the UTF types, for example: <<"abc"/utf8>>
 which is syntactic sugar for
 <<$a/utf8,$b/utf8,$c/utf8>>.


A successful match of a segment of a utf type, results
 in an integer in the range 0..16#D7FF or 16#E000..16#10FFFF.
 The match fails if the returned value falls outside those ranges.


A segment of type utf8 matches 1-4 bytes in the binary,
 if the binary at the match position contains a valid UTF-8 sequence.
 (See RFC-3629 or the Unicode standard.)


A segment of type utf16 can match 2 or 4 bytes in the binary.
 The match fails if the binary at the match position does not contain
 a legal UTF-16 encoding of a Unicode code point. (See RFC-2781 or
 the Unicode standard.)


A segment of type utf32 can match 4 bytes in the binary in the
 same way as an integer segment matches 32 bits.
 The match fails if the resulting integer is outside the legal ranges
 mentioned above.


**Examples:**



```erlang

1> Bin1 = <<1,17,42>>.
<<1,17,42>>
2> Bin2 = <<"abc">>.
<<97,98,99>>
3> Bin3 = <<1,17,42:16>>.
<<1,17,0,42>>
4> <<A,B,C:16>> = <<1,17,42:16>>.
<<1,17,0,42>>
5> C.
42
6> <<D:16,E,F>> = <<1,17,42:16>>.
<<1,17,0,42>>
7> D.
273
8> F.
42
9> <<G,H/binary>> = <<1,17,42:16>>.
<<1,17,0,42>>
10> H.
<<17,0,42>>
11> <<G,J/bitstring>> = <<1,17,42:12>>.
<<1,17,2,10:4>>
12> J.
<<17,2,10:4>>
13> <<1024/utf8>>.
<<208,128>>

```

Notice that bit string patterns cannot be nested.


Notice also that "B=<<1>>" is interpreted as
 "B =< <1>>" which is a syntax error. The correct way is
 to write a space after '=': "B = <<1>>.


More examples are provided in
 [Programming Examples](https://www.erlang.org/../programming_examples/bit_syntax.html).

<!--#fun-expressions#-->
### 9.19  Fun Expressions



```erlang

fun
    [Name](https://www.erlang.org/Pattern11,...,Pattern1N) [when GuardSeq1] ->
              Body1;
    ...;
    [Name](https://www.erlang.org/PatternK1,...,PatternKN) [when GuardSeqK] ->
              BodyK
end
```

A fun expression begins with the keyword fun and ends
 with the keyword end. Between them is to be a function
 declaration, similar to a
 [regular function declaration](https://www.erlang.org/functions.html#syntax),
 except that the function name is optional and is to be a variable, if
 any.


Variables in a fun head shadow the function name and both shadow
 variables in the function clause surrounding the fun expression.
 Variables bound in a fun body are local to the fun body.


The return value of the expression is the resulting fun.


**Examples:**



```erlang

1> Fun1 = fun (X) -> X+1 end.
#Fun<erl_eval.6.39074546>
2> Fun1(2).
3
3> Fun2 = fun (X) when X>=5 -> gt; (X) -> lt end.
#Fun<erl_eval.6.39074546>
4> Fun2(7).
gt
5> Fun3 = fun Fact(1) -> 1; Fact(X) when X > 1 -> X * Fact(X - 1) end.
#Fun<erl_eval.6.39074546>
6> Fun3(4).
24
```

The following fun expressions are also allowed:



```erlang

fun Name/Arity
fun Module:Name/Arity
```

In Name/Arity, Name is an atom and Arity is an integer.
 Name/Arity must specify an existing local function. The expression is
 syntactic sugar for:



```erlang

fun (Arg1,...,ArgN) -> Name(Arg1,...,ArgN) end
```

In Module:Name/Arity, Module, and Name are atoms
 and Arity is an integer. Starting from Erlang/OTP R15,
 Module, Name, and Arity can also be variables.
 A fun defined in this way refers to the function Name
 with arity Arity in the **latest** version of module
 Module. A fun defined in this way is not dependent on
 the code for the module in which it is defined.
 


More examples are provided in
 [Programming Examples](https://www.erlang.org/../programming_examples/funs.html).

<!--#catch-and-throw#-->
### 9.20  Catch and Throw


Returns the value of Expr unless an exception
 occurs during the evaluation. In that case, the exception is
 caught.


For exceptions of class error, that is,
 run-time errors,
 {'EXIT',{Reason,Stack}} is returned.


For exceptions of class exit, that is,
 the code called exit(Term),
 {'EXIT',Term} is returned.


For exceptions of class throw, that is
 the code called throw(Term),
 Term is returned.


Reason depends on the type of error that occurred, and
 Stack is the stack of recent function calls, see
 [Exit Reasons](https://www.erlang.org/errors.html#exit_reasons).


**Examples:**



```erlang

1> catch 1+2.
3
2> catch 1+a.
{'EXIT',{badarith,[...]}}
```

The BIF throw(Any) can be used for non-local return from
 a function. It must be evaluated within a catch, which
 returns the value Any.


**Example:**



```erlang

5> catch throw(hello).
hello
```

If throw/1 is not evaluated within a catch, a
 nocatch run-time error occurs.

<!--#try#-->
### 9.21  Try



```erlang
try Exprs
catch
    Class1:ExceptionPattern1[:Stacktrace] [when ExceptionGuardSeq1] ->
        ExceptionBody1;
    ClassN:ExceptionPatternN[:Stacktrace] [when ExceptionGuardSeqN] ->
        ExceptionBodyN
end
```

This is an enhancement of
 [catch](https://www.erlang.org/#catch).
 It gives the possibility to:


* Distinguish between different exception classes.
* Choose to handle only the desired ones.
* Passing the others on to an enclosing
 try or catch, or to default error handling.


Notice that although the keyword catch is used in
 the try expression, there is not a catch expression
 within the try expression.


It returns the value of Exprs (a sequence of expressions
 Expr1, ..., ExprN) unless an exception occurs during
 the evaluation. In that case the exception is caught and
 the patterns ExceptionPattern with the right exception
 class Class are sequentially matched against the caught
 exception. If a match succeeds and the optional guard sequence
 ExceptionGuardSeq is true, the corresponding
 ExceptionBody is evaluated to become the return value.


Stacktrace, if specified, must be the name of a variable
 (not a pattern). The stack trace is bound to the variable when
 the corresponding ExceptionPattern matches.


If an exception occurs during evaluation of Exprs but
 there is no matching ExceptionPattern of the right
 Class with a true guard sequence, the exception is passed
 on as if Exprs had not been enclosed in a try
 expression.


If an exception occurs during evaluation of ExceptionBody,
 it is not caught.


It is allowed to omit Class and Stacktrace.
 An omitted Class is shorthand for throw:



```erlang
try Exprs
catch
    ExceptionPattern1 [when ExceptionGuardSeq1] ->
        ExceptionBody1;
    ExceptionPatternN [when ExceptionGuardSeqN] ->
        ExceptionBodyN
end
```

The try expression can have an of
 section:
 



```erlang
try Exprs of
    Pattern1 [when GuardSeq1] ->
        Body1;
    ...;
    PatternN [when GuardSeqN] ->
        BodyN
catch
    Class1:ExceptionPattern1[:Stacktrace] [when ExceptionGuardSeq1] ->
        ExceptionBody1;
    ...;
    ClassN:ExceptionPatternN[:Stacktrace] [when ExceptionGuardSeqN] ->
        ExceptionBodyN
end
```

If the evaluation of Exprs succeeds without an exception,
 the patterns Pattern are sequentially matched against
 the result in the same way as for a
 [case](https://www.erlang.org/#case) expression, except that if
 the matching fails, a try_clause run-time error occurs instead of a
 case_clause.


Only exceptions occurring during the evaluation of Exprs can be
 caught by the catch section. Exceptions occurring in a Body
 or due to a failed match are not caught.


The try expression can also be augmented with an
 after section, intended to be used for cleanup with side
 effects:



```erlang
try Exprs of
    Pattern1 [when GuardSeq1] ->
        Body1;
    ...;
    PatternN [when GuardSeqN] ->
        BodyN
catch
    Class1:ExceptionPattern1[:Stacktrace] [when ExceptionGuardSeq1] ->
        ExceptionBody1;
    ...;
    ClassN:ExceptionPatternN[:Stacktrace] [when ExceptionGuardSeqN] ->
        ExceptionBodyN
after
    AfterBody
end
```

AfterBody is evaluated after either Body or
 ExceptionBody, no matter which one. The evaluated value of
 AfterBody is lost; the return value of the try
 expression is the same with an after section as without.


Even if an exception occurs during evaluation of Body or
 ExceptionBody, AfterBody is evaluated. In this case
 the exception is passed on after AfterBody has been
 evaluated, so the exception from the try expression is
 the same with an after section as without.


If an exception occurs during evaluation of AfterBody
 itself, it is not caught. So if AfterBody is evaluated after
 an exception in Exprs, Body, or ExceptionBody,
 that exception is lost and masked by the exception in
 AfterBody.


The of, catch, and after sections are all
 optional, as long as there is at least a catch or an
 after section. So the following are valid try
 expressions:



```erlang
try Exprs of 
    Pattern when GuardSeq -> 
        Body 
after 
    AfterBody 
end

try Exprs
catch 
    ExpressionPattern -> 
        ExpressionBody
after
    AfterBody
end

try Exprs after AfterBody end
```

Next is an example of using after. This closes the file,
 even in the event of exceptions in file:read/2 or in
 binary_to_term/1. The exceptions are the same as
 without the try...after...end expression:



```erlang
termize_file(Name) ->
    {ok,F} = file:open(Name, [read,binary]),
    try
        {ok,Bin} = file:read(F, 1024*1024),
        binary_to_term(Bin)
    after
        file:close(F)
    end.
```

Next is an example of using try to emulate catch Expr:



```erlang
try Expr
catch
    throw:Term -> Term;
    exit:Reason -> {'EXIT',Reason}
    error:Reason:Stk -> {'EXIT',{Reason,Stk}}
end
```
<!--#parenthesized-expressions#-->
### 9.22  Parenthesized Expressions


Parenthesized expressions are useful to override
 [operator precedences](https://www.erlang.org/#prec),
 for example, in arithmetic expressions:



```erlang

1> 1 + 2 * 3.
7
2> (1 + 2) * 3.
9
```

<!--#block-expressions#-->
### 9.23  Block Expressions



```erlang

begin
   Expr1,
   ...,
   ExprN
end
```

Block expressions provide a way to group a sequence of
 expressions, similar to a clause body. The return value is
 the value of the last expression ExprN.

<!--#list-comprehensions#-->
### 9.24  List Comprehensions


List comprehensions is a feature of many modern functional
 programming languages. Subject to certain rules, they provide a
 succinct notation for generating elements in a list.


List comprehensions are analogous to set comprehensions in
 Zermelo-Frankel set theory and are called ZF expressions in
 Miranda. They are analogous to the setof and
 findall predicates in Prolog.


List comprehensions are written with the following syntax:



```erlang

[Expr || Qualifier1,...,QualifierN]
```

Here, Expr is an arbitrary expression, and each
 Qualifier is either a generator or a filter.


* A **generator** is written as:   


   Pattern <- ListExpr.   

ListExpr must be an expression, which evaluates to a
 list of terms.
* A **bit string generator** is written as:   


   BitstringPattern <= BitStringExpr.   

BitStringExpr must be an expression, which evaluates to a
 bitstring.
* A **filter** is an expression, which evaluates to
 true or false, or a
 [guard expression](https://www.erlang.org/#guard_expressions).
 If the filter is not a guard expression and evaluates
 to a non-Boolean value Val, an exception
 {bad_filter, Val} is triggered at runtime.


The variables in the generator patterns shadow previously bound variables,
 including variables bound in a previous generator pattern.


A list comprehension returns a list, where the elements are the
 result of evaluating Expr for each combination of generator
 list elements and bit string generator elements, for which all
 filters are true.


**Example:**



```erlang

1> [X*2 || X <- [1,2,3]].
[2,4,6]
```

When there are no generators or bit string generators, a list comprehension
 returns either a list with one element (the result of evaluating Expr)
 if all filters are true or an empty list otherwise.


**Example:**



```erlang

1> [2 || is_integer(2)].
[2]
2> [x || is_integer(x)].
[]
```

More examples are provided in
 [Programming Examples.](https://www.erlang.org/../programming_examples/list_comprehensions.html)

<!--#bit-string-comprehensions#-->
### 9.25  Bit String Comprehensions


Bit string comprehensions are
 analogous to List Comprehensions. They are used to generate bit strings
 efficiently and succinctly.


Bit string comprehensions are written with
 the following syntax:



```erlang

<< BitStringExpr || Qualifier1,...,QualifierN >>
```

BitStringExpr is an expression that evaluates to a bit
 string. If BitStringExpr is a function call, it must be
 enclosed in parentheses. Each Qualifier is either a
 generator, a bit string generator or a filter.


* A **generator** is written as:   

   Pattern <- ListExpr.   

ListExpr must be an expression that evaluates to a
 list of terms.
* A **bit string generator** is written as:   


   BitstringPattern <= BitStringExpr.   

BitStringExpr must be an expression that evaluates to a
 bitstring.
* A **filter** is an expression, which evaluates to
 true or false, or a
 [guard expression](https://www.erlang.org/#guard_expressions).
 If the filter is not a guard expression and evaluates
 to a non-Boolean value Val, an exception
 {bad_filter, Val} is triggered at runtime.


The variables in the generator patterns shadow previously bound variables,
 including variables bound in a previous generator pattern.


A bit string comprehension returns a bit string, which is 
 created by concatenating the results of evaluating BitString 
 for each combination of bit string generator elements, for which all
 filters are true.


**Example:**



```erlang

1> << << (X*2) >> ||
<<X>> <= << 1,2,3 >> >>.
<<2,4,6>>
```

More examples are provided in
 [Programming Examples.](https://www.erlang.org/../programming_examples/bit_syntax.html)

<!--#guard-sequences#-->
### 9.26  Guard Sequences


A **guard sequence** is a sequence of guards, separated
 by semicolon (;). The guard sequence is true if at least one of
 the guards is true. (The remaining guards, if any, are not
 evaluated.)


Guard1;...;GuardK


A **guard** is a sequence of guard expressions, separated
 by comma (,). The guard is true if all guard expressions
 evaluate to true.


GuardExpr1,...,GuardExprN

<!--#guard-expressions#-->
### 9.27  Guard Expressions


The set of valid **guard expressions** is a subset of the
 set of valid Erlang expressions. The reason for restricting the
 set of valid expressions is that evaluation of a guard expression
 must be guaranteed to be free of side effects. Valid guard
 expressions are the following:


* Variables
* Constants (atoms, integer, floats, lists, tuples, records,
 binaries, and maps)
* Expressions that construct atoms, integer, floats, lists,
 tuples, records, binaries, and maps
* Expressions that update a map
* The record expressions Expr#Name.Field and #Name.Field
* Calls to the BIFs specified in tables **Type Test BIFs** and
 **Other BIFs Allowed in Guard Expressions**
* Term comparisons
* Arithmetic expressions
* Boolean expressions
* Short-circuit expressions (andalso/orelse)





|  |
| --- |
| is_atom/1 |
| is_binary/1 |
| is_bitstring/1 |
| is_boolean/1 |
| is_float/1 |
| is_function/1 |
| is_function/2 |
| is_integer/1 |
| is_list/1 |
| is_map/1 |
| is_number/1 |
| is_pid/1 |
| is_port/1 |
| is_record/2 |
| is_record/3 |
| is_reference/1 |
| is_tuple/1 |


Table
 9.4:
  
 Type Test BIFs



Notice that most type test BIFs have older equivalents, without
 the is_ prefix. These old BIFs are retained for backwards
 compatibility only and are not to be used in new code. They are
 also only allowed at top level. For example, they are not allowed
 in Boolean expressions in guards.





|  |
| --- |
| abs(Number) |
| bit_size(Bitstring) |
| byte_size(Bitstring) |
| element(N, Tuple) |
| float(Term) |
| hd(List) |
| is_map_key(Key, Map) |
| length(List) |
| map_get(Key, Map) |
| map_size(Map) |
| node() |
| node(Pid|Ref|Port) |
| round(Number) |
| self() |
| size(Tuple|Bitstring) |
| tl(List) |
| trunc(Number) |
| tuple_size(Tuple) |


Table
 9.5:
  
 Other BIFs Allowed in Guard Expressions



If an arithmetic expression, a Boolean expression, a
 short-circuit expression, or a call to a guard BIF fails (because
 of invalid arguments), the entire guard fails. If the guard was
 part of a guard sequence, the next guard in the sequence (that is,
 the guard following the next semicolon) is evaluated.

<!--#operator-precedence#-->
### 9.28  Operator Precedence


Operator precedence in falling priority:





|  |  |
| --- | --- |
| : |  |
| # |  |
| Unary + - bnot not |  |
| / * div rem band and | Left associative |
| + - bor bxor bsl bsr or xor | Left associative |
| ++ -- | Right associative |
| == /= =< < >= > =:= =/= |  |
| andalso |  |
| orelse |  |
| = ! | Right associative |
| ?= |  |
| catch |  |


Table
 9.6:
  
 Operator Precedence



When evaluating an expression, the operator with the highest
 priority is evaluated first. Operators with the same priority
 are evaluated according to their associativity.


**Example:**


The left associative arithmetic operators are evaluated left to
 right:



```erlang

6 + 5 * 4 - 3 / 2 evaluates to
6 + 20 - 1.5 evaluates to
26 - 1.5 evaluates to
24.5
```






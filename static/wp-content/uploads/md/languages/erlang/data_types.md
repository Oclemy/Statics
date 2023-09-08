
# 3 Data Types


Erlang provides a number of data types, which are listed in
 this section.



Note that Erlang has no user defined types, only composite
 types (data structures) made of Erlang terms. This means that any
 function testing for a composite type, typically named
 is_type/1, might return true for a term
 that coincides with the chosen representation. The corresponding
 functions for built in types do not suffer from this.

### 3.1  Terms


A piece of data of any data type is called a **term**.

<!--#number#-->
### 3.2  Number


There are two types of numeric literals, **integers** and
 **floats**. Besides the conventional notation, there are two
 Erlang-specific notations:


* $**char**   


 ASCII value or unicode code-point of the character
 **char**.
* **base**#**value**   


 Integer with the base **base**, that must be an
 integer in the range 2..36.


Leading zeroes are ignored. Single underscore _ can be inserted
 between digits as a visual separator.


**Examples:**



```erlang

1> 42.
42
2> -1_234_567_890.
-1234567890
3> $A.
65
4> $\n.
10
5> 2#101.
5
6> 16#1f.
31
7> 16#4865_316F_774F_6C64.
5216630098191412324
8> 2.3.
2.3
9> 2.3e3.
2.3e3
10> 2.3e-3.
0.0023
11> 1_234.333_333
1234.333333

```


#### Representation of Floating Point Numbers


When working with floats you may not see what you expect when printing or
 doing arithmetic operations. This is because floats
 are represented by a fixed number of bits in a base-2 system while
 printed floats are represented with a base-10 system. Erlang
 uses 64-bit floats. Here are examples of this phenomenon:
 



```erlang

> 0.1+0.2.
0.30000000000000004

```

The real numbers 0.1 and 0.2 cannot be represented
exactly as floats.



```erlang

> {36028797018963968.0, 36028797018963968 == 36028797018963968.0,
 36028797018963970.0, 36028797018963970 == 36028797018963970.0}.
{3.602879701896397e16, true,
 3.602879701896397e16, false}.

```


 The value 36028797018963968 can be represented exactly
 as a float value but Erlang's pretty printer rounds
 36028797018963968.0 to 3.602879701896397e16
 (=36028797018963970.0) as all values in the range
 [36028797018963966.0, 36028797018963972.0] are
 represented by 36028797018963968.0.
 



 For more information about floats and issues with them see:
 


If you need to work with decimal fractions, for instance if you need to represent money,
 then you should use a library that handles that or work in cents instead of euros so
 that you do not need decimal fractions.
 

<!--#atom#-->
### 3.3  Atom


An atom is a literal, a constant with name. An atom is to be
 enclosed in single quotes (') if it does not begin with a
 lower-case letter or if it contains other characters than
 alphanumeric characters, underscore (_), or @.


**Examples:**



```erlang

hello
phone_number
'Monday'
'phone number'
```

<!--#bit-strings-and-binaries#-->
### 3.4  Bit Strings and Binaries


A bit string is used to store an area of untyped memory.


Bit strings are expressed using the
 [bit syntax](https://www.erlang.org/expressions.html#bit_syntax).


Bit strings that consist of a number of bits that are evenly
 divisible by eight, are called **binaries**


**Examples:**



```erlang

1> <<10,20>>.
<<10,20>>
2> <<"ABC">>.
<<"ABC">>
1> <<1:1,0:1>>.
<<2:2>>
```

For more examples,
 see [Programming Examples](https://www.erlang.org/../programming_examples/bit_syntax.html).

<!--#reference#-->
### 3.5  Reference



 A term that is
 [unique](https://www.erlang.org/../efficiency_guide/advanced.html#unique_references)
 among connected nodes. A reference can be created by calling the
 [make_ref/0](https://www.erlang.org/../man/erlang.html#make_ref-0)
 BIF. The
 [is_reference/1](https://www.erlang.org/../man/erlang.html#is_reference-1)
 BIF can be used to test if a term is a reference.
 

<!--#fun#-->
### 3.6  Fun


A fun is a functional object. Funs make it possible to create
 an anonymous function and pass the function itself -- not its
 name -- as argument to other functions.


**Example:**



```erlang

1> Fun1 = fun (X) -> X+1 end.
#Fun<erl_eval.6.39074546>
2> Fun1(2).
3
```

Read more about funs in [Fun Expressions](https://www.erlang.org/expressions.html#funs). For more examples, see
 [Programming Examples](https://www.erlang.org/../programming_examples/funs.html).

<!--#port-identifier#-->
### 3.7  Port Identifier


A port identifier identifies an Erlang port.


open_port/2, which is used to create ports, returns
 a value of this data type.


Read more about ports in [Ports and Port Drivers](https://www.erlang.org/ports.html).

<!--#pid#-->
### 3.8  PID



 PID is an abbreviation for process identifier. Each process has
 a PID which identifies the process. PIDs are unique among processes
 that are alive on connected nodes. However, a PID of a terminated
 process may be reused as a PID for a new process after a while.
 



 The BIF [self/0](https://www.erlang.org/../man/erlang.html#self-0)
 returns the PID of the calling process. When
 [creating a new
 process](https://www.erlang.org/processes.html#process-creation), the parent process will be able to get the PID
 of the child process either via the return value, as is the case
 when calling the [spawn/3](https://www.erlang.org/../man/erlang.html#spawn-3)
 BIF, or via a message, which is the case when calling the
 [spawn_request/5](https://www.erlang.org/../man/erlang.html#spawn_request-5)
 BIF. A PID is typically used when when sending a process a
 [signal](https://www.erlang.org/processes.html#signals). The
 [is_pid/1](https://www.erlang.org/../man/erlang.html#is_pid-1)
 BIF can be used to test whether a term is a PID. 
 


**Example:**



```erlang

-module(m).
-export([loop/0]).

loop() ->
    receive
        who_are_you ->
            io:format("I am ~p~n", [self()]),
            loop()
    end.

1> P = spawn(m, loop, []).
<0.58.0>
2> P ! who_are_you.
I am <0.58.0>
who_are_you
```

Read more about processes in
 [Processes](https://www.erlang.org/processes.html).

<!--#tuple#-->
### 3.9  Tuple


A tuple is a compound data type with a fixed number of terms:


Each term Term in the tuple is called an
 **element**. The number of elements is said to be
 the **size** of the tuple.


There exists a number of BIFs to manipulate tuples.


**Examples:**



```erlang

1> P = {adam,24,{july,29}}.
{adam,24,{july,29}}
2> element(1,P).
adam
3> element(3,P).
{july,29}
4> P2 = setelement(2,P,25).
{adam,25,{july,29}}
5> tuple_size(P).
3
6> tuple_size({}).
0
```

<!--#map#-->
### 3.10  Map


A map is a compound data type with a variable number of
 key-value associations:



```erlang

#{Key1=>Value1,...,KeyN=>ValueN}
```

Each key-value association in the map is called an
 **association pair**. The key and value parts of the pair are
 called **elements**. The number of association pairs is said to be
 the **size** of the map.


There exists a number of BIFs to manipulate maps.


**Examples:**



```erlang

1> M1 = #{name=>adam,age=>24,date=>{july,29}}.
#{age => 24,date => {july,29},name => adam}
2> maps:get(name,M1).
adam
3> maps:get(date,M1).
{july,29}
4> M2 = maps:update(age,25,M1).
#{age => 25,date => {july,29},name => adam}
5> map_size(M).
3
6> map_size(#{}).
0
```

A collection of maps processing functions can be found in
 [maps](https://www.erlang.org/../man/maps.html) manual page
 in STDLIB.


Read more about maps in [Map Expressions](https://www.erlang.org/expressions.html#map_expressions).



Note





Maps are considered to be experimental during Erlang/OTP R17.



<!--#list#-->
### 3.11  List


A list is a compound data type with a variable number of terms.


Each term Term in the list is called an
 **element**. The number of elements is said to be
 the **length** of the list.


Formally, a list is either the empty list [] or
 consists of a **head** (first element) and a **tail**
 (remainder of the list).
 The **tail** is also a list. The latter can
 be expressed as [H|T]. The notation
 [Term1,...,TermN] above is equivalent with
 the list [Term1|[...|[TermN|[]]]].


**Example:**


[] is a list, thus   

[c|[]] is a list, thus   

[b|[c|[]]] is a list, thus   

[a|[b|[c|[]]]] is a list, or in short [a,b,c]


A list where the tail is a list is sometimes called a **proper list**. It is allowed to have a list where the tail is not a
 list, for example, [a|b]. However, this type of list is of
 little practical use.


**Examples:**



```erlang

1> L1 = [a,2,{c,4}].
[a,2,{c,4}]
2> [H|T] = L1.
[a,2,{c,4}]
3> H.
a
4> T.
[2,{c,4}]
5> L2 = [d|T].
[d,2,{c,4}]
6> length(L1).
3
7> length([]).
0
```

A collection of list processing functions can be found in
 the [lists](https://www.erlang.org/../man/lists.html) manual
 page in STDLIB.

<!--#string-->
### 3.12  String


Strings are enclosed in double quotes ("), but is not a
 data type in Erlang. Instead, a string "hello" is
 shorthand for the list [$h,$e,$l,$l,$o], that is,
 [104,101,108,108,111].


Two adjacent string literals are concatenated into one. This is
 done in the compilation, thus, does not incur any runtime overhead.


**Example:**


is equivalent to

<!--#record#-->
### 3.13  Record


A record is a data structure for storing a fixed number of
 elements. It has named fields and is similar to a struct in C.
 However, a record is not a true data type. Instead, record
 expressions are translated to tuple expressions during
 compilation. Therefore, record expressions are not understood by
 the shell unless special actions are taken. For details, see the
 [shell(3)](https://www.erlang.org/../man/shell.html) manual
 page in STDLIB).


**Examples:**



```erlang

-module(person).
-export([new/2]).

-record(person, {name, age}).

new(Name, Age) ->
    #person{name=Name, age=Age}.

1> person:new(ernie, 44).
{person,ernie,44}
```

Read more about records in
 [Records](https://www.erlang.org/records.html). More examples can be
 found in [Programming Examples](https://www.erlang.org/../programming_examples/records.html).

<!--#boolean#-->
### 3.14  Boolean


There is no Boolean data type in Erlang. Instead the atoms
 true and false are used to denote Boolean values.


**Examples:**



```erlang

1> 2 =< 3.
true
2> true or false.
true
```
<!--#escape-sequences#-->
### 3.15  Escape Sequences


Within strings and quoted atoms, the following escape sequences
 are recognized:





|  |  |
| --- | --- |
| **Sequence** | **Description** |
| \b | Backspace |
| \d | Delete |
| \e | Escape |
| \f | Form feed |
| \n | Newline |
| \r | Carriage return |
| \s | Space |
| \t | Tab |
| \v | Vertical tab |
| \XYZ, \YZ, \Z | Character with octal
 representation XYZ, YZ or Z |
| \xXY | Character with hexadecimal
 representation XY |
| \x{X...} | Character with hexadecimal
 representation; X... is one or more hexadecimal characters |
| \^a...\^z 
\^A...\^Z | Control A to control Z |
| \' | Single quote |
| \" | Double quote |
| \\ | Backslash |


Table
 3.1:
  
 Recognized Escape Sequences


<!--#type-conversions#-->
### 3.16  Type Conversions


There are a number of BIFs for type conversions.


**Examples:**



```erlang

1> atom_to_list(hello).
"hello"
2> list_to_atom("hello").
hello
3> binary_to_list(<<"hello">>).
"hello"
4> binary_to_list(<<104,101,108,108,111>>).
"hello"
5> list_to_binary("hello").
<<104,101,108,108,111>>
6> float_to_list(7.0).
"7.00000000000000000000e+00"
7> list_to_float("7.000e+00").
7.0
8> integer_to_list(77).
"77"
9> list_to_integer("77").
77
10> tuple_to_list({a,b,c}).
[a,b,c]
11> list_to_tuple([a,b,c]).
{a,b,c}
12> term_to_binary({a,b,c}).
<<131,104,3,100,0,1,97,100,0,1,98,100,0,1,99>>
13> binary_to_term(<<131,104,3,100,0,1,97,100,0,1,98,100,0,1,99>>).
{a,b,c}
14> binary_to_integer(<<"77">>).
77
15> integer_to_binary(77).
<<"77">>
16> float_to_binary(7.0).
<<"7.00000000000000000000e+00">>
17> binary_to_float(<<"7.000e+00">>).
7.0
```






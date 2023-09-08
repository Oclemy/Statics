
# 3 Data Types


Erlang provides a number of data types, which are listed in
 this section.



Note that Erlang has no user defined types, only composite
 types (data structures) made of Erlang terms. This means that any
 function testing for a composite type, typically named
 is_type/1, might return true for a term
 that coincides with the chosen representation. The corresponding
 functions for built in types do not suffer from this.






 
























### 
3.12 
 String


Strings are enclosed in double quotes ("), but is not a
 data type in Erlang. Instead, a string "hello" is
 shorthand for the list [$h,$e,$l,$l,$o], that is,
 [104,101,108,108,111].


Two adjacent string literals are concatenated into one. This is
 done in the compilation, thus, does not incur any runtime overhead.


**Example:**


is equivalent to


### 
3.13 
 Record


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


### 
3.14 
 Boolean


There is no Boolean data type in Erlang. Instead the atoms
 true and false are used to denote Boolean values.


**Examples:**



```erlang

1> 2 =< 3.
true
2> true or false.
true
```

### 
3.15 
 Escape Sequences


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



### 
3.16 
 Type Conversions


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






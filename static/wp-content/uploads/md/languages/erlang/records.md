
# 11 Records


A record is a data structure for storing a fixed number of
 elements. It has named fields and is similar to a struct in C.
 Record expressions are translated to tuple expressions during
 compilation. Therefore, record expressions are not understood by
 the shell unless special actions are taken. For details, see the
 [shell(3)](https://www.erlang.org/../man/shell.html)
 manual page in STDLIB.


More examples are provided in
 [Programming Examples](https://www.erlang.org/../programming_examples/records.html).

<!--#defining-records#-->
### 11.1  Defining Records


A record definition consists of the name of the record,
 followed by the field names of the record. Record and field names
 must be atoms. Each field can be given an optional default value.
 If no default value is supplied, undefined is used.



```erlang

-record(Name, {Field1 [= Value1],
               ...
               FieldN [= ValueN]}).
```

A record definition can be placed anywhere among the attributes
 and function declarations of a module, but the definition must
 come before any usage of the record.


If a record is used in several modules, it is recommended that
 the record definition is placed in an include file.

<!--#creating-records#-->
### 11.2  Creating Records


The following expression creates a new Name record where
 the value of each field FieldI is the value of evaluating
 the corresponding expression ExprI:



```erlang

#Name{Field1=Expr1,...,FieldK=ExprK}
```

The fields can be in any order, not necessarily the same order as
 in the record definition, and fields can be omitted. Omitted
 fields get their respective default value instead.


If several fields are to be assigned the same value,
 the following construction can be used:



```erlang

#Name{Field1=Expr1,...,FieldK=ExprK, _=ExprL}
```

Omitted fields then get the value of evaluating ExprL
 instead of their default values. This feature is primarily
 intended to be used to create patterns for ETS and Mnesia match
 functions.


**Example:**



```erlang

-record(person, {name, phone, address}).

...

lookup(Name, Tab) ->
    ets:match_object(Tab, #person{name=Name, _='_'}).
```

<!--#accessing-record-fields#-->
### 11.3  Accessing Record Fields


Returns the value of the specified field. Expr is to
 evaluate to a Name record.


The following expression returns the position of the specified
 field in the tuple representation of the record:


**Example:**



```erlang

-record(person, {name, phone, address}).

...

lookup(Name, List) ->
    lists:keysearch(Name, #person.name, List).
```

<!--#updating-records-->
### 11.4  Updating Records



```erlang

Expr#Name{Field1=Expr1,...,FieldK=ExprK}
```

Expr is to evaluate to a Name record. A
 copy of this record is returned, with the value of each specified field
 FieldI changed to the value of evaluating the corresponding
 expression ExprI. All other fields retain their old
 values.


<!--#records-in-guards#-->
### 11.5  Records in Guards


Since record expressions are expanded to tuple expressions,
 creating records and accessing record fields are allowed in
 guards. However all subexpressions, for example, for field
 initiations, must be valid guard expressions as well.


**Examples:**



```erlang
handle(Msg, State) when Msg==#msg{to=void, no=3} ->
    ...

handle(Msg, State) when State#state.running==true ->
    ...
```

There is also a type test BIF is_record(Term, RecordTag).


**Example:**



```erlang

is_person(P) when is_record(P, person) ->
    true;
is_person(_P) ->
    false.
```

<!--#records-in-patterns#-->
### 11.6  Records in Patterns


A pattern that matches a certain record is created in the same
 way as a record is created:



```erlang

#Name{Field1=Expr1,...,FieldK=ExprK}
```

In this case, one or more of Expr1...ExprK can be
 unbound variables.

<!--#nested-records#-->
### 11.7  Nested Records


Beginning with Erlang/OTP R14, parentheses when accessing or updating nested
 records can be omitted. Assume the following record
 definitions:



```erlang

-record(nrec0, {name = "nested0"}).
-record(nrec1, {name = "nested1", nrec0=#nrec0{}}).
-record(nrec2, {name = "nested2", nrec1=#nrec1{}}).

N2 = #nrec2{},
    
```

Before R14, parentheses were needed as follows:



```erlang

"nested0" = ((N2#nrec2.nrec1)#nrec1.nrec0)#nrec0.name,
N0n = ((N2#nrec2.nrec1)#nrec1.nrec0)#nrec0{name = "nested0a"},
    
```

Since R14, the following can also be written:



```erlang

"nested0" = N2#nrec2.nrec1#nrec1.nrec0#nrec0.name,
N0n = N2#nrec2.nrec1#nrec1.nrec0#nrec0{name = "nested0a"},
```

<!--#internal-representation-of-records#-->
### 11.8  Internal Representation of Records


Record expressions are translated to tuple expressions during
 compilation. A record defined as:



```erlang

-record(Name, {Field1,...,FieldN}).
```

is internally represented by the tuple:


Here each ValueI is the default value for FieldI.


To each module using records, a pseudo function is added
 during compilation to obtain information about records:



```erlang

record_info(fields, Record) -> [Field]
record_info(size, Record) -> Size
```

Size is the size of the tuple representation, that is,
 one more than the number of fields.


In addition, #Record.Name returns the index in the tuple
 representation of Name of the record Record.


Name must be an atom.







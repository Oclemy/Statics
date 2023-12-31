
# 7 Types and Function Specifications

<!--#the-erlang-type-language#-->
### 7.1  The Erlang Type Language



 Erlang is a dynamically typed language. Still, it comes with a
 notation for declaring sets of Erlang terms to form a particular
 type. This effectively forms specific subtypes of the set of all
 Erlang terms.
 



 Subsequently, these types can be used to specify types of record fields
 and also the argument and return types of functions.
 



 Type information can be used for the following:


* To document function interfaces
* To provide more information for bug detection tools,
 such as Dialyzer
* To be exploited by documentation tools, such as EDoc, for
 generating program documentation of various forms


It is expected that the type language described in this section
 supersedes and replaces the purely comment-based @type and
 @spec declarations used by EDoc.

<!--#types-and-their-syntax-->
### 7.2  Types and their Syntax



 Types describe sets of Erlang terms.
 Types consist of, and are built from, a set of predefined types,
 for example, integer(), atom(), and pid().
 Predefined types represent a typically infinite set of Erlang terms that
 belong to this type. For example, the type atom() denotes the
 set of all Erlang atoms.
 



 For integers and atoms, it is allowed for singleton types; for example,
 the integers
 -1 and 42, or the atoms 'foo' and 'bar'.

 All other types are built using unions of either predefined
 types or singleton types. In a type union between a type and one
 of its subtypes, the subtype is absorbed by the supertype. Thus,
 the union is then treated as if the subtype was not a
 constituent of the union. For example, the type union:
 



```erlang
  atom() | 'bar' | integer() | 42
```


 describes the same set of terms as the type union:
 



 Because of subtype relations that exist between types, types
 form a lattice where the top-most element, any(), denotes
 the set of all Erlang terms and the bottom-most element, none(),
 denotes the empty set of terms.
 



 The set of predefined types and the syntax for types follows:
 



```erlang

  Type :: any()                 %% The top type, the set of all Erlang terms
        | none()                %% The bottom type, contains no terms
        | pid()
        | port()
        | reference()
        | []                    %% nil
        | Atom
        | Bitstring
        | float()
        | Fun
        | Integer
        | List
        | Map
        | Tuple
        | Union
        | UserDefined           %% described in Type Declarations of User-Defined Types

  Atom :: atom()
        | Erlang_Atom           %% 'foo', 'bar', ...

  Bitstring :: <<>>
             | <<_:M>>          %% M is an Integer_Value that evaluates to a positive integer
             | <<_:_*N>>        %% N is an Integer_Value that evaluates to a positive integer
             | <<_:M, _:_*N>>

  Fun :: fun()                  %% any function
       | fun((...) -> Type)     %% any arity, returning Type
       | fun(() -> Type)
       | fun((TList) -> Type)

  Integer :: integer()
           | Integer_Value
           | Integer_Value..Integer_Value      %% specifies an integer range

  Integer_Value :: Erlang_Integer              %% ..., -1, 0, 1, ... 42 ...
                 | Erlang_Character            %% $a, $b ...
                 | Integer_Value BinaryOp Integer_Value
                 | UnaryOp Integer_Value

  BinaryOp :: '*' | 'div' | 'rem' | 'band' | '+' | '-' | 'bor' | 'bxor' | 'bsl' | 'bsr'

  UnaryOp :: '+' | '-' | 'bnot'

  List :: list(Type)                           %% Proper list ([]-terminated)
        | maybe_improper_list(Type1, Type2)    %% Type1=contents, Type2=termination
        | nonempty_improper_list(Type1, Type2) %% Type1 and Type2 as above
        | nonempty_list(Type)                  %% Proper non-empty list

  Map :: #{}                                   %% denotes the empty map
       | #{AssociationList}

  Tuple :: tuple()                             %% denotes a tuple of any size
         | {}
         | {TList}

  AssociationList :: Association
                   | Association, AssociationList

  Association :: Type := Type                  %% denotes a mandatory association
               | Type => Type                  %% denotes an optional association

  TList :: Type
         | Type, TList

  Union :: Type1 | Type2

```


 Integer values are either integer or character literals or expressions
 consisting of possibly nested unary or binary operations that evaluate to
 an integer. Such expressions can also be used in bit strings and ranges.
 



 The general form of bit strings is <<_:M, _:_*N>>,
 where M and N must evaluate to positive integers. It denotes a
 bit string that is M + (k*N) bits long (that is, a bit string that
 starts with M bits and continues with k segments of
 N bits each, where k is also a positive integer).
 The notations <<_:_*N>>, <<_:M>>,
 and <<>> are convenient shorthands for the cases
 that M or N, or both, are zero.
 



 Because lists are commonly used, they have shorthand type notations.
 The types list(T) and nonempty_list(T) have the shorthands
 [T] and [T,...], respectively.
 The only difference between the two shorthands is that [T] can be an
 empty list but [T,...] cannot.
 



 Notice that the shorthand for list(), that is, the list of
 elements of unknown type, is [_] (or [any()]), not [].
 The notation [] specifies the singleton type for the empty list.
 



 The general form of map types is #{AssociationList}.
 The key types in
 AssociationList are allowed to overlap, and if they do, the
 leftmost association takes precedence. A map association has a key in
 AssociationList if it belongs to this type.
 AssociationList can contain both mandatory (:=) and
 optional (=>) association types.
 If an association type is mandatory, an association with that type
 needs to be present.
 In the case of an optional association type it is not required for
 the key type to be present.
 



 The notation #{} specifies the singleton type for the empty map.
 Note that this notation is not a shorthand for the map() type.
 



 For convenience, the following types are also built-in.
 They can be thought as predefined aliases for the type unions also shown in
 the table.
 






|  |  |
| --- | --- |
| **Built-in type** | **Defined as** |
| term() | any() |
| binary() | <<_:_*8>> |
| nonempty_binary() | <<_:8, _:_*8>> |
| bitstring() | <<_:_*1>> |
| nonempty_bitstring() | <<_:1, _:_*1>> |
| boolean() | 'false' | 'true' |
| byte() | 0..255 |
| char() | 0..16#10ffff |
| nil() | [] |
| number() | integer() | float() |
| list() | [any()] |
| maybe_improper_list() | maybe_improper_list(any(), any()) |
| nonempty_list() | nonempty_list(any()) |
| string() | [char()] |
| nonempty_string() | [char(),...] |
| iodata() | iolist() | binary() |
| iolist() | maybe_improper_list(byte() | binary() | iolist(), binary() | []) |
| map() | #{any() => any()} |
| function() | fun() |
| module() | atom() |
| mfa() | {module(),atom(),arity()} |
| arity() | 0..255 |
| identifier() | pid() | port() | reference() |
| node() | atom() |
| timeout() | 'infinity' | non_neg_integer() |
| no_return() | none() |


Table
 7.1:
  
 Built-in types, predefined aliases




 In addition, the following three built-in types exist and can be
 thought as defined below, though strictly their "type definition" is
 not valid syntax according to the type language defined above.
 





|  |  |
| --- | --- |
| **Built-in type** | **Can be thought defined by the syntax** |
| non_neg_integer() | 0.. |
| pos_integer() | 1.. |
| neg_integer() | ..-1 |


Table
 7.2:
  
 Additional built-in types




 Users are not allowed to define types with the same names as the
 predefined or built-in ones. This is checked by the compiler and
 its violation results in a compilation error.
 



Note






 The following built-in list types also exist,
 but they are expected to be rarely used. Hence, they have long names:
 





```erlang

  nonempty_maybe_improper_list() :: nonempty_maybe_improper_list(any(), any())
  nonempty_improper_list(Type1, Type2)
  nonempty_maybe_improper_list(Type1, Type2)
```


 where the last two types
 define the set of Erlang terms one would expect.
 



 Also for convenience, record notation is allowed to be used.
 Records are shorthands for the corresponding tuples:
 



```erlang

  Record :: #Erlang_Atom{}
          | #Erlang_Atom{Fields}
```


 Records are extended to possibly contain type information.
 This is described in [Type Information in Record Declarations](https://www.erlang.org/#typeinrecords).
 

<!--#type-declarations-of-user-defined-types#-->
### 7.3  Type Declarations of User-Defined Types



 As seen, the basic syntax of a type is an atom followed by closed
 parentheses. New types are declared using -type and -opaque
 attributes as in the following:
 



```erlang

  -type my_struct_type() :: Type.
  -opaque my_opaq_type() :: Type.
```


 The type name is the atom my_struct_type,
 followed by parentheses. Type is a type as defined in the
 previous section.
 A current restriction is that Type can contain
 only predefined types,
 or user-defined types which are either of the following:
 


* Module-local type, that is, with a
 definition that is present in the code of the module
* Remote type, that is, type defined in, and exported by,
 other modules; more about this soon.


For module-local types, the restriction that their definition
 exists in the module is enforced by the compiler and results in a
 compilation error. (A similar restriction currently exists for records.) 



 Type declarations can also be parameterized by including type variables
 between the parentheses. The syntax of type variables is the same as
 Erlang variables, that is, starts with an upper-case letter.
 Naturally, these variables can - and is to - appear on the RHS of the
 definition. A concrete example follows:
 



```erlang

  -type orddict(Key, Val) :: [{Key, Val}].
```


 A module can export some types to declare that other modules
 are allowed to refer to them as **remote types**.
 This declaration has the following form:



```erlang

  -export_type([T1/A1, ..., Tk/Ak]).
```

Here the Ti's are atoms (the name of the type) and the Ai's are their
 arguments


**Example:**



```erlang

  -export_type([my_struct_type/0, orddict/2]).
```

Assuming that these types are exported from module 'mod',
 you can refer to them from other modules using remote type expressions
 like the following:



```erlang

  mod:my_struct_type()
  mod:orddict(atom(), term())
```

It is not allowed to refer to types that are not declared as exported.
 



 Types declared as opaque represent sets of terms whose
 structure is not supposed to be visible from outside of
 their defining module. That is, only the module defining them
 is allowed to depend on their term structure. Consequently, such
 types do not make much sense as module local - module local
 types are not accessible by other modules anyway - and is
 always to be exported.
 


Read more on [Opaques](https://www.erlang.org/opaques.html)

<!--#type-information-in-record-declarations#-->
### 7.4  Type Information in Record Declarations



 The types of record fields can be specified in the declaration of the
 record. The syntax for this is as follows:
 



```erlang

  -record(rec, {field1 :: Type1, field2, field3 :: Type3}).
```


 For fields without type annotations, their type defaults to any().
 That is, the previous example is a shorthand for the following:
 



```erlang

  -record(rec, {field1 :: Type1, field2 :: any(), field3 :: Type3}).
```


 In the presence of initial values for fields,
 the type must be declared after the initialization, as follows:
 



```erlang

  -record(rec, {field1 = [] :: Type1, field2, field3 = 42 :: Type3}).
```


 The initial values for fields are to be compatible
 with (that is, a member of) the corresponding types.
 This is checked by the compiler and results in a compilation error
 if a violation is detected.
 



Note





Before Erlang/OTP 19, for fields without initial values,
 the singleton type 'undefined' was added to all declared types.
 In other words, the following two record declarations had identical
 effects:



```erlang

  -record(rec, {f1 = 42 :: integer(),
                f2      :: float(),
                f3      :: 'a' | 'b'}).

  -record(rec, {f1 = 42 :: integer(),
                f2      :: 'undefined' | float(),
                f3      :: 'undefined' | 'a' | 'b'}).
```


 This is no longer the case. If you require 'undefined' in your record field
 type, you must explicitly add it to the typespec, as in the 2nd example.
 





 Any record, containing type information or not, once defined,
 can be used as a type using the following syntax:
 



 In addition, the record fields can be further specified when using
 a record type by adding type information about the field
 as follows:
 



 Any unspecified fields are assumed to have the type in the original
 record declaration.
 



Note





When records are used to create patterns for ETS and
 Mnesia match functions, Dialyzer may need some help not to emit
 bad warnings. For example:



```erlang

    -type height() :: pos_integer().
    -record(person, {name :: string(), height :: height()}).

    lookup(Name, Tab) ->
	ets:match_object(Tab, #person{name = Name, _ = '_'}).
```

Dialyzer will emit a warning since '_' is not in the
 type of record field height.


The recommended way of dealing with this is to declare the
 smallest record field types to accommodate all your needs,
 and then create refinements as needed. The modified example:



```erlang

    -record(person, {name :: string(), height :: height() | '_'}).

    -type person() :: #person{height :: height()}.
```

In specifications and type declarations the type
 person() is to be preferred before #person{}.



<!--#specifications-for-functions#-->
### 7.5  Specifications for Functions



 A specification (or contract) for a function is given using the
 -spec attribute. The general format is as follows:
 



```erlang

  -spec Function(ArgType1, ..., ArgTypeN) -> ReturnType.
```


 An implementation of the function with the same name
 Function must exist in the current module, and the arity
 of the function must match the number of arguments, else a
 compilation error occurs.
 



 The following longer format with module name is also valid as
 long as Module is the name of the current module. This
 can be useful for documentation purposes.
 



```erlang

  -spec Module:Function(ArgType1, ..., ArgTypeN) -> ReturnType.
```


 Also, for documentation purposes, argument names can be given:
 



```erlang

  -spec Function(ArgName1 :: Type1, ..., ArgNameN :: TypeN) -> RT.
```


 A function specification can be overloaded.
 That is, it can have several types, separated by a semicolon (;):
 



```erlang

  -spec foo(T1, T2) -> T3
         ; (T4, T5) -> T6.
```


 A current restriction, which currently results in a warning
 by Dialyzer, is that the domains of the argument types cannot overlap.
 For example, the following specification results in a warning:
 



```erlang

  -spec foo(pos_integer()) -> pos_integer()
         ; (integer()) -> integer().
```


 Type variables can be used in specifications to specify relations for
 the input and output arguments of a function.
 For example, the following specification defines the type of a
 polymorphic identity function:
 



 Notice that the above specification does not restrict the input
 and output type in any way.
 These types can be constrained by guard-like subtype constraints
 and provide bounded quantification:
 



```erlang
  -spec id(X) -> X when X :: tuple().
```


 Currently, the :: constraint
 (read as «is a subtype of») is
 the only guard constraint that can be used in the when
 part of a -spec attribute.
 



Note






 The above function specification uses multiple occurrences of
 the same type variable. That provides more type information than the
 following function specification, where the type variables are missing:
 



```erlang
  -spec id(tuple()) -> tuple().
```


 The latter specification says that the function takes some tuple
 and returns some tuple. The specification with the X type
 variable specifies that the function takes a tuple and returns
 **the same** tuple.
 



 However, it is up to the tools that process the specifications
 to choose whether to take this extra information into account
 or not.
 





 The scope of a :: constraint is the
 (...) -> RetType
 specification after which it appears. To avoid confusion,
 it is suggested that different variables are used in different
 constituents of an overloaded contract, as shown in the
 following example:
 



```erlang

  -spec foo({X, integer()}) -> X when X :: atom()
         ; ([Y]) -> Y when Y :: number().
```


 Some functions in Erlang are not meant to return;
 either because they define servers or because they are used to
 throw exceptions, as in the following function:
 



```erlang
  my_error(Err) -> erlang:throw({error, Err}).
```


 For such functions, it is recommended to use the special
 no_return() type for their "return", through a contract
 of the following form:
 



```erlang
  -spec my_error(term()) -> no_return().
```


Note





Erlang uses the shorthand version _ as an anonymous type variable
 equivalent to term() or any(). For example, the following function



```erlang
  -spec Function(string(), _) -> string().
```

is equivalent to:



```erlang
  -spec Function(string(), any()) -> string().
```








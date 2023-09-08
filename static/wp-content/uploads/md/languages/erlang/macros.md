
# 10 Preprocessor

<!--#file-inclusion#-->
### 10.1  File Inclusion


A file can be included as follows:



```erlang

-include(File).
-include_lib(File).
```

File, a string, is to point out a file. The contents of
 this file are included as is, at the position of the directive.


Include files are typically used for record and macro
 definitions that are shared by several modules. It is
 recommended to use the file name extension .hrl for
 include files.


File can start with a path component $VAR, for
 some string VAR. If that is the case, the value of
 the environment variable VAR as returned by
 os:getenv(VAR) is substituted for $VAR. If
 os:getenv(VAR) returns false, $VAR is left
 as is.


If the filename File is absolute (possibly after
 variable substitution), the include file with that name is
 included. Otherwise, the specified file is searched for
 in the following directories, and in this order:


1. The current working directory
2. The directory where the module is being compiled
3. The directories given by the include option


For details, see the
 [erlc(1)](https://www.erlang.org/../man/erlc.html) manual page
 in ERTS and
 [compile(3)](https://www.erlang.org/../man/compile.html)
 manual page in Compiler.


**Examples:**



```erlang

-include("my_records.hrl").
-include("incdir/my_records.hrl").
-include("/home/user/proj/my_records.hrl").
-include("$PROJ_ROOT/my_records.hrl").
```

include_lib is similar to include, but is not to
 point out an absolute file. Instead, the first path component
 (possibly after variable substitution) is assumed to be
 the name of an application.


**Example:**



```erlang

-include_lib("kernel/include/file.hrl").
```

The code server uses code:lib_dir(kernel) to find
 the directory of the current (latest) version of Kernel, and
 then the subdirectory include is searched for the file
 file.hrl.

<!--#defining-and-using-macros-->
### 10.2  Defining and Using Macros


A macro is defined as follows:



```erlang
-define(Const, Replacement).
-define(Func(Var1,...,VarN), Replacement).
```

A macro definition can be placed anywhere among the attributes
 and function declarations of a module, but the definition must
 come before any usage of the macro.


If a macro is used in several modules, it is recommended that
 the macro definition is placed in an include file.


A macro is used as follows:



```erlang
?Const
?Func(Arg1,...,ArgN)
```

Macros are expanded during compilation. A simple macro
 ?Const is replaced with Replacement.


**Example:**



```erlang
-define(TIMEOUT, 200).
...
call(Request) ->
    server:call(refserver, Request, ?TIMEOUT).
```

This is expanded to:



```erlang
call(Request) ->
    server:call(refserver, Request, 200).
```

A macro ?Func(Arg1,...,ArgN) is replaced with
 Replacement, where all occurrences of a variable Var
 from the macro definition are replaced with the corresponding
 argument Arg.


**Example:**



```erlang
-define(MACRO1(X, Y), {a, X, b, Y}).
...
bar(X) ->
    ?MACRO1(a, b),
    ?MACRO1(X, 123)
```

This is expanded to:



```erlang
bar(X) ->
    {a,a,b,b},
    {a,X,b,123}.
```

It is good programming practice, but not mandatory, to ensure
 that a macro definition is a valid Erlang syntactic form.


To view the result of macro expansion, a module can be compiled
 with the 'P' option. compile:file(File, ['P']).
 This produces a listing of the parsed code after preprocessing
 and parse transforms, in the file File.P.

<!--#predefined-macros#-->
### 10.3  Predefined Macros



 The following macros are predefined:



**?MODULE**
The name of the current module.
**?MODULE_STRING.**
The name of the current module, as a string.
**?FILE.**
The file name of the current module.
**?LINE.**
The current line number.
**?MACHINE.**
The machine name, 'BEAM'.
**?FUNCTION_NAME**
The name of the current function.
**?FUNCTION_ARITY**
The arity (number of arguments) for the current function.
**?OTP_RELEASE**
The OTP release that the currently executing ERTS
 application is part of, as an integer. For details, see
 [erlang:system_info(otp_release)](https://www.erlang.org/../man/erlang.html#system_info-1).
 This macro was introduced in OTP release 21.
**?FEATURE_AVAILABLE(Feature)**
Expands to true if the [feature](https://www.erlang.org/../reference_manual/features.html#features)
Feature is available. The feature might or might not
 be enabled. This macro was introduced with OTP release
 25.
**?FEATURE_ENABLED(Feature)**
Expands to true if the [feature](https://www.erlang.org/../reference_manual/features.html#features)
Feature is enabled. This macro was introduced with OTP
 release 25.

<!--#macros-overloading-->
### 10.4  Macros Overloading


It is possible to overload macros, except for predefined
 macros. An overloaded macro has more than one definition,
 each with a different number of arguments.


The feature was added in Erlang 5.7.5/OTP R13B04.


A macro ?Func(Arg1,...,ArgN) with a (possibly empty)
 list of arguments results in an error message if there is at
 least one definition of Func with arguments, but none
 with N arguments.


Assuming these definitions:



```erlang
-define(F0(), c).
-define(F1(A), A).
-define(C, m:f).
```

the following does not work:



```erlang
f0() ->
    ?F0. % No, an empty list of arguments expected.

f1(A) ->
    ?F1(A, A). % No, exactly one argument expected.
```

On the other hand,


is expanded to

<!--#flow-control-in-macros#-->
### 10.5  Flow Control in Macros


The following macro directives are supplied:



**-undef(Macro).**
Causes the macro to behave as if it had never been defined.
**-ifdef(Macro).**
Evaluate the following lines only if Macro is
 defined.
**-ifndef(Macro).**
Evaluate the following lines only if Macro is not
 defined.
**-else.**
Only allowed after an ifdef or ifndef
 directive. If that condition is false, the lines following
 else are evaluated instead.
**-endif.**
Specifies the end of an ifdef, an ifndef
 directive, or the end of an if or elif directive.
**-if(Condition).**
Evaluates the following lines only if Condition
 evaluates to true.
**-elif(Condition).**
Only allowed after an if or another elif directive.
 If the preceding if or elif directives do not
 evaluate to true, and the Condition evaluates to true,
 the lines following the elif are evaluated instead.


Note





The macro directives cannot be used inside functions.




**Example:**



```erlang
-module(m).
...

-ifdef(debug).
-define(LOG(X), io:format("{~p,~p}: ~p~n", [?MODULE,?LINE,X])).
-else.
-define(LOG(X), true).
-endif.

...
```

When trace output is desired, debug is to be defined
 when the module m is compiled:



```erlang

% erlc -Ddebug m.erl

or

1> c(m, {d, debug}).
{ok,m}
```

?LOG(Arg) is then expanded to a call to io:format/2
 and provide the user with some simple trace output.


**Example:**



```erlang
-module(m)
...
-ifdef(OTP_RELEASE).
  %% OTP 21 or higher
  -if(?OTP_RELEASE >= 22).
    %% Code that will work in OTP 22 or higher
  -elif(?OTP_RELEASE >= 21).
    %% Code that will work in OTP 21 or higher
  -endif.
-else.
  %% OTP 20 or lower.
-endif.
...
```

The code uses the OTP_RELEASE macro to conditionally
 select code depending on release.

<!--#feature-directive#-->
### 10.6  The -feature() directive




 The directive -feature(FeatureName, enable | disable) can
 be used to enable or disable the [feature](https://www.erlang.org/../reference_manual/features.html#features)
FeatureName. This is the preferred way of enabling
 (disabling) features, although it is possible to do it with
 options to the compiler as well.
 



 Note that the -feature(..) directive may only appear
 before any syntax is used. In practice this means it should
 appear before any -export(..) or record definitions.
 

<!--#error-and-warning-directives#-->
### 10.7  -error() and -warning() directives


The directive -error(Term) causes a compilation error.


**Example:**



```erlang
-module(t).
-export([version/0]).

-ifdef(VERSION).
version() -> ?VERSION.
-else.
-error("Macro VERSION must be defined.").
version() -> "".
-endif.
```

The error message will look like this:



```erlang

% erlc t.erl
t.erl:7: -error("Macro VERSION must be defined.").
```

The directive -warning(Term) causes a compilation warning.


**Example:**



```erlang
-module(t).
-export([version/0]).

-ifndef(VERSION).
-warning("Macro VERSION not defined -- using default version.").
-define(VERSION, "0").
-endif.
version() -> ?VERSION.
```

The warning message will look like this:



```erlang

% erlc t.erl
t.erl:5: Warning: -warning("Macro VERSION not defined -- using default version.").
```

The -error() and -warning() directives were added
 in OTP 19.

<!--#stringifying-macro-arguments-->
### 10.8  Stringifying Macro Arguments


The construction ??Arg, where Arg is a macro
 argument, is expanded to a string containing the tokens of
 the argument. This is similar to the #arg stringifying
 construction in C.


**Example:**



```erlang
-define(TESTCALL(Call), io:format("Call ~s: ~w~n", [??Call, Call])).

?TESTCALL(myfunction(1,2)),
?TESTCALL(you:function(2,1)).
```

results in



```erlang
io:format("Call ~s: ~w~n",["myfunction ( 1 , 2 )",myfunction(1,2)]),
io:format("Call ~s: ~w~n",["you : function ( 2 , 1 )",you:function(2,1)]).
```

That is, a trace output, with both the function called and
 the resulting value.







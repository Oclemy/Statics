
# 5 Modules

<!--#module-syntax#-->
### 5.1  Module Syntax


Erlang code is divided into **modules**. A module consists
 of a sequence of attributes and function declarations, each
 terminated by period (.).


**Example:**



```erlang

-module(m).          % module attribute
-export([fact/1]).   % module attribute

fact(N) when N>0 ->  % beginning of function declaration
    N * fact(N-1);   %  |
fact(0) ->           %  |
    1.               % end of function declaration
```

For a description of function declarations, see
 [Function Declaration Syntax](https://www.erlang.org/functions.html).

<!--#module-attributes#-->
### 5.2  Module Attributes


A **module attribute** defines a certain property of a
 module.


A module attribute consists of a tag and a value:


Tag must be an atom, while Value must be a literal
 term. As a convenience in user-defined attributes, if the literal term
 Value has the syntax Name/Arity
 (where Name is an atom and Arity a positive integer),
 the term Name/Arity is translated to {Name,Arity}.


Any module attribute can be specified. The attributes are stored
 in the compiled code and can be retrieved by calling
 Module:module_info(attributes), or by using the module
 [beam_lib(3)](https://www.erlang.org/../man/beam_lib.html#chunks-2)
 in STDLIB.


Several module attributes have predefined meanings.
 Some of them have arity two, but user-defined module
 attributes must have arity one.


#### Pre-Defined Module Attributes


Pre-defined module attributes is to be placed before any
 function declaration.



**-module(Module).**

Module declaration, defining the name of the module.
 The name Module, an atom, is to be same as
 the file name minus the extension .erl. Otherwise
 [code loading](https://www.erlang.org/code_loading.html#loading) does
 not work as intended.


This attribute is to be specified first and is the only
 mandatory attribute.



**-export(Functions).**

Exported functions. Specifies which of the functions,
 defined within the module, that are visible from outside
 the module.


Functions is a list
 [Name1/Arity1, ..., NameN/ArityN], where each
 NameI is an atom and ArityI an integer.



**-import(Module,Functions).**

Imported functions. Can be called
 the same way as local functions, that is, without any module
 prefix.


Module, an atom, specifies which module to import
 functions from. Functions is a list similar as for
 export.



**-compile(Options).**

Compiler options. Options is a single option
 or a list of options.
 This attribute is added to the option list when
 compiling the module. See the [compile(3)](https://www.erlang.org/../man/compile.html) manual page in Compiler.



**-vsn(Vsn).**

Module version. Vsn is any literal term and can be
 retrieved using beam_lib:version/1, see the
 [beam_lib(3)](https://www.erlang.org/../man/beam_lib.html#version-1)
 manual page in STDLIB.


If this attribute is not specified, the version defaults
 to the MD5 checksum of the module.



**-on_load(Function).**

This attribute names a function that is to be run
 automatically when a
 module is loaded. For more information, see
 [Running a Function When a Module is Loaded](https://www.erlang.org/code_loading.html#on_load).



**-nifs(Functions).**


 Specifies which of the functions, defined within the module, that
 may be loaded as NIFs with [erlang:load_nif/2](https://www.erlang.org/../man/erlang.html#load_nif-2).
 



Functions is a list
 [Name1/Arity1, ..., NameN/ArityN], where each
 NameI is an atom and ArityI an integer.
 



Note






 The -nifs() attribute was introduced in OTP 25.0. For older
 Erlang source code without it, any functions in the module may be
 loaded as NIFs. However, it is recommended to declare the NIFs with
 the -nifs attribute. This allows the compiler to make better
 decisions regarding optimizations for example.
 



 There is no need to add -nifs([]) in modules that do not
 load NIFs. The lack of any call to
 [erlang:load_nif/2](https://www.erlang.org/../man/erlang.html#load_nif-2),
 from within the module, is enough for the compiler to draw the
 same conclusion.
 






#### Behaviour Module Attribute


It is possible to specify that the module is the callback
 module for a **behaviour**:


The atom Behaviour gives the name of the behaviour,
 which can be a user-defined behaviour or one of the following OTP
 standard behaviours:


* gen_server
* gen_statem
* gen_event
* supervisor


The spelling behavior is also accepted.


The callback functions of the module can be specified either
 directly by the exported function behaviour_info/1:



```erlang

behaviour_info(callbacks) -> Callbacks.
```

or by a -callback attribute for each callback
 function:



```erlang

-callback Name(Arguments) -> Result.
```

Here, Arguments is a list of zero or more arguments.
 The -callback attribute is to be preferred since the
 extra type information can be used by tools to produce
 documentation or find discrepancies.


Read more about behaviours and callback modules in
 [OTP Design Principles](https://www.erlang.org/../design_principles/spec_proc.html#behaviours).


#### Record Definitions


The same syntax as for module attributes is used
 for record definitions:


Record definitions are allowed anywhere in a module,
 also among the function declarations.
 Read more in [Records](https://www.erlang.org/records.html).


#### Preprocessor


The same syntax as for module attributes is used by
 the preprocessor, which supports file inclusion, macros,
 and conditional compilation:



```erlang

-include("SomeFile.hrl").
-define(Macro,Replacement).
```

Read more in [Preprocessor](https://www.erlang.org/macros.html).


#### Setting File and Line


The same syntax as for module attributes is used for
 changing the pre-defined macros ?FILE and ?LINE:


This attribute is used by tools, such as Yecc, to inform the
 compiler that the source program is generated by another tool.
 It also indicates the correspondence of source files to lines of
 the original user-written file, from which the source program
 is produced.


#### Types and function specifications


A similar syntax as for module attributes is used for 
 specifying types and function specifications:
 



```erlang

-type my_type() :: atom() | integer().
-spec my_function(integer()) -> integer().
```

Read more in [Types and Function specifications](https://www.erlang.org/typespec.html).
 



 The description is based on
 [EEP8 -
 Types and function specifications](http://www.erlang.org/eeps/eep-0008.html),
 which is not to be further updated.
 

<!--#the-feature-directive#-->
### 5.3   The feature directive



 While not a module attribute, but rather a directive (since it
 might affect syntax), there is the -feature(..)
 directive used for enabling and disabling [features](https://www.erlang.org/../reference_manual/features.html#features).
 



 The syntax is similar to that of an attribute, but has two
 arguments:
 



```erlang

-feature(FeatureName, enable | disable).
```


 Note that the [feature directive](https://www.erlang.org/macros.html#feature-directive)
 can only appear in a prefix of the module.
 


Comments can be placed anywhere in a module except within strings
 and quoted atoms. A comment begins with the character "%",
 continues up to, but does not include the next end-of-line, and
 has no effect. Notice that the terminating end-of-line has
 the effect of white space.

<!--#module_info-0-and-module_info-1-functions#-->
### 5.5  module_info/0 and module_info/1 functions


The compiler automatically inserts the two special, exported
 functions into each module:


* Module:module_info/0
* Module:module_info/1


These functions can be called to retrieve information
 about the module.


#### module_info/0


The module_info/0 function in each module, returns
 a list of {Key,Value} tuples with information about
 the module. Currently, the list contain tuples with the following
 Keys: module, attributes, compile,
 exports, md5 and native.
 The order and number of tuples
 may change without prior notice.


#### module_info/1


The call module_info(Key), where Key is an atom,
 returns a single piece of information about the module.


The following values are allowed for Key:



**module**

Returns an atom representing the module name.



**attributes**

Returns a list of {AttributeName,ValueList} tuples,
 where AttributeName is the name of an attribute,
 and ValueList is a list of values. Notice that a given
 attribute can occur more than once in the list with different
 values if the attribute occurs more than once in the module.


The list of attributes becomes empty if
 the module is stripped with the
 [beam_lib(3)](https://www.erlang.org/../man/beam_lib.html#strip-1)
 module (in STDLIB).



**compile**

Returns a list of tuples with information about
 how the module was compiled. This list is empty if
 the module has been stripped with the
 [beam_lib(3)](https://www.erlang.org/../man/beam_lib.html#strip-1)
 module (in STDLIB).



**md5**

Returns a binary representing the MD5 checksum of the module.
 If the module has native code loaded, this will be the MD5 of the
 native code, not the BEAM bytecode.



**exports**

Returns a list of {Name,Arity} tuples with
 all exported functions in the module.



**functions**

Returns a list of {Name,Arity} tuples with
 all functions in the module.



**nifs**

Returns a list of {Name,Arity} tuples with
 all NIF functions in the module.



**native**

Return true if the module has native compiled code.
 Return false otherwise. In a system compiled without HiPE
 support, the result is always false









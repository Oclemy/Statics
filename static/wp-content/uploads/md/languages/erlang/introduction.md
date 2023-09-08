

# 1 Introduction



This section is the Erlang reference manual. It describes the
 Erlang programming language. 


### 1.1  Purpose


The focus of the Erlang reference manual is on the language itself,
 not the implementation of it. The language constructs are described in
 text and with examples rather than formally specified. This is
 to make the manual more readable.
 The Erlang reference manual is not intended as a tutorial.


Information about implementation of Erlang can, for example, be found,
 in the following:


### 1.2  Prerequisites


It is assumed that the reader has done some programming and
 is familiar with concepts such as data types and programming
 language syntax.


### 1.3  Document Conventions


In this section, the following terminology is used:


* A **sequence** is one or more items. For example, a
 clause body consists of a sequence of expressions. This
 means that there must be at least one expression.
* A **list** is any number of items. For example,
 an argument list can consist of zero, one, or more arguments.


If a feature has been added in R13A or later,
 this is mentioned in the text.


### 1.4  Complete List of BIFs


For a complete list of BIFs, their arguments and return values,
 see [erlang(3)](https://www.erlang.org/../man/erlang.html)
 manual page in ERTS.


### 1.5  Reserved Words


The following are reserved words in Erlang:

```erlang
after and andalso band begin bnot bor bsl bsr bxor case catch
 cond div end fun if let not of or orelse receive rem try
 when xor
```

> **Note**: cond and let, while reserved,
 are currently not used by the language.








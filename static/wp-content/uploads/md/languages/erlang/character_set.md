

# 2 Character Set and Source File Encoding


### 2.1  Character Set


The syntax of Erlang tokens allow the use of the full
 ISO-8859-1 (Latin-1) character set. This is noticeable in the
 following ways:





|  |  |  |  |
| --- | --- | --- | --- |
| **Octal** | **Decimal** |  | **Class** |
| 200 - 237 | 128 - 159 |  | Control characters |
| 240 - 277 | 160 - 191 | - ¿ | Punctuation characters |
| 300 - 326 | 192 - 214 | À - Ö | Uppercase letters |
| 327 | 215 | × | Punctuation character |
| 330 - 336 | 216 - 222 | Ø - Þ | Uppercase letters |
| 337 - 366 | 223 - 246 | ß - ö | Lowercase letters |
| 367 | 247 | ÷ | Punctuation character |
| 370 - 377 | 248 - 255 | ø - ÿ | Lowercase letters |


Table 2.1:  Character Classes



In Erlang/OTP R16B the syntax of Erlang tokens was extended to
 handle Unicode. The support was limited to
 string literals and comments.
 More about the usage of Unicode in Erlang source files
 can be found in [STDLIB's User's
 Guide](https://www.erlang.org/../apps/stdlib/unicode_usage.html#unicode_in_erlang).


From Erlang/OTP 20, atoms and function names are also allowed
 to contain Unicode characters outside the ISO-Latin-1 range.
 Module names, application names, and node names are still
 restricted to the ISO-Latin-1 range.

<!--#source-file-encoding#-->
### 2.2  Source File Encoding



The Erlang source file encoding is selected by a
 comment in one of the first two lines of the source file. The
 first string that matches the regular expression
 coding\s\*[:=]\s\*([-a-zA-Z0-9])+ selects the encoding. If
 the matching string is an invalid encoding, it is ignored. The
 valid encodings are Latin-1 and UTF-8, where the
 case of the characters can be chosen freely.


The following example selects UTF-8 as default encoding:


Two more examples, both selecting Latin-1 as default encoding:



```erlang

%% For this file we have chosen encoding = Latin-1
```


```erlang

%% -*- coding: latin-1 -*-
```

The default encoding for Erlang source files is changed from
 Latin-1 to UTF-8 since Erlang/OTP 17.0.








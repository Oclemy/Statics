# Test Coverage

Deno will collect test coverage into a directory for your code if you specify
the `--coverage` flag when starting `deno test`.


This coverage information is acquired directly from the JavaScript engine (V8)
which is very accurate.


This can then be further processed from the internal format into well known
formats by the `deno coverage` tool.



> 
> ⚠️ To ensure consistent coverage results, make sure to process coverage data
> immediately after running tests. Otherwise source code and collected coverage
> data might get out of sync and unexpectedly show uncovered lines.
> 
> 
> 



```typescript

git clone https://github.com/oakserver/oak && cd oak


deno test --coverage=cov_profile


deno coverage cov_profile


deno coverage cov_profile --lcov --output=cov_profile.lcov


genhtml -o cov_profile/html cov_profile.lcov
```
By default, `deno coverage` will exclude any files matching the regular
expression `test.(ts|tsx|mts|js|mjs|jsx|cjs|cts)` and only consider including
specifiers matching the regular expression `^file:` - ie. remote files will be
excluded from coverage report.


These filters can be overridden using the `--exclude` and `--include` flags. A
module specifier must *match* the include_regular expression and *not match* the
exclude_ expression for it to be a part of the report.






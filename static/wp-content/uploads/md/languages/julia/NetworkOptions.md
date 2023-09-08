
```julia
verify_host(url::AbstractString, [transport::AbstractString]) :: Bool
```
The `verify_host` function tells the caller whether the identity of a host should be verified when communicating over secure transports like TLS or SSH. The `url` argument may be:

1. a proper URL staring with `proto://`
2. an `ssh`-style bare host name or host name prefixed with `user@`
3. an `scp`-style host as above, followed by `:` and a path location

In each case the host name part is parsed out and the decision about whether to verify or not is made based solely on the host name, not anything else about the input URL. In particular, the protocol of the URL does not matter (more below).

The `transport` argument indicates the kind of transport that the query is about. The currently known values are `SSL` (alias `TLS`) and `SSH`. If the transport is omitted, the query will return `true` only if the host name should not be verified regardless of transport.

The host name is matched against the host patterns in the relevant environment variables depending on whether `transport` is supplied and what its value is:

* `JULIA_NO_VERIFY_HOSTS` — hosts that should not be verified for any transport
* `JULIA_SSL_NO_VERIFY_HOSTS` — hosts that should not be verified for SSL/TLS
* `JULIA_SSH_NO_VERIFY_HOSTS` — hosts that should not be verified for SSH
* `JULIA_ALWAYS_VERIFY_HOSTS` — hosts that should always be verified

The values of each of these variables is a comma-separated list of host name patterns with the following syntax — each pattern is split on `.` into parts and each part must one of:

1. A literal domain name component consisting of one or more ASCII letter, digit, hyphen or underscore (technically not part of a legal host name, but sometimes used). A literal domain name component matches only itself.
2. A `**`, which matches zero or more domain name components.
3. A `*`, which match any one domain name component.

When matching a host name against a pattern list in one of these variables, the host name is split on `.` into components and that sequence of words is matched against the pattern: a literal pattern matches exactly one host name component with that value; a `*` pattern matches exactly one host name component with any value; a `**` pattern matches any number of host name components. For example:

* `**` matches any host name
* `**.org` matches any host name in the `.org` top-level domain
* `example.com` matches only the exact host name `example.com`
* `*.example.com` matches `api.example.com` but not `example.com` or `v1.api.example.com`
* `**.example.com` matches any domain under `example.com`, including `example.com` itself, `api.example.com` and `v1.api.example.com`




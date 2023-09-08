# Coroutines guide

Kotlin, as a language, provides only minimal low-level APIs in its standard library to enable various other 
libraries to utilize coroutines. Unlike many other languages with similar capabilities, `async` and `await`
are not keywords in Kotlin and are not even part of its standard library. Moreover, Kotlin's concept
of _suspending function_ provides a safer and less error-prone abstraction for asynchronous 
operations than futures and promises.  

`kotlinx.coroutines` is a rich library for coroutines developed by JetBrains. It contains a number of high-level 
coroutine-enabled primitives that this guide covers, including `launch`, `async` and others. 

This is a guide on core features of `kotlinx.coroutines` with a series of examples, divided up into different topics.

In order to use coroutines as well as follow the examples in this guide, you need to add a dependency on the `kotlinx-coroutines-core` module as explained 
[in the project README](https://github.com/Kotlin/kotlinx.coroutines/blob/master/README.md#using-in-your-projects).

## Table of contents

* Coroutines basics
* Hands-on: Intro to coroutines and channels
* Cancellation and timeouts
* Composing suspending functions
* Coroutine context and dispatchers
* Asynchronous Flow
* Channels
* Coroutine exceptions handling
* Shared mutable state and concurrency
* Select expression (experimental)
* Tutorial: Debug coroutines using IntelliJ IDEA
* Tutorial: Debug Kotlin Flow using IntelliJ IDEA



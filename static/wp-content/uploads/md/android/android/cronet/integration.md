# Use Cronet with other libraries

Cronet is a powerful and flexible tool that can be used in combination with other libraries, providing the best of utility, simplicity, and performance.

ExoPlayer natively supports Cronet through its Cronet extension. Cronet is used by some of the world’s biggest streaming applications, including YouTube.

For more details, visit the ExoPlayer site.

gRPC
----

Cronet can be used as the transport layer for gRPC on Android. This lets your Android app make RPCs using the same networking stack as used in the Chrome browser.

For more details, visit the gRPC repository.

OkHttp
------

The Cronet team provides a library that enables OkHttp users to use Cronet as their transport layer, benefiting from features like QUIC/HTTP3 support or connection migration. The library can also be used with other OkHttp-based libraries such as Retrofit, Coil, and others.

For more details, visit the Cronet Transport for OkHttp repository.

Glide
-----

Cronet is a good default choice with Glide and will provide better performance than Glide’s default integration with the standard Android networking stack.

For more details, visit the Glide site.

Dart
----

Cronet can be used in Dart as a drop-in replacement for the `dart:io` package.

For more details, visit the Cronet Dart bindings repository and read a blogpost about how it came to existence!
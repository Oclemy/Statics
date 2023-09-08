# Build client-server applications with gRPC

gRPC is a modern, open-source, high-performance RPC framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health-checking, and authentication. It is also applicable in the last mile of distributed computing to connect devices, mobile applications, and browsers to backend services. You can find documentation on gRPC’s official website and get support from open source communities. This guide points you to solutions for building Android apps using gRPC.

grpc.io is the official website for the gRPC project. To learn more about how gRPC works, see What is gRPC? and gRPC Concepts. To learn how to use gRPC in an Android app, see the Hello World example in gRPC Android Java Quickstart. You can also find several other gRPC Android examples on GitHub.

Features
--------

**Procedure call makes it simple**

Because it’s RPC, the programming model is procedure calls: the networking aspect of the technology is abstracted away from application code, making it look almost as if it was a normal in-process function call. Your client-server interaction will not be constrained by the semantics of HTTP resource methods (such as GET, PUT, POST, and DELETE). Compared to REST APIs, your implementation looks more natural, without the need for handling HTTP protocol metadata.

**Efficient network transmission with HTTP/2**

Transmitting data from mobile devices to a backend server can be a very resource-intensive process. Using the standard HTTP/1.1 protocol, frequent connections from a mobile device to a cloud service can drain the battery, increase latency, and block other apps from connecting. By default, gRPC runs on top of HTTP/2, which introduces bi-directional streaming, flow control, header compression, and the ability to multiplex requests over a single TCP/IP connection. The result is that gRPC can reduce resource usage, resulting in lower response times between your app and services running in the cloud, reduced network usage, and longer battery life for client running on mobile devices.

Built-in streaming data exchange support

gRPC was designed with HTTP/2’s support for full-duplex bidirectional streaming in mind from the outset. Streaming allows a request and response to have an arbitrarily large size, such as operations that require uploading or downloading a large amount of information. With streaming, client and server can read and write messages simultaneously and subscribe to each other without tracking resource IDs. This makes your app implementation more flexible.

**Seamless integration with Protocol Buffer**

gRPC uses Protocol Buffers (Protobuf) as its serialization/deserialization method with optimized-for-Android codegen plugin (Protobuf Java Lite). Compared to text-based format (such as JSON), Protobuf offers more efficient data exchanging in terms of marshaling speed and code size, which makes it more suitable to be used in mobile environments. Also Protobuf’s concise message/service definition syntax makes it much easier to define data model and application protocols for your app.

Usage overview
--------------

Following the gRPC Basics - Android Java tutorial, using gRPC for Android apps involves four steps:

*   Define RPC services with protocol buffers and generate the gRPC client interfaces.
*   Build a Channel that serves as the medium for RPC calls between client and server.
*   Create a client Stub as the entry point for initiating RPC calls from client side.
*   Make RPC calls to remote server as you would when performing local procedure calls.

For demonstration purposes, bytes are transmitted in plain text in the provided example. However, your app should always encrypt network data in production. gRPC provides SSL/TLS encryption support as well as OAuth token exchanging (OAuth2 with Google services) for authentication. For more details, see TLS on Android and Using OAuth2.

Transport
---------

gRPC provides two choices of Transport implementations for Android clients: OkHttp and Cronet.

**Choose a transport (advanced)**

*   OkHttp
    
    OkHttp is a light-weight networking stack designed for use on mobile. It is gRPC’s default transport for running in Android environment. To use OkHttp as gRPC transport for your app, construct the channel with `AndroidChannelBuilder`, which wraps `OkHttpChannelBuilder` and will register a network monitor with the Android OS to quickly respond to network changes. An example usage can be found in gRPC-Java AndroidChannelBuilder.
    
*   Cronet (experimental)
    
    Cronet is Chromium's Networking stack packaged as a library for mobile. It offers robust networking support with state-of-the-art QUIC protocol, which can be especially effective in unreliable network environments. To learn more details about Cronet, see Perform network operations using Cronet. To use Cronet as gRPC transport for your app, construct the channel with `CronetChannelBuilder`. An example usage is provided in gRPC-Java Cronet Transport.
    

Generally speaking, we recommend apps targeting recent SDK versions use Cronet as it offers a more-powerful network stack. The downside of using Cronet is the APK size increase, as adding the binary Cronet dependency will add >1MB to the app size, versus ~100KB for OkHttp. Starting with GMSCore v.10, an up-to-date copy of Cronet can be loaded from Google Play Services. The APK size may no longer be a concern, although devices without the latest GMSCore installed may still prefer using OkHttp.
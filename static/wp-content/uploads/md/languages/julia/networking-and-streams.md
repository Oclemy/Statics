Julia provides a rich interface to deal with streaming I/O objects such as terminals, pipes and TCP sockets. This interface, though asynchronous at the system level, is presented in a synchronous manner to the programmer and it is usually unnecessary to think about the underlying asynchronous operation. This is achieved by making heavy use of Julia cooperative threading ([coroutine](https://docs.julialang.org/../control-flow/#man-tasks)) functionality.

All Julia streams expose at least a [`read`](https://docs.julialang.org/../../base/io-network/#Base.read) and a [`write`](https://docs.julialang.org/../../base/io-network/#Base.write) method, taking the stream as their first argument, e.g.:


```julia
julia> write(stdout, "Hello World");  # suppress return value 11 with ;
Hello World
julia> read(stdin, Char)

'n': ASCII/Unicode U+000a (category Cc: Other, control)
```
Note that [`write`](https://docs.julialang.org/../../base/io-network/#Base.write) returns 11, the number of bytes (in `"Hello World"`) written to [`stdout`](https://docs.julialang.org/../../base/io-network/#Base.stdout), but this return value is suppressed with the `;`.

Here Enter was pressed again so that Julia would read the newline. Now, as you can see from this example, [`write`](https://docs.julialang.org/../../base/io-network/#Base.write) takes the data to write as its second argument, while [`read`](https://docs.julialang.org/../../base/io-network/#Base.read) takes the type of the data to be read as the second argument.

For example, to read a simple byte array, we could do:


```julia
julia> x = zeros(UInt8, 4)
4-element Array{UInt8,1}:
 0x00
 0x00
 0x00
 0x00

julia> read!(stdin, x)
abcd
4-element Array{UInt8,1}:
 0x61
 0x62
 0x63
 0x64
```
However, since this is slightly cumbersome, there are several convenience methods provided. For example, we could have written the above as:


```julia
julia> read(stdin, 4)
abcd
4-element Array{UInt8,1}:
 0x61
 0x62
 0x63
 0x64
```
or if we had wanted to read the entire line instead:


```julia
julia> readline(stdin)
abcd
"abcd"
```
Note that depending on your terminal settings, your TTY may be line buffered and might thus require an additional enter before the data is sent to Julia.

To read every line from [`stdin`](https://docs.julialang.org/../../base/io-network/#Base.stdin) you can use [`eachline`](https://docs.julialang.org/../../base/io-network/#Base.eachline):


```julia
for line in eachline(stdin)
    print("Found $line")
end
```
or [`read`](https://docs.julialang.org/../../base/io-network/#Base.read) if you wanted to read by character instead:


```julia
while !eof(stdin)
    x = read(stdin, Char)
    println("Found: $x")
end
```
Note that the [`write`](https://docs.julialang.org/../../base/io-network/#Base.write) method mentioned above operates on binary streams. In particular, values do not get converted to any canonical text representation but are written out as is:


```julia
julia> write(stdout, 0x61);  # suppress return value 1 with ;
a
```
Note that `a` is written to [`stdout`](https://docs.julialang.org/../../base/io-network/#Base.stdout) by the [`write`](https://docs.julialang.org/../../base/io-network/#Base.write) function and that the returned value is `1` (since `0x61` is one byte).

For text I/O, use the [`print`](https://docs.julialang.org/../../base/io-network/#Base.print) or [`show`](https://docs.julialang.org/../../base/io-network/#Base.show-Tuple%7BIO,%20Any%7D) methods, depending on your needs (see the documentation for these two methods for a detailed discussion of the difference between them):


```julia
julia> print(stdout, 0x61)
97
```
See [Custom pretty-printing](https://docs.julialang.org/../types/#man-custom-pretty-printing) for more information on how to implement display methods for custom types.

Sometimes IO output can benefit from the ability to pass contextual information into show methods. The [`IOContext`](https://docs.julialang.org/../../base/io-network/#Base.IOContext) object provides this framework for associating arbitrary metadata with an IO object. For example, `:compact => true` adds a hinting parameter to the IO object that the invoked show method should print a shorter output (if applicable). See the [`IOContext`](https://docs.julialang.org/../../base/io-network/#Base.IOContext) documentation for a list of common properties.

Like many other environments, Julia has an [`open`](https://docs.julialang.org/../../base/io-network/#Base.open) function, which takes a filename and returns an [`IOStream`](https://docs.julialang.org/../../base/io-network/#Base.IOStream) object that you can use to read and write things from the file. For example, if we have a file, `hello.txt`, whose contents are `Hello, World!`:


```julia
julia> f = open("hello.txt")
IOStream(<file hello.txt>)

julia> readlines(f)
1-element Array{String,1}:
 "Hello, World!"
```
If you want to write to a file, you can open it with the write (`"w"`) flag:


```julia
julia> f = open("hello.txt","w")
IOStream(<file hello.txt>)

julia> write(f,"Hello again.")
12
```
If you examine the contents of `hello.txt` at this point, you will notice that it is empty; nothing has actually been written to disk yet. This is because the `IOStream` must be closed before the write is actually flushed to disk:


```julia
julia> close(f)
```
Examining `hello.txt` again will show its contents have been changed.

Opening a file, doing something to its contents, and closing it again is a very common pattern. To make this easier, there exists another invocation of [`open`](https://docs.julialang.org/../../base/io-network/#Base.open) which takes a function as its first argument and filename as its second, opens the file, calls the function with the file as an argument, and then closes it again. For example, given a function:


```julia
function read_and_capitalize(f::IOStream)
    return uppercase(read(f, String))
end
```
You can call:


```julia
julia> open(read_and_capitalize, "hello.txt")
"HELLO AGAIN."
```
to open `hello.txt`, call `read_and_capitalize` on it, close `hello.txt` and return the capitalized contents.

To avoid even having to define a named function, you can use the `do` syntax, which creates an anonymous function on the fly:


```julia
julia> open("hello.txt") do f
           uppercase(read(f, String))
       end
"HELLO AGAIN."
```
Let's jump right in with a simple example involving TCP sockets. This functionality is in a standard library package called `Sockets`. Let's first create a simple server:


```julia
julia> using Sockets

julia> errormonitor(@async begin
           server = listen(2000)
           while true
               sock = accept(server)
               println("Hello Worldn")
           end
       end)
Task (runnable) @0x00007fd31dc11ae0
```
To those familiar with the Unix socket API, the method names will feel familiar, though their usage is somewhat simpler than the raw Unix socket API. The first call to [`listen`](https://docs.julialang.org/../../stdlib/Sockets/#Sockets.listen-Tuple%7BAny%7D) will create a server waiting for incoming connections on the specified port (2000) in this case. The same function may also be used to create various other kinds of servers:


```julia
julia> listen(2000) # Listens on localhost:2000 (IPv4)
Sockets.TCPServer(active)

julia> listen(ip"127.0.0.1",2000) # Equivalent to the first
Sockets.TCPServer(active)

julia> listen(ip"::1",2000) # Listens on localhost:2000 (IPv6)
Sockets.TCPServer(active)

julia> listen(IPv4(0),2001) # Listens on port 2001 on all IPv4 interfaces
Sockets.TCPServer(active)

julia> listen(IPv6(0),2001) # Listens on port 2001 on all IPv6 interfaces
Sockets.TCPServer(active)

julia> listen("testsocket") # Listens on a UNIX domain socket
Sockets.PipeServer(active)

julia> listen(".pipetestsocket") # Listens on a Windows named pipe
Sockets.PipeServer(active)
```
Note that the return type of the last invocation is different. This is because this server does not listen on TCP, but rather on a named pipe (Windows) or UNIX domain socket. Also note that Windows named pipe format has to be a specific pattern such that the name prefix (`.pipe`) uniquely identifies the [file type](https://docs.microsoft.com/windows/desktop/ipc/pipe-names). The difference between TCP and named pipes or UNIX domain sockets is subtle and has to do with the [`accept`](https://docs.julialang.org/../../stdlib/Sockets/#Sockets.accept) and [`connect`](https://docs.julialang.org/../../stdlib/Distributed/#Sockets.connect-Tuple%7BClusterManager,%20Int64,%20WorkerConfig%7D) methods. The [`accept`](https://docs.julialang.org/../../stdlib/Sockets/#Sockets.accept) method retrieves a connection to the client that is connecting on the server we just created, while the [`connect`](https://docs.julialang.org/../../stdlib/Distributed/#Sockets.connect-Tuple%7BClusterManager,%20Int64,%20WorkerConfig%7D) function connects to a server using the specified method. The [`connect`](https://docs.julialang.org/../../stdlib/Distributed/#Sockets.connect-Tuple%7BClusterManager,%20Int64,%20WorkerConfig%7D) function takes the same arguments as [`listen`](https://docs.julialang.org/../../stdlib/Sockets/#Sockets.listen-Tuple%7BAny%7D), so, assuming the environment (i.e. host, cwd, etc.) is the same you should be able to pass the same arguments to [`connect`](https://docs.julialang.org/../../stdlib/Distributed/#Sockets.connect-Tuple%7BClusterManager,%20Int64,%20WorkerConfig%7D) as you did to listen to establish the connection. So let's try that out (after having created the server above):


```julia
julia> connect(2000)
TCPSocket(open, 0 bytes waiting)

julia> Hello World
```
As expected we saw "Hello World" printed. So, let's actually analyze what happened behind the scenes. When we called [`connect`](https://docs.julialang.org/../../stdlib/Distributed/#Sockets.connect-Tuple%7BClusterManager,%20Int64,%20WorkerConfig%7D), we connect to the server we had just created. Meanwhile, the accept function returns a server-side connection to the newly created socket and prints "Hello World" to indicate that the connection was successful.

A great strength of Julia is that since the API is exposed synchronously even though the I/O is actually happening asynchronously, we didn't have to worry about callbacks or even making sure that the server gets to run. When we called [`connect`](https://docs.julialang.org/../../stdlib/Distributed/#Sockets.connect-Tuple%7BClusterManager,%20Int64,%20WorkerConfig%7D) the current task waited for the connection to be established and only continued executing after that was done. In this pause, the server task resumed execution (because a connection request was now available), accepted the connection, printed the message and waited for the next client. Reading and writing works in the same way. To see this, consider the following simple echo server:


```julia
julia> errormonitor(@async begin
           server = listen(2001)
           while true
               sock = accept(server)
               @async while isopen(sock)
                   write(sock, readline(sock, keep=true))
               end
           end
       end)
Task (runnable) @0x00007fd31dc12e60

julia> clientside = connect(2001)
TCPSocket(RawFD(28) open, 0 bytes waiting)

julia> errormonitor(@async while isopen(clientside)
           write(stdout, readline(clientside, keep=true))
       end)
Task (runnable) @0x00007fd31dc11870

julia> println(clientside,"Hello World from the Echo Server")
Hello World from the Echo Server
```
As with other streams, use [`close`](https://docs.julialang.org/../../base/io-network/#Base.close) to disconnect the socket:


```julia
julia> close(clientside)
```
One of the [`connect`](https://docs.julialang.org/../../stdlib/Distributed/#Sockets.connect-Tuple%7BClusterManager,%20Int64,%20WorkerConfig%7D) methods that does not follow the [`listen`](https://docs.julialang.org/../../stdlib/Sockets/#Sockets.listen-Tuple%7BAny%7D) methods is `connect(host::String,port)`, which will attempt to connect to the host given by the `host` parameter on the port given by the `port` parameter. It allows you to do things like:


```julia
julia> connect("google.com", 80)
TCPSocket(RawFD(30) open, 0 bytes waiting)
```
At the base of this functionality is [`getaddrinfo`](https://docs.julialang.org/../../stdlib/Sockets/#Sockets.getaddrinfo), which will do the appropriate address resolution:


```julia
julia> getaddrinfo("google.com")
ip"74.125.226.225"
```
All I/O operations exposed by [`Base.read`](https://docs.julialang.org/../../base/io-network/#Base.read) and [`Base.write`](https://docs.julialang.org/../../base/io-network/#Base.write) can be performed asynchronously through the use of [coroutines](https://docs.julialang.org/../control-flow/#man-tasks). You can create a new coroutine to read from or write to a stream using the [`@async`](https://docs.julialang.org/../../base/parallel/#Base.@async) macro:


```julia
julia> task = @async open("foo.txt", "w") do io
           write(io, "Hello, World!")
       end;

julia> wait(task)

julia> readlines("foo.txt")
1-element Array{String,1}:
 "Hello, World!"
```
It's common to run into situations where you want to perform multiple asynchronous operations concurrently and wait until they've all completed. You can use the [`@sync`](https://docs.julialang.org/../../base/parallel/#Base.@sync) macro to cause your program to block until all of the coroutines it wraps around have exited:


```julia
julia> using Sockets

julia> @sync for hostname in ("google.com", "github.com", "julialang.org")
           @async begin
               conn = connect(hostname, 80)
               write(conn, "GET / HTTP/1.1rnHost:$(hostname)rnrn")
               readline(conn, keep=true)
               println("Finished connection to $(hostname)")
           end
       end
Finished connection to google.com
Finished connection to julialang.org
Finished connection to github.com
```
Julia supports [multicast](https://datatracker.ietf.org/doc/html/rfc1112) over IPv4 and IPv6 using the User Datagram Protocol ([UDP](https://datatracker.ietf.org/doc/html/rfc768)) as transport.

Unlike the Transmission Control Protocol ([TCP](https://datatracker.ietf.org/doc/html/rfc793)), UDP makes almost no assumptions about the needs of the application. TCP provides flow control (it accelerates and decelerates to maximize throughput), reliability (lost or corrupt packets are automatically retransmitted), sequencing (packets are ordered by the operating system before they are given to the application), segment size, and session setup and teardown. UDP provides no such features.

A common use for UDP is in multicast applications. TCP is a stateful protocol for communication between exactly two devices. UDP can use special multicast addresses to allow simultaneous communication between many devices.

To transmit data over UDP multicast, simply `recv` on the socket, and the first packet received will be returned. Note that it may not be the first packet that you sent however!


```julia
using Sockets
group = ip"228.5.6.7"
socket = Sockets.UDPSocket()
bind(socket, ip"0.0.0.0", 6789)
join_multicast_group(socket, group)
println(String(recv(socket)))
leave_multicast_group(socket, group)
close(socket)
```
To transmit data over UDP multicast, simply `send` to the socket. Notice that it is not necessary for a sender to join the multicast group.


```julia
using Sockets
group = ip"228.5.6.7"
socket = Sockets.UDPSocket()
send(socket, group, 6789, "Hello over IPv4")
close(socket)
```
This example gives the same functionality as the previous program, but uses IPv6 as the network-layer protocol.

Listener:


```julia
using Sockets
group = Sockets.IPv6("ff05::5:6:7")
socket = Sockets.UDPSocket()
bind(socket, Sockets.IPv6("::"), 6789)
join_multicast_group(socket, group)
println(String(recv(socket)))
leave_multicast_group(socket, group)
close(socket)
```
Sender:


```julia
using Sockets
group = Sockets.IPv6("ff05::5:6:7")
socket = Sockets.UDPSocket()
send(socket, group, 6789, "Hello over IPv6")
close(socket)
```




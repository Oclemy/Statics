
# 15 Distributed Erlang

<!--#distributed-erlang-system#-->
### 15.1  Distributed Erlang System


A **distributed Erlang system** consists of a number of
 Erlang runtime systems communicating with each other. Each such
 runtime system is called a **node**. Message passing between
 processes at different nodes, as well as links and monitors, are
 transparent when pids are used. Registered names, however, are
 local to each node. This means that the node must be specified as well
 when sending messages, and so on, using registered names.


The distribution mechanism is implemented using TCP/IP sockets.
 How to implement an alternative carrier is described in the
 [ERTS User's Guide](https://www.erlang.org/../apps/erts/alt_dist.html).



Warning






 Starting a distributed node without also specifying
 [-proto_dist inet_tls](https://www.erlang.org/../man/erl.html#proto_dist)
 will expose the node to attacks that may give the attacker
 complete access to the node and in extension the cluster.
 When using un-secure distributed nodes, make sure that the
 network is configured to keep potential attackers out.
 See the [Using SSL for Erlang Distribution](https://www.erlang.org/../apps/ssl/ssl_distribution.html) User's Guide
 for details on how to setup a secure distributed node.
 



<!--#nodes#-->
### 15.2  Nodes



 A **node** is an executing Erlang runtime system that has
 been given a name, using the command-line flag
 [-name](https://www.erlang.org/../man/erl.html#name) (long names) or
 [-sname](https://www.erlang.org/../man/erl.html#sname) (short names).
 


The format of the node name is an atom name@host.
 name is the name given by the user. host is
 the full host name if long names are used, or the first part of
 the host name if short names are used. Function
 [node()](https://www.erlang.org/../man/erlang.html#node-0)
 returns the name of the node.


**Example:**



```erlang

% erl -name dilbert
(dilbert@uab.ericsson.se)1> node().
'dilbert@uab.ericsson.se'

% erl -sname dilbert
(dilbert@uab)1> node().
dilbert@uab
```


 The node name can also be given in runtime by calling
 [net_kernel:start/1](https://www.erlang.org/../man/net_kernel.html#start-1).
 


**Example:**



```erlang

% erl
1> node().
nonode@nohost
2> net_kernel:start([dilbert,shortnames]).
{ok,<0.102.0>}
(dilbert@uab)3> node().
dilbert@uab
```


Note





A node with a long node name cannot communicate with a node
 with a short node name.



<!--#node-connections#-->
### 15.3  Node Connections


The nodes in a distributed Erlang system are loosely connected.
 The first time the name of another node is used, for example, if
 spawn(Node,M,F,A) or net_adm:ping(Node) is called,
 a connection attempt to that node is made.


Connections are by default transitive. If a node A connects to
 node B, and node B has a connection to node C, then node A
 also tries to connect to node C. This feature can be turned off by
 using the command-line flag -connect_all false, see the
 [erl(1)](https://www.erlang.org/../man/erl.html) manual page in ERTS.


If a node goes down, all connections to that node are removed.
 Calling erlang:disconnect_node(Node) forces disconnection
 of a node.


The list of (visible) nodes currently connected to is returned by
 nodes().

<!--#epmd#-->
### 15.4  epmd


The Erlang Port Mapper Daemon **epmd** is automatically
 started at every host where an Erlang node is started. It is
 responsible for mapping the symbolic node names to machine
 addresses. See the
 [epmd(1)](https://www.erlang.org/../man/epmd.html) manual page in ERTS.

<!--#hidden-nodes#-->
### 15.5  Hidden Nodes


In a distributed Erlang system, it is sometimes useful to
 connect to a node without also connecting to all other nodes.
 An example is some kind of O&M functionality used to
 inspect the status of a system, without disturbing it. For this
 purpose, a **hidden node** can be used.


A hidden node is a node started with the command-line flag
 -hidden. Connections between hidden nodes and other nodes
 are not transitive, they must be set up explicitly. Also, hidden
 nodes does not show up in the list of nodes returned by
 nodes(). Instead, nodes(hidden) or
 nodes(connected) must be used. This means, for example,
 that the hidden node is not added to the set of nodes that
 global is keeping track of.

<!--#dynamic-node-name#-->
### 15.6  Dynamic Node Name



 If the node name is set to **undefined** the node will
 be started in a special mode to be the temporary client
 of another node. The node will then request a dynamic node
 name from the first node it connects to. In addition these
 distribution settings will be set:
 



 As -dist_auto_connect is set to never,
 [net_kernel:connect_node/1](https://www.erlang.org/../man/net_kernel.html#connect_node-1)
 must be called in order to setup connections. If the first established
 connection is closed (which gave the node its dynamic name), then any
 other connections will also be closed and the node will lose its dynamic
 node name. A new call to
 [net_kernel:connect_node/1](https://www.erlang.org/../man/net_kernel.html#connect_node-1)
 can be made to get a new dynamic node name. The node name may
 change if the distribution is dropped and then set up again.
 



Note






 The **dynamic node name** feature is supported from OTP 23.
 Both the temporary client node and the first connected peer node
 (supplying the dynamic node name) must be at least OTP 23 for it to
 work.
 



<!--#c-nodes#-->
### 15.7  C Nodes


A **C node** is a C program written to act as a hidden node
 in a distributed Erlang system. The library **Erl_Interface**
 contains functions for this purpose. For more information about
 C nodes, see the [Erl_Interface](https://www.erlang.org/../apps/erl_interface/ei_users_guide.html) application and
 [Interoperability Tutorial.](https://www.erlang.org/../tutorial/introduction.html#interoperability%20tutorial).

<!--#security#-->
### 15.8  Security



Note






 "Security" here does **not** mean
 cryptographically secure, but rather
 security against accidental misuse,
 such as preventing a node from connecting
 to a cluster with which it is not intended to communicate.
 



 Furthermore, the communication between nodes
 is per default in clear text.
 If you need strong security, please see
 [Using TLS for Erlang Distribution](https://www.erlang.org/../apps/ssl/ssl_distribution.html) 
 in the SSL application's User's Guide.
 



 Also, the default random cookie mentioned
 in the following text is not very unpredictable.
 A better one can be generated using primitives
 in the crypto module, though this still does not make
 the initial handshake cryptographically secure.
 And inter-node communication is still in clear text.
 




Authentication determines which nodes are allowed to communicate
 with each other. In a network of different Erlang nodes, it is
 built into the system at the lowest possible level.
 All nodes use a **magic cookie**,
 which is an Erlang atom, when connecting another node.


During the connection setup, after node names have been exchanged,
 the magic cookies the nodes present to each other are compared.
 If they do not match, the connection is rejected.
 The cookies themselves are never transferred,
 instead they are compared using hashed challenges,
 although not in a cryptographically secure manner.


At start-up, a node has a random atom assigned as its default
 magic cookie and the cookie of other nodes is assumed to be
 nocookie. The first action of the Erlang network
 authentication server (auth) is then to search for a file named
 .erlang.cookie in the [user's home directory](https://www.erlang.org/../man/init.html#home) and then in
 [filename:basedir(user_config, "erlang")](https://www.erlang.org/../man/filename.html#user_config).
 If none of the files exist, a .erlang.cooke file is created
 in the user's home directory.
 The UNIX permissions mode of the file is set to octal
 400 (read-only by user) and its content is a random string. An
 atom Cookie is created from the contents of the file and
 the cookie of the local node is set to this using
 erlang:set_cookie(Cookie). This sets the default cookie
 that the local node will use for all other nodes.


Thus, groups of users with identical cookie files get Erlang
 nodes that can communicate freely since they use the same
 magic cookie. Users who want to run nodes
 where the cookie files are on different file systems
 must make certain that their cookie files are identical.


For a node Node1 using magic cookie Cookie to be
 able to connect to, and to accept a connection from, another node
 Node2 that uses a different cookie DiffCookie,
 the function erlang:set_cookie(Node2, DiffCookie) must
 first be called at Node1. Distributed systems with
 multiple home directories (differing cookie files)
 can be handled in this way.



Note





With this setup Node1 and Node2 agree
 on which cookie to use: Node1 uses its explicitly
 configured DiffCookie for Node2,
 and Node2 uses its default cookie DiffCookie.


You can also use a DiffCookie that neither
 Node1 nor Node2 has as its default cookie,
 if you also call erlang:set_cookie(Node1, DiffCookie)
 in Node2 before establishing connection


Because node names are exchanged during connection setup
 before cookies are selected, connection setup works regardless
 of which node that initiates it.


Note that to configure Node1 to use Node2's
 default cookie when communicating with Node2,
 **and vice versa** results in a broken configuration
 (if the cookies are different) because then both nodes
 use the other node's (differing) cookie.




The default when a connection is established between two nodes,
 is to immediately connect all other visible nodes as well. This
 way, there is always a fully connected network. If there are
 nodes with different cookies, this method can be inappropriate
 (since it may not be feasible to configure
 different cookies for all possible nodes)
 and the command-line flag -connect_all false must be set,
 see the [erl(1)](https://www.erlang.org/../man/erl.html)
 manual page in ERTS.


The magic cookie of the local node can be retrieved by calling
 erlang:get_cookie().

<!--#distribution-bifs#-->
### 15.9  Distribution BIFs


Some useful BIFs for distributed programming
 (for more information, see the [erlang(3)](https://www.erlang.org/../man/erlang.html) manual page in ERTS:





|  |  |
| --- | --- |
| **BIF** | **Description** |
| erlang:disconnect_node(Node) | Forces the disconnection of a node. |
| erlang:get_cookie() | Returns the magic cookie of the current node. |
| erlang:get_cookie(Node) | Returns the magic cookie
 for node Node. |
| is_alive() | Returns true if the runtime system is a node and can connect to other nodes, false otherwise. |
| monitor_node(Node, true|false) | Monitors the status of
 Node. A message{nodedown, Node} is received
 if the connection to it is lost. |
| node() | Returns the name of the current node. Allowed in guards. |
| node(Arg) | Returns the node where Arg, a pid, reference, or port, is located. |
| nodes() | Returns a list of all visible nodes this node is connected to. |
| nodes(Arg) | Depending on Arg,
 this function can return a list not only of visible nodes,
 but also hidden nodes and previously known nodes, and so on. |
| erlang:set_cookie(Cookie) | Sets the magic cookie,
 Cookie to use when connecting all nodes
 that have no explicit cookie set with
 erlang:set_cookie/2. |
| erlang:set_cookie(Node, Cookie) | Sets the magic cookie used
 when connecting Node. If Node is the
 current node, Cookie is used when connecting
 all nodes that have no explicit cookie set with this function. |
| spawn[_link|_opt](https://www.erlang.org/Node, Fun) | Creates a process at a remote node. |
| spawn[_link|opt](https://www.erlang.org/Node, Module, FunctionName, Args) | Creates a process at a remote node. |


Table
 15.1:
  
 Distribution BIFs


<!--#distribution-command-line-flags#-->
### 15.10  Distribution Command-Line Flags


Examples of command-line flags used for distributed programming
 (for more information, see the [erl(1)](https://www.erlang.org/../man/erl.html)  manual page in ERTS:





|  |  |
| --- | --- |
| **Command-Line Flag** | **Description** |
| -connect_all false | Only explicit connection
 set-ups are used. |
| -hidden | Makes a node into a hidden node. |
| -name Name | Makes a runtime system into a node, using long node names. |
| -setcookie Cookie | Same as calling erlang:set_cookie(Cookie). |
| -setcookie Node Cookie | Same as calling erlang:set_cookie(Node, Cookie). |
| -sname Name | Makes a runtime system into a node, using short node names. |


Table
 15.2:
  
 Distribution Command-Line Flags


<!--#distribution-modules#-->
### 15.11  Distribution Modules


Examples of modules useful for distributed programming:


In the Kernel application:





|  |  |
| --- | --- |
| **Module** | **Description** |
| global | A global name registration facility. |
| global_group | Grouping nodes to global name registration groups. |
| net_adm | Various Erlang net administration routines. |
| net_kernel | Erlang networking kernel. |


Table
 15.3:
  
 Kernel Modules Useful For Distribution.



In the STDLIB application:





|  |  |
| --- | --- |
| **Module** | **Description** |
| slave | Start and control of slave nodes. |


Table
 15.4:
  
 STDLIB Modules Useful For Distribution.








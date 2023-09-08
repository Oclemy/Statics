
# 14 Processes

<!--#processes#-->
### 14.1  Processes


Erlang is designed for massive concurrency. Erlang processes are
 lightweight (grow and shrink dynamically) with small memory
 footprint, fast to create and terminate, and the scheduling
 overhead is low.

<!--#process-creation#-->
### 14.2  Process Creation


A process is created by calling spawn():



```erlang

spawn(Module, Name, Args) -> pid()
  Module = Name = atom()
  Args = [Arg1,...,ArgN]
    ArgI = term()
```

spawn() creates a new process and returns the pid.


The new process starts executing in
 Module:Name(Arg1,...,ArgN) where the arguments are
 the elements of the (possible empty) Args argument list.


There exist a number of different spawn BIFs:


* [spawn/1,2,3,4](https://www.erlang.org/../man/erlang.html#spawn-4)
* [spawn_link/1,2,3,4](https://www.erlang.org/../man/erlang.html#spawn_link-4)
* [spawn_monitor/1,2,3,4](https://www.erlang.org/../man/erlang.html#spawn_monitor-4)
* [spawn_opt/2,3,4,5](https://www.erlang.org/../man/erlang.html#spawn_opt-5)
* [spawn_request/1,2,3,4,5](https://www.erlang.org/../man/erlang.html#spawn_request-5)

<!--#registered-processes#-->
### 14.3  Registered Processes


Besides addressing a process by using its pid, there are also
 BIFs for registering a process under a name. The name must be an
 atom and is automatically unregistered if the process terminates:





|  |  |
| --- | --- |
| **BIF** | **Description** |
| register(Name, Pid) | Associates the name Name, an atom, with the process Pid. |
| registered() | Returns a list of names that
 have been registered using register/2. |
| whereis(Name) | Returns the pid registered
 under Name, or undefined if the name is not
 registered. |


Table
 14.1:
  
 Name Registration BIFs



<!--#process-aliases#-->
### 14.4  Process Aliases



 When sending a message to a process, the receiving process can be
 identified by a [PID](https://www.erlang.org/data_types.html#pid),
 a [registered name](https://www.erlang.org/#registered-processes),
 or a *process alias* which is a term of the type
 [reference](https://www.erlang.org/data_types.html#reference).
 The typical use case that process aliases were designed for is a
 request/reply scenario. Using a process alias when sending the reply
 makes it possible for the receiver of the reply to prevent the reply
 from reaching its message queue if the operation times out or if the
 connection between the processes is lost.
 



 A process alias can be used as identifier of the receiver when
 sending a message using the
 [send operator !](https://www.erlang.org/expressions.html#send) or
 send BIFs such as
 [erlang:send/2](https://www.erlang.org/../man/erlang.html#send-2).
 As long as the process alias is active, messages will be
 delivered the same way as if the process identifier of the process
 that created the alias had been used. When the alias has been
 deactivated, messages sent using the alias will be dropped before
 entering the message queue of the receiver. Note that messages that
 at deactivation time already have entered the message queue will
 **not** be removed.
 



 A process alias is created either by calling one of the
 [alias/0,1](https://www.erlang.org/../man/erlang.html#alias-0)
 BIFs or by creating an alias and a monitor simultaneously. If the
 alias is created together with a monitor, the same reference
 will be used both as monitor reference and alias. Creating
 a monitor and an alias at the same time is done by passing the
 {alias, _} option to the 
 [monitor/3](https://www.erlang.org/../man/erlang.html#monitor-3)
 BIF. The {alias, _} option can also be passed when
 creating a monitor via
 [spawn_opt()](https://www.erlang.org/../man/erlang.html#spawn_opt-5), or
 [spawn_request()](https://www.erlang.org/../man/erlang.html#spawn_request-5).
 



 A process alias can be deactivated by the process that created it
 by calling the
 [unalias/1](https://www.erlang.org/../man/erlang.html#unalias-1) BIF.
 It is also possible to automatically deactivate an alias on
 certain events. See the documentation of the
 [alias/1](https://www.erlang.org/../man/erlang.html#alias-1) BIF,
 and the {alias, _} option of the 
 [monitor/3](https://www.erlang.org/../man/erlang.html#monitor-3) BIF
 for more information about automatic deactivation of aliases.
 



 It is **not** possible to:
 


* create an alias identifying another process than the caller.
* deactivate an alias unless it identifies the caller.
* look up an alias.
* look up the process identified by an alias.
* check if an alias is active or not.
* check if a reference is an alias.



 These are all intentional design decisions relating to
 performance, scalability, and distribution transparency.
 

<!--#process-termination#-->
### 14.5  Process Termination


When a process terminates, it always terminates with an
 **exit reason**. The reason can be any term.


A process is said to terminate **normally**, if the exit
 reason is the atom normal. A process with no more code to
 execute terminates normally.


A process terminates with an exit reason {Reason,Stack}
 when a run-time error occurs. See
 [Exit Reasons](https://www.erlang.org/errors.html#exit_reasons).


A process can terminate itself by calling one of the
 following BIFs:


* exit(Reason)
* erlang:error(Reason)
* erlang:error(Reason, Args)


The process then terminates with reason Reason for
 exit/1 or {Reason,Stack} for the others.


A process can also be terminated if it receives an exit signal
 with another exit reason than normal, see
 [Error Handling](https://www.erlang.org/#errors).

<!--#signals#-->
### 14.6  Signals




 All communication between Erlang processes and Erlang ports is done by
 sending and receiving asynchronous signals. The most common signals are
 Erlang message signals. A message signal can be sent using the
 [send operator !](https://www.erlang.org/expressions.html#send).
 A received message can be fetched from the message queue by the
 receiving process using the
 [receive](https://www.erlang.org/expressions.html#receive)
 expression.
 




 Synchronous communication can be broken down into multiple asynchronous
 signals. An example of such a synchronous communication is a call to the
 [erlang:process_info/2](https://www.erlang.org/../man/erlang.html#process_info-2)
 BIF when the first argument does not equal the process identifier of
 the calling process. The caller sends an asynchronous signal requesting
 information, and then blocks waiting for the reply signal containing
 the requested information. When the request signal reaches its
 destination, the destination process replies with the requested
 information.
 

<!--#links#-->
#### Sending Signals



 There are many signals that processes and ports use to communicate. The list below
 contains the most important signals. In all the
 cases of request/reply signal pairs, the request signal is sent
 by the process calling the specific BIF, and the reply signal is sent
 back to it when the requested operation has been performed.
 



**message**

 Sent when using the
 [send operator !](https://www.erlang.org/expressions.html#send),
 or when calling one of the
 [erlang:send/2,3](https://www.erlang.org/../man/erlang.html#send-2)
 or
 [erlang:send_nosuspend/2,3](https://www.erlang.org/../man/erlang.html#send_nosuspend-2)
 BIFs.
 
**link**

 Sent when calling the
 [link/1](https://www.erlang.org/../man/erlang.html#link-1) BIF.
 
**unlink**

 Sent when calling the
 [unlink/1](https://www.erlang.org/../man/erlang.html#unlink-1) BIF.
 
**exit**

 Sent either when explicitly sending an exit signal by
 calling the
 [exit/2](https://www.erlang.org/../man/erlang.html#exit-2) BIF, or when
 a [linked process
 terminates](https://www.erlang.org/#sending_exit_signals). If the signal is sent due to a link, the
 signal is sent after all [*directly visible Erlang resources*](https://www.erlang.org/#visible-resources) used by the
 process have been released.
 
**monitor**

 Sent when calling one of the
 [monitor/2,3](https://www.erlang.org/../man/erlang.html#monitor-3) BIFs.
 
**demonitor**

 Sent when calling one of the
 [demonitor/1,2](https://www.erlang.org/../man/erlang.html#demonitor-1)
 BIFs, or when a process monitoring another process terminates.
 
**down**

 Sent by a [monitored process or
 port that terminates](https://www.erlang.org/#monitors). The signal is sent after
 all [*directly visible
 Erlang resources*](https://www.erlang.org/#visible-resources) used by the process or the port
 have been released.
 
**change**

 Sent by the [clock
 service](https://www.erlang.org/#runtime-service) on the local runtime system, when the
 [time offset](https://www.erlang.org/../man/erlang.html#time_offset-0)
 changes, to processes which have
 [monitored the
 time_offset](https://www.erlang.org/../man/erlang.html#monitor-2).
 
**group_leader**

 Sent when calling the
 [group_leader/2](https://www.erlang.org/../man/erlang.html#group_leader-2)
 BIF.
 
**spawn_request/spawn_reply,
 open_port_request/open_port_reply**

 Sent due to a call to one of the
 [spawn/1,2,3,4](https://www.erlang.org/../man/erlang.html#spawn-4),
 [spawn_link/1,2,3,4](https://www.erlang.org/../man/erlang.html#spawn_link-4),
 [spawn_monitor/1,2,3,4](https://www.erlang.org/../man/erlang.html#spawn_monitor-4),
 [spawn_opt/2,3,4,5](https://www.erlang.org/../man/erlang.html#spawn_opt-5),
 [spawn_request/1,2,3,4,5](https://www.erlang.org/../man/erlang.html#spawn_request-5),
 or [erlang:open_port/2](https://www.erlang.org/../man/erlang.html#open_port-2)
 BIFs. The request signal is sent to the
 [spawn service](https://www.erlang.org/#runtime-service) which
 responds with the reply signal.
 
**alive_request/alive_reply**

 Sent due to a call to the
 [is_process_alive/1](https://www.erlang.org/../man/erlang.html#is_process_alive-1)
 BIF.
 
**garbage_collect_request/garbage_collect_reply,
 check_process_code_request/check_process_code_reply,
 process_info_request/process_info_reply**

 Sent due to a call to one of the
 [garbage_collect/1,2](https://www.erlang.org/../man/erlang.html#garbage_collect-1),
 [erlang:check_process_code/2,3](https://www.erlang.org/../man/erlang.html#check_process_code-2),
 or [process_info/1,2](https://www.erlang.org/../man/erlang.html#process_info-2)
 BIFs. Note that if the request is directed towards the caller itself
 and it is a synchronous request, no signaling will be performed
 and the caller will instead synchronously perform the request before
 returning from the BIF.
 
**port_command, port_connect, port_close**

 Sent by a process to a port on the local node using the
 [send operator !](https://www.erlang.org/expressions.html#send),
 or by calling one of the
 [send()](https://www.erlang.org/../man/erlang.html#send-2)
 BIFs. The signal is sent by passing a term on the format
 {Owner, {command, Data}}, {Owner, {connect, Pid}},
 or {Owner, close} as message.
 
**port_command_request/port_command_reply,
 port_connect_request/port_connect_reply,
 port_close_request/port_close_reply,
 port_control_request/port_control_reply,
 port_call_request/port_call_reply,
 port_info_request/port_info_reply**

 Sent due to a call to one of the
 [erlang:port_command/2,3](https://www.erlang.org/../man/erlang.html#port_command-2),
 [erlang:port_connect/2](https://www.erlang.org/../man/erlang.html#port_connect-2),
 [erlang:port_close/1](https://www.erlang.org/../man/erlang.html#port_close-1),
 [erlang:port_control/3](https://www.erlang.org/../man/erlang.html#port_control-3),
 [erlang:port_call/3](https://www.erlang.org/../man/erlang.html#port_call-3),
 [erlang:port_info/1,2](https://www.erlang.org/../man/erlang.html#port_info-1)
 BIFs. The request signal is sent to a port on the local node which
 responds with the reply signal.
 
**register_name_request/register_name_reply,
 unregister_name_request/unregister_name_reply,
 whereis_name_request/whereis_name_reply**

 Sent due to a call to one of the
 [register/2](https://www.erlang.org/../man/erlang.html#register-2),
 [unregister/1](https://www.erlang.org/../man/erlang.html#unregister-1),
 or
 [whereis/1](https://www.erlang.org/../man/erlang.html#whereis-1)
 BIFs. The request signal is sent to the
 [name service](https://www.erlang.org/#runtime-service), which
 responds with the reply signal.
 
**timer_start_request/timer_start_reply,
 timer_cancel_request/timer_cancel_reply**

 Sent due to a call to one of the
 [erlang:send_after/3,4](https://www.erlang.org/../man/erlang.html#send_after-3),
 [erlang:start_timer/3,4](https://www.erlang.org/../man/erlang.html#start_timer-3),
 or
 [erlang:cancel_timer/1,2](https://www.erlang.org/../man/erlang.html#cancel_timer-1)
 BIFs. The request signal is sent to the
 [timer service](https://www.erlang.org/#runtime-service) which
 responds with the reply signal.
 


 The clock service, the name service, the timer service, and the spawn
 service mentioned previously are services provided by the runtime system.
 Each of these services consists of multiple independently executing
 entities. Such a service can be viewed as a group of processes, and
 could actually be implemented like that. Since each service consists of
 multiple independently executing entities, the order between multiple
 signals sent from one service to one process is **not** preserved. Note
 that this does **not** violate the
 [signal ordering
 guarantee](https://www.erlang.org/#signal-delivery) of the language.
 



 The realization of the signals described above may change both at
 runtime and due to changes in implementation. You may be able to
 detect such changes using receive tracing or by inspecting
 message queues. However, these are internal implementation details of
 the runtime system that you should **not** rely on. As an example,
 many of the reply signals above are ordinary message signals.
 When the operation is synchronous, the reply signals do not have to be
 message signals. The current implementation takes advantage of this
 and, depending on the state of the system, use alternative ways of
 delivering the reply signals. The implementation of these reply signals
 may also, at any time, be changed to not use message signals where it
 previously did.
 


#### Receiving Signals



 Signals are received asynchronously and automatically. There is nothing
 a process must do to handle the reception of signals, or can do to
 prevent it. In particular, signal reception is **not** tied to the
 execution of a
 [receive](https://www.erlang.org/expressions.html#receive)
 expression, but can happen anywhere in the execution flow of a process.
 



 When a signal is received by a process, some kind of action is
 taken. The specific action taken depends on the signal type,
 contents of the signal, and the state of the receiving process.
 Actions taken for the most common signals:
 



**message**

 If the message signal was sent using a
 [process alias](https://www.erlang.org/#process-aliases)
 that is no longer active, the message signal will be dropped;
 otherwise, if the alias is still active or the message signal
 was sent by other means, the message is added to the end of the
 message queue. When the message has been added to the message
 queue, the receiving process can fetch the message from the
 message queue using the
 [receive](https://www.erlang.org/expressions.html#receive)
 expression.
 
**link, unlink**

 Very simplified it can be viewed as updating process local
 information about the link. A detailed description of the
 [link
 protocol](https://www.erlang.org/../apps/erts/erl_dist_protocol.html#link_protocol) can be found in the *Distribution Protocol*
 chapter of the *ERTS User's Guide*.
 
**exit**

 Set the receiver in an exiting state, drop the signal, or convert
 the signal into a message and add it to the end of the message
 queue. If the receiver is set in an exiting state, no more Erlang
 code will be executed and the process is scheduled for termination.
 The section [*Receiving
 Exit Signals*](https://www.erlang.org/#receiving_exit_signals) below gives more details on the
 action taken when an exit signal is received.
 
**monitor, demonitor**

 Update process local information about the monitor.
 
**down, change**

 Convert into a message if the corresponding monitor is still
 active; otherwise, drop the signal. If the signal is converted
 into a message, it is also added to the end of the message
 queue.
 
**group_leader**

 Change the group leader of the process.
 
**spawn_reply**

 Convert into a message, or drop the signal depending on the reply
 and how the spawn_request signal was configured. If the
 signal is converted into a message it is also added to the end
 of the message queue. For more information see the
 [spawn_request()](https://www.erlang.org/../man/erlang.html#spawn_request-5)
 BIF.
 
**alive_request**

 Schedule execution of the *is alive* test. If the process
 is in an exiting state, the *is alive* test will not be
 executed until after all
 [*directly visible Erlang
 resources*](https://www.erlang.org/#visible-resources) used by the process have been released.
 The alive_reply will be sent after the *is alive*
 test has executed.
 
**process_info_request,
 garbage_collect_request,
 check_process_code_request**

 Schedule execution of the requested operation. The reply signal
 will be sent when the operation has been executed.
 


 Note that some actions taken when a signal is received involves
 **scheduling** further actions which will result in a reply
 signal when these scheduled actions have completed. This implies that
 the reply signals may be sent in a different order than the order of
 the incoming signals that triggered these operations. This does,
 however, **not** violate the
 [signal ordering
 guarantee](https://www.erlang.org/#signal-delivery) of the language.
 




 The order of messages in the message queue of a process reflects the
 order in which the signals corresponding to the messages has been
 received since [all
 signals that add messages to the message queue add them at the end of
 the message queue](https://www.erlang.org/processes.html#receiving-signals). Messages corresponding to signals from
 the same sender are also ordered in the same order as the signals were
 sent due to the [signal
 ordering guarantee](https://www.erlang.org/processes.html#signal-delivery) of the language.
 


#### Directly Visible Erlang Resources



 As described above, exit signals due to links, down
 signals, and reply signals from an exiting process due to
 alive_requests are not sent until all *directly visible
 Erlang resources* held by the terminating process have been
 released. With *directly visible Erlang resources* we here mean
 all resources made available by the language excluding resources held
 by heap data, dirty native code execution and the process identifier of
 the terminating process. Examples of *directly visible Erlang
 resources* are [registered
 name](https://www.erlang.org/#registered-processes) and [ETS](https://www.erlang.org/../man/ets.html) tables.
 


##### The Excluded Resources



 The process identifier of the process cannot be released for
 reuse until everything regarding the process has been released.
 



 A process executing dirty native code in a NIF when it receives
 an exit signal will be set into an exiting state even if it is
 still executing dirty native code. *Directly visible Erlang
 resources* will be released, but the runtime system cannot
 force the native code to stop executing. The runtime system tries
 to prevent the execution of the dirty native code from effecting
 other processes by, for example, disabling functionality such as
 [enif_send()](https://www.erlang.org/../man/erl_nif.html#enif_send)
 when used from a terminated process, but if the NIF is not well
 behaved it can still effect other processes. A well behaved dirty
 NIF should test if
 [the
 process it is executing in has exited](https://www.erlang.org/../man/erl_nif.html#enif_is_current_process_alive), and if so stop
 executing.
 



 In the general case, the heap of a process cannot be removed before
 all signals that it needs to send have been sent. Resources held
 by heap data are the memory blocks containing the heap, but also
 include things referred to from the heap such as off heap binaries,
 and resources held via NIF
 [resource
 objects](https://www.erlang.org/../man/erl_nif.html#resource_objects) on the heap.
 


#### Delivery of Signals



 The amount of time that passes between the time a signal is sent and
 the arrival of the signal at the destination is unspecified but
 positive. If the receiver has terminated, the signal does not arrive,
 but it can trigger another signal. For example, a link signal
 sent to a non-existing process triggers an exit signal, which
 is sent back to where the link signal originated from. When
 communicating over the distribution, signals can be lost if the
 distribution channel goes down.
 



 The only signal ordering guarantee given is the following: if an
 entity sends multiple signals to the same destination entity, the
 order is preserved; that is, if A sends a signal S1 to
 B, and later sends signal S2 to B, S1 is
 guaranteed not to arrive after S2. Note that S1 may,
 or may not have been lost.
 


#### Irregularities



**Synchronous Error Checking**


 Some functionality that send signals have synchronous error
 checking when sending locally on a node and fail if the receiver
 is not present at the time when the signal is sent:
 




**Unexpected Behaviours of Exit Signals**


 When a process sends an exit signal with exit reason normal
 to itself by calling [erlang:exit(self(),
 normal)](https://www.erlang.org/../man/erlang.html#exit-2) it will be terminated
 [when the exit signal
 is received](https://www.erlang.org/#receiving_exit_signals). In all other cases when an exit signal with
 exit reason normal is received, it is dropped.
 



 When an [exit signal
 with exit reason kill is received](https://www.erlang.org/#receiving_exit_signals),
 the action taken is different depending on whether the signal was
 sent due to a linked process terminating, or the signal was
 explicitly sent using the
 [exit/2](https://www.erlang.org/../man/erlang.html#exit-2) BIF. When
 sent using the exit/2 BIF, the signal cannot be
 [trapped](https://www.erlang.org/../man/erlang.html#process_flag_trap_exit),
 while it can be trapped if the signal was sent due to a link.
 



**Blocking Signaling Over Distribution**


 When sending a signal over a distribution channel, the sending
 process may be suspended even though the signal is supposed to be
 sent asynchronously. This is due to the built in flow control over
 the channel that has been present more or less for ever. When the
 size of the output buffer for the channel reach the *distribution
 buffer busy limit*, processes sending on the channel will be
 suspended until the size of the buffer shrinks below the limit.
 The size of the limit can be inspected by calling
 [erlang:system_info(dist_buf_busy_limit)](https://www.erlang.org/../man/erlang.html#system_info_dist_buf_busy_limit).
 Since this functionality has been present for so long, it is not
 possible to remove it, but it is possible to increase the limit
 to a point where it more or less never is reached using the
 erl command line argument
 [+zdbbl](https://www.erlang.org/../man/erl.html#+zdbbl). Note
 that if you do raise the limit like this, you need to take care
 of flow control yourself to ensure that you do not get into a
 situation with excessive memory usage. As of OTP 25.3 it is
 also possible to enable *fully asynchronous distributed
 signaling* on a per process level using
 [process_flag(async_dist, Bool)](https://www.erlang.org/../man/erlang.html#process_flag_async_dist). Also in this case
 you need to take care of flow control yourself.
 





 The irregularities mentioned above cannot be fixed as they have been
 part of Erlang too long and it would break a lot of existing code.
 

<!--#signals#-->
### 14.7  Links



 Two processes can be **linked** to each other. Also a
 process and a port that reside on the same node can be linked
 to each other. A link between two processes can be created
 if one of them calls the
 [link/1](https://www.erlang.org/../man/erlang.html#link-1) BIF
 with the process identifier of the other process as argument.
 Links can also be created using one the following spawn BIFs
 [spawn_link()](https://www.erlang.org/../man/erlang.html#spawn_link-4),
 [spawn_opt()](https://www.erlang.org/../man/erlang.html#spawn_opt-5), or
 [spawn_request()](https://www.erlang.org/../man/erlang.html#spawn_request-5).
 The spawn operation and the link operation will 
 be performed atomically, in these cases.
 



 If one of the participants of a link terminates, it will
 [send
 an exit signal](https://www.erlang.org/../reference_manual/processes.html#sending_exit_signals) to the other participant. The exit
 signal will contain the
 [exit
 reason](https://www.erlang.org/../reference_manual/processes.html#link_exit_signal_reason) of the terminated participant.
 



 A link can be removed by calling the
 [unlink/1](https://www.erlang.org/../man/erlang.html#unlink-1)
 BIF.
 



 Links are bidirectional and there can only be one link between
 two processes. Repeated calls to link() have no effect.
 Either one of the involved processes may create or remove a
 link.
 


Links are used to monitor the behavior of other processes, see
 [Error Handling](https://www.erlang.org/#errors).

<!--#error-handling#-->
### 14.8  Error Handling


Erlang has a built-in feature for error handling between
 processes. Terminating processes emit exit signals to all
 linked processes, which can terminate as well or handle the exit
 in some way. This feature can be used to build hierarchical
 program structures where some processes are supervising other
 processes, for example, restarting them if they terminate
 abnormally.


See [OTP Design Principles](https://www.erlang.org/../design_principles/des_princ.html#otp%20design%20principles) for more information about
 OTP supervision trees, which use this feature.


#### Sending Exit Signals



 When a process or port
 [terminates](https://www.erlang.org/#term) it will
 send exit signals to all processes and ports that it
 is [linked](https://www.erlang.org/#links) to.
 The exit signal will contain the following information:
 



**Sender identifier**

 The process or port identifier of the process or port
 that terminated.
 


**Receiver identifier**

 The process or port identifier of the process or port
 which the exit signal is sent to.
 


**The link flag**

 This flag will be set indicating that the exit signal
 was sent due to a link.
 


**Exit reason**


 The exit reason of the process or port that
 terminated or the atom:


* noproc in case no process or port was
 found when setting up a link in a preceding
 call to the
 [link(PidOrPort)](https://www.erlang.org/../man/erlang.html#link-1)
 BIF. The process or port identified as sender
 of the exit signal will equal the PidOrPort
 argument passed to link/1.
* noconnection in case the linked
 processes resides on different nodes and
 the connection between the nodes was lost or
 could not be established. The process or port
 identified as sender of the exit signal might
 in this case still be alive.





 Exit signals can also be sent explicitly by calling the
 [exit(PidOrPort,
 Reason)](https://www.erlang.org/../man/erlang.html#exit-2) BIF. The exit signal is sent to the
 process or port identified by the PidOrPort argument.
 The exit signal sent will contain the following information:
 



**Sender identifier**

 The process identifier of the process that called
 exit/2.
 


**Receiver identifier**

 The process or port identifier of the process or port
 which the exit signal is sent to.
 


**The link flag**

 This flag will not be set, indicating that this exit
 signal was not sent due to a link.
 


**Exit reason**

 The term passed as Reason in the call to
 exit/2. If Reason is the atom kill,
 the receiver cannot
 [trap
 the exit](https://www.erlang.org/../man/erlang.html#process_flag_trap_exit) signal and will unconditionally
 terminate when it receives the signal.
 



#### Receiving Exit Signals


What happens when a process receives an exit signal depends on:


* The [trap exit](https://www.erlang.org/../man/erlang.html#process_flag_trap_exit)
 state of the receiver at the time when the exit signal is received.
* The exit reason of the exit signal.
* The sender of the exit signal.
* The state of the link flag of the exit signal. If the
 link flag is set, the exit signal was sent due to a
 link; otherwise, the exit signal was sent by a call to the
 [exit/2](https://www.erlang.org/../man/erlang.html#exit-2) BIF.
* If the link flag is set, what happens also depends on
 whether the [link is still active
 or not](https://www.erlang.org/../man/erlang.html#unlink-1) when the exit signal is received.



 Based on the above states, the following will happen when an
 exit signal is received by a process:
 


* The exit signal is silently dropped if:


	+ the link flag of the exit signal is set and
	 the corresponding link has been deactivated.
	+ the exit reason of the exit signal is the atom normal,
	 the receiver is not trapping exits, and the receiver and
	 sender are not the same process.
* The receiving process is terminated if:


	+ the link flag of the exit signal
	 is not set, and the exit reason of the exit signal
	 is the atom kill. The receiving process will
	 terminate with the atom killed as exit reason.
	+ the receiver is not trapping exits, and the exit
	 reason is something other than the atom normal.
	 Also, if the link flag of the exit signal
	 is set, the link also needs to be active otherwise the
	 exit signal will be dropped. The exit reason of the
	 receiving process will equal the exit reason of the
	 exit signal. Note that if the link flag
	 is set, an exit reason of kill will **not**
	 be converted to killed.
	+ the exit reason of the exit signal is the atom
	 normal and the sender of the exit signal is
	 the same process as the receiver. The link
	 flag cannot be set in this case. The exit reason
	 of the receiving process will be the atom normal.
* The exit signal is converted to a message signal and
 added to the end of the message queue of the receiver, if the
 receiver is trapping exits, the link flag
 of the exit signal is:
 


	+ not set, and the exit reason of the signal is not
	 the atom kill.
	+ set, and the corresponding link is active.
	 Note that an exit reason of kill will
	 **not** terminate the process in this
	 case and it will not be converted to
	 killed.
 The converted message will be on the form
 {'EXIT', SenderID, Reason} where Reason
 equals the exit reason of the exit signal and
 SenderID is the identifier of the process
 or port that sent the exit signal.

<!--#monitors#-->
### 14.9  Monitors


An alternative to links are **monitors**. A process
 Pid1 can create a monitor for Pid2 by calling
 the BIF erlang:monitor(process, Pid2). The function returns
 a reference Ref.


If Pid2 terminates with exit reason Reason, a
 'DOWN' message is sent to Pid1:



```erlang
{'DOWN', Ref, process, Pid2, Reason}
```

If Pid2 does not exist, the 'DOWN' message is sent
 immediately with Reason set to noproc.


Monitors are unidirectional. Repeated calls to
 erlang:monitor(process, Pid) creates several
 independent monitors, and each one sends a 'DOWN' message when
 Pid terminates.


A monitor can be removed by calling
 erlang:demonitor(Ref).


Monitors can be created for processes with registered
 names, also at other nodes.

<!--#process-dictionary#-->
### 14.10  Process Dictionary


Each process has its own process dictionary, accessed by calling
 the following BIFs:



```erlang

put(Key, Value)
get(Key)
get()
get_keys(Value)
erase(Key)
erase()
```






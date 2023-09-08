# EventBus Tutorial and Example


> Android EventBus Tutorial and Examples.

This is an android GreenRobot EventBus tutorial and examples.


### What is EventBus?

_EventBus is a library for Java and Android that simplifies communication between various components or parts of an application._

For example is in android we have several components like:

- Activities.
- Fragments.
- Services.
- and Threads.

### Why EventBus?

Normally it's not very straight forward to communicate between or among these components. Normally you are forced to write lots of boilerplate code. For example:

- To pass data between Activities you use Intents. To pass java objects you have to serialize and later deserialize them, thus leading to tight binding between the components.
- To pass data between Fragments you use Bundles.
- To pass data from Services you use Broadcast Managers.

These are all great, however we face the following issues:

- Coupled hard to maintain code.
- Lots of boilerplate code.
- Objects can easily be passed without serialization and deserialization.

Publish/subscribe models try to avoid this tight integration by relying on an event bus model. In this type of model, there are publishers and subscribers. Publishers are responsible for posting events in response to some type of state change, while subscribers respond to these events

Hence great developers have come with solutions such as the publish/subscribe pattern of communication. In these:

1. Publishers publish or post events.
2. Subscribers listen or subscribe to those events.
3. Event hold the information we want to pass.

This solves the coupling problem by modularising the components. The events allow for isolation of dependencies on each side. The event result is a bus allowing for communication pipeline that allows for readable and maintainable application.

### Thread Delivery

EventBus can handle threading for you: events can be posted in threads different from the posting thread. A common use case is dealing with UI changes.

EventBus is a powerful library that respects your threading requirements when used to communicate. It does this by providing several thread delivery modes:

**1\. ThreadMode: POSTING**

In this mode the subscribers are called in the same thread that posted that event. This is the default mode for eventbus.

```java
// ThreadMode is optional as this is the default mode
@Subscribe(threadMode = ThreadMode.POSTING)
public void onEvent(MessageEvent event) {
    log(event.message);
}
```

**2\. ThreadMode: MAIN**

In this mode the Subscribers will be called in the main thread.

```java
@Subscribe(threadMode = ThreadMode.MAIN)
public void onEvent(MessageEvent event) {
    textView.setText(event.message);
}
```

**3\. ThreadMode: MAIN_ORDERED**

In this mode the Subscribers will be called in the main thread but the event is always enqueued for later delivery to subscribers, so the call to post will return immediately.

```java
@Subscribe(threadMode = ThreadMode.MAIN_ORDERED)
public void onEvent(MessageEvent event) {
    textView.setText(event.message);
}
```

**4\. ThreadMode: BACKGROUND**

In this mode the Subscribers will be called in a background thread.

```java
@Subscribe(threadMode = ThreadMode.BACKGROUND)
public void onEvent(MessageEvent event){
    saveToDisk(event.message);
}
```

**5\. ThreadMode: ASYNC**

In this mode the Event handler methods are called in a separate thread. This is always independent from the posting thread and the main thread.

```java
@Subscribe(threadMode = ThreadMode.ASYNC)
public void onEvent(MessageEvent event){
    network.send(event.message);
}
```

### Sticky Events

Stick events are events that EventBus will keep in memory and can be later delivered to subscribers or queried. Thus you don't have to write your own cache when working with data that are being emmitted continuosly like sensor data. EventBus can allow you work with latest emitted data through sticky events.

Here's how you post sticky event:

```java
EventBus.getDefault().postSticky(new MessageEvent("Mr Stick event"));
```

Then to subscribe:

```java
@Subscribe(sticky = true, threadMode = ThreadMode.MAIN)
public void onEvent(MessageEvent event) {
    textField.setText(event.message);
}
```

### Alternatives to GreenRobot EventBus

Here are some alternatives to GreenRobot EventBus:

| No. | Alternative | Description |
| --- | --- | --- |
| 1. | Otto | This is Deprecated. |
| 2. | RxJava |

### Installing EventBus

There are three ways of installing eventbus:

**1\. Via Gradle**

If you are using gradle build system then here's the implementation statement. Check the latest version [here](https://search.maven.org/search?q=g:org.greenrobot%20AND%20a:eventbus).

```groovy
implementation 'org.greenrobot:eventbus:3.1.1'
```

**2\. Via Maven**

In your pom.xml add:

```xml
<dependency>
    <groupId>org.greenrobot</groupId>
    <artifactId>eventbus</artifactId>
    <version>3.1.1</version>
</dependency>
```

Here are EventBus examples:

[loop type=example taxonomy=post_tag term=eventbus orderby=date order=asc]

## [loop-count]. [field title]

[content]

[Read Individually.]([field url])

* * *

[/loop]

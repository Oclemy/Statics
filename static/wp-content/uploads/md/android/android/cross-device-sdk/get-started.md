# Get started  |  Cross Device SDK

The Cross device SDK Developer Preview is distributed through an open-source project. This preview is available for the developer community to prototype and validate multi-device experiences but is not intended for use in production applications.

Set up Google Play Services
---------------------------

Before you start coding, ensure Google Play Services is installed. The Cross device SDK is in Developer Preview and is available only through the Google Play Services Beta Program. See this guide on how to enroll in the Beta Program.

Once you enroll in the Beta Program and install the appropriate beta version of Google Play Services, you’re ready to begin developing multi-device experiences with the Cross device SDK.

Dependencies and permissions
----------------------------

First, open your app module `build.gradle` file and add a dependency on the Cross device SDK as follows:

```groovy
    dependencies {
        implementation 'com.google.ambient.crossdevice:crossdevice:0.1.0-preview01'
    }
```

During Developer Preview, the API is subject to change, so check release notes regularly to ensure you’re using the latest version of the Cross device SDK.

One of the benefits of using the Cross device SDK is that it abstracts away local discovery, such as `BLUETOOTH_CONNECT`, `BLUETOOTH_SCAN`, and `ACCESS_FINE_LOCATION`.

Cross device APIs
-----------------

Each API in the Cross device SDK is aimed at solving a common task within a multi-device framework:

*   Device discovery: Easily find nearby devices, authorize peer-to-peer communication, and start the target application on the receiving device.
*   Secure communications: Enable encrypted, low-latency, bi-directional data sharing between authorized devices.
*   Multi-device sessions: Transfer or extend an application’s user-experience across devices.

These APIs are available through the `Discovery` and `Sessions` classes:

### Kotlin

```kotlin
val discovery = Discovery.create(context)
val sessions = Sessions.create(context)
```

### Java

```java
Discovery discovery = Discovery.create(context);
Sessions sessions = Sessions.create(context);
```

You can learn more about the specific uses of these APIs in the following sections, or refer to our sample app repository.

Sample Applications
-------------------

We’ve prepared a number of apps to demonstrate the Cross device SDK in action. These sample apps are built around a simple Rock, Paper, Scissors game as an intuitive and interactive way to familiarize yourself with the APIs. We encourage you to explore and modify the sample code to see how to use:

*   Device Discovery
*   Secure Connections
*   Sessions Transfer
*   Shared Sessions

Check out Cross-device Rock, Paper, Scissors on Github.
# Tasks and the back stack

A _task_ is a collection of activities that users interact with when trying to do something in your app. These activities are arranged in a stack—the _back stack_—in the order in which each activity is opened. For example, an email app might have one activity to show a list of new messages. When the user selects a message, a new activity opens to view that message. This new activity is added to the back stack. Then, if the user presses or gestures Back, that new activity is finished and popped off the stack.

Lifecycle of a task and its back stack
--------------------------------------

The device Home screen is the starting place for most tasks. When a user touches the icon for an app or shortcut in the app launcher (or on the Home screen), that app's task comes to the foreground. If no task exists for the app (the app has not been used recently), then a new task is created and the main activity for that app opens as the root activity in the stack.

When the current activity starts another, the new activity is pushed on the top of the stack and takes focus. The previous activity remains in the stack, but is stopped. When an activity stops, the system retains the current state of its user interface. When the user performs the back action, the current activity is popped from the top of the stack (the activity is destroyed) and the previous activity resumes (the previous state of its UI is restored). Activities in the stack are never rearranged, only pushed and popped from the stack—pushed onto the stack when started by the current activity and popped off when the user leaves it using the Back button or gesture. As such, the back stack operates as a _last in, first out_ object structure. Figure 1 visualizes this behavior with a timeline showing the progress between activities along with the current back stack at each point in time.

![](https://developer.android.com/static/images/fundamentals/diagram_backstack.png)

**Figure 1.** A representation of how each new activity in a task adds an item to the back stack. When the user presses or gestures **Back**, the current activity is destroyed and the previous activity resumes.

If the user continues to press or gesture Back, then each activity in the stack is popped off to reveal the previous one, until the user returns to the Home screen (or to whichever activity was running when the task began). When all activities are removed from the stack, the task no longer exists.

### Back press behavior for root launcher activities

Root launcher activities are activities that declare an Intent filter with both `ACTION_MAIN` and `CATEGORY_LAUNCHER`. These activities are unique because they act as entry points into your app from the app launcher and are used to start a task.

When a user presses or gestures Back from a root launcher activity, the system handles the event differently depending on the version of Android that the device is running.

System behavior on Android 11 and lower

The system finishes the activity.

System behavior on Android 12 and higher

The system moves the activity and its task to the background instead of finishing the activity. This behavior matches the default system behavior when navigating out of an app using the Home button or gesture.

In most cases, this behavior means that users can more quickly resume your app from a warm state, instead of having to completely restart the app from a cold state.

If you need to provide custom back navigation, we recommend using the AndroidX Activity APIs, rather than overriding `onBackPressed()`. The AndroidX Activity APIs automatically defer to the appropriate system behavior if there are no components intercepting the system Back press.

However, if your app overrides `onBackPressed()`) to handle Back navigation and finish the activity, update your implementation to call through to `super.onBackPressed()` instead of finishing. Calling `super.onBackPressed()` moves the activity and its task to the background when appropriate and provides a more consistent navigation experience for users across apps.

### Background and foreground tasks

![](https://developer.android.com/static/images/fundamentals/diagram_multitasking.png)

**Figure 2.** Two tasks: Task B receives user interaction in the foreground, while Task A is in the background, waiting to be resumed.

A task is a cohesive unit that can move to the _background_ when a user begins a new task or goes to the Home screen. While in the background, all the activities in the task are stopped, but the back stack for the task remains intact—the task has simply lost focus while another task takes place, as shown in figure 2. A task can then return to the _foreground_ so users can pick up where they left off.

Consider for example, the following task flow for a current task (Task A) that has three activities in its stack, including two under the current activity:

1.  The user uses the Home button or gesture, then starts a new app from the app launcher.
    
    When the Home screen appears, Task A goes into the background. When the new app starts, the system starts a task for that app (Task B) with its own stack of activities.
    
2.  After interacting with that app, the user returns Home again and selects the app that originally started Task A.
    
    Now, Task A comes to the foreground—all three activities in its stack are intact and the activity at the top of the stack resumes. At this point, the user can also switch back to Task B by going Home and selecting the app icon that started that task (or by selecting the app's task from the Recents screen).
    

### Multiple activity instances

![](https://developer.android.com/static/images/fundamentals/diagram_multiple_instances.png)

**Figure 3.** A single activity is instantiated multiple times.

Because the activities in the back stack are never rearranged, if your app allows users to start a particular activity from more than one activity, a new instance of that activity is created and pushed onto the stack (rather than bringing any previous instance of the activity to the top). As such, one activity in your app might be instantiated multiple times (even from different tasks), as shown in figure 3. If the user navigates backward using the Back button or gesture, each instance of the activity is revealed in the order they were opened (each with their own UI state). However, you can modify this behavior if you do not want an activity to be instantiated more than once. How to do so is discussed in the later section about managing tasks.

### Multi-window environments

When apps are running simultaneously in a multi-windowed environment, supported in Android 7.0 (API level 24) and higher, the system manages tasks separately for each window; each window may have multiple tasks. The same holds true for Android apps running on Chromebooks: the system manages tasks, or groups of tasks, on a per-window basis.

### Lifecycle recap

To summarize the default behavior for activities and tasks:

*   When Activity A starts Activity B, Activity A is stopped, but the system retains its state (such as scroll position and text entered into forms). If the user uses the Back or gesture while in Activity B, Activity A resumes with its state restored.
    
*   When the user leaves a task using the Home button or gesture, the current activity is stopped and its task goes into the background. The system retains the state of every activity in the task. If the user later resumes the task by selecting the launcher icon that began the task, the task comes to the foreground and resumes the activity at the top of the stack.
    
*   If the user presses or gestures Back, the current activity is popped from the stack and destroyed. The previous activity in the stack is resumed. When an activity is destroyed, the system _does not_ retain the activity's state.
    
    This behavior is different for root launcher activities when your app is running on a device that runs Android 12 or higher.
    
*   Activities can be instantiated multiple times, even from other tasks.
    

Manage tasks
------------

The way Android manages tasks and the back stack, as described above—by placing all activities started in succession in the same task and in a _last in, first out_ stack—works great for most apps and you shouldn't have to worry about how your activities are associated with tasks or how they exist in the back stack. However, you might decide that you want to interrupt the normal behavior. Perhaps you want an activity in your app to begin a new task when it is started (instead of being placed within the current task); or, when you start an activity, you want to bring forward an existing instance of it (instead of creating a new instance on top of the back stack); or, you want your back stack to be cleared of all activities except for the root activity when the user leaves the task.

You can do these things and more, with attributes in the `<activity>` manifest element and with flags in the intent that you pass to `startActivity()`).

In this regard, these are the principal `<activity>` attributes that you can use:

*   `taskAffinity`
*   `launchMode`
*   `allowTaskReparenting`
*   `clearTaskOnLaunch`
*   `alwaysRetainTaskState`
*   `finishOnTaskLaunch`

And these are the principal intent flags that you can use:

*   `FLAG_ACTIVITY_NEW_TASK`
*   `FLAG_ACTIVITY_CLEAR_TOP`
*   `FLAG_ACTIVITY_SINGLE_TOP`

In the following sections, you'll see how you can use these manifest attributes and intent flags to define how activities are associated with tasks and how they behave in the back stack.

Also, discussed separately are the considerations for how tasks and activities may be represented and managed in the **Recents** screen. See Recents screen for more information. Normally you should allow the system to define how your task and activities are represented in the **Recents** screen, and you don't need to modify this behavior.

### Defining launch modes

Launch modes allow you to define how a new instance of an activity is associated with the current task. You can define different launch modes in two ways:

*   Using the manifest file
    
    When you declare an activity in your manifest file, you can specify how the activity should associate with tasks when it starts.
    
*   Using Intent flags
    
    When you call `startActivity()`), you can include a flag in the `Intent` that declares how (or whether) the new activity should associate with the current task.
    

As such, if Activity A starts Activity B, Activity B can define in its manifest how it should associate with the current task (if at all) and Activity A can also request how Activity B should associate with current task. If both activities define how Activity B should associate with a task, then Activity A's request (as defined in the intent) is honored over Activity B's request (as defined in its manifest).

#### Define launch modes using the manifest file

When declaring an activity in your manifest file, you can specify how the activity should associate with a task using the `<activity>` element's `launchMode` attribute.

The `launchMode` attribute specifies an instruction on how the activity should be launched into a task. There are five different launch modes you can assign to the `launchMode` attribute:

`"standard"` (the default mode)

Default. The system creates a new instance of the activity in the task from which it was started and routes the intent to it. The activity can be instantiated multiple times, each instance can belong to different tasks, and one task can have multiple instances.

`"singleTop"`

If an instance of the activity already exists at the top of the current task, the system routes the intent to that instance through a call to its `onNewIntent()`) method, rather than creating a new instance of the activity. The activity can be instantiated multiple times, each instance can belong to different tasks, and one task can have multiple instances (but only if the activity at the top of the back stack is _not_ an existing instance of the activity).

For example, suppose a task's back stack consists of root activity A with activities B, C, and D on top (the stack is A-B-C-D; D is on top). An intent arrives for an activity of type D. If D has the default `"standard"` launch mode, a new instance of the class is launched and the stack becomes A-B-C-D-D. However, if D's launch mode is `"singleTop"`, the existing instance of D receives the intent through `onNewIntent()`), because it's at the top of the stack—the stack remains A-B-C-D. However, if an intent arrives for an activity of type B, then a new instance of B is added to the stack, even if its launch mode is `"singleTop"`.

`"singleTask"`

The system creates the activity at the root of a new task or locates the activity on an existing task with the same affinity. If an instance of the activity already exists and is at the root of the task, the system routes the intent to existing instance through a call to its `onNewIntent()`) method, rather than creating a new instance. Meanwhile all of the other activities on top of it are destroyed.

`"singleInstance"`.

Same as `"singleTask"`, except that the system doesn't launch any other activities into the task holding the instance. The activity is always the single and only member of its task; any activities started by this one open in a separate task.

`"singleInstancePerTask"`.

The activity can only be running as the root activity of the task, the first activity that created the task, and therefore there will only be one instance of this activity in a task. In contrast to the `singleTask` launch mode, this activity can be started in multiple instances in different tasks if the `FLAG_ACTIVITY_MULTIPLE_TASK` or `FLAG_ACTIVITY_NEW_DOCUMENT` flag is set.

As another example, the Android Browser app declares that the web browser activity should always open in its own task—by specifying the `singleTask` launch mode in the `<activity>` element. This means that if your app issues an intent to open the Android Browser, its activity is _not_ placed in the same task as your app. Instead, either a new task starts for the Browser or, if the Browser already has a task running in the background, that task is brought forward to handle the new intent.

Regardless of whether an activity starts in a new task or in the same task as the activity that started it, the Back button and gesture always take the user to the previous activity. However, if you start an activity that specifies the `singleTask` launch mode, then if an instance of that activity exists in a background task, that whole task is brought to the foreground. At this point, the back stack now includes all activities from the task brought forward, at the top of the stack. Figure 4 illustrates this type of scenario.

![](https://developer.android.com/static/images/fundamentals/diagram_backstack_singletask_multiactivity.png)

**Figure 4.** A representation of how an activity with launch mode `"singleTask"` is added to the back stack. If the activity is already a part of a background task with its own back stack, then the entire back stack also comes forward, on top of the current task.

For more information about using launch modes in the manifest file, see the `<activity>` element documentation, where the `launchMode` attribute and the accepted values are discussed more.

#### Define launch modes using Intent flags

When starting an activity, you can modify the default association of an activity to its task by including flags in the intent that you deliver to `startActivity()`). The flags you can use to modify the default behavior are:

`FLAG_ACTIVITY_NEW_TASK`

Start the activity in a new task. If a task is already running for the activity you are now starting, that task is brought to the foreground with its last state restored and the activity receives the new intent in `onNewIntent()`).

This produces the same behavior as the `"singleTask"` `launchMode` value, discussed in the previous section.

`FLAG_ACTIVITY_SINGLE_TOP`

If the activity being started is the current activity (at the top of the back stack), then the existing instance receives a call to `onNewIntent()`), instead of creating a new instance of the activity.

This produces the same behavior as the `"singleTop"` `launchMode` value, discussed in the previous section.

`FLAG_ACTIVITY_CLEAR_TOP`

If the activity being started is already running in the current task, then instead of launching a new instance of that activity, all of the other activities on top of it are destroyed and this intent is delivered to the resumed instance of the activity (now on top), through `onNewIntent()`)).

There is no value for the `launchMode` attribute that produces this behavior.

`FLAG_ACTIVITY_CLEAR_TOP` is most often used in conjunction with `FLAG_ACTIVITY_NEW_TASK`. When used together, these flags are a way of locating an existing activity in another task and putting it in a position where it can respond to the intent.

### Handle affinities

An _affinity_ indicates which task an activity prefers to belong to. By default, all the activities from the same app have an affinity for each other. So, by default, all activities in the same app prefer to be in the same task. However, you can modify the default affinity for an activity. Activities defined in different apps can share an affinity, or activities defined in the same app can be assigned different task affinities.

You can modify the affinity for any given activity with the `taskAffinity` attribute of the `<activity>` element.

The `taskAffinity` attribute takes a string value, which must be unique from the default package name declared in the `<manifest>` element, because the system uses that name to identify the default task affinity for the app.

The affinity comes into play in two circumstances:

*   When the intent that launches an activity contains the `FLAG_ACTIVITY_NEW_TASK` flag.
    
    A new activity is, by default, launched into the task of the activity that called `startActivity()`).
    
    It's pushed onto the same back stack as the caller. However, if the intent passed to `startActivity()`)
    
    contains the `FLAG_ACTIVITY_NEW_TASK` flag, the system looks for a different task to house the new activity. Often, it's a new task. However, it doesn't have to be. If there's already an existing task with the same affinity as the new activity, the activity is launched into that task. If not, it begins a new task.
    
    If this flag causes an activity to begin a new task and the user uses the Home button or gesture to leave it, there must be some way for the user to navigate back to the task. Some entities (such as the notification manager) always start activities in an external task, never as part of their own, so they always put `FLAG_ACTIVITY_NEW_TASK` in the intents they pass to `startActivity()`). If you have an activity that can be invoked by an external entity that might use this flag, take care that the user has a independent way to get back to the task that's started, such as with a launcher icon (the root activity of the task has a `CATEGORY_LAUNCHER` intent filter; see the section on starting tasks).
    
*   When an activity has its `allowTaskReparenting` attribute set to `"true"`.
    
    In this case, the activity can move from the task it starts to the task it has an affinity for, when that task comes to the foreground.
    
    For example, suppose that an activity that reports weather conditions in selected cities is defined as part of a travel app. It has the same affinity as other activities in the same app (the default app affinity) and it allows re-parenting with this attribute. When one of your activities starts the weather reporter activity, it initially belongs to the same task as your activity. However, when the travel app's task comes to the foreground, the weather reporter activity is reassigned to that task and displayed within it.
    

### Clear the back stack

If the user leaves a task for a long time, the system clears the task of all activities except the root activity. When the user returns to the task again, only the root activity is restored. The system behaves this way, because, after an extended amount of time, users likely have abandoned what they were doing before and are returning to the task to begin something new.

There are some activity attributes that you can use to modify this behavior:

`alwaysRetainTaskState`

If this attribute is set to `"true"` in the root activity of a task, the default behavior just described does not happen. The task retains all activities in its stack even after a long period.

`clearTaskOnLaunch`

If this attribute is set to `"true"` in the root activity of a task, the task is cleared down to the root activity whenever the user leaves the task and returns to it. In other words, it's the opposite of `alwaysRetainTaskState`. The user always returns to the task in its initial state, even after leaving the task for only a moment.

`finishOnTaskLaunch`

This attribute is like `clearTaskOnLaunch`, but it operates on a single activity, not an entire task. It can also cause any activity to finish, except for the root activity. When it's set to `"true"`, the activity remains part of the task only for the current session. If the user leaves and then returns to the task, it is no longer present.

### Start a task

You can set up an activity as the entry point for a task by giving it an intent filter with `"android.intent.action.MAIN"` as the specified action and `"android.intent.category.LAUNCHER"` as the specified category. For example:

```xml
    <activity ... >
        <intent-filter ... >
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
        ...
    </activity>
```

An intent filter of this kind causes an icon and label for the activity to be displayed in the app launcher, giving users a way to launch the activity and to return to the task that it creates any time after it has been launched.

This second ability is important: Users must be able to leave a task and then come back to it later using this activity launcher. For this reason, the two launch modes that mark activities as always initiating a task, `"singleTask"` and `"singleInstance"`, should be used only when the activity has an `ACTION_MAIN` and a `CATEGORY_LAUNCHER` filter. Imagine, for example, what could happen if the filter is missing: An intent launches a `"singleTask"` activity, initiating a new task, and the user spends some time working in that task. The user then uses the Home button or gesture. The task is now sent to the background and is not visible. Now the user has no way to return to the task, because it is not represented in the app launcher.

For those cases where you don't want the user to be able to return to an activity, set the `<activity>` element's `finishOnTaskLaunch` to `"true"` (see the section on clearing the back stack).

Further information about how tasks and activities are represented and managed in the **Overview** screen is available in Recents screen.

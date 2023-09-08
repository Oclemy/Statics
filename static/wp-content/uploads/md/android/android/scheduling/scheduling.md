# Manage device awake state

When an Android device is left idle, it will first dim, then turn off the screen, and ultimately turn off the CPU. This prevents the device's battery from quickly getting drained. Yet there are times when your application might require a different behavior:

*   Apps such as games or movie apps may need to keep the screen turned on.
*   Other applications may not need the screen to remain on, but they may require the CPU to keep running until a critical operation finishes.

These lessons describe how to keep a device awake when necessary without draining its battery.

Lessons
-------

**Keep the device awake**

Learn how to keep the screen or CPU awake as needed, while minimizing the impact on battery life.

**Schedule repeating alarms**

Learn how to use repeating alarms to schedule operations that take place outside of the lifetime of the application, even if the application is not running and/or the device is asleep.
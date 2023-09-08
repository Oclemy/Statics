# fpsviewer


> A Real-time Fps Tool for Android.

A visualization tool that can display fps, average frame rate over a period of time, and frame rate range ratio in real time, and can get stuck stack. Low intrusion, by sampling the stack in asynchronous threads, there is no code intrusion, performance consumption can be ignored, the abnormal data of performance monitoring items is collected and analyzed, and the output is organized to display the corresponding stack, thereby helping developers to develop higher quality. application.

### Common solutions for analyzing and locating stuck

#### System Tools

**1. TraceView**

At present, the cpu-profile tool in Android Studio is generally used or the `TraceCompat.beginSection()` trace log is generated. The accuracy is high. This analysis method is only suitable for qualitative analysis, because the tool consumes a lot of CPU, and there are many fake janks, which greatly affect the performance and show the time-consuming and actual The time-consuming deviation is very large, and it is not easy to use in the usual development process. It is impossible to open it in real time, and it is impossible to view the fps.

**2. [Systrace](https://developer.android.com/studio/profile/systrace/command-line)** Systrace is used to detect the running status of each component of the android system over time, and can prompt how to effectively repair the problem. It is mainly inclined to analyze the status of the entire system for a period of time, and cannot locate the specific code.

**3. The command line adb shell dumpsys SurfaceFlinger --latency com... package name is** used to calculate the frame rate for a period of time, the freeze stack cannot be obtained, only a period of time

The solutions provided by the above systems can generally only be analyzed in a relatively short period of time, and it is also very inconvenient in the usual development process.

### Third-party library solutions

*   [Matrix-TraceCanary](https://github.com/Tencent/matrix) WeChat's stuck detection solution adopts the ASM instrumentation method, which supports the positioning of fps and stack acquisition, but it needs to analyze the stack by itself according to the method id of asm instrumentation, with high positioning accuracy and low performance consumption. It is a pity that there is currently no interface display, which is intrusive to the code. Consider using it online.

*   [](https://github.com/seiginonakama/BlockCanaryEx)The main principle of [BlockCanaryEx is to](https://github.com/seiginonakama/BlockCanaryEx) **use the log printed in** loop(), the log printed in loop() can be seen in this blog by Hongyang. [Android UI performance optimization detects UI stuck in the application](https://blog.csdn.net/lmj623565791/article/details/58626355) , supports method sampling, and knows all methods in the main thread The execution time and the number of executions are high, because it needs to obtain the status of the CPU and some systems, which consumes a lot of performance and does not support fps display. Especially when a freeze is detected, the interface will freeze for a long time. This tool was used in our previous projects.

*   FPSViewer uses `Choreographer.FrameCallback` to monitor the calculation of freeze and Fps, and asynchronous threads perform periodic sampling. When the current frame time exceeds the user-defined threshold, the frame is analyzed and saved, which does not affect the normal process, and will be performed when needed. display, positioning.

### fpsviewer Features

1.  Lossless FPS real-time display, the average frame rate and frame rate ratio of a period of time, using Choreographer.FrameCallback `fun doFrame(frameTimeNanos: Long)` method callback to obtain data to calculate the time consumed by each frame, high real-time performance and no additional data acquisition and no other performance consumption, open and Closing fpsviewer has much less effect on frame rate than 1 frame. Supports the display of the average frame rate and frame rate ratio over a period of time, which can be used for comparison before and after performance optimization.

2.  More detailed stack information is convenient for locating the source of the freeze, sampling method or stack, rather than acquiring the stack at the moment when the freeze occurs, which may cause stack offset and affect the accuracy. The asynchronous thread is at a custom sampling time (generally >30ms) The time-consuming of stack acquisition is very small each time. Storage analysis is only required for sending a freeze. It is also in an asynchronous thread, which has no impact on the main thread and negligible impact on the overall CPU. Generally, multiple stack information is obtained, sorted according to the number of occurrences during this period.

3.  Supports custom stack tags, similar to `TraceCompat.beginSection()` , to facilitate the analysis of specific business stutters, such as a list, the stutter time-consuming during the startup of an Activity or App.

## [](https://github.com/SilenceDut/fpsviewer#%E6%95%88%E6%9E%9C%E5%9B%BE)renderings

**\[real-time fps\]**

[![image](https://camo.githubusercontent.com/11448a3f83080a933e44331f0414cdd0d9d596f5fac1320773444c6330440ab0/687474703a2f2f7777322e73696e61696d672e636e2f6c617267652f303036744e633739677931673361673033666767626a3330663030376d3734632e6a7067)](https://camo.githubusercontent.com/11448a3f83080a933e44331f0414cdd0d9d596f5fac1320773444c6330440ab0/687474703a2f2f7777322e73696e61696d672e636e2f6c617267652f303036744e633739677931673361673033666767626a3330663030376d3734632e6a7067)

**\[Function selection\]**

[![image](https://camo.githubusercontent.com/9a5637ae5ae32d55cd51efaa1c32fec0ec43d0e88f6cb8cea84a0ed50b9109e7/687474703a2f2f7777342e73696e61696d672e636e2f6c617267652f303036744e63373967793167336167313232756a646a333066303077697766772e6a7067)](https://camo.githubusercontent.com/9a5637ae5ae32d55cd51efaa1c32fec0ec43d0e88f6cb8cea84a0ed50b9109e7/687474703a2f2f7777342e73696e61696d672e636e2f6c617267652f303036744e63373967793167336167313232756a646a333066303077697766772e6a7067)

Clicking the analysis icon shows:

[![image](https://camo.githubusercontent.com/01e50a7a1cc0a2129e190aa02e6c7dddb8790bbb5a82497809d65c36abd00957/687474703a2f2f7777332e73696e61696d672e636e2f6c617267652f303036744e63373967793167336166776e617a65366a333066303077696162312e6a7067)](https://camo.githubusercontent.com/01e50a7a1cc0a2129e190aa02e6c7dddb8790bbb5a82497809d65c36abd00957/687474703a2f2f7777332e73696e61696d672e636e2f6c617267652f303036744e63373967793167336166776e617a65366a333066303077696162312e6a7067)

Click on the specific stuck point in the above figure to view the detailed stack information as follows: **\[Detailed stack map\]** [![image](https://camo.githubusercontent.com/927fd7d3d8e583787e48feaac78c2f4fef8ee2b80205474854c8e1bc3f07e62a/687474703a2f2f7777312e73696e61696d672e636e2f6c617267652f303036744e633739677931673361667a65393931666a333066303272346a776d2e6a7067)](https://camo.githubusercontent.com/927fd7d3d8e583787e48feaac78c2f4fef8ee2b80205474854c8e1bc3f07e62a/687474703a2f2f7777312e73696e61696d672e636e2f6c617267652f303036744e633739677931673361667a65393931666a333066303272346a776d2e6a7067)

**Click the bug** icon on the homepage or the above image to display a list of freezes for a period of time [![image](https://camo.githubusercontent.com/65d87cfc099562cb53969afbfa96029070b4099dd2e9697206911b309d3c6999/687474703a2f2f7777342e73696e61696d672e636e2f6c617267652f303036744e633739677931673361676a6c6d326d656a33306630307769676e392e6a7067)](https://camo.githubusercontent.com/65d87cfc099562cb53969afbfa96029070b4099dd2e9697206911b309d3c6999/687474703a2f2f7777342e73696e61696d672e636e2f6c617267652f303036744e633739677931673361676a6c6d326d656a33306630307769676e392e6a7067)

You can long press to delete or enter the detailed stack interface to mark as resolved, click to enter the detailed stack information interface, **TestSection** is a custom TAG.

### Step 1: Install it

First Add it in your root add build.gradle at the end of repositories:

```java
allprojects {
	repositories {
		..
		maven { url 'https://jitpack.io' }
	}
}
```

Then Add the dependency:

```java
dependencies {
    debugImplementation "com.github.silencedut.fpsviewer:fpsviewer:latestVersion"
    releaseImplementation "com.github.silencedut.fpsviewer:fpsviewer-no-op:latestVersion"
}
```

### Step 2: Initialize, add Section as needed

```java
interface IViewer {
    fun initViewer(application: Application,fpsConfig: FpsConfig? = null)
    fun fpsConfig():FpsConfig
    fun appendSection(sectionName:String)
    fun removeSection(sectionName:String)
}
```

### Reference

[Read more](https://github.com/SilenceDut/fpsviewer).


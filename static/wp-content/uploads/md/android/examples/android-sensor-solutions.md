# Sensor Events Detection


In this tutorial we will look at some solutions to use regarding sensors and gestures in android.


## (a). Sensey

> Android library which makes playing with sensor events & detecting gestures a breeze.

Sensey eliminates most boilerplate code for dealing with setting up sensor based event and gesture detection on Android.

Here are the supported gestures:

# Supported gestures/events

| Gesture | Methods |
| --- | --- |
| Flip | onFaceUp |
| onFaceDown |
| Light | onDark; onLight |
| Orientation | onTopSideUp; onBottomSideUp; onLeftSideUp; onRightSideUp |
| PinchScale | onScale; onScaleStart; onScaleEnd |
| Proximity | onNear; onFar |
| Shake | onShakeDetected; onShakeStopped |
| Wave | onWave |
| Chop | onChop |
| WristTwist | onWristTwist |
| Movement | onMovement; onStationary |
| SoundLevel | onSoundDetected |
| RotationAngle | onRotation |
| TiltDirection | onTiltInAxisX; onTiltInAxisY; onTiltInAxisZ |
| Scoop | onScooped |
| PickupDevice | onDevicePickedUp; onDevicePutDown |
| Steps | stepInformation |
| TouchType | onDoubleTap; onScroll(direction); onSingleTap; onSwipeLeft; onSwipeRight; onLongPress; onTwoFingerSingleTap; onThreeFingerSingleTap |

### Step 1: Install it

The first step in using Sensey is to install it. Grab it using the following implementation statement:

```groovy
implementation 'com.github.nisrulz:sensey:1.0.1'
```

### Step 2: Write Code

The first thing is to initialize Sensey. Do this inside the `onCreate()` method by obtaining an insatnce then invoking the `init()` and passing it a context like this:

```java
Sensey.getInstance().init(context);
```

Then for example here is how you listen to shake events(shake start and shake stop) in the device:

First create a shake listener:

```java
ShakeDetector.ShakeListener shakeListener=new ShakeDetector.ShakeListener() {
    @Override public void onShakeDetected() {
       // Shake detected, do something
   }

   @Override public void onShakeStopped() {
       // Shake stopped, do something
   }
};
```

Then start listen to the shake gestures:

```java
Sensey.getInstance().startShakeDetection(shakeListener);
```

If you want to modify the `threshold` and `time` before declaring that shake gesture is stopped, use

```java
Sensey.getInstance().startShakeDetection(threshold,timeBeforeDeclaringShakeStopped,shakeListener);
```

To stop listening for Shake gesture, pass the instance `shakeListener` to `stopShakeDetection()` function

```java
Sensey.getInstance().stopShakeDetection(shakeListener);
```

To stop Sensey, under your `onDestroy()` in the activity/service, call

```java
 // *** IMPORTANT ***
 // Stop Sensey and release the context held by it
 Sensey.getInstance().stop();
```

**Device Flip**

Create an instance of FlipListener

```java
FlipDetector.FlipListener flipListener=new FlipDetector.FlipListener() {
    @Override public void onFaceUp() {
       // Device Facing up
    }

    @Override public void onFaceDown() {
      // Device Facing down
    }
};
```

Now to start listening for Flip gesture, pass the instance `flipListener` to `startFlipDetection()` function

```java
Sensey.getInstance().startFlipDetection(flipListener);
```

To stop listening for Flip gesture, pass the instance `flipListener` to `stopFlipDetection()` function

```java
Sensey.getInstance().stopFlipDetection(flipListener);
```

**Light Detection**

Create an instance of LightListener

```java
LightDetector.LightListener lightListener=new LightDetector.LightListener() {
   @Override public void onDark() {
      // Dark
   }

   @Override public void onLight() {
      // Not Dark
   }
};
```

Now to start listening for Orientation gesture, pass the instance `lightListener` to `startLightDetection()` function

```java
Sensey.getInstance().startLightDetection(lightListener);
```

To stop listening for Orientation gesture, pass the instance `lightListener` to `stopLightDetection()` function

```java
Sensey.getInstance().stopLightDetection(lightListener);
```

### Example

There is a full example [here](https://github.com/nisrulz/sensey/tree/master/sample). The screenshots for the example are shown above.

![Android Sensor Detectors](https://github.com/nisrulz/sensey/raw/master/img/sc1.png)

### Reference

Here is the code reference

| No. | Link |
| --- | --- |
| 1. | Browse [Example](https://github.com/nisrulz/sensey/tree/master/sample) |
| 2. | Read [Wiki](https://github.com/nisrulz/sensey/wiki) |
| 3. | [Follow](https://github.com/nisrulz) Library author |

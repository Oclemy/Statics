# Run Your App

In the previous lesson, you created an Android app that displays "Hello, World!" You can now run the app on a real device or an emulator.

## Run on a real device

Set up your device as follows:

1.  Connect your device to your development machine with a USB cable. If you developed on Windows, you might need to install the appropriate USB driver for your device.
2.  Perform the following steps to enable **USB debugging** in the **Developer options** window:
    1.  Open the **Settings** app.
    2.  If your device uses Android v8.0 or higher, select **System**. Otherwise, proceed to the next step.
    3.  Scroll to the bottom and select **About phone**.
    4.  Scroll to the bottom and tap **Build number** seven times.
    5.  Return to the previous screen, scroll to the bottom, and tap **Developer options**.
    6.  In the **Developer options** window, scroll down to find and enable **USB debugging**.

Run the app on your device as follows:

1.  In Android Studio, select your app from the run/debug configurations drop-down menu in the toolbar.
2.  In the toolbar, select the device that you want to run your app on from the target device drop-down menu.

![Target device drop-down menu.](https://developer.android.com/studio/images/run/deploy-run-app.png)

**Figure 1.** Target device drop-down menu

1.  Click **Run** ![](https://developer.android.com/studio/images/buttons/toolbar-run.png).

    Android Studio installs your app on your connected device and starts it. You now see "Hello, World!" displayed in the app on your device.


To begin to develop your app, continue to the next lesson.

## Run on an emulator

Run the app on an emulator as follows:

1.  In Android Studio, create an Android Virtual Device (AVD) that the emulator can use to install and run your app.
2.  In the toolbar, select your app from the run/debug configurations drop-down menu.
3.  From the target device drop-down menu, select the AVD that you want to run your app on.

    ![Target device drop-down menu.](https://developer.android.com/studio/images/run/deploy-run-app.png)

    **Figure 2.** Target device drop-down menu

4.  Click **Run** ![](https://developer.android.com/studio/images/buttons/toolbar-run.png).

    Android Studio installs the app on the AVD and starts the emulator. You now see "Hello, World!" displayed in the app.


To begin to develop your app, continue to the next lesson.
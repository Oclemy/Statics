# Timer Machine

>  ⏲ A highly customizable interval timer app for Android.

![timer-machine-android Example Tutorial](https://github.com/timer-machine/timer-machine-android/actions/workflows/android.yml/badge.svg?branch=main)

![Timer Machine Tutorial](https://github.com/timer-machine/timer-machine-android/raw/develop/images/showcase.jpg)


![Timer Machine Tutorial](https://camo.githubusercontent.com/f8cc865a8fa303cbf10e8d0451254fa21c07163dc23a5becc9c174f28f4028f7/68747470733a2f2f706c61792e676f6f676c652e636f6d2f696e746c2f656e5f75732f6261646765732f7374617469632f696d616765732f6261646765732f656e5f62616467655f7765625f67656e657269632e706e67)

![Timer Machine Tutorial](https://camo.githubusercontent.com/12ce53a3272a486325fcadce4fb282cf7287b24780a36d849a9243206b66cff6/68747470733a2f2f6769746c61622e636f6d2f497a7a794f6e44726f69642f7265706f2f2d2f7261772f6d61737465722f6173736574732f497a7a794f6e44726f69642e706e67)


### Structure


The app uses the [Navigation component](https://developer.android.com/guide/navigation).

- Modules whose names start with `app-` are different destinations of the navigation graph.
- Each destination uses `ViewModel` in the `presentation` module.
- Each `ViewModel` is injected with `UseCase` in the `domain` module.
- Each `UseCase` is injected with different repositories that are implemented in the `data` module.
- Modules whose names start with `component-` are shared views and utility codes.
- The `flavor-google` module includes some advanced features and IAP.

### Build


Use the `dog` product flavor to develop and test.

The `google` product flavor is the version in Google Play. It has some in-app purchases. It also uses Firebase to store backup files and AppCenter to track crashes.

Compared with the `google` product flavor, the `other` product flavor removes in-app purchases and corresponding functions to release the app to `other` app stores.

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|1.|Read more [here](https://github.com/timer-machine/timer-machine-android).|
|2.|Follow code author [here](https://github.com/timer-machine).|

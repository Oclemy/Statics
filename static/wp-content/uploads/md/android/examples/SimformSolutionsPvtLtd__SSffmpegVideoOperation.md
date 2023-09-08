# FFmpeg compiled for Android

> FFmpeg compiled for Android.

Execute FFmpeg commands with ease in your Android app.

#### Getting Started

This project is provide in-build FFmpeg operation queries:

<img src="https://user-images.githubusercontent.com/16113993/111145681-86f5ee00-85ae-11eb-9057-c54955819459.png" width=270 height=480>

<img src="https://user-images.githubusercontent.com/16113993/111145695-8a897500-85ae-11eb-9c92-625865c0bfd4.png" width=270 height=480>

<img src="https://user-images.githubusercontent.com/16113993/111145578-6cbc1000-85ae-11eb-90a6-3550842db092.gif" width=270 height=480>


#### Video operation ffmpeg queries like

- Cut video using time
- Convert image to video
- Add water mark on video
- Add text on video
- Combine image image and video
- Combine images
- Combine videos
- Compress a video
- Extract frames from video
- Fast/Slow motion video
- Reverse video
- video fade in / fade out
- Compress video to GIF
- Rotate and Flip video (Mirroring)
- Remove audio from video
- Update aspect ratio of video
  
#### Other extra operation FFmpeg queries like

- Merge GIFs
- Merge Audios
- Update audio volume
- Fast/Slow audio
- Crop audio using time
- Compress Audio

#### Architectures

FFmpeg Android runs on the following architectures:
- arm-v7a, arm-v7a-neon, arm64-v8a, x86 and x86_64

#### Features

- Enabled network capabilities
- Multi-threading
- Supports zlib and Media-codec system libraries
- Camera access on supported devices
- Supports API Level 24+

#### Support target sdk
- 30

#### Dependency

- [MobileFFmpeg](https://github.com/tanersener/mobile-ffmpeg)

### Step 1: Install it

Add it in your root `build.gradle` at the end of repositories:

```groovy
	allprojects {
	    repositories {
		...
		maven { url 'https://jitpack.io' }
	    }
	}
```

Add the dependency in your app's `build.gradle` file:

```groovy
	dependencies {
		implementation 'com.github.SimformSolutionsPvtLtd:SSffmpegVideoOperation:1.0.8'
	}
```

This is all you have to do to load the FFmpeg library.

### Step 2: Run FFmpeg command

In this sample code we will run the FFmpeg -version command in background call.

```kotlin
  val query:Array<String> = "-i, input,....,...., outout"
        CallBackOfQuery().callQuery(query, object : FFmpegCallBack {
            override fun statisticsProcess(statistics: Statistics) {
                Log.i("FFMPEG LOG : ", statistics.videoFrameNumber)
            }

            override fun process(logMessage: LogMessage) {
                Log.i("FFMPEG LOG : ", logMessage.text)
            }

            override fun success() {
            }

            override fun cancel() {
            }

            override fun failed() {
            }
        })
```



#### In-build query example

```kotlin
val startTimeString = "00:01:00" (HH:MM:SS)
val endTimeString = "00:02:00" (HH:MM:SS)
val query:Array<String> = FFmpegQueryExtension().cutVideo(inputPath, startTimeString, endTimeString, outputPath)
CallBackOfQuery().callQuery(query, object : FFmpegCallBack {
            override fun statisticsProcess(statistics: Statistics) {
                Log.i("FFMPEG LOG : ", statistics.videoFrameNumber)
            }

            override fun process(logMessage: LogMessage) {
                Log.i("FFMPEG LOG : ", logMessage.text)
            }

            override fun success() {
                //Output = outputPath
            }

            override fun cancel() {
            }

            override fun failed() {
            }
        })
```
same for other queries.
And you can apply your query also.

### Reference

Read more [here](https://github.com/SimformSolutionsPvtLtd/SSffmpegVideoOperation)

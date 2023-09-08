# Accessibility Examples - Kotlin Android

Learn Android Accessibility via these examples.


## Example 1: Kotlin Android AccessibilityService for Clock Application Example

This tutorial will teach you how to create and implement an `AccessibilityService` that provides custom feedback for the Clock application that comes by default with Android devices.

It demonstrates the following key features of the Android accessibility APIs:

- Simple demonstration of how to use the accessibility APIs.
- Hands-on example of various ways to utilize the accessibility API for providing alternative and complementary feedback.
- Providing application specific feedback the service handles only accessibility events from the clock application.
- Providing dynamic, context-dependent feedback feedback type changes depending on the ringer state.


### Step 1: Dependencies

No special dependencies are needed.

### Step 2: Layouts

Design your layout as below:

**accessibility_service.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/accessibility_service_instructions"
        />

    <ImageButton android:id="@+id/button"
        android:background="@drawable/ic_launcher_settings"
        android:layout_width="32dip"
        android:layout_height="32dip"
        android:layout_marginTop="50dip"
        android:layout_gravity="center"
        android:scaleType="fitCenter"
        android:adjustViewBounds="true" />

</LinearLayout>
```

### Step 3: Create the Accessibility Service

Start by adding imports:

```kotlin
import com.example.android.apis.R

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.AccessibilityServiceInfo
import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.app.Service
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.media.AudioManager
import android.os.Build
import android.os.Handler
import android.os.Message
import android.os.Vibrator
import android.speech.tts.TextToSpeech
import android.util.Log
import android.util.SparseArray
import android.view.accessibility.AccessibilityEvent
```

Create a class that extends the `AccessibilityService`:

```kotlin
@TargetApi(Build.VERSION_CODES.ICE_CREAM_SANDWICH)
class ClockBackService : AccessibilityService() {
```

Define insatance fields:

```kotlin
    // Sound pool related member fields.

    /**
     * Mapping from integers to earcon names - dynamically populated.
     */
    private val mEarconNames = SparseArray<String>()

    // Auxiliary fields.

    /**
     * Handle to this service to enable inner classes to access the `Context`.
     */
    internal lateinit var mContext: Context

    /**
     * The feedback this service is currently providing.
     */
    internal var mProvidedFeedbackType: Int = 0

    /**
     * Reusable instance for building utterances.
     */
    private val mUtterance = StringBuilder()

    // Feedback providing services.

    /**
     * The `TextToSpeech` used for speaking.
     */
    private var mTts: TextToSpeech? = null

    /**
     * The `AudioManager` for detecting ringer state.
     */
    private var mAudioManager: AudioManager? = null

    /**
     * Vibrator for providing haptic feedback.
     */
    private var mVibrator: Vibrator? = null

    /**
     * Flag if the infrastructure is initialized.
     */
    private var isInfrastructureInitialized: Boolean = false

    /**
     * `Handler` for executing messages on the service main thread.
     */
    @Suppress("DEPRECATION")
    @SuppressLint("HandlerLeak")
    internal var mHandler: Handler = object : Handler() {
```

We implement this to receive messages. We switch on the `what` field of our parameter `Message message`:

- MESSAGE_SPEAK - we initialize `String utterance` with the `obj` field of `message` (cast to `String`), call the `speak` method of our field `TextToSpeech mTts` to speak `utterance` using the queuing strategy QUEUING_MODE_INTERRUPT, then return
    
    - MESSAGE_STOP_SPEAK - we call the `stop` method of our field `TextToSpeech mTts` to interrupt the current utterance and discard all utterances in the queue, then return.
- MESSAGE_START_TTS - we initialize our field `TextToSpeech mTts` with a new instance using an anonymous class for the `TextToSpeech.OnInitListener` which just registers us as a broadcast receiver, and we then return.
    
- MESSAGE_SHUTDOWN_TTS - we call the `shutdown` method of `mTts` and return.
    
- MESSAGE_PLAY_EARCON - we initialize `int resourceId` with the `arg1` field of our argument `message`, call our method `playEarcon` with it to play the earcon with that id (an earcon is a brief, distinctive sound used to represent a specific event or convey other information), then we return.
    
- MESSAGE_STOP_PLAY_EARCON - we call the `stop` method of `mTts` and return.
    
- MESSAGE_VIBRATE - we initialize `int key` with the `arg1` field of our argument `message`, initialize `long[] pattern` with the array stored at position `key` in `SparseArray<long[]> sVibrationPatterns`, and if that is not null we call the `vibrate` method of `Vibrator mVibrator` with that pattern. In either case we return to our caller.
    
- MESSAGE_STOP_VIBRATE - we call the `cancel` method of `Vibrator mVibrator` and return.
    
- `@param message` - A `Message` object
    

```kotlin
        override fun handleMessage(message: Message) {
            when (message.what) {
                MESSAGE_SPEAK -> {
                    val utterance = message.obj as String
                    mTts!!.speak(utterance, QUEUING_MODE_INTERRUPT, null)
                    return
                }
                MESSAGE_STOP_SPEAK -> {
                    mTts!!.stop()
                    return
                }
                MESSAGE_START_TTS -> {
                    /**
                     * Called to signal the completion of the TextToSpeech engine initialization.
                     *
                     * parameter `it` is [TextToSpeech.SUCCESS] or [TextToSpeech.ERROR].
                     */
                    mTts = TextToSpeech(mContext, TextToSpeech.OnInitListener {
                        // Register here since to add earcons the TTS must be initialized and
                        // the receiver is called immediately with the current ringer mode.
                        registerBroadCastReceiver()
                    })
                    return
                }
                MESSAGE_SHUTDOWN_TTS -> {
                    mTts!!.shutdown()
                    return
                }
                MESSAGE_PLAY_EARCON -> {
                    val resourceId = message.arg1
                    playEarcon(resourceId)
                    return
                }
                MESSAGE_STOP_PLAY_EARCON -> {
                    mTts!!.stop()
                    return
                }
                MESSAGE_VIBRATE -> {
                    val key = message.arg1
                    val pattern = sVibrationPatterns.get(key)
                    if (pattern != null) {
                        mVibrator!!.vibrate(pattern, -1)
                    }
                    return
                }
                MESSAGE_STOP_VIBRATE -> {
                    mVibrator!!.cancel()
                    return
                }
            }
        }
    }
```

`BroadcastReceiver` for receiving updates for the actions `ACTION_SCREEN_ON`, `ACTION_SCREEN_OFF` and `AudioManager.RINGER_MODE_CHANGED_ACTION`.

```kotlin
    private val mBroadcastReceiver = object : BroadcastReceiver() {
```

This method is called when the BroadcastReceiver is receiving an Intent broadcast. We initialize `String action` with the action of our argument `Intent intent`.

If `action` is equal to AudioManager.RINGER_MODE_CHANGED_ACTION we initialize `int ringerMode` with the extra in `intent` stored under the key AudioManager.EXTRA_RINGER_MODE (defaulting to RINGER_MODE_NORMAL) and call our method `configureForRingerMode` with `ringerMode` to configure our feedback to the new ringer mode. Else if `action` equals ACTION_SCREEN_ON, we call our method `provideScreenStateChangeFeedback` to provide feedback to announce the screen state change to INDEX_SCREEN_ON. Else if `action` equals ACTION_SCREEN_OFF, we call our method `provideScreenStateChangeFeedback` to provide feedback to announce the screen state change to INDEX_SCREEN_OFF. If `action` is not any of the above we just log a message stating that we do not handle `action`.

- `@param context` - The Context in which the receiver is running.
- `@param intent` - The Intent being received.

```kotlin
        override fun onReceive(context: Context, intent: Intent) {

            when (val action = intent.action) {
                AudioManager.RINGER_MODE_CHANGED_ACTION -> {
                    val ringerMode = intent.getIntExtra(AudioManager.EXTRA_RINGER_MODE,
                            AudioManager.RINGER_MODE_NORMAL)
                    configureForRingerMode(ringerMode)
                }
                Intent.ACTION_SCREEN_ON -> provideScreenStateChangeFeedback(INDEX_SCREEN_ON)
                Intent.ACTION_SCREEN_OFF -> provideScreenStateChangeFeedback(INDEX_SCREEN_OFF)
                else -> Log.w(LOG_TAG, "Registered for but not handling action " + action!!)
            }
        }
```

Provides feedback to announce the screen state change. Such a change is turning the screen on or off. We switch on our field `int mProvidedFeedbackType`:

- FEEDBACK_SPOKEN - we initialize `String utterance` with the string returned by our method `generateScreenOnOrOffUtternace` for our argument `feedbackIndex`, use `Handler mHandler` to load a `Message` with the `what` field of MESSAGE_SPEAK, and the `obj` field of `utterance` then send this `Message` to `Handler mHandler`, and return to our caller.
    
- FEEDBACK_AUDIBLE - we use `Handler mHandler` to load a `Message` with the `what` field of MESSAGE_PLAY_EARCON, the `arg1` field of `feedbackIndex`, and the `arg2` field of 0, then send this `Message` to `Handler mHandler`, and return to our caller.
    
- FEEDBACK_HAPTIC - we use `Handler mHandler` to load a `Message` with the `what` field of MESSAGE_VIBRATE, the `arg1` field of `feedbackIndex`, and the `arg2` field of 0, then send this `Message` to `Handler mHandler`, and return to our caller.
    
- default - we throw an IllegalStateException.
    
- `@param feedbackIndex` - The index of the feedback in the statically mapped feedback resources.
    

```kotlin
        private fun provideScreenStateChangeFeedback(feedbackIndex: Int) {
            // We take a specific action depending on the feedback we currently provide.
            when (mProvidedFeedbackType) {
                AccessibilityServiceInfo.FEEDBACK_SPOKEN -> {
                    val utterance = generateScreenOnOrOffUtternace(feedbackIndex)
                    mHandler.obtainMessage(MESSAGE_SPEAK, utterance).sendToTarget()
                    return
                }
                AccessibilityServiceInfo.FEEDBACK_AUDIBLE -> {
                    mHandler.obtainMessage(MESSAGE_PLAY_EARCON, feedbackIndex, 0).sendToTarget()
                    return
                }
                AccessibilityServiceInfo.FEEDBACK_HAPTIC -> {
                    mHandler.obtainMessage(MESSAGE_VIBRATE, feedbackIndex, 0).sendToTarget()
                    return
                }
                else -> throw IllegalStateException("Unexpected feedback type $mProvidedFeedbackType")
            }
        }
    }
```

This method is a part of the `AccessibilityService` lifecycle and is called after the system has successfully bound to the service. First we check if we have already initialized our Infrastructure (our flag `isInfrastructureInitialized` is true) and if so we return having done nothing. We initialize our field `Context mContext` to "this", then send the empty message MESSAGE_START_TTS to `Handler mHandler` to start the Text to speech service running. We initialize `Vibrator mVibrator` with an instance of the system level service VIBRATOR_SERVICE, and `AudioManager mAudioManager` with an instance of the service AUDIO_SERVICE. We use `mAudioManager` to fetch the current ringer mode to `int ringerMode` and call our method `configureForRingerMode` with it to configure the types of feedback which are appropriate for the ringer mode. Finally we set our flag `boolean isInfrastructureInitialized` to true.

```kotlin
    public override fun onServiceConnected() {
        if (isInfrastructureInitialized) {
            return
        }

        mContext = this

        // Send a message to start the TTS.
        mHandler.sendEmptyMessage(MESSAGE_START_TTS)

        // Get the vibrator service.
        mVibrator = getSystemService(Service.VIBRATOR_SERVICE) as Vibrator

        // Get the AudioManager and configure according the current ring mode.
        mAudioManager = getSystemService(Service.AUDIO_SERVICE) as AudioManager
        // In Froyo the broadcast receiver for the ringer mode is called back with the
        // current state upon registering but in Eclair this is not done so we poll here.
        val ringerMode = mAudioManager!!.ringerMode
        configureForRingerMode(ringerMode)

        // We are in an initialized state now.
        isInfrastructureInitialized = true
    }
```

Called when all clients have disconnected from a particular interface published by the service. If our flag `boolean isInfrastructureInitialized` is true we send the empty message MESSAGE_SHUTDOWN_TTS to our `Handler mHandler` to shut down the text to speech service, and if `BroadcastReceiver mBroadcastReceiver` is not null we unregister it. We then set `isInfrastructureInitialized` to false. In either case we return false to the caller.

- `@param intent` - The Intent that was used to bind to this service @return Return true if you would like to have the service's

```kotlin
    override fun onUnbind(intent: Intent): Boolean {
        if (isInfrastructureInitialized) {
            // Stop the TTS service.
            mHandler.sendEmptyMessage(MESSAGE_SHUTDOWN_TTS)

            // Unregister the intent broadcast receiver.
            @Suppress("SENSELESS_COMPARISON")
            if (mBroadcastReceiver != null) {
                unregisterReceiver(mBroadcastReceiver)
            }

            // We are not in an initialized state anymore.
            isInfrastructureInitialized = false
        }
        return false
    }
```

Registers the phone state observing broadcast receiver. We initialize `IntentFilter filter` with a new instance, add the actions RINGER_MODE_CHANGED_ACTION, ACTION_SCREEN_ON, and ACTION_SCREEN_OFF to it then register `BroadcastReceiver mBroadcastReceiver` to receive broadcast intents matching `filter`.

```kotlin
    private fun registerBroadCastReceiver() {
        // Create a filter with the broadcast intents we are interested in.
        val filter = IntentFilter()
        filter.addAction(AudioManager.RINGER_MODE_CHANGED_ACTION)
        filter.addAction(Intent.ACTION_SCREEN_ON)
        filter.addAction(Intent.ACTION_SCREEN_OFF)
        // Register for broadcasts of interest.
        registerReceiver(mBroadcastReceiver, filter, null, null)
    }
```

Generates an utterance for announcing screen on and screen off. If our argument `feedbackIndex` is INDEX_SCREEN_ON We initialize our variable `int resourceId` to the resource id R.string.template_screen_on ("Screen on. Volume %1$s percent."), otherwise we initialize it to the resource id R.string.template_screen_off ("Screen off. Volume %1$s percent."). We fetch the string that `resourceId` references to `String template`. We set `int currentRingerVolume` to the volume of the stream STREAM_RING that `mAudioManager` returns when queried, and `int maxRingerVolume` to the maximum value for that stream.

We calculate `int volumePercent` to be 100 divided by `maxRingerVolume` times `currentRingerVolume` (the current volume 0 to 100 percent). We do some math tricks to round `volumePercent` to the nearest 5 percent then we return the string formed by formatting `volumePercent` using the format in `template`.

- `@param feedbackIndex` - The feedback index for looking up feedback value.
- `@return` - The utterance.

```kotlin
    private fun generateScreenOnOrOffUtternace(feedbackIndex: Int): String {
        // Get the announce template.
        val resourceId = if (feedbackIndex == INDEX_SCREEN_ON)
            R.string.template_screen_on
        else
            R.string.template_screen_off
        val template = mContext.getString(resourceId)

        // Format the template with the ringer percentage.
        val currentRingerVolume = mAudioManager!!.getStreamVolume(AudioManager.STREAM_RING)
        val maxRingerVolume = mAudioManager!!.getStreamMaxVolume(AudioManager.STREAM_RING)
        var volumePercent = 100 / maxRingerVolume * currentRingerVolume

        // Let us round to five so it sounds better.
        val adjustment = volumePercent % 10
        if (adjustment < 5) {
            volumePercent -= adjustment
        } else if (adjustment > 5) {
            volumePercent += 10 - adjustment
        }

        return String.format(template, volumePercent)
    }
```

Configures the service according to a ringer mode. Possible configurations:

> 1. `AudioManager#RINGER_MODE_SILENT` Goal: Provide only custom haptic feedback. Approach: Take over the haptic feedback by configuring this service to provide such and do so. This way the system will not call the default haptic feedback service KickBack. Take over the audible and spoken feedback by configuring this service to provide such feedback but not doing so. This way the system will not call the default spoken feedback service TalkBack and the default audible feedback service SoundBack.
> 
> 2. `AudioManager#RINGER_MODE_VIBRATE` Goal: Provide custom audible and default haptic feedback. Approach: Take over the audible feedback and provide custom one. Take over the spoken feedback but do not provide such. Let some other service provide haptic feedback (KickBack).
>     
> 3. `AudioManager#RINGER_MODE_NORMAL` Goal: Provide custom spoken, default audible and default haptic feedback. Approach: Take over the spoken feedback and provide custom one. Let some other services provide audible feedback (SoundBack) and haptic feedback (KickBack).
>     

- `@param ringerMode` - The device ringer mode.

```kotlin
    private fun configureForRingerMode(ringerMode: Int) {
        when (ringerMode) {
            AudioManager.RINGER_MODE_SILENT -> {
                // When the ringer is silent we want to provide only haptic feedback.
                mProvidedFeedbackType = AccessibilityServiceInfo.FEEDBACK_HAPTIC

                // Take over the spoken and sound feedback so no such feedback is provided.
                setServiceInfo(AccessibilityServiceInfo.FEEDBACK_HAPTIC
                        or AccessibilityServiceInfo.FEEDBACK_SPOKEN
                        or AccessibilityServiceInfo.FEEDBACK_AUDIBLE)

                // Use only an earcon to announce ringer state change.
                mHandler.obtainMessage(MESSAGE_PLAY_EARCON, INDEX_RINGER_SILENT, 0).sendToTarget()
            }
            AudioManager.RINGER_MODE_VIBRATE -> {
                // When the ringer is vibrating we want to provide only audible feedback.
                mProvidedFeedbackType = AccessibilityServiceInfo.FEEDBACK_AUDIBLE

                // Take over the spoken feedback so no spoken feedback is provided.
                setServiceInfo(AccessibilityServiceInfo.FEEDBACK_AUDIBLE or AccessibilityServiceInfo.FEEDBACK_SPOKEN)

                // Use only an earcon to announce ringer state change.
                mHandler.obtainMessage(MESSAGE_PLAY_EARCON, INDEX_RINGER_VIBRATE, 0).sendToTarget()
            }
            AudioManager.RINGER_MODE_NORMAL -> {
                // When the ringer is ringing we want to provide spoken feedback
                // overriding the default spoken feedback.
                mProvidedFeedbackType = AccessibilityServiceInfo.FEEDBACK_SPOKEN
                setServiceInfo(AccessibilityServiceInfo.FEEDBACK_SPOKEN)

                // Use only an earcon to announce ringer state change.
                mHandler.obtainMessage(MESSAGE_PLAY_EARCON, INDEX_RINGER_NORMAL, 0).sendToTarget()
            }
        }
    }
```

Sets the `AccessibilityServiceInfo` which informs the system how to handle this `AccessibilityService`. We initialize `AccessibilityServiceInfo info` with a new instance, set its `eventTypes` field (the event types an AccessibilityService we are interested in) to TYPES_ALL_MASK (Mask for all types of AccessibilityEvent), and set its `feedbackType` field (the type of feedback we want to provide) to our parameter `int feedbackType`, the `notificationTimeout` field (the timeout after the most recent event of a given type before an AccessibilityService is notified) to our constant EVENT_NOTIFICATION_TIMEOUT_MILLIS (80ms), and its `packageNames` field (the package names we are interested in) to our array `String[] PACKAGE_NAMES` (which contains the package names of the standard Android clock packages). Finally we call the `setServiceInfo` method with `info` as its argument to set the AccessibilityServiceInfo that describes this service.

- `@param feedbackType` - The type of feedback this service will provide. Note: The feedbackType parameter is an bitwise or of all feedback types this service would like to provide.

```kotlin
    private fun setServiceInfo(feedbackType: Int) {
        val info = AccessibilityServiceInfo()
        // We are interested in all types of accessibility events.
        info.eventTypes = AccessibilityEvent.TYPES_ALL_MASK
        // We want to provide specific type of feedback.
        info.feedbackType = feedbackType
        // We want to receive events in a certain interval.
        info.notificationTimeout = EVENT_NOTIFICATION_TIMEOUT_MILLIS.toLong()
        // We want to receive accessibility events only from certain packages.
        info.packageNames = PACKAGE_NAMES
        serviceInfo = info
    }
```

Callback for `AccessibilityEvent`s. First we log the string value of our argument `AccessibilityEvent event`. If our field `mProvidedFeedbackType` is equal to FEEDBACK_SPOKEN, we obtain and send a `Message` to `Handler mHandler` with a `what` field of MESSAGE_SPEAK, and the `String` generated by our method `formatUtterance` for `event`. Else if field `mProvidedFeedbackType` is equal to FEEDBACK_AUDIBLE, we obtain and send a `Message` to `Handler mHandler` with a `what` field of MESSAGE_PLAY_EARCON, the event type of `event` as the `arg1` field and 0 for the `arg2` field. Else if field `mProvidedFeedbackType` is equal to FEEDBACK_HAPTIC, we obtain and send a `Message` to `Handler mHandler` with a `what` field of MESSAGE_VIBRATE, the event type of `event` as the `arg1` field and 0 for the `arg2` field. If the `mProvidedFeedbackType` is none of the above we throw an IllegalStateException: "Unexpected feedback type ".

- `@param event` - An event.

```kotlin
    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        Log.i(LOG_TAG, "$mProvidedFeedbackType $event")

        // Here we act according to the feedback type we are currently providing.
        when (mProvidedFeedbackType) {
            AccessibilityServiceInfo.FEEDBACK_SPOKEN ->
                mHandler.obtainMessage(MESSAGE_SPEAK, formatUtterance(event)).sendToTarget()
            AccessibilityServiceInfo.FEEDBACK_AUDIBLE ->
                mHandler.obtainMessage(MESSAGE_PLAY_EARCON, event.eventType, 0).sendToTarget()
            AccessibilityServiceInfo.FEEDBACK_HAPTIC ->
                mHandler.obtainMessage(MESSAGE_VIBRATE, event.eventType, 0).sendToTarget()
            else -> throw IllegalStateException("Unexpected feedback type $mProvidedFeedbackType")
        }
    }
```

Callback for interrupting the accessibility feedback. If our field `mProvidedFeedbackType` is equal to FEEDBACK_SPOKEN, we obtain and send a `Message` to `Handler mHandler` with a `what` field of MESSAGE_STOP_SPEAK. Else if our field `mProvidedFeedbackType` is equal to FEEDBACK_AUDIBLE, we obtain and send a `Message` to `Handler mHandler` with a `what` field of MESSAGE_STOP_PLAY_EARCON. Else if our field `mProvidedFeedbackType` is equal to FEEDBACK_HAPTIC, we obtain and send a `Message` to `Handler mHandler` with a `what` field of MESSAGE_STOP_VIBRATE. If the `mProvidedFeedbackType` is none of the above we throw an IllegalStateException: "Unexpected feedback type ".

```kotlin
    override fun onInterrupt() {
        // Here we act according to the feedback type we are currently providing.
        when (mProvidedFeedbackType) {
            AccessibilityServiceInfo.FEEDBACK_SPOKEN ->
                mHandler.obtainMessage(MESSAGE_STOP_SPEAK).sendToTarget()
            AccessibilityServiceInfo.FEEDBACK_AUDIBLE ->
                mHandler.obtainMessage(MESSAGE_STOP_PLAY_EARCON).sendToTarget()
            AccessibilityServiceInfo.FEEDBACK_HAPTIC ->
                mHandler.obtainMessage(MESSAGE_STOP_VIBRATE).sendToTarget()
            else -> throw IllegalStateException("Unexpected feedback type $mProvidedFeedbackType")
        }
    }
```

Formats an utterance from an `AccessibilityEvent`. We initialize `StringBuilder utterance` by copying the reference from our field `StringBuilder mUtterance`, and clear it by setting its length to 0. We initialize `List<CharSequence> eventText` by retrieving the text of the `AccessibilityEvent event`. If `eventText` is not empty we loop through all the `CharSequence subText` in `eventText` removing the character '0' if it is the first character, appending `subText` to `utterance` followed by a SPACE character. When we are done appending all the `CharSequence` into `utterance` we return the string value of `utterance` to the caller. If there is no event text in `event` we initialize `CharSequence contentDescription` with the content description of the source, and if it is not null we append it to `utterance` and return the string value of `utterance` to the caller. If there is not event text and no content description in `event` we just return the string value of `utterance` to the caller.

- `@param event` - The event from which to format an utterance.
- `@return` - The formatted utterance.

```kotlin
    private fun formatUtterance(event: AccessibilityEvent): String {
        val utterance = mUtterance

        // Clear the utterance before appending the formatted text.
        utterance.setLength(0)

        val eventText = event.text

        // We try to get the event text if such.
        if (eventText.isNotEmpty()) {
            for (subText in eventText) {
                var subTextVar = subText
                // Make 01 pronounced as 1
                if (subTextVar[0] == '0') {
                    subTextVar = subTextVar.subSequence(1, subText.length)
                }
                utterance.append(subTextVar)
                utterance.append(SPACE)
            }

            return utterance.toString()
        }

        // There is no event text but we try to get the content description which is
        // an optional attribute for describing a view (typically used with ImageView).
        val contentDescription = event.contentDescription
        if (contentDescription != null) {
            utterance.append(contentDescription)
            return utterance.toString()
        }

        return utterance.toString()
    }
```

Plays an earcon given its id. We set `String earconName` to the string in our field `SparseArray<String> mEarconNames` at index `earconId`. If `earconName` is null we do not know the sound id, hence we need to load the sound. We initialize `Integer resourceId` with the resource id at index `earconId` in our field `SparseArray<Integer> sSoundsResourceIds`. If `resourceId` is not equal to null, we set `earconName` to the string formed by surrounding the string value of `earconId` with '[' and ']' characters, call the `addEarcon` method of `TextToSpeech mTts` to add a mapping between the string of text `earconName`, our package name, and the sound resource `resourceId`. We then store `earconName` under the key `earconId` in `SparseArray<String> mEarconNames`. Finally we call the `playEarcon` method of `mTts` to play the Earcon `earconName` using QUEUING_MODE_INTERRUPT as the queueing mode.

- `@param earconId` - The id of the earcon to be played.

```kotlin
    private fun playEarcon(earconId: Int) {
        var earconName: String? = mEarconNames.get(earconId)
        if (earconName == null) {
            // We do not know the sound id, hence we need to load the sound.
            val resourceId = sSoundsResourceIds.get(earconId)
            if (resourceId != null) {
                earconName = "[$earconId]"
                mTts!!.addEarcon(earconName, packageName, resourceId)
                mEarconNames.put(earconId, earconName)
            }
        }

        @Suppress("DEPRECATION")
        mTts!!.playEarcon(earconName, QUEUING_MODE_INTERRUPT, null)
    }

    companion object {
        /**
         * Tag for logging from this service.
         */
        private const val LOG_TAG = "ClockBackService"

        // Fields for configuring how the system handles this accessibility service.

        /**
         * Minimal timeout between accessibility events we want to receive.
         */
        private const val EVENT_NOTIFICATION_TIMEOUT_MILLIS = 80

        /**
         * Packages we are interested in.
         *
         *
         * **
         * Note: This code sample will work only on devices shipped with the
         * default Clock application.
         ** *
         *
         * This works with AlarmClock and Clock whose package name changes in different releases
         */
        private val PACKAGE_NAMES = arrayOf(
                "com.android.alarmclock",
                "com.google.android.deskclock",
                "com.android.deskclock"
        )

        // Message types we are passing around.

        /**
         * Speak.
         */
        private const val MESSAGE_SPEAK = 1

        /**
         * Stop speaking.
         */
        private const val MESSAGE_STOP_SPEAK = 2

        /**
         * Start the TTS service.
         */
        private const val MESSAGE_START_TTS = 3

        /**
         * Stop the TTS service.
         */
        private const val MESSAGE_SHUTDOWN_TTS = 4

        /**
         * Play an earcon.
         */
        private const val MESSAGE_PLAY_EARCON = 5

        /**
         * Stop playing an earcon.
         */
        private const val MESSAGE_STOP_PLAY_EARCON = 6

        /**
         * Vibrate a pattern.
         */
        private const val MESSAGE_VIBRATE = 7

        /**
         * Stop vibrating.
         */
        private const val MESSAGE_STOP_VIBRATE = 8

        // Screen state broadcast related constants.

        /**
         * Feedback mapping index used as a key for the screen-on broadcast.
         */
        private const val INDEX_SCREEN_ON = 0x00000100

        /**
         * Feedback mapping index used as a key for the screen-off broadcast.
         */
        private const val INDEX_SCREEN_OFF = 0x00000200

        // Ringer mode change related constants.

        /**
         * Feedback mapping index used as a key for normal ringer mode.
         */
        private const val INDEX_RINGER_NORMAL = 0x00000400

        /**
         * Feedback mapping index used as a key for vibration ringer mode.
         */
        private const val INDEX_RINGER_VIBRATE = 0x00000800

        /**
         * Feedback mapping index used as a key for silent ringer mode.
         */
        private const val INDEX_RINGER_SILENT = 0x00001000

        // Speech related constants.

        /**
         * The queuing mode we are using - interrupt a spoken utterance before
         * speaking another one.
         */
        private const val QUEUING_MODE_INTERRUPT = 2

        /**
         * The space string constant.
         */
        private const val SPACE = " "

        /**
         * Mapping from integers to vibration patterns for haptic feedback.
         */
        private val sVibrationPatterns = SparseArray<LongArray>()

        /**
         * Initializes our `sVibrationPatterns` `SparseArray`.
         */
        init {
            sVibrationPatterns.put(AccessibilityEvent.TYPE_VIEW_CLICKED, longArrayOf(0L, 100L))
            sVibrationPatterns.put(AccessibilityEvent.TYPE_VIEW_LONG_CLICKED, longArrayOf(0L, 100L))
            sVibrationPatterns.put(AccessibilityEvent.TYPE_VIEW_SELECTED, longArrayOf(0L, 15L, 10L, 15L))
            sVibrationPatterns.put(AccessibilityEvent.TYPE_VIEW_FOCUSED, longArrayOf(0L, 15L, 10L, 15L))
            sVibrationPatterns.put(AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED, longArrayOf(0L, 25L, 50L, 25L, 50L, 25L))
            sVibrationPatterns.put(AccessibilityEvent.TYPE_VIEW_HOVER_ENTER, longArrayOf(0L, 15L, 10L, 15L, 15L, 10L))
            sVibrationPatterns.put(INDEX_SCREEN_ON, longArrayOf(0L, 10L, 10L, 20L, 20L, 30L))
            sVibrationPatterns.put(INDEX_SCREEN_OFF, longArrayOf(0L, 30L, 20L, 20L, 10L, 10L))
        }

        /**
         * Mapping from integers to raw sound resource ids.
         */
        @SuppressLint("UseSparseArrays")
        private val sSoundsResourceIds = SparseArray<Int>()

        /**
         * Initializes our `sSoundsResourceIds` `SparseArray`.
         */
        init {
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_VIEW_CLICKED, R.raw.sound_view_clicked)
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_VIEW_LONG_CLICKED, R.raw.sound_view_clicked)
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_VIEW_SELECTED, R.raw.sound_view_focused_or_selected)
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_VIEW_FOCUSED, R.raw.sound_view_focused_or_selected)
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED, R.raw.sound_window_state_changed)
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_VIEW_HOVER_ENTER, R.raw.sound_view_hover_enter)
            sSoundsResourceIds.put(INDEX_SCREEN_ON, R.raw.sound_screen_on)
            sSoundsResourceIds.put(INDEX_SCREEN_OFF, R.raw.sound_screen_off)
            sSoundsResourceIds.put(INDEX_RINGER_SILENT, R.raw.sound_ringer_silent)
            sSoundsResourceIds.put(INDEX_RINGER_VIBRATE, R.raw.sound_ringer_vibrate)
            sSoundsResourceIds.put(INDEX_RINGER_NORMAL, R.raw.sound_ringer_normal)
        }
    }
}
```

Here is the full code:

**TaskBackService.kt**

```kotlin
import com.example.android.apis.R

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.AccessibilityServiceInfo
import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.app.Service
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.media.AudioManager
import android.os.Build
import android.os.Handler
import android.os.Message
import android.os.Vibrator
import android.speech.tts.TextToSpeech
import android.util.Log
import android.util.SparseArray
import android.view.accessibility.AccessibilityEvent

@TargetApi(Build.VERSION_CODES.ICE_CREAM_SANDWICH)
class ClockBackService : AccessibilityService() {

    // Sound pool related member fields.

    /**
     * Mapping from integers to earcon names - dynamically populated.
     */
    private val mEarconNames = SparseArray<String>()

    // Auxiliary fields.

    /**
     * Handle to this service to enable inner classes to access the `Context`.
     */
    internal lateinit var mContext: Context

    /**
     * The feedback this service is currently providing.
     */
    internal var mProvidedFeedbackType: Int = 0

    /**
     * Reusable instance for building utterances.
     */
    private val mUtterance = StringBuilder()

    // Feedback providing services.

    /**
     * The `TextToSpeech` used for speaking.
     */
    private var mTts: TextToSpeech? = null

    /**
     * The `AudioManager` for detecting ringer state.
     */
    private var mAudioManager: AudioManager? = null

    /**
     * Vibrator for providing haptic feedback.
     */
    private var mVibrator: Vibrator? = null

    /**
     * Flag if the infrastructure is initialized.
     */
    private var isInfrastructureInitialized: Boolean = false

    /**
     * `Handler` for executing messages on the service main thread.
     */
    @Suppress("DEPRECATION")
    @SuppressLint("HandlerLeak")
    internal var mHandler: Handler = object : Handler() {

        override fun handleMessage(message: Message) {
            when (message.what) {
                MESSAGE_SPEAK -> {
                    val utterance = message.obj as String
                    mTts!!.speak(utterance, QUEUING_MODE_INTERRUPT, null)
                    return
                }
                MESSAGE_STOP_SPEAK -> {
                    mTts!!.stop()
                    return
                }
                MESSAGE_START_TTS -> {
                    /**
                     * Called to signal the completion of the TextToSpeech engine initialization.
                     *
                     * parameter `it` is [TextToSpeech.SUCCESS] or [TextToSpeech.ERROR].
                     */
                    mTts = TextToSpeech(mContext, TextToSpeech.OnInitListener {
                        // Register here since to add earcons the TTS must be initialized and
                        // the receiver is called immediately with the current ringer mode.
                        registerBroadCastReceiver()
                    })
                    return
                }
                MESSAGE_SHUTDOWN_TTS -> {
                    mTts!!.shutdown()
                    return
                }
                MESSAGE_PLAY_EARCON -> {
                    val resourceId = message.arg1
                    playEarcon(resourceId)
                    return
                }
                MESSAGE_STOP_PLAY_EARCON -> {
                    mTts!!.stop()
                    return
                }
                MESSAGE_VIBRATE -> {
                    val key = message.arg1
                    val pattern = sVibrationPatterns.get(key)
                    if (pattern != null) {
                        mVibrator!!.vibrate(pattern, -1)
                    }
                    return
                }
                MESSAGE_STOP_VIBRATE -> {
                    mVibrator!!.cancel()
                    return
                }
            }
        }
    }

    private val mBroadcastReceiver = object : BroadcastReceiver() {

        override fun onReceive(context: Context, intent: Intent) {

            when (val action = intent.action) {
                AudioManager.RINGER_MODE_CHANGED_ACTION -> {
                    val ringerMode = intent.getIntExtra(AudioManager.EXTRA_RINGER_MODE,
                            AudioManager.RINGER_MODE_NORMAL)
                    configureForRingerMode(ringerMode)
                }
                Intent.ACTION_SCREEN_ON -> provideScreenStateChangeFeedback(INDEX_SCREEN_ON)
                Intent.ACTION_SCREEN_OFF -> provideScreenStateChangeFeedback(INDEX_SCREEN_OFF)
                else -> Log.w(LOG_TAG, "Registered for but not handling action " + action!!)
            }
        }

        private fun provideScreenStateChangeFeedback(feedbackIndex: Int) {
            // We take a specific action depending on the feedback we currently provide.
            when (mProvidedFeedbackType) {
                AccessibilityServiceInfo.FEEDBACK_SPOKEN -> {
                    val utterance = generateScreenOnOrOffUtternace(feedbackIndex)
                    mHandler.obtainMessage(MESSAGE_SPEAK, utterance).sendToTarget()
                    return
                }
                AccessibilityServiceInfo.FEEDBACK_AUDIBLE -> {
                    mHandler.obtainMessage(MESSAGE_PLAY_EARCON, feedbackIndex, 0).sendToTarget()
                    return
                }
                AccessibilityServiceInfo.FEEDBACK_HAPTIC -> {
                    mHandler.obtainMessage(MESSAGE_VIBRATE, feedbackIndex, 0).sendToTarget()
                    return
                }
                else -> throw IllegalStateException("Unexpected feedback type $mProvidedFeedbackType")
            }
        }
    }

    public override fun onServiceConnected() {
        if (isInfrastructureInitialized) {
            return
        }

        mContext = this

        // Send a message to start the TTS.
        mHandler.sendEmptyMessage(MESSAGE_START_TTS)

        // Get the vibrator service.
        mVibrator = getSystemService(Service.VIBRATOR_SERVICE) as Vibrator

        // Get the AudioManager and configure according the current ring mode.
        mAudioManager = getSystemService(Service.AUDIO_SERVICE) as AudioManager
        // In Froyo the broadcast receiver for the ringer mode is called back with the
        // current state upon registering but in Eclair this is not done so we poll here.
        val ringerMode = mAudioManager!!.ringerMode
        configureForRingerMode(ringerMode)

        // We are in an initialized state now.
        isInfrastructureInitialized = true
    }

    /**
     * Called when all clients have disconnected from a particular interface published by the service.
     * If our flag `boolean isInfrastructureInitialized` is true we send the empty message
     * MESSAGE_SHUTDOWN_TTS to our `Handler mHandler` to shut down the text to speech service,
     * and if `BroadcastReceiver mBroadcastReceiver` is not null we unregister it. We then set
     * `isInfrastructureInitialized` to false. In either case we return false to the caller.
     *
     * @param intent The Intent that was used to bind to this service
     * @return Return true if you would like to have the service's
     */
    override fun onUnbind(intent: Intent): Boolean {
        if (isInfrastructureInitialized) {
            // Stop the TTS service.
            mHandler.sendEmptyMessage(MESSAGE_SHUTDOWN_TTS)

            // Unregister the intent broadcast receiver.
            @Suppress("SENSELESS_COMPARISON")
            if (mBroadcastReceiver != null) {
                unregisterReceiver(mBroadcastReceiver)
            }

            // We are not in an initialized state anymore.
            isInfrastructureInitialized = false
        }
        return false
    }

    /**
     * Registers the phone state observing broadcast receiver. We initialize `IntentFilter filter`
     * with a new instance, add the actions RINGER_MODE_CHANGED_ACTION, ACTION_SCREEN_ON, and
     * ACTION_SCREEN_OFF to it then register `BroadcastReceiver mBroadcastReceiver` to receive
     * broadcast intents matching `filter`.
     */
    private fun registerBroadCastReceiver() {
        // Create a filter with the broadcast intents we are interested in.
        val filter = IntentFilter()
        filter.addAction(AudioManager.RINGER_MODE_CHANGED_ACTION)
        filter.addAction(Intent.ACTION_SCREEN_ON)
        filter.addAction(Intent.ACTION_SCREEN_OFF)
        // Register for broadcasts of interest.
        registerReceiver(mBroadcastReceiver, filter, null, null)
    }

    private fun generateScreenOnOrOffUtternace(feedbackIndex: Int): String {
        // Get the announce template.
        val resourceId = if (feedbackIndex == INDEX_SCREEN_ON)
            R.string.template_screen_on
        else
            R.string.template_screen_off
        val template = mContext.getString(resourceId)

        // Format the template with the ringer percentage.
        val currentRingerVolume = mAudioManager!!.getStreamVolume(AudioManager.STREAM_RING)
        val maxRingerVolume = mAudioManager!!.getStreamMaxVolume(AudioManager.STREAM_RING)
        var volumePercent = 100 / maxRingerVolume * currentRingerVolume

        // Let us round to five so it sounds better.
        val adjustment = volumePercent % 10
        if (adjustment < 5) {
            volumePercent -= adjustment
        } else if (adjustment > 5) {
            volumePercent += 10 - adjustment
        }

        return String.format(template, volumePercent)
    }

    private fun configureForRingerMode(ringerMode: Int) {
        when (ringerMode) {
            AudioManager.RINGER_MODE_SILENT -> {
                // When the ringer is silent we want to provide only haptic feedback.
                mProvidedFeedbackType = AccessibilityServiceInfo.FEEDBACK_HAPTIC

                // Take over the spoken and sound feedback so no such feedback is provided.
                setServiceInfo(AccessibilityServiceInfo.FEEDBACK_HAPTIC
                        or AccessibilityServiceInfo.FEEDBACK_SPOKEN
                        or AccessibilityServiceInfo.FEEDBACK_AUDIBLE)

                // Use only an earcon to announce ringer state change.
                mHandler.obtainMessage(MESSAGE_PLAY_EARCON, INDEX_RINGER_SILENT, 0).sendToTarget()
            }
            AudioManager.RINGER_MODE_VIBRATE -> {
                // When the ringer is vibrating we want to provide only audible feedback.
                mProvidedFeedbackType = AccessibilityServiceInfo.FEEDBACK_AUDIBLE

                // Take over the spoken feedback so no spoken feedback is provided.
                setServiceInfo(AccessibilityServiceInfo.FEEDBACK_AUDIBLE or AccessibilityServiceInfo.FEEDBACK_SPOKEN)

                // Use only an earcon to announce ringer state change.
                mHandler.obtainMessage(MESSAGE_PLAY_EARCON, INDEX_RINGER_VIBRATE, 0).sendToTarget()
            }
            AudioManager.RINGER_MODE_NORMAL -> {
                // When the ringer is ringing we want to provide spoken feedback
                // overriding the default spoken feedback.
                mProvidedFeedbackType = AccessibilityServiceInfo.FEEDBACK_SPOKEN
                setServiceInfo(AccessibilityServiceInfo.FEEDBACK_SPOKEN)

                // Use only an earcon to announce ringer state change.
                mHandler.obtainMessage(MESSAGE_PLAY_EARCON, INDEX_RINGER_NORMAL, 0).sendToTarget()
            }
        }
    }

    private fun setServiceInfo(feedbackType: Int) {
        val info = AccessibilityServiceInfo()
        // We are interested in all types of accessibility events.
        info.eventTypes = AccessibilityEvent.TYPES_ALL_MASK
        // We want to provide specific type of feedback.
        info.feedbackType = feedbackType
        // We want to receive events in a certain interval.
        info.notificationTimeout = EVENT_NOTIFICATION_TIMEOUT_MILLIS.toLong()
        // We want to receive accessibility events only from certain packages.
        info.packageNames = PACKAGE_NAMES
        serviceInfo = info
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        Log.i(LOG_TAG, "$mProvidedFeedbackType $event")

        // Here we act according to the feedback type we are currently providing.
        when (mProvidedFeedbackType) {
            AccessibilityServiceInfo.FEEDBACK_SPOKEN ->
                mHandler.obtainMessage(MESSAGE_SPEAK, formatUtterance(event)).sendToTarget()
            AccessibilityServiceInfo.FEEDBACK_AUDIBLE ->
                mHandler.obtainMessage(MESSAGE_PLAY_EARCON, event.eventType, 0).sendToTarget()
            AccessibilityServiceInfo.FEEDBACK_HAPTIC ->
                mHandler.obtainMessage(MESSAGE_VIBRATE, event.eventType, 0).sendToTarget()
            else -> throw IllegalStateException("Unexpected feedback type $mProvidedFeedbackType")
        }
    }

    override fun onInterrupt() {
        // Here we act according to the feedback type we are currently providing.
        when (mProvidedFeedbackType) {
            AccessibilityServiceInfo.FEEDBACK_SPOKEN ->
                mHandler.obtainMessage(MESSAGE_STOP_SPEAK).sendToTarget()
            AccessibilityServiceInfo.FEEDBACK_AUDIBLE ->
                mHandler.obtainMessage(MESSAGE_STOP_PLAY_EARCON).sendToTarget()
            AccessibilityServiceInfo.FEEDBACK_HAPTIC ->
                mHandler.obtainMessage(MESSAGE_STOP_VIBRATE).sendToTarget()
            else -> throw IllegalStateException("Unexpected feedback type $mProvidedFeedbackType")
        }
    }

    private fun formatUtterance(event: AccessibilityEvent): String {
        val utterance = mUtterance

        // Clear the utterance before appending the formatted text.
        utterance.setLength(0)

        val eventText = event.text

        // We try to get the event text if such.
        if (eventText.isNotEmpty()) {
            for (subText in eventText) {
                var subTextVar = subText
                // Make 01 pronounced as 1
                if (subTextVar[0] == '0') {
                    subTextVar = subTextVar.subSequence(1, subText.length)
                }
                utterance.append(subTextVar)
                utterance.append(SPACE)
            }

            return utterance.toString()
        }

        // There is no event text but we try to get the content description which is
        // an optional attribute for describing a view (typically used with ImageView).
        val contentDescription = event.contentDescription
        if (contentDescription != null) {
            utterance.append(contentDescription)
            return utterance.toString()
        }

        return utterance.toString()
    }

    private fun playEarcon(earconId: Int) {
        var earconName: String? = mEarconNames.get(earconId)
        if (earconName == null) {
            // We do not know the sound id, hence we need to load the sound.
            val resourceId = sSoundsResourceIds.get(earconId)
            if (resourceId != null) {
                earconName = "[$earconId]"
                mTts!!.addEarcon(earconName, packageName, resourceId)
                mEarconNames.put(earconId, earconName)
            }
        }

        @Suppress("DEPRECATION")
        mTts!!.playEarcon(earconName, QUEUING_MODE_INTERRUPT, null)
    }

    companion object {
        /**
         * Tag for logging from this service.
         */
        private const val LOG_TAG = "ClockBackService"

        // Fields for configuring how the system handles this accessibility service.

        /**
         * Minimal timeout between accessibility events we want to receive.
         */
        private const val EVENT_NOTIFICATION_TIMEOUT_MILLIS = 80

        /**
         * Packages we are interested in.
         *
         *
         * **
         * Note: This code sample will work only on devices shipped with the
         * default Clock application.
         ** *
         *
         * This works with AlarmClock and Clock whose package name changes in different releases
         */
        private val PACKAGE_NAMES = arrayOf(
                "com.android.alarmclock",
                "com.google.android.deskclock",
                "com.android.deskclock"
        )

        // Message types we are passing around.

        /**
         * Speak.
         */
        private const val MESSAGE_SPEAK = 1

        /**
         * Stop speaking.
         */
        private const val MESSAGE_STOP_SPEAK = 2

        /**
         * Start the TTS service.
         */
        private const val MESSAGE_START_TTS = 3

        /**
         * Stop the TTS service.
         */
        private const val MESSAGE_SHUTDOWN_TTS = 4

        /**
         * Play an earcon.
         */
        private const val MESSAGE_PLAY_EARCON = 5

        /**
         * Stop playing an earcon.
         */
        private const val MESSAGE_STOP_PLAY_EARCON = 6

        /**
         * Vibrate a pattern.
         */
        private const val MESSAGE_VIBRATE = 7

        /**
         * Stop vibrating.
         */
        private const val MESSAGE_STOP_VIBRATE = 8

        // Screen state broadcast related constants.

        /**
         * Feedback mapping index used as a key for the screen-on broadcast.
         */
        private const val INDEX_SCREEN_ON = 0x00000100

        /**
         * Feedback mapping index used as a key for the screen-off broadcast.
         */
        private const val INDEX_SCREEN_OFF = 0x00000200

        // Ringer mode change related constants.

        /**
         * Feedback mapping index used as a key for normal ringer mode.
         */
        private const val INDEX_RINGER_NORMAL = 0x00000400

        /**
         * Feedback mapping index used as a key for vibration ringer mode.
         */
        private const val INDEX_RINGER_VIBRATE = 0x00000800

        /**
         * Feedback mapping index used as a key for silent ringer mode.
         */
        private const val INDEX_RINGER_SILENT = 0x00001000

        // Speech related constants.

        /**
         * The queuing mode we are using - interrupt a spoken utterance before
         * speaking another one.
         */
        private const val QUEUING_MODE_INTERRUPT = 2

        /**
         * The space string constant.
         */
        private const val SPACE = " "

        /**
         * Mapping from integers to vibration patterns for haptic feedback.
         */
        private val sVibrationPatterns = SparseArray<LongArray>()

        /**
         * Initializes our `sVibrationPatterns` `SparseArray`.
         */
        init {
            sVibrationPatterns.put(AccessibilityEvent.TYPE_VIEW_CLICKED, longArrayOf(0L, 100L))
            sVibrationPatterns.put(AccessibilityEvent.TYPE_VIEW_LONG_CLICKED, longArrayOf(0L, 100L))
            sVibrationPatterns.put(AccessibilityEvent.TYPE_VIEW_SELECTED, longArrayOf(0L, 15L, 10L, 15L))
            sVibrationPatterns.put(AccessibilityEvent.TYPE_VIEW_FOCUSED, longArrayOf(0L, 15L, 10L, 15L))
            sVibrationPatterns.put(AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED, longArrayOf(0L, 25L, 50L, 25L, 50L, 25L))
            sVibrationPatterns.put(AccessibilityEvent.TYPE_VIEW_HOVER_ENTER, longArrayOf(0L, 15L, 10L, 15L, 15L, 10L))
            sVibrationPatterns.put(INDEX_SCREEN_ON, longArrayOf(0L, 10L, 10L, 20L, 20L, 30L))
            sVibrationPatterns.put(INDEX_SCREEN_OFF, longArrayOf(0L, 30L, 20L, 20L, 10L, 10L))
        }

        /**
         * Mapping from integers to raw sound resource ids.
         */
        @SuppressLint("UseSparseArrays")
        private val sSoundsResourceIds = SparseArray<Int>()

        /**
         * Initializes our `sSoundsResourceIds` `SparseArray`.
         */
        init {
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_VIEW_CLICKED, R.raw.sound_view_clicked)
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_VIEW_LONG_CLICKED, R.raw.sound_view_clicked)
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_VIEW_SELECTED, R.raw.sound_view_focused_or_selected)
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_VIEW_FOCUSED, R.raw.sound_view_focused_or_selected)
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED, R.raw.sound_window_state_changed)
            sSoundsResourceIds.put(AccessibilityEvent.TYPE_VIEW_HOVER_ENTER, R.raw.sound_view_hover_enter)
            sSoundsResourceIds.put(INDEX_SCREEN_ON, R.raw.sound_screen_on)
            sSoundsResourceIds.put(INDEX_SCREEN_OFF, R.raw.sound_screen_off)
            sSoundsResourceIds.put(INDEX_RINGER_SILENT, R.raw.sound_ringer_silent)
            sSoundsResourceIds.put(INDEX_RINGER_VIBRATE, R.raw.sound_ringer_vibrate)
            sSoundsResourceIds.put(INDEX_RINGER_NORMAL, R.raw.sound_ringer_normal)
        }
    }
}
```

### Step 4: Create the Activity

This is the activity that demonstrates how to implement our `AccessibilityService`, namely the ClockBackService.

Start by adding imports:

```kotlin
import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R
```

Extend the `AppCompatActivity`:

```kotlin
class ClockBackActivity : AppCompatActivity() {
```

Called when the activity is starting. First we call through to our super's implementation of `onCreate`, then we set our content view to our layout file R.layout.accessibility_service.

We initialize our variable `ImageButton button` by finding the view with the id R.id.button and set its `OnClickListener` to lambda which starts the system settings activity.

- `@param savedInstanceState` - we do not override `onSaveInstanceState` so do not use.

```kotlin
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.accessibility_service)

        // Add a shortcut to the accessibility settings.
        val button = findViewById<ImageButton>(R.id.button)

        /*
         * Called when the button with id R.id.button is clicked, we just launch the settings
         * activity.
         *
         * v View that was clicked
         */
        button.setOnClickListener {
            startActivity(sSettingsIntent)
        }
    }

    companion object {

        /**
         * An intent for launching the system settings.
         */
        private val sSettingsIntent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
    }
}
```

### Run

1. Copy the code above into your android studio project
2. Build and run


## Kotlin Android Accessibility - How to Query Window Content

This tutorial will teach you how to query window content to improve the feedback given to the user from an accessibility service.

### Step 1: Dependencies

No special dependencies are needed.

### Step 2: Layouts

This is a simple class and includes no layouts.

### Step 3: Write Code

Start by adding imports:

```kotlin
import android.accessibilityservice.AccessibilityService
import android.speech.tts.TextToSpeech
import android.speech.tts.TextToSpeech.OnInitListener
import android.text.TextUtils
import android.util.Log
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import com.example.android.apis.R
import java.util.Locale
```

Create a `TaskBackService` class. Extend the `AccessibilityService` class and implement the `OnInitListener` interface:

```kotlin
class TaskBackService : AccessibilityService(), OnInitListener {
```

Create two instance fields:

```kotlin
    /** Flag whether Text-To-Speech is initialized.  */
    private var mTextToSpeechInitialized: Boolean = false

    /** Handle to the Text-To-Speech engine.  */
    private var mTts: TextToSpeech? = null
```

Override the `onServiceConnected()` function:

```kotlin
    public override fun onServiceConnected() {
```

Inside the above callback, initialize the Text-To-Speech engine as soon as the service is connected:

```kotlin
        mTts = TextToSpeech(applicationContext, this)
    }
```

Processes an AccessibilityEvent, by traversing the View's tree and putting together a message to speak to the user.

```kotlin
    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        if (!mTextToSpeechInitialized) {
            Log.e(LOG_TAG, "Text-To-Speech engine not ready.  Bailing out.")
            return
        }
```

This `AccessibilityNodeInfo` represents the view that fired the AccessibilityEvent. The following code will use it to traverse the view hierarchy, using this node as a starting point.

> NOTE: Every method that returns an AccessibilityNodeInfo may return null, because the explored window is in another process and the corresponding View might be gone by the time your request reaches the view hierarchy.

```kotlin
    val source = event.source ?: return
```

Grab the parent of the view that fired the event.

```kotlin
        val rowNode = getListItemNodeInfo(source) ?: return
```

Using this parent, get references to both child nodes, the label and the checkbox.

```kotlin
    val labelNode = rowNode.getChild(0)
    if (labelNode == null) {
          rowNode.recycle()
          return
      }

        val completeNode = rowNode.getChild(1)
        if (completeNode == null) {
            rowNode.recycle()
            return
        }
```

Here is the full code:

**TaskBackService.kt**

```kotlin
import android.accessibilityservice.AccessibilityService
import android.speech.tts.TextToSpeech
import android.speech.tts.TextToSpeech.OnInitListener
import android.text.TextUtils
import android.util.Log
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import com.example.android.apis.R
import java.util.Locale

class TaskBackService : AccessibilityService(), OnInitListener {

    /** Flag whether Text-To-Speech is initialized.  */
    private var mTextToSpeechInitialized: Boolean = false

    /** Handle to the Text-To-Speech engine.  */
    private var mTts: TextToSpeech? = null

    public override fun onServiceConnected() {
        // Initializes the Text-To-Speech engine as soon as the service is connected.
        mTts = TextToSpeech(applicationContext, this)
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        if (!mTextToSpeechInitialized) {
            Log.e(LOG_TAG, "Text-To-Speech engine not ready.  Bailing out.")
            return
        }

        val source = event.source ?: return

        // Grab the parent of the view that fired the event.
        val rowNode = getListItemNodeInfo(source) ?: return

        // Using this parent, get references to both child nodes, the label and the checkbox.
        val labelNode = rowNode.getChild(0)
        if (labelNode == null) {
            rowNode.recycle()
            return
        }

        val completeNode = rowNode.getChild(1)
        if (completeNode == null) {
            rowNode.recycle()
            return
        }

        // Determine what the task is and whether or not it's complete, based on
        // the text inside the label, and the state of the check-box.
        if (rowNode.childCount < 2 || !rowNode.getChild(1).isCheckable) {
            rowNode.recycle()
            return
        }

        val taskLabel = labelNode.text
        val isComplete = completeNode.isChecked

        val completeStr: String
        completeStr = if (isComplete) {
            getString(R.string.task_complete)
        } else {
            getString(R.string.task_not_complete)
        }

        val taskStr = getString(R.string.task_complete_template, taskLabel, completeStr)
        val utterance = StringBuilder(taskStr)

        // The custom ListView added extra context to the event by adding an
        // AccessibilityRecord to it. Extract that from the event and read it.
        val records = event.recordCount
        for (i in 0 until records) {
            val record = event.getRecord(i)
            val contentDescription = record.contentDescription
            if (!TextUtils.isEmpty(contentDescription)) {
                utterance.append(SEPARATOR)
                utterance.append(contentDescription)
            }
        }

        // Announce the utterance.
        @Suppress("DEPRECATION")
        mTts!!.speak(utterance.toString(), TextToSpeech.QUEUE_FLUSH, null)
        Log.d(LOG_TAG, utterance.toString())
    }

    private fun getListItemNodeInfo(source: AccessibilityNodeInfo): AccessibilityNodeInfo? {
        var current = source
        while (true) {
            val parent = current.parent ?: return null
            if (TASK_LIST_VIEW_CLASS_NAME.contentEquals(parent.className)) {
                return current
            }
            // NOTE: Recycle the infos.
            val oldCurrent = current
            current = parent
            oldCurrent.recycle()
        }
    }

    /**
     * {@inheritDoc}
     */
    override fun onInterrupt() {
        /* do nothing */
    }

    /**
     * {@inheritDoc}
     */
    override fun onInit(status: Int) {
        // Set a flag so that the TaskBackService knows that the Text-To-Speech
        // engine has been initialized, and can now handle speaking requests.
        if (status == TextToSpeech.SUCCESS) {
            mTts!!.language = Locale.US
            mTextToSpeechInitialized = true
        }
    }

    /**
     * {@inheritDoc}
     */
    override fun onDestroy() {
        super.onDestroy()
        if (mTextToSpeechInitialized) {
            mTts!!.shutdown()
        }
    }

    companion object {

        /** Tag for logging.  */
        private const val LOG_TAG = "TaskBackService"

        /** Comma separator.  */
        private const val SEPARATOR = ", "

        /** The class name of TaskListView - for simplicity we speak only its items.  */
        private const val TASK_LIST_VIEW_CLASS_NAME = "com.example.android.apis.accessibility.TaskListView"
    }
}
```

### Step 4: Run

1. Copy the above class into your project.
2. Run.


# AndroidX Media3 migration guide

Overview
--------

This guide gives an overview of how to migrate from `com.google.android.exoplayer2` and `androidx.media` to `androidx.media3`. It's aimed to help you migrate your project. A script is provided that migrates gradle build files, Java/Kotlin source files and XML layout files from ExoPlayer `2.18.1` to AndroidX Media3 `1.0.0-beta02`. This guide explains how it can be safely used to speed up the migration of your app.

### Why migrate to Jetpack Media3

*   It's the **new home of ExoPlayer** while `com.google.android.exoplayer2` is discontinued.
*   Access the **Player API across components/processes** with `MediaBrowser`/`MediaController`.
*   Use the **extended capabilities of the `MediaSession` and `MediaController`** API.
*   Advertise playback capabilities with **fine-grained access control**.
*   **Simplify your app** by removing `MediaSessionConnector` and `PlayerNotificationManager`.
*   **Backwards compatible** with media-compat client APIs (`MediaBrowserCompat`/`MediaControllerCompat`/`MediaMetadataCompat`)

### Media APIs to migrate to AndroidX Media3

*   **ExoPlayer and its extensions**  
    This includes all modules of the legacy ExoPlayer project except the mediasession module that is discontinued. Apps or modules depending on packages in `com.google.android.exoplayer2` can be migrated with the migration script.
*   **MediaSessionConnector** (depending on the `androidx.media.*` packages of `androidx.media:media:1.4.3+`)  
    Remove the `MediaSessionConnector` and use the `androidx.media3.session.MediaSession` instead.
*   **MediaBrowserServiceCompat** (depending on the `androidx.media.*` packages of `androidx.media:media:1.4.3+`)  
    Migrate subclasses of `androidx.media.MediaBrowserServiceCompat` to `androidx.media3.session.MediaLibraryService` and code using `MediaBrowserCompat.MediaItem` to `androidx.media3.common.MediaItem`.
*   **MediaBrowserCompat** (depending on the `android.support.v4.media.*` packages of `androidx.media:media:1.4.3+`)  
    Migrate client code using the `MediaBrowserCompat` or `MediaControllerCompat` to use the `androidx.media3.session.MediaBrowser` with `androidx.media3.common.MediaItem`.

Prerequisites
-------------

1.  **Make sure your project is under source control**
    
    Make sure you can easily revert changes applied by scripted migration tools. If you don't have your project under source control yet, now is a good time to start with it. If for some reason you don't want to do that, make a backup copy of your project before starting the migration.
    
2.  **Update your app**
    
    *   We recommend updating your project to use the **most recent version of the ExoPlayer library** and remove any calls to deprecated methods. If you intend to use the script for the migration, you need to match the version you are updating to with the version handled by the script.
        
    *   Increase the **compileSdkVersion of your app to at least 32**.
        
    *   **Upgrade Gradle and the Android Studio Gradle plugin** to a recent version that works with the updated dependencies from above. For instance:
        
        *   Android Gradle Plugin version: 7.1.0
        *   Gradle version: 7.4
    *   **Replace all wildcard import statements** that are using an asterix (*) and use fully qualified import statements: Delete the wildcards import statements and use Android Studio to import the fully qualified statements (F2 - Alt/Enter, F2 - Alt/Enter, ...).
        
    *   **Migrate from `com.google.android.exoplayer2.PlayerView` to `com.google.android.exoplayer2.StyledPlayerView`**. This is necessary because there's no equivalent to `com.google.android.exoplayer2.PlayerView` in AndroidX Media3.
        

The script facilitates moving from `com.google.android.exoplayer2` to the new package and module structure under `androidx.media3`. The script applies some validation checks on your project and prints warnings if validation fails. Otherwise, it applies the mappings of renamed classes and packages in the resources of an Android gradle project written in Java or Kotlin.

```shell
    usage: ./media3-migration.sh [-p|-c|-d|-v]|[-m|-l [-x <path>] [-f] PROJECT_ROOT]
     PROJECT_ROOT: path to your project root (location of 'gradlew')
     -p: list package mappings and then exit
     -c: list class mappings (precedence over package mappings) and then exit
     -d: list dependency mappings and then exit
     -l: list files that will be considered for rewrite and then exit
     -x: exclude the path from the list of file to be changed: 'app/src/test'
     -m: migrate packages, classes and dependencies to AndroidX Media3
     -f: force the action even when validation fails
     -v: print the exoplayer2/media3 version strings of this script
     -h, --help: show this help text
```

### Using the migration script

1.  Download the migration script from the tag of the ExoPlayer project on GitHub corresponding to the version to which you have updated your app to:

```shell 
        curl -o media3-migration.sh 
          "https://raw.githubusercontent.com/google/ExoPlayer/r2.18.1/media3-migration.sh"
```
    
2.  Make the script executable:

```shell 
        chmod 744 media3-migration.sh
```
    
3.  Run the script with `--help` to learn about options.
    
4.  Run the script with `-l` to list the set of files that are selected for migration (use `-f` to force the listing without warnings):

```shell 
        ./media3-migration.sh -l -f /path/to/gradle/project/root
```
    
5.  Run the script with `-m` to map packages, classes, and modules to Media3. Running the script with the `-m` option will apply changes to the selected files.
    
    *   Stop at validation error without making changes

```shell 
        ./media3-migration.sh -m /path/to/gradle/project/root
```
    
    *   Forced execution
    
    If the script finds a violation of the prerequisites, the migration can be forced with the `-f` flag:

```shell 
        ./media3-migration.sh -m -f /path/to/gradle/project/root
    

     # list files selected for migration when excluding paths
     ./media3-migration.sh -l -x "app/src/test/" -x "service/" /path/to/project/root
     # migrate the selected files
     ./media3-migration.sh -m -x "app/src/test/" -x "service/" /path/to/project/root
```    

Manual steps after running the script with the `-m` option:

1.  Check how the script changed your code by using a diff tool and fix potential issues (consider filing a bug if you think the script has a general problem that was introduced without passing the `-f` option).
2.  **Build the project `./gradlew clean build`** or in Android Studio do a `File > Sync Project with Gradle Files`, then `Build > Clean project` and then `Build > Rebuild project` (monitor your build in the 'Build - Build Output' tab of Android Studio.

Recommended follow-up steps:

1.  Resolve **opt-in for warnings/errors regarding usage of unstable APIs**.
2.  Replace **deprecated API calls** by using the suggested replacement API. Hover the warning in Android Studio, consult the JavaDoc of the deprecated symbol to find out what to use instead of a given call.
3.  Open the project in Android Studio, right-click on a package folder node in the project viewer and choose `Optimize imports` on the packages that contain the changed source files to **sort the imports statements**.

In the legacy `MediaSessionCompat` world, the `MediaSessionConnector` was responsible for syncing the state of the player with the state of the session and receiving commands from controllers that needed delegation to appropriate player methods. With AndroidX Media3 this is done by the `MediaSession` directly without requiring a connector.

1.  **Remove all references and usage of MediaSessionConnector:** If you used the automated script to migrate ExoPlayer classes and packages, then the script likely has left your code in an uncompilable state regarding the`MediaSessionConnector` that can not be resolved. Android Studio will show you the broken code when you try to build or start the app.
    
2.  In the `build.gradle` file where you maintain your dependencies, add **an implementation dependency to the AndroidX Media3 session module** and remove the legacy dependency:

```groovy 
        implementation "androidx.media3:media3-session:1.0.0-beta02"
```
    
3.  Replace the `MediaSessionCompat` with **`androidx.media3.session.MediaSession`**.
    
4.  At the code site where you have created the legacy `MediaSessionCompat`, use `androidx.media3.session.MediaSession.Builder` to **build a `MediaSession`**. **Pass the player** to construct the session builder.

```kotlin 
        val player = ExoPlayer.Builder(context).build()
        mediaSession = MediaSession.Builder(context, player)
            .setSessionCallback(MySessionCallback())
            .build()
```
    
5.  Implement `MySessionCallback` as required by your app. This is optional. If you want to allow controllers to add media items to the player, implement MediaSession.Callback.onAddMediaItems(). It serves various current and legacy API methods that add media items to the player for playback in a backwards compatible way. This includes the `MediaController.set/addMediaItems()` methods of the Media3 controller, as well as the `TransportControls.prepareFrom*/playFrom*` methods of the legacy API. A sample implementation of `onAddMediaItems` can be found in the `PlaybackService` of the session demo app.
    
6.  Release the media session at the code site where you destroyed your session before the migration:

```kotlin 
        mediaSession?.run {
          player.release()
          release()
          mediaSession = null
        }
```
    

### `MediaSessionConnector` functionality in Media3

MediaSessionConnector

AndroidX Media3

`CustomActionProvider`

`MediaSession.Callback.onCustomCommand()/ MediaSession.setCustomLayout()`

`PlaybackPreparer`

`MediaSession.Callback.onAddMediaItems()` (`prepare()` is called internally)

`QueueNavigator`

`ForwardingPlayer`

`QueueEditor`

`MediaSession.Callback.onAddMediaItems()`

`RatingCallback`

`MediaSession.Callback.onSetRating()`

`PlayerNotificationManager`

`DefaultMediaNotificationProvider/ MediaNotification.Provider`

AndroidX Media3 introduces `MediaLibraryService` that replaces the `MediaBrowserServiceCompat`. The JavaDoc of `MediaLibraryService` and its super class `MediaSessionService` provide a good intro into the API and the asynchronous programming model of the service.

The `MediaLibraryService` is backwards compatible with the `MediaBrowserService`. A client app that is using `MediaBrowserCompat` or `MediaControllerCompat`, continues to work without code changes when connecting to a `MediaLibraryService`. For a client, it is transparent whether your app is using a `MediaLibraryService` or a legacy `MediaBrowserServiceCompat`.

![App component diagram with service, activity and external apps.](https://developer.android.com/guide/topics/media/media3/overview.png)

**Figure 1**: Media app component overview

1.  For backwards compatibility to work, you need to **register both service interfaces** with your service in the `AndroidManifest.xml`. This way a client finds your service by the required service interface:

```xml 
        <service android:name=".MusicService" android:exported="true">
            <intent-filter>
                <action android:name="androidx.media3.session.MediaLibraryService"/>
                <action android:name="android.media.browse.MediaBrowserService" />
            </intent-filter>
        </service>
```  
    
2.  In the `build.gradle` file where you maintain your dependencies, add **an implementation dependency to the AndroidX Media3 session module** and remove the legacy dependency:

```groovy 
        implementation "androidx.media3:media3-session:1.0.0-beta02"
```
    
3.  **Change your service to inherit from a `MediaLibraryService`** instead of `MediaBrowserService` As said earlier, the `MediaLibraryService` is compatible with the legacy `MediaBrowserService`. Accordingly, the broader API that the service is offering to clients is still the same. So it's likely that an app can keep most of the logic that is required to implement the `MediaBrowserService` and adapt it for the new `MediaLibraryService`.
    
    The main differences compared to the legacy `MediaBrowserServiceCompat` are as follows:
    
    *   **Implement the service life-cycle methods:** The methods that need to be overridden on the service itself are `onCreate/onDestroy`, where an app allocates/releases the library session, the player, and other resources. In addition to standard service life-cycle methods, an app needs to override `onGetSession(MediaSession.ControllerInfo)` to return the `MediaLibrarySession` that was built in `onCreate`.
        
    *   **Implement MediaLibraryService.MediaLibrarySessionCallback:** Building a session requires a `MediaLibraryService.MediaLibrarySessionCallback` that implements the actual domain API methods. So instead of overriding API methods of the legacy service, you will override the methods of the `MediaLibrarySession.Callback` instead.
        
        The callback is then used to build the `MediaLibrarySession`:

```kotlin    
            mediaLibrarySession =
                  MediaLibrarySession.Builder(this, player, MySessionCallback())
                     .build()
```   
        
        Find the full API of the MediaLibrarySessionCallback in the API documentation.
        
    *   **Implement MediaSession.Callback.onAddMediaItems()**: The callback `onAddMediaItems(MediaSession, ControllerInfo, List<MediaItem>)` serves various current and legacy API methods that add media items to the player for playback in a backwards compatible way. This includes the `MediaController.set/addMediaItems()` methods of the Media3 controller, as well as the `TransportControls.prepareFrom*/playFrom*` methods of the legacy API. A sample implementation of the callback can be found in the `PlaybackService` of the session demo app.
        
    *   AndroidX Media3 is using **`androidx.media3.common.MediaItem`** instead of MediaBrowserCompat.MediaItem and MediaMetadataCompat. Parts of your code tied to the legacy classes need to be changed accordingly or map to the Media3 `MediaItem` instead.
        
    *   The general **asynchronous programming model changed to `Futures`** in contrast to the detachable `Result` approach of the `MediaBrowserServiceCompat`. Your service implementation can return an asynchronous `ListenableFuture` instead of detaching a result or return an immediate Future to directly return a value.
        

### Remove PlayerNotificationManager

The **`MediaLibraryService` supports media notifications automatically** and the `PlayerNotificationManager` can be removed when using a `MediaLibraryService` or `MediaSessionService`.

An app can **customize the notification** by setting a custom `MediaNotification.Provider` in `onCreate()` that replaces the `DefaultMediaNotificationProvider`. The `MediaLibraryService` then takes care of starting the service in the foreground as required.

By overriding `MediaLibraryService.updateNotification()` an app can further take full ownership of posting a notification and starting/stopping the service in the foreground as required.

With AndroidX Media3, a `MediaBrowser` implements the `MediaController/Player` interfaces and can be used to control media playback besides browsing the media library. If you had to create a `MediaBrowserCompat` and a `MediaControllerCompat` in the legacy world, you can do the same by only using the `MediaBrowser` in Media3.

A `MediaBrowser` can be built and await for the connection to the service being established:

```kotlin
    scope.launch {
        val sessionToken =
            SessionToken(context, ComponentName(context, MusicService::class.java)
        browser =
            MediaBrowser.Builder(context, sessionToken))
                .setListener(BrowserListener())
                .buildAsync()
                .await()
        // Get the library root to start browsing the library.
        root = browser.getLibraryRoot(/* params= */ null).await();
        // Add a MediaController.Listener to listen to player state events.
        browser.addListener(playerListener)
        playerView.setPlayer(browser)
    }
```

Take a look into _Control playback in the media session_ to learn how to create a `MediaController` for controlling playback in the background.

Further steps and clean up
--------------------------

**Handling calls to unstable API and deprecations**

Android Studio marks unstable API calls with a red underline. You may want to move to a stable API instead. Alternatively, the warning can be suppressed with

```kotlin
    @androidx.annotation.OptIn(androidx.media3.common.util.UnstableApi::class)
    fun functionUsingUnstableApi() {
      // Do something useful.
    }
```

Please note there is a `kotlin.OptIn` annotation as well that shouldn't be used. It's important to stick with the `androidx.annotation.OptIn` annotation for this purpose.

![Screenshot: How to add the Optin annotation](https://developer.android.com/static/guide/topics/media/media3/getting-started/unstable-api.png)

**Figure 1**: Adding an @androidx.annotations.OptIn annotation with Android Studio.

Whole projects can be opted-in by suppressing the specific lint error in their lint.xml. See the JavaDoc of the UnstableApi annotation for more details.

**Calls to deprecated APIs are struck through**

We recommend removing such calls with the appropriate alternative. Hover over the symbol to see the JavaDoc that tells which API to use instead.

![Screenshot: How to display JavaDoc with alternative of deprecated method](https://developer.android.com/static/guide/topics/media/media3/getting-started/deprecation.png)

**Figure 2**: JavaDoc tooltip in Android Studio suggests an alternative for any deprecated symbol.

Code samples and demo apps
--------------------------

*   AndroidX Media3 session demo app (mobile and WearOS)
    *   Custom actions
    *   System UI notification, MediaButton/BT
    *   Google Assistant playback control
*   UAMP: Android Media Player (branch media3) (mobile, AutomotiveOS)
    *   System UI notification, MediaButton/BT, Playback resumption
    *   Google Assistant/WearOS playback control
    *   AutomotiveOS: custom command and sign-in
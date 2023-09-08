# ExoPlayer introduction


A media player is an app-level component that allows playback of video and audio files. Such files can be stored locally or streamed over the Internet. Jetpack Media3 provides a `Player` interface which defines basic functionality such as the ability to play, pause, seek, and display track information.

`ExoPlayer` is the default implementation of this interface in Media3. It adds additional conveniences such as support for multiple streaming protocols, default audio and video renderers, and components that handle media buffering.

While there are several third-party players to choose from, ExoPlayer has been brought into Media3 as the recommended player because its implementations provide a comprehensive set of features that cover most playback use cases, and avoids the need to implement low-level playback controls.

Create an instance of ExoPlayer
-------------------------------

With a single line of code, you can create an instance of the `ExoPlayer` class.

```kotlin
    val exoPlayer = ExoPlayer.Builder(this).build()
```

To learn more about ExoPlayer, see the full documentation. This material includes topics such as how to connect your player to your app’s UI and how to handle complex use cases.

For the time being, ExoPlayer currently exists simultaneously as a standalone library and a module within Media3. Over time, the standalone library will be deprecated in favour of the Media3 implementation.

It is important to note that the Media3 implementation of ExoPlayer is identical to the existing independent ExoPlayer, aside from the new package name. See the table below for some examples:

Media3 (`androidx.media3`)

ExoPlayer (`com.google.android.exoplayer2`)

`:media3-exoplayer`

`:exoplayer-core`

`:media3-ui`

`:exoplayer-ui`

`:media3-cast`

`:extension-cast`
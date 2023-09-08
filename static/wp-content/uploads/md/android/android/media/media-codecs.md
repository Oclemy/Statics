# Media codecs

Beginning with Android 10 (API level 29) and higher, there are methods in `MediaCodecInfo` that reveal more information about a codec:

`isSoftwareOnly()`

Returns true if the codec runs in software only. Software codecs make no guarantees about rendering performance.

`isHardwareAccelerated()`

Returns true if a codec is accelerated by hardware.

`isVendor()`

Returns true if the codec is provided by the device vendor or false if provided by the Android platform.

`isAlias()`

`MediaCodecList` may contain additional entries for the same underlying codec using an alternate codec name/s (alias/es). This method returns true if the codec in this entry is an alias for another codec.

In addition, `MediaCodec.getCanonicalName()` returns the underlying codec name for codecs created via an alias.

#### Performance Points

A _performance point_ represents a codec's ability to render video at a specific height, width and frame rate. For example, the `UHD_60` performance point represents Ultra High Definition video (3840x2160 pixels) rendered at 60 frames per second.

The method `MediaCodecInfo.VideoCapabilities.getSupportedPerformancePoints()`) returns a list of `PerformancePoint` entries that the codec can render or capture.

You can check whether a given `PerformancePoint` covers another by calling `PerformancePoint.covers(PerformancePoint)`). For example, `UHD_60.covers(UHD_50)` returns true.

A list of performance points is provided for all hardware-accelerated codecs. This could be an empty list if the codec does not meet even the lowest standard performance point.

Note that devices which have been upgraded to Android 10 (API level 29) and higher without updating the vendor image will not have performance point data, because this data comes from the vendor HAL. In this case, `getSupportedPerformancePoints()` returns null.
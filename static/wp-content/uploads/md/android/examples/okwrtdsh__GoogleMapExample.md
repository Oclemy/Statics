# GoogleMap Example

>  Kotlin Android Example Using GoogleMap, FusedLocationProviderClient and ClusterManager.

Below is a full android sample to demonstrate Google Maps concept.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure. We will need the following 6 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. Our `Appcompat` library.
3. Our `Core-ktx` library.
4. Our `Play-services-maps` library.
5. Our `Play-services-location` library.
6. Our `Android-maps-utils` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "com.github.okwrtdsh.googlemapexample"
        minSdkVersion 28
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.1.0'
    implementation 'com.google.android.gms:play-services-maps:17.0.0'
    implementation 'com.google.android.gms:play-services-location:17.0.0'
    implementation 'com.google.maps.android:android-maps-utils:0.5'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test:runner:1.2.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
}

```
#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our `ACCESS_FINE_LOCATION` permission.
2. Our `ACCESS_COARSE_LOCATION` permission.
3. Our `ACCESS_BACKGROUND_LOCATION` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.github.okwrtdsh.googlemapexample">

    <!--
         The ACCESS_COARSE/FINE_LOCATION permissions are not required to use
         Google Maps Android API v2, but you must specify either coarse or fine
         location permissions for the 'MyLocation' functionality.
    -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />


    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <!--
             The API key for Google Maps-based APIs is defined as a string resource.
             (See the file "res/values/google_maps_api.xml").
             Note that the API key is linked to the encryption key used to sign the APK.
             You need a different API key for each encryption key, including the release key that is used to
             sign the APK for publishing.
             You can define the keys for the debug and release targets in src/debug/ and src/release/.
        -->
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="@string/google_maps_key" />

        <activity
            android:name=".MapsActivity"
            android:label="@string/title_activity_maps">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 3. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:

**(a). `activity_maps.xml`**

> Our `activity_maps` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_maps.xml` and add a `Fragment` as shown below:

1. `fragment`

```xml
<?xml version="1.0" encoding="utf-8"?>
<fragment xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:map="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/map"
    android:name="com.google.android.gms.maps.SupportMapFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MapsActivity" />
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `MapsActivity.kt`**

> Our `MapsActivity` class.

Create a Kotlin file named `MapsActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `Location` from the `android.location` package.
3. `Bundle` from the `android.os` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.

Next create a class that derives from `ClusterItem` and add its contents as follows:

We will be overriding the following functions: 

1. `shouldRenderAsCluster(cluster: Cluster<MyItem>?): Boolean `.
2. `onCreate(savedInstanceState: Bundle?) `.
3. `onMapReady(googleMap: GoogleMap) `.

We will be creating the following methods:

1. `setCurrentMarker(parameter)` - Our function will take a `LatLng` object as a parameter.
2. `LatLng.toStr(): String `.

**(a). Our `LatLng.toStr()` function**

Write the `LatLng.toStr()` function as follows:

```kotlin
fun LatLng.toStr(): String {
    val latDeg: Int = latitude.toInt()
    val latMin: Int = ((latitude - latDeg.toDouble()) * 60.0).toInt()
    val latSec: Int = ((latitude - latDeg.toDouble() - latMin.toDouble() / 60.0) * 3600.0).toInt()
    val lngDeg: Int = longitude.toInt()
    val lngMin: Int = ((longitude - lngDeg.toDouble()) * 60.0).toInt()
    val lngSec: Int = ((longitude - lngDeg.toDouble() - lngMin.toDouble() / 60.0) * 3600.0).toInt()
    return "lat: %02d°%02d′%02d″, lng: %03d°%02d′%02d″".format(
        latDeg, latMin, latSec,
        lngDeg, lngMin, lngSec
    )
}
```

**(b). Our `setCurrentMarker()` function**

Write the `setCurrentMarker()` function as follows:

```kotlin
    private fun setCurrentMarker(latlon: LatLng) {
        currentMarker?.remove()
        currentMarker = mMap.addMarker(
            MarkerOptions()
                .position(latlon)
                .title("Your Location")
                .snippet(latlon.toStr())
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_GREEN))
        )
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latlon, 14f))
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.location.Location
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.google.maps.android.clustering.Cluster
import com.google.maps.android.clustering.ClusterItem
import com.google.maps.android.clustering.ClusterManager
import com.google.maps.android.clustering.view.DefaultClusterRenderer
import kotlin.random.Random


class MyItem(position: LatLng, title: String, snippet: String) : ClusterItem {
    private val mPosition = position
    private val mTitle = title
    private val mSnippet = snippet

    override fun getSnippet() = mSnippet
    override fun getPosition() = mPosition
    override fun getTitle() = mTitle
}

class MyItemClusterRenderer(context: Context, map: GoogleMap, manager: ClusterManager<MyItem>) :
    DefaultClusterRenderer<MyItem>(context, map, manager) {
    override fun shouldRenderAsCluster(cluster: Cluster<MyItem>?): Boolean {
        return cluster?.size ?: 0 >= 5
    }
}

class MapsActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private var currentMarker: Marker? = null
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var mClusterManager: ClusterManager<MyItem>


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_maps)
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        mClusterManager = ClusterManager<MyItem>(this, mMap).apply {
            renderer = MyItemClusterRenderer(this@MapsActivity, mMap, this)
        }
        mMap.apply {
            setOnCameraIdleListener(mClusterManager)
            setOnMarkerClickListener(mClusterManager)
            isMyLocationEnabled = true
            uiSettings.apply {
                isScrollGesturesEnabled = true
                isZoomControlsEnabled = true
                isZoomGesturesEnabled = true
                isRotateGesturesEnabled = true
                isZoomGesturesEnabled = true
                isMapToolbarEnabled = true
                isTiltGesturesEnabled = true
                isCompassEnabled = true
                isMyLocationButtonEnabled = true
            }
        }

        // Add a marker in OsakaUniv and move the camera
        var latlng = LatLng(34.822014, 135.524468)

        fusedLocationClient.lastLocation
            .addOnSuccessListener { location: Location? ->
                if (location != null) {
                    latlng = LatLng(location.latitude, location.longitude)
                    setCurrentMarker(latlng)
                }
            }
        setCurrentMarker(latlng)

        val rnd = Random
        (1..100).map {
            val ll = LatLng(
                rnd.nextDoubleNorm(latlng.latitude, 0.5),
                rnd.nextDoubleNorm(latlng.longitude)
            )
            mClusterManager.addItem(
                MyItem(
                    ll,
                    "point",
                    ll.toStr()
                )
            )
        }
    }

    private fun setCurrentMarker(latlon: LatLng) {
        currentMarker?.remove()
        currentMarker = mMap.addMarker(
            MarkerOptions()
                .position(latlon)
                .title("Your Location")
                .snippet(latlon.toStr())
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_GREEN))
        )
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latlon, 14f))
    }
}

fun LatLng.toStr(): String {
    val latDeg: Int = latitude.toInt()
    val latMin: Int = ((latitude - latDeg.toDouble()) * 60.0).toInt()
    val latSec: Int = ((latitude - latDeg.toDouble() - latMin.toDouble() / 60.0) * 3600.0).toInt()
    val lngDeg: Int = longitude.toInt()
    val lngMin: Int = ((longitude - lngDeg.toDouble()) * 60.0).toInt()
    val lngSec: Int = ((longitude - lngDeg.toDouble() - lngMin.toDouble() / 60.0) * 3600.0).toInt()
    return "lat: %02d°%02d′%02d″, lng: %03d°%02d′%02d″".format(
        latDeg, latMin, latSec,
        lngDeg, lngMin, lngSec
    )
}

fun Random.nextDoubleNorm(mu: Double = 0.0, sigma: Double = 1.0): Double =
    ((1..12).map { nextDouble() }.sum() - 6.0) * sigma + mu



```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/okwrtdsh/GoogleMapExample/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/okwrtdsh/GoogleMapExample).|
|3.|Follow code author [here](https://github.com/okwrtdsh).|

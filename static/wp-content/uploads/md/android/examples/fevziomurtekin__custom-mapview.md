# Custom Mapview


>  This is a customized Android library made using Google map.

A customized Android library made using Google map.

Here is the version code:

![MapView Libraries Tutorial](https://camo.githubusercontent.com/a39555162589dd141e779f7deaf0364a72dc46dfd828315d276490a66e8ab0ef/68747470733a2f2f6a69747061636b2e696f2f762f6665767a696f6d757274656b696e2f637573746f6d2d6d6170766965772e737667)


Here is the demoGIF:

![MapView Libraries Tutorial](https://github.com/fevziomurtekin/custom-mapview/raw/master/art/map.gif)


To use it follow these steps:

### Step 1: Install it

Install the project via gradle:

```groovy
allprojects {
	repositories {
		...
		maven { url 'https://jitpack.io' }
	}
    }
  .....
    dependencies {
	    implementation 'com.github.fevziomurtekin:custom-mapview:0.1.2'
	    implementation 'com.google.android.gms:play-services-maps:16.1.0'
	  }
	}
```

### Step 2: Enter your Google MapsKey

You must enter your Google Map key in `Android Manifest.xml`:

```xml
<meta-data
	android:name="com.google.android.maps.v2.API_KEY"
	android:value="YOUR-GOOGLEMAP-API" />
```

### Step 3: Write Code

Include it in the activity

```kotlin
class MainActivity : View() {

   private var lists:MutableList<Place> = mutableListOf()

   override fun onCreate(savedInstanceState: Bundle?) {
       super.onCreate(savedInstanceState)

       /*Default place list adding*/
       val anitkabir:Place = Place()
       anitkabir.name="Anıtkabir"
       anitkabir.placeType=PlaceType.HEART
       anitkabir.content="Atatürk bir devri ..."
       /*39.925276, 32.836955*/
       anitkabir.latitude=39.925276
       anitkabir.longitude=32.836955

       lists.add(anitkabir)
       this.addPlacesList(lists)
       this.setMenuAnimation_time(350)  
       this.setSearchAnimation_time(350)
       this.setFocus(LatLng(40.1122,29.061927))
       this.setDefaultSearchError("error.")

   }
}
```


### Attributes

Here are the attributes:

- `PlaceList`
- `menuAnimation_time`
- `searchAnimation_time`
- `defaultSearchError`
- `focus`

To add new places to the map, a list derived from the Place class must be submitted.

### PlaceList

- `name`
- `content`
- `latitude`
- `longitude`
- `placeType`
- `url`
- `resource`
- `phone`
- 
If you leave the url and resource sections blank, we will use the icons given automatically.

Let us look at a full Example below:

#### Step 1. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

We will be defining a `meta-data` tag where we will specify the Google Maps key, which you must provide. Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools" package="com.fevziomurtekin.sample" >


    <application
            android:allowBackup="true"
            android:icon="@mipmap/ic_launcher"
            android:label="@string/app_name"
            android:roundIcon="@mipmap/ic_launcher_round"
            android:supportsRtl="true"
            android:theme="@style/Theme.AppCompat.NoActionBar" tools:ignore="AllowBackup,GoogleAppIndexingWarning">

        <meta-data
                android:name="com.google.android.maps.v2.API_KEY"
                android:value="@string/google_maps_key" />

        <activity android:name=".MainActivity"
                    android:windowSoftInputMode="stateHidden">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

#### Step 2. Design Layouts

For this project let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

#### Step 3. Write Code

Finally we need to write our code as follows:

**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Activity
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.fevziomurtekin.custom_mapview.View
import com.fevziomurtekin.custom_mapview.data.Place
import com.fevziomurtekin.custom_mapview.util.PlaceType
import com.google.android.gms.maps.model.LatLng

class MainActivity : View() {

    private var lists:MutableList<Place> = mutableListOf()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        /*Default place list adding*/
        val school:Place = Place()
        school.name="Uludag University"
        school.placeType=PlaceType.SCHOOL
        /*40.234583,28.8812533*/
        school.latitude=40.234583
        school.longitude=28.8812533
        school.content="Aklın ve ..."
        school.phone="(0224) 294 0000"

        val uludag:Place = Place()
        uludag.name="Uludağ National Park"
        uludag.placeType=PlaceType.PARKING_AREA
        uludag.url="https://cdn4.vectorstock.com/i/1000x1000/22/63/mountain-icons-on-white-background-vector-21032263.jpg"
        uludag.content=""
        /*40.112148,29.0715413*/
        uludag.latitude=40.112148
        uludag.longitude=29.0715413

        val ulucamii:Place = Place()
        ulucamii.name="Ulu Camii Mosque"
        ulucamii.placeType=PlaceType.MOSQUE
        ulucamii.resource=R.drawable.mosque
        ulucamii.content="1395-1399 ... "
        /*40.184151, 29.061927*/
        ulucamii.latitude=40.18415
        ulucamii.longitude=29.061927

        val anitkabir:Place = Place()
        anitkabir.name="Anıtkabir"
        anitkabir.placeType=PlaceType.HEART
        anitkabir.content="Atatürk..."
        /*39.925276, 32.836955*/
        anitkabir.latitude=39.925276
        anitkabir.longitude=32.836955

        lists.add(anitkabir)
        lists.add(ulucamii)
        lists.add(school)
        lists.add(uludag)

        this.addPlacesList(lists)
        this.setMenuAnimation_time(350)
        this.setSearchAnimation_time(350)
        this.setFocus(LatLng(40.1122,29.061927))
        this.setDefaultSearchError("error.")


    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/fevziomurtekin/custom-mapview/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/fevziomurtekin/custom-mapview).|
|3.|Follow code author [here](https://github.com/fevziomurtekin).|

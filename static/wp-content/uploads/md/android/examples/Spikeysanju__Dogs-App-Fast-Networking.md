# Fast Networking Library API example with RecyclerView

>  Simple Dog's Gallery App powered by Dogs Api.

This example is especially suitable if you are getting started with making API calls from android or using `Fast networking library`.

### Full Example

Let us look at a full android Fast Networking Library RecyclerView sample project.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). build.gradle**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

Then we will declare our app dependencies in under the `dependencies` closure. We will need the following 9 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. Our `Appcompat` library.
3. Our `Core-ktx` library.
4. Our `Constraintlayout` library.
5. Our `Cardview` library - Each Dog detail will be rendered in a CardView.
6. Our `Recyclerview` library - Our Dogs will be rendered here.
7. Our `Android-networking` library - This is our Fast Networking library.
8. Our `Picasso` library. - This is our image loader
9. Our `Material` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.2"
    defaultConfig {
        applicationId "www.sanju.dogs"
        minSdkVersion 21
        targetSdkVersion 29
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
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.core:core-ktx:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.1'


    //libraries
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'androidx.recyclerview:recyclerview:1.0.0'
    implementation 'com.amitshekhar.android:android-networking:1.0.2'
    implementation 'com.squareup.picasso:picasso:2.71828'
    implementation 'com.google.android.material:material:1.0.0'
}

```
#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). AndroidManifest.xml**


> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our INTERNET permission - Needed for us to make API calls from our android app.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="www.sanju.dogs">

    <uses-permission android:name="android.permission.INTERNET"/>

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
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


**(a). dogs_rv_layout.xml**


> Our `dogs_rv_layout` layout. This will hold a single dog details in our `RecyclerView`.

First inside your `/res/layout/` directory create an xml layout file named `dogs_rv_layout.xml`.

Next design your XML layout using the following 2 UI widgets and ViewGroups:

1. `LinearLayout` - Our outer element
2. `ImageView` - To show Dog image

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="wrap_content">


    <ImageView
        android:id="@+id/dogImage"
        android:layout_width="180dp"
        android:layout_height="300dp"
        android:backgroundTint="@color/colorAccent"
        android:scaleType="centerCrop"
        android:background="@drawable/rounded_corners"
        android:layout_margin="5dp"
        />

</LinearLayout>
```

**(b). activity_main.xml**


> Our `activity_main` layout. This is our `MainActivity` layout.

Design your XML layout using the following 4 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `EditText`
3. `com.google.android.material.floatingactionbutton.FloatingActionButton`
4. `androidx.recyclerview.widget.RecyclerView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">


    <EditText
        android:id="@+id/searchDogs"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="23dp"
        android:hint="Search Dogs..."
        android:capitalize="none"
        app:layout_constraintBottom_toBottomOf="@+id/searchBtn"
        app:layout_constraintEnd_toStartOf="@+id/searchBtn"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/searchBtn" />

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/searchBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="41dp"
        android:layout_marginEnd="16dp"
        android:backgroundTint="@color/colorPrimary"
        android:layout_marginBottom="25dp"
        android:src="@drawable/ic_search_black_"
        app:layout_constraintBottom_toTopOf="@+id/dogsRV"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/searchDogs"
        app:layout_constraintTop_toTopOf="parent" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/dogsRV"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/searchBtn" />


</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). DogApi.kt**

> Our `DogApi` class.

To start prepare a Kotlin file named `DogApi.kt`. This is a Data class. It will receive a String message as parameter:

```kotlin
package replace_with_your_package_name

data class DogApi(val message: String)

```

**(b). DogsAdapter.kt**

> Our `DogsAdapter` class.

To begin prepare a Kotlin file named `DogsAdapter.kt`.

Besides create a class that derives from `RecyclerView.ViewHolder(v!!),View.OnClickListener` and add its contents as follows:

We will be overriding the following functions: 

1. `onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) `.
2. `onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder `.
3. `getItemCount(): Int `.
4. `onClick(v: View?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.dogs_rv_layout.view.*
import www.sanju.dogs.Model.DogApi
import www.sanju.dogs.R

class DogsAdapter (val context: Context?, private val images: ArrayList<DogApi>): RecyclerView.Adapter<RecyclerView.ViewHolder>() {


    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {


        holder.itemView.dogImage.clipToOutline = true
        Picasso.get().load(images[position].message).into(holder.itemView.dogImage)


        //Image Animation
        //  holder.newsImageUrl.animation = AnimationUtils.loadAnimation(context,R.anim.fade_image)


        //Card Animation
        // holder.card.animation = AnimationUtils.loadAnimation(context,R.anim.card_fade)    }



    }





    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.dogs_rv_layout, parent, false)
        return ViewHolder(v)


    }

    override fun getItemCount(): Int {
        return images.size
    }

}

class ViewHolder(v: View?) : RecyclerView.ViewHolder(v!!),View.OnClickListener {
    override fun onClick(v: View?) {



    }

    init {
        itemView.setOnClickListener(this)
    }


    val dogsImages = itemView.dogImage!!



}

```

**(c). MainActivity.kt**

> Our `MainActivity` class.

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onResponse(response: String?) `.
3. `onError(anError: ANError?) `.

Furthermore we will be creating the following methods:

1. `initDogs(parameter) - Our function will take a `String` object as a parameter.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.StaggeredGridLayoutManager
import com.androidnetworking.AndroidNetworking
import com.androidnetworking.common.Priority
import com.androidnetworking.error.ANError
import com.androidnetworking.interfaces.StringRequestListener
import com.google.android.material.floatingactionbutton.FloatingActionButton
import org.json.JSONObject
import www.sanju.dogs.Adapter.DogsAdapter
import www.sanju.dogs.Model.DogApi


class MainActivity : AppCompatActivity() {

    private val TAG = "MyApp"
    val imageList = ArrayList<DogApi>()


    private lateinit var dogsRV:RecyclerView
    private lateinit var searchText:EditText
    private lateinit var searchBtn:FloatingActionButton


    @SuppressLint("WrongConstant")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //init views



        dogsRV = findViewById<RecyclerView>(R.id.dogsRV)
        searchText = findViewById<EditText>(R.id.searchDogs)
        searchBtn = findViewById<FloatingActionButton>(R.id.searchBtn)


        searchBtn.setOnClickListener {

            var name = searchText.text.toString()

            initDogs(name)
            Toast.makeText(this,name,Toast.LENGTH_LONG).show()
        }


        dogsRV.layoutManager = StaggeredGridLayoutManager(2,LinearLayoutManager.VERTICAL)



        //initDogs()
    }

    private fun initDogs(name: String) {


        imageList.clear()

        AndroidNetworking.initialize(this)

        AndroidNetworking.get("https://dog.ceo/api/breed/$name/images")
            .setPriority(Priority.HIGH)
            .build()
            .getAsString(object : StringRequestListener {
                override fun onResponse(response: String?) {

                    Log.e("Dogs :", response.toString())


                    val res = JSONObject(response)
                    val one = res.getJSONArray("message")


                    for(i in 0 until one.length()){

                        val list = one.get(i)
                        imageList.add(
                            DogApi(list.toString())
                        )
                    }

                    dogsRV.adapter = DogsAdapter(this@MainActivity, imageList)


                }

                override fun onError(anError: ANError?) {
                    Log.i("_err", anError.toString())


                  //  Toast.makeText(this@MainActivity, " Output:$anError",Toast.LENGTH_LONG).show()

                }


            })
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Spikeysanju/Dogs-App-Fast-Networking/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Spikeysanju/Dogs-App-Fast-Networking).|
|3.|Follow code author [here](https://github.com/Spikeysanju).|

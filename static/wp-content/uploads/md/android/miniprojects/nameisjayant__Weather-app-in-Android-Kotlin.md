# Weather App

>  In this project, we are going to make a weather application , with the help of dagger-hilt, retofit,coroutines,flow and channel. I have used openweather free api to make network request..

![Weather App Tutorial](https://github.com/nameisjayant/Weather-app-in-Android-Kotlin/raw/master/app/src/main/res/drawable/one.png)

![Weather App Tutorial](https://github.com/nameisjayant/Weather-app-in-Android-Kotlin/raw/master/app/src/main/res/drawable/two.png)


Let us look at the full Weather App code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 5 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.
4. Our `kotlin-kapt` plugin.
5. Our `dagger.hilt.android.plugin` plugin.

We will enable [`view binding`](https://android.examples.directory/viewbinding) by setting the `viewBinding` property to true. This will allow us to efficiently reference widgets from layout without explicitly invoking `findViewById()` function or using kotlin synthetics.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 16 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'
apply plugin: 'dagger.hilt.android.plugin'
android {
    compileSdkVersion 32
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "com.codingwithjks.weatherapp"
        minSdkVersion 14
        targetSdkVersion 32
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildFeatures {
        viewBinding true
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    // For Kotlin projects
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.8.0'
    implementation 'androidx.appcompat:appcompat:1.5.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.cardview:cardview:1.0.0'
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.3'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'

    //retrofit
    implementation 'com.google.code.gson:gson:2.9.1'
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'

    //LifeCycle
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.5.1"
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.5.1'

    // Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.6.4'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4'

    //dagger-hilt
    implementation "com.google.dagger:hilt-android:2.39.1"
    kapt "com.google.dagger:hilt-android-compiler:2.39.1"

    implementation 'androidx.hilt:hilt-lifecycle-viewmodel:1.0.0-alpha03'
    // When using Kotlin.
    kapt 'androidx.hilt:hilt-compiler:1.0.0'

    implementation 'androidx.activity:activity-ktx:1.5.1'

    //glide
    implementation 'com.github.bumptech.glide:glide:4.11.0'
}
```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Our project will have only a single [`Activity`](htpps://android.examples.directory/activity) but we have to register it right here as shown below: Here we will add the following permission:

1. Our `INTERNET` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.codingwithjks.weatherapp">
    <uses-permission android:name="android.permission.INTERNET"/>
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:name=".container.BaseApp"
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

For this project let's create the following layouts:


**(a). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`CardView`](https://android.examples.directory/cardview)
2. [`SearchView`](https://android.examples.directory/searchview)
3. [`TextView`](https://android.examples.directory/textview)
4. [`ImageView`](https://android.examples.directory/imageview)
5. [`RelativeLayout`](https://android.examples.directory/relativelayout)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:elevation="8dp"
    android:background="#FF6D00"
    tools:context=".MainActivity">

    <androidx.cardview.widget.CardView
        android:id="@+id/cardview"
        android:layout_marginTop="20dp"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:cardCornerRadius="20dp"
        android:layout_marginLeft="15dp"
        android:layout_marginRight="15dp"
        app:cardElevation="8dp"
        app:cardUseCompatPadding="true"
        android:background="#03A9F4">

        <SearchView
            android:id="@+id/searchView"
            android:queryHint="search city"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />
    </androidx.cardview.widget.CardView>


<androidx.cardview.widget.CardView
    android:layout_marginTop="20dp"
    app:cardCornerRadius="35dp"
    android:layout_width="200dp"
    android:elevation="8dp"
    android:layout_gravity="center"
    android:layout_height="400dp">

<LinearLayout
    android:layout_width="match_parent"
    android:orientation="vertical"
    android:layout_height="match_parent">

    <LinearLayout
        android:layout_width="match_parent"
        android:background="#000"
        android:paddingBottom="10dp"
        android:orientation="vertical"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/degree"
            android:layout_gravity="center"
            android:textColor="#fff"
            android:layout_marginTop="10dp"
            android:layout_width="wrap_content"
            android:textAppearance="@style/TextAppearance.AppCompat.Large"
            android:text="N/A"
            android:layout_height="wrap_content"/>

        <ImageView
            android:id="@+id/image"
            android:layout_gravity="center"
            android:src="@drawable/clouds"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>

        <TextView
            android:id="@+id/description"
            android:textAppearance="@style/TextAppearance.AppCompat.Large"
            android:text="N/A"
            android:textColor="#fff"
            android:layout_gravity="center"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_marginTop="10dp"
        android:orientation="vertical"
        android:background="#fff"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/name"
            android:textAppearance="@style/TextAppearance.AppCompat.Large"
            android:layout_gravity="center"
            android:text="N/A"
            android:textStyle="bold"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_margin="10dp"
            android:layout_height="wrap_content">

            <TextView
                android:id="@+id/one"
                android:text="Temp"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>

            <TextView
                android:id="@+id/temp"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_alignRight="@id/one"
                android:layout_alignParentRight="true"
                android:text="N/A" />

        </RelativeLayout>

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_margin="10dp"
            android:layout_height="wrap_content">

            <TextView
                android:id="@+id/two"
                android:text="Humidity"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>

            <TextView
                android:id="@+id/humidity"
                android:layout_alignParentRight="true"
                android:layout_alignRight="@id/two"
                android:text="N/A"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>

        </RelativeLayout>
        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_margin="10dp"
            android:layout_height="wrap_content">

            <TextView
                android:id="@+id/three"
                android:text="Speed"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>

            <TextView
                android:id="@+id/speed"
                android:layout_alignParentRight="true"
                android:layout_alignRight="@id/three"
                android:text="N/A"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>

        </RelativeLayout>
    </LinearLayout>

</LinearLayout>

</androidx.cardview.widget.CardView>


    <TextView
        android:layout_alignParentRight="true"
        android:layout_alignRight="@id/three"
        android:text="Programming Simplified"
        android:layout_marginTop="20dp"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textStyle="bold"
        android:layout_gravity="center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

</LinearLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `City.kt`**

> Our `City` class.

Create a Kotlin file named `City.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

data class City(
    val weather:List<Weather>,
    val main:Main,
    val wind:Wind,
    val name:String = ""
) {
}



```


**(b). `Wind.kt`**

> Our `Wind` class.

Create a Kotlin file named `Wind.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

data class Wind (
    val speed:Float =0.0f,
    val deg:Int = 0
){

}


```


**(c). `Weather.kt`**

> Our `Weather` class.

Create a Kotlin file named `Weather.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

data class Weather(
    val description:String = "",
    val icon:String = ""
)


```


**(d). `Main.kt`**

> Our `Main` class.

Create a Kotlin file named `Main.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

data class Main(
    val temp:Double = 0.0,
    val humidity:Int = 0
) {

}


```


**(e). `BaseApp.kt`**

> Our `BaseApp` class.

Create a Kotlin file named `BaseApp.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Application` from the `android.app` package.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class BaseApp :Application() {
}

```


**(f). `AppModule.kt`**

> Our `AppModule` class.

Create a Kotlin file named `AppModule.kt` .

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name


import com.codingwithjks.weatherapp.Network.ApiService
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
class AppModule {

    @Provides
    @Singleton
    fun getBaseUrl():String = "http://api.openweathermap.org/data/2.5/"

    @Provides
    @Singleton
    fun getRetrofitBuilder(baseUrl:String):Retrofit = Retrofit.Builder()
        .baseUrl(baseUrl)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    @Provides
    @Singleton
    fun getApiService(retrofit: Retrofit):ApiService = retrofit.create(ApiService::class.java)

}

```


**(g). `ApiService.kt`**

> Our `ApiService` class.

Create a Kotlin file named `ApiService.kt` .

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name

import com.codingwithjks.weatherapp.Model.City
import retrofit2.http.GET
import retrofit2.http.Query

interface ApiService {

    @GET("weather/")
    suspend fun getCityData(
        @Query("q") q:String,
        @Query("appid") appId:String
    ):City
}

```


**(h). `ApiServiceImp.kt`**

> Our `ApiServiceImp` class.

Create a Kotlin file named `ApiServiceImp.kt` .

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name

import com.codingwithjks.weatherapp.Model.City
import javax.inject.Inject

class ApiServiceImp @Inject constructor(private val apiService: ApiService) {

    suspend fun getCity(city:String,appId:String):City = apiService.getCityData(city,appId)
}

```


**(i). `WeatherRepository.kt`**

> Our `WeatherRepository` class.

Create a Kotlin file named `WeatherRepository.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Dispatchers` from the `kotlinx.coroutines` package.
2. `Flow` from the `kotlinx.coroutines.flow` package.
3. `conflate` from the `kotlinx.coroutines.flow` package.
4. `flow` from the `kotlinx.coroutines.flow` package.
5. `flowOn` from the `kotlinx.coroutines.flow` package.

Then we will be creating the following functions:

1. `getCityData(parameter)` - Let's pass a `String` object as a parameter.


Here is the full code:

```kotlin
package replace_with_your_package_name

import com.codingwithjks.weatherapp.Model.City
import com.codingwithjks.weatherapp.Network.ApiServiceImp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.conflate
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import javax.inject.Inject

class WeatherRepository @Inject constructor(private val apiServiceImp: ApiServiceImp) {

    fun getCityData(city:String):Flow<City> = flow {
        val response= apiServiceImp.getCity(city,"a45bda185288cef6b03035dd614f61b1")
        emit(response)
    }.flowOn(Dispatchers.IO)
        .conflate()
}

```


**(j). `WeatherViewModel.kt`**

> Our `WeatherViewModel` class.

Create a Kotlin file named `WeatherViewModel.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ExperimentalCoroutinesApi` from the `kotlinx.coroutines` package.
2. `FlowPreview` from the `kotlinx.coroutines` package.
3. `ConflatedBroadcastChannel` from the `kotlinx.coroutines.channels` package.
4. `*` from the `kotlinx.coroutines.flow` package.
5. `launch` from the `kotlinx.coroutines` package.

Then we will be creating the following functions:

1. `setSearchQuery(parameter)` - Let's pass a `String` object as a parameter.
2. `getCityData() `.

**(a). Our `setSearchQuery()` function.**

A function to set search query:

```kotlin
    fun setSearchQuery(search: String) {
        searchChannel.tryEmit(search)
    }
```

**(b). Our `getCityData()` function.**

A function to get city data:

```kotlin
    private fun getCityData() {
        viewModelScope.launch {
            searchChannel
                .flatMapLatest { search ->
                    weatherRepository.getCityData(search)
                }.catch { e ->
                    Log.d("main", "${e.message}")
                }.collect { response ->
                    _weatherResponse.value = response
                }
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.util.Log
import androidx.hilt.lifecycle.ViewModelInject
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.codingwithjks.weatherapp.Model.City
import com.codingwithjks.weatherapp.Model.Main
import com.codingwithjks.weatherapp.Model.Weather
import com.codingwithjks.weatherapp.Model.Wind
import com.codingwithjks.weatherapp.Repository.WeatherRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.channels.ConflatedBroadcastChannel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

@OptIn(ExperimentalCoroutinesApi::class)
@ExperimentalCoroutinesApi
@FlowPreview
@HiltViewModel
class WeatherViewModel @Inject constructor(private val weatherRepository: WeatherRepository) :
    ViewModel() {
    private val _weatherResponse: MutableStateFlow<City> = MutableStateFlow(
        City(
            listOf(Weather()),
            Main(),
            Wind()
        )
    )
    val weatherResponse: StateFlow<City> = _weatherResponse
    private val searchChannel = MutableSharedFlow<String>(1)


    fun setSearchQuery(search: String) {
        searchChannel.tryEmit(search)
    }

    init {
        getCityData()
    }


    private fun getCityData() {
        viewModelScope.launch {
            searchChannel
                .flatMapLatest { search ->
                    weatherRepository.getCityData(search)
                }.catch { e ->
                    Log.d("main", "${e.message}")
                }.collect { response ->
                    _weatherResponse.value = response
                }
        }
    }


}

```


**(k). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `*` from the `kotlinx.android.synthetic.main.activity_main` package.
2. `Dispatchers` from the `kotlinx.coroutines` package.
3. `ExperimentalCoroutinesApi` from the `kotlinx.coroutines` package.
4. `FlowPreview` from the `kotlinx.coroutines` package.
5. `*` from the `kotlinx.coroutines.flow` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onQueryTextSubmit(query: String?): Boolean `.
3. `onQueryTextChange(newText: String?): Boolean `.

Then we will be creating the following functions:

1. `initListener() `.

**(a). Our `initListener()` function.**

A function to init listener:

```kotlin
    private fun initListener() {
        binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener,
            android.widget.SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                query?.let { weatherViewModel.setSearchQuery(it) }
                Log.d("main", "onQueryTextChange: $query")
                return true
            }

            override fun onQueryTextChange(newText: String?): Boolean {

                return true
            }

        })
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.activity.viewModels
import androidx.appcompat.widget.SearchView
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.bumptech.glide.Glide
import com.codingwithjks.weatherapp.Repository.WeatherRepository
import com.codingwithjks.weatherapp.ViewModel.WeatherViewModel
import com.codingwithjks.weatherapp.databinding.ActivityMainBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.FlowPreview
import kotlinx.coroutines.flow.*
import kotlin.math.roundToInt

@OptIn(ExperimentalCoroutinesApi::class)
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val weatherViewModel: WeatherViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)
        initListener()
        lifecycleScope.launchWhenStarted {
            weatherViewModel.weatherResponse.collect { response ->

                when (response.weather[0].description) {
                    "clear sky", "mist" -> {
                        Glide.with(this@MainActivity)
                            .load(R.drawable.clouds)
                            .into(binding.image)
                    }
                    "haze", "overcast clouds" -> {
                        Glide.with(this@MainActivity)
                            .load(R.drawable.haze)
                            .into(binding.image)
                    }
                    else -> {
                        Glide.with(this@MainActivity)
                            .load(R.drawable.rain)
                            .into(binding.image)
                    }
                }

                binding.description.text = response.weather[0].description
                binding.name.text = response.name
                binding.degree.text = response.wind.deg.toString()
                binding.speed.text = response.wind.speed.toString()
                binding.temp.text =
                    (((response.main.temp - 273) * 100.0).roundToInt() / 100.0).toString()
                binding.humidity.text = response.main.humidity.toString()

            }
        }
    }

    @ExperimentalCoroutinesApi
    private fun initListener() {
        binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener,
            android.widget.SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                query?.let { weatherViewModel.setSearchQuery(it) }
                Log.d("main", "onQueryTextChange: $query")
                return true
            }

            override fun onQueryTextChange(newText: String?): Boolean {

                return true
            }

        })
    }
}


```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/nameisjayant/Weather-app-in-Android-Kotlin/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/nameisjayant/Weather-app-in-Android-Kotlin).|
|3.|Follow code author [here](https://github.com/nameisjayant).|

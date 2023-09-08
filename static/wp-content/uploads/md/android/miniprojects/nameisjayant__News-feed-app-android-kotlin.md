# News Feed App Retrofit

>  This is a simple news feed application based on Retrofit and RecyclerView, The description of this project is first we will send a api request on the server for news json data , then shows into RecyclerView, after that whenever we click on any news item it will show the article on that news.

![News Feed App Retrofit Tutorial](https://user-images.githubusercontent.com/61702243/96287661-e6e86880-0fff-11eb-9461-7d7da448af70.png)


### Project Structure

![News Feed App Retrofit Tutorial](https://github.com/nameisjayant/News-feed-app-android-kotlin/raw/master/app/src/main/res/drawable/first.png)

![News Feed App Retrofit Tutorial](https://github.com/nameisjayant/News-feed-app-android-kotlin/raw/master/app/src/main/res/drawable/second.png)


Let us look at the full News Feed App Retrofit code.

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

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 23 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'
apply plugin: 'dagger.hilt.android.plugin'
android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "com.codingwithjks.retrofit"
        minSdkVersion 14
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

    implementation "org.jetbrains.kotlin:kotlin-stdlib:1.4.10"
    implementation 'androidx.core:core-ktx:1.3.2'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.2'
    implementation 'androidx.coordinatorlayout:coordinatorlayout:1.1.0'
    implementation 'com.google.android.material:material:1.2.1'
    testImplementation 'junit:junit:4.13'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.1'
    def appcompat_version = "1.2.0"

    implementation "androidx.appcompat:appcompat:$appcompat_version"

    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'

    implementation 'androidx.recyclerview:recyclerview:1.1.0'
    implementation 'androidx.cardview:cardview:1.0.0'

    // Coroutines
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.9"
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.9'


    //LifeCycle
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0"
    implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.2.0'

    // view model ktx
    implementation 'androidx.activity:activity-ktx:1.1.0'

    implementation "com.google.dagger:hilt-android:2.28-alpha"
    kapt "com.google.dagger:hilt-android-compiler:2.28-alpha"

    implementation 'androidx.hilt:hilt-lifecycle-viewmodel:1.0.0-alpha02'
    // When using Kotlin.
    kapt 'androidx.hilt:hilt-compiler:1.0.0-alpha02'


    //retrofit
    implementation 'com.google.code.gson:gson:2.8.6'
    implementation 'com.squareup.retrofit2:retrofit:2.7.1'
    implementation 'com.squareup.retrofit2:converter-gson:2.7.1'

    implementation 'com.github.bumptech.glide:glide:4.11.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.11.0'

}
```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

This project will have 3 [`Activities`](htpps://android.examples.directory/activity). For them to be accessible we have to register them. We do that below. Here we will add the following permission:

1. Our `INTERNET` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.codingwithjks.retrofit">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:usesCleartextTraffic="true"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"

        android:theme="@style/AppTheme"
        tools:targetApi="m">
        <activity android:name=".Ui.WebActivity"/>
        android:name=".Container.BaseApp"
        android:theme="@style/AppTheme">
        <activity android:name=".Ui.WebActivity"></activity>
        <activity android:name=".Ui.MainActivity">
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


**(a). `toolbar.xml`**

> Our `toolbar` layout.

This layout will represent our 's layout. Specify [`androidx.appcompat.widget.Toolbar`](https://android.examples.directory/toolbar) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):


```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.appcompat.widget.Toolbar xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/Toolbar"
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"
    android:background="?attr/colorPrimary"
    android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
    app:layout_scrollFlags="scroll|enterAlways">

</androidx.appcompat.widget.Toolbar>



```

**(b). `each_row.xml`**

> Our `each_row` layout.

This layout will represent our Row Each's layout. Specify [`androidx.cardview.widget.CardView`](https://android.examples.directory/cardview) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`ConstraintLayout`](https://android.examples.directory/constraintlayout)
2. [`ImageView`](https://android.examples.directory/imageview)
3. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    app:cardUseCompatPadding="true"
    app:cardMaxElevation="8dp"
    app:cardElevation="8dp"
    app:cardCornerRadius="8dp"
    app:cardBackgroundColor="@color/cardbackground"
    app:cardPreventCornerOverlap="true"
    android:layout_height="wrap_content">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="10dp">

        <ImageView
            android:id="@+id/image"
            android:layout_width="match_parent"
            android:layout_height="100dp"
            android:contentDescription="@string/title"
            android:src="@drawable/ic_launcher_background"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/title"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="32dp"
            android:text="@string/title"
            android:textAppearance="@style/TextAppearance.AppCompat.Large"
            android:textSize="30sp"
            android:textStyle="bold"
            android:textColor="@color/textcolor"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.449"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/image" />

        <TextView
            android:id="@+id/content"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:text="@string/description"
            android:textColor="@color/textcolor"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.498"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/title" />

    </androidx.constraintlayout.widget.ConstraintLayout>

</androidx.cardview.widget.CardView>
```

**(c). `activity_web.xml`**

> Our `activity_web` layout.

This layout will represent our Web Activity's layout. Specify [`androidx.coordinatorlayout.widget.CoordinatorLayout`](https://android.examples.directory/coordinatorlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`WebView`](https://android.examples.directory/webview)
2. [`AppBarLayout`](https://android.examples.directory/appbarlayout)
3. [`include`](https://android.examples.directory/include)
4. [`NestedScrollView`](https://android.examples.directory/nestedscrollview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Ui.WebActivity">


<WebView
    android:id="@+id/webview"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>


    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <include
            layout="@layout/toolbar"/>

    </com.google.android.material.appbar.AppBarLayout>

    <androidx.core.widget.NestedScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <WebView
            android:id="@+id/webview"
            android:layout_width="match_parent"
            android:layout_height="match_parent"/>

    </androidx.core.widget.NestedScrollView>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

**(d). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.coordinatorlayout.widget.CoordinatorLayout`](https://android.examples.directory/coordinatorlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`AppBarLayout`](https://android.examples.directory/appbarlayout)
2. [`include`](https://android.examples.directory/include)
3. [`RecyclerView`](https://android.examples.directory/recyclerview)
4. [`ProgressBar`](https://android.examples.directory/progressbar)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="@color/background"
    tools:context=".Ui.MainActivity">

   <com.google.android.material.appbar.AppBarLayout
       android:layout_width="match_parent"
       android:layout_height="wrap_content">

       <include
           layout="@layout/toolbar"/>

   </com.google.android.material.appbar.AppBarLayout>

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        tools:listitem="@layout/each_row"
        android:visibility="gone"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior"/>

    <ProgressBar
        android:layout_gravity="center"
        android:id="@+id/progressBar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `Source.kt`**

> Our `Source` class.

Create a Kotlin file named `Source.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.gson.annotations.SerializedName

data class Source(
    @SerializedName("id")
    val id:String,
    @SerializedName("name")
    val name:String
)

```


**(b). `News.kt`**

> Our `News` class.

Create a Kotlin file named `News.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.gson.annotations.SerializedName

data class News(
    @SerializedName("status")
    val status:String,
    @SerializedName("totalResults")
    val totalResults:Int,
    @SerializedName("articles")
    val articles:List<Articles>
)


```


**(c). `Articles.kt`**

> Our `Articles` class.

Create a Kotlin file named `Articles.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.gson.annotations.SerializedName

data class Articles(
    @SerializedName("source")
    val source: Source,
    @SerializedName("author")
    val author:String,
    @SerializedName("title")
    val title:String,
    @SerializedName("description")
    val description:String,
    @SerializedName("url")
    val url:String,
    @SerializedName("urlToImage")
    val urlToImage:String,
    @SerializedName("publishedAt")
    val publishedAt:String,
    @SerializedName("content")
    val content:String
)

```


**(d). `Listener.kt`**

> Our `Listener` class.

Create a Kotlin file named `Listener.kt` .

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name

interface Listener {
    fun onItemClickListener(position:Int)
}

```


**(e). `BaseApp.kt`**

> Our `BaseApp` class.

Create a Kotlin file named `BaseApp.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Application` from the `android.app` package.

Then extend the `Application` and add its contents as follows:

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class BaseApp : Application() {
}

```


**(f). `BaseUrl.kt`**

> Our `BaseUrl` class.

Create a Kotlin file named `BaseUrl.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

object BaseUrl {

    const val baseUrl:String="http://newsapi.org/v2/"
}

```


**(g). `NewsApi.kt`**

> Our `NewsApi` class.

Create a Kotlin file named `NewsApi.kt` .

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name


import com.codingwithjks.newsfeedapp.Model.News
import retrofit2.Call
import retrofit2.http.GET

import retrofit2.http.Query

interface NewsApi {
    //http://newsapi.org/v2/everything?q=bitcoin&from=2020-07-17&sortBy=publishedAt&apiKey=156c7ce8e18b47b98a0a459cb348684f
   /* @GET("everything/")
    fun getNews(@Query("q")q:String,
                        @Query("apiKey") apiKey:String,
                @Query("from")  from:String,
                 @Query("sortBy") publishedAt:String

    ): Call<News>

    */


    @GET("everything")
   suspend fun getNews( @Query("q") q:String,
                 @Query("apikey") apiKey:String,
                 @Query("from") from:String,
                 @Query("sortBy") publishedAt:String
    ) : News
}

```


**(h). `NewsApiImp.kt`**

> Our `NewsApiImp` class.

Create a Kotlin file named `NewsApiImp.kt` .

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name

import com.codingwithjks.newsfeedapp.Model.News
import com.codingwithjks.newsfeedapp.Network.NewsApi
import javax.inject.Inject

class NewsApiImp @Inject constructor(private val newsApi: NewsApi) {

    suspend fun getNews(q:String, apiKey:String, from:String, publishedKey:String
    ):News = newsApi.getNews(q,apiKey,from,publishedKey)
 }


```


**(i). `NewsRepository.kt`**

> Our `NewsRepository` class.

Create a Kotlin file named `NewsRepository.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Dispatchers` from the `kotlinx.coroutines` package.
2. `Flow` from the `kotlinx.coroutines.flow` package.
3. `flow` from the `kotlinx.coroutines.flow` package.
4. `flowOn` from the `kotlinx.coroutines.flow` package.

Then we will be creating the following functions:

1. `getNews():Flow<News> = flow `.


Here is the full code:

```kotlin
package replace_with_your_package_name

import com.codingwithjks.newsfeedapp.Model.News
import com.codingwithjks.retrofit.Network.NewsApiImp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import javax.inject.Inject

class NewsRepository @Inject constructor(private val newsApiImp: NewsApiImp) {

    fun getNews():Flow<News> = flow {
        val response = newsApiImp.getNews("bitcoin","156c7ce8e18b47b98a0a459cb348684f","2020-10-05","publishedAt")
        emit(response)
    }.flowOn(Dispatchers.IO)

}


```


**(j). `NewsAdapter.kt`**

> Our `NewsAdapter` class.

Create a Kotlin file named `NewsAdapter.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `View` from the `android.view` package.
2. `ViewGroup` from the `android.view` package.
3. `ImageView` from the `android.widget` package.
4. `TextView` from the `android.widget` package.
5. `RecyclerView` from the `androidx.recyclerview.widget` package.

Then extend the `RecyclerView.Adapter<NewsAdapter.NewsViewHolder>` and add its contents as follows:

First override these callbacks: 

1. `onBindViewHolder(holder: NewsViewHolder, position: Int) `.

Then we will be creating the following functions:


**(a). Our `setData()` function.**

A function to set data:

```kotlin
    fun setData(newsList: ArrayList<Articles>)
    {
        this.newsList=newsList
        notifyDataSetChanged()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.codingwithjks.newsfeedapp.Model.Articles
import com.codingwithjks.newsfeedapp.Model.News
import com.codingwithjks.retrofit.Listener.Listener
import com.codingwithjks.retrofit.R

class NewsAdapter(private val context: Context,private var newsList:ArrayList<Articles>,private val listener:Listener) : RecyclerView.Adapter<NewsAdapter.NewsViewHolder>() {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NewsViewHolder =
        NewsViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.each_row,parent,false))

    override fun getItemCount(): Int =newsList.size

    override fun onBindViewHolder(holder: NewsViewHolder, position: Int) {
        val news=newsList[position]
        holder.title.text=news.title
        holder.content.text=news.content
        Glide.with(context)
            .load(news.urlToImage)
            .into(holder.image)
    }

    inner class NewsViewHolder(itemView:View) : RecyclerView.ViewHolder(itemView)
    {
        val image:ImageView=itemView.findViewById(R.id.image)
        val title:TextView=itemView.findViewById(R.id.title)
        val content:TextView=itemView.findViewById(R.id.content)
        init {
            itemView.setOnClickListener {
                listener.onItemClickListener(adapterPosition)
            }
        }
    }

    fun setData(newsList: ArrayList<Articles>)
    {
        this.newsList=newsList
        notifyDataSetChanged()
    }
}

```


**(k). `AppModule.kt`**

> Our `AppModule` class.

Create a Kotlin file named `AppModule.kt` .

Then extend the `NewsApi` and add its contents as follows:

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name

import com.codingwithjks.newsfeedapp.Network.BaseUrl
import com.codingwithjks.newsfeedapp.Network.NewsApi
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.components.ApplicationComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@Module
@InstallIn(ApplicationComponent::class)
class AppModule  {

    @Provides
    fun provideBaseUrl():String = BaseUrl.baseUrl

    @Provides
    @Singleton
    fun providesRetrofitBuilder(baseUrl:String) : Retrofit =
        Retrofit.Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

    @Provides
    fun provideNewApi(retrofit: Retrofit) : NewsApi = retrofit.create(NewsApi::class.java)
}

```


**(m). `NewsViewModel.kt`**

> Our `NewsViewModel` class.

Create a Kotlin file named `NewsViewModel.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `LiveData` from the `androidx.lifecycle` package.
2. `MutableLiveData` from the `androidx.lifecycle` package.
3. `ViewModel` from the `androidx.lifecycle` package.
4. `asLiveData` from the `androidx.lifecycle` package.
5. `catch` from the `kotlinx.coroutines.flow` package.

Then extend the `ViewModel` and add its contents as follows:

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.util.Log
import androidx.hilt.lifecycle.ViewModelInject
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import com.codingwithjks.newsfeedapp.Model.News
import com.codingwithjks.retrofit.Repository.NewsRepository
import kotlinx.coroutines.flow.catch

class NewsViewModel @ViewModelInject constructor(private val newsRepository: NewsRepository) : ViewModel() {

    val newsResponse:LiveData<News> =
        newsRepository.getNews()
            .catch { e->
                Log.d("main", "${e.message}")
            }.asLiveData()

}

```


**(n). `WebActivity.kt`**

> Our `WebActivity` class.

Create a Kotlin file named `WebActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Bundle` from the `android.os` package.
2. `WebView` from the `android.webkit` package.
3. `RequiresApi` from the `androidx.annotation` package.
4. `Toolbar` from the `androidx.appcompat.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_web` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.res.AssetManager
import android.content.res.Configuration
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebView
import androidx.annotation.RequiresApi
import androidx.appcompat.widget.Toolbar
import com.codingwithjks.retrofit.R
import kotlinx.android.synthetic.main.activity_web.*

class WebActivity : AppCompatActivity() {

    private lateinit var url:String
    @RequiresApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_web)

        val toolbar = findViewById<Toolbar>(R.id.Toolbar)
        setSupportActionBar(toolbar)

        val bundle=intent.extras
        if(bundle != null){
           url= bundle.getString("url").toString()
        }
       webview.loadUrl(url)
    }
}

```


**(o). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `viewModels` from the `androidx.activity` package.
2. `Observer` from the `androidx.lifecycle` package.
3. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
4. `RecyclerView` from the `androidx.recyclerview.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onResponse(call: Call<News>, response: Response<News>) `.
3. `onFailure(call: Call<News>, t: Throwable) `.
4. `onItemClickListener(position: Int) `.

Then we will be creating the following functions:

1. `setUpUi() `.
2. `fetchData() `.

**(a). Our `setUpUi()` function.**

A function to set up ui:

```kotlin
    private fun setUpUi() {
        recyclerView=findViewById(R.id.recyclerView)
        newsAdapter= NewsAdapter(this,ArrayList<Articles>(),this)
        recyclerView.apply {
            setHasFixedSize(true)
            layoutManager= LinearLayoutManager(this@MainActivity)
            adapter=newsAdapter
        }
    }
```

**(b). Our `fetchData()` function.**

A function to fetch data:

```kotlin
    private fun fetchData() {
        val call:Call<News> = RetrofitBuilder.newApi
                .getNews("bitcoin"
                ,"c0ad41152144433b927d9a9208e2031b"
                ,"2020-09-16","publishedAt")

        call.enqueue(object :Callback<News> {

            override fun onResponse(call: Call<News>, response: Response<News>) {
               if(response.isSuccessful)
               {
                   val listArticles=response.body()?.articles
                   if(listArticles!=null && listArticles.isNotEmpty()){
                       newsAdapter.setData(listArticles as ArrayList<Articles>)
                       progressBar.visibility=View.GONE
                       recyclerView.visibility=View.VISIBLE
                   }
                   articlesList= response.body()?.articles as ArrayList<Articles>
               }
            }

            override fun onFailure(call: Call<News>, t: Throwable) {
                Log.d("main", "onFailure: ${t.message}")
            }

    override fun onItemClickListener(position: Int) {
        newsViewModel.newsResponse.observe(this, Observer {response->
            val intent=Intent(this, WebActivity::class.java)
            intent.putExtra("url",response.articles[position].url)
            startActivity(intent)
 
        })

    override fun onItemClickListener(position: Int) {
        val intent=Intent(this, WebActivity::class.java)
        intent.putExtra("url",articlesList[position].url)
        startActivity(intent)

    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View

import androidx.appcompat.widget.Toolbar

import androidx.activity.viewModels
import androidx.lifecycle.Observer

import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.codingwithjks.newsfeedapp.Model.Articles
import com.codingwithjks.retrofit.Adapter.NewsAdapter
import com.codingwithjks.retrofit.Listener.Listener
import com.codingwithjks.retrofit.R
import com.codingwithjks.retrofit.ViewModel.NewsViewModel
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.android.synthetic.main.activity_main.*

@AndroidEntryPoint
class MainActivity : AppCompatActivity(),Listener {
    private lateinit var recyclerView: RecyclerView
    private lateinit var newsAdapter: NewsAdapter

    private lateinit var articlesList: ArrayList<Articles>
    private val newsViewModel:NewsViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val toolbar = findViewById<Toolbar>(R.id.Toolbar)
        setSupportActionBar(toolbar)
        setUpUi()
        newsViewModel.newsResponse.observe(this, Observer { response->
            newsAdapter.setData(response.articles as ArrayList<Articles>)
            Log.d("main", " ${response.articles}")
            progressBar.visibility=View.GONE
            recyclerView.visibility=View.VISIBLE
        })
    }

    private fun setUpUi() {
        recyclerView=findViewById(R.id.recyclerView)
        newsAdapter= NewsAdapter(this,ArrayList<Articles>(),this)
        recyclerView.apply {
            setHasFixedSize(true)
            layoutManager= LinearLayoutManager(this@MainActivity)
            adapter=newsAdapter
        }
    }


    private fun fetchData() {
        val call:Call<News> = RetrofitBuilder.newApi
                .getNews("bitcoin"
                ,"c0ad41152144433b927d9a9208e2031b"
                ,"2020-09-16","publishedAt")

        call.enqueue(object :Callback<News> {

            override fun onResponse(call: Call<News>, response: Response<News>) {
               if(response.isSuccessful)
               {
                   val listArticles=response.body()?.articles
                   if(listArticles!=null && listArticles.isNotEmpty()){
                       newsAdapter.setData(listArticles as ArrayList<Articles>)
                       progressBar.visibility=View.GONE
                       recyclerView.visibility=View.VISIBLE
                   }
                   articlesList= response.body()?.articles as ArrayList<Articles>
               }
            }

            override fun onFailure(call: Call<News>, t: Throwable) {
                Log.d("main", "onFailure: ${t.message}")
            }

    override fun onItemClickListener(position: Int) {
        newsViewModel.newsResponse.observe(this, Observer {response->
            val intent=Intent(this, WebActivity::class.java)
            intent.putExtra("url",response.articles[position].url)
            startActivity(intent)
 
        })

    override fun onItemClickListener(position: Int) {
        val intent=Intent(this, WebActivity::class.java)
        intent.putExtra("url",articlesList[position].url)
        startActivity(intent)

    }
}

```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/nameisjayant/News-feed-app-android-kotlin/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/nameisjayant/News-feed-app-android-kotlin).|
|3.|Follow code author [here](https://github.com/nameisjayant).|

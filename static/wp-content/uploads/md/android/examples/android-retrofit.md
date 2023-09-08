# Retrofit - Introduction and Example


_Android Retrofit Tutorial and Examples._

What is Retrofit? It is a Typesafe HTTP Client first created by Square Inc.

Retrofit's role is to turn your HTTP API into a Java interface:

```java
public interface GitHubService {
  @GET("users/{user}/repos")
  Call<List<Repo>> listRepos(@Path("user") String user);
}
```


In this class we will look at Retrofit and Retrofit Examples with respect to android development. We will see how we can use it to talk to webservices via HTTP in an easy manner.

#### What are the Requirements for Retrofit?

Retrofit has very generous requirements:

1. Java 7 and above.
2. Android 2.3 and above.

#### How do I Install Retrofit?

Retrofit is a third party HTTP Client library android and java. Hence it needs to be installed into your project.

If you were looking for a networking class that is standard and included in android framework then check HttpURLConnection.

Otherwise Retrofit can be installed in three ways:

**1\. As a jar.**

Basically you download the Retrofit jar and add it to your android studio as a jar library.

For example I used retrofit 2.4.0 which can be downloaded from [here](https://repo1.maven.org/maven2/com/squareup/retrofit2/retrofit/2.4.0/retrofit-2.4.0.jar).

Otherwise you can check the latest version [here](https://square.github.io/retrofit/).

**2\. Via maven**

_Maven, also known as, Apache Maven is a build automation tool used primarily for Java projects._

This gives it two main roles:

1. Describing how a project is built.
2. Describing the project's dependencies.

Well we can describe Retrofit as our dependency in a java project.

```xml
<dependency>
  <groupId>com.squareup.retrofit2</groupId>
  <artifactId>retrofit</artifactId>
  <version>2.4.0</version>
</dependency>
```

**3\. Via Gradle**

_Gradle is a build system used by android studio._

If you are creating an android project, chances are that you will use this method to install retrofit. This is because you are likely to use [Android Studio](https://camposha.info/android/android-studio) as it is the official development IDE for android. And android studio utilizes the gradle build system.

In that case you will need to go over to your app level build.gradle and add the following statement in your dependencies DSL:

```groovy
implementation 'com.squareup.retrofit2:retrofit:2.4.0'
```

### Common Retrofit Interfaces,Classes and Methods.

#### 1\. Call

This is a Retrofit interface that represents an invocation of a Retrofit method that sends a request to a webserver and returns a response. As the name suggests it basically represents a HTTP Call you make.

Each call will then yield its own HTTP request and response pair. You able to make multiple calls with the same parameters. However you use clone to achieve that. You can use this to implement polling or to retry a failed call.

When making you HTTP calls, you may make them synchronously or asynchronously. To make synchronous calls you use the `execute()` method. However to make asynchronous calls you use the `enqueue()` method.

If you want to cancel any call you use the `cancel()` method.

Here's it's definition:

```java
public interface Call<T> extends Cloneable
```

Take note that in this case `T` represents the type of a successful response body.

#### 2\. enqueue()

This is a method that belongs to the `Call<T>` interface. We talked about that interface representing a HTTP Call you make.

And normally you can make either synchronous or asynchronous call or request. If you want to make an asynchronous call you use this method.

Here's it's definition:

```java
public abstract void enqueue(retrofit2.Callback<T> callback)
```

This method will then asynchronously send your request and notify callback of its response in case an error occurred talking to the server, creating the request, or processing the response.

Here's a simple usage example:

```java
        Call<List<Spacecraft>> call = myAPIService.getSpacecrafts();
        call.enqueue(new Callback<List<Spacecraft>>() {

            @Override
            public void onResponse(Call<List<Spacecraft>> call, Response<List<Spacecraft>> response) {
                myProgressBar.setVisibility(View.GONE);
                populateRecyclerView(response.body());
            }
            @Override
            public void onFailure(Call<List<Spacecraft>> call, Throwable throwable) {
                myProgressBar.setVisibility(View.GONE);
                Toast.makeText(MainActivity.this, throwable.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
```

#### 3\. Callback

This is an interface defining methods responsible for communicating responses from a server or offline requests.

Here's its definition:

```java
public interface Callback<T>
```

`T` in the above represents a successful response body type.

Normally one a single method gets called in response to a given request. That method will be executed using the Retrofit callback executor. If you don't specify any then the following defaults are used:

1. Android: Callbacks are executed on the application's main (UI) thread.
2. JVM: Callbacks are executed on the background thread which performed the request.

Here's example usage:

```java
new Callback<List<Spacecraft>>() {

            @Override
            public void onResponse(Call<List<Spacecraft>> call, Response<List<Spacecraft>> response) {
                myProgressBar.setVisibility(View.GONE);
                populateRecyclerView(response.body());
            }
            @Override
            public void onFailure(Call<List<Spacecraft>> call, Throwable throwable) {
                myProgressBar.setVisibility(View.GONE);
                Toast.makeText(MainActivity.this, throwable.getMessage(), Toast.LENGTH_LONG).show();
            }
        }
```

#### 4\. Retrofit

This is a class that is responsible for adapting a Java interface to HTTP calls by using annotations on the declared methods to define how requests are made.

Here's its definition

```java
public final class Retrofit extends Object
```

To use it you will need to create it's instance. However you do that using the builder and pass your interface to create to generate an implementation. For example:

```java
   Retrofit retrofit = new Retrofit.Builder()
       .baseUrl("https://api.example.com/")
       .addConverterFactory(GsonConverterFactory.create())
       .build();

   MyApi api = retrofit.create(MyApi.class);
   Response<User> user = api.getUser().execute();
```

Or I can create a simple factory class to return me it's instances:

```java
    static class RetrofitClientInstance {

        private static Retrofit retrofit;
        private static final String BASE_URL = "https://raw.githubusercontent.com/";

        public static Retrofit getRetrofitInstance() {
            if (retrofit == null) {
                retrofit = new Retrofit.Builder()
                        .baseUrl(BASE_URL)
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();
            }
            return retrofit;
        }
    }
```

Then I use that class this way:

```java
        MyAPIService myAPIService = RetrofitClientInstance.getRetrofitInstance().create(MyAPIService.class);
```

## Kotlin Android Retrofit Movies Example

In this example you will see how to fetch a list of movies from IMDB website and render in a recyclerview. The items are fetched via Retrofit. Images are rendered via Picasso.

Here is the demo image:

![](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/RetrofitExample-2.png)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

First we will add Retrofit as a dependency, alongside the Retrofit `converter-gson`:

```groovy
    implementation "com.squareup.retrofit2:retrofit:$retrofitVersion"
    implementation "com.squareup.retrofit2:converter-gson:$retrofitConverterGsonVer"
```

We will also add dependencies for RecyclerView and CardView:

```groovy
    implementation "androidx.recyclerview:recyclerview:$supportVer"
    implementation "androidx.cardview:cardview:$supportVer"
```

We will also add dependency for Picasso, our imageloader:

```groovy
    implementation "com.squareup.picasso:picasso:$picassoVersion"
```

### Step 3: Design Layout

Next we will design our layouts. We will have two layouts:

**(a). list_row.xml**

This will be inflated into a single row in our recyclerview. We will have a cardview with image and text:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:card_view="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <androidx.cardview.widget.CardView
        android:id="@+id/card_view"
        android:layout_width="match_parent"
        android:layout_height="240dp"
        android:layout_gravity="center"
        android:layout_margin="5dp"
        android:background="#fff"
        card_view:cardCornerRadius="2dp"
        card_view:contentPadding="10dp">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical">

            <ProgressBar
                android:id="@+id/progress_bar"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="center"
                android:visibility="gone" />

            <ImageView
                android:id="@+id/image_view_movie"
                android:layout_width="match_parent"
                android:layout_height="0dp"
                android:layout_weight="1"
                android:scaleType="fitXY" />

            <TextView
                android:id="@+id/movie_title"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="center"
                android:layout_marginStart="10dp"
                android:textColor="@android:color/black"
                android:textSize="18sp"
                android:textStyle="bold" />

        </LinearLayout>

    </androidx.cardview.widget.CardView>

</LinearLayout>
```

**(b). activity_main.xml**

In our `MainActivity` layout we will add a recyclerview which will render our list of items:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.developers.usingretrofit.MainActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/movie_recycler_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_gravity="center"
        android:layout_marginEnd="5dp"
        android:layout_marginStart="5dp" />
</LinearLayout>
```

### Step 4: Create constants

A constant is a variable whose value doesn't change. We will need such variables for example wuth our base URL and image URL in our project. Create a file called `Constants.kt` and add the following code:

**Constants.kt**

```kotlin
class Constants {

    companion object {
        @JvmField
        val BASE_URL = "https://api.themoviedb.org/3/movie/";
        @JvmField
        val IMAGE_BASE_URL = "http://image.tmdb.org/t/p/w185/"
    }

}
```

### Step 5: Create Model classes

We will have two model classes:

**(a). MovieResult.kt**

This is a class that will represent a movie result call. This model class will have properties like page, total results, total pages as well as the list of results:

```kotlin
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class MovieResult(@SerializedName("page")
                  @Expose
                  var page: Int? = null,
                  @SerializedName("total_results")
                  @Expose
                  var totalResults: Int? = null,
                  @SerializedName("total_pages")
                  @Expose
                  var totalPages: Int? = null,
                  @SerializedName("results")
                  @Expose
                  var results: List<Result>? = null)
```

**(b). Result.kt**

This result class represents a single movie as well as its properties like title, popularity, genre IDs etc:

```kotlin

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class Result(
        @SerializedName("vote_count")
        @Expose
        var voteCount: Int? = null,
        @SerializedName("id")
        @Expose
        var id: Int? = null,
        @SerializedName("video")
        @Expose
        var video: Boolean? = null,
        @SerializedName("vote_average")
        @Expose
        var voteAverage: Double? = null,
        @SerializedName("title")
        @Expose
        var title: String? = null,
        @SerializedName("popularity")
        @Expose
        var popularity: Double? = null,
        @SerializedName("poster_path")
        @Expose
        var posterPath: String? = null,
        @SerializedName("original_language")
        @Expose
        var originalLanguage: String? = null,
        @SerializedName("original_title")
        @Expose
        var originalTitle: String? = null,
        @SerializedName("genre_ids")
        @Expose
        var genreIds: List<Int>? = null,
        @SerializedName("backdrop_path")
        @Expose
        var backdropPath: String? = null,
        @SerializedName("adult")
        @Expose
        var adult: Boolean? = null,
        @SerializedName("overview")
        @Expose
        var overview: String? = null,
        @SerializedName("release_date")
        @Expose
        var release#post_date: String? = null)
```

### Step 6: Create an API Service

This is simply an interface that will contain a method that represents our HTTP request:

**ApiInterface.kt**

```kotlin

import com.developers.usingretrofit.model.MovieResult
import com.developers.usingretrofit.utils.Constants
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query

interface ApiInterface {

    @GET("popular")
    fun getMovies(@Query("api_key") key: String,
                  @Query("page") page: Int): Call<MovieResult>

    companion object Factory {

        fun create(): ApiInterface {

            val retrofit = Retrofit.Builder()
                    .addConverterFactory(GsonConverterFactory.create())
                    .baseUrl(Constants.BASE_URL)
                    .build()

            return retrofit.create(ApiInterface::class.java);

        }

    }

}
```

### Step 7: Create Adapter

To render our movies list in our recyclerview we need an adapter. Create one by exending the `RecyclerView.Adapter` as shown below:

**MovieAdapter.kt**

```kotlin
import android.content.Context
import android.net.Uri
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.developers.usingretrofit.R
import com.developers.usingretrofit.model.Result
import com.developers.usingretrofit.utils.Constants
import com.squareup.picasso.Callback
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.list_row.view.*

class MovieAdapter(val context: Context, private val resultList: List<Result>?) : RecyclerView.Adapter<MovieAdapter.MyViewHolder>() {

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        holder.bindItems(resultList?.get(position))
    }

    override fun getItemCount(): Int {
        return resultList?.size!!
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.list_row, parent, false)
        return MyViewHolder(view)
    }

    class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bindItems(result: Result?) {
            itemView.movie_title.text = result?.title
            val posterUri = Uri.parse(Constants.IMAGE_BASE_URL).buildUpon()
                    .appendEncodedPath(result?.posterPath)
                    .build()
            itemView.progress_bar.visibility = View.VISIBLE
            Picasso.with(itemView.context).load(posterUri.toString())
                    .into(itemView.image_view_movie, object : Callback {

                        override fun onError() {
                            //Show Error here
                        }

                        override fun onSuccess() {
                            itemView.progress_bar.visibility = View.GONE
                        }

                    })
        }
    }
}
```

### Step 8: Write MainActivity code

Here is the full code for the `MainActivity`:

```kotlin
import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.recyclerview.widget.GridLayoutManager
import com.developers.usingretrofit.adapter.MovieAdapter
import com.developers.usingretrofit.model.MovieResult
import kotlinx.android.synthetic.main.activity_main.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val apiCall = ApiInterface.create()
        apiCall.getMovies(BuildConfig.TV_KEY, 1).enqueue(object : Callback<MovieResult> {
            override fun onFailure(call: Call<MovieResult>?, t: Throwable?) {
                showError(t?.message)
            }

            override fun onResponse(call: Call<MovieResult>?, response: Response<MovieResult>?) {
                val movieResponse = response?.body()
                val resultList = movieResponse?.results
                val layoutManager = GridLayoutManager(applicationContext,2)
                val adapter = MovieAdapter(applicationContext, resultList)
                movie_recycler_view.layoutManager = layoutManager
                movie_recycler_view.adapter = adapter
            }

        })
    }

    private fun showError(message: String?) {
        toast(message.toString())
    }

    fun Context.toast(msg: String) {
        Toast.makeText(applicationContext, msg, Toast.LENGTH_SHORT).show()
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/UsingRetrofit) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

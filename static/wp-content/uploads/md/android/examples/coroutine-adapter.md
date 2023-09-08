# Retrofit and Coroutine Adapter Examples


In this tutorial we will learn how to use retrofit and coroutine-adapter. This combination is especially usefull if you plan to fetch data from a webservice and render them in a recyclerview. Let us look at some simple step by step examples.


### What is Coroutine-Adapter?

Coroutines are used to simplify asynchronous programming. They are very light and can be sometimes used in place of RxJava for performing async operations with less code. [Coroutine Adapter](https://github.com/JakeWharton/retrofit2-kotlin-coroutines-adapter) is a call Adapter around Retrofit for Http calls developed by Jake Wharton.

## Example 1: Kotlin Android Retrofit & Coroutines Adapter

In this example you will learn about how to fetch data via Retrofit and Coroutine Adapter in Kotlin android and populate a RecyclerView. You will fetch movies from IMDB website and render them in a recyclervew with a list of cardviews.

Here is the demo of the created project:

![Kotlin Android Retrofit and Coroutine Adapters Examples](https://camposha.info/android-examples/wp-content/uploads/sites/9/2022/02/coroutineAdapter.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Here are some dependencies will be used. Add them in your `app/build.gradle`:

Add `retrofit2-kotlin-coroutines-adapter` by Jake Wharton in

```groovy
    implementation "com.jakewharton.retrofit:retrofit2-kotlin-coroutines-adapter:$kotlinCoroutinesAdapterVer"
```

Also add the `retrofit2:converter-gson` by Square. This will map data classes to JSON objects:

```groovy
    implementation "com.squareup.retrofit2:converter-gson:$retrofitConverterGsonVer"
```

The movies will be rendered in a recyclerview with movies, so add both recyclerview and cardviews:

```groovy
    implementation "androidx.cardview:cardview:$supportVer"
    implementation "androidx.recyclerview:recyclerview:$supportVer"
```

Then add Kotlin coroutines core as well as the coroutines-android:

```groovy
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:$coroutinesAndroidVer"
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:$coroutinesCoreVer"
```

Furthermore

### Step 3: Add Movie API Key

To be able to render movies from IMDB you need a key. Sign in into their website for free, obtain a key and come specify it in the `app/build.gradle` under the `android{}` closure:

```groovy
    buildTypes.each {
        it.buildConfigField('String', "MOVIE_KEY", API_KEY)
    }
```

### Step 4: Design Layouts

There will be two layouts:

1. list_row.xml - For each movie item.
2. activity_main.xml - For the whole page

**(a). list_row.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="5dp"
    android:elevation="@dimen/cardview_default_elevation"
    app:cardCornerRadius="@dimen/cardview_default_radius"
    app:cardElevation="@dimen/cardview_default_elevation">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">

        <TextView
            android:id="@+id/movie_title_text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginBottom="5dp"
            android:layout_marginStart="5dp"
            android:fontFamily="sans-serif"
            android:textColor="@android:color/black"
            android:textSize="18sp"
            android:textStyle="bold|italic" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Crew:"
            android:textStyle="bold|italic"
            android:textColor="@color/colorPrimary"
            android:textSize="18sp"
            android:layout_marginTop="5dp"
            android:layout_marginStart="5dp"/>

        <TextView
            android:id="@+id/crew_result_text_view"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="10dp"
            android:fontFamily="serif"
            android:textColor="@android:color/black"
            android:textSize="15sp" />

    </LinearLayout>

</androidx.cardview.widget.CardView>
```

**(b). activity_main.xml**

> Add a recyclerview and a progressbar:

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="com.developers.coroutineadapters.MainActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/movie_crew_recycler_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_gravity="center"
        android:layout_margin="5dp" />

    <ProgressBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/progress_bar"
        android:layout_gravity="center"/>

</FrameLayout>
```

### Step 4: Create Data classes

**(a). CrewResult.kt**

This file will contain three data classes;

1. CrewResult
2. Crew
3. Cast

```kotlin
import com.google.gson.annotations.SerializedName

data class CrewResult(
        @SerializedName("id") var id: Int = 0, //856
        @SerializedName("cast") var cast: List<Cast> = listOf(),
        @SerializedName("crew") var crew: List<Crew> = listOf()
)

data class Crew(
        @SerializedName("credit_id") var creditId: String = "", //52fe4282c3a36847f80249a9
        @SerializedName("department") var department: String = "", //Directing
        @SerializedName("gender") var gender: Int = 0, //2
        @SerializedName("id") var id: Int = 0, //24
        @SerializedName("job") var job: String = "", //Director
        @SerializedName("name") var name: String = "", //Robert Zemeckis
        @SerializedName("profile_path") var profilePath: String = "" ///isCuZ9PWIOyXzdf3ihodXzjIumL.jpg
)

data class Cast(
        @SerializedName("cast_id") var castId: Int = 0, //17
        @SerializedName("character") var character: String = "", //Eddie Valiant
        @SerializedName("credit_id") var creditId: String = "", //52fe4283c3a36847f8024a07
        @SerializedName("gender") var gender: Int = 0, //2
        @SerializedName("id") var id: Int = 0, //382
        @SerializedName("name") var name: String = "", //Bob Hoskins
        @SerializedName("order") var order: Int = 0, //0
        @SerializedName("profile_path") var profilePath: String = "" ///mIgAC6q5HcHHxZUIiCOvE6mHLGs.jpg
)
```

**(b). MovieResult.kt**

This will contain two data classes:

1. MovieResult
2. Result

```kotlin
import com.google.gson.annotations.SerializedName

data class MovieResult(
        @SerializedName("page") var page: Int = 0, //1
        @SerializedName("total_results") var totalResults: Int = 0, //19637
        @SerializedName("total_pages") var totalPages: Int = 0, //982
        @SerializedName("results") var results: List<Result> = listOf()
)

data class Result(
        @SerializedName("vote_count") var voteCount: Int = 0, //6638
        @SerializedName("id") var id: Int = 0, //198663
        @SerializedName("video") var video: Boolean = false, //false
        @SerializedName("vote_average") var voteAverage: Double = 0.0, //7
        @SerializedName("title") var title: String = "", //The Maze Runner
        @SerializedName("popularity") var popularity: Double = 0.0, //445.890202
        @SerializedName("poster_path") var posterPath: String = "", ///coss7RgL0NH6g4fC2s5atvf3dFO.jpg
        @SerializedName("original_language") var originalLanguage: String = "", //en
        @SerializedName("original_title") var originalTitle: String = "", //The Maze Runner
        @SerializedName("genre_ids") var genreIds: List<Int> = listOf(),
        @SerializedName("backdrop_path") var backdropPath: String = "", ///lkOZcsXcOLZYeJ2YxJd3vSldvU4.jpg
        @SerializedName("adult") var adult: Boolean = false, //false
        @SerializedName("overview") var overview: String = "", //Set in a post-apocalyptic world, young Thomas is deposited in a community of boys after his memory is erased, soon learning they're all trapped in a maze that will require him to join forces with fellow “runners” for a shot at escape.
        @SerializedName("release_date") var release#post_date: String = "" //2014-09-10
)
```

**(c). VideoResult.kt**

Will contain:

1. VideoResult
2. TrailerResult

```kotlin
import com.google.gson.annotations.SerializedName

data class VideoResult(
        @SerializedName("id") var id: Int = 0, //856
        @SerializedName("results") var results: List<TrailerResult> = listOf()
)

data class TrailerResult(
        @SerializedName("id") var id: String = "", //569f54cb9251415e5e009306
        @SerializedName("iso_639_1") var iso6391: String = "", //en
        @SerializedName("iso_3166_1") var iso31661: String = "", //US
        @SerializedName("key") var key: String = "", //kYNqYC_jNAg
        @SerializedName("name") var name: String = "", //Who Framed Roger Rabbit? 25th Anniversary Blu-ray Trailer
        @SerializedName("site") var site: String = "", //YouTube
        @SerializedName("size") var size: Int = 0, //1080
        @SerializedName("type") var type: String = "" //Trailer
)
```

### Step 5: Create API Interface

**ApiInterface.kt**

This will contain the HTTP methods we will use:

```kotlin
import com.developers.coroutineadapters.model.CrewResult
import com.developers.coroutineadapters.model.MovieResult
import com.developers.coroutineadapters.model.VideoResult
import com.jakewharton.retrofit2.adapter.kotlin.coroutines.CoroutineCallAdapterFactory
import kotlinx.coroutines.Deferred
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface ApiInterface {

    @GET("popular")
    fun getMovies(@Query("api_key") key: String,
                  @Query("page") page: Int): Deferred<MovieResult>

    @GET("{id}/videos")
    fun getVideos(@Path("id") id: Int,
                  @Query("api_key") apiKey: String): Deferred<VideoResult>

    @GET("{id}/credits")
    fun getCrew(@Path("id") id: Int,
                @Query("api_key") apiKey: String): Deferred<CrewResult>

    companion object Factory {

        fun create(): ApiInterface {

            val retrofit = Retrofit.Builder()
                    .addConverterFactory(GsonConverterFactory.create())
                    .addCallAdapterFactory(CoroutineCallAdapterFactory())
                    .baseUrl("https://api.themoviedb.org/3/movie/")
                    .build()

            return retrofit.create(ApiInterface::class.java);

        }

    }
}
```

### Step 6: Create RecyclerView Adapter

**MovieAdapter.kt**

Will bind data to recyclerview:

```kotlin
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import kotlinx.android.synthetic.main.list_row.view.*

class MovieAdapter(private val movieNameList: MutableList<String>,
                   private val castList: MutableList<String>)
    : RecyclerView.Adapter<MovieAdapter.MyViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.list_row, parent,
                false)
        return MyViewHolder(view)
    }

    override fun getItemCount(): Int {
        return movieNameList.size
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        holder.bindItems(movieNameList[position], castList[position])
    }

    class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bindItems(movieName: String, crewResultList: String) {
            itemView.movie_title_text.text = movieName
            itemView.crew_result_text_view.text = crewResultList
        }
    }
}
```

### Step 7: Write MainActivity code

**MainActivity.kt**

The main activity:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import android.view.View
import com.developers.coroutineadapters.model.MovieResult
import com.developers.coroutineadapters.model.Result
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import java.util.logging.Logger

class MainActivity : AppCompatActivity() {

    private lateinit var apiInterface: ApiInterface
    private var nameList = mutableListOf<String>()
    private var castList = mutableListOf<String>()

    companion object {
        val log = Logger.getLogger(MainActivity::class.java.name)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        apiInterface = ApiInterface.create()
        GlobalScope.launch(Dispatchers.IO) {
            getMovieCrew(getMovies().await().results)
        }

    }

    private fun getMovies(): Deferred<MovieResult> {
        return apiInterface.getMovies(BuildConfig.MOVIE_KEY, 1)
    }

    private suspend fun getMovieCrew(movieList: List<Result>) {
        for (result in movieList) {
            nameList.add(result.title)
            castList.add(apiInterface.getCrew(result.id,
                    BuildConfig.MOVIE_KEY).await().cast[0].name)
            log.info(apiInterface.getCrew(result.id,
                    BuildConfig.MOVIE_KEY).await().cast[0].name + " of " + result.title)
        }
        log.info(" " + castList.size)
        GlobalScope.launch(Dispatchers.Main) {
            log.info("Sizes " + nameList.size + " " + castList.size)
            val linearLayoutManager = LinearLayoutManager(applicationContext)
            linearLayoutManager.orientation = LinearLayoutManager.VERTICAL
            val movieAdapter = MovieAdapter(nameList, castList)
            with(movie_crew_recycler_view) {
                layoutManager = linearLayoutManager
                adapter = movieAdapter
            }
            progress_bar.visibility = View.GONE
        }
    }

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/CoroutineAdapters) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

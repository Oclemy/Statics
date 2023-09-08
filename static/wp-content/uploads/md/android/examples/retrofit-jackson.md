# Kotlin Android Retrofit Jackson

In this tutorial you will learn how to download data via Retrofit and parse it using the Jackson Kotlin module.


### What is Jackson?

> Jackson is a always tagged as "the Java JSON library" or simply as "JSON for Java".

It is a suite of data-processing tools for Java (and the JVM platform), including the flagship streaming [JSON](https://en.wikipedia.org/wiki/JSON) parser / generator library, matching data-binding library (POJOs to and from JSON) and additional data format modules to process data encoded in Avro, BSON, CBOR, CSV, Smile, Java Properties, Protobuf, TOML, XML or YAML; and even the large set of data format modules to support data types of widely used data types such as Guava, Joda, PCollectionsnand many, many more .

Read more the [Jackson Project FAQ](https://github.com/FasterXML/jackson/wiki/FAQ).

## Example 1: Kotlin Android Retrofit Jackson Example

Here is a simple example. Here is the image screenshot:

![Kotlin Android Retrofit Jackson Example](https://camposha.info/wp-content/uploads/images/jackson.png)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Here are the dependencies you will need:

```groovy
    implementation "com.squareup.retrofit2:retrofit:$retrofitVersion"
    implementation "androidx.recyclerview:recyclerview:$supportVer"
    implementation "androidx.cardview:cardview:$supportVer"
    implementation "com.squareup.picasso:picasso:$picassoVersion"
    implementation "com.squareup.retrofit2:converter-jackson:$retrofitJacksonConverter"
}
```

Included are the Retrofit, which is teh HTTP client, RecyclerView for rendering data, Picasso for downloading images and `converter-jackson` for deserializing JSON into Kotlin data classes.

### Step : Create Model classes


**MovieResult.kt**

```kotlin
import com.fasterxml.jackson.annotation.JsonProperty

data class MovieResult(
		@JsonProperty("page") var page: Int = 0, //1
		@JsonProperty("total_results") var totalResults: Int = 0, //19788
		@JsonProperty("total_pages") var totalPages: Int = 0, //990
		@JsonProperty("results") var results: List<Result> = listOf()
)

data class Result(
		@JsonProperty("vote_count") var voteCount: Int = 0, //6793
		@JsonProperty("id") var id: Int = 0, //198663
		@JsonProperty("video") var video: Boolean = false, //false
		@JsonProperty("vote_average") var voteAverage: Int = 0, //7
		@JsonProperty("title") var title: String = "", //The Maze Runner
		@JsonProperty("popularity") var popularity: Double = 0.0, //535.445142
		@JsonProperty("poster_path") var posterPath: String = "", ///coss7RgL0NH6g4fC2s5atvf3dFO.jpg
		@JsonProperty("original_language") var originalLanguage: String = "", //en
		@JsonProperty("original_title") var originalTitle: String = "", //The Maze Runner
		@JsonProperty("genre_ids") var genreIds: List<Int> = listOf(),
		@JsonProperty("backdrop_path") var backdropPath: String = "", ///lkOZcsXcOLZYeJ2YxJd3vSldvU4.jpg
		@JsonProperty("adult") var adult: Boolean = false, //false
		@JsonProperty("overview") var overview: String = "", //Set in a post-apocalyptic world, young Thomas is deposited in a community of boys after his memory is erased, soon learning they're all trapped in a maze that will require him to join forces with fellow “runners” for a shot at escape.
		@JsonProperty("release_date") var releaseDate: String = "" //2014-09-10
)
```

### Step : Create API Interface

**ApiInterface.kt**

```kotlin
import com.developers.jacksonkotlinmodule.model.MovieResult
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.jackson.JacksonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query

interface ApiInterface {
    @GET("popular")
    fun getMovies(@Query("api_key") key: String,
                  @Query("page") page: Int): Call<MovieResult>

    companion object Factory {

        fun create(): ApiInterface {

            val retrofit = Retrofit.Builder()
                    .addConverterFactory(JacksonConverterFactory.create(
                            jacksonObjectMapper()
                    ))
                    .baseUrl("https://api.themoviedb.org/3/movie/")
                    .build()

            return retrofit.create(ApiInterface::class.java);

        }

    }
}
```

### Step : Create Adapter

**MovieAdapter.kt**

```kotlin
import android.net.Uri
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.developers.jacksonkotlinmodule.R
import com.developers.jacksonkotlinmodule.model.Result
import com.squareup.picasso.Callback
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.list_row.view.*
import android.content.Context

class MovieAdapter(private val context: Context, private val resultList: List<Result>?)
    : RecyclerView.Adapter<MovieAdapter.MyViewHolder>() {

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        holder?.bindItems(resultList?.get(position))
    }

    override fun getItemCount(): Int {
        return resultList?.size!!
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.list_row, parent,
                false)
        return MyViewHolder(view)
    }


    class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bindItems(result: Result?) {
            itemView.movie_title.text = result?.title
            val posterUri = Uri.parse("http://image.tmdb.org/t/p/w185/").buildUpon()
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

### Step : Fetch and Render Movies

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.GridLayoutManager
import com.developers.jacksonkotlinmodule.adapter.MovieAdapter
import com.developers.jacksonkotlinmodule.model.MovieResult
import kotlinx.android.synthetic.main.activity_main.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.logging.Logger

class MainActivity : AppCompatActivity() {

    companion object {
        val Log = Logger.getLogger(MainActivity::class.java.name)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val apiCall = ApiInterface.create()
        apiCall.getMovies(BuildConfig.MOVIE_KEY, 1)
                .enqueue(object : Callback<MovieResult> {

                    override fun onResponse(call: Call<MovieResult>?, response: Response<MovieResult>?) {
                        Log.info(response?.body()?.results!![0].posterPath + " ")
                        val movieResponse = response.body()
                        val resultList = movieResponse?.results
                        val layoutManager = GridLayoutManager(applicationContext, 2)
                        val adapter = MovieAdapter(applicationContext, resultList)
                        movie_recycler_view.layoutManager = layoutManager
                        movie_recycler_view.adapter = adapter
                    }

                    override fun onFailure(call: Call<MovieResult>?, t: Throwable?) {
                        t?.printStackTrace()
                    }

                })
    }
}

```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

|Number|Link|
|-----|---|
|1.|[Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/JacksonKotlinModule) Example|
|2.|[Follow](https://github.com/amanjeetsingh150/) code author|
|3.|Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt)|



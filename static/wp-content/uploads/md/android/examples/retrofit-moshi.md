# Kotlin Android Retrofit + Paging + Hilt + Moshi 

In this example you will learn how to fetch paged or paginated data from a remote repository via `Retrofit` and` Paging Library`. `Dagger Hilt` is used for dependency injection. Moshi is our JSON parsing library. Our remote data source is Github API.


This example will comprise the following files:

- `GitHubAPI.kt`
- `App.kt`
- `Repo.kt`
- `AppModule.kt`
- `RepoPagingSource.kt`
- `MainActivity.kt`
- `MainViewModel.kt`
- `RepoAdapter.kt`
- `RepoLoadStateAdapter.kt`
- `UiModel.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies

In your `app/build.gradle` add dependencies as shown below. First apply the following plugins including `kotlin-kapt` and `dagger.hilt.android.plugin`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-kapt'
apply plugin: 'dagger.hilt.android.plugin'
```
Inside the `android{}` closure enable Java8 as well as data binding:

```groovy
android {
   //..
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = '1.8'
        freeCompilerArgs += ["-Xopt-in=kotlin.RequiresOptIn"]
    }

    buildFeatures {
        dataBinding = true
    }
}
```

Then we will have our dependencies as shown below:

```groovy

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.2'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'com.google.android.material:material:1.3.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

    implementation "androidx.fragment:fragment-ktx:1.3.2"

    implementation "androidx.swiperefreshlayout:swiperefreshlayout:1.1.0"
    implementation "androidx.recyclerview:recyclerview:1.2.0-rc01"

    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.4.0-alpha01"
    implementation "androidx.lifecycle:lifecycle-livedata-ktx:2.4.0-alpha01"

    implementation "androidx.paging:paging-runtime-ktx:3.0.0-beta03"

    implementation 'com.jakewharton.timber:timber:4.7.1'

    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-moshi:2.9.0'

    implementation 'com.squareup.okhttp3:okhttp:4.7.2'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.7.2'

    implementation "com.squareup.moshi:moshi:1.9.2"
    kapt "com.squareup.moshi:moshi-kotlin-codegen:1.9.2"

    implementation 'com.google.dagger:hilt-android:2.33-beta'
    kapt 'com.google.dagger:hilt-compiler:2.33-beta'
}
```

### Step 3: Design Layouts

For the layouts we will be using data binding to bind values to widgets:

Here are our layouts:

**(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows. Add a `SwipeRefreshLayout`, RecyclerView and a Button inside a ConstraintLayout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

        <import type="android.view.View" />

        <variable
            name="activity"
            type="com.star_zero.pagingretrofitsample.ui.MainActivity" />

    </data>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <androidx.swiperefreshlayout.widget.SwipeRefreshLayout
            android:id="@+id/swipe_refresh"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:visibility="@{activity.isError ? View.GONE : View.VISIBLE}"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:onRefreshListener="@{() -> activity.onRefresh()}"
            app:refreshing="@{activity.isRefreshing}">

            <androidx.recyclerview.widget.RecyclerView
                android:id="@+id/recycler"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                tools:listitem="@layout/item_repo" />
        </androidx.swiperefreshlayout.widget.SwipeRefreshLayout>

        <Button
            android:id="@+id/button_retry"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:onClick="@{() -> activity.retry()}"
            android:text="RETRY"
            android:visibility="@{activity.isError ? View.VISIBLE : View.GONE}"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```
***(b). `item_repo.xml`**

Create a file named `item_repo.xml` and design it as follows. Add an ImageButton and a textview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

        <variable
            name="model"
            type="com.star_zero.pagingretrofitsample.ui.UiModel" />
    </data>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/text_name"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginBottom="16dp"
            android:text="@{model.fullName}"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/button_fav"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:text="@tools:sample/cities" />

        <ImageButton
            android:id="@+id/button_fav"
            android:layout_width="32dp"
            android:layout_height="32dp"
            android:layout_marginTop="8dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="8dp"
            android:background="?android:attr/selectableItemBackgroundBorderless"
            android:scaleType="fitCenter"
            android:src="@{model.favorite ? @drawable/ic_favorite_on : @drawable/ic_favorite_off}"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:src="@drawable/ic_favorite_on" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```
***(c). `item_repo_load_state.xml`**

Create a file named `item_repo_load_state.xml` and design it as follows. Add a `ProgressBar` and a `MaterialButton`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <data>

        <variable
            name="isLoading"
            type="Boolean" />

        <variable
            name="isError"
            type="Boolean" />

        <import type="android.view.View" />
    </data>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <ProgressBar
            android:id="@+id/progress"
            style="@style/Widget.AppCompat.ProgressBar"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginTop="8dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="8dp"
            android:visibility="@{isLoading ? View.VISIBLE : View.GONE}"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <com.google.android.material.button.MaterialButton
            android:id="@+id/button_retry"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginTop="8dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="8dp"
            android:text="RETRY"
            android:visibility="@{isError ? View.VISIBLE : View.GONE}"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

### Step 4: Write Code

Write Code as follows:

#### Create an API Interface

**(a). `GitHubAPI.kt`**

Create a file named `GitHubAPI.kt` and inside it create an Interface with the following suspendable abstract function:

```kotlin
    @GET("/users/{user}/repos")
    suspend fun repos(
        @Path("user") user: String,
        @Query("page") page: Int,
        @Query("per_page") prePage: Int
    ): Response<List<Repo>>
```


Here is the full code

```kotlin
package com.star_zero.pagingretrofitsample.api

import com.star_zero.pagingretrofitsample.data.Repo
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface GitHubAPI {
    @GET("/users/{user}/repos")
    suspend fun repos(
        @Path("user") user: String,
        @Query("page") page: Int,
        @Query("per_page") prePage: Int
    ): Response<List<Repo>>
}
```

**(b). `App.kt`**

Create a file named `App.kt` and make the class extend the `Application` class then inside it initialize the `Timber`, our logging library by invoking the `plant()` function:

```kotlin
Timber.plant(Timber.DebugTree())
```

Here is the full code

```kotlin
package com.star_zero.pagingretrofitsample

import android.app.Application
import dagger.hilt.android.HiltAndroidApp
import timber.log.Timber

@HiltAndroidApp
class App : Application() {
    override fun onCreate() {
        super.onCreate()
        Timber.plant(Timber.DebugTree())
    }
}
```

**(c). `Repo.kt`**

Create a file named `Repo.kt` and inside it create a data class called `Repo`. Annotate it with `@JsonClass(generateAdapter = true)` then define the class instance fields. We will be using `Moshi` to map JSON data to this class.


Here is the full code

```kotlin
package com.star_zero.pagingretrofitsample.data

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class Repo(
    @Json(name = "id")
    val id: String,
    @Json(name = "full_name")
    val fullName: String
)
```

**(d). `AppModule.kt`**

Create a file named `AppModule.kt`


Here is the full code

```kotlin
package com.star_zero.pagingretrofitsample.di

import com.star_zero.pagingretrofitsample.api.GitHubAPI
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory

@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    @Provides
    fun provideApi(): GitHubAPI {
        val okhttp = OkHttpClient.Builder()
            .addInterceptor(HttpLoggingInterceptor().apply {
                setLevel(HttpLoggingInterceptor.Level.BASIC)
            })
            .build()

        val retrofit = Retrofit.Builder()
            .client(okhttp)
            .baseUrl("https://api.github.com")
            .addConverterFactory(MoshiConverterFactory.create())
            .build()

        return retrofit.create(GitHubAPI::class.java)
    }
}
```

**(e). `RepoPagingSource.kt`**

Create a file named `RepoPagingSource.kt`. This is our paging class. Extend the ` androidx.paging.PagingSource` and override the `load()` and `getRefreshKey()` to help us do our pagination.


Here is the full code

```kotlin
package com.star_zero.pagingretrofitsample.paging

import androidx.paging.PagingSource
import androidx.paging.PagingState
import com.star_zero.pagingretrofitsample.api.GitHubAPI
import com.star_zero.pagingretrofitsample.data.Repo
import timber.log.Timber

class RepoPagingSource(
    private val api: GitHubAPI
) : PagingSource<Int, Repo>() {

    override suspend fun load(params: LoadParams<Int>): LoadResult<Int, Repo> {
        return try {
            val page = params.key ?: 1
            val response = api.repos("google", page, params.loadSize)

            val repos = response.body()
            if (repos != null) {
                var next: Int? = null
                // Check if there is next page
                response.headers()["Link"]?.let { link ->
                    val regex = Regex("rel=\"next\"")
                    if (regex.containsMatchIn(link)) {
                        next = page + 1
                    }
                }
                LoadResult.Page(
                    data = repos,
                    prevKey = null,
                    nextKey = next
                )
            } else {
                LoadResult.Page(
                    data = emptyList(),
                    prevKey = null,
                    nextKey = null
                )
            }
        } catch (e: Exception) {
            Timber.w(e)
            LoadResult.Error(e)
        }
    }

    override fun getRefreshKey(state: PagingState<Int, Repo>): Int? {
        return null
    }
}
```

**(f). `MainActivity.kt`**

Create a file named `MainActivity.kt`. This is our MainActivity class.


Here is the full code

```kotlin
package com.star_zero.pagingretrofitsample.ui

import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.lifecycleScope
import androidx.paging.LoadState
import androidx.recyclerview.widget.DefaultItemAnimator
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.star_zero.pagingretrofitsample.R
import com.star_zero.pagingretrofitsample.databinding.ActivityMainBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    val isRefreshing = MutableLiveData<Boolean>()

    val isError = MutableLiveData<Boolean>()

    private val viewModel: MainViewModel by viewModels()

    private val adapter = RepoAdapter()

    @OptIn(ExperimentalCoroutinesApi::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
        binding.lifecycleOwner = this
        binding.activity = this

        binding.recycler.layoutManager = LinearLayoutManager(this)
        binding.recycler.addItemDecoration(
            DividerItemDecoration(
                this,
                DividerItemDecoration.VERTICAL
            )
        )
        // disable animation
        (binding.recycler.itemAnimator as? DefaultItemAnimator)?.supportsChangeAnimations = false

        binding.recycler.adapter = adapter.withLoadStateFooter(RepoLoadStateAdapter(adapter::retry))

        lifecycleScope.launch {
            viewModel.reposFlow.collectLatest {
                adapter.submitData(it)
            }
        }

        lifecycleScope.launch {
            adapter.loadStateFlow.collectLatest { loadState ->
                isRefreshing.value = loadState.refresh is LoadState.Loading
                isError.value = loadState.refresh is LoadState.Error
            }
        }
    }

    fun onRefresh() {
        adapter.refresh()
    }

    fun retry() {
        adapter.retry()
    }
}
```

**(g). `MainViewModel.kt`**

Create a file named `MainViewModel.kt`. This is our ViewModel class.

Here is the full code

```kotlin
package com.star_zero.pagingretrofitsample.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.paging.Pager
import androidx.paging.PagingConfig
import androidx.paging.cachedIn
import androidx.paging.map
import com.star_zero.pagingretrofitsample.api.GitHubAPI
import com.star_zero.pagingretrofitsample.paging.RepoPagingSource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.map
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(
    private val api: GitHubAPI
) : ViewModel() {

    val reposFlow = Pager(
        PagingConfig(pageSize = PAGE_SIZE, initialLoadSize = PAGE_SIZE)
    ) {
        RepoPagingSource(api)
    }.flow
        .map { pagingData ->
            pagingData.map {
                UiModel(
                    it.id,
                    it.fullName
                )
            }
        }.cachedIn(viewModelScope)

    companion object {
        private const val PAGE_SIZE = 20
    }
}
```

**(h). `RepoAdapter.kt`**

Create a file named `RepoAdapter.kt`. This is our github repositories adapter. Extend the `PagingDataAdapter`. Override the `onCreateViewHolder` and `onBindViewHolder`.


Here is the full code

```kotlin
package com.star_zero.pagingretrofitsample.ui

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.paging.PagingDataAdapter
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.star_zero.pagingretrofitsample.databinding.ItemRepoBinding

class RepoAdapter : PagingDataAdapter<UiModel, RepoAdapter.ViewHolder>(DIFF_CALLBACK) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemRepoBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val model = getItem(position)
        holder.bind(getItem(position)) {
            model?.let {
                it.favorite = !it.favorite
                notifyItemChanged(position)
            }
        }
    }

    class ViewHolder(private val binding: ItemRepoBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(model: UiModel?, onClickFav: () -> Unit) {
            binding.model = model
            if (model == null) {
                binding.buttonFav.setOnClickListener(null)
            } else {
                binding.buttonFav.setOnClickListener {
                    onClickFav()
                }
            }
            binding.executePendingBindings()
        }
    }

    companion object {
        val DIFF_CALLBACK = object : DiffUtil.ItemCallback<UiModel>() {
            override fun areItemsTheSame(oldItem: UiModel, newItem: UiModel): Boolean {
                return oldItem.id == newItem.id
            }

            override fun areContentsTheSame(oldItem: UiModel, newItem: UiModel): Boolean {
                return oldItem == newItem
            }
        }
    }
}

```

**(i). `RepoLoadStateAdapter.kt`**

Create a file named `RepoLoadStateAdapter.kt`. This is our loading state adapter. Extend the `LoadStateAdapter`.

Here is the full code

```kotlin
package com.star_zero.pagingretrofitsample.ui

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.paging.LoadState
import androidx.paging.LoadStateAdapter
import androidx.recyclerview.widget.RecyclerView
import com.star_zero.pagingretrofitsample.databinding.ItemRepoLoadStateBinding

class RepoLoadStateAdapter(
    private val retry: () -> Unit
) : LoadStateAdapter<RepoLoadStateAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, loadState: LoadState): ViewHolder {
        val binding = ItemRepoLoadStateBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, loadState: LoadState) {
        holder.bind(loadState, retry)
    }

    class ViewHolder(
        private val binding: ItemRepoLoadStateBinding
    ) : RecyclerView.ViewHolder(binding.root) {

        fun bind(loadState: LoadState, retry: () -> Unit) {
            binding.isLoading = loadState is LoadState.Loading
            binding.isError = loadState is LoadState.Error

            binding.buttonRetry.setOnClickListener {
                retry()
            }
            binding.executePendingBindings()
        }
    }
}
```

**(j). `UiModel.kt`**

Create a file named `UiModel.kt`. This is our UI model class.

Here is the full code

```kotlin
package com.star_zero.pagingretrofitsample.ui

data class UiModel(
    val id: String,
    val fullName: String,
    var favorite: Boolean = false
)
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

1. [Download](https://github.com/StartSTAR-ZERO/paging-retrofit-sample-master/archive/refs/heads/master.zip) code or Browse [here](https://github.com/StartSTAR-ZERO/paging-retrofit-sample).
2. [Follow](https://github.com/StartSTAR-ZERO/) code author.



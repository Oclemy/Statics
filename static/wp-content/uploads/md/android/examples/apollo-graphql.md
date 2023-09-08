# Kotlin Android Apollo GraphQL Example

In this example you will learn simple Apollo GraphQL client usage in android. We write our example in Kotlin in android studio.


### What is Apollo?

> It is a platform for building a supergraph, a unified network of all your data, services, and capabilities that connects to your application clients (such as web and native apps). At the heart of the supergraph is a query language called GraphQL. There are different flavors of Apollo. For Example Apollo for React, Apollo of iOS and Apollo for Kotlin. In this lesson, we look at Apollo Kotlin.

### How do you integrate Apollo to your app.

If you are on android, use Apollo Kotlin. If you are on iOS, use Apollo iOS. If you are on the web you can use Apollo React.

Apollo Kotlin was formerly known as Apollo Android. It is the best way to integrate GraphQL in your android app. Apollo Kotlin provides a flexible and easy-to-use API for integrating GraphQL with your app.

Apollo Android is an open source library that helps you build a GraphQL client for your Android app. It was designed to help you build an app with a flexible data model, provide offline capabilities, and handle authentication and authorization.


### What is Apollo Kotlin?

> Apollo is a GraphQL client for Android that helps developers create a data-driven application.

Apollo gives the user the ability to design their own queries and mutations, as well as import them from any other GraphQL server. Apollo also provides a set of tools to help with building and maintaining complex applications, such as:

- Data loading with caching
- Offline support
- A query language
- A smart cache
- Type safety

Apollo Kotlin was previously called Apollo Android. It is a GraphQL client that generates Kotlin and Java models from GraphQL queries.

Apollo Kotlin executes queries and mutations against a GraphQL server. This returns results as query-specific Kotlin types. Thus, you don't have to deal with parsing JSON. Not even passing around Maps and making clients cast values to the right type manually. You also don't have to write model types yourself. These are generated from the GraphQL definitions your UI uses.

Because generated types are query-specific, you can only access data that you actually specify as part of a query. If you don't ask for a particular field in a query, you can't access the corresponding property on the returned data structure.

This library is designed primarily with Android in mind, but you can use it in any Java/Kotlin app, including multiplatform.

Apollo tracks your GraphQL schemas in a registry to create a central source of truth for everything in your graph. 

Here are the features of Apollo:

*   Java and Kotlin Multiplatform code generation.
*   Queries, Mutations and Subscriptions.
*   Reflection-free parsing.
*   Normalized cache.
*   Custom scalar types.
*   HTTP cache.
*   Auto Persisted Queries.
*   Query batching.
*   File uploads.
*   Espresso IdlingResource.
*   Fake models for tests.
*   AppSync and graphql-ws websockets.
*   GraphQL AST parser.

### What is GraphQL?

GraphQL is a query language for APIs which was introduced by Facebook in 2015. It allows clients to control the data they need from an API and to do so in a type-safe and efficient way.

GraphQL is an alternative to REST, which has been used as the standard for web APIs since 2000. It has been adopted by many companies including Github, Pinterest, Atlassian, Shopify and Coursera.


## Example 1: Apollo GraphQL Client Example

This first example will teach you how to setup Apollo GraphQL and connect to the server.

Here is the demo of the created project:

![Apollo GraphQL Example Android](https://github.com/amanjeetsingh150/kotlin-android-examples/blob/master/ApolloGraphQLExample/apollo.gif?raw=true)

### Step 1: Create Project

Open your android studio and create a new project.

### Step 2: Add Dependencies

We need to add two dependencies to be able to use Apollo: the Apollo Runtime and Apollo Android support:

```groovy
    implementation "com.apollographql.apollo:apollo-runtime:$apolloPluginVersion"
    implementation "com.apollographql.apollo:apollo-android-support:$apolloPluginVersion"
```

### Step 3: Design Layouts

One layout will be included in the other.

**repo_layout.xml**

This will be included in the `activity_main.xml`. Add ImageView, EditTexts, TextViews and a Button:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:id="@+id/github_image_view"
        android:layout_width="150dp"
        android:layout_height="150dp"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="10dp"
        android:elevation="10dp"
        android:src="@drawable/github_icon"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <EditText
        android:id="@+id/repo_name_edittext"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginEnd="10dp"
        android:layout_marginStart="10dp"
        android:layout_marginTop="15dp"
        android:hint="@string/repository_name"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/github_image_view" />

    <EditText
        android:id="@+id/owner_name_edittext"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginEnd="10dp"
        android:layout_marginStart="10dp"
        android:layout_marginTop="15dp"
        android:hint="@string/owner_name_hint"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/repo_name_edittext" />

    <Button
        android:id="@+id/button_find"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="5dp"
        android:text="@string/button_text"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/owner_name_edittext" />

    <androidx.cardview.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginEnd="5dp"
        android:layout_marginStart="5dp"
        android:layout_marginTop="5dp"
        android:elevation="@dimen/cardview_default_elevation"
        app:cardCornerRadius="@dimen/cardview_default_radius"
        app:cardElevation="@dimen/cardview_default_elevation"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button_find">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical">

            <ProgressBar
                android:id="@+id/progress_bar"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:visibility="gone"
                android:layout_gravity="center_vertical|center_horizontal" />

            <TextView
                android:id="@+id/name_text_view"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_margin="5dp"
                android:fontFamily="serif"
                android:textColor="@android:color/black"
                android:textSize="18sp"
                tools:text="Name: ButterKnife" />

            <TextView
                android:id="@+id/description_text_view"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_margin="5dp"
                android:fontFamily="serif"
                android:textColor="@android:color/black"
                android:textSize="18sp"
                tools:text="Description: Library for View Binding" />

            <TextView
                android:id="@+id/forks_text_view"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_margin="5dp"
                android:fontFamily="serif"
                android:textColor="@android:color/black"
                android:textSize="18sp"
                tools:text="Forks:3011" />

            <TextView
                android:id="@+id/url_text_view"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_margin="5dp"
                android:fontFamily="serif"
                android:textColor="@android:color/black"
                android:textSize="18sp"
                tools:text="URL: http://github.com/" />

        </LinearLayout>

    </androidx.cardview.widget.CardView>
</androidx.constraintlayout.widget.ConstraintLayout>
```

**activity_main.xml**

Add the following code in this layout. Our root layout element is CoordinatorLayout. We have an AppBarLayout, CollapsingToolbarLayout, NestedScrollView and TextView as widgets.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:card_view="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:id="@+id/coordinator_layout"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true">

    <com.google.android.material.appbar.AppBarLayout
        android:id="@+id/app_bar_layout"
        android:layout_width="match_parent"
        android:layout_height="200dp"
        android:background="@color/colorPrimary"
        android:fitsSystemWindows="true"
        app:expandedTitleMarginEnd="50dp"
        android:alpha="0.9"
        app:expandedTitleMarginStart="20dp">

        <com.google.android.material.appbar.CollapsingToolbarLayout
            android:id="@+id/collapsing_toolbar"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:fitsSystemWindows="true"
            app:contentScrim="@color/colorPrimary"
            app:layout_scrollFlags="scroll|exitUntilCollapsed"
            app:statusBarScrim="@color/colorPrimary">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="@android:color/white"
                android:textSize="30sp"
                android:text="GITHUB GRAPHQL"
                android:layout_marginBottom="20dp"
                android:fontFamily="sans-serif"
                android:textStyle="italic|bold"
                android:layout_gravity="center"/>
        </com.google.android.material.appbar.CollapsingToolbarLayout>
    </com.google.android.material.appbar.AppBarLayout>

    <androidx.core.widget.NestedScrollView
        android:id="@+id/nested_scroll"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_marginEnd="10dp"
        android:layout_marginStart="10dp"
        android:clipToPadding="false"
        app:behavior_overlapTop="90dp"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <include layout="@layout/repo_layout" />

    </androidx.core.widget.NestedScrollView>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

### Step 4: Write GraphQL Query

Start by creating a folder inside the `app/src/main` called `graphql` and add the shown graphql query. The query will allow us find a repository in github. It takes an owner and repository name as parameters.

**/src/main/findRepo.graphql**

```graphql
query FindQuery($owner:String!,$name:String!){
  repository(owner:$owner, name:$name) {
    name
    description
    forkCount
    url
  }
}
```

**/src/main/schema.json**

Also download this [schema.json](https://github.com/amanjeetsingh150/kotlin-android-examples/blob/master/ApolloGraphQLExample/app/src/main/graphql/schema.json) file and add it to the same folder.

### Step 5: Write Code

Create an Extension method to show Toast message:

**Extension.kt**

```kotlin
import android.content.Context
import android.widget.Toast

fun Context.showToast(msg: String) {
    Toast.makeText(applicationContext, msg, Toast.LENGTH_SHORT).show()
}
```

Then proceed to **MainActivity.kt** and create a function that sets up our Apollo GraphQL client using OkHttp. The function will return `OkHttpClient`

```kotlin
    private fun setupApollo(): ApolloClient {
```

Then instantiate `OkHttp` using the Builder pattern:

```kotlin
        val okHttp = OkHttpClient
                .Builder()
```

Add an intercepror where you chain our request:

```kotlin
                .addInterceptor { chain ->
                    val original = chain.request()
                    val builder = original.newBuilder().method(original.method(),
                            original.body())
                    builder.addHeader("Authorization"
                            , "Bearer " + BuildConfig.AUTH_TOKEN)
                    chain.proceed(builder.build())
                }
```

Build the `OkHttpClient`:

```kotlin
                .build()
```

Finally specify the server URL, then the OkhttpClient, then build then return the `ApolloClient`:

```kotlin
        return ApolloClient.builder()
                .serverUrl(BASE_URL)
                .okHttpClient(okHttp)
                .build()
    }
```

Here is the full code:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.apollographql.apollo.ApolloCall
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.api.Response
import com.apollographql.apollo.exception.ApolloException
import kotlinx.android.synthetic.main.repo_layout.*
import okhttp3.OkHttpClient
import java.util.logging.Logger

class MainActivity : AppCompatActivity() {

    private lateinit var client: ApolloClient

    companion object {
        val Log = Logger.getLogger(MainActivity::class.java.name)
        private const val BASE_URL = "https://api.github.com/graphql"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        client = setupApollo()
        button_find.setOnClickListener {
            progress_bar.visibility = View.VISIBLE
            client.query(FindQuery
                    .builder()
                    .name(repo_name_edittext.text.toString())
                    .owner(owner_name_edittext.text.toString())
                    .build())
                    .enqueue(object : ApolloCall.Callback<FindQuery.Data>() {

                        override fun onFailure(e: ApolloException) {
                            Log.info(e.message.toString())
                        }

                        override fun onResponse(response: Response<FindQuery.Data>) {
                            Log.info(" " + response.data()?.repository())
                            runOnUiThread {
                                progress_bar.visibility = View.GONE
                                name_text_view.text = String.format(getString(R.string.name_text),
                                        response.data()?.repository()?.name())
                                description_text_view.text = String.format(getString(R.string.description_text),
                                        response.data()?.repository()?.description())
                                forks_text_view.text = String.format(getString(R.string.fork_count_text),
                                        response.data()?.repository()?.forkCount().toString())
                                url_text_view.text = String.format(getString(R.string.url_count_text),
                                        response.data()?.repository()?.url().toString())
                            }
                        }

                    })
        }

    }

    private fun setupApollo(): ApolloClient {
        val okHttp = OkHttpClient
                .Builder()
                .addInterceptor { chain ->
                    val original = chain.request()
                    val builder = original.newBuilder().method(original.method(),
                            original.body())
                    builder.addHeader("Authorization"
                            , "Bearer " + BuildConfig.AUTH_TOKEN)
                    chain.proceed(builder.build())
                }
                .build()
        return ApolloClient.builder()
                .serverUrl(BASE_URL)
                .okHttpClient(okHttp)
                .build()
    }
}
```

### Step 6: Add Permission

Add internet permission in your `AndroidManifest.xml`:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
```

### Run

Copy the code into your project or download the code in the reference links below.

### Reference

Find the reference links below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/ApolloGraphQLExample) code |
| 2. | [Follow](https://github.com/amanjeetsingh150) code author |

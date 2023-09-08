# News-API Example


> Android library for accessing News API. https://newsapi.org/.

### Step 1: Install it

Integrating the library into you app is extremely easy. A few changes in the build gradle and your all ready to use the library. Make the following changes.

Step 1. Add the JitPack repository to your build file. Add it in your root build.gradle at the end of repositories:

```groovy
allprojects {
  repositories {
    ...
    maven { url "https://jitpack.io" }
  }
}
```

Then Add the dependency:

```groovy
dependencies {
        implementation 'com.github.mukeshsolanki:News-API-Android:<latest-version>'
}
```

### Step 2: How to use the library?

Okay seems like you integrated the library in your project but **how do you use it**? Well its really easy just follow the steps below.

```kotlin
    ...
    NewsApi.initialize("YOUR_API_KEY")
    ...
    
    NewsApi.getSources(onSourcesListener = object :
                OnSourcesListener {
                override fun onSourcesResponse(sourcesResponse: SourcesResponse) {
                    Log.d("Response=>", sourcesResponse.toString())
                }
    
                override fun onError(apiError: ApiError?) {
                    Log.e("Response=>", apiError.toString())
                }
            })
    
```

Method and Parameters
---------------------

| Method | Use |
| --- | --- |
| `getSources` | This endpoint returns the subset of news publishers that top headlines (/v2/top-headlines) are available from. It's mainly a convenience endpoint that you can use to keep track of the publishers available on the API, and you can pipe it straight through to your users. |
| `getTopHeadlines` | This endpoint provides live top and breaking headlines for a country, specific category in a country, single source, or multiple sources. You can also search with keywords. Articles are sorted by the earliest date published first. This endpoint is great for retrieving headlines for display on news tickers or similar. |
| `getEverything` | Search through millions of articles from over 30,000 large and small news sources and blogs. This includes breaking news as well as lesser articles. This endpoint suits article discovery and analysis, but can be used to retrieve articles for display, too. |

> For more details on these method follow [this](https://newsapi.org/docs/endpoints)


### Full Example

#### App.kt

```kotlin
package `in`.madapps.newsapidemo

import android.app.Application
import org.newsapi.NewsApi

class App : Application() {
    override fun onCreate() {
        super.onCreate()
        NewsApi.initialize("YOUR_API_KEY")
    }
}

```

#### TopHeadlinesFragment.kt

```kotlin
package `in`.madapps.newsapidemo.fragment

import `in`.madapps.newsapidemo.R
import `in`.madapps.newsapidemo.adapter.ArticlesAdapter
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.fragment_top_headlines.*
import org.newsapi.NewsApi
import org.newsapi.listener.OnArticlesListener
import org.newsapi.model.ApiError
import org.newsapi.model.response.ArticlesResponse

class TopHeadlinesFragment : Fragment(), OnArticlesListener {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_top_headlines, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        NewsApi.getTopHeadlines(onArticlesListener = this, searchTerm = "trump")
    }

    override fun onArticlesResponse(articlesResponse: ArticlesResponse) {
        val adapter = ArticlesAdapter(articlesResponse.articles, context!!)
        topHeadlinesRecyclerView.setHasFixedSize(true)
        topHeadlinesRecyclerView.layoutManager = LinearLayoutManager(context)
        topHeadlinesRecyclerView.adapter = adapter
    }

    override fun onError(apiError: ApiError?) {
        Snackbar.make(topHeadlinesRootView, apiError?.message.toString(), Snackbar.LENGTH_SHORT)
            .show()
    }
}

```

#### SourcesFragment.kt

```kotlin
package `in`.madapps.newsapidemo.fragment

import `in`.madapps.newsapidemo.R
import `in`.madapps.newsapidemo.adapter.SourcesAdapter
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.fragment_sources.*
import org.newsapi.NewsApi
import org.newsapi.listener.OnSourcesListener
import org.newsapi.model.ApiError
import org.newsapi.model.response.SourcesResponse

class SourcesFragment : Fragment(), OnSourcesListener {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_sources, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        NewsApi.getSources(onSourcesListener = this)
    }

    override fun onSourcesResponse(sourcesResponse: SourcesResponse) {
        val adapter = SourcesAdapter(sourcesResponse.sources, context!!)
        sourcesRecyclerView.setHasFixedSize(true)
        sourcesRecyclerView.layoutManager = LinearLayoutManager(context)
        sourcesRecyclerView.adapter = adapter
    }

    override fun onError(apiError: ApiError?) {
        Snackbar.make(sourcesRootView, apiError?.message.toString(), Snackbar.LENGTH_SHORT).show()
    }
}

```

#### EverythingFragment.kt

```kotlin
package `in`.madapps.newsapidemo.fragment

import `in`.madapps.newsapidemo.R
import `in`.madapps.newsapidemo.adapter.ArticlesAdapter
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.fragment_everything.*
import org.newsapi.NewsApi
import org.newsapi.listener.OnArticlesListener
import org.newsapi.model.ApiError
import org.newsapi.model.response.ArticlesResponse

class EverythingFragment : Fragment(), OnArticlesListener {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_everything, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        NewsApi.getEverything(onArticlesListener = this, searchTerm = "dji")
    }

    override fun onArticlesResponse(articlesResponse: ArticlesResponse) {
        val adapter = ArticlesAdapter(articlesResponse.articles, context!!)
        everythingRecyclerView.setHasFixedSize(true)
        everythingRecyclerView.layoutManager = LinearLayoutManager(context)
        everythingRecyclerView.adapter = adapter
    }

    override fun onError(apiError: ApiError?) {
        Snackbar.make(everythingRootView, apiError?.message.toString(), Snackbar.LENGTH_SHORT)
            .show()
    }
}

```

#### ArticlesAdapter.kt

```kotlin
package `in`.madapps.newsapidemo.adapter

import `in`.madapps.newsapidemo.R
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import org.newsapi.model.Article

class ArticlesAdapter(private val articles: List<Article>, private val context: Context) :
    RecyclerView.Adapter<ArticlesAdapter.ArticleViewHolder>() {
    override fun onCreateViewHolder(viewGroup: ViewGroup, i: Int): ArticleViewHolder {
        return ArticleViewHolder(
            LayoutInflater.from(viewGroup.context).inflate(
                R.layout.articles_item_view, viewGroup, false
            )
        )
    }

    override fun onBindViewHolder(holder: ArticleViewHolder, position: Int) {
        val article = articles[position]
        Picasso.get().load(article.urlToImage).into(holder.articleImageView)
        holder.titleTextView.text = article.title
        holder.descriptionTextView.text = article.description
        holder.publishedAtTextView.text =
            String.format(context.getString(R.string.publishedAt), article.publishedAt)
        holder.itemView.setOnClickListener {
            val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(article.url))
            ContextCompat.startActivity(context, browserIntent, null)
        }
    }

    override fun getItemCount(): Int {
        return articles.size
    }

    class ArticleViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var articleImageView: ImageView = itemView.findViewById(R.id.articleImageView)
        var titleTextView: TextView = itemView.findViewById(R.id.titleTextView)
        var descriptionTextView: TextView = itemView.findViewById(R.id.descriptionTextView)
        var publishedAtTextView: TextView = itemView.findViewById(R.id.publishedAtTextView)
    }
}

```

#### SourcesAdapter.kt

```kotlin
package `in`.madapps.newsapidemo.adapter

import `in`.madapps.newsapidemo.R
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.content.ContextCompat.startActivity
import androidx.recyclerview.widget.RecyclerView
import org.newsapi.model.Source

class SourcesAdapter(private val sources: List<Source>, private val context: Context) :
    RecyclerView.Adapter<SourcesAdapter.SourcesViewHolder>() {
    override fun onCreateViewHolder(viewGroup: ViewGroup, i: Int): SourcesViewHolder {
        return SourcesViewHolder(
            LayoutInflater.from(viewGroup.context).inflate(
                R.layout.sources_item_view, viewGroup, false
            )
        )
    }

    override fun onBindViewHolder(holder: SourcesViewHolder, position: Int) {
        val source = sources[position]
        holder.nameTextView.text =
            String.format(context.getString(R.string.name), source.name)
        holder.descriptionTextView.text =
            String.format(context.getString(R.string.description), source.description)
        holder.categoryTextView.text =
            String.format(context.getString(R.string.category), source.category)
        holder.languageTextView.text =
            String.format(context.getString(R.string.language), source.language)
        holder.countryTextView.text =
            String.format(context.getString(R.string.country), source.country)
        holder.itemView.setOnClickListener {
            val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(source.url))
            startActivity(context, browserIntent, null)
        }
    }

    override fun getItemCount(): Int {
        return sources.size
    }

    class SourcesViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var nameTextView: TextView = itemView.findViewById(R.id.nameTextView)
        var descriptionTextView: TextView = itemView.findViewById(R.id.descriptionTextView)
        var categoryTextView: TextView = itemView.findViewById(R.id.categoryTextView)
        var languageTextView: TextView = itemView.findViewById(R.id.languageTextView)
        var countryTextView: TextView = itemView.findViewById(R.id.countryTextView)
    }
}

```

#### ViewPagerAdapter.kt

```kotlin
package `in`.madapps.newsapidemo.adapter


import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import java.util.*

class ViewPagerAdapter(manager: FragmentManager?) :
    FragmentPagerAdapter(manager!!, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {
    private val mFragmentList: MutableList<Fragment> = ArrayList()

    override fun getItem(position: Int): Fragment {
        return mFragmentList[position]
    }

    override fun getCount(): Int {
        return mFragmentList.size
    }

    fun addFragment(fragment: Fragment) {
        mFragmentList.add(fragment)
    }
}

```

#### MainActivity.kt

```kotlin
package `in`.madapps.newsapidemo.activity

import `in`.madapps.newsapidemo.R
import `in`.madapps.newsapidemo.adapter.ViewPagerAdapter
import `in`.madapps.newsapidemo.fragment.EverythingFragment
import `in`.madapps.newsapidemo.fragment.SourcesFragment
import `in`.madapps.newsapidemo.fragment.TopHeadlinesFragment
import android.annotation.SuppressLint
import android.os.Bundle
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager.widget.ViewPager.OnPageChangeListener
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    var sourceFragment: SourcesFragment? = null
    var topHeadlinesFragment: TopHeadlinesFragment? = null
    var everythingFragment: EverythingFragment? = null
    var prevMenuItem: MenuItem? = null

    @SuppressLint("CheckResult")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setupNavigation()
        setupViewPager()
    }

    private fun setupViewPager() {
        viewPager.addOnPageChangeListener(object : OnPageChangeListener {
            override fun onPageScrolled(
                position: Int,
                positionOffset: Float,
                positionOffsetPixels: Int
            ) {
            }

            override fun onPageSelected(position: Int) {
                if (prevMenuItem != null) {
                    prevMenuItem!!.isChecked = false
                } else {
                    bottomNavigationView.menu.getItem(0).isChecked = false
                }
                bottomNavigationView.menu.getItem(position).isChecked = true
                prevMenuItem = bottomNavigationView.menu.getItem(position)
            }

            override fun onPageScrollStateChanged(state: Int) {}
        })
        val adapter = ViewPagerAdapter(supportFragmentManager)
        sourceFragment = SourcesFragment()
        topHeadlinesFragment = TopHeadlinesFragment()
        everythingFragment = EverythingFragment()
        adapter.addFragment(sourceFragment!!)
        adapter.addFragment(topHeadlinesFragment!!)
        adapter.addFragment(everythingFragment!!)
        viewPager.adapter = adapter
    }

    private fun setupNavigation() {
        bottomNavigationView.setOnNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.sources -> viewPager.currentItem = 0
                R.id.topHeadlines -> viewPager.currentItem = 1
                R.id.everything -> viewPager.currentItem = 2
            }
            false
        }
    }
}

```

### Reference

Read more [here](https://github.com/mukeshsolanki/News-API-Android).

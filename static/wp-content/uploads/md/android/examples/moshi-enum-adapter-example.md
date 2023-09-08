# Convert To and From JSON using Moshi


> This example will show you how to convert to and from JSON using Moshi.

The example is written in Kotlin and is easy to understand.

### Step 1: Install Moshi

Start by installing Moshi by adding the following dependencies in your `app/build.gradle`:

```groovy
    implementation "com.squareup.moshi:moshi:1.12.0"
    implementation "com.squareup.moshi:moshi-adapters:1.12.0"
    kapt "com.squareup.moshi:moshi-kotlin-codegen:1.12.0"
```

### Step 2:  Desigin Layout

The next step is two design a layout with two buttons: one to convert to JSON, the other from JSON:

**activity_main.xml**


```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/button_to_json"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="TO JSON"
        app:layout_constraintBottom_toTopOf="@+id/button_from_json"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_chainStyle="packed" />

    <Button
        android:id="@+id/button_from_json"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:text="FROM JSON"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button_to_json" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

### Step 3: Extend the `JsonAdapter.Factory`

Create our `MoshiEnumAdapterFactory` by extending the `JsonAdapter.Factory` as follows:

```kotlin
package com.star_zero.moshi.enumadapter

import com.squareup.moshi.JsonAdapter
import com.squareup.moshi.Moshi
import com.squareup.moshi.adapters.EnumJsonAdapter
import com.squareup.moshi.rawType
import java.lang.reflect.Type

annotation class MoshiEnumFallback

/**
 * Annotating @MoshiEnumFallback will automatically add a fallback when an unknown value comes in the Enum.
 */
class MoshiEnumAdapterFactory : JsonAdapter.Factory {

    @Suppress("TYPE_MISMATCH_WARNING", "UNCHECKED_CAST")
    override fun create(
        type: Type,
        annotations: MutableSet<out Annotation>,
        moshi: Moshi
    ): JsonAdapter<*>? {
        val rawType = type.rawType
        if (!Enum::class.java.isAssignableFrom(rawType)) {
            return null
        }

        var fallbackEnum: Enum<*>? = null

        rawType.enumConstants.forEach {
            val enumElement = it as Enum<*>
            val fallback =
                rawType.getField(enumElement.name).getAnnotation(MoshiEnumFallback::class.java)
            if (fallback != null) {
                fallbackEnum = enumElement
                return@forEach
            }
        }

        return if (fallbackEnum == null) {
            EnumJsonAdapter.create(type as Class<Enum<*>>)
        } else {
            EnumJsonAdapter.create(type as Class<Enum<*>>).withUnknownFallback(fallbackEnum)
        }
    }
}

```

### Step 4: Create Model class and MainActivity

Create them as follows:

**MainActivity.kt**

```kotlin
package com.star_zero.moshi.enumadapter

import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import com.squareup.moshi.Moshi

@JsonClass(generateAdapter = true)
data class Sample(
    @Json(name = "id")
    val id: Int,
    @Json(name = "name")
    val name: String,
    @Json(name = "type")
    val type: Type,
    @Json(name = "kind")
    val kind: Kind,
)

@JsonClass(generateAdapter = false)
enum class Type {
    @Json(name = "a")
    A,

    @Json(name = "b")
    B,

    @MoshiEnumFallback
    @Json(name = "unknown")
    UNKNOWN
}

@JsonClass(generateAdapter = false)
enum class Kind {
    @MoshiEnumFallback
    @Json(name = "foo")
    Foo,

    @Json(name = "bar")
    Bar,
}

class MainActivity : AppCompatActivity() {

    private val moshi = Moshi.Builder()
        .add(MoshiEnumAdapterFactory())
        .build()

    private val moshiAdapter = moshi.adapter(Sample::class.java)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        findViewById<Button>(R.id.button_to_json).setOnClickListener {
            toJson()
        }

        findViewById<Button>(R.id.button_from_json).setOnClickListener {
            fromJson()
        }
    }

    private fun toJson() {
        val sample = Sample(1, "sample", Type.A, Kind.Bar)
        val json = moshiAdapter.toJson(sample)
        Log.d(TAG, "json = $json")
    }

    private fun fromJson() {
        val json1 = "{\"id\":1,\"name\":\"sample\",\"type\":\"a\",\"kind\":\"bar\"}"
        val sample1 = moshiAdapter.fromJson(json1)

        // unknown value
        val json2 = "{\"id\":1,\"name\":\"sample\",\"type\":\"c\",\"kind\":\"piyo\"}"
        val sample2 = moshiAdapter.fromJson(json2)

        Log.d(TAG, "sample1 = $sample1")
        Log.d(TAG, "sample2 = $sample2")
    }

    companion object {
        private val TAG = MainActivity::class.java.simpleName
    }
}

```


### Reference

> Download full code [here](https://github.com/STAR-ZERO/sample-moshi-enum-adapter/archive/refs/heads/main.zip).
> Follow code author [here](https://github.com/STAR-ZERO/).

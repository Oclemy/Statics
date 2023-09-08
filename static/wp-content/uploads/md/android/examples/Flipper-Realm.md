# Flipper-Realm


> Android Realm database driver for Facebook  [Flipper](https://github.com/facebook/flipper).

Because of breaking changes between [Realm](https://github.com/realm/realm-java) versions driver is split into two versions:

*   **2.+** for **Realm 7.+** and **Realm 10.+** (from 2.1.0 available on mavenCentral)
*   **1.+** for **Realm 5.+** and **Realm 6.+** (legacy version still available on jcenter)

### Features

*   Displaying data from Realm database
*   Displaying database structure

### Step 1: Installation

*   Configure [Flipper](https://fbflipper.com/docs/getting-started.html)
*   Top level gradle:

```groovy
allprojects {
    repositories {
        ...
        mavenCentral()
    }
}
```

*   Dependency:

```groovy
implementation "com.kgurgul.flipper:flipper-realm-android:2.1.0"
```

*   Instantiate and add plugin to the FlipperClient. All your RealmConfigurations should be passed to RealmDatabaseProvider:

```kotlin
client.addPlugin(
    DatabasesFlipperPlugin(
        RealmDatabaseDriver(
            this,
            object : RealmDatabaseProvider {
                override fun getRealmConfigurations(): List<RealmConfiguration> {
                    return listOf(yourRealmConfiguration)
            }
        })
    )
)
```

### Step 2: Usage

Open Flipper app and enable Database plugin

[![](/kamgurgul/Flipper-Realm/raw/master/info/flipper.png)](/kamgurgul/Flipper-Realm/blob/master/info/flipper.png)



### Full Example

Here is a full example:

#### Layout

**(a). activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

#### Models

Model classes:

**(a). Test1.kt**

```kotlin
package com.kgurgul.flipper.realm.model

import io.realm.RealmObject
import io.realm.annotations.PrimaryKey

open class Test1(
    @PrimaryKey
    var id: Long = 0
) : RealmObject() {
    var nameTest: String? = null
    var intTest: Int? = null
    var booleanTest: Boolean? = null
    var floatTest: Float? = null
    var doubleTest: Double? = null
}

```

**(b). Test2.kt**

```kotlin
package com.kgurgul.flipper.realm.model

import io.realm.RealmList
import io.realm.RealmObject

open class Test2 : RealmObject() {
    var colorName: String? = null
    var colorValue: Int? = null
    var test1: Test1? = null
    var listTest: RealmList<Test1>? = null
    var listStringTest: RealmList<String>? = null
}

```

#### Application and Activity

Model classes:

**(a). MainActivity.kt**

```kotlin
package com.kgurgul.flipper.realm

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.kgurgul.flipper.realm.model.Test1
import com.kgurgul.flipper.realm.model.Test2
import io.realm.Realm
import io.realm.RealmList
import io.realm.kotlin.createObject

class MainActivity : AppCompatActivity() {

    private lateinit var realm: Realm

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        realm = Realm.getDefaultInstance()
        realm.executeTransaction { realm ->
            realm.deleteAll()
        }

        realm.executeTransaction { realm ->
            for (i in 0 until 200) {
                val test1 = realm.createObject<Test1>(i)
                test1.nameTest = "Name test"
                test1.intTest = 10 + i
                test1.booleanTest = i % 2 == 0
                test1.floatTest = 11.11f + i
                test1.doubleTest = 12.12 + i
            }

            val test2 = realm.createObject<Test2>()
            test2.colorName = "Color name"
            test2.colorValue = 20

            val test3 = realm.createObject<Test2>()
            test3.colorName = "Color name 2"
            test3.colorValue = 30
            test3.listTest = RealmList(realm.createObject(1000))
            test3.listStringTest = RealmList("Abc", "Cdf")
        }
    }


    override fun onDestroy() {
        super.onDestroy()
        realm.close()
    }
}

```

**(b). App.kt**

```kotlin
package com.kgurgul.flipper.realm

import android.app.Application
import com.facebook.flipper.android.AndroidFlipperClient
import com.facebook.flipper.android.utils.FlipperUtils
import com.facebook.flipper.plugins.databases.DatabasesFlipperPlugin
import com.facebook.flipper.plugins.inspector.DescriptorMapping
import com.facebook.flipper.plugins.inspector.InspectorFlipperPlugin
import com.facebook.soloader.SoLoader
import com.kgurgul.flipper.RealmDatabaseDriver
import com.kgurgul.flipper.RealmDatabaseProvider
import io.realm.Realm
import io.realm.RealmConfiguration

class App : Application() {

    override fun onCreate() {
        super.onCreate()

        SoLoader.init(this, false)

        Realm.init(this)
        val realmConfiguration = RealmConfiguration.Builder()
            .name("testRealm")
            .schemaVersion(1)
            .deleteRealmIfMigrationNeeded()
            .allowWritesOnUiThread(true)
            .build()
        Realm.setDefaultConfiguration(realmConfiguration)

        if (BuildConfig.DEBUG && FlipperUtils.shouldEnableFlipper(this)) {
            val client = AndroidFlipperClient.getInstance(this)
            client.addPlugin(InspectorFlipperPlugin(this, DescriptorMapping.withDefaults()))
            client.addPlugin(
                DatabasesFlipperPlugin(
                    RealmDatabaseDriver(
                        this,
                        object : RealmDatabaseProvider {
                            override fun getRealmConfigurations(): List<RealmConfiguration> {
                                return listOf(realmConfiguration)
                            }
                        })
                )
            )
            client.start()
        }
    }
}

```

### Reference

> Read more [here](https://github.com/kamgurgul/Flipper-Realm).
> Download code [here](https://github.com/kamgurgul/Flipper-Realm/archive/refs/heads/master.zip).
> Follow code author [here](https://github.com/kamgurgul/).

# CoronaVirus News App - Kotlin + MVVM + Firebase + Cloud Storage + Authentication

CoronaVirus, officially labelled Covid-19 is ravaging the world. Every single human being is being affected somehow. Our lives, even as programmers are being affected. So as a developer I thought about what I can do to help in this fight. Am not medically trained nor am I any sort of virologist. However as a programmer, I can help bring more awareness to people. What if we create an app that allows users to receive realtime CoronaVirus updates right on there phones.

The app is professionally designed and works across all android devices starting from API level 19. This app can also be used as a template for creating full apps by students. We've specifically designed the code to be high quality and easy to read.


Here is the demo:

![](https://camposha.info/wp-content/uploads/2020/04/demo_coronavirus_app_firebase.gif)

### What You Will Learn

If you plan on learning full app creation then this app may be for you. Here are the skills and techniques you can learn from this app:

**(a). Language: Kotlin Programming Language**

The app is built using Kotlin. Right now Kotlin is the defacto programming language for Android. And it will continue being one for the foreseable future. If you are an experienced Java developer and you start spending some time with Kotlin, then you will slowly starting seeing why this language has been creating a buzz among developers. The best way to learn Kotlin is try to modify a well designed project.

**(b). Design Pattern: MVVM**

These days there are techniques for properly designing an android app. Android Engineers have actually given us standardized APIs that facilitate this. APIs that allow us design our app using clean architecture. Some of these APIs include:'

1. LiveData
2. ViewModel

We implement the Model View ViewModel(MVVM) design pattern. The advantage is having a well architected app that is easy to maintain, test and extend.

**(c). Firebase Realtime Database**

We use the popular cloud database by Google: Firebase Realtime Database. This is our main database and will store the text components of our app. It is realtime and supports offline first capabilities as we will see later on. You will also learn how to perform full CRUD operations on Firebase Realtime Database in this app. Creating or Publishing News, Reading or Downloading News, Updating News as well as Deleting News.

**(d). Firebase Cloud Storage**

Our images will be stored in Firebase Cloud Storage. You will see how to upload images, save their links in realtime database, then download those images and render them in our app. Also you will see how to update and delete them.

**(e). Firebase Authentication**

We will authenticate our publishers and editors. Basically the app can be used in both authenticated and unauthenticated modes. Authenticated modes involve users authenticating themselves using both email and passwords. These users will be our publishers and editors and we will have to add them in Firebase console first. You can add as many admins and editors as you like. However the public can use the app without publishing or editing news. They can only browse through the news.

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Dashboard-LoginBtn.png)

**(f). Camera and ImagePicker support**

Our publishers will have three options of acquiring images:

1. Direct capture from the camera.
2. Picking images from the gallery.
3. Picking images from the file manager.

This makes it quite easy to acquire the optional images to be associated with a news item. The images will then be uploaded to firebase cloud storage and their urls stored in firebase realtime database.

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Image-Options.png)

**(g). Runtime Permissions with Dexter**

In this project we also show you how to implement runtime permissions with Dexter, one of the most popular runtime permissions library for android. Through Dexter you can check runtime permissions and give user the chance of opening the setting dialog to assign permissions. Runtime permissions are of course applicable to API 23. Obviously prior to that we simply need the good old Android Manifest permissions, which we do implement as well.

## How to Install Firebase

Well as we said, we are using Firebase Realtime Database and Firebase Cloud Storage to store our data. Text are stored in Firebase realtime database while images in firebase cloud storage. Let's see how to install firebase realtime database and firebase cloud storage. Start by adding the following in your app level build.gradle file:

```groovy
    //Firebase dependencies
    implementation 'com.google.firebase:firebase-database:19.1.0'
    implementation 'com.google.firebase:firebase-storage:19.1.0'
```

Below the dependencies closure, apply our google services plugin:

```groovy
dependencies
    //Your dependencies
}

//Now apply plugin.
apply plugin: 'com.google.gms.google-services'
```

If you forget the above then you will be getting FirebaseApp not initialized errors at runtime.

Now go to your root-level build.gradle:

```groovy
buildscript {
    repositories {
        //repositories here

    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.6.1'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        //add google services class path
        classpath 'com.google.gms:google-services:4.3.2'
    }
}
```

And add the google services classpath as specified above. Versions may differ.

Now you need to create a firebase app in the firebase console. Luckily, you can do this easily using android studio.

From android studio menu bar, choose Tools --> Firebase

A Firebase Asssitant will be shown like below, so choose Firebase Realtime Database.

![](https://camposha.info/wp-content/uploads/2020/03/choose_firebase_realtime_database.png)

Then Click Connect To Firebase button.

![](https://camposha.info/wp-content/uploads/2020/03/connect_your_app_to_firebase.png)

A Firebase Connection Dialog will be shown. If you don't have a project create a new one, otherwise you can use an existing one.

![](https://camposha.info/wp-content/uploads/2020/03/firebase_connection_dialog.png)

Once you have your project created, go and enable public writing so that your app can write to and read from your database without any authentication. Go to your firebase console in the browser, and under the Firebase realtime database, under the Rules tab, allow read and writes as below:

![](https://camposha.info/wp-content/uploads/2020/03/firebase_allow_public_write_reads.png)

### How to Enable Kotlin

Yeah we are using Kotlin so we've gotta add it as a dependency. In our build.gradle's dependencies closure,we will add:

```groovy
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.0.2'
```

We will also need to apply two plugins at the top our app level's build.gradle:

```groovy
apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'
```

Then in the root level build.gradle, we need to add the following classpath under the dependencies closure:

```groovy
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
```

In the same root build.gradle file, you need to specify the kotlin version:

```groovy
    ext.kotlin_version = '1.3.61'
```

You do this in the same buildscript closure:

```groovy
buildscript {
    ext.kotlin_version = '1.3.61'
    //continue
```

How to Enable Jitpack

Some third party libraries will be hosted in jcenter which android studio uses as the default repository. However some will be fetched from jitpack. Thus we need to register jitpack also as a repository. Then if gradle fails to find any of our third part dependencies from maven, it will search in jitpack.

```groovy
allprojects {
    repositories {
        google()
        jcenter()
        maven { url "https://jitpack.io" }
    }
}
```

### How to Enable Data Binding

We intend to utilize data binding in our Java project. This eliminates the boilerplate findViewById() calls. We can simple bind our model classes directly to textviews or edittexts. We can still access the widgets when we need to do something custom to them.

To enable data binding, all you need to do is add the following in your android closure in the app level build.gradle:

```groovy
    dataBinding {
        enabled = true
    }
```

### How to enable and Use androidx Libraries

AndroidX package structure to make it clearer which packages are bundled with the Android operating system, and which are packaged with your app's APK. We will be using androidx libraries.

First go to gradle.properties file and add the following

```groovy
android.useAndroidX=true
```

Then add androidx libraries:

```groovy
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    implementation 'androidx.recyclerview:recyclerview:1.0.0'
    implementation 'com.google.android.material:material:1.0.0'
    implementation 'androidx.cardview:cardview:1.0.0'
```

### How to Install and use Lifecycle Components

These components include the LiveData and ViewModel classes that are vital to the MVVM design pattern we are using. Let's install them:

```groovy
    // Lifecycle components
    implementation 'androidx.lifecycle:lifecycle-extensions:2.1.0'
    annotationProcessor 'androidx.lifecycle:lifecycle-compiler:2.1.0'
```

### Programmatically Defining a News item

Let's start coding by defining what we mean by a News item. We do this not in English but a language called Kotlin. The news to us will have the following properties:

1. Key - To identify a single news item from other news items.
2. Title
3. Content
4. Country
5. Tag
6. Date of publishing
7. Date updated
8. Views count
9. Image

Here is how we do that in Kotlin:

```kotlin
/**
 * Our News Class. It's roles are:
 * 1. Define the properties of our News item.
 * 2. Assign Default News values using the elvis operator
 */
class News : Serializable {
    var title: String? = ""
    var content: String? = ""
    var country: String? = ""
    var tags: String? = ""
    var datePublished: String? = ""
    var dateUpdated: String? = ""
    var views: String? = "0"
    var publisher: String? = ""
    var imageURL: String? = ""

    @get:Exclude
    @set:Exclude
    var key: String? = ""

    override fun toString(): String {
        return title!!
    }

}
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-DetailPage.png)

### Programmatically Defining Our Publish/Read/Update/Delete Process

We will be publishing our news. Or updating, reading and deleting. We will be doing these against our Firebase Realtime Database and Cloud storage. We need to define a simple class to represent operations like these.

```kotlin
/**
 * This class will represent a single request or Firebase operation
 */
class RequestCall {
    //A single request will have the following attributes
    var status = 0
    var message: String = "NO MESSAGE"
    var news: List<News> = ArrayList()

}
```

The status represents the status of the operation. It can be succeeded,in_progress or failed. The message is the message associated with the operation. Like a success message, progress message or failure message. Then lastly we have the downloaded news.

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Published-successfully.png)

### Writing Firebase Logic

We will have probably a class you will spend most of your time trying to understand. This class is our repository class. We will call it `GeneralRepository`. This class will contain the logic for interacting with Firebase Realtime Database, Firebase Cloud Storage and Firebas Authentication. Then those logic will be exposed by our ViewModel class which we will talk about later.

Here are the operations we will define logic for:

1. Fetching/Downloading Data From Firebase Realtime database(and cloud storage of course).
2. Publishing News text or Updating existing news when completely offline.
3. Posting text to firebase realtime database when connected to internet.
4. Uploading both image and text to firebase cloud storage and firebase realtime datbaase respectively.
5. Updating only text when connected to internet.
6. Updating both images and text when connected.
7. Deleting only image.
8. Deleting both image and text.
9. Login using Firebase Authentication

All those methods will be returning MutableLiveData objects with our `RequestCall` class as our generic parameter. Let's for instance see a class to allow us fetch our news items from firebase realtime database.

```kotlin
    fun select(): MutableLiveData<RequestCall> {
        val mLiveData = MutableLiveData<RequestCall>()
        val r = RequestCall()
        r.status = IN_PROGRESS
        r.message = "Fetching News Please Wait.."
        mLiveData.value = r
        DB.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                MEM_CACHE.clear()
                if (dataSnapshot.exists() && dataSnapshot.childrenCount > 0) {
                    for (ds in dataSnapshot.children) { //Now get News Objects and populate our arraylist.
                        val news = ds.getValue(News::class.java)
                        if (news != null) {
                            news.key = ds.key
                            MEM_CACHE.add(news)
                        }
                    }
                    r.status = SUCCEEDED
                    r.message = "DOWNLOAD COMPLETE"
                } else {
                    r.status = SUCCEEDED
                    r.message = "NO DATA FOUND"
                }
                r.news = MEM_CACHE
                mLiveData.postValue(r)
            }

            override fun onCancelled(databaseError: DatabaseError) {
                Log.d("CAMPOSHA", databaseError.message)
                r.status = FAILED
                r.message = databaseError.message
                mLiveData.postValue(r)
            }
        })
        return mLiveData
    }
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-ListingsPage.png)

### Defining our ViewModel class

The ViewModel class will expose the functionalities we had defined in the `GeneralRepository` class to our user interface. In doing so our business logic shall be protected from the boilerplate code normally associated with user interface. That makes the business logic testable and maintanable. Those are in fact the main essence of implementing clean architecture.

Our ViewModel class shall be called `NewsViewModel` and it will extend the `androidx.lifecycle.AndroidViewModel` class:

```kotlin
class NewsViewModel(application: Application) :
    AndroidViewModel(application) {
    private val newsRepository: NewsRepository = NewsRepository()
    fun saveLocally(news: News): MutableLiveData<RequestCall> {
        return newsRepository.saveTextLocally(news)
    }
    fun upload(news: News, imageUri: Uri): MutableLiveData<RequestCall> {
        return newsRepository.uploadImageText(news, imageUri)
    }

    fun updateStar(news: News, imageUri: Uri): MutableLiveData<RequestCall> {
        return newsRepository.updateImageText(news, imageUri)
    }

    fun updateOnlyText(news: News): MutableLiveData<RequestCall> {
        return newsRepository.saveTextLocally(news)
    }

    fun deleteStar(news: News): MutableLiveData<RequestCall> {
        return newsRepository.deleteImageText(news)
    }

    val allStars: MutableLiveData<RequestCall>
        get() = newsRepository.select()

    fun search(searchTerm: String): MutableLiveData<RequestCall> {
        return newsRepository.search(searchTerm)
    }
    fun login(email: String,password: String): MutableLiveData<RequestCall> {
        return newsRepository.login(email,password)
    }

}
```

### Creating Base Activities

Base Activities allow us to continue taking advantage of inheritance which is one of the object oriented programming pillars. We define properties in a base class and those are automatically derived or inherited by child class. It also allows us avoid duplicating functionalities across our child classes. The child class thus remain smaller and manageable. We will have two base class in this case:

**(a). BaseActivity**

```kotlin
open class BaseActivity : AppCompatActivity() {
//code here
}
```

Here we will define methods and properties like: Instantiating our ViewModel class the new way using the `ViewModelProvider` instance:

```kotlin
    protected fun newsViewModel(): NewsViewModel{
        return ViewModelProvider(this).get(NewsViewModel::class.java)
    }
```

The older deprecated way was using the `ViewModelProviders`:

```kotlin
    protected fun newsViewModel(): NewsViewModel{

        return ViewModelProviders.of(this).get(NewsViewModel::class.java)
    }
```

We also define how to open an activity using intents:

```kotlin
    protected fun openPage(clazz: Class<*>?) {
        val intent = Intent(this, clazz)
        startActivity(intent)
    }
```

And of course how to show a toast message:

```kotlin
    protected fun show(message: String?) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
```

Here is how to open settings page in android device. This will allow the user to grant permissions at runtime:

```kotlin
    private fun openSetting() {
        val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
        val uri = Uri.fromParts("package", packageName, null)
        intent.data = uri
        startActivityForResult(intent, 101)
    }
```

Here is how to create a dialog that will prompt the user to grant us runtime permissions:

```kotlin
    protected fun showSettingDialog() {
        Log.i("PERMISSION", "Showing Permission Setting Dialog")
        val builder =
            AlertDialog.Builder(this)
        builder.setTitle("Assign Permissions")
        builder.setMessage("This app needs permission to use this feature. You can grant them in app settings.")
        builder.setPositiveButton("GO TO SETTING") { dialog: DialogInterface, _: Int ->
            dialog.cancel()
            openSetting()
        }
        builder.setNegativeButton("Cancel") { dialog: DialogInterface, which: Int -> dialog.cancel() }
        builder.show()
    }
```

Because we will be applying custom fonts in all our activities, we will need to override one method, the `attachBaseContext()` in each one of those activities. It therefore makes sense to to just override it once in the base activity and then the child activities don't have to:

```kotlin
    override fun attachBaseContext(newBase: Context) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(newBase))
    }
```

In the app, you notice we had a beautiful progress card on top of some of our activities. This card is useful because it gives you the realtime state of an operation we are performing. For example the progress state, the completion state, whether an error has occured, the error message etc.It automatically gets hidden but you can also dismiss it manually.You can pass it custom messages and title as well. Well we will define this card in our BaseActivity so that it can be inherited by other activities.

```kotlin
    protected fun createStateCard(title: String?, msg: String?, isShowing: Boolean, isLoading: Boolean, STATE: Int) { //state widgets
        val handler = Handler()
        val delayedHiding =
            Runnable { progressCard!!.visibility = View.GONE }
        if (isShowing) {
            progressCard!!.visibility = View.VISIBLE
            if (isLoading) {
                pb!!.visibility = View.VISIBLE
            } else {
                pb!!.visibility = View.GONE
            }
            titleTV!!.text = title
            msgTV!!.text = msg
            when (STATE) {
                FAILED -> {
                    titleTV.setTextColor(resources.getColor(android.R.color.holo_red_dark))
                    msgTV.setTextColor(resources.getColor(android.R.color.holo_red_light))
                    handler.postDelayed(delayedHiding, 10000)
                }
                IN_PROGRESS -> {
                    titleTV.setTextColor(resources.getColor(android.R.color.holo_blue_dark))
                    msgTV.setTextColor(resources.getColor(android.R.color.holo_blue_light))
                }
                SUCCEEDED -> {
                    titleTV.setTextColor(resources.getColor(android.R.color.holo_green_dark))
                    msgTV.setTextColor(resources.getColor(android.R.color.holo_green_light))
                    handler.postDelayed(delayedHiding, 10000)
                }
            }
        } else {
            progressCard!!.visibility = View.GONE
        }
        closeBtn!!.setOnClickListener { v: View? ->
            progressCard.visibility = View.GONE
        }
    }
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Publish_Progress.png)

Well we will also define a method that will allow us make our request against Firebase realtime database. We define this here because it's something we need across several activities and it does involve quite a few boilerplate code:

```kotlin
    protected fun makeRequest(r: RequestCall?, OPERATION: String): Int {
        if (r == null) {
            createStateCard("$OPERATION FAILED", "Null RequestCall Received", isShowing = true, isLoading = false, STATE = FAILED)
        } else {
            when (r.status) {
                IN_PROGRESS -> {
                    createStateCard("$OPERATION IN PROGRESS", r.message, true, true, IN_PROGRESS)
                }
                FAILED -> {
                    createStateCard("ERROR", r.message, true, false, FAILED)
                }
                SUCCEEDED -> {
                    createStateCard("CONGRATS!", r.message, true, false, SUCCEEDED)
                }
            }
            return r.status
        }
        return -999
    }
```

and:

**(b). BaseEditingActivity**

Well this abstract class will contain methods we can require in more than one editing activity. Most of these methods can be lifted to a Utils as an alternative.

```kotlin
abstract class BaseEditingActivity : BaseActivity() {
//code here
}
```

Well the first of those methods is our validation method. You need validation in our crud activity as well as our login screen. You can validate files and edittexts:

```kotlin
    protected fun validate(file: File?, isFileRequired: Boolean, vararg editTexts: EditText): Boolean {
        if (isFileRequired && file == null) {
            show("Image is required")
            return false
        }
        if ( editTexts[0].text == null ||  editTexts[0].text.toString().isEmpty()) {
            editTexts[0].error = "This field is Required Please!"
            return false
        }
        if (editTexts[1].text == null || editTexts[1].text.toString().isEmpty()) {
            editTexts[1].error = "This field is Required Please!"
            return false
        }
        if (editTexts[2].text == null || editTexts[2].text.toString().isEmpty()) {
            editTexts[2].error = "This field is Required Please!"
            return false
        }
        return true
    }
```

You may need to clear an arbitrary number of edittexts. This method may be handy in doing that:

```kotlin
    protected fun clearEditTexts(vararg editTexts: EditText) {
        for (editText in editTexts) {
            editText.setText("")
        }
    }
```

Obtaining a value from an edittext can also be shorter by just defining a method to do it:

```kotlin
    protected fun valOf(editText : EditText): String {
        return editText.text.toString()
    }
```

We will need a datepicker several times in our app. This is the method to create for us a datepicker. You pass the edittext where you want the picked date to be rendered:

```kotlin
    protected fun selectDate(dateTxt: EditText) {
        dateTxt.setOnClickListener {
            val dialog =
                DatePickerFragmentDialog.newInstance { view: DatePickerFragmentDialog?, year: Int, monthOfYear: Int, dayOfMonth: Int ->
                    val month: String
                    val monthOfYear1 = monthOfYear+1
                    month = if (monthOfYear1 < 10) {
                        "0$monthOfYear1"
                    } else {
                        monthOfYear1.toString()
                    }
                    val day: String = if (dayOfMonth < 10) {
                        "0$dayOfMonth"
                    } else {
                        dayOfMonth.toString()
                    }
                    dateTxt.setText("$year-$month-$day")
                }
            dialog.show(supportFragmentManager, "DATE_PICKER")
        }
    }
```

We've used the material datepicker library which can be installed using the following statement:

```groovy
    implementation 'com.shagi:material-datepicker:1.3'
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-DatePicker.png)

Well we have also created a re-usable single choice dialog to select countries. You can use this even in you other projects. We have included an actual XML file containing a list of all countries in the world. User simply selects the country and the selected country is shown in the edittext you pass:

```kotlin
    protected fun selectCountry(countryTxt: EditText) {
        val adapter: ArrayAdapter<String> = ArrayAdapter(
            this,
            android.R.layout.simple_list_item_1,
            resources.getStringArray(R.array.countries)
        )
        LovelyChoiceDialog(this)
            .setTopColorRes(R.color.colorPrimary)
            .setTitle("Country Picker")
            .setTitleGravity(Gravity.CENTER_HORIZONTAL)
            .setIcon(R.drawable.m_star)
            .setMessage("Select the Country for this News.")
            .setMessageGravity(Gravity.CENTER_HORIZONTAL)
            .setItems(adapter) { _: Int, item: String? ->
                countryTxt.setText(item)
            }
            .show()
    }
```

Of course we are using the lovely dialogs library which can be installed using the following statement:

```groovy
    implementation 'com.yarolegovich:lovely-dialog:1.1.0'
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-CountryPicker.png)

### Creating a Splash Screen.

To create a splash screen you start by designing the actual page in XML. Here is an example of a beautiful design with a full page image background:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/corona_icon"
    android:gravity="center"
    android:orientation="vertical"
    xmlns:android="http://schemas.android.com/apk/res/android">

        <ImageView
            android:id="@+id/mLogo"
            android:layout_width="120dp"
            android:layout_height="120dp"
            android:src="@drawable/campo" />

        <TextView
            android:id="@+id/mainTitle"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:text="ProgrammingWizards TV"
            android:textAlignment="center"
            android:textColor="@android:color/background_dark"
            android:textSize="24sp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/subTitle"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Bringing You High Quality Projects"
            android:textAlignment="center"
            android:textColor="@android:color/background_dark"
            android:textSize="18sp" />

    </LinearLayout>
    <!--end-->
```

Then create a folder under the resources called `anim`. Inside this folder we will add our animations. Create atleast two animations:

**(a). drop.xml**

We will apply it to our logo. It will drop it from a slightly higher to lower position:

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate
        android:fromYDelta="-150%"
        android:toYDelta="0%"
        android:duration="500"
        android:repeatCount="0" />
</set>
```

**(b). fade.xml**

We will apply this to our title and subtitle. It will fade them in.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <alpha
        android:fromAlpha="0.0"
        android:toAlpha="1.0"
        android:duration="1500"
        />
</set>
```

Then now we come create our activity:

```kotlin
class SplashActivity : BaseActivity() {
//code here
}
```

The first is a function to load our animations and apply them to our widgets. We use the `loadAnimation()` method of our `AnimationUtils` class:

```kotlin
    private fun showSplashAnimation() {
        val animation =  AnimationUtils.loadAnimation(this, R.anim.drop)
        mLogo.startAnimation(animation)
        val fadeIn =  AnimationUtils.loadAnimation(this, R.anim.fade_in)
        mainTitle.startAnimation(fadeIn)
        subTitle.startAnimation(fadeIn)
    }
```

The second is a function to take us to the login page for authentication:

```kotlin
    private fun goToLoginPage() {
        val t: Thread = object : Thread() {
            override fun run() {
                try {
                    sleep(1000)
                    openActivity(
                        this@SplashActivity,
                        LoginActivity::class.java
                    )
                    finish()
                    super.run()
                } catch (e: InterruptedException) {
                    e.printStackTrace()
                }
            }
        }
        t.start()
    }
```

We need to create a custom theme for our splash screen. This will get rid if the toolbar/action bar so that we have a full screen without any toolbar at the top. So in our styles.xml we will define our `SplashTheme`:

```xml
    <style name="SplashTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="android:windowAnimationStyle">@style/MyActivityAnimations</item>
    </style>
```

Obviously we will need to apply that theme to the splash activity in our Android manifest:

```xml
        <activity android:name=".view.ui.activities.SplashActivity"
            android:theme="@style/SplashTheme">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-SplashScreen.png)

### Creating our Login Page

Our login page is of paramount importance to us since we implement authentication in this app. Our editors and admins will need to be authenticated. Only then can they get the permission to publish/edit/delete news. We use email/password mode of authentication.

Here is how you design a beautiful login page:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:background="@color/colorPrimary"
    android:orientation="vertical"
    android:padding="16dp">

    <include layout="@layout/_state" />

    <ImageView
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:layout_gravity="center_horizontal"
        android:layout_marginBottom="10dp"
        android:src="@drawable/home_lock" />

    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="fill_parent"
        android:layout_height="wrap_content">

        <EditText
            android:id="@+id/emailTxt"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:hint="Email"
            android:imeActionId="@+id/login"
            android:imeActionLabel="Sign In"
            android:imeOptions="actionUnspecified"
            android:inputType="textEmailAddress"
            android:maxLines="1"
            android:singleLine="true"
            android:textColor="@android:color/white"
            android:textColorHint="@android:color/white"
            tools:ignore="InvalidImeActionId" />

    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.textfield.TextInputLayout
        android:layout_width="fill_parent"
        android:layout_height="wrap_content">

        <EditText
            android:id="@+id/passwordTxt"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:hint="Password"
            android:imeActionId="@+id/login"
            android:imeActionLabel="Sign In"
            android:imeOptions="actionUnspecified"
            android:inputType="textPassword"
            android:maxLines="1"
            android:singleLine="true"
            android:textColor="@android:color/white"
            android:textColorHint="@android:color/white"
            tools:ignore="InvalidImeActionId" />

    </com.google.android.material.textfield.TextInputLayout>

    <Button
        android:id="@+id/loginBtn"
        style="?android:textAppearanceSmall"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:background="@color/colorAccent"
        android:text="Login"
        android:textColor="@android:color/white"
        android:textStyle="bold" />
    <Button
        android:id="@+id/skipBtn"
        style="?android:textAppearanceSmall"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:background="@color/colorAccent"
        android:text="SKIP"
        android:textColor="@android:color/white"
        android:textStyle="bold" />

</LinearLayout>
```

Then we come create our login activity, making it extend the baseactivity:

```kotlin
class LoginActivity : BaseActivity() {
    //code here
}
```

Let's start by defining a simple helper method to validate our email and password edittexts before we attempt the login:

```kotlin
    private fun validate(): Boolean {
        if (emailTxt.text.isNullOrEmpty() || emailTxt.text.isBlank()){
            emailTxt.error = "Invalid Value"
            return false;
        }
        if (passwordTxt.text.isNullOrEmpty() || passwordTxt.text.isBlank()){
            passwordTxt.error = "Invalid Value"
            return false;
        }
        return true
    }
```

Here is how we actually login:

```kotlin
    private fun login() {
        if (!validate()){
            return
        }
        newsViewModel().login(emailTxt.text.toString(),passwordTxt.text.toString()).observe(this, Observer {
            if (makeRequest(it,"LOGIN")== Constants.SUCCEEDED){
                CacheManager.CURRENT_USER= FirebaseAuth.getInstance().currentUser?.email!!;
                if (PermissionManager.isLoggedIn){
                    openPage(DashboardActivity::class.java)
                    finish()
                }else{
                    show("Something is wrong. Email is null or empty")
                }
            }
        })
    }
```

We invoke our `newsViewModel()` to instantiate our ViewModel class. Then use it to invoke the login() defined in that class which will in turn invoke the login() method defined in the `GeneralRepository` class, where our login logic resides. You can also see that we cache the current user in memory if the login process succeeds, before moving to the dashboard page.

To implement a login-once technique, similar to one used by cookies in browser, whereby you login only once then subsequently you are autologged in unless you clear you cookies, we use FirebaseAuth's inherent capabilities. FirebaseAuth will store the current user in the device and can auto-sign us in. Here is how we do it:

```kotlin
        if(FirebaseAuth.getInstance().currentUser != null){
            CacheManager.CURRENT_USER= FirebaseAuth.getInstance().currentUser!!.email!!
            openPage(DashboardActivity::class.java)
            finish()
        }
```

We place the above code in our `onResume()` method. We are basically checking if we have a user saved locally. If so then we obtain it and store in memeory statically. Then we simply open dashboard page.

In our onCreate() method we will listen to two button clicks:

```kotlin
        loginBtn.setOnClickListener{
            login()
        }
        skipBtn.setOnClickListener{
            openPage(DashboardActivity::class.java)
        }
```

That is if the user clicks the login button we invoke the `login()` method while if he clicks the skip button we simply open the dashboard page without login. However in the latter case, the user will be limited in his capabilities.

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Login-Progress.png) ![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-LoginScreen.png)

### Managing User Permissions and Capabilities

Permissions are important as they allow us to control access to several pages and functionalities within the app. For example you can control which users can publish or edit news, which ones can delete et.. In our case, all users can view news, even annonymous users. Annonymous users are users not logged in.

We start by creating an object class we call `PermissionManager`:

```kotlin
object PermissionManager {
```

To check if a user is logged in or not, we can use the following property:

```kotlin
    val isLoggedIn: Boolean
        get() = CURRENT_USER.isNotEmpty()
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-InSufficientPrivileges-Dialog.png)

To control which users can publish news we will use the following method:

```kotlin
    fun canPublishNews(): Boolean {
        return if (!isLoggedIn) false else CURRENT_USER === Constants.ADMIN_EMAIL
    }
```

To control which users can edit news:

```kotlin
     fun canEditNews(): Boolean {
        return if (!isLoggedIn) false else CURRENT_USER === Constants.ADMIN_EMAIL
                || CURRENT_USER === Constants.EDITOR_1_EMAIL
                || CURRENT_USER === Constants.EDITOR_1_EMAIL
    }
```

To control which users can delete news:

```kotlin
    fun canDeleteNews(): Boolean {
        return if (!isLoggedIn) false else CURRENT_USER === Constants.ADMIN_EMAIL
    }
```

### Managing Runtime Permissions with Dexter

Dexter is one of the most popular runtime permissions library for android.Runtime permissions apply to devices starting with API level 23. Those lower will use the good old android manifest permissions. So you have to make sure in android manifest you add the following permissions:

```kotlin
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```

As for the runtime permissions with Dexter, here is the library to check for permissions to read external storage or capture images from camera, then if not granted, give user an option to open the settings page to enable this permission:

```kotlin
    /**
     * We use a library known as Dexter to check for permissions at
     * runtime.If we haven't been granted then we present the user with
     * a dialog to take him to settings page to grant us permission
     */
    private fun checkPermissionsThenPickImage() {
        Dexter.withActivity(this)
            .withPermission(Manifest.permission.READ_EXTERNAL_STORAGE)
            .withListener(object : PermissionListener {
                override fun onPermissionGranted(response: PermissionGrantedResponse) {
                    show("Good...READ EXTERNAL PERMISSION GRANTED")
                    captureImage()
                }

                override fun onPermissionDenied(response: PermissionDeniedResponse) {
                    show("WHOOPS! PERMISSION DENIED: Please grant permission first")
                    if (response.isPermanentlyDenied) {
                        showSettingDialog()
                    }
                }

                override fun onPermissionRationaleShouldBeShown(
                    permission: PermissionRequest,
                    token: PermissionToken
                ) {
                    Log.i("DEXTER PERMISSION", "Permission Rationale Should be shown")
                    token.continuePermissionRequest()
                }
            }).check()
    }
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Dexter-Permissions.png)

### Observing/Subscribing to Our ViewModel Methods

We had earlier said that the ViewModel would expose our business logic defined in our repository classes to our User interface. Separating application logic from user interface code has been a classic design pattern used to create re-usable and maintenable code since the inception of modern computers.

So for us our ViewModel class which links these two parts of our app is extremely important. The magic will be our LiveData(MutableLiveData) objects. These objects will be returned by our ViewModel methods. Then we can attach observers to these LiveData objects. Those observers get notified of changes in our LiveData. Thus we are able to update our UI as changes occur in realtime in our logic.

Here is how we subscribe to receiving updates as we attempt to upload or save our text to Firebase Realtime database:

```kotlin
    private fun uploadOnlyText(news: News) {
        newsViewModel().saveLocally(news)
            .observe(this, Observer { r ->
                if (makeRequest(r, "NEWS PUBLISHING") == SUCCEEDED) {
                    show("News Text Published Successfully")
                    clearEditTexts(titleTxt!!, descriptionTxt!!, countryTxt!!, tagsTxt!!, datePublished!!)
                }
            })
    }
```

The `newsViewModel()` will give us the ViewModel instance we need to invoke the `saveLocally()` function. That function returns a MutableLiveData object which we observe. This subscription will occur if we attemp to save data without choosing an image. In that case only text is saved. That text will be saved even if you are totally offline, disconnected from internet. Then when connection is resumed data will be automatically posted to firebase realtime database.

We also need to subscribe to the method that uploads both our images and text:

```kotlin
    private fun upload(news: News) {
        newsViewModel().upload(news, Uri.fromFile(chosenFile))
            .observe(this, Observer { r ->
                if (makeRequest(r, "NEWS PUBLISHING") == SUCCEEDED) {
                    show("News Publishing Successfully")
                    clearEditTexts(titleTxt!!, descriptionTxt!!, countryTxt!!, tagsTxt!!, datePublished!!)
                }
            })
    }
```

The above will post moth images and text to firebase. `Uri.fromFile()` gives us the `Uri` of the image. The above method will need internet connectivity. Why? Well because you cannot upload image while offline. Sure Firebase Realtime Database supports offline capability. However Firebase Cloud Storage doesn't. We need to internet to upload image, then once uploaded and the image url assigned to us, we can persist the image url alongside other texts offline. So in the app, if you are completely offline, then don't choose an image, just type text and click save. We will save them offline and later when you have internet connectivity, you update the news item by uploading your image.

To update only text:

```kotlin
    private fun updateOnlyText(news: News) {
        newsViewModel().updateOnlyText(news)
            .observe(this, Observer { r ->
                if (makeRequest(r, "NEWS TEXT UPDATE") == SUCCEEDED) {
                    show("News Updated Successfully")
                    openActivity(c, ListingActivity::class.java)
                    finish()
                }
            })
    }
```

The above method will update only text. The method will automatically be invoked if you don't select an image. The method is an offline-first one. It will work even if you are completely disconnected from internet. In that case the updates will occur offline and when connection is regained posted online.

Then to update both images and text:

```kotlin
    private fun update(news: News) {
        newsViewModel().updateStar(news, Uri.fromFile(chosenFile))
            .observe(this, Observer { r ->
                if (makeRequest(r, "NEWS UPDATE") == SUCCEEDED) {
                    show("News Updated Successfully")
                    openActivity(c, ListingActivity::class.java)
                    finish()
                }
            })
    }
```

Again, this will work with internet connectivity on as we are attempting to upload an image. The method will be auto-invoked if you select an image and you wish to update.

And to delete a star:

```kotlin
    private fun deleteStar(news: News) {
        newsViewModel().deleteStar(news)
            .observe(this, Observer { r ->
                if (makeRequest(r, "NEWS DELETE") == SUCCEEDED) {
                    show("News Deleted Successfully")
                    openActivity(
                        this@UploadActivity,
                        ListingActivity::class.java
                    )
                    finish()
                }
            })
    }
```

We also need to subscribe to the method that will download our news from firebase realtime database. Then once we've downloaded the news we can bind them to our recyclerview:

```kotlin
    private fun bindData() {
        newsViewModel().allStars.observe(this, Observer { r ->
            if (makeRequest(r, "DOWNLOAD") == SUCCEEDED) {
                val mNews = r.news
                MEM_CACHE = r.news as ArrayList<News>
                if (mNews.isNotEmpty()) {
                    createStateCard(
                        "Successfully Fetched News",
                        mNews.size.toString() + " News Found",
                        true,
                        false,
                        SUCCEEDED
                    )
                    networkImages = getImageURLs(mNews)
                    setupStuff()

                } else {
                    createStateCard(
                        "Successfully Connected",
                        "However No News was Found in Database",
                        true,
                        false,
                        SUCCEEDED
                    )
                }
            }
        })
    }
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-ListingsPage.png)

This method will be invoked in our ListingActivity as that's where we have our recyclerview as well as our carousel view. However you can create subscribers in other activities as well.

### Validating Data before Posting

We will perform validation to make sure some fields are not empty. Then we will either update or upload our item:

```kotlin
    private fun validateThenUpload() {
        if (validate(chosenFile, false, titleTxt, descriptionTxt, countryTxt)) {
            val n = News()
            n.title = valOf(titleTxt)
            n.content = valOf(descriptionTxt)
            n.country = valOf(countryTxt)
            n.tags = valOf(tagsTxt)
            n.datePublished = valOf(datePublished)
            n.dateUpdated = valOf(dateUpdated)
            n.imageURL = ""
            n.views="0"
            n.publisher=CacheManager.CURRENT_USER

            if (chosenFile == null) {
                uploadOnlyText(n)
            }else{
                upload(n)
            }
        } else {
            show("Please fill up all Fields First")
        }
    }
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Publish_Progress.png)

We will also validate before attempting any update operation:

```kotlin
    /**
     * Validate then Update our News. If image has not been changed
     * then we update only text,otherwise both images and text.
     */
    private fun validateThenUpdate() {
        if (validate(chosenFile, false, titleTxt, descriptionTxt, countryTxt)) {
            val n = receivedNews
            n!!.title = valOf(titleTxt)
            n.content = valOf(descriptionTxt)
            n.country = valOf(countryTxt)
            n.tags = valOf(tagsTxt)
            n.datePublished = valOf(datePublished)
            n.dateUpdated = valOf(dateUpdated)
            if (chosenFile == null) {
                updateOnlyText(n)
            } else {
                update(n)
            }
        }
    }
```

### Re-using same Activity for CRUD operations

To save us from typing lots of code and creating three different activities and layouts, we will simply re-use the same activity for 5 operations:

1. Uploading Only Text
2. Uploading both images and text
3. Updating Only Text
4. Updating Both images and text
5. Deleting Both images and text.

For these operations we need atleast two different toolbars. This is because we use toolbar menu items to initiate our operations. Thus we will define the two toolbar menus we need under menu resources:

**new_item_menu.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Options menu for the UploadActivity -->
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".view.ui.activities.UploadActivity">

    <item
        android:id="@+id/insertMenuItem"
        android:title="SAVE"
        android:icon="@drawable/m_add"
        app:showAsAction="always" />

</menu>
```

Then:

**edit_item_menu.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Options menu for the UploadActivity -->
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".view.ui.activities.UploadActivity">

    <item
        android:id="@+id/editMenuItem"
        android:title="SAVE"
        android:icon="@drawable/m_done"
        app:showAsAction="always" />
    <item
        android:id="@+id/deleteMenuItem"
        android:title="DELETE"
        android:icon="@drawable/m_delete"
        app:showAsAction="always" />
    <item
        android:id="@+id/viewAllMenuItem"
        android:title="VIEW ALL"
        android:icon="@drawable/m_list"
        app:showAsAction="ifRoom" />
</menu>
```

Then we will inflate them based on the action we intend to do:

```kotlin
    /**
     * Menus will be inflated based on the intention of opening this
     * activity. If, while we don't pass any news along then we
     * inflate the new_item_menu. If a planet is passed along then we
     * inflate the edit_item_menu
     */
    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        if (receivedNews == null) {
            menuInflater.inflate(R.menu.new_item_menu, menu)
            headerTxt!!.text = "Publish News"
        } else {
            menuInflater.inflate(R.menu.edit_item_menu, menu)
            headerTxt!!.text = "Update News"
        }
        return true
    }
```

We will also be handling the selection events for our toolbar menu items:

```kotlin
    /**
     * When user selects a menu item in toolbar
     */
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.insertMenuItem -> {
                validateThenUpload()
                return true
            }
            R.id.editMenuItem -> {
                //only validate if received news is not null
                if(receivedNews != null) validateThenUpdate()
                return true
            }
            R.id.deleteMenuItem -> {
                //delete only if received news is not null
                receivedNews?.let { deleteStar(it) }
                return true
            }
            R.id.viewAllMenuItem -> {
                openActivity(this, ListingActivity::class.java)
                finish()
                return true
            }
        }
        return super.onOptionsItemSelected(item)
    }
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Publish.png)

### Capturing or Selecting Image

Our app has the capability to directly capture image from camera then upload or select from gallery or even filepicker.Images are fundamental to news app and that's why we've included this capability.

All we need to do is define a method to capture:

```kotlin
    /**
     * Capture or select image
     */
    private fun captureImage() {
        val i = Intent(this, ImageSelectActivity::class.java)
        i.putExtra(ImageSelectActivity.FLAG_COMPRESS, false) //default is true
        i.putExtra(ImageSelectActivity.FLAG_CAMERA, true) //default is true
        i.putExtra(ImageSelectActivity.FLAG_GALLERY, true) //default is true
        startActivityForResult(i, 1213)
    }
```

Then we need to handle the captured or selected image. We do this inside the `onActivityResult()`. For example we can show the captured image in a jumbotron before the user can click upload to upload:

```kotlin
   /**
     * After capturing or selecting image, we will get the image path
     * and use it to instantiate a file object
     */
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK && data != null) {
            if (requestCode == 1213) {
                val filePath =
                    data.getStringExtra(ImageSelectActivity.RESULT_FILE_PATH)
                chosenFile = File(filePath)
                Picasso.get().load(chosenFile!!).error(R.drawable.image_not_found).into(topImageImg)
            }
        }
        resumedAfterImagePicker = true
    }
```

We are using Picasso as our image loader library.

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Captured.png) ![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-OKCapture.png) ![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-DoCapture.png) ![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Image-Options-1.png) ![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-StartCapture.png) ![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Gallery.png) ![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-File-Picker.png)

### Searching and Filtering Data

We will include a fast client side search capability in our app. This works even in offline mode. We will also be highlighting our search results in our recyclerview. The search will take place via a toolbar searchview in our listings activity.

The first step is to define a static method in our Utils class to do the search and filtering:

```kotlin
    @JvmStatic
    fun filter(query: String, news: List<News>): ArrayList<News> {
        val hits = ArrayList<News>()
        for (n in news) {
            if (n.title!!.toLowerCase(Locale.getDefault()).contains(query.toLowerCase(Locale.getDefault()))) {
                hits.add(n)
            }
        }
        return hits
    }
```

Then in our `ListingsActivity` we implement the `SearchView.OnQueryTextListener` interface:

```kotlin
class ListingActivity : BaseActivity(), SearchView.OnQueryTextListener,
    MenuItem.OnActionExpandListener {
```

We will override several methods, among them a method to allow us search and filter as the user types:

```kotlin
    override fun onQueryTextChange(query: String): Boolean {
        Utils.SEARCH_STRING = query
        adapter.clear(true)
        adapter.addAll(Utils.filter(query, MEM_CACHE), true)
        rv.layoutManager = LinearLayoutManager(this)
        rv.adapter = adapter
        return false
    }
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-Search.png)

### How to enable permanent Offline-Persistence

Firebase Realtime Database has the capability to allow us to permanently cache data offline. This is very powerful since it makes our app operational even if offline. However, it is important to note that this pertains to Firebase Realtime Database and not Firebase Cloud Storage. You need internet connectivity to upload images. You can neither upload images offline nor even when connection is regained. Because of this, if you are uploading new data, you will need internet connectivity atleast until image is uploaded and it's url returned. Then even if the device goes offline, we will be able to insert the details into Firebase Realtime Database automatically when connection is resumed.

Enabling this offline persistence is pretty easy:

In our application's app class, inside the onCreate() method we will start by initializing the FirebaseApp:

```kotlin
FirebaseApp.initializeApp(this)
```

Then we will enable persistence by passing true to the `setPersistenceEnabled()` method:

```kotlin
        FirebaseDatabase.getInstance().setPersistenceEnabled(true)
```

![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-File-Picker.png) ![](https://camposha.info/wp-content/uploads/2020/04/CoronaVirusNewsFirebase-ListingsPage1.png)

### Conclusion

This is a project covering everything you need to master android firebase realtime database and cloud storage. It also gives you the template to create a full android app. It is high quality and clean and well designed as you can attest from the code. Using a project like this saves you from having to read lots of manuals and tutorials which will take you months or even years. We learn programming by doing.

Get the project [here](https://camposha.info/student-project/coronavirus-news-app-kotlin-firebase/)

Wish you success.

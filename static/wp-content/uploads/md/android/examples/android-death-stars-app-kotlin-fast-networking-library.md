# Cosmic Stars App - Kotlin Fast Networking Library Multipart MySQL with Disk Caching

In the Star Wars Universe, the death star is the ultimate weapon, able to anihilate entire planets. In the actual universe, space is filled with real life death stars. A death star can be thought of as a time bomb, just waiting to explode. Scientists have catalogued plenty of stars waiting to hitting the self-destruct button. One of them, WR-104, is dangerously pointing to earth. It's destructive force combining with it's deadly radiation may one day turn the ozone layer into a radioactive inferno, ending life on earth.

We therefore have need to careful study these death stars. May one day we may be forced to vacate this earth before one of them hits us. But to study them of course we need to catalogue them. I have created this app to help in cataloguing these stars. This app is also designed to be used to teach android developmennt. It can also be used as a template for creating full android applications. And in learning various modern technologies.


Here is the demo:

![](https://camposha.info/wp-content/uploads/2020/04/demo_kotlin_death_stars.gif)

### What You will Learn From this Project

**1\. Kotlin Programming Language**

Yeah. The first-class android development language. A concise language that is really hot these days and getting even hotter. This app is entirely coded in Kotlin. You can use this app to learn Kotlin especially if you are coming from another language.

**2\. Fast Networking Library**

This is a real HTTP client that alot of android developers still don't know.It is really fast, convenient and easy to use. Fast Networking Library is a suitable alternative to Retrofit and probably easier. It is very reliable. You will learn how to perform **CRUD** operations with Fast networking libary, including **multipart** operations involving images and text.

TIP: Installing Fast Networking Library:

```groovy
    implementation 'com.amitshekhar.android:android-networking:1.0.2'
```

![](https://camposha.info/wp-content/uploads/2020/04/death_stars_dashboard.png)

**3\. Model View ViewModel**

Learn how to design a real world app using **MVVM** design pattern. Use state of the art design patterns that are recommended for android development. We will use standard lifecycle classes like **ViewModel** and **LiveData** to help with this design.

TIP: The new way of instantating a ViewModel class:

```kotlin
    protected val remoteViewModel: RemoteViewModel
        get() = ViewModelProvider(this).get(RemoteViewModel::class.java)
```

**4\. Disk Caching**

This is an efficient app and it's design to not make unnecessary calls to the server. It does this by caching data to the hard disk. However when you make an upload, update or delete, the cache is marked as dirty. Then the next time we come to the listings page, we auto-refresh our cache from the server. The disk caching is permanent and even if the app is restarted we will still have our cache. If for some reason, the system wipes the cache out maybe because of low hard disk space, we simply re-download our data.

TIP: Allocating Disk Space for cache storage:

```kotlin
 Reservoir.init(c, 1000048) //in bytes
```

![](https://camposha.info/wp-content/uploads/2020/04/death_stars_cache.png)

**5\. Data Binding**

We need to be connecting several widgets with our data. We also need to be referencing our widgets from our layouts. Data binding makes these processes super easy and saves us from writing lots of boilerplate code. Learn how to use data binding in kotlin using this app.

TIP: Binding a whole object with it's properties to textviews. No need of setText() methods:

```kotlin
 b!!.star = receivedStar
```

![](https://camposha.info/wp-content/uploads/2020/04/death_stars_detail_page.png)

**6\. Camera Capture**

Learn how to capture images from camera in the easiest way possible and then upload those images. You will also be able to pick the images from gallery or file explorer.

![](https://camposha.info/wp-content/uploads/2020/04/death_stars_imagepicker_options.png)

**7\. Server side Pagination**

Learn how to implement server side pagination in your android app. This makes the app super efficient as we download only limited data, downloading the rest on demand. We do this by listening to recyclerview scroll events, attempting download of more data at the end of the list.

**8\. Beautiful Image Slider**

Would you want to have a beautiful image slider at the top of your page, flipping through images from the server. Well we have carouselview which will do that for you. The images can also be flipped manually by swiping. We extract images from our downloaded stars, then bind them to our slider.

TIP: Extracting images from Star Objects:

```kotlin
    @JvmStatic
    fun getImageURLs(stars: List<Star>): Array<String?> {
        val imageURLs = arrayOfNulls<String>(stars.size)
        var i = 0
        for (star in stars) {
            imageURLs[i] =
                Constants.IMAGES_BASE_URL + star.imageURL
            i++
        }
        return imageURLs
    }
```

or using the withIndex() function:

```kotlin
    @JvmStatic
    fun getImageURLs(stars: List<Star>): Array<String?> {
        val imageURLs = arrayOfNulls<String>(stars.size)
        for ((i, star) in stars.withIndex()) {
            imageURLs[i] =
                Constants.IMAGES_BASE_URL + star.imageURL
        }
        return imageURLs
    }
```

**9\. Track Upload Progress**

We will be tracking the progress of our uploads. Not only do we show realtime messages of an upload operation, but also we show the progress percentage.

**10\. Beautiful User Interfaces**

You will also learn how to design beautiful user interfaces that you can re-use in your other projects. Here are some of the components we use:

1. Collapsing Toolbar.
2. Material styled edittexts.
3. Material Info Dialogs
4. Material Choice dialogs
5. Material DatePicker
6. Grid recyclerview.
7. Dashboard Cards.

**11\. Material Transition Animations**

When we are moving from one activity to another, we will apply beautiful transition animations on our activities.

```xml
<set xmlns:android="http://schemas.android.com/apk/res/android" >

    <translate
        android:duration="50"
        android:fromYDelta="0%p"
        android:interpolator="@android:anim/accelerate_interpolator"
        android:toYDelta="100%p" />

</set>
```

Let's start.

### 1\. Installing Required Libraries

We will need several libraries. Libraries are code modules that allow us to implement particular features in our app without re-inventing the wheel. Here are some libraries we are using:

**(a). Fast Networking Library**

This will be our HTTP client. This app is meant to teach how to use Fast networking library to create an android app that interacts with PHP MySQL database. The library can be installed from jcenter:

```groovy
    implementation 'com.amitshekhar.android:android-networking:1.0.2'
```

**(b). Gson**

Gson is a JSON library, one of the most popular ones for both android and java as a whole. Through Gson, you can convert POKO classes into JSON data and vice versa. Our interest is vice versa, to convert JSON data into POKO classes.This way we don't have to manually parse JSON, a process that can be error-prone. To install Gson:

```groovy
    implementation 'com.google.code.gson:gson:2.8.6'
```

**(c). Picasso**

One of the best image loader libraries is Picasso. It's been in the scene for a very long time, gets continous updates and is maintained by a top organization, Square Inc. Let's install it and use it for downloading our images:

```groovy
    implementation 'com.squareup.picasso:picasso:2.71828'
```

**(d). Calligraphy**

Calligraphy is the best custom font library of android, and really is in it's own league. We use it almost all of our projects. You can use it to inject custom fonts in your application. Typically it's used alongside ViewPump so let's install both:

```groovy
    implementation 'io.github.inflationx:calligraphy3:3.1.1'
    implementation 'io.github.inflationx:viewpump:2.0.3'
```

**(e). LovelyDialogs**

Another great library, LovelyDialogs allows us easily create customizable dialogs, including chooser dialogs. Let's install it:

```groovy
    implementation 'com.yarolegovich:lovely-dialog:1.1.0'
```

![](https://camposha.info/wp-content/uploads/2020/04/death_stars_info_dialog.png) ![](https://camposha.info/wp-content/uploads/2020/04/death_stars_galaxy_picker.png) ![](https://camposha.info/wp-content/uploads/2020/04/death_stars_type_picker.png)

**(f). ShapedImageView**

This libray gives us beautiful shaped imageviews. The imagesviews can be circular, rectangular/square or rectangular/square with round edges.It's hosted in jitpack:

```groovy
    //Circular imageview
    implementation 'cn.gavinliu:ShapedImageView:0.8.6'
```

### Initializing AndroidNetworking

Before we start using AndroidNetworking we need to initialize it. The best place to do that is in our App class. This the class that will be extending the `android.app.Application` class:

```kotlin
class App : Application() {
    override fun onCreate() {
        super.onCreate()
        AndroidNetworking.initialize(this)
```

You can see we've initialized it easily using the `initialize()` method, passing the context in the process.

### Modeling Our Entities

We will have two entities:

**(a). Star.kt**

This will represent our Star object. We define the properties of this star right here. This is our POKO class, Plain Old Kotlin Object.

```kotlin
class Star : Serializable {
    /**
     * Let's now come define our getter and setter methods.
     */
    /**
     * Let' now come define instance fields for this class. We decorate them with
     * @SerializedName
     * attribute. Through this we are specifying the keys in our json data.
     */
    @SerializedName("id")
    var id: String? = ""
    @SerializedName("name")
    var name: String? = ""
    @SerializedName("description")
    var description: String? = ""
    @SerializedName("type")
    var type: String? = ""
    @SerializedName("galaxy")
    var galaxy: String? = ""
    @SerializedName("date")
    var dod: String? = ""
    @SerializedName("image_url")
    var imageURL: String? = ""

    override fun toString(): String {
        return name!!
    }
}
```

![](https://camposha.info/wp-content/uploads/2020/04/death_stars_date_picker.png)

You can see we've initialized our properties with empty values rather than null using the elvis operator. We've also decorated our properties with the `@SerializedName` attribute. This is so that Gson library can map our JSON data to our POKO class.

![](https://camposha.info/wp-content/uploads/2020/04/death_stars_detail_page2.png)

**(b). ResponseModel.kt**

The ResponseModel is to represent our JSON response. That response will have a code, message and optional data.

```kotlin
class ResponseModel {
    /**
     * Our ResponseModel attributes
     */
    @SerializedName("stars")
    var stars: ArrayList<Star>? = ArrayList()
    @SerializedName("code")
    var code: String? = "-1"
    @SerializedName("message")
    var message: String? = "UNKNOWN MESSAGE"
}
```

We've yet again initialized our properties to default values. This allows us safely handle null resulsts from the server.

**(c). Requestcall.kt**

Then we have another model class, our RequestCall.kt class. This class is to represent a single HTTP request we make. It represents the process. For example our process will involve the following states:

1. Status of the Request
2. Message associated with the request.
3. Associated data downloaded from the request.

```kotlin
class RequestCall {
    var status = 0
    var message: String? = "UNKNOWN MESSAGE"
    var stars: ArrayList<Star>? = ArrayList()
}
```

### StarRepository - Our CRUD class

We will create a class called `StarRepository`. This class will be our CRUD class. Here we will write logic for performing CRUD operations using Fast Networking Library. These operations include:

1. Uploading Image and Text to server.
2. Updating Only Text
3. Updating Both Image and Text
4. Deleting Image and Text
5. Fetching Image and Text with Pagination

Each operation will have a corresponding method that acually performs the operation. All these methods will be returning **MutableLiveData** objects that can be subscribed to to give us the data. Start by creating the class:

```kotlin
class StarRepository {
```

**(a). Uploading Image and Text**

Then create a function called `upload()` that takes a star object as well as an image file as parameters and returns a MutableLiveData object:

```kotlin
    fun upload(s: Star, image: File): MutableLiveData<RequestCall>{
```

We then instantiate our RequestCall class and attach default message and status to it:

```kotlin
        val r=RequestCall()
        r.status= IN_PROGRESS
        r.message="Uploading..Please wait"
```

Now instantiate the MutableLiveData class and assign it the instantiated RequestCall object:

```kotlin
        val mLiveData = MutableLiveData<RequestCall>()
        mLiveData.value=r
```

Now invoke the `upload()` method of the `AndroidNetworking` class, passing the target URL:

```kotlin
        AndroidNetworking.upload(Constants.BASE_URL+"index.php")
```

Start by attaching the multipart file using the `addMultipartFile` function:

```kotlin
            .addMultipartFile("image", image)
```

In the method you pass a tag and the image file. Now add more multipart paramaters:

```kotlin
            .addMultipartParameter("action", Constants.UPLOAD)
            .addMultipartParameter("name", s.name)
            .addMultipartParameter("description", s.description)
            .addMultipartParameter("type", s.type)
            .addMultipartParameter("galaxy", s.galaxy)
            .addMultipartParameter("dod", s.dod)
```

Optionally set a tag and priority:

```kotlin
            .setTag("upload")
            .setPriority(Priority.HIGH)
```

Then build:

```kotlin
            .build()
```

Here is how we listen to and report the upload progress to the UI:

```kotlin
            .setUploadProgressListener { bytesUploaded, totalBytes ->
                // do anything with progress
                r.message= (bytesUploaded/totalBytes*100).toString()+" % Uploaded"
                mLiveData.postValue(r)
            }
```

We can then handle the response which is a json object:

```kotlin
            .getAsJSONObject(object : JSONObjectRequestListener {
                override fun onResponse(response: JSONObject?) {
                    r.status= SUCCEEDED
                    // do anything with response
                    if(response == null){
                        r.message="It seems your server is returning null"
                    }else{
                        val gson=Gson()
                        val rm = gson.fromJson(response.toString(),ResponseModel::class.java)
                        r.message=rm.message
                    }
                    mLiveData.postValue(r)
                }
```

We also handle the failure which is an `ANError` object:

```kotlin
                override fun onError(error: ANError) { // handle error
                    r.status= FAILED
                    r.message=error.message
                    mLiveData.postValue(r)
                }
```

Finally we return the LiveData object as we promised:

```kotlin
        return mLiveData
    }
```

Here is the full method:

```kotlin
    fun upload(s: Star, image: File): MutableLiveData<RequestCall>{
        val r=RequestCall()
        r.status= IN_PROGRESS
        r.message="Uploading..Please wait"
        val mLiveData = MutableLiveData<RequestCall>()
        mLiveData.value=r
        AndroidNetworking.upload(Constants.BASE_URL+"index.php")
            .addMultipartFile("image", image)
            .addMultipartParameter("action", Constants.UPLOAD)
            .addMultipartParameter("name", s.name)
            .addMultipartParameter("description", s.description)
            .addMultipartParameter("type", s.type)
            .addMultipartParameter("galaxy", s.galaxy)
            .addMultipartParameter("dod", s.dod)
            .setTag("upload")
            .setPriority(Priority.HIGH)
            .build()
            .setUploadProgressListener { bytesUploaded, totalBytes ->
                // do anything with progress
                r.message= (bytesUploaded/totalBytes*100).toString()+" % Uploaded"
                mLiveData.postValue(r)
            }
            .getAsJSONObject(object : JSONObjectRequestListener {
                override fun onResponse(response: JSONObject?) {
                    r.status= SUCCEEDED
                    // do anything with response
                    if(response == null){
                        r.message="It seems your server is returning null"
                    }else{
                        val gson=Gson()
                        val rm = gson.fromJson(response.toString(),ResponseModel::class.java)
                        r.message=rm.message
                    }
                    mLiveData.postValue(r)
                }

                override fun onError(error: ANError) { // handle error
                    r.status= FAILED
                    r.message=error.message
                    mLiveData.postValue(r)
                }
            })
        return mLiveData
    }
```

The above method will easily upload image and text to the server. In the realtime it reports the upload progress and messages. It also handles successful responses as well as failure.

![](https://camposha.info/wp-content/uploads/2020/04/death_stars_crud_new.png)

**(b). Downloading Data with Pagination**

Another important function is the ability to download or read data stored in our MySQL database. We will download our data in chunks, making our app fast and efficient. Downloaded data will also cached in the hard disk. To paginate our data, we will need to send the amount of data we want as well as where our pagination is starting. We will know where the pagination is starting based on the last item in our recyclerview.

Start by creating a function called fetch and pass it the two parameters we've mentioned above:

```kotlin
    fun fetch(start: String, limit: String): MutableLiveData<RequestCall>{
```

Prepare our RequestCall object which will be returned as the generic parameter of our MutableLiveData object:

```kotlin
        val r=RequestCall()
        r.status=IN_PROGRESS
        r.message="Fetching Next Page..Please wait"
```

Now instantiate the LiveData and set it's value:

```kotlin
        val mLiveData = MutableLiveData<RequestCall>()
        mLiveData.value=r
```

We will be making a HTTP POST request so let's use the `post()` method of the `AndroidNetworking` class, passing it our target URL:

```kotlin
        AndroidNetworking.post(Constants.BASE_URL+"index.php")
```

Then let's add the body parameters to our request, specifying tags as well as associated data:

```kotlin
            .addBodyParameter("action", Constants.SELECT_WITH_PAGINATION)
            .addBodyParameter("start", start)
            .addBodyParameter("limit", limit)
```

We will then set our tag, priority then build the request:

```kotlin
            .setTag(Constants.SELECT_WITH_PAGINATION)
            .setPriority(Priority.HIGH)
            .build()
```

We will then handle the response, which will be a JSONObject:

```kotlin
            .getAsJSONObject(object : JSONObjectRequestListener {
                override fun onResponse(response: JSONObject?) {
                    // do anything with response
                    r.status=SUCCEEDED

                    if(response == null){
                        r.message="It seems your server is returning null"
                    }else{
                        val gson=Gson()
                        val rm = gson.fromJson(response.toString(),ResponseModel::class.java)
                        r.message=rm.message
                        r.stars=rm.stars
                    }

                    mLiveData.postValue(r)
                }
```

We will also handle our `ANError` object:

```kotlin
                override fun onError(error: ANError) {
                    // handle error
                    r.status= FAILED
                    r.message=error.message
                    mLiveData.postValue(r)
                }
            })
```

And of course return our MutableLiveData object:

```kotlin
        return mLiveData
    }
```

Here is the full method:

```kotlin
    fun fetch(start: String, limit: String): MutableLiveData<RequestCall>{
        val r=RequestCall()
        r.status=IN_PROGRESS
        r.message="Fetching Next Page..Please wait"
        val mLiveData = MutableLiveData<RequestCall>()
        mLiveData.value=r
        AndroidNetworking.post(Constants.BASE_URL+"index.php")
            .addBodyParameter("action", Constants.SELECT_WITH_PAGINATION)
            .addBodyParameter("start", start)
            .addBodyParameter("limit", limit)
            .setTag(Constants.SELECT_WITH_PAGINATION)
            .setPriority(Priority.HIGH)
            .build()
            .getAsJSONObject(object : JSONObjectRequestListener {
                override fun onResponse(response: JSONObject?) {
                    // do anything with response
                    r.status=SUCCEEDED

                    if(response == null){
                        r.message="It seems your server is returning null"
                    }else{
                        val gson=Gson()
                        val rm = gson.fromJson(response.toString(),ResponseModel::class.java)
                        r.message=rm.message
                        r.stars=rm.stars
                    }

                    mLiveData.postValue(r)
                }

                override fun onError(error: ANError) {
                    // handle error
                    r.status= FAILED
                    r.message=error.message
                    mLiveData.postValue(r)
                }
            })
        return mLiveData
    }
```

![](https://camposha.info/wp-content/uploads/2020/04/death_stars_progress_card.png)

The `StarRepository` contains all the methods for performing our CRUD operations.

### Creating our ViewModel class

Let's come and create our ViewModel class. This class will expose the functionality we've written in our `StarRepository` class:

```kotlin
class RemoteViewModel(application: Application) : AndroidViewModel(application) {
```

You can see the class is taking an `android.app.Application` object as a parameter via the constructor. It's a;so extending the `androidx.lifecycle.AndroidViewModel` class.

We will have one instance field:

```kotlin
    private val sr: StarRepository = StarRepository()
```

Here is the method that exposes the upload functionality:

```kotlin
    fun upload(star: Star, imageFile: File): MutableLiveData<RequestCall> {
        return sr.upload(star, imageFile)
    }
```

Here is the method that exposes the functionality of uploading both images and text:

```kotlin
    fun updateImageText(star: Star, imageFile: File): MutableLiveData<RequestCall> {
        return sr.updateImageText(star, imageFile)
    }
```

![](https://camposha.info/wp-content/uploads/2020/04/death_stars_crud_edit1.png)

Here is the method that exposes the functionality of saving only text:

```kotlin
    fun updateOnlyText(star: Star): MutableLiveData<RequestCall> {
        return sr.updateOnlyText(star)
    }
```

Here is the method that exposes the functionality of deleting both image and text from the server:

```kotlin
    fun delete(star: Star): MutableLiveData<RequestCall> {
        return sr.delete(star)
    }
```

Here is the method that exposes the functionality of fetching our paginated data from the server:

```kotlin
    fun fetch(start: String, limit: String): MutableLiveData<RequestCall> {
        return sr.fetch(start, limit)
    }
```

### Our BaseActivity Class

We will write some functions whose usage span more than one activity right here in our base activity. That way we are able to employ inheritance, thus encouraging re-usability, reducing the amount of boilerplate code we write and reducing chances of bugs.

For example we write the property to instantiate our ViewModel class in the modern way here:

```kotlin
    protected val remoteViewModel: RemoteViewModel
        get() = ViewModelProvider(this).get(RemoteViewModel::class.java)
```

Showing a Toast message is also something we need in more than one activity:

```kotlin
    protected fun show(message: String?) {
        show(this, message)
    }
```

Opening another activity is also something we will need in many activities:

```kotlin
    protected fun openPage(clazz: Class<*>?) {
        openActivity(this, clazz)
    }
```

We will also need to perform some basic validation before we attempt to post data to the server:

```kotlin
    protected fun validate(file: File?, isFileRequired: Boolean, vararg editTexts: EditText): Boolean {
        val nameTxt = editTexts[0]
        val descriptionTxt = editTexts[1]
        val galaxyTxt = editTexts[2]
        if (file == null && isFileRequired) {
            show("Image is required")
            return false
        }
        if (nameTxt.text == null || nameTxt.text.toString().isEmpty()) {
            nameTxt.error = "Name is Required Please!"
            return false
        }
        if (descriptionTxt.text == null || descriptionTxt.text.toString().isEmpty()) {
            descriptionTxt.error = "Description is Required Please!"
            return false
        }
        if (galaxyTxt.text == null || galaxyTxt.text.toString().isEmpty()) {
            galaxyTxt.error = "Galaxy is Required Please!"
            return false
        }
        return true
    }
```

We will also need to clear our edittexts especially after uploading data:

```kotlin
    protected fun clearEditTexts(vararg editTexts: EditText) {
        editTexts.forEach { editText ->
            editText.setText("")
        }
    }
```

Because we will be applying custom fonts in all our activities, we need need override the following method in all those activities. However, we can override it in the base class then the other methods can simply inherit it:

```kotlin
    override fun attachBaseContext(newBase: Context) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(newBase))
    }
```

Then we write the function to capture our image here as well:

```kotlin
    protected open fun captureImage() {
        val i = Intent(this, ImageSelectActivity::class.java)
        i.putExtra(ImageSelectActivity.FLAG_COMPRESS, false) //default is true
        i.putExtra(ImageSelectActivity.FLAG_CAMERA, true) //default is true
        i.putExtra(ImageSelectActivity.FLAG_GALLERY, true) //default is true
        startActivityForResult(i, 1213)
    }
```

We will also need to show our progress card in more than one activity. It therefore makes sense to write this method once especially considering that this method is a long one:

```kotlin
    private fun createStateCard(title: String?, msg: String?, isShowing: Boolean, STATE: Int) { //state widgets
        val sectionCard = findViewById<LinearLayout>(R.id.sectionLayout)
        val pb = findViewById<ProgressBar>(R.id.pb)
        val stateImg =
            findViewById<ImageView>(R.id.stateImg)
        val titleTV = findViewById<TextView>(R.id.titleTV)
        val msgTV = findViewById<TextView>(R.id.messageTV)
        val closeBtn = findViewById<AppCompatImageButton>(R.id.closeBtn)
        val handler = Handler()
        val delayedHiding =
            Runnable { sectionCard.visibility = View.GONE }
        if (isShowing) {
            sectionCard.visibility = View.VISIBLE
            titleTV.text = title
            msgTV.text = msg
            when (STATE) {
                FAILED -> {
                    stateImg.setImageResource(R.drawable.error_icon)
                    sectionCard.setBackgroundColor(resources.getColor(android.R.color.holo_red_light))
                    pb.visibility = View.GONE
                    handler.postDelayed(delayedHiding, 10000)
                }
                IN_PROGRESS -> {
                    stateImg.setImageResource(R.drawable.load_glass)
                    sectionCard.setBackgroundColor(resources.getColor(R.color.color_7))
                    pb.visibility = View.VISIBLE
                    stateImg.visibility = View.GONE
                }
                SUCCEEDED -> {
                    sectionCard.setBackgroundColor(resources.getColor(R.color.color_7))
                    stateImg.setImageResource(R.drawable.ok_check)
                    pb.visibility = View.GONE
                    handler.postDelayed(delayedHiding, 10000)
                }
                REACHED_END -> {
                    sectionCard.setBackgroundColor(resources.getColor(R.color.niceGreenish))
                    stateImg.setImageResource(R.drawable.m_info)
                    pb.visibility = View.GONE
                    handler.postDelayed(delayedHiding, 10000)
                }
            }
        } else {
            sectionCard.visibility = View.GONE
        }
        closeBtn.setOnClickListener { v: View? ->
            sectionCard.visibility = View.GONE
        }
    }
```

The above method is actually a private one. The method we will be using in our UI is called the `makeRequest()` method. We won't have to pass it all those parameters which are needed in the `createStateCard()` method. You can configure the messages you want to be shown in the progress card here.

```kotlin
    fun makeRequest(r: RequestCall?, OPERATION: String): Int {
        if (r == null) {
            createStateCard(
                "$OPERATION FAILED",
                "Null RequestCall Received",
                true,
                FAILED
            )
        } else {
            if (r.status == IN_PROGRESS) {
                createStateCard(
                    "$OPERATION IN PROGRESS",
                    r.message,
                    true,
                    IN_PROGRESS
                )
            } else if (r.status == FAILED) {
                createStateCard(
                    "WHOOPS!",
                    r.message,
                    true,
                    FAILED
                )
            } else if (r.status == SUCCEEDED) {
                if (r.stars == null || r.stars!!.size == 0) {
                    if (CacheManager.ERUPTIONS_CACHE.size > 0) {
                        createStateCard(
                            "REACHED END!",
                            "Hey! It seems you've reached the end.",
                            true,
                            Constants.REACHED_END
                        )
                    } else {
                        createStateCard(
                            "SUCCESS",
                            r.message,
                            true,
                            SUCCEEDED
                        )
                    }
                } else {
                    createStateCard(
                        "CONGRATS!",
                        "Successfully fetched " + r.stars!!.size + " stars.",
                        true,
                        SUCCEEDED
                    )
                }
            }
            return r.status
        }
        return -999
    }
```

Get the Project [here](https://camposha.info/student-project/death-stars-app-kotlin-fast-networking-library-php-mysql-mvvm-data-binding-disk-caching/).

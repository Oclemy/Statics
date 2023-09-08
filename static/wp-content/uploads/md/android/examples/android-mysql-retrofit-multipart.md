# Download

Android is the most popular operating system in the planet, MySQL is the most popular RDBMS system in the planet, PHP is the most popular server side programming language in the planet. The three work together like charm. In this artice we want to provide documentation to our premium project, Largest Stars Kotlin/Java Retrofit2 MySQL project.


We've created this project to help students quickly get upto speed with using the three platforms we mentioned above. It's first important to note it isn't easy to find a full sample project created specifically for beginners that works. Most projects aren't even full and mostly don't work and have poor documentation and design. Most online retrofit samples use JSON data fetched from several sites. These don't allow you to learn the full range of skills you need to fully master how to create a full professional app for your clients.Check the demo below:

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_gif_demo.gif)

### Apps Contained in this Package.

We have added two apps in this Largest Stars MySQL package:

1. Largest Stars App - Fully written in Kotlin
2. Largest Stars App - Similar Project written in Java.

Both use the same database and PHP. If you are just getting your feet wet with Kotlin language, comparing the Kotlin Project with the Java would quicken your learning.

**Video Demo**

[https://youtu.be/HNswdXr7zTs](https://youtu.be/HNswdXr7zTs)

### Project Design

These project are designed to be both high quality and easy to learn. Even though we don't use any design pattern, the projects are organized in clean packages. Variables are well named. We attempt to avoid duplication of methods, we define a method only once and re-use it. Null values are properly handled both in Kotlin and Java project.

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_project_structure.png)

### What You will learn from these project

Here are the concepts and techniques we want to teach you this project:

#### General Concepts

1. **KOTLIN and JAVA** - You will learn how a similar functionality is implemented in both languages.
2. **MULTIPART CRUD** - Uploading/Downloading/Updating/Deleting both images and text to and from the server smoothly. We cater for both Kotlin and Java.
3. **RETROFIT2** - Using Retrofit2, the most popular third party android http client.
4. **PHP MYSQL** - Perfoming CRUD operations against Mysql database from PHP. Then encoding response to json for android.
5. **PAGINATION** - Efficiently performing load more pagination in android with data fetched from server. Pagination is performed at the server, making the app both fast and bandwith friendly. Both Kotlin and Java projects have pagination.
6. **DISK CACHING** - The data in the app is browsable even when completely offline. This is because we cache data offline using a library implementing LRU(Least Recently Used) caching. Caching is catered for both in the Kotlin as well as Java project.
7. **DESIGNING USER INTERFACES** - We use activities as our pages. We will design them using XML.
8. **DATA BINDING** - We will use data binding in this project in all our pages. This simplifies our code and allows us take advantage of modern coding standards.
9. **IMAGES FROM CAMERA,GALLERY and File Manager** - We allow you to capture images directly from camera, file manager and gallery easily without any effort at all, then send it to the server.
10. **CREATING FULL PROJECT** - Basically you will learn how to put together a full project in both Kotlin and Java.

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_disk_caching.png)

## UI Design

### (a). Pages

We are using activities as our pages. Here are the activities we create:

| No. | Name | Role |
| --- | --- | --- |
| 1. | Splash Activity | To brand our app. |
| 2. | Dashboard Activity | Our cental navigation activity. |
| 3. | Upload Activity | To allow us to upload,update and delete images and text. |
| 4. | Listing Activity | To allow us download and list our images and text |
| 5. | Detail Activity | To allow us show details of a single star. |
| 6. | AboutUsActivity | To allow us show our contact details |

### (b). Messages

We may need to show messages here and their in the app. Here are the three options available in both apps:

1. Toasts - Classic toasts to flash messages in any activity.
2. Dialogs - To show messages that require interactivity. User has to manually close the message. Moreover we can show title,message,icon and buttons.
3. Sneaker - Custom Toast you can modify as you desire. For example, you specify where the message will appear. You can change the background color,text color, icon as well as period after which the message disappears.

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_sneaker.png)![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_load_more_pagination.png)

### (c) Input Views

To input data we use the following widgets:

1. EditText - To input text.
2. Single-Choice Dialog - To select a single item, like star type, from a list.
3. DatePicker - To allow selecting date.

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_date_picker-1.png)

#### How to Design our Data Object.

Alot of care has to be taken when designing our data object. First the data object has to be compatible with JSON data we will downloading. Meaning that the json keys will need to correspond to the serialized names we annotate our attributes with.

Moreover for Kotlin, taking care of possibility of null values is paramount. We will use elvis operator to assign default values.

Here is the data object in kotlin:

```kotlin
import com.google.gson.annotations.SerializedName
import java.io.Serializable

/**
 * Let's Create our Star class to represent a single Star.
 * It will implement java.io.Serializable interface, a marker interface that will allow
 * our
 * class to support serialization and deserialization.
 */
class Star : Serializable {
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
    @SerializedName("dod")
    var dod: String? = ""
    @SerializedName("image_url")
    var imageURL: String? = ""

    override fun toString(): String {
        return name!!
    }
}
```

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_detail_page.png)

Here is the star data object in java:

```java
public class Star implements Serializable {
    /**
     * Let' now come define instance fields for this class. We decorate them with
     * @SerializedName
     * attribute. Through this we are specifying the keys in our json data.
     */
    @SerializedName("id")
    private String id;
    @SerializedName("name")
    private String name;
    @SerializedName("description")
    private String description;
     @SerializedName("type")
     private String type;
    @SerializedName("galaxy")
    private String galaxy;
    @SerializedName("dod")
    private String dod;
    @SerializedName("image_url")
    private String imageURL;
```

We use a `Star` because it allows us to represent a range of propertoes that will require different type of widgets for them to be added. For example:

1. Id - Autogenerated by mysql
2. Name - EditText - Single Line
3. Description - EditText - Multi Line
4. Type - Single Choice Dialog
5. Galaxy - Single Choice Dialog
6. DoD - MaterialDatePicker

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_new_crud.png)

The image url will returned from the server. The fields supplied in the `@SerializedName()` attribute will have to match the keys in the json data.

If you ever wanted to customize these apps, it is this Star data object that you will start with.

### Mapping JSON to our ResponseModel class

We are downloading data from the server in JSON format. We want to map that data to a simple data object class in both our Kotlin and Java projects.That's where our `ResponseModel` class comes.

The response model class is a simple but extremely important class. If you are getting malformed JSON errors then this and our `Star` class are the first classes you check. Fields supplied in the `@SerializedName()` attribute will be mapped to json data. If that mapping fails then you get malformed json errors. Here is our response model class:

Here is the class in Kotlin:

```kotlin
/**
 * Our json response will be mapped to this class.
 */
class ResponseModel {
    /**
     * Our ResponseModel attributes
     */
    @SerializedName("stars")
    var result: ArrayList<Star> = ArrayList()
    @SerializedName("code")
    var code: String? = "-1"
    @SerializedName("message")
    var message: String? = "UNKNOWN MESSAGE"

}
```

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_listing_page.png)

In Java:

```java
/**
 * Our json response will be mapped to this class.
 */
public class ResponseModel {
    /**
     * Our ResponseModel attributes
     */
    @SerializedName("stars")
    private List<Star> stars;
    @SerializedName("code")
    private String code;
    @SerializedName("message")
    private String message;

    //...
```

Again, those serialized names attributes have to correspond to the keys in our json data. If they don't match, malformed exception may be raised as Gson won't be able to map the json to our response model class.

### Defining our HTTP methods

HTTP methods are the methods that will represent the requests we made to the server. Their are different types of standard HTTP methods like `GET`,`POST`,`PATCH`,`DELETE` etc. We don't have to use all these. In fact just one, the `POST` method is enough for us. We may also occasionally use `GET`. However `POST` is the one we use mostly since it allows us send data to the server easily. For example we send our pagination parameters this way while downloading our data. We inform the server of the number of items we want as well as the row at which it should start. Of course we also do our uploads,updates and deletes this way. For the delete we inform the server of the row to be deleted.

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_progressbar.png)

Here is the RestApi interface in Kotlin:

```kotlin
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.*

/**
 * Let's define our imports
 */
/**
 * Let's Create an interface
 */
interface RestApi {
    /**
     * This method will allow us perform a HTTP GET request to the specified url
     * .The response will be a ResponseModel object.
     */
    @GET("index.php")
    fun retrieve(): Call<ResponseModel?>?

    /**
     * This method will allow us to search our data while paginating the search results. We
     * specify the search and pagination parameters as fields.
     */
    @FormUrlEncoded
    @POST("index.php")
    fun search(
        @Field("action") action: String?,
        @Field("query") query: String?,
        @Field("start") start: String?,
        @Field("limit") limit: String?
    ): Call<ResponseModel?>?

    /**
     * This method will allow us perform a HTTP POST request to the specified url.In the process
     * we will upload data to mysql and return a ResponseModel object
     *
     * Multipart Denotes that the request body is multi-part. Parts should be declared as parameters
     * and annotated with @Part.
     */
    @Multipart
    @POST("index.php")
    fun upload(
        @Part("action") action: RequestBody?,
        @Part("name") name: RequestBody?,
        @Part("description") description: RequestBody?,
        @Part("type") type: RequestBody?,
        @Part("galaxy") galaxy: RequestBody?,
        @Part("dod") dod: RequestBody?,
        @Part starImage: MultipartBody.Part?
    ): Call<ResponseModel?>?

    /**
     * This method will allow us update our mysql data by making a HTTP POST request.
     * After that
     * we will receive a ResponseModel model object
     */
    @Multipart
    @POST("index.php")
    fun update(
        @Part("action") action: RequestBody?,
        @Part("id") id: RequestBody?,
        @Part("name") name: RequestBody?,
        @Part("description") description: RequestBody?,
        @Part("type") type: RequestBody?,
        @Part("galaxy") galaxy: RequestBody?,
        @Part("dod") dod: RequestBody?,
        @Part starImage: MultipartBody.Part?
    ): Call<ResponseModel?>?

    @FormUrlEncoded
    @POST("index.php")
    fun updateOnlyText(
        @Field("action") action: String?,
        @Field("id") id: String?,
        @Field("name") name: String?,
        @Field("description") description: String?,
        @Field("type") type: String?,
        @Field("galaxy") galaxy: String?,
        @Field("dod") dod: String?
    ): Call<ResponseModel?>?

    /**
     * This method will allow us to remove or delete from database the row with the
     * specified
     * id.
     */
    @FormUrlEncoded
    @POST("index.php")
    fun delete(@Field("action") action: String?, @Field("id") id: String?): Call<ResponseModel?>?
}
```

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_listing_page.png)

Here is the RestApi interface in Java:

```java
public interface RestApi {
    /**
     * This method will allow us perform a HTTP GET request to the specified url
     * .The response will be a ResponseModel object.
     */
    @GET("index.php")
    Call<ResponseModel> retrieve();

    /**
     * This method will allow us to search our data while paginating the search results. We
     * specify the search and pagination parameters as fields.
     */
    @FormUrlEncoded
    @POST("index.php")
    Call<ResponseModel> search(@Field("action") String action,
                               @Field("query") String query,
                               @Field("start") String start,
                               @Field("limit") String limit);

    /**
     * This method will allow us perform a HTTP POST request to the specified url.In the process
     * we will upload data to mysql and return a ResponseModel object

     * Multipart Denotes that the request body is multi-part. Parts should be declared as parameters
     and annotated with @Part.
     */
    @Multipart
    @POST("index.php")
    Call<ResponseModel> upload(
            @Part("action") RequestBody action,
            @Part("name") RequestBody name,
            @Part("description") RequestBody description,
            @Part("type") RequestBody type,
            @Part("galaxy") RequestBody galaxy,
            @Part("dod") RequestBody dod,
            @Part MultipartBody.Part starImage);

    /**
     * This method will allow us update our mysql data by making a HTTP POST request.
     * After that
     * we will receive a ResponseModel model object
     */

    @Multipart
    @POST("index.php")
    Call<ResponseModel> update(
            @Part("action") RequestBody action,
            @Part("id") RequestBody id,
            @Part("name") RequestBody name,
            @Part("description") RequestBody description,
            @Part("type") RequestBody type,
            @Part("galaxy") RequestBody galaxy,
            @Part("dod") RequestBody dod,
            @Part MultipartBody.Part starImage);

    @FormUrlEncoded
    @POST("index.php")
    Call<ResponseModel> updateOnlyText(@Field("action") String action,
                                       @Field("id") String id,
                                       @Field("name") String name,
                                       @Field("description") String description,
                                       @Field("type") String type,
                                       @Field("galaxy") String galaxy,
                                       @Field("dod") String dod);

    /**
     * This method will allow us to remove or delete from database the row with the
     *  specified
     * id.
     */
    @FormUrlEncoded
    @POST("index.php")
    Call<ResponseModel> delete(@Field("action") String action, @Field("id") String id);
}
//end
```

### How to Upload Data

Here are the steps to upload data in the app. This process applies to both the Kotlin and Java project:

1. Open UploadActivity
2. Capture photo via Camera. Photo will automatically be set in our top banner. You easily replace the already capture photo. You can also pick images from gallery and even from file manager. We have a bottom sheet dialog that allows you to specify the action you want to perform.
3. Fill edittexts. Some fields like name and description are mandatory.
4. Click upload button.

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_new_crud2.png)

Here is the upload process

1. First we validate the fields before attempting an upload. You have to select an image to upload. While selecting image, permissions will be checked at runtime.
2. We start upload, showing a beautiful custom progress bar.
3. If the process completes we dismiss the progresssbar and show you a completion message. We may also clear edittexts to allow you upload a new star or take you to the listing activity to refresh data.

Here is our Upload method in Kotlin:

```kotlin
    /**
     * Upload images and text to the server
     */
    private fun upload(imageToUpload: File, s: Star) {
        val api = client!!.create(RestApi::class.java)
        /*
        `Call<T>` is an interface that represents an invocation of a Retrofit method that sends
        a request to a webserver and returns a response.
        */
        val uploadCall = api.upload(
            rb("UPLOAD"), rb(s.name), rb(s.description),
            rb(s.type), rb(s.galaxy), rb(s.dod), getMultipartBody(imageToUpload)
        )
        b!!.pb.visibility = View.VISIBLE
        show(this, "Uploading...")
        /*
        `enqueue()` is an abstract method that will asynchronously send the request and notify callback of
        its response or if an error occurred
        talking to the server, creating the request, or processing the response.
        `Callback` is an interface that Communicates responses from a server or offline requests.
        One and only one method will be invoked in response to a given request.
        */
        uploadCall!!.enqueue(object : Callback<ResponseModel?> {
            override fun onResponse(call: Call<ResponseModel?>, response: Response<ResponseModel?>) {
                b!!.pb.visibility = View.GONE
                if (!validateResponse(a, response)
                ) return
                //By this time we have already validated our response body so ignore nullpointer warning
                val rc = response.body()!!.code
                if (rc == "1") {
                    CACHE_IS_DIRTY = true
                    STARS_CACHE.clear()
                    show("CONGRATS: n 1. Data Inserted Successfully. n 2. ResponseCode: $rc")
                    clearEditTexts(
                        b!!.nameTxt,
                        b!!.descriptionTxt,
                        b!!.galaxyTxt,
                        b!!.typeTxt,
                        b!!.dodTxt
                    )
                } else if (rc.equals("0", ignoreCase = true)) {
                    CACHE_IS_DIRTY = true
                    STARS_CACHE.clear()
                    showInfoDialog(
                        a,
                        "TEXT SAVED SUCCESSFULLY",
                        getString(R.string.response_code_0)
                    )
                } else if (rc.equals("2", ignoreCase = true)) {
                    showInfoDialog(a, "UNSUCCESSFUL", getString(R.string.response_code_2))
                } else {
                    showInfoDialog(
                        a, "UNKNOWN ERROR", "We can't identify the error you encountered." +
                                "Please re-examine your code. "
                    )
                }
            }

            override fun onFailure(call: Call<ResponseModel?>, t: Throwable) {
                b!!.pb.visibility = View.GONE
                showInfoDialog(
                    a, "FAILURE",
                    "FAILURE THROWN DURING INSERT." +
                            " ERROR Message: " + t.message
                )
            }
        })
    }
```

Here is our upload method in Java:

```java
    private void upload(File imageToUpload, Star u) {
        RestApi api = Utils.getClient().create(RestApi.class);
        // `Call<T>` is an interface that represents an invocation of a Retrofit method that sends
        // a request to a webserver and returns a response.
        Call<ResponseModel> uploadCall = api.upload(rb("UPLOAD"), rb(u.getName()), rb(u.getDescription()),
                rb(u.getType()), rb(u.getGalaxy()), rb(u.getDod()), getMultipartBody(imageToUpload));

        pb.setVisibility(View.VISIBLE);
        Utils.show(this, "Uploading...");

        // `enqueue()` is an abstract method that will asynchronously send the request and notify callback of
        // its response or if an error occurred
        // talking to the server, creating the request, or processing the response.
        // `Callback` is an interface that Communicates responses from a server or offline requests.
        // One and only one method will be invoked in response to a given request.

        uploadCall.enqueue(new Callback<ResponseModel>() {
            @Override
            public void onResponse(Call<ResponseModel> call, Response<ResponseModel> response) {
                pb.setVisibility(View.GONE);

                if (!Utils.validateResponse(a, response)) return;

                //By this time we have already validated our response body so ignore nullpointer warning
                String rc = response.body().getCode();

                if (rc.equals("1")) {
                    CacheManager.MEM_CACHE_DIRTY = true;
                    CacheManager.STARS_CACHE.clear();
                    show("CONGRATS: n 1. Data Inserted Successfully. n 2. ResponseCode: " + rc);
                    clearEditTexts(b.nameTxt, b.descriptionTxt, b.galaxyTxt, b.typeTxt, b.dodTxt);
                } else if (rc.equalsIgnoreCase("0")) {
                    CacheManager.MEM_CACHE_DIRTY = true;
                    CacheManager.STARS_CACHE.clear();
                    showInfoDialog(a, "TEXT SAVED SUCCESSFULLY", getString(R.string.response_code_0));
                } else if (rc.equalsIgnoreCase("2")) {
                    showInfoDialog(a, "UNSUCCESSFUL", getString(R.string.response_code_2));
                } else {
                    showInfoDialog(a, "UNKNOWN ERROR", "We can't identify the error you encountered." +
                            "Please re-examine your code. ");
                }

            }

            @Override
            public void onFailure(Call<ResponseModel> call, Throwable t) {
                pb.setVisibility(View.GONE);
                showInfoDialog(a, "FAILURE",
                        "FAILURE THROWN DURING INSERT." +
                                " ERROR Message: " + t.getMessage());
            }
        });
    }
```

### Capturing Photo from Camera,Gallery and File Manager

As we said earlier we provide an integrated way of obtaining the photo you want to send to the server. Here is how it works:

1.You click the select/capture button in our upload activity.

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_capture_photo.png)

2\. We show you a bottom sheet dialog with three options: Camera, Gallery and File Manager. 3. Choosing Camera immediately opens the camera. You capture the image and it gets returned to our Upload activity and be set as our top banner. If you want to change it you click the capture again and to take a new photo.

3\. Choosing the gallery opens the gallery. You can select the image from the gallery.

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_gallery.png)

4\. Choosing the file manager opens the file manager. In the file manager you navigate to the appropriate folder yourself and click on the image you choose.

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_file_picker.png)

5\. You can easily change the chosen image by reclicking the capture/select button.

6\. If you abandon the capture/select process the image you had chosen earlier will still be set as our top banner and will be used.

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_update_page_2.png)

7\. We receive the captured/selected image in `onActivityResult` method:

Our onActivityResult will give us a string, which is the file path. We use it to instantiate a File object, which we are holding as an activity field:

```kotlin
    private var chosenFile: File? = null
```

Here is the onActivityResult() in Kotlin:

```kotlin
    /**
     * After user has captured or picked image. We will hold it in a file
     * and also show it in our top banner
     */
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK && data != null) {
            if (requestCode == 1213) {
                val filePath =
                    data.getStringExtra(ImageSelectActivity.RESULT_FILE_PATH)
                chosenFile = File(filePath)
                Picasso.get().load(chosenFile!!).error(R.drawable.ic_error).into(b!!.topImageView)
            }
        }
        resumedAfterImagePicker = true
    }
```

And here is it in Java:

```java
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK && data != null) {
            if (requestCode == 1213) {
                String filePath = data.getStringExtra(ImageSelectActivity.RESULT_FILE_PATH);
                chosenFile = new File(filePath);
                //set captured image to imageview using Picasso
                Picasso.get().load(chosenFile).error(R.drawable.ic_error).into(b.topImageView);
            }
        }
        resumedAfterImagePicker = true;
    }
```

The above requires permissions so you have to go to your android manifest and add the appropriate permissions as below:

```xml
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

Runtime Permissions are handled for you by the ImagePicker library we use.

![](https://camposha.info/wp-content/uploads/2020/02/bottomsheet_options_retrofit_multipart.png) ![](https://camposha.info/wp-content/uploads/2020/02/emulator_camera.png) ![](https://camposha.info/wp-content/uploads/2020/02/emulator_camera_ok.png) ![](https://camposha.info/wp-content/uploads/2020/02/catured_image.png) ![](https://camposha.info/wp-content/uploads/2020/02/catured_images_recyclerview.png)

### How to apply your own fonts in the app

1. Download your fonts from online. There are many download sites, just make sure you read the licenses well.
2. Add that font in the `/assets/fonts` folder.
3. Now go to your `App.java` class and specify the font:

In Kotlin, let's say you want to use RobotoBold font. Once you've downloaded it and placed in the assets folder:

```kotlin
class App : Application() {
    override fun onCreate() {
        super.onCreate()

        /*
        Initialize custom font usage. This applies application wide
        fonts. You can change the default font.
        */
        ViewPump.init(
            ViewPump.builder()
                .addInterceptor(
                    CalligraphyInterceptor(
                        CalligraphyConfig.Builder()
                            .setDefaultFontPath("fonts/RobotoBold.ttf")
                            .setFontAttrId(R.attr.fontPath)
                            .build()
                    )
                )
                .build()
        )
    }
}
```

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_update_page_1.png)

Let's say you want to use Verdana, make sure you've added it in the assets folder. Then:

```java
    @Override
    public void onCreate() {
        super.onCreate();
        ViewPump.init(ViewPump.builder()
                .addInterceptor(new CalligraphyInterceptor(
                        new CalligraphyConfig.Builder()
                                .setDefaultFontPath("fonts/Verdana.ttf")
                                .setFontAttrId(R.attr.fontPath)
                                .build()))
                .build());
    }
```

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_closable_welcome_message.png)![](https://camposha.info/wp-content/uploads/2020/03/retrofit_multipart_crud_about_us_screen.png)

For example above am using Verdana font. You can also use the custom fonts in the specific widgets only as opposed to the whole application as we've done above. To use it specific widget, go to the widget in the XML code and specify the `fontPath` attribute:

```xml
        <TextView
            android:id="@+id/mGalaxyTxt"
            fontPath="fonts/RobotoCondensed-Regular.ttf"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentRight="true"
            android:text="Galaxy"
            android:textAppearance="?android:attr/textAppearanceSmall"
            android:textColor="@color/colorAccent"
            android:textStyle="italic"
            tools:ignore="MissingPrefix" />
```

Android studio may require you to ignore missing prefix. You do it by adding the following:

```xml
tools:ignore="MissingPrefix"
```

Then for fonts to be applied to the activities:

```java
    /**
     * Lets Set the base context for this ContextWrapper.
     * All calls will then be delegated to the base context.
     * @param context - ContextBase to Wrap.
     * Return - ContextWrapper to pass back to the activity.
     */
    @Override
    protected void attachBaseContext(Context context) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(context));
        //context - ContextBase to Wrap.
        //wrap() - returned ContextWrapper to pass back to the activity.
    }
```

Or in Kotlin:

```kotlin
    override fun attachBaseContext(newBase: Context) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(newBase))
    }
```

A good place of overriding the above method is in the BaseActivity class. Then the descendants of that class don't have to override it any more.

![](https://camposha.info/wp-content/uploads/2020/03/kotlin_mysql_largest_stars_detail_page_collapsed.png)

### Download

Download the code [here](https://camposha.info/student-project/retrofit-mysql-multipart-images-crud-upload-download-update-delete-full/).

# Download

This is a project to teach you how to work with Firebase Realtime Database alongside Firebase Cloud Storage to perform all the CRUD operations. This app is a Largest Stars app. We upload Stars details in our editing screen. These details include images and text. The image gets uploaded first into Firebase Cloud Storage. The URL for the image is then returned and saved alongside other texts in Firebase Realtime Database.


![](https://camposha.info/wp-content/uploads/2019/11/Firebase-Image-Text-Listing-Screen.png)

Then in our Listings Screen we download data from Firebase Realtime Database. The images will be fetched using Picasso from Firebase Cloud Storage. We download paginated data. As the user scrolls through the recyclerview we download paginated data by listening to recyclerview scroll events and checking our current page which we maintain in our activity. These images alongside texts are shown in a recyclerview with cardviews.

We also have an image carousel or slider. This slides or switches through the images in a beautiful manner. When the user clicks a single recyclerview item, we open the detail page. Here we have a collapsing toolbar layout on top of a cardview. The cardview is rendering our data using textviews. The cardview alongside the collapsing toolbar layout are contained inside a NestedScrollView as indirect children.

When the user clicks the Floating Action button inside our detail page we open the editing screen. Here the user can replace the image as well as the texts. We perform an update against our Firebase Realtime Database. We also upload the image to the Firebase Cloud storage and store its URL in the database.

The user can also delete the item. When deleting the image will be deleted from the Firebase Cloud Storage then its url alongside the star object be deleted from Firebase Realtime database.

### Design Pattern

We use Model View ViewModel design pattern in this project. Models will relate to our data. In the data folder we will have our data objects as well as repository classes. We will write logic for performing Upload/Download/Edit/Delete/Search operations in the repository class. The data object will on the other hand define properties of our Star.

We will have a directory called common. This folder will contain classes defining methods and fields that can be re-used in many other classes. For example Constants will have our application constants. Utils will have our application utilities while FilterHelper is a helper class to allow us implement search filter against our recyclerview data.

```java
    public static void show(Context c,String message){
        Toast.makeText(c, message, Toast.LENGTH_SHORT).show();
    }

    public static void openActivity(Context c,Class clazz){
        Intent intent = new Intent(c, clazz);
        c.startActivity(intent);
    }
```

The UI will have two folders: activities and base. The base folder will contain our base activities. Then our activities folder will contain actual user activities that derive from the base activities we defined in the base folder. This will allow us to define functionalities that can be inherited in multiple activities.

e.g

```java
    @Override
    public void onBackPressed() {
        super.onBackPressed();
        this.finish();
    }

    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(newBase));
    }
```

### Project Structure

Here is the project structure.

**/common**

| No. | Class | Main Role |
| --- | --- | --- |
| 1. | Constants.java | To hold our application constants. |
| 2. | Utils.java | To hold re-usable application utility methods. |
| 3. | FilterHelper.java | To help in implementing recyclerview filtering. |

**/data/model/entity/**

| No. | Class | Main Role |
| --- | --- | --- |
| 1. | Star.java | This is our data object class. |

**/data/model/process/**

| No. | Class | Main Role |
| --- | --- | --- |
| 1. | RequestCall.java | To represent a single Firebase operation. |

**/data/repository/**

| No. | Class | Main Role |
| --- | --- | --- |
| 1. | StarRepository.java | Business Logic class |

**/data/viewmodel/**

| No. | Class | Main Role |
| --- | --- | --- |
| 1. | StarsViewModel.java |

**/view/adapter/**

| No. | Class | Main Role |
| --- | --- | --- |
| 1. | MyAdapter.java | To bind data to recyclerview |

**/view/ui/base/**

| No. | Class | Main Role |
| --- | --- | --- |
| 1. | BaseActivity.java | To define functionalities common to majority of our activities. |
| 2. | BaseEditingActivity.java | To define functionalities common to editing activities. |

**/view/ui/activities/**

| No. | Class | Main Role |
| --- | --- | --- |
| 1. | SplashActivity.java | To show our brand when the app starts. |
| 2. | DashboardActivity.java | To act as the center of our app. |
| 3. | AboutUsActivity.java | To show our contact information. |
| 4. | CRUDActivity.java | To allow us Upload, Update and Delete. |
| 5. | ListingActivity.java | To allow us download and render. |
| 6. | DetailActivity.java | To show details for a single star. |

**/**

| No. | Class | Main Role |
| --- | --- | --- |
| 1. | App.java | To initialize our font loading library. |

### App.java

This will be the application class. We are using custom fonts thus we initialize Calligraphy, our font injection library here. We do this in the onCreate() method which is the best place since by the time this method is invoked our UI is yet to be created.

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

In our assets folder we have added Verdana fonts which we are loading above.

### Constants.java

_This will contain our application constants._

```java
    public static final int OPERATION_IN_PROGRESS = 0;
    public static final int OPERATION_COMPLETE_SUCCESS = 1;
    public static final int OPERATION_COMPLETE_FAILURE = -1;

    public static final int ERROR_STATE = -1;
    public static final int PROGRESS_STATE = 0;
    public static final int SUCCESS_STATE = 1;
```

For example above are constants to represent for us various states.

### Utils.java

_This will contain our re-usable methods to perform all sorts of tasks._

These methods are our utility methods and it makes sense to make them static. Thus we won't be needing to instantiate this class every now and then.

```java
    public static void showInfoDialog(final AppCompatActivity activity, String title,
                                      String message) {
        new LovelyStandardDialog(activity, LovelyStandardDialog.ButtonLayout.HORIZONTAL)
                .setTopColorRes(R.color.indigo)
                .setButtonsColorRes(R.color.darkDeepOrange)
                .setIcon(R.drawable.m_info)
                .setTitle(title)
                .setMessage(message)
                .setPositiveButton("Relax", v -> {})
                .setNeutralButton("Go Home", v -> openActivity(activity, DashboardActivity.class))
                .setNegativeButton("Go Back", v -> activity.finish())
                .show();
    }
```

For example above is a method to create for us Lovely info dialog to show some information.

Here's a method to obtain a file extension and return it as a string:

```java
    public static String getFileExtension(Context c, Uri uri) {
        ContentResolver cR = c.getContentResolver();
        MimeTypeMap mime = MimeTypeMap.getSingleton();
        return mime.getExtensionFromMimeType(cR.getType(uri));
    }
```

Or a method to load for us an image from the network:

```java
    public static void loadImageFromNetwork(String imageURL, int fallBackImage,
                                            ImageView imageView){
        if(imageURL != null && !(imageURL.isEmpty())){
            Picasso.get().load(imageURL).
                    placeholder(R.drawable.placeholder).into(imageView);
        }else {
            Picasso.get().load(fallBackImage).into(imageView);
        }
    }
```

The above method is using Picasso. You can see the method is safe as it checks for the null and emptiness, in which case it will use a fallback image.

And more and more.

### FilterHelper.java

_This method will allow us perform filtering against our Recyclerview and publish results to the adapter._

The class will start by inheriting from `android.widget.Filter`, an abstract class. After which we get forced to override two methods: `performFiltering()` and `publishResults()`.

Here's the performFiltering method:

```java
    @Override
    protected FilterResults performFiltering(CharSequence constraint) {
        FilterResults filterResults=new FilterResults();

        if(constraint != null && constraint.length()>0)
        {
            //CHANGE TO UPPER
            constraint=constraint.toString().toUpperCase();

            //HOLD FILTERS WE FIND
            ArrayList<Star> foundFilters=new ArrayList<>();

            String name,galaxy,description;

            //ITERATE CURRENT LIST
            for (int i=0;i<currentList.size();i++)
            {
                name= currentList.get(i).getName();
                galaxy= currentList.get(i).getGalaxy();
                description= currentList.get(i).getDescription();

                //SEARCH
                if(name.toUpperCase().contains(constraint)){
                    foundFilters.add(currentList.get(i));
                }else if(galaxy.toUpperCase().contains(constraint)){
                    foundFilters.add(currentList.get(i));
                }else if(description.toUpperCase().contains(constraint)){
                    foundFilters.add(currentList.get(i));
                }
            }

            //SET RESULTS TO FILTER LIST
            filterResults.count=foundFilters.size();
            filterResults.values=foundFilters;
        }else
        {
            //NO ITEM FOUND.LIST REMAINS INTACT
            filterResults.count=currentList.size();
            filterResults.values=currentList;
        }

        //RETURN RESULTS
        return filterResults;
    }
```

### Star.java

This will be our data class.

It will define for us the properties of a star. We will be uploading stars to our Firebase database.

```java
public class Star implements Serializable {

    private String mId;
    private String name;
    private String description;
    private String galaxy;
    private String type;
    private String size;
    private String dod;
    private String starImage;
    private String key;

...
```

### RequestCall.java

This will represent an operation against our Firebase Realtime Database and Firebase Cloud storage.

It will define the following:

1. The state of the operation.
2. The associated message.
3. An optional List of stars.

```java
public class RequestCall {
    private int status;
    private String message;
    private List<Star> stars;

    ...
```

### StarsRepository.java

This is business logic class.

We will write code for uploading to Firebase, updating, deleting as well as searching right here. Every method defined right here will be returning a MutableLiveData object.

Here are the methods we will write:

1. select()
2. insertOnlyText()
3. insertImageText()
4. updateOnlyText()
5. updateImageText()
6. deleteImagetext()
7. deleteOnlyImage()
8. search()

For example to select or download both images and text from Firebase:

```java
    public MutableLiveData<RequestCall> select() {
        MutableLiveData<RequestCall> mLiveData = new MutableLiveData<>();

        RequestCall requestCall = new RequestCall();
        requestCall.setStatus(Constants.OPERATION_IN_PROGRESS);
        requestCall.setMessage("Fetching Stars Please Wait..");

        mLiveData.setValue(requestCall);

        DB.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                MEMORY_CACHE.clear();

                if (dataSnapshot.exists() && dataSnapshot.getChildrenCount() > 0) {
                    for (DataSnapshot ds : dataSnapshot.getChildren()) {
                        //Now get Star Objects and populate our arraylist.
                        Star star = ds.getValue(Star.class);
                        if (star != null) {
                            star.setKey(ds.getKey());
                            MEMORY_CACHE.add(star);
                        }
                    }
                    requestCall.setStatus(Constants.OPERATION_COMPLETE_SUCCESS);
                    requestCall.setMessage("DOWNLOAD COMPLETE");
                } else {
                    requestCall.setStatus(Constants.OPERATION_COMPLETE_SUCCESS);
                    requestCall.setMessage("NO DATA FOUND");
                }

                requestCall.setStars(MEMORY_CACHE);
                mLiveData.postValue(requestCall);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                Log.d("FIREBASE CRUD", databaseError.getMessage());
                requestCall.setStatus(Constants.OPERATION_COMPLETE_FAILURE);
                requestCall.setMessage(databaseError.getMessage());
                mLiveData.postValue(requestCall);
            }
        });
        return mLiveData;
    }
```

### StarsViewModel.java

This is our ViewModel class.

Rather than invoking our logic methods directly from the user interface, we can decouple these methods as per MVVM design pattern. We simply write the logic code in a separate class then have them exposed via ViewModel class.

```java
public class StarsViewModel extends AndroidViewModel {
    private StarsRepository starsRepository;

    public StarsViewModel(@NonNull Application application) {
        super(application);
        starsRepository = new StarsRepository();
    }
    public MutableLiveData<RequestCall> insertStar(Star star, Uri imageUri, String imageExtension){
        return starsRepository.insertImageText(star,imageUri,imageExtension);
    }
    ...
```

Find the Project [here..](https://camposha.info/student-project/largest-stars-app-firebase-images-text-upload-download-full-crud/)

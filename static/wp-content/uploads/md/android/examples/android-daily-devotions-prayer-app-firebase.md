# Daily Devotions - Prayers App – Firebase+MVVM+Multi-Admin Auth+Room

Android Daily Devotions App is a beautiful and complete android prayer app that is especially suitable for students who want to learn how to create a complete app for multiple users. We've created this app to allow students to learn how to create a full android application using the following technologies

1. LANGUAGE - Java (Kotlin version will soon follow)
2. CLOUD DATABASE - Firebase Realtime Database
3. LOCAL DATABASE - SQLite - using Room
4. SHAREDPREFERENCES - To store our logged in user.
5. DESIGN PATTERN - MVVM(Model View ViewModel)/Clean Architecture
6. DATA BINDING
7. LISTING VIEW - Custom Expandable RecyclerView with sections.
8. NAVIGATION PAGE - Navigation Drawer with Bottom Navigation Bar as well as toolbar menus
9. PAGES - Fragments for simple pages and Activities for complex pages
10. LISTING STYLE - Daily View, Archive View
11. DETAIL PAGE - Scrollable activity with jumbotron
12. CRUD PAGE DESIGN - Intelligently re-using the same CRUD page for posting,updating and deleting. Rather than creating three pages, we create only one and re-use it.
13. Naviagtion Types - Navigation Drawer, Bottom Navigation Bar, Toolbar menus.


Here are the features of this app:

### Logged In and Non-Logged In mode

The app allows users that are either logged in or not logged in to use it.

```java
        if (PermissionManager.isLoggedIn()) {
            //You are logged in
        }else{
            //You are not logged in
        }
```

#### (a). Annonymous/Non-Logged in Users

These are users that aren't logged in the system. They may be already registered or not. They can:

1. View all devotions
2. View a list of users.
3. Pray with an already registered user.

#### (b). Logged in Users

These are users logged in the system. Obviously they are already registered. Users can create account and log into the system. Logged in users can do stuff in the system based on their capabilities.

Basic users can:

1. Do everything an annonymous user can.
2. View their account details
3. Update their account.
4. NB/= We will add more features in the future as we get more ideas. Please post us your suggestion.

Administrator users can:

1. Do everything a basic user can.
2. Create a new Devotion.
3. Update an existing devotion.
4. Delete an existing devotion.
5. View a basic users account details.
6. Update a basic users account details.

### Types of Users

1. Administrators
2. Editors
3. Basic Users
4. Subscribers

You can add more user types, change the labels or change the capabilities.

The roles are defined as constants in our `Constants` class:

```java
    public static final String ROLE_SUBSCRIBER = "SUBSCRIBER";
    public static final String ROLE_BASIC_USER= "BASIC_USER";
    public static final String ROLE_EDITOR = "EDITOR";
    public static final String ROLE_ADMIN = "ADMINISTRATOR";
    public static final String DEFAULT_ROLE = ROLE_ADMIN;
```

### Creating a new Devotion

Administrators can create a new devotion. A devotion comprises the following:

1. Title
2. Content
3. Book(e.g Corinthians)
4. Category(e.g Forgiveness)
5. Date

Some fields are mandatory.

The admin will be given a list of books that he can choose via a material single choice dialog.

![](https://camposha.info/wp-content/uploads/2020/02/book_picker.png)

Likewise for the category.

![](https://camposha.info/wp-content/uploads/2020/02/category_picker.png)

We also have a beautiful material datepicker dialog to pick dates.

![](https://camposha.info/wp-content/uploads/2020/02/date_picker.png)

To publish the devotion there is a toolbar menu item that when clicked starts the publish process. It's super quick since we don't upload any image or file. We decided not include uploading of an image since a devotion or prayer doesn't require an image everytime. Devotions/Prayers are short in their nature and just involves a few paragraphs. However to provide a better UI experience we show a relevant random image from a list of images we will include in the app. The image is purely for decorative purposes and doens't have to be constant.

While posting a new devotion, we show an unobstructive progress cardview rather than a dialog. Users will be notified of what is happening in realtime as we post data. We utilize livedata to achieve this. For example we show the user a start message, a progress message, and failure message/success message. A beautiful progress spinner is shown when we are in the progress phase. The cardview will be automatically hidden after ten seconds but only after completion. However uses can also manually hide the cardview by clicking the close button. However this won't stop the task already happening. To do that users will have to close the activity or navigate to another activity.

All devotions are stored in Firebase Realtime database.

Here's how we will post a devotion to firebase:

```java
    private void createDevotion(Devotion devotion) {
        getDevotionViewModel().insert(devotion).observe(this, r -> {
            if (makeRequest(r,"DEVOTION CREATION")==Constants.SUCCEDED){
                CacheManager.DEVOTIONS_NEED_REFRESH = true;
                Utils.clearEditTexts(devotionTxt,contentTxt,categoryTxt,bookTxt,dateTxt);
            }
        });
    }
```

### Updating a Devotion

Again only admins can update a devotion. Update is also superquick and includes the fields we mentioned in Creation face. We will use the devotion key to identify the node to be updated. The progress cardview we mentioned earlier will again be shown. Once an update is complete, the listing page will automatically be opened. In that page data is automatically refreshed very quickly.

![](https://camposha.info/wp-content/uploads/2020/02/edit_devotion_page.png)

These are fields that can be updated:

1. Title - EditText
2. Content - EditText
3. Book(e.g Corinthians) - Single choice dialog
4. Category(e.g Forgiveness) - Single choice dialog
5. Date - MaterialDatePicker

Here's how we will update a devotion in Firebase realtime database:

```java
    private void updateDevotion(Devotion devotion) {
        getDevotionViewModel().update(devotion).observe(this, r -> {
            if (makeRequest(r,"DEVOTION UPDATE")==Constants.SUCCEDED){
                CacheManager.DEVOTIONS_NEED_REFRESH = true;
                Utils.clearEditTexts(devotionTxt,contentTxt,categoryTxt,bookTxt,dateTxt);
                finish();
            }
        });
    }
```

### Deleting a Devotion

Again only admins can delete a devotion. When admins open the edit page. They will see a delete menu item next to the update icon. When clicked we permanently delete the devotion from firebase realtime database. A progress card is also shown and again we inform users of success or failure.

Here's how we delete a given devotion:

```java
    private void deleteDevotion(Devotion devotion) {
        //we use mvvm
        getDevotionViewModel().delete(devotion).observe(this, r -> {
            if (makeRequest(r,"DEVOTION DELETE")==Constants.SUCCEDED){
                CacheManager.DEVOTIONS_NEED_REFRESH = true;
                Utils.clearEditTexts(devotionTxt,contentTxt,categoryTxt,bookTxt,dateTxt);
                finish();
            }
        });
    }
```

### Creating an account

This project includes a user management capability. People can create a new account. For DEMO purposes,if you create a new account we automatically assign you the admin privileges. This means you get the ability to create,updae and delete devotions. You can even view other people's details. Obviously this is for demo purposes and you need to disable it in your production app. How? Well by turning defaul user to basic in the code.

![](https://camposha.info/wp-content/uploads/2020/02/register_process.png)

Users can specify the following properties while creating a new account:

1. Name - EditText
2. Email - EditText
3. Password - EditText
4. Image URL - EditText
5. Role - Single choice dialog

Here's how we will be creating an account for the user:

```java
        User u = new User();
        u.setName(nameTxt.getText().toString());
        u.setEmail(emailTxt.getText().toString());
        u.setPassword(passwordTxt.getText().toString());
        u.setRole(roleTxt.getText().toString());
        u.setImageURL(imageURLTxt.getText().toString());

        getUserViewModel().registerUser(u).observe(this,
                r -> {
                    if (makeRequest(r, "ACCOUNT CREATION") == SUCCEDED) {
                        Utils.sendUserToActivity(c, u, LoginActivity.class);
                        finish();
                    }
                });
```

The logic for registering user then saving his/her properties in the database are defined in our Repository class.

### Updating account

A user can update his or her account as well as other people's account if he is an administrator. This is for DEMO purposes and should be changed in a production app.

![](https://camposha.info/wp-content/uploads/2020/02/update_account_devotions.png)

Users can specify the following properties while updating an account:

1. Name - EditText
2. Email - EditText
3. Password - EditText
4. Image URL - EditText
5. Role - Single Choice Dialog

Here's how we will be updating user account:

```java
    private void updateAccount() {
        User u;
        if (receivedUser != null) {
            u = receivedUser;
        } else {
            u = CURRENT_USER;
        }
        u.setName(nameTxt.getText().toString());
        u.setImageURL(imageURLTxt.getText().toString());
        u.setRole(roleTxt.getText().toString());
        getUserViewModel().updateUser(u).observe(this, r -> {
            if (makeRequest(r, "ACCOUNT UPDATE") == SUCCEDED) {
                //save to sqlite database
                getLocalViewModel().saveUser(u);
                if (receivedUser == null) {
                    CURRENT_USER = u;
                    //save to shared preferences
                    PrefUtils.save(c, u);
                }
                Picasso.get().load(u.getImageURL()).error(R.drawable.profile).into(profileImg);
            }
        });
    }
```

### Login User

This project includes a login feature. We have a complete login page. Users can login using their email and password. We use Firebase authentication to achieve smooth login. However after loging in, we will pre-fetch our devotions as well as our users before moving to the listings page.

![](https://camposha.info/wp-content/uploads/2020/02/login_devotion_page.png)

You login using the following properties:

1. Email
2. Password

```java
            if (validateFields(typedEmail, typedPassword)) {
                userViewModel.loginUser(typedEmail, typedPassword).observe(this,
                        requestCall -> {
                            if (makeRequest(requestCall, "LOGIN") == SUCCEDED) {
                                //cache logged in user then move to to homeactivity
                            }
                        }
            }
```

While signing user in a progress cardview will be shown. This cardview textviews and custom loading indicator/progressbar. The textviews allow us to show title and message of the current operation.

![](https://camposha.info/wp-content/uploads/2020/02/login_in_process.png)

### Logout User

Users will aslo be able to logout. Signing Out is immediate. There is no connection to the server as the login state is stored offline in the device. FirebaseAuth classes allows us to logout easily with the `signOut()` method:

```java
                loginBtn.setOnClickListener(v -> {
                    if (PermissionManager.isLoggedIn()) {
                        Constants.FIREBASE_AUTH.signOut();
                        CURRENT_USER = null;
                        PrefUtils.delete(c);
                        openPage(LoginActivity.class);
                    } else {
                        openPage(LoginActivity.class);
                    }
                });
```

You can see that we listen to loginBtn click event and check for the login status of the user. If the user is logged in we log him out using the `signOut()` method of the `FirebaseAuth` class.

![](https://camposha.info/wp-content/uploads/2020/02/navigation_drawer_open.png)

Otherwise we open the LoginActivity. Take note that we are using the same button for both logging out and in. We will simply change it's text property to either `Login` or `Log Out` depending on the status.

In short here are the things we do when the user clicks the login/logout button(it's the same button):

1. Check Login status from the permission manager class.
2. If user is logged in we sign him out using the FirebaseAuth class, then assign null to our static `CURRENT_USER` object, then delete the user from our sharedpreferences,
3. If the user isn't logged in we take him to the logout page.

### Daily Devotions View

In the home fragment of our navigation drawer, in the home tab of our bottom navigation view, all users can view devotions listed by day.If you select a given day we filter out devotions for that day only and show them.

One of the beautiful features of this app is the beautiful categorization of our devotions. In each day we are listing categories in the expandable recyclerview headers and the devotions within that category in the content section. Users can expand or collapse each section.

![](https://camposha.info/wp-content/uploads/2020/02/today.png)

Users can scroll through the dates, to pick a date in the future or a past date. If there is no devotion for that date we simply show a simple static message in a textview.

![](https://camposha.info/wp-content/uploads/2020/02/yesterday_devotions.png)

### Archive View

Well we also have an archive view. Users can view all devotions in this page. You reach this page by clicking the bottom navigation view's archive tab. In the archive page we categorize our devotions based on dates.

![](https://camposha.info/wp-content/uploads/2020/02/group_by_categories.png) ![](https://camposha.info/wp-content/uploads/2020/02/group_by_dates.png)

### Users Listing View

In this View you can view all registered users in the system. This is again for educational purposes. In a real app you may not want other users to know the already registered users in the system and know their capabilities.

![](https://camposha.info/wp-content/uploads/2020/02/devotions_user_list_page.png)

However you can pray with another user. You just click a let's pray button and the lord's prayer is shown in a dialog. You pray then click `Amen` button. There is nothing magical about it. This is a prayer app and we are trying to create such type of experiences in our users mind.

![](https://camposha.info/wp-content/uploads/2020/02/stand_up_we_pray_dialog.png)

### How to Pray in this app

This app as we said earlier on is a prayer app. So we have included a fragment to allow both logged in and non-logged in users to pray. We use christianity lord's prayer but this is not mandatory.

![](https://camposha.info/wp-content/uploads/2020/02/lets_pray_page.png)

Change it to bhagavad gita or quran or any form or prayer. For us programmers it's just some text in a fragment, but for our users it will have divine meaning. We show a relevant random prayer image as a top banner on this fragment.

### Prayer Gallery

We've included what we call the prayer gallery. It is a beautiful gallery with swipeable images. These images are hosted in the app. Users can swipe through these images. This gallery helps create prayer experience in the app. Don't include annoying or vulgar images. Later on we will add the ability to download these images from url. For now they are bundled in the app.

![](https://camposha.info/wp-content/uploads/2020/02/prayer_gallery.png)

### Viewing Your Account

Users can view their account unless they are annonymous(not logged in). Your account page includes the ability to view:

1. Your profile image - in a circular imageview
2. account name/your name.
3. Your role
4. Your Email
5. Your password - hidden by default but you can toggle it to view it.

![](https://camposha.info/wp-content/uploads/2020/02/account_page_devotions.png)

### NavigationView

We have a beautiful navigation view or navigation drawer in the app. In it we list most of the pages you can visit. You can add more pages and we will add more in the future updates and list them here. The page can either be a fragment, an activity or a dialog fragment. A navigation view menu item can also be an action like exit, or log out.

### Design Pattern

As we said earlier are using MVVM(Model View ViewModel) design pattern. This gives us the following advantages:

1. Professional design using recommended design pattern.
2. Easy code re-use
3. Easy maintenance.
4. Easy to test.
5. Easy to understand.

### Firebase Realtime Database

We are using Firebase realtime database, a reliable cloud database owned by Google. It has a free version which is more than enough for us. It has the following advantages:

1. Free version.
2. Easy to use.
3. Stable APIs and well documented.
4. Fast.

### Offline First using Room with SQLite database

While using firebase is great, and while firebase also supports offline caching, we want to use a real local database. This makes our application offline-first. Users won't need internet to view our data. They can close the device, open it and access our data.

Room allows us easily manipulate SQLite database. We learn how to use it to save data from Firebase. We see how to insert,select,update and delete data against not only Firebase but also Room.

We will have two tables in our SQLite database:

1. DevotionsTB - To store devotions.
2. UsersTB - To store downloaded users.

All in all Room will make our application offline-first, thus making it faster and saving users' bandwith.

For example here is our Data Access Object interface:

```java
@Dao
public interface GeneralDAO {

    //NB= Methods annotated with @Insert can return either void, long, Long, long[],
    //Long[] or List<Long>.
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    long  insert(Devotion devotion);

    //Update methods must either return void or return int (the number of updated rows).
    @Update(onConflict = OnConflictStrategy.REPLACE)
    int update(Devotion devotion);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    Long[] insertAll(List<Devotion> devotions);

    //Deletion methods must either return void or return int (the number of deleted rows).
    @Delete
    int  delete(Devotion devotion);

    @Query("SELECT * FROM devotionstb ORDER BY devotionDate DESC")
    LiveData<List<Devotion>> selectAll();

    @Query("SELECT * FROM devotionstb WHERE devotionDate LIKE :taskDate")
    LiveData<List<Devotion>> selectByDate(String taskDate);

    @Query("DELETE FROM devotionstb WHERE id LIKE :id")
    int delete(int id);
    //NB= Deletion methods must either return void or return int (the number of deleted rows).
    @Query("delete from devotionstb")
    int deleteAll();

    /**
     * USERS
     * @return
     */

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    Long[] insertAllUsers(List<User> users);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    long  insertUser(User user);

    @Query("SELECT * FROM userstb")
    LiveData<List<User>> selectAllUsers();

    @Query("delete from userstb")
    int deleteAllUsers();
}
//end
```

The above interface caters for both devotions and users. These abstract methods will be invoked in our Repository class. In that class we will perform these CRUD operations in the background thread using asynctask:

For example to save a single devotion to the sqlite database:

```java
    static class SaveDevotionTask extends AsyncTask<Devotion, Void, Long> {
        @Override
        protected Long doInBackground(Devotion... devotions) {
            return generalDAO.insert(devotions[0]);
        }
    }
    public Long saveDevotion(Devotion devotion) {
        try {
            return new SaveDevotionTask().execute(devotion).get();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }
```

Doing these operations in the background thread will prevent us from freezing the user interface if we have lots of data locally.

### Saving Logged in User using SharedPreferences

SharedPreferences allows us to store simple key-value pairs locally. Not only can you use it to store settings, but also things a logged in user. For us to make our application modern and user friendly, we want to save our users the effort of every time having to fill in email and passwords.

We can simply save them offline then access them whenever we want to authenticate our users. Again this promotes our offline-first approach to app design.

For example here is how we save a user to sharedpreferences:

```java
    public static void save(Context context, User user) {
        SharedPreferences.Editor editor = getPreferences(context).edit();
        editor.putString("KEY", user.getKey());
        editor.putString("EMAIL", user.getEmail());
        editor.putString("PASSWORD", user.getPassword());
        editor.putString("NAME", user.getName());
        editor.putString("ROLE", user.getRole());
        editor.putString("IMAGE_URL", user.getImageURL());
        editor.apply();
    }
```

## Technical FAQs

### (a). Roles and Permissions

#### 1\. How do I make the app have only one admin?

In the demo we have made the app have several admins purely for demo purposes. This enables students to explore the whole capability of the app. However it's super simple to make the app have only one admin.

Once you've created your account as an admin, you change the value of `DEFAULT_ROLE` to another role like `BASIC_USER`: e.g:

```java
    //Change default role of created user
    public static final String DEFAULT_ROLE = ROLE_BASIC_USER;
```

Then go to `AccountActivity` then disable the `roleTxt`:

```java
roleTxt.setEnabled(false);
```

In the demo we have include the ability to choose your own role, so we have to disable it using the above line. You can place it in the `onResume()` method.

#### 2\. How do I create more roles and user types?

The user types are defined as static strings in the `Constants` class.For example suppose you are modifying the project to a School Management System android app, you can have roles like these:

```java
    public static final String ROLE_PARENT = "PARENT";
    public static final String ROLE_STUDENT = "STUDENT";
    public static final String ROLE_TEACHER= "TEACHER";
    public static final String ROLE_DEPUTY_HEADTEACHER = "DEPUTY_HEADTEACHER";
    public static final String ROLE_HEADTEACHER = "HEADTEACHER";
    public static final String DEFAULT_ROLE = ROLE_STUDENT;
```

So in the above code we have created 5 roles. When a user signs up he will be automatically assigned a student role. However to give this roles powers you have to go to the `PermissionsManager` class and specify which pages they can visit.

Let's say we want to allow only teacher and head teacher to visit a certain section of the app. Maybe that section contains the ability to post something to the database. Here is how we can do it:

```java
    public static boolean canPostSomethingImportant() {
        if (!isLoggedIn()) return false;
        return CURRENT_USER.getRole().equalsIgnoreCase(ROLE_HEADTEACHER)|| CURRENT_USER.getRole().equalsIgnoreCase(ROLE_DEPUTY_HEADTEACHER);
    }
```

That was posting. What about editing or deleting:

```java
    public static boolean canEditOrDeleteSomethingImportant() {
        if (!isLoggedIn())return false;
        return CURRENT_USER.getRole().equalsIgnoreCase(ROLE_HEADTEACHER)|| CURRENT_USER.getRole().equalsIgnoreCase(ROLE_DEPUTY_HEADTEACHER);
    }
```

What about if we want only teachers to view something and nobody else, not even headteacher:

```java
    public static boolean canViewTeachersStuff(User user) {
        if (CURRENT_USER.getRole() == ROLE_TEACHER) {
            return true;
        }
        if (CURRENT_USER.getKey() == user.getKey()) {
            return true;
        }
        return false;
    }
```

Then in your activity/fragment code, let's say a menu item or button is clicked:

```java
                //then when button is clicked to post something important
                if (PermissionManager.canPostSomethingImportant()) {
                    openPage(SomethingImportantActivity.class);
                } else {
                    DialogUtils.show1OptionDialog(this, "DENIED",
                            "You do not have the necessary privileges to post a user buddy", "Alright");
                }
```

and as for the teachers:

```java
                //then when button is clicked to post something important
                if (PermissionManager.canViewTeachersStuff()) {
                    openPage(TeacherStuffActivity.class);
                } else {
                    DialogUtils.show1OptionDialog(this, "DENIED",
                            "You do not have the necessary privileges to post a user buddy", "Alright");
                }
```

#### 3\. How can I make the pages available to only logged in users?

Here is the flow of the app:

1. User clicks the app icon.
2. Splash activity is opened
3. Splash activity leads us to HomeActivity.
4. From home activity user can view some stuff while some require not only login but the right capability. He/She can also navigate to login page to login. After login he gets directed again to home activity.

So there are two ways of allowing only logged in users into the app:

1. Option 1 is to move users to Login page instead of HomeActivity from the Splash activity.

```java
            @Override
            public void onAnimationEnd(Animation animation) {
                isAnimationFinished = true;
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        //startActivity(new Intent(SplashActivity.this, HomeActivity.class));
                        startActivity(new Intent(SplashActivity.this, LoginActivity.class));
                        finish();

                    }
                }, 1000);
            }
```

If you use this alternative then you have to go the Registration Page(AccountActivity) and remove the `Skip This Process` button. That button allows users to skip signup/login process and view data as an annonymous user.

1. Option 2 is to move to home activit's onResume() method and check is user is logged in. If not then redirect him to the login page.

```java
    @Override
    protected void onResume() {
        super.onResume();

        //check if user is logged in
        if (PermissionManager.isLoggedIn()) {
           //everything is fine, you are logged in.
        } else {
            openPage(LoginActivity.class);
         }
```

### Download

[Download it Now.](https://camposha.info/student-project/daily-devotions-prayer-app-firebase/)

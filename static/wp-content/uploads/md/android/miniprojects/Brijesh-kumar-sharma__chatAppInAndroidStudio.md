# Chat App Firebase Java

>  This chat app is created in android studio using java and firebase.

![Chat App Firebase Java Tutorial](https://user-images.githubusercontent.com/64765400/119440006-5a5e0100-bcd8-11eb-88fb-0712bb223f78.png)

![Chat App Firebase Java Tutorial](https://user-images.githubusercontent.com/64765400/119440053-706bc180-bcd8-11eb-8bb7-2f0b6c5c43df.png)

![Chat App Firebase Java Tutorial](https://user-images.githubusercontent.com/64765400/119440063-75307580-bcd8-11eb-8da2-f3629f67c145.png)

![Chat App Firebase Java Tutorial](https://user-images.githubusercontent.com/64765400/119440078-7f527400-bcd8-11eb-97bc-287362d5d764.png)

![Chat App Firebase Java Tutorial](https://user-images.githubusercontent.com/64765400/119440082-82e5fb00-bcd8-11eb-9c99-3dfeae3e17ee.png)

![Chat App Firebase Java Tutorial](https://user-images.githubusercontent.com/64765400/119440112-91ccad80-bcd8-11eb-9bba-8e7c24034da4.png)

![Chat App Firebase Java Tutorial](https://user-images.githubusercontent.com/64765400/119440138-9b561580-bcd8-11eb-8cdf-76c3a6a4d902.png)

![Chat App Firebase Java Tutorial](https://user-images.githubusercontent.com/64765400/119440156-a14bf680-bcd8-11eb-9818-2533a8f1dfa4.png)


Let us look at the full Chat App Firebase Java code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 10 dependencies:


Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'com.google.gms.google-services'
}

android {
    compileSdkVersion 30
    buildToolsVersion "30.0.3"

    defaultConfig {
        applicationId "com.example.mychatapptutorial"
        minSdkVersion 21
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {

    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'com.google.android.material:material:1.3.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    implementation 'com.google.firebase:firebase-auth:20.0.4'
    implementation 'com.google.firebase:firebase-database:19.7.0'
    implementation 'com.google.firebase:firebase-firestore:22.1.2'
    implementation 'com.google.firebase:firebase-storage:19.2.2'
    testImplementation 'junit:junit:4.+'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
    implementation 'com.hbb20:ccp:2.5.1'

    implementation 'com.squareup.picasso:picasso:2.71828'


    implementation 'com.firebaseui:firebase-ui-firestore:4.1.0'





}
```

#### Step 2. Create Firebase App

You will need to create or setup a Firebase app first. [This link](https://android.examples.directory/add-firebase-to-android/) explains how to do so.

#### Step 3. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

This project will have 8 [`Activities`](htpps://android.examples.directory/activity). For them to be accessible we have to register them. We do that below. Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.mychatapptutorial">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.MyChatAppTutorial">
        <activity android:name=".specificchat"></activity>
        <activity android:name=".UpdateProfile" />
        <activity android:name=".ProfileActivity" />
        <activity android:name=".chatActivity" />
        <activity android:name=".setProfile" />
        <activity android:name=".otpAuthentication" />
        <activity android:name=".MainActivity" />
        <activity android:name=".splashscreen">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 4. Design Layouts

For this project let's create the following layouts:


**(a). `statusfragment.xml`**

> Our `statusfragment` layout.

This layout will represent our 's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#31559C">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Status"
        android:textSize="40sp"
        android:textStyle="bold"
        android:textColor="@color/white"
        android:layout_centerInParent="true">

    </TextView>



</RelativeLayout>
```

**(b). `senderchatlayout.xml`**

> Our `senderchatlayout` layout.

This layout will represent our 's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent" android:layout_height="wrap_content"
    android:layout_marginLeft="50dp"
    android:padding="2dp">

    <RelativeLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentEnd="true"
        android:background="@drawable/senderchatdrawable"
        android:id="@+id/layoutformessage">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Sender Message Display Here "
            android:textSize="18sp"
            android:textColor="@color/black"
            android:paddingLeft="7dp"
            android:paddingRight="40dp"
            android:paddingBottom="7dp"
            android:paddingTop="7dp"
            android:id="@+id/sendermessage">

        </TextView>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/timeofmessage"
            android:textSize="10sp"
            android:layout_toRightOf="@id/sendermessage"
            android:layout_marginLeft="-40dp"
            android:layout_alignBottom="@id/sendermessage"
            android:text="20:09"
            android:padding="7dp"
            android:textColor="#434343" />








    </RelativeLayout>







</RelativeLayout>
```

**(c). `recieverchatlayout.xml`**

> Our `recieverchatlayout` layout.

This layout will represent our 's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent" android:layout_height="wrap_content"

    android:padding="2dp">

    <RelativeLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_marginRight="50dp"
        android:background="@drawable/recieverchatdrawble"
        android:id="@+id/layoutformessage">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Sender Message Display Here "
            android:textSize="18sp"
            android:textColor="@color/black"
            android:paddingLeft="7dp"
            android:paddingRight="40dp"
            android:paddingBottom="7dp"
            android:paddingTop="7dp"
            android:id="@+id/sendermessage">

        </TextView>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/timeofmessage"
            android:textSize="10sp"
            android:layout_toRightOf="@id/sendermessage"
            android:layout_marginLeft="-40dp"
            android:layout_alignBottom="@id/sendermessage"
            android:text="20:09"
            android:padding="7dp"
            android:textColor="#434343" />








    </RelativeLayout>







</RelativeLayout>
```

**(d). `chatviewlayout.xml`**

> Our `chatviewlayout` layout.

This layout will represent our 's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`CardView`](https://android.examples.directory/cardview)
3. [`ImageView`](https://android.examples.directory/imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="90dp"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:background="@color/white">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:paddingLeft="10dp"
        android:paddingRight="10dp"
        android:paddingTop="10dp"
        android:paddingBottom="-5dp">




        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Name Display Here"
            android:layout_toRightOf="@id/cardviewofuser"
            android:layout_marginTop="15dp"
            android:layout_marginLeft="15dp"
            android:textSize="20sp"
            android:id="@+id/nameofuser"
            android:textStyle="bold"
            android:textColor="#0b0b0b">

        </TextView>


        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Status Displays here"
            android:textSize="12sp"
            android:layout_marginLeft="15dp"
            android:layout_marginTop="3dp"
            android:layout_toRightOf="@id/cardviewofuser"
            android:id="@+id/statusofuser"
            android:layout_below="@id/nameofuser"
            android:textColor="#6a6a6a">

        </TextView>




        <androidx.cardview.widget.CardView
            android:layout_width="55dp"
            android:layout_height="55dp"
            android:layout_above="@+id/viewusername"
            android:layout_marginBottom="20dp"
            android:layout_alignParentLeft="true"
            android:layout_centerVertical="true"

            android:id="@+id/cardviewofuser"

            app:cardCornerRadius="55dp">


            <ImageView
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:src="@drawable/ic_launcher_background"
                android:id="@+id/imageviewofuser"
                android:scaleType="centerCrop">

            </ImageView>



        </androidx.cardview.widget.CardView>

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="0.1dp"
            android:layout_marginLeft="10dp"
            android:backgroundTint="#a6a6a6"
            android:background="#a6a6a6"
            android:layout_below="@id/cardviewofuser"
            android:layout_toRightOf="@id/cardviewofuser"
            android:layout_marginTop="-5dp" />





    </RelativeLayout>







</RelativeLayout>
```

**(e). `chatfragment.xml`**

> Our `chatfragment` layout.

This layout will represent our 's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`RecyclerView`](https://android.examples.directory/recyclerview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/white">


    <androidx.recyclerview.widget.RecyclerView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/recyclerview">

    </androidx.recyclerview.widget.RecyclerView>



</RelativeLayout>
```

**(f). `callfragment.xml`**

> Our `callfragment` layout.

This layout will represent our 's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#919191">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Calls"
        android:textSize="40sp"
        android:textStyle="bold"
        android:textColor="@color/white"
        android:layout_centerInParent="true">

    </TextView>



</RelativeLayout>
```

**(g). `activity_update_profile.xml`**

> Our `activity_update_profile` layout.

This layout will represent our Profile Update Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`Toolbar`](https://android.examples.directory/toolbar)
2. [`ImageButton`](https://android.examples.directory/imagebutton)
3. [`TextView`](https://android.examples.directory/textview)
4. [`CardView`](https://android.examples.directory/cardview)
5. [`ImageView`](https://android.examples.directory/imageview)
6. [`EditText`](https://android.examples.directory/edittext)
7. [`Button`](https://android.examples.directory/button)
8. [`ProgressBar`](https://android.examples.directory/progressbar)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/white"
    tools:context=".UpdateProfile">


    <androidx.appcompat.widget.Toolbar
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:layout_marginTop="0dp"
        android:background="#075e54"
        android:id="@+id/toolbarofupdateprofile">

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:gravity="center_vertical">

            <ImageButton
                android:layout_width="40dp"
                android:layout_height="40dp"
                android:id="@+id/backbuttonofupdateprofile"
                android:tint="@color/white"
                android:background="@android:color/transparent"
                android:src="@drawable/ic_baseline_arrow_back_24"
                android:layout_centerVertical="true">

            </ImageButton>



            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Update Profile"
                android:textSize="20sp"
                android:layout_toRightOf="@id/backbuttonofupdateprofile"
                android:id="@+id/myapptext"
                android:layout_marginLeft="10dp"
                android:layout_centerVertical="true"
                android:textStyle="bold"
                android:textColor="@color/white">

            </TextView>


        </RelativeLayout>




    </androidx.appcompat.widget.Toolbar>


    <androidx.cardview.widget.CardView
        android:layout_width="130dp"
        android:layout_height="130dp"
        android:layout_above="@+id/getnewusername"
        android:layout_marginBottom="30dp"
        android:layout_marginLeft="80dp"
        android:id="@+id/getnewuserimage"
        android:layout_centerHorizontal="true"
        app:cardCornerRadius="130dp">


        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:src="@drawable/defaultprofile"
            android:id="@+id/getnewuserimageinimageview"
            android:scaleType="centerCrop">

        </ImageView>



    </androidx.cardview.widget.CardView>


    <EditText
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:inputType="textCapWords"
        android:hint="Enter Your New Name Here"
        android:layout_centerInParent="true"
        android:id="@+id/getnewusername"
        android:layout_centerHorizontal="true"
        android:layout_marginLeft="90dp"
        android:layout_marginRight="90dp"
        >

    </EditText>


    <android.widget.Button
        android:layout_width="150dp"
        android:layout_height="50dp"
        android:layout_centerHorizontal="true"
        android:layout_below="@id/getnewusername"
        android:id="@+id/updateprofilebutton"
        android:layout_marginTop="30dp"
        android:background="#25d366"
        android:text="Update Profile"
        android:textColor="@color/white">

    </android.widget.Button>


    <ProgressBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:visibility="invisible"
        android:layout_marginTop="40dp"
        android:layout_below="@id/updateprofilebutton"
        android:id="@+id/progressbarofupdateprofile">

    </ProgressBar>
























</RelativeLayout>
```

**(h). `activity_splashscreen.xml`**

> Our `activity_splashscreen` layout.

This layout will represent our Splashscreen Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/white"
    tools:context=".splashscreen">


    <ImageView
        android:layout_width="150dp"
        android:layout_height="150dp"
        android:layout_centerInParent="true"
        android:src="@drawable/mychatapplogo">

    </ImageView>


    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="from"
        android:fontFamily="@font/raleway"
        android:textColor="#1E1D1D"
        android:layout_centerHorizontal="true"
        android:layout_above="@+id/maintext"
        android:layout_marginBottom="5dp">

    </TextView>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="TECH PROJECTS"
        android:layout_alignParentBottom="true"
        android:textSize="18sp"
        android:textStyle="bold"
        android:fontFamily="@font/raleway"
        android:id="@+id/maintext"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="30dp"
        android:textColor="#25d366">

    </TextView>


</RelativeLayout>
```

**(i). `activity_specificchat.xml`**

> Our `activity_specificchat` layout.

This layout will represent our Specificchat Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`Toolbar`](https://android.examples.directory/toolbar)
2. [`ImageButton`](https://android.examples.directory/imagebutton)
3. [`CardView`](https://android.examples.directory/cardview)
4. [`ImageView`](https://android.examples.directory/imageview)
5. [`TextView`](https://android.examples.directory/textview)
6. [`RecyclerView`](https://android.examples.directory/recyclerview)
7. [`EditText`](https://android.examples.directory/edittext)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#ECE5DD"
    tools:context=".specificchat">



    <androidx.appcompat.widget.Toolbar
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:layout_marginTop="0dp"
        android:background="#075e54"
        android:id="@+id/toolbarofspecificchat">

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:gravity="center_vertical">

            <ImageButton
                android:layout_width="40dp"
                android:layout_height="40dp"
                android:id="@+id/backbuttonofspecificchat"
                android:tint="@color/white"
                android:background="@android:color/transparent"
                android:src="@drawable/ic_baseline_arrow_back_24"
                android:layout_centerVertical="true">

            </ImageButton>


            <androidx.cardview.widget.CardView
                android:layout_width="35dp"
                android:layout_height="35dp"
                android:id="@+id/cardviewofspeficuser"
               android:layout_marginLeft="5dp"
                android:layout_toRightOf="@id/backbuttonofspecificchat"
               android:layout_centerVertical="true"
                app:cardCornerRadius="35dp">


                <ImageView
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:src="@drawable/defaultprofile"
                    android:id="@+id/specificuserimageinimageview"
                    android:scaleType="centerCrop">

                </ImageView>



            </androidx.cardview.widget.CardView>




            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Name of User"
                android:textSize="20sp"
                android:layout_toRightOf="@id/cardviewofspeficuser"
                android:id="@+id/Nameofspecificuser"
                android:layout_marginLeft="10dp"
                android:layout_centerVertical="true"
                android:textStyle="bold"
                android:textColor="@color/white">

            </TextView>


        </RelativeLayout>




    </androidx.appcompat.widget.Toolbar>

    <androidx.recyclerview.widget.RecyclerView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@id/getmessage"
        android:id="@+id/recyclerviewofspecific"
        android:layout_below="@id/toolbarofspecificchat"
        android:padding="5dp">

    </androidx.recyclerview.widget.RecyclerView>

    <EditText
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:hint="Type a message"
        android:layout_marginLeft="5dp"
        android:layout_marginBottom="5dp"
        android:paddingLeft="20dp"
        android:paddingEnd="10dp"
        android:textSize="18sp"
        android:background="@drawable/messagebackgroun"
        android:textAlignment="textStart"
        android:layout_alignParentBottom="true"
        android:layout_marginRight="55dp"
        android:textColor="@color/black"
        android:textColorHint="#A8A7A7"
        android:id="@+id/getmessage" />


    <androidx.cardview.widget.CardView
        android:layout_width="45dp"
        android:layout_height="45dp"
        android:id="@+id/carviewofsendmessage"
        android:layout_toRightOf="@id/getmessage"
        android:layout_marginLeft="-50dp"
        android:layout_marginBottom="5dp"
        android:backgroundTint="#0D8F80"
        android:layout_alignParentBottom="true"
        app:cardCornerRadius="45dp">


        <ImageButton
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:src="@drawable/ic_baseline_arrow_forward_24"
            android:padding="5dp"
            android:backgroundTint="@android:color/transparent"
            android:background="@android:color/transparent"
            android:id="@+id/imageviewsendmessage"
            android:layout_gravity="center"
            android:scaleType="centerCrop"
            app:tint="@color/white">

        </ImageButton>



    </androidx.cardview.widget.CardView>


















</RelativeLayout>
```

**(j). `activity_set_profile.xml`**

> Our `activity_set_profile` layout.

This layout will represent our Profile Set Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`CardView`](https://android.examples.directory/cardview)
3. [`ImageView`](https://android.examples.directory/imageview)
4. [`EditText`](https://android.examples.directory/edittext)
5. [`Button`](https://android.examples.directory/button)
6. [`ProgressBar`](https://android.examples.directory/progressbar)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/white"
    tools:context=".setProfile">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="30sp"
        android:text="Save Your Profile"
        android:fontFamily="@font/raleway"
        android:layout_above="@+id/getuserimage"
        android:layout_marginBottom="30dp"
        android:textColor="#25d366"
        android:textStyle="bold"
        android:layout_centerHorizontal="true">

    </TextView>



    <androidx.cardview.widget.CardView
        android:layout_width="130dp"
        android:layout_height="130dp"
        android:layout_above="@+id/getusername"
        android:layout_marginBottom="20dp"
        android:layout_marginLeft="80dp"
        android:id="@+id/getuserimage"
        android:layout_centerHorizontal="true"
        app:cardCornerRadius="130dp">


        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:src="@drawable/defaultprofile"
            android:id="@+id/getuserimageinimageview"
            android:scaleType="centerCrop">

        </ImageView>



    </androidx.cardview.widget.CardView>


    <EditText
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:inputType="textCapWords"
        android:hint="Enter Your Name Here"
        android:layout_centerInParent="true"
        android:id="@+id/getusername"
        android:layout_marginLeft="70dp"
        android:layout_marginRight="70dp"
        >

    </EditText>

    <android.widget.Button
        android:layout_width="150dp"
        android:layout_height="50dp"
        android:layout_below="@id/getusername"
        android:id="@+id/saveProfile"
        android:layout_centerHorizontal="true"
        android:textColor="@color/white"

        android:text="Save Profile"
        android:layout_marginTop="20dp"

        android:background="#25d366">

    </android.widget.Button>


    <ProgressBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_below="@id/saveProfile"
        android:id="@+id/progressbarofsetProfile"
        android:visibility="invisible"
        android:layout_marginTop="30dp">

    </ProgressBar>







</RelativeLayout>
```

**(k). `activity_profile.xml`**

> Our `activity_profile` layout.

This layout will represent our Profile Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`Toolbar`](https://android.examples.directory/toolbar)
2. [`ImageButton`](https://android.examples.directory/imagebutton)
3. [`TextView`](https://android.examples.directory/textview)
4. [`CardView`](https://android.examples.directory/cardview)
5. [`ImageView`](https://android.examples.directory/imageview)
6. [`EditText`](https://android.examples.directory/edittext)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/white"
    tools:context=".ProfileActivity">




    <androidx.appcompat.widget.Toolbar
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:layout_marginTop="0dp"
        android:background="#075e54"
        android:id="@+id/toolbarofviewprofile">

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:gravity="center_vertical">

            <ImageButton
                android:layout_width="40dp"
                android:layout_height="40dp"
                android:id="@+id/backbuttonofviewprofile"
                android:tint="@color/white"
                android:background="@android:color/transparent"
                android:src="@drawable/ic_baseline_arrow_back_24"
                android:layout_centerVertical="true">

            </ImageButton>



            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Your Profile"
                android:textSize="20sp"
                android:layout_toRightOf="@id/backbuttonofviewprofile"
                android:id="@+id/myapptext"
                android:layout_marginLeft="10dp"
                android:layout_centerVertical="true"
                android:textStyle="bold"
                android:textColor="@color/white">

            </TextView>


        </RelativeLayout>




    </androidx.appcompat.widget.Toolbar>


    <androidx.cardview.widget.CardView
        android:layout_width="130dp"
        android:layout_height="130dp"
        android:layout_above="@+id/viewusername"
        android:layout_marginBottom="20dp"
        android:layout_marginLeft="80dp"
        android:id="@+id/viewuserimage"
        android:layout_centerHorizontal="true"
        app:cardCornerRadius="130dp">


        <ImageView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:src="@drawable/defaultprofile"
            android:id="@+id/viewuserimageinimageview"
            android:scaleType="centerCrop">

        </ImageView>



    </androidx.cardview.widget.CardView>



    <ImageView
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:id="@+id/logoofviewprofile"
        android:src="@drawable/ic_baseline_person_24"
        android:layout_alignLeft="@id/viewusername"
        android:layout_marginLeft="-60dp"
        app:tint="#716e6e"
        android:layout_centerInParent="true"/>


    <EditText
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:inputType="textCapWords"
        android:hint="Enter Your Name Here"
        android:layout_centerInParent="true"
        android:id="@+id/viewusername"
        android:layout_centerHorizontal="true"
        android:clickable="false"
        android:enabled="false"
        android:layout_marginLeft="90dp"
        android:layout_marginRight="90dp"
        >

    </EditText>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Want To Update Your Profile ?"
        android:layout_centerInParent="true"
        android:layout_below="@id/viewusername"
        android:layout_marginTop="50dp"
        android:paddingLeft="20dp"
        android:paddingRight="20dp"
        android:paddingBottom="10dp"
        android:paddingTop="10dp"
        android:id="@+id/movetoupdateprofile"
        android:textColor="#303030">

    </TextView>



















</RelativeLayout>
```

**(m). `activity_otp_authentication.xml`**

> Our `activity_otp_authentication` layout.

This layout will represent our Authentication Otp Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)
3. [`EditText`](https://android.examples.directory/edittext)
4. [`Button`](https://android.examples.directory/button)
5. [`ProgressBar`](https://android.examples.directory/progressbar)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/white"
    tools:context=".otpAuthentication">


    <ImageView
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:src="@drawable/mychatapplogo"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="40dp"
        android:id="@+id/logo">

    </ImageView>


    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Enter The OTP Which You Recieved"
        android:textSize="20sp"
        android:textAlignment="center"
        android:fontFamily="@font/raleway"
        android:textStyle="bold"
        android:padding="20dp"
        android:textColor="#6e6e6e"
        android:layout_below="@id/logo"
        android:id="@+id/textheading">

    </TextView>



    <EditText
        android:layout_width="150dp"
        android:layout_height="50dp"
        android:layout_centerHorizontal="true"
        android:layout_below="@id/textheading"
        android:layout_marginLeft="120dp"
        android:layout_marginRight="120dp"
        android:hint="Enter the OTP here...."
        android:textColor="@color/black"
        android:id="@+id/getotp"
        android:textAlignment="center"
        android:inputType="number">

    </EditText>


    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Didn't Recieve ? Change Your Number"
        android:id="@+id/changenumber"
        android:layout_below="@id/getotp"
        android:layout_centerHorizontal="true"
        android:textColor="@color/black"
        android:textSize="18sp"
        android:layout_marginTop="15dp">

    </TextView>

    <android.widget.Button
        android:layout_width="wrap_content"
        android:layout_height="40dp"
        android:layout_below="@id/changenumber"
        android:id="@+id/verifyotp"
        android:layout_centerHorizontal="true"
        android:textColor="@color/white"
        android:paddingLeft="40dp"
        android:text="Verify OTP"
        android:layout_marginTop="50dp"
        android:paddingRight="40dp"
        android:background="#25d366">

    </android.widget.Button>


    <ProgressBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_below="@id/verifyotp"
        android:id="@+id/progressbarofotpauth"
        android:visibility="invisible"
        android:layout_marginTop="30dp">

    </ProgressBar>




</RelativeLayout>
```

**(n). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)
3. [`CountryCodePicker`](https://android.examples.directory/countrycodepicker)
4. [`EditText`](https://android.examples.directory/edittext)
5. [`Button`](https://android.examples.directory/button)
6. [`ProgressBar`](https://android.examples.directory/progressbar)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/white"
    tools:context=".MainActivity">


    <ImageView
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:src="@drawable/mychatapplogo"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="40dp"
        android:id="@+id/logo">

    </ImageView>


    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Chat App Will Send OTP To Your Entered Number"
        android:textSize="20sp"
        android:fontFamily="@font/raleway"
        android:textAlignment="center"
        android:textStyle="bold"
        android:padding="20dp"
        android:textColor="#6e6e6e"
        android:layout_below="@id/logo"
        android:id="@+id/textheading">

    </TextView>




    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"
        android:id="@+id/centerhorizontalline">

    </RelativeLayout>




    <com.hbb20.CountryCodePicker
        android:layout_width="match_parent"
        android:layout_height="50dp"
        app:ccp_areaCodeDetectedCountry="true"
        android:layout_centerInParent="true"
        android:layout_marginLeft="100dp"
        android:layout_marginRight="100dp"
        android:id="@+id/countrycodepicker"
        app:ccp_autoDetectCountry="true"
        android:layout_marginBottom="10dp"
        android:layout_above="@id/centerhorizontalline">

    </com.hbb20.CountryCodePicker>


    <EditText
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginLeft="70dp"
        android:layout_marginRight="70dp"
        android:id="@+id/getphonenumber"
        android:hint="Enter Your Number Here"
        android:textAlignment="center"
        android:inputType="number"
        android:textColor="@color/black"
        android:layout_marginTop="10dp"
        android:layout_below="@id/centerhorizontalline">

    </EditText>



    <android.widget.Button
        android:layout_width="wrap_content"
        android:layout_height="40dp"
        android:layout_below="@id/getphonenumber"
        android:id="@+id/sendotpbutton"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="30dp"
        android:textColor="@color/white"
        android:paddingLeft="40dp"
        android:text="Sent OTP"
        android:textSize="15sp"
        android:paddingRight="40dp"
        android:background="#25d366">

    </android.widget.Button>


    <ProgressBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_below="@id/sendotpbutton"
        android:id="@+id/progressbarofmain"
        android:visibility="invisible"
        android:layout_marginTop="30dp">
        
    </ProgressBar>




</RelativeLayout>
```

**(o). `activity_chat.xml`**

> Our `activity_chat` layout.

This layout will represent our Chat Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`Toolbar`](https://android.examples.directory/toolbar)
2. [`TextView`](https://android.examples.directory/textview)
3. [`TabLayout`](https://android.examples.directory/tablayout)
4. [`TabItem`](https://android.examples.directory/tabitem)
5. [`ViewPager`](https://android.examples.directory/viewpager)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/white"
    tools:context=".chatActivity">



    <androidx.appcompat.widget.Toolbar
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:layout_marginTop="0dp"
        android:background="#075e54"
        android:id="@+id/toolbar">

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:gravity="center_vertical">
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="MyChatApp"
                android:textSize="20sp"
                android:id="@+id/myapptext"
                android:textStyle="bold"
                android:textColor="@color/white">

            </TextView>


        </RelativeLayout>




    </androidx.appcompat.widget.Toolbar>

    <com.google.android.material.tabs.TabLayout
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:id="@+id/include"
        android:layout_below="@id/toolbar"
        app:tabTextColor="#77a3a7"
        app:tabSelectedTextColor="@color/white"
        app:tabIndicatorColor="@color/white"
        android:backgroundTint="#075e54"
        app:tabIndicatorHeight="3dp"
        android:layout_marginTop="0dp"
        >
        <com.google.android.material.tabs.TabItem
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Chats"
            android:id="@+id/chat">

        </com.google.android.material.tabs.TabItem>

        <com.google.android.material.tabs.TabItem
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Status"
            android:id="@+id/status">

        </com.google.android.material.tabs.TabItem>

        <com.google.android.material.tabs.TabItem
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Calls"
            android:id="@+id/calls">

        </com.google.android.material.tabs.TabItem>



    </com.google.android.material.tabs.TabLayout>


    <androidx.viewpager.widget.ViewPager
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_below="@id/include"
        android:layout_marginTop="0dp"
        android:id="@+id/fragmentcontainer">

    </androidx.viewpager.widget.ViewPager>







  </RelativeLayout>
```
#### Step 5. Write Code

Finally we need to write our code as follows:


**(a). `userprofile.java`**

> Our `userprofile` class.

Create a java file named `userprofile.java`.

We will be creating the following methods:

1. `getUsername()` - It will return `String` object.

2. `setUsername(String username)`.

3. `getUserUID()` - It will return `String` object.

4. `setUserUID(String userUID)`.

**(a). Our `getUsername()` method.**

A method to get username:

```java
    public String getUsername() {
        return username;
    }
```

**(b). Our `setUsername()` method.**

A method to set username:

```java
    public void setUsername(String username) {
        this.username = username;
    }
```

**(c). Our `setUserUID()` method.**

A method to set user u i d:

```java
    public void setUserUID(String userUID) {
        this.userUID = userUID;
    }
```

**(d). Our `getUserUID()` method.**

A method to get user u i d:

```java
    public String getUserUID() {
        return userUID;
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

public class userprofile {


    public String username,userUID;

    public userprofile() {
    }

    public userprofile(String username, String userUID) {
        this.username = username;
        this.userUID = userUID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserUID() {
        return userUID;
    }

    public void setUserUID(String userUID) {
        this.userUID = userUID;
    }
}


```

**(b). `statusFragment.java`**

> Our `statusFragment` class.

Create a java file named `statusFragment.java`.

Inside it create a class that extends `Fragment` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Bundle` from the `android.os` package.
2. `LayoutInflater` from the `android.view` package.
3. `View` from the `android.view` package.
4. `ViewGroup` from the `android.view` package.
5. `NonNull` from the `androidx.annotation` package.
6. `Nullable` from the `androidx.annotation` package.
7. `Fragment` from the `androidx.fragment.app` package.

We will be overriding the following methods: 

1. `onCreateView(@NonNull`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class statusFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.statusfragment,null);
    }
}


```

**(c). `splashscreen.java`**

> Our `splashscreen` class.

Create a java file named `splashscreen.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Intent` from the `android.content` package.
3. `Bundle` from the `android.os` package.
4. `Handler` from the `android.os` package.
5. `WindowManager` from the `android.view` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `run()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.WindowManager;

public class splashscreen extends AppCompatActivity {

    private static int SPLASH_TIMER=3000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splashscreen);


        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {

                Intent intent=new Intent(splashscreen.this,MainActivity.class);
                startActivity(intent);
                finish();


            }
        },SPLASH_TIMER);





    }
}

```

**(d). `specificchat.java`**

> Our `specificchat` class.

Create a java file named `specificchat.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `NonNull` from the `androidx.annotation` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `CardView` from the `androidx.cardview.widget` package.
4. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
5. `RecyclerView` from the `androidx.recyclerview.widget` package.
6. `Intent` from the `android.content` package.
7. `PackageInfo` from the `android.content.pm` package.
8. `Bundle` from the `android.os` package.
9. `View` from the `android.view` package.
10. `EditText` from the `android.widget` package.
11. `ImageButton` from the `android.widget` package.
12. `ImageView` from the `android.widget` package.
13. `TextView` from the `android.widget` package.
14. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onDataChange(@NonNull`.
4. `onCancelled(@NonNull`.
5. `onComplete(@NonNull`.
6. `onStart()`.
7. `onStop()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.pm.PackageInfo;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.squareup.picasso.Picasso;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class specificchat extends AppCompatActivity {

    EditText mgetmessage;
    ImageButton msendmessagebutton;

    CardView msendmessagecardview;
    androidx.appcompat.widget.Toolbar mtoolbarofspecificchat;
    ImageView mimageviewofspecificuser;
    TextView mnameofspecificuser;

    private String enteredmessage;
    Intent intent;
    String mrecievername,sendername,mrecieveruid,msenderuid;
    private FirebaseAuth firebaseAuth;
    FirebaseDatabase firebaseDatabase;
    String senderroom,recieverroom;

    ImageButton mbackbuttonofspecificchat;

    RecyclerView mmessagerecyclerview;

    String currenttime;
    Calendar calendar;
    SimpleDateFormat simpleDateFormat;

    MessagesAdapter messagesAdapter;
    ArrayList<Messages> messagesArrayList;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_specificchat);

        mgetmessage=findViewById(R.id.getmessage);
        msendmessagecardview=findViewById(R.id.carviewofsendmessage);
        msendmessagebutton=findViewById(R.id.imageviewsendmessage);
        mtoolbarofspecificchat=findViewById(R.id.toolbarofspecificchat);
        mnameofspecificuser=findViewById(R.id.Nameofspecificuser);
        mimageviewofspecificuser=findViewById(R.id.specificuserimageinimageview);
        mbackbuttonofspecificchat=findViewById(R.id.backbuttonofspecificchat);

        messagesArrayList=new ArrayList<>();
        mmessagerecyclerview=findViewById(R.id.recyclerviewofspecific);

        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(this);
        linearLayoutManager.setStackFromEnd(true);
        mmessagerecyclerview.setLayoutManager(linearLayoutManager);
        messagesAdapter=new MessagesAdapter(specificchat.this,messagesArrayList);
        mmessagerecyclerview.setAdapter(messagesAdapter);




        intent=getIntent();

        setSupportActionBar(mtoolbarofspecificchat);
        mtoolbarofspecificchat.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(getApplicationContext(),"Toolbar is Clicked",Toast.LENGTH_SHORT).show();


            }
        });

        firebaseAuth=FirebaseAuth.getInstance();
        firebaseDatabase=FirebaseDatabase.getInstance();
        calendar=Calendar.getInstance();
        simpleDateFormat=new SimpleDateFormat("hh:mm a");


        msenderuid=firebaseAuth.getUid();
        mrecieveruid=getIntent().getStringExtra("receiveruid");
        mrecievername=getIntent().getStringExtra("name");



        senderroom=msenderuid+mrecieveruid;
        recieverroom=mrecieveruid+msenderuid;



        DatabaseReference databaseReference=firebaseDatabase.getReference().child("chats").child(senderroom).child("messages");
        messagesAdapter=new MessagesAdapter(specificchat.this,messagesArrayList);
        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                messagesArrayList.clear();
                for(DataSnapshot snapshot1:snapshot.getChildren())
                {
                    Messages messages=snapshot1.getValue(Messages.class);
                    messagesArrayList.add(messages);
                }
                messagesAdapter.notifyDataSetChanged();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });




        mbackbuttonofspecificchat.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });


        mnameofspecificuser.setText(mrecievername);
        String uri=intent.getStringExtra("imageuri");
        if(uri.isEmpty())
        {
            Toast.makeText(getApplicationContext(),"null is recieved",Toast.LENGTH_SHORT).show();
        }
        else
        {
            Picasso.get().load(uri).into(mimageviewofspecificuser);
        }


        msendmessagebutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                enteredmessage=mgetmessage.getText().toString();
                if(enteredmessage.isEmpty())
                {
                    Toast.makeText(getApplicationContext(),"Enter message first",Toast.LENGTH_SHORT).show();
                }

                else

                {
                    Date date=new Date();
                    currenttime=simpleDateFormat.format(calendar.getTime());
                    Messages messages=new Messages(enteredmessage,firebaseAuth.getUid(),date.getTime(),currenttime);
                    firebaseDatabase=FirebaseDatabase.getInstance();
                    firebaseDatabase.getReference().child("chats")
                            .child(senderroom)
                            .child("messages")
                            .push().setValue(messages).addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {
                            firebaseDatabase.getReference()
                                    .child("chats")
                                    .child(recieverroom)
                                    .child("messages")
                                    .push()
                                    .setValue(messages).addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {

                                }
                            });
                        }
                    });

                    mgetmessage.setText(null);




                }




            }
        });




    }


    @Override
    public void onStart() {
        super.onStart();
        messagesAdapter.notifyDataSetChanged();
    }

    @Override
    public void onStop() {
        super.onStop();
        if(messagesAdapter!=null)
        {
            messagesAdapter.notifyDataSetChanged();
        }
    }



}

```

**(e). `setProfile.java`**

> Our `setProfile` class.

Create a java file named `setProfile.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `NonNull` from the `androidx.annotation` package.
2. `Nullable` from the `androidx.annotation` package.
3. `AppCompatActivity` from the `androidx.appcompat.app` package.
4. `CardView` from the `androidx.cardview.widget` package.
5. `Intent` from the `android.content` package.
6. `Bitmap` from the `android.graphics` package.
7. `Uri` from the `android.net` package.
8. `Bundle` from the `android.os` package.
9. `MediaStore` from the `android.provider` package.
10. `View` from the `android.view` package.
11. `EditText` from the `android.widget` package.
12. `ImageView` from the `android.widget` package.
13. `ProgressBar` from the `android.widget` package.
14. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onSuccess(UploadTask.TaskSnapshot`.
4. `onSuccess(Uri`.
5. `onFailure(@NonNull`.
6. `onSuccess(Void`.
7. `onActivityResult(int`.

We will be creating the following methods:

1. `sendDataTocloudFirestore()`.

**(a). Our `sendDataTocloudFirestore()` method.**

A method to send data tocloud firestore:

```java
    private void sendDataTocloudFirestore() {


        DocumentReference documentReference=firebaseFirestore.collection("Users").document(firebaseAuth.getUid());
        Map<String , Object> userdata=new HashMap<>();
        userdata.put("name",name);
        userdata.put("image",ImageUriAcessToken);
        userdata.put("uid",firebaseAuth.getUid());
        userdata.put("status","Online");

        documentReference.set(userdata).addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                Toast.makeText(getApplicationContext(),"Data on Cloud Firestore send success",Toast.LENGTH_SHORT).show();

            }
        });



    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class setProfile extends AppCompatActivity {

    private CardView mgetuserimage;
    private ImageView mgetuserimageinimageview;
    private static int PICK_IMAGE=123;
    private Uri imagepath;

    private EditText mgetusername;

    private android.widget.Button msaveprofile;

    private FirebaseAuth firebaseAuth;
    private String name;

    private FirebaseStorage firebaseStorage;
    private StorageReference storageReference;

    private String ImageUriAcessToken;

    private FirebaseFirestore firebaseFirestore;

    ProgressBar mprogressbarofsetprofile;








    

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_set_profile);

        firebaseAuth=FirebaseAuth.getInstance();
        firebaseStorage=FirebaseStorage.getInstance();
        storageReference=firebaseStorage.getReference();
        firebaseFirestore=FirebaseFirestore.getInstance();


        mgetusername=findViewById(R.id.getusername);
        mgetuserimage=findViewById(R.id.getuserimage);
        mgetuserimageinimageview=findViewById(R.id.getuserimageinimageview);
        msaveprofile=findViewById(R.id.saveProfile);
        mprogressbarofsetprofile=findViewById(R.id.progressbarofsetProfile);


        mgetuserimage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.INTERNAL_CONTENT_URI);
                startActivityForResult(intent,PICK_IMAGE);
            }
        });


        msaveprofile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                name=mgetusername.getText().toString();
                if(name.isEmpty())
                {
                    Toast.makeText(getApplicationContext(),"Name is Empty",Toast.LENGTH_SHORT).show();
                }
                else if(imagepath==null)
                {
                    Toast.makeText(getApplicationContext(),"Image is Empty",Toast.LENGTH_SHORT).show();
                }
                else
                {

                    mprogressbarofsetprofile.setVisibility(View.VISIBLE);
                    sendDataForNewUser();
                    mprogressbarofsetprofile.setVisibility(View.INVISIBLE);
                    Intent intent=new Intent(setProfile.this,chatActivity.class);
                    startActivity(intent);
                    finish();


                }
            }
        });






    }


    private void sendDataForNewUser()
    {

        sendDataToRealTimeDatabase();

    }

    private void sendDataToRealTimeDatabase()
    {


        name=mgetusername.getText().toString().trim();
        FirebaseDatabase firebaseDatabase=FirebaseDatabase.getInstance();
        DatabaseReference databaseReference=firebaseDatabase.getReference(firebaseAuth.getUid());

        userprofile muserprofile=new userprofile(name,firebaseAuth.getUid());
        databaseReference.setValue(muserprofile);
        Toast.makeText(getApplicationContext(),"User Profile Added Sucessfully",Toast.LENGTH_SHORT).show();
        sendImagetoStorage();




    }

    private void sendImagetoStorage()
    {

        StorageReference imageref=storageReference.child("Images").child(firebaseAuth.getUid()).child("Profile Pic");

        //Image compresesion

        Bitmap bitmap=null;
        try {
            bitmap= MediaStore.Images.Media.getBitmap(getContentResolver(),imagepath);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        ByteArrayOutputStream byteArrayOutputStream=new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG,25,byteArrayOutputStream);
        byte[] data=byteArrayOutputStream.toByteArray();

        ///putting image to storage

        UploadTask uploadTask=imageref.putBytes(data);

        uploadTask.addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
            @Override
            public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {

                imageref.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                    @Override
                    public void onSuccess(Uri uri) {
                        ImageUriAcessToken=uri.toString();
                        Toast.makeText(getApplicationContext(),"URI get sucess",Toast.LENGTH_SHORT).show();
                        sendDataTocloudFirestore();
                    }
                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Toast.makeText(getApplicationContext(),"URI get Failed",Toast.LENGTH_SHORT).show();
                    }


                });
                Toast.makeText(getApplicationContext(),"Image is uploaded",Toast.LENGTH_SHORT).show();

            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                Toast.makeText(getApplicationContext(),"Image Not UPdloaded",Toast.LENGTH_SHORT).show();
            }
        });





    }

    private void sendDataTocloudFirestore() {


        DocumentReference documentReference=firebaseFirestore.collection("Users").document(firebaseAuth.getUid());
        Map<String , Object> userdata=new HashMap<>();
        userdata.put("name",name);
        userdata.put("image",ImageUriAcessToken);
        userdata.put("uid",firebaseAuth.getUid());
        userdata.put("status","Online");

        documentReference.set(userdata).addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                Toast.makeText(getApplicationContext(),"Data on Cloud Firestore send success",Toast.LENGTH_SHORT).show();

            }
        });



    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {

        if(requestCode==PICK_IMAGE && resultCode==RESULT_OK)
        {
            imagepath=data.getData();
            mgetuserimageinimageview.setImageURI(imagepath);
        }




        super.onActivityResult(requestCode, resultCode, data);
    }




}

```

**(f). `otpAuthentication.java`**

> Our `otpAuthentication` class.

Create a java file named `otpAuthentication.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `NonNull` from the `androidx.annotation` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `Intent` from the `android.content` package.
4. `Bundle` from the `android.os` package.
5. `View` from the `android.view` package.
6. `EditText` from the `android.widget` package.
7. `ProgressBar` from the `android.widget` package.
8. `TextView` from the `android.widget` package.
9. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onComplete(@NonNull`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthProvider;

public class otpAuthentication extends AppCompatActivity {

    TextView mchangenumber;
    EditText mgetotp;
    android.widget.Button mverifyotp;
    String enteredotp;

    FirebaseAuth firebaseAuth;
    ProgressBar mprogressbarofotpauth;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_otp_authentication);

        mchangenumber=findViewById(R.id.changenumber);
        mverifyotp=findViewById(R.id.verifyotp);
        mgetotp=findViewById(R.id.getotp);
        mprogressbarofotpauth=findViewById(R.id.progressbarofotpauth);

        firebaseAuth=FirebaseAuth.getInstance();

        mchangenumber.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(otpAuthentication.this,MainActivity.class);

                startActivity(intent);
            }
        });

        mverifyotp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                enteredotp=mgetotp.getText().toString();
                if(enteredotp.isEmpty())
                {
                    Toast.makeText(getApplicationContext(),"Enter your OTP First ",Toast.LENGTH_SHORT).show();
                }
                else

                {
                    mprogressbarofotpauth.setVisibility(View.VISIBLE);
                    String coderecieved=getIntent().getStringExtra("otp");
                    PhoneAuthCredential credential= PhoneAuthProvider.getCredential(coderecieved,enteredotp);
                    signInWithPhoneAuthCredential(credential);

                }
            }
        });



    }


    private void signInWithPhoneAuthCredential(PhoneAuthCredential credential)
    {
        firebaseAuth.signInWithCredential(credential).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@NonNull Task<AuthResult> task) {
                if(task.isSuccessful())
                {
                    mprogressbarofotpauth.setVisibility(View.INVISIBLE);
                    Toast.makeText(getApplicationContext(),"Login sucess",Toast.LENGTH_SHORT).show();
                    Intent intent=new Intent(otpAuthentication.this,setProfile.class);
                    startActivity(intent);
                    finish();
                }
                else
                {
                    if(task.getException() instanceof FirebaseAuthInvalidCredentialsException)
                    {
                        mprogressbarofotpauth.setVisibility(View.INVISIBLE);
                        Toast.makeText(getApplicationContext(),"Login Failed",Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });




    }




}

```

**(g). `firebasemodel.java`**

> Our `firebasemodel` class.

Create a java file named `firebasemodel.java`.

We will be creating the following methods:

1. `getName()` - It will return `String` object.

2. `setName(String name)`.

3. `getImage()` - It will return `String` object.

4. `setImage(String image)`.

5. `getUid()` - It will return `String` object.

6. `setUid(String uid)`.

7. `getStatus()` - It will return `String` object.

8. `setStatus(String status)`.

**(a). Our `getUid()` method.**

A method to get uid:

```java
    public String getUid() {
        return uid;
    }
```

**(b). Our `getStatus()` method.**

A method to get status:

```java
    public String getStatus() {
        return status;
    }
```

**(c). Our `setImage()` method.**

A method to set image:

```java
    public void setImage(String image) {
        this.image = image;
    }
```

**(d). Our `setStatus()` method.**

A method to set status:

```java
    public void setStatus(String status) {
        this.status = status;
    }
```

**(e). Our `getImage()` method.**

A method to get image:

```java
    public String getImage() {
        return image;
    }
```

**(f). Our `setUid()` method.**

A method to set uid:

```java
    public void setUid(String uid) {
        this.uid = uid;
    }
```

**(g). Our `getName()` method.**

A method to get name:

```java
    public String getName() {
        return name;
    }
```

**(h). Our `setName()` method.**

A method to set name:

```java
    public void setName(String name) {
        this.name = name;
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

public class firebasemodel {

    String name;
    String image;
    String uid;
    String status;


    public firebasemodel(String name, String image, String uid, String status) {
        this.name = name;
        this.image = image;
        this.uid = uid;
        this.status = status;
    }

    public firebasemodel() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}


```

**(h). `chatFragment.java`**

> Our `chatFragment` class.

Create a java file named `chatFragment.java`.

Inside it create a class that extends `Fragment` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Intent` from the `android.content` package.
2. `Color` from the `android.graphics` package.
3. `Bundle` from the `android.os` package.
4. `LayoutInflater` from the `android.view` package.
5. `View` from the `android.view` package.
6. `ViewGroup` from the `android.view` package.
7. `ImageView` from the `android.widget` package.
8. `TextView` from the `android.widget` package.
9. `Toast` from the `android.widget` package.
10. `NonNull` from the `androidx.annotation` package.
11. `Nullable` from the `androidx.annotation` package.
12. `Fragment` from the `androidx.fragment.app` package.
13. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
14. `RecyclerView` from the `androidx.recyclerview.widget` package.

We will be overriding the following methods: 

1. `onCreateView(@NonNull`.
2. `onBindViewHolder(@NonNull`.
3. `onClick(View`.
4. `onCreateViewHolder(@NonNull`.
5. `onStart()`.
6. `onStop()`.

We will be creating the following methods:

1. `NoteViewHolder(@NonNull View itemView)` - It will return `public` object.

**(a). Our `NoteViewHolder()` method.**

A method to  note view holder:

```java
        public NoteViewHolder(@NonNull View itemView) {
            super(itemView);
            particularusername=itemView.findViewById(R.id.nameofuser);
            statusofuser=itemView.findViewById(R.id.statusofuser);
            mimageviewofuser=itemView.findViewById(R.id.imageviewofuser);




        }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.firebase.ui.firestore.FirestoreRecyclerAdapter;
import com.firebase.ui.firestore.FirestoreRecyclerOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.google.firebase.storage.FirebaseStorage;
import com.squareup.picasso.Picasso;


public class chatFragment extends Fragment {

    private FirebaseFirestore firebaseFirestore;
    LinearLayoutManager linearLayoutManager;
    private FirebaseAuth firebaseAuth;

    ImageView mimageviewofuser;

    FirestoreRecyclerAdapter<firebasemodel,NoteViewHolder> chatAdapter;

    RecyclerView mrecyclerview;



    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
       View v=inflater.inflate(R.layout.chatfragment,container,false);

       firebaseAuth=FirebaseAuth.getInstance();
       firebaseFirestore= FirebaseFirestore.getInstance();
       mrecyclerview=v.findViewById(R.id.recyclerview);


       // Query query=firebaseFirestore.collection("Users");
        Query query=firebaseFirestore.collection("Users").whereNotEqualTo("uid",firebaseAuth.getUid());
        FirestoreRecyclerOptions<firebasemodel> allusername=new FirestoreRecyclerOptions.Builder<firebasemodel>().setQuery(query,firebasemodel.class).build();

        chatAdapter=new FirestoreRecyclerAdapter<firebasemodel, NoteViewHolder>(allusername) {
            @Override
            protected void onBindViewHolder(@NonNull NoteViewHolder noteViewHolder, int i, @NonNull firebasemodel firebasemodel) {

                noteViewHolder.particularusername.setText(firebasemodel.getName());
                String uri=firebasemodel.getImage();

                Picasso.get().load(uri).into(mimageviewofuser);
                if(firebasemodel.getStatus().equals("Online"))
                {
                    noteViewHolder.statusofuser.setText(firebasemodel.getStatus());
                    noteViewHolder.statusofuser.setTextColor(Color.GREEN);
                }
                else
                {
                    noteViewHolder.statusofuser.setText(firebasemodel.getStatus());
                }

                noteViewHolder.itemView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Intent intent=new Intent(getActivity(),specificchat.class);
                        intent.putExtra("name",firebasemodel.getName());
                        intent.putExtra("receiveruid",firebasemodel.getUid());
                        intent.putExtra("imageuri",firebasemodel.getImage());
                        startActivity(intent);
                    }
                });



            }

            @NonNull
            @Override
            public NoteViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

                View view=LayoutInflater.from(parent.getContext()).inflate(R.layout.chatviewlayout,parent,false);
                return new NoteViewHolder(view);
            }
        };


        mrecyclerview.setHasFixedSize(true);
        linearLayoutManager=new LinearLayoutManager(getContext());
        linearLayoutManager.setOrientation(RecyclerView.VERTICAL);
        mrecyclerview.setLayoutManager(linearLayoutManager);
        mrecyclerview.setAdapter(chatAdapter);


        return v;




    }


    public class NoteViewHolder extends RecyclerView.ViewHolder
    {

        private TextView particularusername;
        private TextView statusofuser;

        public NoteViewHolder(@NonNull View itemView) {
            super(itemView);
            particularusername=itemView.findViewById(R.id.nameofuser);
            statusofuser=itemView.findViewById(R.id.statusofuser);
            mimageviewofuser=itemView.findViewById(R.id.imageviewofuser);




        }
    }

    @Override
    public void onStart() {
        super.onStart();
        chatAdapter.startListening();
    }

    @Override
    public void onStop() {
        super.onStop();
        if(chatAdapter!=null)
        {
            chatAdapter.stopListening();
        }
    }
}


```

**(i). `chatActivity.java`**

> Our `chatActivity` class.

Create a java file named `chatActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `NonNull` from the `androidx.annotation` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `ContextCompat` from the `androidx.core.content` package.
4. `ViewPager` from the `androidx.viewpager.widget` package.
5. `Intent` from the `android.content` package.
6. `Drawable` from the `android.graphics.drawable` package.
7. `Bundle` from the `android.os` package.
8. `Menu` from the `android.view` package.
9. `MenuInflater` from the `android.view` package.
10. `MenuItem` from the `android.view` package.
11. `TextView` from the `android.widget` package.
12. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onTabSelected(TabLayout.Tab`.
3. `onTabUnselected(TabLayout.Tab`.
4. `onTabReselected(TabLayout.Tab`.
5. `onOptionsItemSelected(@NonNull`.
6. `onCreateOptionsMenu(Menu`.
7. `onStop()`.
8. `onSuccess(Void`.
9. `onStart()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.viewpager.widget.ViewPager;

import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.material.tabs.TabItem;
import com.google.android.material.tabs.TabLayout;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;


public class chatActivity extends AppCompatActivity {

    TabLayout tabLayout;
    TabItem mchat,mcall,mstatus;
    ViewPager viewPager;
    PagerAdapter pagerAdapter;
    androidx.appcompat.widget.Toolbar mtoolbar;

    FirebaseAuth firebaseAuth;


    FirebaseFirestore firebaseFirestore;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        tabLayout=findViewById(R.id.include);
        mchat=findViewById(R.id.chat);
        mcall=findViewById(R.id.calls);
        mstatus=findViewById(R.id.status);
        viewPager=findViewById(R.id.fragmentcontainer);

        firebaseFirestore=FirebaseFirestore.getInstance();
        firebaseAuth=FirebaseAuth.getInstance();

        mtoolbar=findViewById(R.id.toolbar);
        setSupportActionBar(mtoolbar);


        Drawable drawable= ContextCompat.getDrawable(getApplicationContext(),R.drawable.ic_baseline_more_vert_24);
        mtoolbar.setOverflowIcon(drawable);


        pagerAdapter=new PagerAdapter(getSupportFragmentManager(),tabLayout.getTabCount());
        viewPager.setAdapter(pagerAdapter);

        tabLayout.setOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                viewPager.setCurrentItem(tab.getPosition());

                if(tab.getPosition()==0 || tab.getPosition()==1|| tab.getPosition()==2)
                {
                    pagerAdapter.notifyDataSetChanged();
                }



            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });


        viewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));


    }


    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {

        switch (item.getItemId())
        {
            case R.id.profile:
                Intent intent=new Intent(chatActivity.this,ProfileActivity.class);
                startActivity(intent);
                break;

            case R.id.settings:
                Toast.makeText(getApplicationContext(),"Settign is clicked",Toast.LENGTH_SHORT).show();
                break;
        }



        return  true;
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        MenuInflater menuInflater=getMenuInflater();
        menuInflater.inflate(R.menu.menu,menu);


        return true;
    }

    @Override
    protected void onStop() {
        super.onStop();
        DocumentReference documentReference=firebaseFirestore.collection("Users").document(firebaseAuth.getUid());
        documentReference.update("status","Offline").addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                Toast.makeText(getApplicationContext(),"Now User is Offline",Toast.LENGTH_SHORT).show();
            }
        });



    }

    @Override
    protected void onStart() {
        super.onStart();
        DocumentReference documentReference=firebaseFirestore.collection("Users").document(firebaseAuth.getUid());
        documentReference.update("status","Online").addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                Toast.makeText(getApplicationContext(),"Now User is Online",Toast.LENGTH_SHORT).show();
            }
        });

    }
}

```

**(j). `callFragment.java`**

> Our `callFragment` class.

Create a java file named `callFragment.java`.

Inside it create a class that extends `Fragment` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Bundle` from the `android.os` package.
2. `LayoutInflater` from the `android.view` package.
3. `View` from the `android.view` package.
4. `ViewGroup` from the `android.view` package.
5. `NonNull` from the `androidx.annotation` package.
6. `Nullable` from the `androidx.annotation` package.
7. `Fragment` from the `androidx.fragment.app` package.

We will be overriding the following methods: 

1. `onCreateView(@NonNull`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class callFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.callfragment,null);
    }
}


```

**(k). `UpdateProfile.java`**

> Our `UpdateProfile` class.

Create a java file named `UpdateProfile.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `NonNull` from the `androidx.annotation` package.
2. `Nullable` from the `androidx.annotation` package.
3. `AppCompatActivity` from the `androidx.appcompat.app` package.
4. `Intent` from the `android.content` package.
5. `Bitmap` from the `android.graphics` package.
6. `MediaActionSound` from the `android.media` package.
7. `Uri` from the `android.net` package.
8. `Bundle` from the `android.os` package.
9. `MediaStore` from the `android.provider` package.
10. `View` from the `android.view` package.
11. `EditText` from the `android.widget` package.
12. `ImageButton` from the `android.widget` package.
13. `ImageView` from the `android.widget` package.
14. `ProgressBar` from the `android.widget` package.
15. `TextView` from the `android.widget` package.
16. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onSuccess(Uri`.
4. `onSuccess(Void`.
5. `onSuccess(UploadTask.TaskSnapshot`.
6. `onFailure(@NonNull`.
7. `onActivityResult(int`.
8. `onStop()`.
9. `onStart()`.

We will be creating the following methods:

1. `updatenameoncloudfirestore()`.

2. `updateimagetostorage()`.

**(a). Our `updatenameoncloudfirestore()` method.**

Write this method as follows:

```java
    private void updatenameoncloudfirestore() {

        DocumentReference documentReference=firebaseFirestore.collection("Users").document(firebaseAuth.getUid());
        Map<String , Object> userdata=new HashMap<>();
        userdata.put("name",newname);
        userdata.put("image",ImageURIacessToken);
        userdata.put("uid",firebaseAuth.getUid());
        userdata.put("status","Online");


        documentReference.set(userdata).addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                Toast.makeText(getApplicationContext(),"Profile Update Succusfully",Toast.LENGTH_SHORT).show();

            }
        });

    }
```

**(b). Our `updateimagetostorage()` method.**

Write this method as follows:

```java
    private void updateimagetostorage() {


        StorageReference imageref=storageReference.child("Images").child(firebaseAuth.getUid()).child("Profile Pic");

        //Image compresesion

        Bitmap bitmap=null;
        try {
            bitmap= MediaStore.Images.Media.getBitmap(getContentResolver(),imagepath);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        ByteArrayOutputStream byteArrayOutputStream=new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG,25,byteArrayOutputStream);
        byte[] data=byteArrayOutputStream.toByteArray();

        ///putting image to storage

        UploadTask uploadTask=imageref.putBytes(data);

        uploadTask.addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
            @Override
            public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {

                imageref.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                    @Override
                    public void onSuccess(Uri uri) {
                        ImageURIacessToken=uri.toString();
                        Toast.makeText(getApplicationContext(),"URI get sucess",Toast.LENGTH_SHORT).show();
                        updatenameoncloudfirestore();
                    }
                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Toast.makeText(getApplicationContext(),"URI get Failed",Toast.LENGTH_SHORT).show();
                    }


                });
                Toast.makeText(getApplicationContext(),"Image is Updated",Toast.LENGTH_SHORT).show();

            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                Toast.makeText(getApplicationContext(),"Image Not Updated",Toast.LENGTH_SHORT).show();
            }
        });




    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.media.MediaActionSound;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.squareup.picasso.Picasso;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class UpdateProfile extends AppCompatActivity {

    private  EditText mnewusername;
    private FirebaseAuth firebaseAuth;
    private FirebaseDatabase firebaseDatabase;


    private FirebaseFirestore firebaseFirestore;

    private  ImageView mgetnewimageinimageview;

    private StorageReference storageReference;

    private String ImageURIacessToken;

    private androidx.appcompat.widget.Toolbar mtoolbarofupdateprofile;
    private ImageButton mbackbuttonofupdateprofile;


   private FirebaseStorage firebaseStorage;


   ProgressBar mprogressbarofupdateprofile;

   private Uri imagepath;

   Intent intent;

   private static int PICK_IMAGE=123;

   android.widget.Button mupdateprofilebutton;
   String newname;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_profile);

        mtoolbarofupdateprofile=findViewById(R.id.toolbarofupdateprofile);
        mbackbuttonofupdateprofile=findViewById(R.id.backbuttonofupdateprofile);
        mgetnewimageinimageview=findViewById(R.id.getnewuserimageinimageview);
        mprogressbarofupdateprofile=findViewById(R.id.progressbarofupdateprofile);
        mnewusername=findViewById(R.id.getnewusername);
        mupdateprofilebutton=findViewById(R.id.updateprofilebutton);

        firebaseAuth=FirebaseAuth.getInstance();
        firebaseDatabase=FirebaseDatabase.getInstance();
        firebaseStorage=FirebaseStorage.getInstance();
        firebaseFirestore=FirebaseFirestore.getInstance();

        intent=getIntent();

        setSupportActionBar(mtoolbarofupdateprofile);

        mbackbuttonofupdateprofile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });



        mnewusername.setText(intent.getStringExtra("nameofuser"));




        DatabaseReference databaseReference=firebaseDatabase.getReference(firebaseAuth.getUid());

        mupdateprofilebutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                newname=mnewusername.getText().toString();
                if(newname.isEmpty())
                {
                    Toast.makeText(getApplicationContext(),"Name is Empty",Toast.LENGTH_SHORT).show();
                }
                else if(imagepath!=null)
                {
                    mprogressbarofupdateprofile.setVisibility(View.VISIBLE);
                    userprofile muserprofile =new userprofile(newname,firebaseAuth.getUid());
                    databaseReference.setValue(muserprofile);

                    updateimagetostorage();

                    Toast.makeText(getApplicationContext(),"Updated",Toast.LENGTH_SHORT).show();
                    mprogressbarofupdateprofile.setVisibility(View.INVISIBLE);
                    Intent intent=new Intent(UpdateProfile.this,chatActivity.class);
                    startActivity(intent);
                    finish();

                }
                else
                {

                    mprogressbarofupdateprofile.setVisibility(View.VISIBLE);
                    userprofile muserprofile =new userprofile(newname,firebaseAuth.getUid());
                    databaseReference.setValue(muserprofile);
                    updatenameoncloudfirestore();
                    Toast.makeText(getApplicationContext(),"Updated",Toast.LENGTH_SHORT).show();
                    mprogressbarofupdateprofile.setVisibility(View.INVISIBLE);
                    Intent intent=new Intent(UpdateProfile.this,chatActivity.class);
                    startActivity(intent);
                    finish();




                }





            }
        });


        mgetnewimageinimageview.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.INTERNAL_CONTENT_URI);
                startActivityForResult(intent,PICK_IMAGE);
            }
        });

        storageReference=firebaseStorage.getReference();
        storageReference.child("Images").child(firebaseAuth.getUid()).child("Profile Pic").getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
            @Override
            public void onSuccess(Uri uri) {
                ImageURIacessToken=uri.toString();
                Picasso.get().load(uri).into(mgetnewimageinimageview);
            }
        });





    }





    private void updatenameoncloudfirestore() {

        DocumentReference documentReference=firebaseFirestore.collection("Users").document(firebaseAuth.getUid());
        Map<String , Object> userdata=new HashMap<>();
        userdata.put("name",newname);
        userdata.put("image",ImageURIacessToken);
        userdata.put("uid",firebaseAuth.getUid());
        userdata.put("status","Online");


        documentReference.set(userdata).addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                Toast.makeText(getApplicationContext(),"Profile Update Succusfully",Toast.LENGTH_SHORT).show();

            }
        });

    }

    private void updateimagetostorage() {


        StorageReference imageref=storageReference.child("Images").child(firebaseAuth.getUid()).child("Profile Pic");

        //Image compresesion

        Bitmap bitmap=null;
        try {
            bitmap= MediaStore.Images.Media.getBitmap(getContentResolver(),imagepath);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        ByteArrayOutputStream byteArrayOutputStream=new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG,25,byteArrayOutputStream);
        byte[] data=byteArrayOutputStream.toByteArray();

        ///putting image to storage

        UploadTask uploadTask=imageref.putBytes(data);

        uploadTask.addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
            @Override
            public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {

                imageref.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                    @Override
                    public void onSuccess(Uri uri) {
                        ImageURIacessToken=uri.toString();
                        Toast.makeText(getApplicationContext(),"URI get sucess",Toast.LENGTH_SHORT).show();
                        updatenameoncloudfirestore();
                    }
                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Toast.makeText(getApplicationContext(),"URI get Failed",Toast.LENGTH_SHORT).show();
                    }


                });
                Toast.makeText(getApplicationContext(),"Image is Updated",Toast.LENGTH_SHORT).show();

            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                Toast.makeText(getApplicationContext(),"Image Not Updated",Toast.LENGTH_SHORT).show();
            }
        });




    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {

        if(requestCode==PICK_IMAGE && resultCode==RESULT_OK)
        {
            imagepath=data.getData();
            mgetnewimageinimageview.setImageURI(imagepath);
        }




        super.onActivityResult(requestCode, resultCode, data);
    }


    @Override
    protected void onStop() {
        super.onStop();
        DocumentReference documentReference=firebaseFirestore.collection("Users").document(firebaseAuth.getUid());
        documentReference.update("status","Offline").addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                Toast.makeText(getApplicationContext(),"Now User is Offline",Toast.LENGTH_SHORT).show();
            }
        });



    }

    @Override
    protected void onStart() {
        super.onStart();
        DocumentReference documentReference=firebaseFirestore.collection("Users").document(firebaseAuth.getUid());
        documentReference.update("status","Online").addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                Toast.makeText(getApplicationContext(),"Now User is Online",Toast.LENGTH_SHORT).show();
            }
        });

    }




}

```

**(m). `ProfileActivity.java`**

> Our `ProfileActivity` class.

Create a java file named `ProfileActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `NonNull` from the `androidx.annotation` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `Intent` from the `android.content` package.
4. `Uri` from the `android.net` package.
5. `Bundle` from the `android.os` package.
6. `View` from the `android.view` package.
7. `EditText` from the `android.widget` package.
8. `ImageButton` from the `android.widget` package.
9. `ImageView` from the `android.widget` package.
10. `TextView` from the `android.widget` package.
11. `Toast` from the `android.widget` package.
12. `Toolbar` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onClick(View`.
3. `onSuccess(Uri`.
4. `onDataChange(@NonNull`.
5. `onCancelled(@NonNull`.
6. `onStop()`.
7. `onSuccess(Void`.
8. `onStart()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.Toolbar;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.squareup.picasso.Picasso;

public class ProfileActivity extends AppCompatActivity {


    EditText mviewusername;
    FirebaseAuth firebaseAuth;
    FirebaseDatabase firebaseDatabase;
    TextView mmovetoupdateprofile;

    FirebaseFirestore firebaseFirestore;

    ImageView mviewuserimageinimageview;

    StorageReference storageReference;

    private String ImageURIacessToken;

    androidx.appcompat.widget.Toolbar mtoolbarofviewprofile;
    ImageButton mbackbuttonofviewprofile;


    FirebaseStorage firebaseStorage;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        mviewuserimageinimageview=findViewById(R.id.viewuserimageinimageview);
        mviewusername=findViewById(R.id.viewusername);
        mmovetoupdateprofile=findViewById(R.id.movetoupdateprofile);
        firebaseFirestore=FirebaseFirestore.getInstance();
        mtoolbarofviewprofile=findViewById(R.id.toolbarofviewprofile);
        mbackbuttonofviewprofile=findViewById(R.id.backbuttonofviewprofile);
        firebaseDatabase=FirebaseDatabase.getInstance();
        firebaseAuth=FirebaseAuth.getInstance();
        firebaseStorage=FirebaseStorage.getInstance();


        setSupportActionBar(mtoolbarofviewprofile);

        mbackbuttonofviewprofile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });


        storageReference=firebaseStorage.getReference();
        storageReference.child("Images").child(firebaseAuth.getUid()).child("Profile Pic").getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
            @Override
            public void onSuccess(Uri uri) {
                ImageURIacessToken=uri.toString();
                Picasso.get().load(uri).into(mviewuserimageinimageview);

            }
        });

        DatabaseReference databaseReference=firebaseDatabase.getReference(firebaseAuth.getUid());
        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                userprofile muserprofile=snapshot.getValue(userprofile.class);
                mviewusername.setText(muserprofile.getUsername());
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

                Toast.makeText(getApplicationContext(),"Failed To Fetch",Toast.LENGTH_SHORT).show();
            }
        });


        mmovetoupdateprofile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(ProfileActivity.this,UpdateProfile.class);
                intent.putExtra("nameofuser",mviewusername.getText().toString());
                startActivity(intent);
            }
        });




    }


    @Override
    protected void onStop() {
        super.onStop();
        DocumentReference documentReference=firebaseFirestore.collection("Users").document(firebaseAuth.getUid());
        documentReference.update("status","Offline").addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                Toast.makeText(getApplicationContext(),"Now User is Offline",Toast.LENGTH_SHORT).show();
            }
        });



    }

    @Override
    protected void onStart() {
        super.onStart();
        DocumentReference documentReference=firebaseFirestore.collection("Users").document(firebaseAuth.getUid());
        documentReference.update("status","Online").addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                Toast.makeText(getApplicationContext(),"Now User is Online",Toast.LENGTH_SHORT).show();
            }
        });

    }
}

```

**(n). `PagerAdapter.java`**

> Our `PagerAdapter` class.

Create a java file named `PagerAdapter.java`.

Inside it create a class that extends `FragmentPagerAdapter` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `NonNull` from the `androidx.annotation` package.
2. `Fragment` from the `androidx.fragment.app` package.
3. `FragmentManager` from the `androidx.fragment.app` package.
4. `FragmentPagerAdapter` from the `androidx.fragment.app` package.

We will be overriding the following methods: 

1. `getItem(int`.
2. `getCount()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

public class PagerAdapter extends FragmentPagerAdapter {

    int tabcount;




    public PagerAdapter(@NonNull FragmentManager fm, int behavior) {
        super(fm, behavior);
        tabcount=behavior;




    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position)
        {
            case 0:
                return new chatFragment();


            case 1:
                return new statusFragment();

            case 2:

                return new callFragment();


            default:
                return null;
        }



    }

    @Override
    public int getCount() {
        return tabcount;
    }
}


```

**(o). `MessagesAdapter.java`**

> Our `MessagesAdapter` class.

Create a java file named `MessagesAdapter.java`.

Inside it create a class that extends `RecyclerView.Adapter` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.
2. `LayoutInflater` from the `android.view` package.
3. `View` from the `android.view` package.
4. `ViewGroup` from the `android.view` package.
5. `TextView` from the `android.widget` package.
6. `NonNull` from the `androidx.annotation` package.
7. `ContextCompat` from the `androidx.core.content` package.
8. `RecyclerView` from the `androidx.recyclerview.widget` package.

We will be overriding the following methods: 

1. `onCreateViewHolder(@NonNull`.
2. `onBindViewHolder(@NonNull`.
3. `getItemViewType(int`.
4. `getItemCount()`.

We will be creating the following methods:

1. `SenderViewHolder(@NonNull View itemView)` - It will return `public` object.

2. `RecieverViewHolder(@NonNull View itemView)` - It will return `public` object.

**(a). Our `SenderViewHolder()` method.**

A method to  sender view holder:

```java
        public SenderViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewmessaage=itemView.findViewById(R.id.sendermessage);
            timeofmessage=itemView.findViewById(R.id.timeofmessage);
        }
```

**(b). Our `RecieverViewHolder()` method.**

A method to  reciever view holder:

```java
        public RecieverViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewmessaage=itemView.findViewById(R.id.sendermessage);
            timeofmessage=itemView.findViewById(R.id.timeofmessage);
        }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.google.firebase.auth.FirebaseAuth;

import java.util.ArrayList;

public class MessagesAdapter extends RecyclerView.Adapter {

    Context context;
    ArrayList<Messages> messagesArrayList;

    int ITEM_SEND=1;
    int ITEM_RECIEVE=2;

    public MessagesAdapter(Context context, ArrayList<Messages> messagesArrayList) {
        this.context = context;
        this.messagesArrayList = messagesArrayList;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if(viewType==ITEM_SEND)
        {
            View view= LayoutInflater.from(context).inflate(R.layout.senderchatlayout,parent,false);
            return new SenderViewHolder(view);
        }
        else
        {
            View view= LayoutInflater.from(context).inflate(R.layout.recieverchatlayout,parent,false);
            return new RecieverViewHolder(view);
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {

        Messages messages=messagesArrayList.get(position);
        if(holder.getClass()==SenderViewHolder.class)
        {
            SenderViewHolder viewHolder=(SenderViewHolder)holder;
            viewHolder.textViewmessaage.setText(messages.getMessage());
            viewHolder.timeofmessage.setText(messages.getCurrenttime());
        }
        else
        {
            RecieverViewHolder viewHolder=(RecieverViewHolder)holder;
            viewHolder.textViewmessaage.setText(messages.getMessage());
            viewHolder.timeofmessage.setText(messages.getCurrenttime());
        }








    }


    @Override
    public int getItemViewType(int position) {
        Messages messages=messagesArrayList.get(position);
        if(FirebaseAuth.getInstance().getCurrentUser().getUid().equals(messages.getSenderId()))

        {
            return  ITEM_SEND;
        }
        else
        {
            return ITEM_RECIEVE;
        }
    }

    @Override
    public int getItemCount() {
        return messagesArrayList.size();
    }








    class SenderViewHolder extends RecyclerView.ViewHolder
    {

        TextView textViewmessaage;
        TextView timeofmessage;


        public SenderViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewmessaage=itemView.findViewById(R.id.sendermessage);
            timeofmessage=itemView.findViewById(R.id.timeofmessage);
        }
    }

    class RecieverViewHolder extends RecyclerView.ViewHolder
    {

        TextView textViewmessaage;
        TextView timeofmessage;


        public RecieverViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewmessaage=itemView.findViewById(R.id.sendermessage);
            timeofmessage=itemView.findViewById(R.id.timeofmessage);
        }
    }




}


```

**(p). `Messages.java`**

> Our `Messages` class.

Create a java file named `Messages.java`.

We will be creating the following methods:

1. `getMessage()` - It will return `String` object.

2. `setMessage(String message)`.

3. `getSenderId()` - It will return `String` object.

4. `setSenderId(String senderId)`.

5. `getTimestamp()` - It will return `long` object.

6. `setTimestamp(long timestamp)`.

7. `getCurrenttime()` - It will return `String` object.

8. `setCurrenttime(String currenttime)`.

**(a). Our `getSenderId()` method.**

A method to get sender id:

```java
    public String getSenderId() {
        return senderId;
    }
```

**(b). Our `setCurrenttime()` method.**

A method to set currenttime:

```java
    public void setCurrenttime(String currenttime) {
        this.currenttime = currenttime;
    }
```

**(c). Our `setTimestamp()` method.**

A method to set timestamp:

```java
    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
```

**(d). Our `getMessage()` method.**

A method to get message:

```java
    public String getMessage() {
        return message;
    }
```

**(e). Our `setMessage()` method.**

A method to set message:

```java
    public void setMessage(String message) {
        this.message = message;
    }
```

**(f). Our `getCurrenttime()` method.**

A method to get currenttime:

```java
    public String getCurrenttime() {
        return currenttime;
    }
```

**(g). Our `getTimestamp()` method.**

A method to get timestamp:

```java
    public long getTimestamp() {
        return timestamp;
    }
```

**(h). Our `setSenderId()` method.**

A method to set sender id:

```java
    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

public class Messages {

    String message;
    String senderId;
    long timestamp;
    String currenttime;


    public Messages() {
    }


    public Messages(String message, String senderId, long timestamp, String currenttime) {
        this.message = message;
        this.senderId = senderId;
        this.timestamp = timestamp;
        this.currenttime = currenttime;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getCurrenttime() {
        return currenttime;
    }

    public void setCurrenttime(String currenttime) {
        this.currenttime = currenttime;
    }
}


```

**(q). `MainActivity.java`**

> Our `MainActivity` class.

Create a java file named `MainActivity.java`.

Inside it create a class that extends `AppCompatActivity` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `NonNull` from the `androidx.annotation` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `Intent` from the `android.content` package.
4. `Bundle` from the `android.os` package.
5. `View` from the `android.view` package.
6. `EditText` from the `android.widget` package.
7. `ProgressBar` from the `android.widget` package.
8. `Toast` from the `android.widget` package.

We will be overriding the following methods: 

1. `onCreate(Bundle`.
2. `onCountrySelected()`.
3. `onClick(View`.
4. `onVerificationCompleted(@NonNull`.
5. `onVerificationFailed(@NonNull`.
6. `onCodeSent(@NonNull`.
7. `onStart()`.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.google.firebase.FirebaseException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthOptions;
import com.google.firebase.auth.PhoneAuthProvider;
import com.google.firestore.v1.TargetOrBuilder;
import com.hbb20.CountryCodePicker;

import java.util.concurrent.TimeUnit;

public class MainActivity extends AppCompatActivity {



    EditText mgetphonenumber;
    android.widget.Button msendotp;
    CountryCodePicker mcountrycodepicker;
    String countrycode;
    String phonenumber;

    FirebaseAuth firebaseAuth;
    ProgressBar mprogressbarofmain;



    PhoneAuthProvider.OnVerificationStateChangedCallbacks mCallbacks;
    String codesent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mcountrycodepicker=findViewById(R.id.countrycodepicker);
        msendotp=findViewById(R.id.sendotpbutton);
        mgetphonenumber=findViewById(R.id.getphonenumber);
        mprogressbarofmain=findViewById(R.id.progressbarofmain);

        firebaseAuth=FirebaseAuth.getInstance();

        countrycode=mcountrycodepicker.getSelectedCountryCodeWithPlus();

        mcountrycodepicker.setOnCountryChangeListener(new CountryCodePicker.OnCountryChangeListener() {
            @Override
            public void onCountrySelected() {
                countrycode=mcountrycodepicker.getSelectedCountryCodeWithPlus();
            }
        });

        msendotp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String number;
                number=mgetphonenumber.getText().toString();
                if(number.isEmpty())
                {
                    Toast.makeText(getApplicationContext(),"Please Enter YOur number",Toast.LENGTH_SHORT).show();
                }
                else if(number.length()<10)
                {
                    Toast.makeText(getApplicationContext(),"Please Enter correct number",Toast.LENGTH_SHORT).show();
                }
                else
                {

                    mprogressbarofmain.setVisibility(View.VISIBLE);
                    phonenumber=countrycode+number;

                    PhoneAuthOptions options=PhoneAuthOptions.newBuilder(firebaseAuth)
                            .setPhoneNumber(phonenumber)
                            .setTimeout(60L, TimeUnit.SECONDS)
                            .setActivity(MainActivity.this)
                            .setCallbacks(mCallbacks)
                            .build();


                    PhoneAuthProvider.verifyPhoneNumber(options);



                }


            }
        });



        mCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
            @Override
            public void onVerificationCompleted(@NonNull PhoneAuthCredential phoneAuthCredential) {
                //how to automatically fetch code here
            }

            @Override
            public void onVerificationFailed(@NonNull FirebaseException e) {

            }


            @Override
            public void onCodeSent(@NonNull String s, @NonNull PhoneAuthProvider.ForceResendingToken forceResendingToken) {
                super.onCodeSent(s, forceResendingToken);
                Toast.makeText(getApplicationContext(),"OTP is Sent",Toast.LENGTH_SHORT).show();
                mprogressbarofmain.setVisibility(View.INVISIBLE);
                codesent=s;
                Intent intent=new Intent(MainActivity.this,otpAuthentication.class);
                intent.putExtra("otp",codesent);
                startActivity(intent);
            }
        };



    }


    @Override
    protected void onStart() {
        super.onStart();
        if(FirebaseAuth.getInstance().getCurrentUser()!=null)
        {
            Intent intent=new Intent(MainActivity.this,chatActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK|Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
        }






    }
}

```

<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Brijesh-kumar-sharma/chatAppInAndroidStudio/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Brijesh-kumar-sharma/chatAppInAndroidStudio).|
|3.|Follow code author [here](https://github.com/Brijesh-kumar-sharma).|

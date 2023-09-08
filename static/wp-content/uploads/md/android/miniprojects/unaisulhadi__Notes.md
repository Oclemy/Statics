# Notes App Room RecyclerView

>  A simple example for Room, Notes is an Android app developed using RecyclerView and Room DB ..

![Notes App Room RecyclerView Tutorial](https://raw.githubusercontent.com/unaisulhadi/Notes/master/notes%20app%20screen%20shot.jpg)


A simple example for Room, Notes is an Android app developed using RecyclerView and Room DB .


Let us look at the full Notes App Room RecyclerView code.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android-extensions` plugin.
3. Our `kotlin-android` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 8 dependencies:


Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-android'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "com.hadi.mynotes"
        minSdkVersion 21
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {    
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    def room_version = "1.1.1"
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation 'com.android.support.constraint:constraint-layout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'
    implementation 'com.android.support:design:28.0.0'
    implementation 'com.android.support:recyclerview-v7:28.0.0'
    implementation 'com.android.support:cardview-v7:28.0.0'
    implementation 'com.intuit.sdp:sdp-android:1.0.6'
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation "android.arch.persistence.room:runtime:$room_version"
    annotationProcessor "android.arch.persistence.room:compiler:$room_version"
    testImplementation "android.arch.persistence.room:testing:$room_version"
}
repositories {
    mavenCentral()
}

```

#### Step 2. Create [Animations](https://android.examples.directory/animation/)

Create a directory known as `anim` inside your `res` directory and add the following xml file:


**(a). `fade_in.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android" android:interpolator="@android:anim/linear_interpolator">
    <alpha
        android:duration="200"
        android:fromAlpha="0"
        android:toAlpha="1.0">
    </alpha>
</set>
```

**(b). `fade_out.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:interpolator="@android:anim/linear_interpolator">
    <alpha
        android:duration="200"
        android:fromAlpha="1.0"
        android:toAlpha="0" >
    </alpha>
</set>
```
#### Step 3. Design Layouts

For this project let's create the following layouts:


**(a). `view_layout.xml`**

> Our `view_layout` layout.

This layout will represent our Layout View's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout android:id="@+id/btn_view_layout"
    android:layout_width="match_parent"
    android:layout_height="@dimen/_200sdp"
    android:layout_marginStart="@dimen/_10sdp"
    android:layout_marginEnd="@dimen/_10sdp"
    android:layout_centerVertical="true"
    android:background="@drawable/add_note_layout"
    android:orientation="vertical"
    android:visibility="gone"
    xmlns:android="http://schemas.android.com/apk/res/android">

    <TextView android:id="@+id/view_item_title"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_30sdp"
        android:gravity="center_vertical"
        android:layout_marginHorizontal="@dimen/_10sdp"
        android:layout_marginTop="@dimen/_5sdp"
        android:fontFamily="@font/ps_regular"
        android:textColor="@color/input_color"
        android:textColorHint="@color/text_color_hint"
        android:hint="Title"
        android:inputType="textCapSentences"
        android:textSize="@dimen/_14sdp" />

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_marginHorizontal="@dimen/_10sdp"
        android:layout_marginTop="@dimen/_5sdp"
        android:layout_marginBottom="@dimen/_10sdp"
        android:scrollbars="none"
        android:layout_below="@id/view_item_title">
        <TextView android:id="@+id/view_item_note"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="@android:color/transparent"
            android:textColor="@color/input_color"
            android:textColorHint="@color/text_color_hint"
            android:fontFamily="@font/ps_regular"
            android:gravity="start"
            android:hint="Note"
            android:paddingTop="@dimen/_2sdp"
            android:textSize="@dimen/_13sdp" />

    </ScrollView>


    <!--<LinearLayout-->
    <!--android:id="@+id/btn_edit_note_ll"-->
    <!--android:layout_width="match_parent"-->
    <!--android:layout_height="@dimen/_30sdp"-->
    <!--android:layout_marginHorizontal="@dimen/_5sdp"-->
    <!--android:layout_alignParentEnd="true"-->
    <!--android:layout_alignParentBottom="true"-->
    <!--android:layout_marginBottom="@dimen/_5sdp"-->
    <!--android:orientation="horizontal">-->
    <!--<Button android:id="@+id/edit_cancel_note"-->
    <!--android:layout_width="0dp"-->
    <!--android:layout_height="@dimen/_30sdp"-->
    <!--android:layout_weight="1"-->
    <!--android:textColor="@color/md_black_1000"-->
    <!--android:background="@android:color/transparent"-->
    <!--android:text="Cancel"-->
    <!--style="?android:attr/borderlessButtonStyle"/>-->

    <!--<Button android:id="@+id/edit_add_note"-->
    <!--android:layout_width="0dp"-->
    <!--android:layout_height="@dimen/_30sdp"-->
    <!--android:layout_weight="1"-->
    <!--android:textColor="@color/md_black_1000"-->
    <!--android:background="@android:color/transparent"-->
    <!--android:text="Update"-->
    <!--style="?android:attr/borderlessButtonStyle"/>-->
    <!--</LinearLayout>-->
</RelativeLayout>
```

**(b). `task_item.xml`**

> Our `task_item` layout.

This layout will represent our Item Task's layout. Specify [`android.support.v7.widget.CardView`](https://android.examples.directory/cardview) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`RelativeLayout`](https://android.examples.directory/relativelayout)
2. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/task_item_layout"
    android:layout_width="match_parent"
    android:layout_height="@dimen/_80sdp"
    android:layout_marginVertical="@dimen/_5sdp"
    app:cardBackgroundColor="@color/item_layout_bg"
    app:cardElevation="0dp"
    android:foreground="?android:attr/selectableItemBackground"
    android:clickable="true"
    app:cardCornerRadius="@dimen/_5sdp">
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <TextView
            android:id="@+id/task_item_title"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginStart="@dimen/_10sdp"
            android:layout_marginTop="@dimen/_10sdp"
            android:layout_marginBottom="@dimen/_10sdp"
            android:layout_toStartOf="@+id/task_item_date"
            android:fontFamily="@font/ps_bold"
            android:singleLine="true"
            android:textColor="@color/item_title" />
        <TextView android:id="@+id/task_item_date"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentEnd="true"
            android:layout_margin="@dimen/_10sdp"
            android:fontFamily="@font/ps_regular"
            android:textColor="@color/md_blue_grey_500"/>
        <TextView android:id="@+id/task_item_note"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:textColor="@color/item_note"
            android:fontFamily="@font/ps_regular"
            android:layout_marginHorizontal="@dimen/_10sdp"
            android:layout_marginBottom="@dimen/_8sdp"
            android:layout_below="@id/task_item_title"/>
    </RelativeLayout>
</android.support.v7.widget.CardView>
```

**(c). `edit_layout.xml`**

> Our `edit_layout` layout.

This layout will represent our Layout Edit's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [``](https://android.examples.directory/)
2. [`LinearLayout`](https://android.examples.directory/linearlayout)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout android:id="@+id/btn_edit_layout"
    android:layout_width="match_parent"
    android:layout_height="@dimen/_200sdp"
    android:layout_marginStart="@dimen/_10sdp"
    android:layout_marginEnd="@dimen/_10sdp"
    android:layout_centerVertical="true"
    android:background="@drawable/add_note_layout"
    android:orientation="vertical"
    android:visibility="gone"
    xmlns:android="http://schemas.android.com/apk/res/android">

    <EditText android:id="@+id/edit_item_title"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_35sdp"
        android:layout_marginHorizontal="@dimen/_10sdp"
        android:layout_marginTop="@dimen/_5sdp"
        android:background="@android:color/transparent"
        android:fontFamily="@font/ps_regular"
        android:textColor="@color/input_color"
        android:textColorHint="@color/text_color_hint"
        android:hint="Title"
        android:inputType="textCapSentences"
        android:textSize="@dimen/_14sdp" />

    <EditText android:id="@+id/edit_item_note"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@id/btn_edit_note_ll"
        android:layout_marginHorizontal="@dimen/_10sdp"
        android:layout_marginTop="@dimen/_5sdp"
        android:layout_marginBottom="@dimen/_5sdp"
        android:background="@android:color/transparent"
        android:textColor="@color/input_color"
        android:textColorHint="@color/text_color_hint"
        android:fontFamily="@font/ps_regular"
        android:gravity="start"
        android:hint="Note"
        android:layout_below="@id/edit_item_title"
        android:paddingTop="@dimen/_2sdp"
        android:textSize="@dimen/_13sdp" />

    <LinearLayout
        android:id="@+id/btn_edit_note_ll"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_30sdp"
        android:layout_marginHorizontal="@dimen/_5sdp"
        android:layout_alignParentEnd="true"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="@dimen/_5sdp"
        android:orientation="horizontal">
        <Button android:id="@+id/edit_cancel_note"
            android:layout_width="0dp"
            android:layout_height="@dimen/_30sdp"
            android:layout_weight="1"
            android:textColor="@color/popup_btn_color"
            android:background="@android:color/transparent"
            android:text="Cancel"
            style="?android:attr/borderlessButtonStyle"/>

        <Button android:id="@+id/edit_add_note"
            android:layout_width="0dp"
            android:layout_height="@dimen/_30sdp"
            android:layout_weight="1"
            android:textColor="@color/popup_btn_color"
            android:background="@android:color/transparent"
            android:text="Update"
            style="?android:attr/borderlessButtonStyle"/>
    </LinearLayout>
</RelativeLayout>
```

**(d). `add_layout.xml`**

> Our `add_layout` layout.

This layout will represent our Layout Add's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [``](https://android.examples.directory/)
2. [`LinearLayout`](https://android.examples.directory/linearlayout)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout android:id="@+id/btn_add_layout"
    android:layout_width="match_parent"
    android:layout_height="@dimen/_200sdp"
    android:layout_marginStart="@dimen/_10sdp"
    android:layout_marginEnd="@dimen/_10sdp"
    android:layout_centerVertical="true"
    android:background="@drawable/add_note_layout"
    android:orientation="vertical"
    android:visibility="gone"
    xmlns:android="http://schemas.android.com/apk/res/android">

    <EditText android:id="@+id/edt_item_title"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_35sdp"
        android:layout_marginHorizontal="@dimen/_10sdp"
        android:layout_marginTop="@dimen/_5sdp"
        android:background="@android:color/transparent"
        android:fontFamily="@font/ps_regular"
        android:textColor="@color/input_color"
        android:textColorHint="@color/text_color_hint"
        android:hint="Title"
        android:inputType="textCapSentences"
        android:textSize="@dimen/_14sdp" />

    <EditText android:id="@+id/edt_item_note"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@id/btn_add_note_ll"
        android:layout_marginHorizontal="@dimen/_10sdp"
        android:layout_marginTop="@dimen/_5sdp"
        android:layout_marginBottom="@dimen/_5sdp"
        android:background="@android:color/transparent"
        android:textColor="@color/input_color"
        android:textColorHint="@color/text_color_hint"
        android:fontFamily="@font/ps_regular"
        android:gravity="start"
        android:hint="Note"
        android:layout_below="@id/edt_item_title"
        android:paddingTop="@dimen/_2sdp"
        android:textSize="@dimen/_13sdp" />

    <LinearLayout
        android:id="@+id/btn_add_note_ll"
        android:layout_width="match_parent"
        android:layout_height="@dimen/_30sdp"
        android:layout_marginHorizontal="@dimen/_5sdp"
        android:layout_alignParentEnd="true"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="@dimen/_5sdp"
        android:orientation="horizontal">
        <Button android:id="@+id/btn_cancel_note"
            android:layout_width="0dp"
            android:layout_height="@dimen/_30sdp"
            android:layout_weight="1"
            android:textColor="@color/popup_btn_color"
            android:background="@android:color/transparent"
            android:text="Cancel"
            style="?android:attr/borderlessButtonStyle"/>

        <Button android:id="@+id/btn_add_note"
            android:layout_width="0dp"
            android:layout_height="@dimen/_30sdp"
            android:layout_weight="1"
            android:textColor="@color/popup_btn_color"
            android:background="@android:color/transparent"
            android:text="Add Note"
            style="?android:attr/borderlessButtonStyle"/>
    </LinearLayout>



</RelativeLayout>
```

**(e). `activity_splash.xml`**

> Our `activity_splash` layout.

This layout will represent our Splash Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`ImageView`](https://android.examples.directory/imageview)
2. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/md_grey_300"
    tools:context=".Activity.SplashActivity">

    <ImageView
            android:id="@+id/note_ico"
            android:layout_width="@dimen/_80sdp"
            android:layout_height="@dimen/_100sdp"
            android:layout_centerInParent="true"
            android:src="@drawable/ic_note_icon" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@id/note_ico"
            android:layout_marginTop="@dimen/_20sdp"
            android:layout_centerHorizontal="true"
            android:fontFamily="@font/lobster"
            android:textColor="@color/md_white_1000"
            android:text="My Notes"
            android:textSize="@dimen/_20sdp" />
</RelativeLayout>
```

**(f). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`RelativeLayout`](https://android.examples.directory/relativelayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`LinearLayout`](https://android.examples.directory/linearlayout)
2. [`TextView`](https://android.examples.directory/textview)
3. [`Switch`](https://android.examples.directory/switch)
4. [`ImageView`](https://android.examples.directory/imageview)
5. [``](https://android.examples.directory/)
6. [`RecyclerView`](https://android.examples.directory/recyclerview)
7. [`FloatingActionButton`](https://android.examples.directory/floatingactionbutton)
8. [`View`](https://android.examples.directory/view)
9. [`!--`](https://android.examples.directory/!--)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:fab="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/main_layout_bg"
    tools:context=".Activity.MainActivity">

    <LinearLayout
        android:id="@+id/main_layout_content"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:paddingTop="@dimen/_18sdp"
        android:paddingHorizontal="@dimen/_10sdp"
        android:paddingBottom="@dimen/_10sdp">

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="@dimen/_32sdp">
            <TextView
                android:id="@+id/title_header"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:fontFamily="@font/ps_bold"
                android:text="Notes"
                android:layout_centerVertical="true"
                android:textColor="@color/app_main_title"
                android:textSize="@dimen/_22sdp" />

            <Switch
                android:id="@+id/switch_mode"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                style="@style/SCBSwitch"
                android:visibility="gone"
                android:layout_centerInParent="true"/>

            <LinearLayout
                android:layout_width="wrap_content"
                android:layout_height="@dimen/_32sdp"
                android:orientation="horizontal"
                android:gravity="center"
                android:layout_alignParentEnd="true">
                <ImageView
                    android:id="@+id/share_btn"
                    android:layout_width="@dimen/_30sdp"
                    android:layout_height="@dimen/_30sdp"
                    android:padding="@dimen/_6sdp"
                    android:layout_marginHorizontal="@dimen/_5sdp"
                    android:src="@drawable/ic_share"
                    android:visibility="gone"/>


                <ImageView
                    android:id="@+id/update_btn"
                    android:layout_width="@dimen/_30sdp"
                    android:layout_height="@dimen/_30sdp"
                    android:padding="@dimen/_6sdp"
                    android:layout_marginHorizontal="@dimen/_5sdp"
                    android:src="@drawable/ic_pencil_outline"
                    android:visibility="gone"/>


                <ImageView
                    android:id="@+id/delete_btn"
                    android:layout_width="@dimen/_30sdp"
                    android:layout_height="@dimen/_30sdp"
                    android:padding="@dimen/_6sdp"
                    android:src="@drawable/ic_rubbish_bin"
                    android:visibility="gone"/>
            </LinearLayout>



        </RelativeLayout>


        <RelativeLayout
            android:id="@+id/search_layout"
            android:layout_width="match_parent"
            android:layout_height="@dimen/_40sdp"
            android:background="@drawable/search_et_bg"
            android:layout_marginVertical="@dimen/_8sdp"
            android:paddingHorizontal="@dimen/_5sdp">

            <EditText android:id="@+id/edt_search_note"
                android:layout_width="match_parent"
                android:layout_height="@dimen/_30sdp"
                android:layout_centerVertical="true"
                android:background="@android:color/transparent"
                android:fontFamily="@font/ps_regular"
                android:textColorHint="@color/search_et_hint_color"
                android:textColor="@color/input_color"
                android:hint="Search"
                android:textCursorDrawable="@drawable/cursor_drawable"
                android:layout_toStartOf="@id/btn_search"
                android:inputType="textCapSentences"
                android:textSize="@dimen/_14sdp" />

            <ImageView android:id="@+id/btn_search"
                android:layout_width="@dimen/_30sdp"
                android:layout_height="@dimen/_30sdp"
                android:layout_alignParentEnd="true"
                android:layout_centerVertical="true"
                android:padding="@dimen/_5sdp"
                android:src="@drawable/ic_search" />

        </RelativeLayout>


        <android.support.v7.widget.RecyclerView
            android:id="@+id/rv_tasks"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:overScrollMode="never"/>




    </LinearLayout>


    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab_add"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentEnd="true"
        android:layout_alignParentBottom="true"
        android:layout_margin="16dp"
        android:tint="@color/fab_src_tint"
        app:backgroundTint="@color/fab_bg_tint"
        app:rippleColor="@color/fab_ripple"
        android:src="@drawable/ic_add_black_24dp" />
    <View
        android:id="@+id/home_layout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@color/popup_bg_opaque"
        android:visibility="gone"
        />


<!--    ADD LAYOUT  -->

    <include layout="@layout/add_layout"/>


<!--    EDIT LAYOUT -->

    <include layout="@layout/edit_layout"/>

<!--    VIEW LAYOUT -->

    <include layout="@layout/view_layout"/>

</RelativeLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `CustomTextView.java`**

> Our `CustomTextView` class.

Create a java file named `CustomTextView.java`.

Inside it create a class that extends `android.support.v7.widget.AppCompatTextView` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.
2. `AssetManager` from the `android.content.res` package.
3. `TypedArray` from the `android.content.res` package.
4. `Typeface` from the `android.graphics` package.
5. `AttributeSet` from the `android.util` package.

We will be creating the following methods:

1. `setDefaultTypeFace()`.

**(a). Our `setDefaultTypeFace()` method.**

A method to set default type face:

```java
    private void setDefaultTypeFace() {
        Typeface custom_font = Typeface.createFromAsset(context.getAssets(), context.getString(R.string.font_regular));
        setTypeface(custom_font);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Context;
import android.content.res.AssetManager;
import android.content.res.TypedArray;
import android.graphics.Typeface;
import android.util.AttributeSet;

import com.meridian.mynotes.R;

import java.util.HashMap;
import java.util.Map;

public class CustomTextView extends android.support.v7.widget.AppCompatTextView {

    /*
     * Caches typefaces based on their file path and name, so that they don't have to be created
     * every time when they are referenced.
     */
    private static Map<String, Typeface> mTypefaces;
    private Context context;

    public CustomTextView(final Context context) {
        this(context, null);
        setTypeFace(context,null);
    }

    public CustomTextView(final Context context, final AttributeSet attrs) {
        this(context, attrs, 0);
        setTypeFace(context,attrs);
    }

    public CustomTextView(final Context context, final AttributeSet attrs, final int defStyle) {
        super(context, attrs, defStyle);

        setTypeFace(context,attrs);
    }

    private void setTypeFace(Context context, AttributeSet attrs)
    {
        this.context=context;
        if (mTypefaces == null)
        {
            mTypefaces = new HashMap<String, Typeface>();
        }
        // prevent exception in Android Studio / ADT interface builder
        if (this.isInEditMode() || attrs==null)
        {
            return;
        }

        setIncludeFontPadding(false);
        final TypedArray array = context.obtainStyledAttributes(attrs, R.styleable.CustomTextView);
        if (array != null) {
            final String typefaceAssetPath = array.getString(
                    R.styleable.CustomTextView_tvTypeface);

            if (typefaceAssetPath != null) {
                Typeface typeface = null;

                if (mTypefaces.containsKey(typefaceAssetPath)) {
                    typeface = mTypefaces.get(typefaceAssetPath);
                } else {
                    AssetManager assets = context.getAssets();
                    typeface = Typeface.createFromAsset(assets, typefaceAssetPath);
                    mTypefaces.put(typefaceAssetPath, typeface);
                }

                setTypeface(typeface);
            }
            else {
                setDefaultTypeFace();
            }

            array.recycle();
        }
        else {
            setDefaultTypeFace();
        }
    }

    private void setDefaultTypeFace() {
        Typeface custom_font = Typeface.createFromAsset(context.getAssets(), context.getString(R.string.font_regular));
        setTypeface(custom_font);
    }
}


```

**(b). `CustomEditTextView.java`**

> Our `CustomEditTextView` class.

Create a java file named `CustomEditTextView.java`.

Inside it create a class that extends `android.support.v7.widget.AppCompatEditText` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Context` from the `android.content` package.
2. `AssetManager` from the `android.content.res` package.
3. `TypedArray` from the `android.content.res` package.
4. `Typeface` from the `android.graphics` package.
5. `AttributeSet` from the `android.util` package.

We will be creating the following methods:

1. `setTypeFace(Context context, AttributeSet attrs)`.

2. `setDefaultTypeFace()`.

**(a). Our `setTypeFace()` method.**

A method to set type face:

```java
    private void setTypeFace(Context context, AttributeSet attrs) {
        this.context=context;
        if (mTypefaces == null) {
            mTypefaces = new HashMap<String, Typeface>();
        }
        // prevent exception in Android Studio / ADT interface builder
        if (this.isInEditMode() || attrs==null) {
            return;
        }

        setIncludeFontPadding(false);
        final TypedArray array = context.obtainStyledAttributes(attrs, R.styleable.CustomEditTextView);
        if (array != null)
        {
            final String typefaceAssetPath = array.getString(R.styleable.CustomEditTextView_etTypeface);

            if (typefaceAssetPath != null) {
                Typeface typeface ;

                if (mTypefaces.containsKey(typefaceAssetPath)) {
                    typeface = mTypefaces.get(typefaceAssetPath);
                } else {
                    AssetManager assets = context.getAssets();
                    typeface = Typeface.createFromAsset(assets, typefaceAssetPath);
                    mTypefaces.put(typefaceAssetPath, typeface);
                }
                setTypeface(typeface);
            }
            else {
                setDefaultTypeFace();
            }

            array.recycle();
        }
        else {
            setDefaultTypeFace();
        }
    }
```

**(b). Our `setDefaultTypeFace()` method.**

A method to set default type face:

```java
    private void setDefaultTypeFace() {
        Typeface custom_font = Typeface.createFromAsset(context.getAssets(), context.getString(R.string.font_regular));
        setTypeface(custom_font);
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.content.Context;
import android.content.res.AssetManager;
import android.content.res.TypedArray;
import android.graphics.Typeface;
import android.util.AttributeSet;

import com.meridian.mynotes.R;

import java.util.HashMap;
import java.util.Map;

public class CustomEditTextView extends android.support.v7.widget.AppCompatEditText {

    private static Map<String, Typeface> mTypefaces;
    private Context context;

    public CustomEditTextView(Context context) {
        super(context);
        setTypeFace(context,null);
    }

    public CustomEditTextView(Context context, AttributeSet attrs) {
        super(context, attrs);
        setTypeFace(context,attrs);
    }

    public CustomEditTextView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        setTypeFace(context,attrs);
    }

    private void setTypeFace(Context context, AttributeSet attrs) {
        this.context=context;
        if (mTypefaces == null) {
            mTypefaces = new HashMap<String, Typeface>();
        }
        // prevent exception in Android Studio / ADT interface builder
        if (this.isInEditMode() || attrs==null) {
            return;
        }

        setIncludeFontPadding(false);
        final TypedArray array = context.obtainStyledAttributes(attrs, R.styleable.CustomEditTextView);
        if (array != null)
        {
            final String typefaceAssetPath = array.getString(R.styleable.CustomEditTextView_etTypeface);

            if (typefaceAssetPath != null) {
                Typeface typeface ;

                if (mTypefaces.containsKey(typefaceAssetPath)) {
                    typeface = mTypefaces.get(typefaceAssetPath);
                } else {
                    AssetManager assets = context.getAssets();
                    typeface = Typeface.createFromAsset(assets, typefaceAssetPath);
                    mTypefaces.put(typefaceAssetPath, typeface);
                }
                setTypeface(typeface);
            }
            else {
                setDefaultTypeFace();
            }

            array.recycle();
        }
        else {
            setDefaultTypeFace();
        }
    }

    private void setDefaultTypeFace() {
        Typeface custom_font = Typeface.createFromAsset(context.getAssets(), context.getString(R.string.font_regular));
        setTypeface(custom_font);
    }
}



```

**(c). `RecyclerItemClickListener.kt`**

> Our `RecyclerItemClickListener` class.

Create a Kotlin file named `RecyclerItemClickListener.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Context` from the `android.content` package.
2. `RecyclerView` from the `android.support.v7.widget` package.
3. `GestureDetector` from the `android.view` package.
4. `MotionEvent` from the `android.view` package.
5. `View` from the `android.view` package.

Then extend the `RecyclerView.OnItemTouchListener` and add its contents as follows:

First override these callbacks: 

1. `onSingleTapUp(e: MotionEvent): Boolean `.
2. `onLongPress(e: MotionEvent) `.
3. `onInterceptTouchEvent(view: RecyclerView, e: MotionEvent): Boolean `.
4. `onTouchEvent(view: RecyclerView, motionEvent: MotionEvent) `.
5. `onRequestDisallowInterceptTouchEvent(disallowIntercept: Boolean) `.

Then we will be creating the following functions:


**(a). Our `onItemLongClick()` function.**

A function to on item long click:

```kotlin
        fun onItemLongClick(view: View, position: Int)
    }

    init {

        mGestureDetector = GestureDetector(context, object : GestureDetector.SimpleOnGestureListener() {
            override fun onSingleTapUp(e: MotionEvent): Boolean {
                return true
            }

            override fun onLongPress(e: MotionEvent) {
                val childView = recyclerView.findChildViewUnder(e.x, e.y)

                if (childView != null && mListener != null) {
                    mListener.onItemLongClick(childView, recyclerView.getChildAdapterPosition(childView))
                }
            }
        })
    }

    override fun onInterceptTouchEvent(view: RecyclerView, e: MotionEvent): Boolean {
        val childView = view.findChildViewUnder(e.x, e.y)

        if (childView != null && mListener != null && mGestureDetector.onTouchEvent(e)) {
            mListener.onItemClick(childView, view.getChildAdapterPosition(childView))
        }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.GestureDetector
import android.view.MotionEvent
import android.view.View

class RecyclerItemClickListener(context: Context, recyclerView: RecyclerView, private val mListener: OnItemClickListener?) : RecyclerView.OnItemTouchListener {

    private val mGestureDetector: GestureDetector

    interface OnItemClickListener {
        fun onItemClick(view: View, position: Int)

        fun onItemLongClick(view: View, position: Int)
    }

    init {

        mGestureDetector = GestureDetector(context, object : GestureDetector.SimpleOnGestureListener() {
            override fun onSingleTapUp(e: MotionEvent): Boolean {
                return true
            }

            override fun onLongPress(e: MotionEvent) {
                val childView = recyclerView.findChildViewUnder(e.x, e.y)

                if (childView != null && mListener != null) {
                    mListener.onItemLongClick(childView, recyclerView.getChildAdapterPosition(childView))
                }
            }
        })
    }

    override fun onInterceptTouchEvent(view: RecyclerView, e: MotionEvent): Boolean {
        val childView = view.findChildViewUnder(e.x, e.y)

        if (childView != null && mListener != null && mGestureDetector.onTouchEvent(e)) {
            mListener.onItemClick(childView, view.getChildAdapterPosition(childView))
        }

        return false
    }

    override fun onTouchEvent(view: RecyclerView, motionEvent: MotionEvent) {}

    override fun onRequestDisallowInterceptTouchEvent(disallowIntercept: Boolean) {}}



```


**(d). `Task.java`**

> Our `Task` class.

Create a java file named `Task.java`.

Here are some of the imports we will use in this particular class:

1. `ColumnInfo` from the `android.arch.persistence.room` package.
2. `Entity` from the `android.arch.persistence.room` package.
3. `PrimaryKey` from the `android.arch.persistence.room` package.

We will be creating the following methods:

1. `isSelected()` - It will return `boolean` object.

2. `setSelected(boolean selected)`.

3. `getId()` - It will return `int` object.

4. `setId(int id)`.

5. `getTitle()` - It will return `String` object.

6. `setTitle(String title)`.

7. `getDate()` - It will return `String` object.

8. `setDate(String date)`.

9. `getNote()` - It will return `String` object.

10. `setNote(String note)`.

**(a). Our `setDate()` method.**

A method to set date:

```java
    public void setDate(String date) {
        this.date = date;
    }
```

**(b). Our `setTitle()` method.**

A method to set title:

```java
    public void setTitle(String title) {
        this.title = title;
    }
```

**(c). Our `setNote()` method.**

A method to set note:

```java
    public void setNote(String note) {
        this.note = note;
    }
```

**(d). Our `getDate()` method.**

A method to get date:

```java
    public String getDate() {
        return date;
    }
```

**(e). Our `setSelected()` method.**

A method to set selected:

```java
    public void setSelected(boolean selected) {
        isSelected = selected;
    }
```

**(f). Our `setId()` method.**

A method to set id:

```java
    public void setId(int id) {
        this.id = id;
    }
```

**(g). Our `getId()` method.**

A method to get id:

```java
    public int getId() {
        return id;
    }
```

**(h). Our `isSelected()` method.**

A method to is selected:

```java
    public boolean isSelected() {
        return isSelected;
    }
```

**(i). Our `getNote()` method.**

A method to get note:

```java
    public String getNote() {
        return note;
    }
```

**(j). Our `getTitle()` method.**

A method to get title:

```java
    public String getTitle() {
        return title;
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.PrimaryKey;

import java.io.Serializable;

@Entity
public class Task implements Serializable {
    @PrimaryKey(autoGenerate = true)
    private int id;

    @ColumnInfo(name = "title")
    private String title;

    @ColumnInfo(name = "note")
    private String note;

    @ColumnInfo(name = "date")
    private String date;

    private boolean isSelected;

    public boolean isSelected() {
        return isSelected;
    }

    public void setSelected(boolean selected) {
        isSelected = selected;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}


```

**(e). `TaskDao.java`**

> Our `TaskDao` class.

Create a java file named `TaskDao.java`.

Here are some of the imports we will use in this particular class:

1. `Dao` from the `android.arch.persistence.room` package.
2. `Delete` from the `android.arch.persistence.room` package.
3. `Insert` from the `android.arch.persistence.room` package.
4. `Query` from the `android.arch.persistence.room` package.
5. `Update` from the `android.arch.persistence.room` package.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import java.util.List;

@Dao
public interface TaskDao {

    @Query("SELECT * FROM task")
    List<Task> getAll();

    @Insert
    void insert(Task task);

    @Delete
    void delete(Task task);

    @Update
    void update(Task task);
}


```

**(f). `DatabaseClient.java`**

> Our `DatabaseClient` class.

Create a java file named `DatabaseClient.java`.

Here are some of the imports we will use in this particular class:

1. `Room` from the `android.arch.persistence.room` package.
2. `Context` from the `android.content` package.

We will be creating the following methods:

1. `getAppDatabase()` - It will return `AppDatabase` object.

**(a). Our `getAppDatabase()` method.**

A method to get app database:

```java
    public AppDatabase getAppDatabase() {
        return appDatabase;
    }
```


Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.arch.persistence.room.Room;
import android.content.Context;

public class DatabaseClient {

    private Context mCtx;
    private static DatabaseClient mInstance;

    //our app database object
    private AppDatabase appDatabase;

    private DatabaseClient(Context mCtx) {
        this.mCtx = mCtx;

        //creating the app database with Room database builder
        //MyToDos is the name of the database
        appDatabase = Room.databaseBuilder(mCtx, AppDatabase.class, "MyNotes").build();
    }

    public static synchronized DatabaseClient getInstance(Context mCtx) {
        if (mInstance == null) {
            mInstance = new DatabaseClient(mCtx);
        }
        return mInstance;
    }

    public AppDatabase getAppDatabase() {
        return appDatabase;
    }
}

```

**(g). `AppDatabase.java`**

> Our `AppDatabase` class.

Create a java file named `AppDatabase.java`.

Inside it create a class that extends `RoomDatabase` and add its contents as follows:

Here are some of the imports we will use in this particular class:

1. `Database` from the `android.arch.persistence.room` package.
2. `RoomDatabase` from the `android.arch.persistence.room` package.

Here is the full java code for this `class`:

```java
package replace_with_your_package_name;

import android.arch.persistence.room.Database;
import android.arch.persistence.room.RoomDatabase;

@Database(entities = {Task.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {
    public abstract TaskDao taskDao();
}

```

**(h). `TaskAdapter.kt`**

> Our `TaskAdapter` class.

Create a Kotlin file named `TaskAdapter.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `View` from the `android.view` package.
2. `ViewGroup` from the `android.view` package.
3. `AnimationUtils` from the `android.view.animation` package.
4. `Filter` from the `android.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.task_item.view` package.

Then extend the `RecyclerView.Adapter<TaskAdapter.TaskViewHolder>` and add its contents as follows:

First override these callbacks: 

1. `onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): TaskViewHolder `.
2. `getItemCount(): Int `.
3. `onBindViewHolder(holder: TaskViewHolder, position: Int) `.
4. `performFiltering(charSequence: CharSequence): Filter.FilterResults `.
5. `publishResults(charSequence: CharSequence, filterResults: Filter.FilterResults) `.

Then we will be creating the following functions:

1. `getFilter(): Filter `.
2. `loadAnim() `.
3. `swapAddDelete(parameter)` - This function will take a `Int` object as a parameter.
4. `disable() `.
5. `enable() `.
6. `hideSelectedColor(parameter)` - Let's pass a `View` object as a parameter.

**(a). Our `loadAnim()` function.**

A function to load anim:

```kotlin
        fun loadAnim() {
//            img_user.setAnimation(AnimationUtils.loadAnimation(itemView.context,R.anim.fade_transition_animation))
            item_layout.setAnimation(AnimationUtils.loadAnimation(itemView.context, R.anim.fade_scale_animation))

        }
```

**(b). Our `disable()` function.**

Write this function as follows:

```kotlin
    fun disable() {
        fab_add_.hide()
    }
```

**(c). Our `hideSelectedColor()` function.**

A function to hide selected color:

```kotlin
    fun hideSelectedColor(view: View) {

        view.task_item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.md_grey_200))

    }
```

**(d). Our `swapAddDelete()` function.**

A function to swap add delete:

```kotlin
    fun swapAddDelete(size: Int) {
        if (size > 0) {
            if (selectedTaskList.size == 1) {
                update_btn_.visibility = View.VISIBLE
                share_btn_.visibility = View.VISIBLE
            } else {
                update_btn_.visibility = View.GONE
                share_btn_.visibility = View.GONE
            }
            disable()
            delete_btn_.visibility = View.VISIBLE
        } else {
            enable()
            update_btn_.visibility = View.GONE
            delete_btn_.visibility = View.GONE
            share_btn_.visibility = View.GONE
        }
    }
```

**(e). Our `getFilter()` function.**

A function to get filter:

```kotlin
    internal fun getFilter(): Filter {
        return object : Filter() {
            override fun performFiltering(charSequence: CharSequence): Filter.FilterResults {
                val charString = charSequence.toString()
                if (charString.isEmpty()) {
                    datasFiltered = tasks
                } else {
                    val filteredList = java.util.ArrayList<Task>()
                    for (row in tasks) {

                        // name match condition. this might differ depending on your requirement
                        // here we are looking for name or phone number match
                        if (row.title.toLowerCase().contains(charString.toLowerCase()) || row.title.contains(
                                        charSequence
                                ) || row.note.toLowerCase().contains(charString.toLowerCase()) || row.note.toLowerCase().contains(charSequence)
                        ) {
                            filteredList.add(row)
                        }
                    }

                    datasFiltered = filteredList
                }

                val filterResults = Filter.FilterResults()
                filterResults.values = datasFiltered
                return filterResults
            }

            override fun publishResults(charSequence: CharSequence, filterResults: Filter.FilterResults) {
                datasFiltered = filterResults.values as List<Task>
                notifyDataSetChanged()
            }
        }
    }
```

**(f). Our `enable()` function.**

Write this function as follows:

```kotlin
    fun enable() {
        fab_add_.show()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.support.v4.content.ContextCompat
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AnimationUtils
import android.widget.Filter
import com.meridian.mynotes.Activity.MainActivity.Mode
import com.meridian.mynotes.Activity.MainActivity.Mode.delete_btn_
import com.meridian.mynotes.Activity.MainActivity.Mode.fab_add_
import com.meridian.mynotes.Activity.MainActivity.Mode.selectedTaskList
import com.meridian.mynotes.Activity.MainActivity.Mode.share_btn_
import com.meridian.mynotes.Activity.MainActivity.Mode.update_btn_
import com.meridian.mynotes.Components.Task
import com.meridian.mynotes.R
import kotlinx.android.synthetic.main.task_item.view.*

class TaskAdapter(val context: Context, val tasks: List<Task>) : RecyclerView.Adapter<TaskAdapter.TaskViewHolder>() {

    var light_mode = Mode.mode
    var datasFiltered: List<Task> = tasks
    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): TaskViewHolder {
        val view = LayoutInflater.from(viewGroup.context).inflate(R.layout.task_item, viewGroup, false)
        return TaskViewHolder(view)
    }

    override fun getItemCount(): Int {
        return datasFiltered.size
    }

    override fun onBindViewHolder(holder: TaskViewHolder, position: Int) {

//        holder.loadAnim()


        val task = datasFiltered.get(position)
        holder.item_title.setText(task.title)
        holder.item_note.setText(task.note)
        holder.item_date.setText(task.date)
        holder.setIsRecyclable(false)
//        holder.item_layout.setAnimation(AnimationUtils.loadAnimation(holder.itemView.context, R.anim.fade_transition_animation))


        if (task.isSelected) {
            if (light_mode.equals("Light")) {
                holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.md_grey_400))
                holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
                holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
            }else{
                holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.item_layout_selected))
                holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.item_title_dark))
                holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.item_note_dark))
            }
        } else {
            if(light_mode.equals("Light")) {
                holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.md_grey_200))
                holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
                holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
            }else{
                holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.search_dark))
                holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.item_title_dark))
                holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.item_note_dark))
            }
        }


        holder.item_layout.setOnClickListener {
            if (selectedTaskList.size > 0) {
                swapAddDelete(selectedTaskList.size)
                if (!selectedTaskList.contains(datasFiltered.get(position))) {
                    datasFiltered.get(position).isSelected = true

                    if(light_mode.equals("Light")) {
                        holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.md_grey_400))
                        holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
                        holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
                    }else{
                        holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.item_layout_selected))
                        holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.item_title_dark))
                        holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.item_note_dark))
                    }
                    selectedTaskList.add(datasFiltered.get(position))
                    swapAddDelete(selectedTaskList.size)
                } else {
                    datasFiltered.get(position).isSelected = false

                    if(light_mode.equals("Light")) {
                        holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.md_grey_200))
                        holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
                        holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
                    }else{
                        holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.search_dark))
                        holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.item_title_dark))
                        holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.item_note_dark))
                    }
                    selectedTaskList.remove(datasFiltered.get(position))
                    swapAddDelete(selectedTaskList.size)
                }
//                Toast.makeText(context, "SELECTED==" + selectedTaskList.toString(), Toast.LENGTH_SHORT).show()
            } else {
                if(light_mode.equals("Light")) {
                    holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.md_grey_200))
                    holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
                    holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
                }else{
                    holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.search_dark))
                    holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.item_title_dark))
                    holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.item_note_dark))
                }
                val tasks = datasFiltered.get(position)
                fab_add_.hide()
            }

        }

        holder.item_layout.setOnLongClickListener {
            if (!selectedTaskList.contains(datasFiltered.get(position))) {
                datasFiltered.get(position).isSelected = true
                if(light_mode.equals("Light")) {
                    holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.md_grey_400))
                    holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
                    holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.md_black_1000))
                }else{
                    holder.item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.item_layout_selected))
                    holder.item_title.setTextColor(ContextCompat.getColor(context, R.color.item_title_dark))
                    holder.item_note.setTextColor(ContextCompat.getColor(context, R.color.item_note_dark))
                }
                selectedTaskList.add(datasFiltered.get(position))
                swapAddDelete(selectedTaskList.size)
            }
            return@setOnLongClickListener true;
        }

    }

    internal fun getFilter(): Filter {
        return object : Filter() {
            override fun performFiltering(charSequence: CharSequence): Filter.FilterResults {
                val charString = charSequence.toString()
                if (charString.isEmpty()) {
                    datasFiltered = tasks
                } else {
                    val filteredList = java.util.ArrayList<Task>()
                    for (row in tasks) {

                        // name match condition. this might differ depending on your requirement
                        // here we are looking for name or phone number match
                        if (row.title.toLowerCase().contains(charString.toLowerCase()) || row.title.contains(
                                        charSequence
                                ) || row.note.toLowerCase().contains(charString.toLowerCase()) || row.note.toLowerCase().contains(charSequence)
                        ) {
                            filteredList.add(row)
                        }
                    }

                    datasFiltered = filteredList
                }

                val filterResults = Filter.FilterResults()
                filterResults.values = datasFiltered
                return filterResults
            }

            override fun publishResults(charSequence: CharSequence, filterResults: Filter.FilterResults) {
                datasFiltered = filterResults.values as List<Task>
                notifyDataSetChanged()
            }
        }
    }

    class TaskViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val item_title = itemView.task_item_title
        val item_note = itemView.task_item_note
        val item_date = itemView.task_item_date
        val item_layout = itemView.task_item_layout
        fun loadAnim() {
//            img_user.setAnimation(AnimationUtils.loadAnimation(itemView.context,R.anim.fade_transition_animation))
            item_layout.setAnimation(AnimationUtils.loadAnimation(itemView.context, R.anim.fade_scale_animation))

        }
    }

    fun swapAddDelete(size: Int) {
        if (size > 0) {
            if (selectedTaskList.size == 1) {
                update_btn_.visibility = View.VISIBLE
                share_btn_.visibility = View.VISIBLE
            } else {
                update_btn_.visibility = View.GONE
                share_btn_.visibility = View.GONE
            }
            disable()
            delete_btn_.visibility = View.VISIBLE
        } else {
            enable()
            update_btn_.visibility = View.GONE
            delete_btn_.visibility = View.GONE
            share_btn_.visibility = View.GONE
        }
    }

    fun disable() {
        fab_add_.hide()
    }

    fun enable() {
        fab_add_.show()
    }

    fun hideSelectedColor(view: View) {

        view.task_item_layout.setCardBackgroundColor(ContextCompat.getColor(context, R.color.md_grey_200))

    }
}

```


**(i). `SplashActivity.kt`**

> Our `SplashActivity` class.

Create a Kotlin file named `SplashActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `AppCompatActivity` from the `android.support.v7.app` package.
3. `Bundle` from the `android.os` package.
4. `Handler` from the `android.os` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import com.meridian.mynotes.R

class SplashActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)


        Handler().postDelayed({
            //start main activity
            startActivity(Intent(this@SplashActivity, MainActivity::class.java))
            //finish this activity
            finish()
        },3000)

    }
}


```


**(j). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Toast` from the `android.widget` package.
2. `*` from the `kotlinx.android.synthetic.main.add_layout` package.
3. `*` from the `kotlinx.android.synthetic.main.edit_layout` package.
4. `*` from the `kotlinx.android.synthetic.main.task_item.view` package.
5. `*` from the `kotlinx.android.synthetic.main.view_layout` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onItemClick(view: View, position: Int) `.
3. `onItemLongClick(view: View, position: Int) `.
4. `afterTextChanged(s: Editable) `.
5. `onResume() `.
6. `onBackPressed() `.
7. `doInBackground(vararg params: Void?): Void? `.
8. `onPostExecute(result: Void?) `.
9. `doInBackground(vararg voids: Void): List<Task> `.
10. `onPostExecute(tasks: List<Task>) `.

Then we will be creating the following functions:

1. `shareNote(parameter)` - We pass a `Task` object as a parameter.
2. `hideSelectedColor(parameter)` - Pass to this method a `View` object as a parameter.
3. `hideEditLayout() `.
4. `updateTask(parameter)` - Pass to this method a `Task` object as a parameter.
5. `swapAddDelete(parameter)` - This function will take a `Int` object as a parameter.
6. `disable() `.
7. `enable() `.
8. `addNote(title: String, note: String, date: String) `.
9. `deleteNote(task: Task, position: Int) `.
10. `getTasks() `.
11. `hideAddLayout() `.
12. `hideKeyboard(parameter)` - Pass to this method a `Activity` object as a parameter.
13. `darkMode() `.
14. `lightMode() `.

**(a). Our `darkMode()` function.**

A function to dark mode:

```kotlin
    private fun darkMode() {
        mode = "Dark"
        main_layout.setBackgroundColor(ContextCompat.getColor(applicationContext, R.color.dark_bg));
        title_header.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        edt_search_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_white_1000))
        edt_search_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.search_dark_hint))
        search_layout.setBackgroundDrawable(ContextCompat.getDrawable(applicationContext, R.drawable.search_et_bg_dark))
        btn_search.setImageResource(R.drawable.ic_search_dark)
        fab_add.hide()
        fab_add.setImageResource(R.drawable.ic_add_dark)
        fab_add.show()
        fab_add.setBackgroundColor(ContextCompat.getColor(applicationContext, R.color.md_grey_200));
        btn_add_layout.setBackgroundResource(R.drawable.add_note_layout_dark)
        edt_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        edt_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        edt_item_title.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        edt_item_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        btn_cancel_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        btn_add_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))

        btn_edit_layout.setBackgroundResource(R.drawable.add_note_layout_dark)
        edit_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        edit_item_title.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        edit_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        edit_item_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        edit_cancel_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        edit_add_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))

        btn_view_layout.setBackgroundResource(R.drawable.add_note_layout_dark)
        view_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        view_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))



        update_btn.setImageResource(R.drawable.ic_pencil_outline_light)
        share_btn.setImageResource(R.drawable.ic_share_light)

    }
```

**(b). Our `deleteNote()` function.**

A function to delete note:

```kotlin
    fun deleteNote(task: Task, position: Int) {
        class DeleteTask : AsyncTask<Void, Void, Void>() {

            override fun doInBackground(vararg params: Void?): Void? {
                DatabaseClient.getInstance(getApplicationContext()).getAppDatabase()
                        .taskDao()
                        .delete(task);
                return null;
            }

            override fun onPostExecute(result: Void?) {
                super.onPostExecute(result);
                edt_search_note.setText("")
                selectedTaskList.clear()
                swapAddDelete(selectedTaskList.size)
                getTasks()
            }
        }

        val delete = DeleteTask()
        delete.execute();
    }
```

**(c). Our `hideEditLayout()` function.**

A function to hide edit layout:

```kotlin
    fun hideEditLayout() {
        hideKeyboard(this)
        if (btn_edit_layout.visibility == View.VISIBLE) {
            btn_edit_layout.visibility = View.GONE
            btn_edit_layout.startAnimation(slide_down)
            home_layout.startAnimation(fade_out)
            home_layout.visibility = View.GONE
            edit_item_title.setText("")
            edit_item_note.setText("")
            update_btn.visibility = View.GONE
            delete_btn.visibility = View.GONE
            share_btn.visibility = View.GONE
            fab_add.show()
            hideKeyboard(this)
        }
        getTasks();
    }
```

**(d). Our `disable()` function.**

Write this function as follows:

```kotlin
    fun disable() {
        fab_add.hide()
    }
```

**(e). Our `addNote()` function.**

A function to add note:

```kotlin
    fun addNote(title: String, note: String, date: String) {


        class SaveTask : AsyncTask<Void, Void, Void>() {

            override fun doInBackground(vararg params: Void?): Void? {
                val task = Task()
                task.title = title
                task.note = note
                task.date = date
                DatabaseClient.getInstance(applicationContext).getAppDatabase()
                        .taskDao()
                        .insert(task);
                return null;
            }

            override fun onPostExecute(result: Void?) {
                super.onPostExecute(result)
                Toast.makeText(applicationContext, "Added", Toast.LENGTH_SHORT).show()
                edt_item_title.setText("")
                edt_item_note.setText("")
                hideAddLayout()
            }
        }

        val save = SaveTask()
        save.execute();


    }
```

**(f). Our `hideAddLayout()` function.**

A function to hide add layout:

```kotlin
    fun hideAddLayout() {
        hideKeyboard(this)
        if (btn_add_layout.visibility == View.VISIBLE) {
            btn_add_layout.visibility = View.GONE
            btn_add_layout.startAnimation(slide_down)
            fab_add.startAnimation(rotate_cw)
            home_layout.startAnimation(fade_out)
            home_layout.visibility = View.GONE
            hideKeyboard(this)
        }
        getTasks();
    }
```

**(g). Our `hideSelectedColor()` function.**

A function to hide selected color:

```kotlin
    fun hideSelectedColor(view: View) {
        if (mode == "Light") {
            view.task_item_layout.setCardBackgroundColor(ContextCompat.getColor(applicationContext, R.color.md_grey_200))
        }
    }
```

**(h). Our `shareNote()` function.**

A function to share note:

```kotlin
    fun shareNote(task: Task) {
        val share = Intent(Intent.ACTION_SEND)
        share.type = "text/plain"
        share.addFlags(Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);
        share.putExtra(Intent.EXTRA_SUBJECT, task.title)
        share.putExtra(Intent.EXTRA_TEXT, task.title + "\n" + task.note)
        startActivity(Intent.createChooser(share, "Send note via"))
    }
```

**(i). Our `enable()` function.**

Write this function as follows:

```kotlin
    fun enable() {
        fab_add.show()
    }
```

**(j). Our `swapAddDelete()` function.**

A function to swap add delete:

```kotlin
    fun swapAddDelete(size: Int) {
        if (size > 0) {
            if (selectedTaskList.size == 1) {
                update_btn.visibility = View.VISIBLE
                share_btn.visibility = View.VISIBLE
            } else {
                update_btn.visibility = View.GONE
                share_btn.visibility = View.GONE
            }
            disable()
            delete_btn.visibility = View.VISIBLE
        } else {
            enable()
            update_btn.visibility = View.GONE
            delete_btn.visibility = View.GONE
            share_btn.visibility = View.GONE
        }
    }
```

**(k). Our `lightMode()` function.**

A function to light mode:

```kotlin
    fun lightMode() {
        mode = "Light"
        main_layout.setBackgroundColor(ContextCompat.getColor(applicationContext, R.color.main_layout_bg));
        title_header.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_blue_grey_800))
        edt_search_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edt_search_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.md_grey_500))
        search_layout.setBackgroundDrawable(ContextCompat.getDrawable(applicationContext, R.drawable.search_et_bg))
        btn_search.setImageResource(R.drawable.ic_search)
        fab_add.hide()
        fab_add.setImageResource(R.drawable.ic_add_black_24dp)
        fab_add.show()
        fab_add.setBackgroundColor(ContextCompat.getColor(applicationContext, R.color.md_grey_500));
        btn_add_layout.setBackgroundResource(R.drawable.add_note_layout)
        edt_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edt_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edt_item_title.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.text_color_hint))
        edt_item_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.text_color_hint))
        btn_cancel_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        btn_add_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))

        btn_edit_layout.setBackgroundResource(R.drawable.add_note_layout)
        edit_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edit_item_title.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.text_color_hint))
        edit_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edit_item_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.text_color_hint))
        edit_cancel_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edit_add_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))

        btn_view_layout.setBackgroundResource(R.drawable.add_note_layout)
        view_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        view_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))

        update_btn.setImageResource(R.drawable.ic_pencil_outline)
        share_btn.setImageResource(R.drawable.ic_share)
    }
```

**(m). Our `hideKeyboard()` function.**

A function to hide keyboard:

```kotlin
    fun hideKeyboard(activity: Activity) {
        val imm = activity.getSystemService(Activity.INPUT_METHOD_SERVICE) as InputMethodManager
        //Find the currently focused view, so we can grab the correct window token from it.
        var view = activity.currentFocus
        //If no view currently has focus, create a new one, just so we can grab a window token from it
        if (view == null) {
            view = View(activity)
        }
        edt_search_note.isCursorVisible = false
        imm.hideSoftInputFromWindow(view.windowToken, 0)
    }
```

**(n). Our `getTasks()` function.**

A function to get tasks:

```kotlin
    private fun getTasks() {
        class GetTasks : AsyncTask<Void, Void, List<Task>>() {

            override fun doInBackground(vararg voids: Void): List<Task> {
                return DatabaseClient
                        .getInstance(applicationContext)
                        .appDatabase
                        .taskDao()
                        .all
            }

            override fun onPostExecute(tasks: List<Task>) {
                super.onPostExecute(tasks)
                taskList = tasks;
                adapter = TaskAdapter(applicationContext, taskList)
                rv_tasks.setAdapter(adapter)
            }
        }

        val gt = GetTasks()
        gt.execute()
    }
```

**(o). Our `updateTask()` function.**

A function to update task:

```kotlin
    fun updateTask(task: Task) {
        val title = edit_item_title.text.toString().trim()
        val note = edit_item_note.text.toString().trim()
        val date = currentDate


        class UpdateTask : AsyncTask<Void, Void, Void>() {

            override fun doInBackground(vararg params: Void?): Void? {
                task.title = title
                task.note = note
                task.date = date
                task.isSelected = false
                DatabaseClient.getInstance(applicationContext).appDatabase
                        .taskDao()
                        .update(task)
                return null
            }

            override fun onPostExecute(result: Void?) {
                super.onPostExecute(result)
                edt_search_note.setText("")
                Toast.makeText(applicationContext, "Updated", Toast.LENGTH_SHORT).show()
                selectedTaskList.clear()
                hideEditLayout()
            }
        }

        val update = UpdateTask()
        update.execute();
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.view.animation.AnimationUtils

import kotlinx.android.synthetic.main.activity_main.*
import android.app.Activity
import android.content.*
import android.os.AsyncTask
import android.support.design.widget.FloatingActionButton
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatDelegate
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.text.Editable
import android.text.TextUtils
import android.text.TextWatcher
import android.util.Log
import android.view.animation.Animation
import android.view.inputmethod.InputMethodManager
import android.widget.ImageView
import android.widget.Toast
import com.meridian.mynotes.Components.DatabaseClient
import com.meridian.mynotes.Components.Task
import com.meridian.mynotes.R
import com.meridian.mynotes.Utils.RecyclerItemClickListener
import com.meridian.mynotes.Adapter.TaskAdapter
import kotlinx.android.synthetic.main.add_layout.*
import kotlinx.android.synthetic.main.edit_layout.*
import kotlinx.android.synthetic.main.task_item.view.*
import kotlinx.android.synthetic.main.view_layout.*
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList


class MainActivity : AppCompatActivity() {

    lateinit var rotate_cw: Animation
    lateinit var slide_up: Animation
    lateinit var slide_down: Animation
    lateinit var fade_in: Animation
    lateinit var fade_out: Animation
    lateinit var taskList: List<Task>
    var adapter: TaskAdapter? = null
    lateinit var currentDate: String
    lateinit var pref: SharedPreferences
    lateinit var editor: SharedPreferences.Editor


    companion object Mode {
        internal var mode = "Dark"
        lateinit var selectedTaskList: ArrayList<Task>
        lateinit var fab_add_: FloatingActionButton
        lateinit var share_btn_: ImageView
        lateinit var update_btn_: ImageView
        lateinit var delete_btn_: ImageView
    }

    private var myClipboard: ClipboardManager? = null
    private var myClip: ClipData? = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)


//        requestWindowFeature(Window.FEATURE_NO_TITLE);
//        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
//                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_main)

        fab_add_ = fab_add
        share_btn_ = share_btn
        update_btn_ = update_btn
        delete_btn_ = delete_btn


        myClipboard = getSystemService(CLIPBOARD_SERVICE) as ClipboardManager?;
        pref = this.getSharedPreferences("MyPref", Context.MODE_PRIVATE)
        mode = pref.getString("VIEW_MODE", "Light") as String

        if (mode == "Light") {
            switch_mode.setChecked(false)
            //lightMode()
            delegate.setLocalNightMode(AppCompatDelegate.MODE_NIGHT_NO)
        } else {
            switch_mode.setChecked(true)
            //darkMode()
            delegate.setLocalNightMode(AppCompatDelegate.MODE_NIGHT_YES)
        }
//

//
        val sdf = SimpleDateFormat("dd-MM-yyyy")
        currentDate = sdf.format(Date())
        Log.d("CURRENT_DATE", currentDate)

        val resId = R.anim.layout_animation_fall_down;
        val animation = AnimationUtils.loadLayoutAnimation(applicationContext, resId)
        rv_tasks.setHasFixedSize(true)
        rv_tasks.layoutManager = LinearLayoutManager(this) as RecyclerView.LayoutManager?
        rv_tasks.layoutAnimation = animation
        getTasks();


        rotate_cw = AnimationUtils.loadAnimation(this, R.anim.rotate_clockwise)
        slide_up = AnimationUtils.loadAnimation(this, R.anim.slide_up)
        slide_down = AnimationUtils.loadAnimation(this, R.anim.slide_down)
        fade_in = AnimationUtils.loadAnimation(this, R.anim.fade_in)
        fade_out = AnimationUtils.loadAnimation(this, R.anim.fade_out)



        edt_search_note.isCursorVisible = false
        selectedTaskList = ArrayList()
        delete_btn.visibility = View.GONE
        update_btn.visibility = View.GONE
        share_btn.visibility = View.GONE
        selectedTaskList.clear()
        fab_add.show()

        swapAddDelete(selectedTaskList.size)
        rv_tasks.addOnItemTouchListener(RecyclerItemClickListener(applicationContext, rv_tasks, object : RecyclerItemClickListener.OnItemClickListener {
            override fun onItemClick(view: View, position: Int) {
                hideKeyboard(this@MainActivity)
                if (selectedTaskList.size > 0) {
                    swapAddDelete(selectedTaskList.size)


                } else {
                    val task = taskList.get(position)
                    fab_add.hide()
                    home_layout.visibility = View.VISIBLE
                    home_layout.startAnimation(fade_in)
                    btn_view_layout.visibility = View.VISIBLE
                    btn_view_layout.startAnimation(slide_up)
                    view_item_title.setText(task.title)
                    view_item_note.setText(task.note)
                }
            }

            override fun onItemLongClick(view: View, position: Int) {


            }
        }))


        editor = pref.edit()
        switch_mode.setOnCheckedChangeListener { buttonView, isChecked ->
            if (isChecked) {
                editor.putString("VIEW_MODE", "Dark")
                val intent = Intent(applicationContext, MainActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NO_ANIMATION
//                delegate.setLocalNightMode(AppCompatDelegate.MODE_NIGHT_YES)
                startActivity(intent)
                Toast.makeText(applicationContext, "Dark Mode", Toast.LENGTH_SHORT).show()
                editor.commit()
            } else {
                editor.putString("VIEW_MODE", "Light")
                val intent = Intent(applicationContext, MainActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NO_ANIMATION
//                delegate.setLocalNightMode(AppCompatDelegate.MODE_NIGHT_NO)
                startActivity(intent)
                Toast.makeText(applicationContext, "Light Mode", Toast.LENGTH_SHORT).show()
                editor.commit()
            }
        }


       /* title_header.setOnClickListener {
            if (mode.equals("Light")) {
                editor.putString("VIEW_MODE", "Dark")
                val intent = Intent(applicationContext, MainActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NO_ANIMATION
//                delegate.setLocalNightMode(AppCompatDelegate.MODE_NIGHT_YES)
                startActivity(intent)
                Toast.makeText(applicationContext, "Dark Mode", Toast.LENGTH_SHORT).show()
                editor.commit()
            } else {
                editor.putString("VIEW_MODE", "Light")
                val intent = Intent(applicationContext, MainActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NO_ANIMATION
//                delegate.setLocalNightMode(AppCompatDelegate.MODE_NIGHT_NO)
                startActivity(intent)
                Toast.makeText(applicationContext, "Light Mode", Toast.LENGTH_SHORT).show()
                editor.commit()
            }
        }*/

        edt_search_note.addTextChangedListener(object : TextWatcher {

            override fun afterTextChanged(s: Editable) {}

            override fun beforeTextChanged(s: CharSequence, start: Int,
                                           count: Int, after: Int) {
            }

            override fun onTextChanged(s: CharSequence, start: Int,
                                       before: Int, count: Int) {
                selectedTaskList.clear()
                delete_btn.visibility = View.GONE
                update_btn.visibility = View.GONE
                share_btn.visibility = View.GONE
                fab_add.hide()
                adapter?.getFilter()?.filter(s)
                if (s.length == 0) {
                    fab_add.show()
                }
            }
        })

        edit_add_note.setOnClickListener {

            val task = selectedTaskList.get(0)


            //            updateTask(selectedTaskList.get(0))
            if (TextUtils.isEmpty(edit_item_title.text.toString().trim())) {
                Toast.makeText(applicationContext, "Please enter title", Toast.LENGTH_SHORT).show()
            } else {
                updateTask(task)
            }
        }

        edit_cancel_note.setOnClickListener {
            btn_edit_layout.visibility = View.GONE
            home_layout.visibility = View.GONE
            home_layout.startAnimation(fade_out)
            btn_edit_layout.startAnimation(slide_down)
            hideKeyboard(this)
        }


        home_layout.setOnClickListener {
            hideKeyboard(this)
            if (btn_edit_layout.visibility == View.VISIBLE) {
                btn_edit_layout.visibility = View.GONE
                home_layout.visibility = View.GONE
                home_layout.startAnimation(fade_out)
                btn_edit_layout.startAnimation(slide_down)
                hideKeyboard(this)
            } else if (btn_view_layout.visibility == View.VISIBLE) {
                btn_view_layout.visibility = View.GONE
                home_layout.visibility = View.GONE
                home_layout.startAnimation(fade_out)
                btn_view_layout.startAnimation(slide_down)
                fab_add.show()

                hideKeyboard(this)
            } else {
                btn_add_layout.visibility = View.GONE
                hideKeyboard(this)
                delete_btn.visibility = View.GONE
                update_btn.visibility = View.GONE
                share_btn.visibility = View.GONE
                selectedTaskList.clear()
                fab_add.show()
                home_layout.visibility = View.GONE
                home_layout.startAnimation(fade_out)
                btn_add_layout.startAnimation(slide_down)

            }
//            getTasks()
        }

        fab_add.setOnClickListener {
            fab_add.startAnimation(rotate_cw)
            selectedTaskList.clear()
            if (btn_add_layout.visibility == View.GONE) {
                btn_add_layout.visibility = View.VISIBLE
                home_layout.visibility = View.VISIBLE
                home_layout.startAnimation(fade_in)
                btn_add_layout.startAnimation(slide_up)
            } else {
                btn_add_layout.visibility = View.GONE
                home_layout.visibility = View.GONE
                home_layout.startAnimation(fade_out)
                btn_add_layout.startAnimation(slide_down)
                hideKeyboard(this)
            }

        }

        btn_cancel_note.setOnClickListener {
            btn_add_layout.visibility = View.GONE
            home_layout.visibility = View.GONE
            home_layout.startAnimation(fade_out)
            btn_add_layout.startAnimation(slide_down)
            hideKeyboard(this)
        }

        btn_add_note.setOnClickListener {
            val title = edt_item_title.text.toString().trim()
            val note = edt_item_note.text.toString().trim()
            if (TextUtils.isEmpty(title)) {
                Toast.makeText(applicationContext, "Please enter title", Toast.LENGTH_SHORT).show()
            } else {
                addNote(title, note, currentDate)
            }
        }

        Log.d("TEST", "TEST")

        delete_btn.setOnClickListener {
            //
            for (i in 0..taskList.lastIndex) {
                for (j in 0..selectedTaskList.lastIndex) {
                    if (taskList.get(i) == selectedTaskList.get(j)) {
                        deleteNote(taskList.get(i), i)
                    }
                }
            }
            Toast.makeText(getApplicationContext(), "Deleted", Toast.LENGTH_LONG).show();
        }

        update_btn.setOnClickListener {
            val task = selectedTaskList.get(0)
            Log.d("TASK_SELECTED", task.title + "  " + task.note)

            edit_item_title.setText(task.title.toString())
            edit_item_note.setText(task.note.toString())

            if (btn_edit_layout.visibility == View.VISIBLE) {
                home_layout.visibility = View.GONE
                home_layout.startAnimation(fade_out)
                btn_edit_layout.startAnimation(slide_down)
                btn_edit_layout.visibility = View.GONE
            } else {
                home_layout.visibility = View.VISIBLE
                home_layout.startAnimation(fade_in)
                btn_edit_layout.visibility = View.VISIBLE
                btn_edit_layout.startAnimation(slide_up)
            }
        }


        share_btn.setOnClickListener {
            shareNote(selectedTaskList.get(0))
            delete_btn.visibility = View.GONE
            update_btn.visibility = View.GONE
            share_btn.visibility = View.GONE
            selectedTaskList.clear()
            fab_add.show()

        }

        main_layout_content.setOnClickListener {
            if (edt_search_note.isCursorVisible) {
                edt_search_note.isCursorVisible = false
            }
        }

        edt_search_note.setOnClickListener {
            edt_search_note.isCursorVisible = true
        }

        view_item_note.setOnLongClickListener {

            myClip = ClipData.newPlainText("text", view_item_note.text);
            myClipboard?.setPrimaryClip(myClip);

            Toast.makeText(this, "Note Copied", Toast.LENGTH_SHORT).show();
            return@setOnLongClickListener true
        }

    }

    fun shareNote(task: Task) {
        val share = Intent(Intent.ACTION_SEND)
        share.type = "text/plain"
        share.addFlags(Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET);
        share.putExtra(Intent.EXTRA_SUBJECT, task.title)
        share.putExtra(Intent.EXTRA_TEXT, task.title + "\n" + task.note)
        startActivity(Intent.createChooser(share, "Send note via"))
    }

    fun hideSelectedColor(view: View) {
        if (mode == "Light") {
            view.task_item_layout.setCardBackgroundColor(ContextCompat.getColor(applicationContext, R.color.md_grey_200))
        }
    }


    override fun onResume() {
        super.onResume()
        edt_search_note.text.clear()
        delete_btn.visibility = View.GONE
        update_btn.visibility = View.GONE
        share_btn.visibility = View.GONE
        selectedTaskList.clear()
        fab_add.show()
        getTasks()
    }

    override fun onBackPressed() {
//
        edt_search_note.isCursorVisible = false

        if (btn_view_layout.visibility == View.VISIBLE) {
            btn_view_layout.visibility = View.GONE
            btn_view_layout.startAnimation(slide_down)
            home_layout.visibility = View.GONE
            home_layout.startAnimation(fade_out)
            fab_add.show()
        } else if (btn_edit_layout.visibility == View.VISIBLE) {
            btn_edit_layout.visibility = View.GONE
            btn_edit_layout.startAnimation(slide_down)
            home_layout.visibility = View.GONE
            home_layout.startAnimation(fade_out)
        } else if (btn_add_layout.visibility == View.VISIBLE) {
            btn_add_layout.visibility = View.GONE
            btn_add_layout.startAnimation(slide_down)
            home_layout.visibility = View.GONE
            home_layout.startAnimation(fade_out)
        } else if (selectedTaskList.size > 0) {
            selectedTaskList.clear()
            delete_btn.visibility = View.GONE
            update_btn.visibility = View.GONE
            share_btn.visibility = View.GONE
            fab_add.show()
            getTasks()
        } else {
            super.onBackPressed()
        }
    }

    fun hideEditLayout() {
        hideKeyboard(this)
        if (btn_edit_layout.visibility == View.VISIBLE) {
            btn_edit_layout.visibility = View.GONE
            btn_edit_layout.startAnimation(slide_down)
            home_layout.startAnimation(fade_out)
            home_layout.visibility = View.GONE
            edit_item_title.setText("")
            edit_item_note.setText("")
            update_btn.visibility = View.GONE
            delete_btn.visibility = View.GONE
            share_btn.visibility = View.GONE
            fab_add.show()
            hideKeyboard(this)
        }
        getTasks();
    }


    fun updateTask(task: Task) {
        val title = edit_item_title.text.toString().trim()
        val note = edit_item_note.text.toString().trim()
        val date = currentDate


        class UpdateTask : AsyncTask<Void, Void, Void>() {

            override fun doInBackground(vararg params: Void?): Void? {
                task.title = title
                task.note = note
                task.date = date
                task.isSelected = false
                DatabaseClient.getInstance(applicationContext).appDatabase
                        .taskDao()
                        .update(task)
                return null
            }

            override fun onPostExecute(result: Void?) {
                super.onPostExecute(result)
                edt_search_note.setText("")
                Toast.makeText(applicationContext, "Updated", Toast.LENGTH_SHORT).show()
                selectedTaskList.clear()
                hideEditLayout()
            }
        }

        val update = UpdateTask()
        update.execute();
    }


    fun swapAddDelete(size: Int) {
        if (size > 0) {
            if (selectedTaskList.size == 1) {
                update_btn.visibility = View.VISIBLE
                share_btn.visibility = View.VISIBLE
            } else {
                update_btn.visibility = View.GONE
                share_btn.visibility = View.GONE
            }
            disable()
            delete_btn.visibility = View.VISIBLE
        } else {
            enable()
            update_btn.visibility = View.GONE
            delete_btn.visibility = View.GONE
            share_btn.visibility = View.GONE
        }
    }

    fun disable() {
        fab_add.hide()
    }

    fun enable() {
        fab_add.show()
    }


    fun addNote(title: String, note: String, date: String) {


        class SaveTask : AsyncTask<Void, Void, Void>() {

            override fun doInBackground(vararg params: Void?): Void? {
                val task = Task()
                task.title = title
                task.note = note
                task.date = date
                DatabaseClient.getInstance(applicationContext).getAppDatabase()
                        .taskDao()
                        .insert(task);
                return null;
            }

            override fun onPostExecute(result: Void?) {
                super.onPostExecute(result)
                Toast.makeText(applicationContext, "Added", Toast.LENGTH_SHORT).show()
                edt_item_title.setText("")
                edt_item_note.setText("")
                hideAddLayout()
            }
        }

        val save = SaveTask()
        save.execute();


    }

    fun deleteNote(task: Task, position: Int) {
        class DeleteTask : AsyncTask<Void, Void, Void>() {

            override fun doInBackground(vararg params: Void?): Void? {
                DatabaseClient.getInstance(getApplicationContext()).getAppDatabase()
                        .taskDao()
                        .delete(task);
                return null;
            }

            override fun onPostExecute(result: Void?) {
                super.onPostExecute(result);
                edt_search_note.setText("")
                selectedTaskList.clear()
                swapAddDelete(selectedTaskList.size)
                getTasks()
            }
        }

        val delete = DeleteTask()
        delete.execute();
    }

    private fun getTasks() {
        class GetTasks : AsyncTask<Void, Void, List<Task>>() {

            override fun doInBackground(vararg voids: Void): List<Task> {
                return DatabaseClient
                        .getInstance(applicationContext)
                        .appDatabase
                        .taskDao()
                        .all
            }

            override fun onPostExecute(tasks: List<Task>) {
                super.onPostExecute(tasks)
                taskList = tasks;
                adapter = TaskAdapter(applicationContext, taskList)
                rv_tasks.setAdapter(adapter)
            }
        }

        val gt = GetTasks()
        gt.execute()
    }


    fun hideAddLayout() {
        hideKeyboard(this)
        if (btn_add_layout.visibility == View.VISIBLE) {
            btn_add_layout.visibility = View.GONE
            btn_add_layout.startAnimation(slide_down)
            fab_add.startAnimation(rotate_cw)
            home_layout.startAnimation(fade_out)
            home_layout.visibility = View.GONE
            hideKeyboard(this)
        }
        getTasks();
    }

    fun hideKeyboard(activity: Activity) {
        val imm = activity.getSystemService(Activity.INPUT_METHOD_SERVICE) as InputMethodManager
        //Find the currently focused view, so we can grab the correct window token from it.
        var view = activity.currentFocus
        //If no view currently has focus, create a new one, just so we can grab a window token from it
        if (view == null) {
            view = View(activity)
        }
        edt_search_note.isCursorVisible = false
        imm.hideSoftInputFromWindow(view.windowToken, 0)
    }

    private fun darkMode() {
        mode = "Dark"
        main_layout.setBackgroundColor(ContextCompat.getColor(applicationContext, R.color.dark_bg));
        title_header.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        edt_search_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_white_1000))
        edt_search_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.search_dark_hint))
        search_layout.setBackgroundDrawable(ContextCompat.getDrawable(applicationContext, R.drawable.search_et_bg_dark))
        btn_search.setImageResource(R.drawable.ic_search_dark)
        fab_add.hide()
        fab_add.setImageResource(R.drawable.ic_add_dark)
        fab_add.show()
        fab_add.setBackgroundColor(ContextCompat.getColor(applicationContext, R.color.md_grey_200));
        btn_add_layout.setBackgroundResource(R.drawable.add_note_layout_dark)
        edt_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        edt_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        edt_item_title.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        edt_item_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        btn_cancel_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        btn_add_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))

        btn_edit_layout.setBackgroundResource(R.drawable.add_note_layout_dark)
        edit_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        edit_item_title.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        edit_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        edit_item_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        edit_cancel_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))
        edit_add_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_text_hint))

        btn_view_layout.setBackgroundResource(R.drawable.add_note_layout_dark)
        view_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))
        view_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.dark_rv_title))



        update_btn.setImageResource(R.drawable.ic_pencil_outline_light)
        share_btn.setImageResource(R.drawable.ic_share_light)

    }

    fun lightMode() {
        mode = "Light"
        main_layout.setBackgroundColor(ContextCompat.getColor(applicationContext, R.color.main_layout_bg));
        title_header.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_blue_grey_800))
        edt_search_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edt_search_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.md_grey_500))
        search_layout.setBackgroundDrawable(ContextCompat.getDrawable(applicationContext, R.drawable.search_et_bg))
        btn_search.setImageResource(R.drawable.ic_search)
        fab_add.hide()
        fab_add.setImageResource(R.drawable.ic_add_black_24dp)
        fab_add.show()
        fab_add.setBackgroundColor(ContextCompat.getColor(applicationContext, R.color.md_grey_500));
        btn_add_layout.setBackgroundResource(R.drawable.add_note_layout)
        edt_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edt_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edt_item_title.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.text_color_hint))
        edt_item_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.text_color_hint))
        btn_cancel_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        btn_add_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))

        btn_edit_layout.setBackgroundResource(R.drawable.add_note_layout)
        edit_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edit_item_title.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.text_color_hint))
        edit_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edit_item_note.setHintTextColor(ContextCompat.getColor(applicationContext, R.color.text_color_hint))
        edit_cancel_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        edit_add_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))

        btn_view_layout.setBackgroundResource(R.drawable.add_note_layout)
        view_item_title.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))
        view_item_note.setTextColor(ContextCompat.getColor(applicationContext, R.color.md_black_1000))

        update_btn.setImageResource(R.drawable.ic_pencil_outline)
        share_btn.setImageResource(R.drawable.ic_share)
    }
}




```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/unaisulhadi/Notes/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/unaisulhadi/Notes).|
|3.|Follow code author [here](https://github.com/unaisulhadi).|

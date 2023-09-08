# Designing Material CardViews using ConstraintLayout


>  CardView with Material Design using ConstraintLayout.

This sample contains the layout implementation for all the possible CardView combinations listed in Material design guidelines - Content block combinations.

### Introduction

Material design guidelines mention that cards can be constructed using blocks of content which include:

- An optional header
- A primary title
- Rich media
- Supporting text
- Actions
- 
These blocks can be organized to promote different types of content.
This sample implements layouts for all the possible CardView combinations listed in Material design guidelines - Content block combinations. All the layouts implemented with using ConstraintLayout.

### Pre-requisites

- Android Studio 3.+
- Gradle 3.+

### Screenshots

![ConstraintLayout Tutorial](https://user-images.githubusercontent.com/23726864/32780552-fe55f04e-c941-11e7-9492-8d023758e79c.png)

Let us look at a full `ConstraintLayout` Example based on this project.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 5 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. Our `Appcompat-v7` library.
3. Our `Recyclerview-v7` library.
4. Our `Cardview-v7` library.
5. Our `Constraint-layout` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 27
    defaultConfig {
        applicationId "com.eugenebrusov.cards"
        minSdkVersion 21
        targetSdkVersion 27
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation "com.android.support:appcompat-v7:$rootProject.supportVersion"
    implementation "com.android.support:recyclerview-v7:$rootProject.supportVersion"
    implementation "com.android.support:cardview-v7:$rootProject.supportVersion"
    implementation 'com.android.support.constraint:constraint-layout:1.0.2'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.1'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.1'
}

```

#### Step 2. Design Layouts

For this project let's create the following layouts:

**(a). `item_primarytext_subtext_supportingtext_actions.xml`**

> Our `item_primarytext_subtext_supportingtext_actions` layout.

This layout will represent our Actions Supportingtext Subtext Primarytext Item's layout. Specify [`CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`TextView`](https://android.camposha.info/en/textview)
3. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/CardView.Light"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    tools:ignore="ContentDescription">

    <android.support.constraint.ConstraintLayout
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/primary_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:text="@string/primary"
            android:textAppearance="@style/TextAppearance.AppCompat.Headline"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/sub_text"
            app:layout_constraintVertical_chainStyle="packed" />

        <TextView
            android:id="@+id/sub_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:text="@string/subtext"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            android:textColor="@color/colorSecondaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/primary_text"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/supporting_text" />

        <TextView
            android:id="@+id/supporting_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:lineSpacingExtra="8dp"
            android:text="@string/expanded_supporting"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/sub_text"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/action_button_1" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/supporting_text"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toBottomOf="parent" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:text="@string/action_2"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="@+id/action_button_1"
            app:layout_constraintStart_toEndOf="@+id/action_button_1" />

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

**(b). `item_media3x_actions.xml`**

> Our `item_media3x_actions` layout.

This layout will represent our Actions Media3x Item's layout. Specify [`CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`ImageButton`](https://android.camposha.info/en/imagebutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/CardView.Light"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    tools:ignore="ContentDescription">

    <android.support.constraint.ConstraintLayout
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <ImageView
            android:id="@+id/media_image"
            android:layout_width="240dp"
            android:layout_height="240dp"
            android:layout_marginTop="16dp"
            android:layout_marginStart="16dp"
            android:layout_marginBottom="16dp"
            android:scaleType="centerCrop"
            app:srcCompat="@android:color/darker_gray"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toBottomOf="parent" />

        <ImageButton
            android:id="@+id/favorite_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:layout_marginStart="8dp"
            android:layout_marginEnd="16dp"
            android:background="#00FFFFFF"
            android:padding="12dp"
            app:srcCompat="@drawable/ic_favorite_black_24dp"
            app:layout_constraintTop_toTopOf="@+id/media_image"
            app:layout_constraintStart_toEndOf="@+id/media_image"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.5" />

        <ImageButton
            android:id="@+id/bookmark_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00FFFFFF"
            android:padding="12dp"
            app:srcCompat="@drawable/ic_bookmark_black_24dp"
            app:layout_constraintEnd_toEndOf="@+id/favorite_button"
            app:layout_constraintTop_toBottomOf="@+id/favorite_button" />

        <ImageButton
            android:id="@+id/share_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00FFFFFF"
            android:padding="12dp"
            app:srcCompat="@drawable/ic_share_black_24dp"
            app:layout_constraintTop_toBottomOf="@+id/bookmark_button"
            app:layout_constraintEnd_toEndOf="@+id/bookmark_button" />

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

**(c). `item_media2x_primarytext_subtext_actions.xml`**

> Our `item_media2x_primarytext_subtext_actions` layout.

This layout will represent our Actions Subtext Primarytext Media2x Item's layout. Specify [`CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`TextView`](https://android.camposha.info/en/textview)
3. [`ImageView`](https://android.camposha.info/en/imageview)
4. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/CardView.Light"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    tools:ignore="ContentDescription">

    <android.support.constraint.ConstraintLayout
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/primary_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:text="@string/primary_short"
            android:textAppearance="@style/TextAppearance.AppCompat.Headline"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/media_image" />

        <TextView
            android:id="@+id/sub_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:text="@string/subtext"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            android:textColor="@color/colorSecondaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/primary_text"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/media_image" />

        <ImageView
            android:id="@+id/media_image"
            android:layout_width="160dp"
            android:layout_height="160dp"
            android:layout_marginEnd="16dp"
            android:layout_marginTop="16dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:srcCompat="@android:color/darker_gray" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/media_image"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toBottomOf="parent" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_2"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="@+id/action_button_1"
            app:layout_constraintStart_toEndOf="@+id/action_button_1" />

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

**(d). `item_media1x_primarytext_subtext_actions.xml`**

> Our `item_media1x_primarytext_subtext_actions` layout.

This layout will represent our Actions Subtext Primarytext Media1x Item's layout. Specify [`CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`TextView`](https://android.camposha.info/en/textview)
3. [`ImageView`](https://android.camposha.info/en/imageview)
4. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/CardView.Light"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    tools:ignore="ContentDescription">

    <android.support.constraint.ConstraintLayout
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/primary_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:text="@string/primary_short"
            android:textAppearance="@style/TextAppearance.AppCompat.Headline"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/media_image" />

        <TextView
            android:id="@+id/sub_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:text="@string/subtext"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            android:textColor="@color/colorSecondaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/primary_text"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/media_image" />

        <ImageView
            android:id="@+id/media_image"
            android:layout_width="80dp"
            android:layout_height="80dp"
            android:layout_marginTop="16dp"
            android:layout_marginEnd="16dp"
            app:srcCompat="@android:color/darker_gray"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintEnd_toEndOf="parent" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/media_image"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toBottomOf="parent" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_2"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="@+id/action_button_1"
            app:layout_constraintStart_toEndOf="@+id/action_button_1" />

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

**(e). `item_media1x1_primarytext_subtext_actions.xml`**

> Our `item_media1x1_primarytext_subtext_actions` layout.

This layout will represent our Actions Subtext Primarytext Media1x1 Item's layout. Specify [`CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`View`](https://android.camposha.info/en/view)
4. [`Space`](https://android.camposha.info/en/space)
5. [`TextView`](https://android.camposha.info/en/textview)
6. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/CardView.Light"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    tools:ignore="ContentDescription">

    <android.support.constraint.ConstraintLayout
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <ImageView
            android:id="@+id/media_image"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:scaleType="centerCrop"
            app:srcCompat="@android:color/darker_gray"
            app:layout_constraintDimensionRatio="H,1:1"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent" />

        <View
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:background="#7F000000"
            app:layout_constraintTop_toTopOf="@+id/top_space"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toBottomOf="parent" />

        <Space
            android:id="@+id/top_space"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginBottom="24dp"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/primary_text"/>

        <TextView
            android:id="@+id/primary_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:text="@string/primary"
            android:textAppearance="@style/TextAppearance.AppCompat.Headline"
            android:textColor="@color/colorPrimaryTextDefaultMaterialDark"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/sub_text"/>

        <TextView
            android:id="@+id/sub_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="16dp"
            android:text="@string/subtext"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            android:textColor="@color/colorSecondaryTextDefaultMaterialDark"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/action_button_1" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialDark"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toBottomOf="parent" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_2"
            android:textColor="@color/colorPrimaryTextDefaultMaterialDark"
            app:layout_constraintTop_toTopOf="@+id/action_button_1"
            app:layout_constraintStart_toEndOf="@+id/action_button_1" />

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

**(f). `item_media16x9_supportingtext.xml`**

> Our `item_media16x9_supportingtext` layout.

This layout will represent our Supportingtext Media16x9 Item's layout. Specify [`CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/CardView.Light"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    tools:ignore="ContentDescription">

    <android.support.constraint.ConstraintLayout
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <ImageView
            android:id="@+id/media_image"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:scaleType="centerCrop"
            app:srcCompat="@android:color/darker_gray"
            app:layout_constraintDimensionRatio="H,16:9"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/supporting_text"
            app:layout_constraintVertical_chainStyle="packed" />

        <TextView
            android:id="@+id/supporting_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="16dp"
            android:text="@string/supporting"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            android:lineSpacingExtra="8dp"
            app:layout_constraintTop_toBottomOf="@+id/media_image"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toBottomOf="parent"/>

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

**(g). `item_media16x9_primarytext_subtext_actions_supportingtext.xml`**

> Our `item_media16x9_primarytext_subtext_actions_supportingtext` layout.

This layout will represent our Supportingtext Actions Subtext Primarytext Media16x9 Item's layout. Specify [`CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)
4. [`Button`](https://android.camposha.info/en/button)
5. [`ImageButton`](https://android.camposha.info/en/imagebutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/CardView.Light"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    tools:ignore="ContentDescription">

    <android.support.constraint.ConstraintLayout
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <ImageView
            android:id="@+id/media_image"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:scaleType="centerCrop"
            app:srcCompat="@android:color/darker_gray"
            app:layout_constraintDimensionRatio="H,16:9"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/primary_text"
            app:layout_constraintVertical_chainStyle="packed" />

        <TextView
            android:id="@+id/primary_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:text="@string/primary"
            android:textAppearance="@style/TextAppearance.AppCompat.Headline"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/media_image"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/sub_text" />

        <TextView
            android:id="@+id/sub_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:text="@string/subtext"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            android:textColor="@color/colorSecondaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/primary_text"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/action_button_1" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/sub_text"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/supporting_text" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_2"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="@+id/action_button_1"
            app:layout_constraintStart_toEndOf="@+id/action_button_1" />

        <ImageButton
            android:id="@+id/expand_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginEnd="8dp"
            android:layout_marginBottom="0dp"
            android:background="#00FFFFFF"
            android:padding="6dp"
            app:srcCompat="@drawable/ic_expand_more_black_36dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toBottomOf="@+id/action_button_1" />

        <TextView
            android:id="@+id/supporting_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="24dp"
            android:lineSpacingExtra="8dp"
            android:text="@string/expanded_supporting"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/action_button_1"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toBottomOf="parent"/>

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

**(h). `item_media16x9_actions.xml`**

> Our `item_media16x9_actions` layout.

This layout will represent our Actions Media16x9 Item's layout. Specify [`CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`ImageButton`](https://android.camposha.info/en/imagebutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/CardView.Light"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    tools:ignore="ContentDescription">

    <android.support.constraint.ConstraintLayout
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <ImageView
            android:id="@+id/media_image"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:scaleType="centerCrop"
            app:srcCompat="@android:color/darker_gray"
            app:layout_constraintDimensionRatio="H,16:9"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/share_button"
            app:layout_constraintVertical_chainStyle="packed" />

        <ImageButton
            android:id="@+id/favorite_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00FFFFFF"
            android:padding="12dp"
            app:srcCompat="@drawable/ic_favorite_black_24dp"
            app:layout_constraintTop_toTopOf="@+id/bookmark_button"
            app:layout_constraintEnd_toStartOf="@+id/bookmark_button" />

        <ImageButton
            android:id="@+id/bookmark_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#00FFFFFF"
            android:padding="12dp"
            app:srcCompat="@drawable/ic_bookmark_black_24dp"
            app:layout_constraintTop_toTopOf="@+id/share_button"
            app:layout_constraintEnd_toStartOf="@+id/share_button" />

        <ImageButton
            android:id="@+id/share_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginEnd="8dp"
            android:background="#00FFFFFF"
            android:padding="12dp"
            app:srcCompat="@drawable/ic_share_black_24dp"
            app:layout_constraintTop_toBottomOf="@+id/media_image"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toBottomOf="parent" />

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

**(i). `item_media15x_primarytext_subtext_actions.xml`**

> Our `item_media15x_primarytext_subtext_actions` layout.

This layout will represent our Actions Subtext Primarytext Media15x Item's layout. Specify [`CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`TextView`](https://android.camposha.info/en/textview)
3. [`ImageView`](https://android.camposha.info/en/imageview)
4. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/CardView.Light"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    tools:ignore="ContentDescription">

    <android.support.constraint.ConstraintLayout
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/primary_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:text="@string/primary_short"
            android:textAppearance="@style/TextAppearance.AppCompat.Headline"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/media_image" />

        <TextView
            android:id="@+id/sub_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:text="@string/subtext"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            android:textColor="@color/colorSecondaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/primary_text"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/media_image" />

        <ImageView
            android:id="@+id/media_image"
            android:layout_width="120dp"
            android:layout_height="120dp"
            android:layout_marginEnd="16dp"
            android:layout_marginTop="16dp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:srcCompat="@android:color/darker_gray" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/media_image"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toBottomOf="parent" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_2"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="@+id/action_button_1"
            app:layout_constraintStart_toEndOf="@+id/action_button_1" />

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

**(j). `item_avatar_media16x9_supportingtext_actions.xml`**

> Our `item_avatar_media16x9_supportingtext_actions` layout.

This layout will represent our Actions Supportingtext Media16x9 Avatar Item's layout. Specify [`CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)
4. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/CardView.Light"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    tools:ignore="ContentDescription">

    <android.support.constraint.ConstraintLayout
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <ImageView
            android:id="@+id/avatar_image"
            android:layout_width="48dp"
            android:layout_height="48dp"
            android:layout_marginTop="12dp"
            android:layout_marginStart="12dp"
            android:padding="4dp"
            android:scaleType="centerCrop"
            app:srcCompat="@drawable/ic_avatar_40dp"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/media_image"
            app:layout_constraintVertical_chainStyle="packed" />

        <TextView
            android:id="@+id/title_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="4dp"
            android:layout_marginStart="12dp"
            android:layout_marginEnd="16dp"
            android:text="@string/title"
            android:textAppearance="@style/TextAppearance.AppCompat.Body2"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="@+id/avatar_image"
            app:layout_constraintStart_toEndOf="@+id/avatar_image"
            app:layout_constraintEnd_toEndOf="parent" />

        <TextView
            android:id="@+id/subtitle_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="12dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="4dp"
            android:text="@string/subhead"
            android:textAppearance="@style/TextAppearance.AppCompat.Body2"
            android:textColor="@color/colorSecondaryTextDefaultMaterialLight"
            app:layout_constraintStart_toEndOf="@+id/avatar_image"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toBottomOf="@+id/avatar_image" />

        <ImageView
            android:id="@+id/media_image"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginTop="12dp"
            android:scaleType="centerCrop"
            app:srcCompat="@android:color/darker_gray"
            app:layout_constraintDimensionRatio="H,16:9"
            app:layout_constraintTop_toBottomOf="@+id/avatar_image"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/supporting_text"/>

        <TextView
            android:id="@+id/supporting_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="16dp"
            android:lineSpacingExtra="8dp"
            android:text="@string/supporting"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/media_image"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/action_button_1"/>

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/supporting_text"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toBottomOf="parent"/>

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_2"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="@+id/action_button_1"
            app:layout_constraintStart_toEndOf="@+id/action_button_1" />

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

**(k). `item_avatar_media16x9_actions.xml`**

> Our `item_avatar_media16x9_actions` layout.

This layout will represent our Actions Media16x9 Avatar Item's layout. Specify [`CardView`](https://android.camposha.info/en/cardview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)
4. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    style="@style/CardView.Light"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    tools:ignore="ContentDescription">

    <android.support.constraint.ConstraintLayout
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <ImageView
            android:id="@+id/avatar_image"
            android:layout_width="48dp"
            android:layout_height="48dp"
            android:layout_marginTop="12dp"
            android:layout_marginStart="12dp"
            android:padding="4dp"
            android:scaleType="centerCrop"
            app:srcCompat="@drawable/ic_avatar_40dp"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/media_image"
            app:layout_constraintVertical_chainStyle="packed" />

        <TextView
            android:id="@+id/title_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="4dp"
            android:layout_marginStart="12dp"
            android:layout_marginEnd="16dp"
            android:text="@string/title"
            android:textAppearance="@style/TextAppearance.AppCompat.Body2"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toTopOf="@+id/avatar_image"
            app:layout_constraintStart_toEndOf="@+id/avatar_image"
            app:layout_constraintEnd_toEndOf="parent" />

        <TextView
            android:id="@+id/subtitle_text"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="12dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="4dp"
            android:text="@string/subhead"
            android:textAppearance="@style/TextAppearance.AppCompat.Body2"
            android:textColor="@color/colorSecondaryTextDefaultMaterialLight"
            app:layout_constraintStart_toEndOf="@+id/avatar_image"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toBottomOf="@+id/avatar_image" />

        <ImageView
            android:id="@+id/media_image"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginTop="12dp"
            android:scaleType="centerCrop"
            app:srcCompat="@android:color/darker_gray"
            app:layout_constraintDimensionRatio="H,16:9"
            app:layout_constraintTop_toBottomOf="@+id/avatar_image"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/action_button_1" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_1"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/media_image"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toTopOf="@+id/action_button_2" />

        <Button
            style="@style/Widget.AppCompat.Button.Borderless"
            android:id="@+id/action_button_2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:minWidth="0dp"
            android:paddingStart="8dp"
            android:paddingEnd="8dp"
            android:text="@string/action_2"
            android:textColor="@color/colorPrimaryTextDefaultMaterialLight"
            app:layout_constraintTop_toBottomOf="@+id/action_button_1"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintBottom_toBottomOf="parent"/>

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

**(m). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`android.support.v7.widget.RecyclerView`](https://android.camposha.info/en/recyclerview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):


```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.RecyclerView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/recycler_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.eugenebrusov.cards.MainActivity" />


```

#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `MainAdapter.kt`**

> Our `MainAdapter` class.

Create a Kotlin file named `MainAdapter.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ViewGroup` from the `android.view` package.
2. `ImageButton` from the `android.widget` package.
3. `Space` from the `android.widget` package.
4. `TextView` from the `android.widget` package.

Then extend the `RecyclerView.Adapter<MainAdapter.ViewHolder>` and add its contents as follows:

First override these callbacks: 

1. `onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder `.
2. `onBindViewHolder(holder: ViewHolder, position: Int) `.
3. `getItemCount(): Int `.
4. `getItemViewType(position: Int): Int `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.Space
import android.widget.TextView
import kotlinx.android.synthetic.main.item_media16x9_primarytext_subtext_actions_supportingtext.view.*

class MainAdapter : RecyclerView.Adapter<MainAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        when (viewType) {
            MEDIA16x9_SUPPORTINGTEXT_VIEW_TYPE -> {
                return ViewHolder(parent,
                        R.layout.item_media16x9_supportingtext)
            }
            AVATAR_MEDIA16x9_SUPPORTINGTEXT_ACTIONS_VIEW_TYPE -> {
                return ViewHolder(parent,
                        R.layout.item_avatar_media16x9_supportingtext_actions)
            }
            AVATAR_MEDIA16x9_ACTIONS_VIEW_TYPE -> {
                return ViewHolder(parent,
                        R.layout.item_avatar_media16x9_actions)
            }
            MEDIA16x9_PRIMARYTEXT_SUBTEXT_ACTIONS_SUPPORTINGTEXT_VIEW_TYPE -> {
                return ExpandableViewHolder(parent,
                        R.layout.item_media16x9_primarytext_subtext_actions_supportingtext)
            }
            PRIMARYTEXT_SUBTEXT_SUPPORTINGTEXT_ACTIONS_VIEW_TYPE -> {
                return ViewHolder(parent,
                        R.layout.item_primarytext_subtext_supportingtext_actions)
            }
            MEDIA16x9_ACTIONS_VIEW_TYPE -> {
                return ViewHolder(parent,
                        R.layout.item_media16x9_actions)
            }
            MEDIA1x1_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE -> {
                return ViewHolder(parent,
                        R.layout.item_media1x1_primarytext_subtext_actions)
            }
            MEDIA1X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE -> {
                return ViewHolder(parent,
                        R.layout.item_media1x_primarytext_subtext_actions)
            }
            MEDIA15X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE -> {
                return ViewHolder(parent,
                        R.layout.item_media15x_primarytext_subtext_actions)
            }
            MEDIA2X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE -> {
                return ViewHolder(parent,
                        R.layout.item_media2x_primarytext_subtext_actions)
            }
            MEDIA3X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE -> {
                return ViewHolder(parent,
                        R.layout.item_media3x_actions)
            }
            else -> throw IllegalArgumentException("Inappropriate viewType")
        }
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        /** empty implementation */
    }

    override fun getItemCount(): Int {
        return 11
    }

    override fun getItemViewType(position: Int): Int {
        return when (position) {
            0 -> MEDIA16x9_SUPPORTINGTEXT_VIEW_TYPE
            1 -> AVATAR_MEDIA16x9_SUPPORTINGTEXT_ACTIONS_VIEW_TYPE
            2 -> AVATAR_MEDIA16x9_ACTIONS_VIEW_TYPE
            3 -> MEDIA16x9_PRIMARYTEXT_SUBTEXT_ACTIONS_SUPPORTINGTEXT_VIEW_TYPE
            4 -> PRIMARYTEXT_SUBTEXT_SUPPORTINGTEXT_ACTIONS_VIEW_TYPE
            5 -> MEDIA16x9_ACTIONS_VIEW_TYPE
            6 -> MEDIA1x1_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE
            7 -> MEDIA1X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE
            8 -> MEDIA15X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE
            9 -> MEDIA2X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE
            10 -> MEDIA3X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE
            else -> -1
        }
    }

    companion object {
        const val MEDIA16x9_SUPPORTINGTEXT_VIEW_TYPE = 0
        const val AVATAR_MEDIA16x9_SUPPORTINGTEXT_ACTIONS_VIEW_TYPE = 1
        const val AVATAR_MEDIA16x9_ACTIONS_VIEW_TYPE = 2
        const val MEDIA16x9_PRIMARYTEXT_SUBTEXT_ACTIONS_SUPPORTINGTEXT_VIEW_TYPE = 3
        const val PRIMARYTEXT_SUBTEXT_SUPPORTINGTEXT_ACTIONS_VIEW_TYPE = 4
        const val MEDIA16x9_ACTIONS_VIEW_TYPE = 5
        const val MEDIA1x1_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE = 6
        const val MEDIA1X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE = 7
        const val MEDIA15X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE = 8
        const val MEDIA2X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE = 9
        const val MEDIA3X_PRIMARYTEXT_SUBTEXT_ACTIONS_VIEW_TYPE = 10
    }

    open class ViewHolder(parent: ViewGroup?, resId: Int)
        : RecyclerView.ViewHolder(LayoutInflater.from(parent?.context).inflate(resId, parent, false))

    class ExpandableViewHolder(parent: ViewGroup?, resId: Int) : ViewHolder(parent, resId) {
        private val supportingTextView: TextView = itemView.supporting_text
        private val expandButton: ImageButton = itemView.expand_button

        init {
            expandButton.setOnClickListener {
                if (supportingTextView.visibility == View.VISIBLE) {
                    expandButton.setImageResource(R.drawable.ic_expand_less_black_36dp)
                    supportingTextView.visibility = View.GONE
                } else {
                    expandButton.setImageResource(R.drawable.ic_expand_more_black_36dp)
                    supportingTextView.visibility = View.VISIBLE
                }
            }
        }

    }
}

```

**(b). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `AppCompatActivity` from the `android.support.v7.app` package.
2. `Bundle` from the `android.os` package.
3. `LinearLayoutManager` from the `android.support.v7.widget` package.
4. `recycler_view` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_main.recycler_view

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        recycler_view.setHasFixedSize(true)
        recycler_view.layoutManager = LinearLayoutManager(this)
        recycler_view.adapter = MainAdapter()
    }
}


```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/eugenebrusov/android-cards/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/eugenebrusov/android-cards).|
|3.|Follow code author [here](https://github.com/eugenebrusov).|

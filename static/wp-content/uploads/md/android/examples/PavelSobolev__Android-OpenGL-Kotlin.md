# Android OpenGL Kotlin

>  This mobile application (Android OS) provides graphical interactive 2D and 3D scenes which can be controlled by user touches, voice commands and data from accelerometer. Mentioned graphical scenes are formed by usage of OpenGL ES API..

The name of application is “K-OGL” (which stands for Kotlin-OpenGL ES). The aim of the application is to show a user set of 2D and 3D animated graphical scenes and to provide him with ability of controlling these scenes and interact with them by using standard graphical interface of Android operating system and built-in sensors of used mobile device. The application is created using native Android API and Kotlin programming language.

### User interface and graphical scenes

![Android-OpenGL-Kotlin Example Tutorial](https://github.com/PavelSobolev/KotOGL/raw/master/uiimg/01.jpeg)

![Android-OpenGL-Kotlin Example Tutorial](https://github.com/PavelSobolev/KotOGL/raw/master/uiimg/02.jpeg)

![Android-OpenGL-Kotlin Example Tutorial](https://github.com/PavelSobolev/KotOGL/raw/master/uiimg/03.jpeg)

![Android-OpenGL-Kotlin Example Tutorial](https://github.com/PavelSobolev/KotOGL/raw/master/uiimg/04.jpeg)

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure. We will need the following 4 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. Our `Appcompat-v7` library.
3. Our `Constraint-layout` library.
4. Our `Design` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "pavelsobolev.kotogl"
        minSdkVersion 22
        targetSdkVersion 28
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
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'com.android.support:appcompat-v7:28.0.0-rc01'
    implementation 'com.android.support.constraint:constraint-layout:1.1.2'
    implementation 'com.android.support:design:28.0.0-rc01'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'
}

```
#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="pavelsobolev.kotogl">

    <uses-feature
        android:glEsVersion="0x00020000"
        android:required="true" />


    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
            android:name=".Activities.MainScreenActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBar"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
                <category android:name="android.intent.category.VOICE" />
                <!--action android:name="com.google.android.gms.actions.SEARCH_ACTION" /-->
                <action android:name="android.intent.action.VOICE_COMMAND" />
            </intent-filter>
        </activity>
        <activity android:name=".Activities.DistanceActivity"></activity>
    </application>

</manifest>
```
#### Step 3. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). `content_main_screen.xml`**


> Our `content_main_screen` layout.

Design your XML layout using the following 1 UI widgets and ViewGroups:

1. `ConstraintLayout`

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/mainLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context=".Activities.MainScreenActivity"
    tools:showIn="@layout/activity_main_screen">

</android.support.constraint.ConstraintLayout>
```

**(b). `activity_distance.xml`**


> Our `activity_distance` layout.

Design this XML layout using the following 7 UI widgets and ViewGroups:

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ScrollView`](https://android.camposha.info/en/scrollview)
3. [`LinearLayout`](https://android.camposha.info/en/linearlayout)
4. [`TextView`](https://android.camposha.info/en/textview)
5. `View`
6. [`SeekBar`](https://android.camposha.info/en/seekbar)
7. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Activities.DistanceActivity">

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <TextView
                android:id="@+id/textView"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginBottom="10dp"
                android:layout_marginTop="10dp"
                android:paddingBottom="5dp"
                android:paddingTop="5dp"
                android:text="@string/pos_header"
                android:textAlignment="center"
                android:textSize="25sp"
                android:textStyle="bold" />

            <View
                android:id="@+id/divider2"
                android:layout_width="match_parent"
                android:layout_height="1dp"
                android:background="?android:attr/listDivider" />

            <TextView
                android:id="@+id/textViewCenter"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="5dp"
                android:text="@string/center_pos_txt"
                android:textAlignment="center"
                android:textSize="18sp" />

            <SeekBar
                android:id="@+id/seekBarCentral"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginEnd="5dp"
                android:max="7" />

            <TextView
                android:id="@+id/textViewLeft"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="5dp"
                android:text="@string/left_pos_txt"
                android:textAlignment="center"
                android:textSize="18sp" />

            <SeekBar
                android:id="@+id/seekBarLeft"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginEnd="5dp"
                android:max="7" />

            <TextView
                android:id="@+id/textViewRight"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="5dp"
                android:text="@string/right_pos_txt"
                android:textAlignment="center"
                android:textSize="18sp" />

            <SeekBar
                android:id="@+id/seekBarRight"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginEnd="5dp"
                android:max="7" />

            <TextView
                android:id="@+id/textViewTop"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="5dp"
                android:text="@string/top_pos_txt"
                android:textAlignment="center"
                android:textSize="18sp" />

            <SeekBar
                android:id="@+id/seekBarTop"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginEnd="5dp"
                android:max="7" />

            <TextView
                android:id="@+id/textViewBottom"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="5dp"
                android:text="@string/bottom_pos_txt"
                android:textAlignment="center"
                android:textSize="18sp" />

            <SeekBar
                android:id="@+id/seekBarBottom"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginEnd="5dp"
                android:max="7" />

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:orientation="horizontal">

                <Button
                    android:id="@+id/buttonOk"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_weight="1"
                    android:text="@string/btn_ok" />

                <Button
                    android:id="@+id/buttonCancel"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_weight="1"
                    android:text="@string/btn_cancel" />
            </LinearLayout>

        </LinearLayout>
    </ScrollView>


</android.support.constraint.ConstraintLayout>
```

**(c). `activity_main_screen.xml`**


> Our `activity_main_screen` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main_screen.xml`.

Design your XML layout using the following 5 UI widgets and ViewGroups:

1. [`CoordinatorLayout`](https://android.camposha.info/en/coordinatorlayout)
2. [`AppBarLayout`](https://android.camposha.info/en/appbarlayout)
3. [`Toolbar`](https://android.camposha.info/en/toolbar)
4. [`FloatingActionButton`](https://android.camposha.info/en/floatingactionbutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Activities.MainScreenActivity">

    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main_screen" />

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_margin="@dimen/fab_margin"
        app:srcCompat="@android:drawable/ic_btn_speak_now" />

</android.support.design.widget.CoordinatorLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `Triangle.kt`**

> Our `Triangle` class.

Create a Kotlin file named `Triangle.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `GLES20` from the `android.opengl` package.

We will be creating the following methods:


**(a). Our `loopColor()` function**

Write the `loopColor()` function as follows:

```kotlin
    fun loopColor() //change color of each vertex cyclically
    {
        for (k in 0..11)
        {
            if (mColorUp[k])
            {
                if (mColors[k] <= 1.1)
                    mColors[k] += mColorIncrement[k]
                else
                    mColorUp[k] = false
            }
            else
            {
                if (mColors[k] >= 0.01)
                    mColors[k] -= mColorIncrement[k]
                else
                    mColorUp[k] = true
            }
        }
    }
```

**(b). Our `draw()` function**

Write the `draw()` function as follows:

```kotlin
    fun draw(mvpMatrix: FloatArray, x: Float, y: Float, z: Float)
    {

        mTriangle1VertData = floatArrayOf(
                x, y + 0.08f, z,
                mColors[0], mColors[1], mColors[2], mColors[3],
                x - 0.08f, y - 0.08f, z,
                mColors[4], mColors[5], mColors[6], mColors[7],
                x + 0.08f, y - 0.08f, z,
                mColors[8], mColors[9], mColors[10], mColors[11])

        val bb = ByteBuffer.allocateDirect(mTriangle1VertData.size * mFloatSizeInBytes)
        bb.order(ByteOrder.nativeOrder())
        mVertexBuffer = bb.asFloatBuffer()
        mVertexBuffer!!.put(mTriangle1VertData)
        mVertexBuffer!!.position(0)

        GLES20.glUseProgram(mShaderProgram)

        loopColor() //change color cyclically


        mPositionHandle = GLES20.glGetAttribLocation(mShaderProgram, "a_Position")

        // triangle coordinate data
        mVertexBuffer!!.position(0)
        GLES20.glVertexAttribPointer(mPositionHandle, mPositionDataSize,
                GLES20.GL_FLOAT, false,
                vertexStride, mVertexBuffer)

        GLES20.glEnableVertexAttribArray(mPositionHandle)


        // Set mColors for drawing the triangle

        mColorHandle = GLES20.glGetAttribLocation(mShaderProgram, "a_Color")
        mVertexBuffer!!.position(mColorOffset)
        GLES20.glVertexAttribPointer(mColorHandle, mColorDataSize, GLES20.GL_FLOAT, false,
                vertexStride, mVertexBuffer)
        GLES20.glEnableVertexAttribArray(mColorHandle)

        mMVPMatrixHandle = GLES20.glGetUniformLocation(mShaderProgram, "uMVPMatrix")
        GLES20.glUniformMatrix4fv(mMVPMatrixHandle, 1, false, mvpMatrix, 0)

        // Draw the triangle
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES, 0, vertexCount)


        // Disable vertex array
        GLES20.glDisableVertexAttribArray(mPositionHandle)

    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.opengl.GLES20
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.FloatBuffer

// represent the triangle which has different color for aech vertex with using of interpolation
// color of each vertex is changing cyclically during the process of rendering
class Triangle
{

    private val COORDS_PER_VERTEX = 7
    private val mFloatSizeInBytes = 4

    private var mVertexBuffer: FloatBuffer? = null

    private var mTriangle1VertData = floatArrayOf(
            // X, Y, Z,
            // R, G, B, A
            -0.5f, -0.25f, 0.0f, // 0  1  2
            1.0f, 0.0f, 0.0f, 1.0f, // 3  4  5  6

            0.5f, -0.25f, 0.0f, // 7 8 9
            0.0f, 1.0f, 0.0f, 1.0f, // 10  11 12 13

            0.0f, 0.559016994f, 0.0f, // 14 15 16
            0.0f, 0.0f, 1.0f, 1.0f  // 17  18  19  20
    )

    private val mColors = floatArrayOf(
            1.0f, 0.0f, 0.0f, 1.0f,
            0.0f, 1.0f, 0.0f, 1.0f,
            0.0f, 0.0f, 1.0f, 1.0f)

    private val mColorIncrement = floatArrayOf(
            0.05f, 0.001f, 0.025f, 0.001f,
            0.02f, 0.02f, 0.025f, 0.001f,
            0.01f, 0.005f, 0.025f, 0.001f,
            0.04f, 0.005f, 0.025f, 0.001f)

    private val mColorUp = booleanArrayOf(
            false, true, true,
            true, true, false,
            true, true, true,
            true, false, true)

    private val mColorOffset = 3

    //
    private val mPositionDataSize = 3

    /** Size of the color data in elements.  */
    private val mColorDataSize = 4
    //internal var color = floatArrayOf(1.0f, 1.0f, 0.0f, 1.0f)

    private val mVrtxShaderCode = "uniform mat4 uMVPMatrix;" +
            "attribute vec4 a_Position;" +
            "attribute vec4 a_Color;" +
            "varying vec4 v_Color;" +
            "void main() {" +
            "  v_Color = a_Color;" +
            "  gl_Position = uMVPMatrix * a_Position;" +
            "}"
    private val mFrgmntShaderCode = "precision mediump float;" +
            "varying vec4 v_Color;" +
            "void main() {" +
            "  gl_FragColor = v_Color;" +
            "}"

    private val mShaderProgram: Int

    private var mPositionHandle: Int = 0
    private var mColorHandle: Int = 0
    private var mMVPMatrixHandle: Int = 0

    private val vertexCount = mTriangle1VertData.size / COORDS_PER_VERTEX
    private val vertexStride = COORDS_PER_VERTEX * 4 // 4 bytes per vertex

    init  // constructor
    {
        val vertexShader = MyGLRenderer.loadShader(GLES20.GL_VERTEX_SHADER,
                mVrtxShaderCode)
        val fragmentShader = MyGLRenderer.loadShader(GLES20.GL_FRAGMENT_SHADER,
                mFrgmntShaderCode)

        mShaderProgram = GLES20.glCreateProgram()
        GLES20.glAttachShader(mShaderProgram, vertexShader)
        GLES20.glAttachShader(mShaderProgram, fragmentShader)
        GLES20.glBindAttribLocation(mShaderProgram, 0, "a_Position")
        GLES20.glBindAttribLocation(mShaderProgram, 1, "a_Color")
        GLES20.glLinkProgram(mShaderProgram)
    }

    fun draw(mvpMatrix: FloatArray, x: Float, y: Float, z: Float)
    {

        mTriangle1VertData = floatArrayOf(
                x, y + 0.08f, z,
                mColors[0], mColors[1], mColors[2], mColors[3],
                x - 0.08f, y - 0.08f, z,
                mColors[4], mColors[5], mColors[6], mColors[7],
                x + 0.08f, y - 0.08f, z,
                mColors[8], mColors[9], mColors[10], mColors[11])

        val bb = ByteBuffer.allocateDirect(mTriangle1VertData.size * mFloatSizeInBytes)
        bb.order(ByteOrder.nativeOrder())
        mVertexBuffer = bb.asFloatBuffer()
        mVertexBuffer!!.put(mTriangle1VertData)
        mVertexBuffer!!.position(0)

        GLES20.glUseProgram(mShaderProgram)

        loopColor() //change color cyclically


        mPositionHandle = GLES20.glGetAttribLocation(mShaderProgram, "a_Position")

        // triangle coordinate data
        mVertexBuffer!!.position(0)
        GLES20.glVertexAttribPointer(mPositionHandle, mPositionDataSize,
                GLES20.GL_FLOAT, false,
                vertexStride, mVertexBuffer)

        GLES20.glEnableVertexAttribArray(mPositionHandle)


        // Set mColors for drawing the triangle

        mColorHandle = GLES20.glGetAttribLocation(mShaderProgram, "a_Color")
        mVertexBuffer!!.position(mColorOffset)
        GLES20.glVertexAttribPointer(mColorHandle, mColorDataSize, GLES20.GL_FLOAT, false,
                vertexStride, mVertexBuffer)
        GLES20.glEnableVertexAttribArray(mColorHandle)

        mMVPMatrixHandle = GLES20.glGetUniformLocation(mShaderProgram, "uMVPMatrix")
        GLES20.glUniformMatrix4fv(mMVPMatrixHandle, 1, false, mvpMatrix, 0)

        // Draw the triangle
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES, 0, vertexCount)


        // Disable vertex array
        GLES20.glDisableVertexAttribArray(mPositionHandle)

    }

    fun loopColor() //change color of each vertex cyclically
    {
        for (k in 0..11)
        {
            if (mColorUp[k])
            {
                if (mColors[k] <= 1.1)
                    mColors[k] += mColorIncrement[k]
                else
                    mColorUp[k] = false
            }
            else
            {
                if (mColors[k] >= 0.01)
                    mColors[k] -= mColorIncrement[k]
                else
                    mColorUp[k] = true
            }
        }
    }
}

```

**(b). `Square.kt`**

> Our `Square` class.

Create a Kotlin file named `Square.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `GLES20` from the `android.opengl` package.

We will be creating the following methods:


**(a). Our `loopColor()` function**

Write the `loopColor()` function as follows:

```kotlin
    fun loopColor()
    {
        for (i in mGlobalColor.indices)
        {
            if (mColorUp[i]) {
                if (mGlobalColor[i] <= 1.1)
                    mGlobalColor[i] += mColorIncrement[i]
                else
                    mColorUp[i] = false
            }
            else
            {
                if (mGlobalColor[i] >= 0.01)
                    mGlobalColor[i] = mGlobalColor[i] - mColorIncrement[i]
                else
                    mColorUp[i] = true
            }
        }
    }
```

**(b). Our `draw()` function**

Write the `draw()` function as follows:

```kotlin
    fun draw(mvpMtrx: FloatArray, x: Float, y: Float, z: Float) 
    {
        squareCoords = floatArrayOf(
                x - 0.05f, y + 0.05f, z,
                x - 0.05f, y - 0.05f, z,
                x + 0.05f, y - 0.05f, z,
                x + 0.05f, y + 0.05f, z)

        val bb = ByteBuffer.allocateDirect(squareCoords.size * 4)
        bb.order(ByteOrder.nativeOrder())
        mVrtxBuffer = bb.asFloatBuffer()
        mVrtxBuffer!!.put(squareCoords)
        mVrtxBuffer!!.position(0)

        GLES20.glUseProgram(mShaderProgram)

        mPstnHandle = GLES20.glGetAttribLocation(mShaderProgram, "vPosition")
        GLES20.glEnableVertexAttribArray(mPstnHandle)

        GLES20.glEnableVertexAttribArray(mPstnHandle)
        GLES20.glVertexAttribPointer(mPstnHandle, CRDS_IN_VERTEX,
                GLES20.GL_FLOAT, false, mVrtxStride, mVrtxBuffer)

        mClrHadle = GLES20.glGetUniformLocation(mShaderProgram, "vColor")
        loopColor()
        GLES20.glUniform4fv(mClrHadle, 1, mGlobalColor, 0)

        mMVPMtrxHandle = GLES20.glGetUniformLocation(mShaderProgram, "uMVPMatrix")
        GLES20.glUniformMatrix4fv(mMVPMtrxHandle, 1, false, mvpMtrx, 0)

        GLES20.glDrawArrays(GLES20.GL_TRIANGLE_FAN, 0, mVrtxCount)
        GLES20.glDisableVertexAttribArray(mPstnHandle)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.opengl.GLES20
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.FloatBuffer
import java.nio.ShortBuffer

class Square 
{
    internal val CRDS_IN_VERTEX = 3
    internal var squareCoords = floatArrayOf(-0.15f, 0.15f, 0.15f, // top left
            -0.15f, -0.15f, 0.15f, // bottom left
            0.15f, -0.15f, 0.15f, // bottom right
            0.15f, 0.15f, 0.15f) // top right

    private var mVrtxBuffer: FloatBuffer? = null
    private val mDrawListBuffer: ShortBuffer

    private val mOrderOfDraw = shortArrayOf(0, 1, 2, 0, 2, 3)
    private val mGlobalColor = floatArrayOf(1.0f, 0.0f, 0.0f, 0.0f)
    private val mColorIncrement = floatArrayOf(0.05f, 0.001f, 0.025f, 0.001f)
    private val mColorUp = booleanArrayOf(false, true, true, true)

    private val mVrtxShaderCode = "uniform mat4 uMVPMatrix;" +
            "attribute vec4 vPosition;" +
            "void main() {" +
            "   gl_Position = uMVPMatrix * vPosition;" +
            "}"
    private val mFrgmntShaderCode = "precision mediump float;" +
            "uniform vec4 vColor;" +
            "void main() {" +
            "   gl_FragColor = vColor;" +
            "}"

    private val mShaderProgram: Int

    private var mPstnHandle: Int = 0
    private var mClrHadle: Int = 0
    private var mMVPMtrxHandle: Int = 0

    private val mVrtxCount = squareCoords.size / CRDS_IN_VERTEX
    private val mVrtxStride = CRDS_IN_VERTEX * 4

    init 
    {
        val dlb = ByteBuffer.allocateDirect(mOrderOfDraw.size * 2)
        dlb.order(ByteOrder.nativeOrder())
        mDrawListBuffer = dlb.asShortBuffer()
        mDrawListBuffer.put(mOrderOfDraw)
        mDrawListBuffer.position(0)

        val vrtxShader = MyGLRenderer.loadShader(GLES20.GL_VERTEX_SHADER,
                mVrtxShaderCode)
        val frgmntShader = MyGLRenderer.loadShader(GLES20.GL_FRAGMENT_SHADER,
                mFrgmntShaderCode)

        mShaderProgram = GLES20.glCreateProgram()
        GLES20.glAttachShader(mShaderProgram, vrtxShader)
        GLES20.glAttachShader(mShaderProgram, frgmntShader)
        GLES20.glLinkProgram(mShaderProgram)
    }

    fun draw(mvpMtrx: FloatArray, x: Float, y: Float, z: Float) 
    {
        squareCoords = floatArrayOf(
                x - 0.05f, y + 0.05f, z,
                x - 0.05f, y - 0.05f, z,
                x + 0.05f, y - 0.05f, z,
                x + 0.05f, y + 0.05f, z)

        val bb = ByteBuffer.allocateDirect(squareCoords.size * 4)
        bb.order(ByteOrder.nativeOrder())
        mVrtxBuffer = bb.asFloatBuffer()
        mVrtxBuffer!!.put(squareCoords)
        mVrtxBuffer!!.position(0)

        GLES20.glUseProgram(mShaderProgram)

        mPstnHandle = GLES20.glGetAttribLocation(mShaderProgram, "vPosition")
        GLES20.glEnableVertexAttribArray(mPstnHandle)

        GLES20.glEnableVertexAttribArray(mPstnHandle)
        GLES20.glVertexAttribPointer(mPstnHandle, CRDS_IN_VERTEX,
                GLES20.GL_FLOAT, false, mVrtxStride, mVrtxBuffer)

        mClrHadle = GLES20.glGetUniformLocation(mShaderProgram, "vColor")
        loopColor()
        GLES20.glUniform4fv(mClrHadle, 1, mGlobalColor, 0)

        mMVPMtrxHandle = GLES20.glGetUniformLocation(mShaderProgram, "uMVPMatrix")
        GLES20.glUniformMatrix4fv(mMVPMtrxHandle, 1, false, mvpMtrx, 0)

        GLES20.glDrawArrays(GLES20.GL_TRIANGLE_FAN, 0, mVrtxCount)
        GLES20.glDisableVertexAttribArray(mPstnHandle)
    }

    fun loopColor()
    {
        for (i in mGlobalColor.indices)
        {
            if (mColorUp[i]) {
                if (mGlobalColor[i] <= 1.1)
                    mGlobalColor[i] += mColorIncrement[i]
                else
                    mColorUp[i] = false
            }
            else
            {
                if (mGlobalColor[i] >= 0.01)
                    mGlobalColor[i] = mGlobalColor[i] - mColorIncrement[i]
                else
                    mColorUp[i] = true
            }
        }
    }
}


```

**(c). `Spiral.kt`**

> Our `Spiral` class.

Create a Kotlin file named `Spiral.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `GLES20` from the `android.opengl` package.

We will be creating the following methods:

1. `getSpiralVirtices(): FloatArray `.

**(a). Our `getSpiralVirtices()` function**

Write the `getSpiralVirtices()` function as follows:

```kotlin
    fun getSpiralVirtices(): FloatArray {
        return mSpiralVirtices
    }
```

**(b). Our `draw()` function**

Write the `draw()` function as follows:

```kotlin
    fun draw(mvpMatrix: FloatArray)
    {
        GLES20.glUseProgram(mSdrProgram)

        mPstnHandle = GLES20.glGetAttribLocation(mSdrProgram, "a_Position")

        mVrtxBffr.position(0)
        GLES20.glVertexAttribPointer(mPstnHandle, mPstnDataSize,
                GLES20.GL_FLOAT, false,
                mVrtxStride, mVrtxBffr)
        GLES20.glEnableVertexAttribArray(mPstnHandle)


        mClrHandle = GLES20.glGetAttribLocation(mSdrProgram, "a_Color")
        mVrtxBffr.position(mClrOffset)
        GLES20.glVertexAttribPointer(mClrHandle, mClrDataSize, GLES20.GL_FLOAT, false,
                mVrtxStride, mVrtxBffr)
        GLES20.glEnableVertexAttribArray(mClrHandle)

        mMVPMtrxHandle = GLES20.glGetUniformLocation(mSdrProgram, "uMVPMatrix")
        GLES20.glUniformMatrix4fv(mMVPMtrxHandle, 1, false, mvpMatrix, 0)

        GLES20.glDrawArrays(GLES20.GL_LINE_STRIP, 0, mVrtxCount)

        GLES20.glDisableVertexAttribArray(mPstnHandle)

    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.opengl.GLES20
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.FloatBuffer

class Spiral
{
    internal val COORDS_IN_VERTEX = 7
    
    private val mVrtxBffr: FloatBuffer
    private val mFloatSize = 4
    private val mCntPoint = 360 * 6

    val mSpiralVirtices = FloatArray(mCntPoint * COORDS_IN_VERTEX)

    private var mIncrementalRadius = 0.0f
    private var mSpiralSpan = 0.0003f

    private var mUp = true

    private val mClrOffset = 3

    /** Size of the position data in elements.  */
    private val mPstnDataSize = 3

    /** Size of the color data in elements.  */
    private val mClrDataSize = 4

    private val mVrtxShaderCode = "uniform mat4 uMVPMatrix;" +
            "attribute vec4 a_Position;" +
            "attribute vec4 a_Color;" +
            "varying vec4 v_Color;" +
            "void main() {" +
            "  v_Color = a_Color;" +
            "  gl_Position = uMVPMatrix * a_Position;" +
            "}"
    private val mFrgmntShaderCode = "precision mediump float;" +
            "varying vec4 v_Color;" +
            "void main() {" +
            "  gl_FragColor = v_Color;" +
            "}"

    private val mSdrProgram: Int

    private var mPstnHandle: Int = 0
    private var mClrHandle: Int = 0
    private var mMVPMtrxHandle: Int = 0

    private val mVrtxCount = mSpiralVirtices.size / COORDS_IN_VERTEX
    private val mVrtxStride = COORDS_IN_VERTEX * 4 // 4 bytes per vertex

    init // constructor
    {
        GLES20.glLineWidth(3.0f)
        mIncrementalRadius = 0.0f
        mSpiralSpan = 0.00042f

        var angl = 0.0f   //helper vars
        var color = 0.0f
        var i = 0


        // circle for constructing of spiral
        while (i < mCntPoint * COORDS_IN_VERTEX)
        {
            // position
            mSpiralVirtices[i] = mIncrementalRadius * Math.sin(angl.toDouble()).toFloat()
            mSpiralVirtices[i + 1] = mIncrementalRadius * Math.cos(angl.toDouble()).toFloat()
            mSpiralVirtices[i + 2] = 0.0f
            // color
            mSpiralVirtices[i + 3] = color
            mSpiralVirtices[i + 4] = Math.cos(color.toDouble()).toFloat()
            mSpiralVirtices[i + 5] = Math.sin(color.toDouble()).toFloat()
            mSpiralVirtices[i + 6] = 1.0f
            angl += (Math.PI / 180.0).toFloat()
            mIncrementalRadius += mSpiralSpan

            if (mUp)
                color += 0.1f
            else
                color -= 0.1f

            if (color == 1f)
                mUp = false
            if (color == 0f)
                mUp = true
            i += COORDS_IN_VERTEX

        }

        // construction of buffer
        val bb = ByteBuffer.allocateDirect(mSpiralVirtices.size * mFloatSize)
        bb.order(ByteOrder.nativeOrder())
        mVrtxBffr = bb.asFloatBuffer()
        mVrtxBffr.put(mSpiralVirtices)
        mVrtxBffr.position(0)

        val vertexShader = MyGLRenderer.loadShader(GLES20.GL_VERTEX_SHADER,
                mVrtxShaderCode)
        val fragmentShader = MyGLRenderer.loadShader(GLES20.GL_FRAGMENT_SHADER,
                mFrgmntShaderCode)

        mSdrProgram = GLES20.glCreateProgram()
        GLES20.glAttachShader(mSdrProgram, vertexShader)
        GLES20.glAttachShader(mSdrProgram, fragmentShader)
        GLES20.glBindAttribLocation(mSdrProgram, 0, "a_Position")
        GLES20.glBindAttribLocation(mSdrProgram, 1, "a_Color")
        GLES20.glLinkProgram(mSdrProgram)
    }

    fun getSpiralVirtices(): FloatArray {
        return mSpiralVirtices
    }

    fun draw(mvpMatrix: FloatArray)
    {
        GLES20.glUseProgram(mSdrProgram)

        mPstnHandle = GLES20.glGetAttribLocation(mSdrProgram, "a_Position")

        mVrtxBffr.position(0)
        GLES20.glVertexAttribPointer(mPstnHandle, mPstnDataSize,
                GLES20.GL_FLOAT, false,
                mVrtxStride, mVrtxBffr)
        GLES20.glEnableVertexAttribArray(mPstnHandle)


        mClrHandle = GLES20.glGetAttribLocation(mSdrProgram, "a_Color")
        mVrtxBffr.position(mClrOffset)
        GLES20.glVertexAttribPointer(mClrHandle, mClrDataSize, GLES20.GL_FLOAT, false,
                mVrtxStride, mVrtxBffr)
        GLES20.glEnableVertexAttribArray(mClrHandle)

        mMVPMtrxHandle = GLES20.glGetUniformLocation(mSdrProgram, "uMVPMatrix")
        GLES20.glUniformMatrix4fv(mMVPMtrxHandle, 1, false, mvpMatrix, 0)

        GLES20.glDrawArrays(GLES20.GL_LINE_STRIP, 0, mVrtxCount)

        GLES20.glDisableVertexAttribArray(mPstnHandle)

    }
}


```

**(d). `MyGLSurfaceView.kt`**

> Our `MyGLSurfaceView` class.

Create a Kotlin file named `MyGLSurfaceView.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `GLSurfaceView` from the `android.opengl` package.
3. `MotionEvent` from the `android.view` package.

Next create a class that derives from `GLSurfaceView(context),` and add its contents as follows:

We will be overriding the following functions: 


We will be creating the following methods:


**(a). Our `sendVoiceCommandData()` function**

Write the `sendVoiceCommandData()` function as follows:

```kotlin
    fun sendVoiceCommandData(voiceCommand: String)
    {
        var squareWords = arrayListOf<String>("square", "four", "for")
        if (squareWords.contains(voiceCommand))
        {
            myGLRenderer.CurrentSquareDirection = !myGLRenderer.CurrentSquareDirection
            return
        }


        var triangleWords = arrayListOf<String>("triangle", "three", "tree", "free")
        if (triangleWords.contains(voiceCommand))
        {
            myGLRenderer.CurrentTriangleDirection = !myGLRenderer.CurrentTriangleDirection
            return
        }

        requestRender()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name


import android.content.Context
import android.opengl.GLSurfaceView
import android.view.MotionEvent
import pavelsobolev.kotogl.Helpers.TiltData
import pavelsobolev.kotogl.Helpers.TiltDirections
import java.util.*

// view for rendering the 2D scene - for embedding into the activity
class MyGLSurfaceView(context: Context) : GLSurfaceView(context), Observer
{
    private val myGLRenderer: MyGLRenderer
    private val TOUCH_SCALE_RATIO = 180.0f / 400
    private var mPrevX: Float = 0.toFloat()
    private var mPrevY: Float = 0.toFloat()

    init
    {
        setEGLContextClientVersion(2)
        myGLRenderer = MyGLRenderer()
        setRenderer(myGLRenderer)
    }

    override fun onTouchEvent(motiEvent: MotionEvent): Boolean
    {
        val posx = motiEvent.x
        val posy = motiEvent.y

        when (motiEvent.action)
        {
            MotionEvent.ACTION_MOVE ->
            {
                var deltaX = posx - mPrevX
                var deltaY = posy - mPrevY

                if (posy > height / 2)
                {
                    deltaX = -deltaX
                }

                if (x < width / 2)
                {
                    deltaY = -deltaY
                }

                myGLRenderer.Angle = (myGLRenderer.Angle + (deltaX + deltaY) * TOUCH_SCALE_RATIO)
                requestRender()
            }
        }
        mPrevX = posx
        mPrevY = posy
        return true
    }


    // when information in TiltData global object is changed this object will get notification and
    // will force the scene renderer to redraw the picture
    override fun update(observableObject: Observable?, observableData: Any?)
    {
        when (TiltData.getDirection())
        {
            TiltDirections.UP -> myGLRenderer.CurrentSquareDirection = true
            TiltDirections.DOWN -> myGLRenderer.CurrentSquareDirection = false
            TiltDirections.LEFT -> myGLRenderer.CurrentTriangleDirection = true
            TiltDirections.RIGHT -> myGLRenderer.CurrentTriangleDirection = false
        }
        requestRender()
    }

    fun sendVoiceCommandData(voiceCommand: String)
    {
        var squareWords = arrayListOf<String>("square", "four", "for")
        if (squareWords.contains(voiceCommand))
        {
            myGLRenderer.CurrentSquareDirection = !myGLRenderer.CurrentSquareDirection
            return
        }


        var triangleWords = arrayListOf<String>("triangle", "three", "tree", "free")
        if (triangleWords.contains(voiceCommand))
        {
            myGLRenderer.CurrentTriangleDirection = !myGLRenderer.CurrentTriangleDirection
            return
        }

        requestRender()
    }
}


```

**(e). `MyGLRenderer.kt`**

> Our `MyGLRenderer` class.

Create a Kotlin file named `MyGLRenderer.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `GLES20` from the `android.opengl` package.
2. `GLSurfaceView` from the `android.opengl` package.
3. `Matrix` from the `android.opengl` package.
4. `SystemClock` from the `android.os` package.

Next create a class that derives from `GLSurfaceView.Renderer` and add its contents as follows:

We will be overriding the following functions: 


We will be creating the following methods:


**(a). Our `loadShader()` function**

Write the `loadShader()` function as follows:

```kotlin
        fun loadShader(type: Int, shaderCode: String): Int 
        {
            val shader = GLES20.glCreateShader(type)
            GLES20.glShaderSource(shader, shaderCode)
            GLES20.glCompileShader(shader)
            return shader
        }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.opengl.GLES20
import android.opengl.GLSurfaceView
import android.opengl.Matrix
import android.os.SystemClock
import javax.microedition.khronos.opengles.GL10

// 2D renderer - shows the spiral, the square and the triangle
//    using OpenGL
class MyGLRenderer : GLSurfaceView.Renderer 
{
    internal var mW = 0
    internal var mH = 0

    var mIsHandleMode: Boolean = false

    //@Volatile
    var mAngle: Float = 0.toFloat()
    private var mRotatDir: Float = 0.toFloat()

    private var mTriangle: Triangle? = null
    private var mSquare: Square? = null
    private var mSpiral: Spiral? = null

    private var mCrrntPointSquare = 0
    private var mCrrntPointSquareUp = true

    private var mCrrntPointTri = 0
    private var mCrrntPointTriUp = true

    private val mMtrxMVP = FloatArray(16) // model-view-projection matrix
    private val mMtrxProjection = FloatArray(16)
    private val mMtrxView = FloatArray(16)
    private val mMtrxRotation = FloatArray(16)
    //private val mTranslationMatrix = FloatArray(16)
    
    override fun onSurfaceCreated(gl10: GL10, eglConfig: javax.microedition.khronos.egl.EGLConfig) 
    {
        mAngle = 0.0f
        mRotatDir = 1f
        GLES20.glClearColor(0.7f, 0.7f, 0.7f, 1.0f)
        mTriangle = Triangle()
        mSquare = Square()
        mSpiral = Spiral()
        mCrrntPointSquare = 0
        mCrrntPointSquareUp = true

        mCrrntPointTri = mSpiral!!.getSpiralVirtices().size - 7
        mCrrntPointSquareUp = false
    }

    var Angle : Float
        get() = mAngle
        set(newVal)
        {
            mAngle = newVal
        }

    override fun onDrawFrame(unused: GL10) 
    {
        val localMtrx = FloatArray(16)
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT)

        if (!mIsHandleMode)
        {
            val time = SystemClock.uptimeMillis() % 40000L
            mAngle = 0.009f * time.toInt()
        }

        val eyeX = 0.0f
        val eyeY = 0.0f
        val eyeZ = 1.5f

        val lookX = 0.0f
        val lookY = 0.0f
        val lookZ = 0.0f

        val upX = 0.0f
        val upY = 1.0f
        val upZ = 0.0f

        Matrix.setLookAtM(mMtrxView, 0, eyeX, eyeY, eyeZ, lookX, lookY, lookZ, upX, upY, upZ)
        Matrix.multiplyMM(mMtrxMVP, 0, mMtrxProjection, 0, mMtrxView, 0)

        Matrix.setIdentityM(localMtrx, 0)
        Matrix.setRotateM(mMtrxRotation, 0, mRotatDir * mAngle, 0.0f, 0.0f, 1.0f)
        Matrix.multiplyMM(localMtrx, 0, mMtrxMVP, 0, mMtrxRotation, 0)

        mSpiral!!.draw(localMtrx)

        mSquare!!.draw(localMtrx,
                mSpiral!!.getSpiralVirtices()[mCrrntPointSquare],
                mSpiral!!.getSpiralVirtices()[mCrrntPointSquare + 1],
                mSpiral!!.getSpiralVirtices()[mCrrntPointSquare + 2])

        if (mCrrntPointSquareUp)
        {
            if (mCrrntPointSquare < mSpiral!!.getSpiralVirtices().size - 7)
                mCrrntPointSquare += 7
            else
            {
                mCrrntPointSquareUp = false
            }
        }
        else
        {
            if (mCrrntPointSquare > 0)
            {
                mCrrntPointSquare -= 7
            }
            else
            {
                mCrrntPointSquareUp = true
            }
        }

        mTriangle!!.draw(localMtrx,
                mSpiral!!.getSpiralVirtices()[mCrrntPointTri],
                mSpiral!!.getSpiralVirtices()[mCrrntPointTri + 1],
                mSpiral!!.getSpiralVirtices()[mCrrntPointTri + 2])

        if (mCrrntPointTriUp)
        {
            if (mCrrntPointTri < mSpiral!!.getSpiralVirtices().size - 7)
                mCrrntPointTri += 7
            else
                mCrrntPointTriUp = false
        }
        else
        {
            if (mCrrntPointTri > 0)
                mCrrntPointTri -= 7
            else
                mCrrntPointTriUp = true
        }
    }


    var CurrentSquareDirection : Boolean
        get() = mCrrntPointSquareUp
        set(newDirect)
        {
            mCrrntPointSquareUp = newDirect
        }

    var CurrentTriangleDirection : Boolean
        get() = mCrrntPointTriUp
        set(newDirect)
        {
            mCrrntPointTriUp = newDirect
        }

    override fun onSurfaceChanged(gl: GL10, width: Int, height: Int) 
    {
        GLES20.glViewport(0, 0, width, height)
        val ratio = width.toFloat() / height
        //Matrix.perspectiveM(mMtrxProjection,);
        val left = -ratio
        val bottom = -1.0f
        val top = 1.0f
        val near = 1.0f
        val far = 10.0f
        Matrix.frustumM(mMtrxProjection, 0, left, ratio, bottom, top, near, far)

    }

    companion object
    {
        fun loadShader(type: Int, shaderCode: String): Int 
        {
            val shader = GLES20.glCreateShader(type)
            GLES20.glShaderSource(shader, shaderCode)
            GLES20.glCompileShader(shader)
            return shader
        }
    }
}


```

**(f). `VertexSource.kt`**

> Our `VertexSource` class.

Create a Kotlin file named `VertexSource.kt`.


Here is the full code:

```kotlin
package replace_with_your_package_name

object VertexSource
{
    // constants for colours and coordinates
    private val one : Float = 1.0f
    private val zero : Float = 0.0f
    private val z8 : Float = 0.7f
    private val z7 : Float = 0.8f

    // X, Y, Z of hexahedron vertices
    private val hexahedronCoordinates = floatArrayOf(
            // Front
            -one, one, one,
            -one, -one, one,
            one, one, one,
            -one, -one, one,
            one, -one, one,
            one, one, one,

            // Right
            one, one, one,
            one, -one, one,
            one, one, -one,
            one, -one, one,
            one, -one, -one,
            one, one, -one,

            // Back
            one, one, -one,
            one, -one, -one,
            -one, one, -one,
            one, -one, -one,
            -one, -one, -one,
            -one, one, -one,

            // Left
            -one, one, -one,
            -one, -one, -one,
            -one, one, one,
            -one, -one, -one,
            -one, -one, one,
            -one, one, one,

            // Top
            -one, one, -one,
            -one, one, one,
            one, one, -one,
            -one, one, one,
            one, one, one,
            one, one, -one,

            // Bottom
            one, -one, -one,
            one, -one, one,
            -one, -one, -one,
            one, -one, one,
            -one, -one, one,
            -one, -one, -one)

    // R, G, B, A of hexahedron vertices
    private val hexahedronColors = floatArrayOf(
            // Front color
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,

            // Right color
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,

            // Back color
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,

            // Left color
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,

            // Top color
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,

            // Bottom color
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one,
            z8, z8, z8, one)

    // X, Y, Z
    private val hexahedronNormalVectors = floatArrayOf(
            // Front face
            zero, zero, one,
            zero, zero, one,
            zero, zero, one,
            zero, zero, one,
            zero, zero, one,
            zero, zero, one,

            // Right face
            one, zero, zero,
            one, zero, zero,
            one, zero, zero,
            one, zero, zero,
            one, zero, zero,
            one, zero, zero,

            // Back face
            zero, zero, -one,
            zero, zero, -one,
            zero, zero, -one,
            zero, zero, -one,
            zero, zero, -one,
            zero, zero, -one,

            // Left face
            -one, zero, zero,
            -one, zero, zero,
            -one, zero, zero,
            -one, zero, zero,
            -one, zero, zero,
            -one, zero, zero,

            // Top face
            zero, one, zero,
            zero, one, zero,
            zero, one, zero,
            zero, one, zero,
            zero, one, zero,
            zero, one, zero,

            // Bottom face
            zero, -one, zero,
            zero, -one, zero,
            zero, -one, zero,
            zero, -one, zero,
            zero, -one, zero,
            zero, -one, zero)

    private val hexahedronTextureCoordinateData = floatArrayOf(
            // Front face
            zero, zero, zero,
            one, one, zero,
            zero, one, one,
            one, one, zero,

            // Right face
            zero, zero, zero,
            one, one, zero,
            zero, one, one,
            one, one, zero,

            // Back face
            zero, zero, zero,
            one, one, zero,
            zero, one, one,
            one, one, zero,

            // Left face
            zero, zero, zero,
            one, one, zero,
            zero, one, one,
            one, one, zero,

            // Top face
            zero, zero, zero,
            one, one, zero,
            zero, one, one,
            one, one, zero,

            // Bottom face
            zero, zero, zero,
            one, one, zero,
            zero, one, one,
            one, one, zero)

    // tetrahedron data

    private val tetrahedronCoordinates = floatArrayOf(
            -one, one, one,
            -one, -one, -one,
            one, -one, one,

            one, -one, one,
            -one, -one, -one,
            one, one, -one,

            one, one, -one,
            -one, -one, -one,
            -one, one, one,

            -one, one, one,
            one, -one, one,
            one, one, -one)

    private val tetrahedronColors = floatArrayOf(
            z7, z7, z7, one,
            z7, z7, z7, one,
            z7, z7, z7, one,

            z7, z7, z7, one,
            z7, z7, z7, one,
            z7, z7, z7, one,

            z7, z7, z7, one,
            z7, z7, z7, one,
            z7, z7, z7, one,

            z7, z7, z7, one,
            z7, z7, z7, one,
            z7, z7, z7, one)

    private val tetrahedronNormalVectors = floatArrayOf(
            -one, -one, one,
            -one, -one, one,
            -one, -one, one,

            one, -one, -one,
            one, -one, -one,
            one, -one, -one,

            -one, one, -one,
            -one, one, -one,
            -one, one, -one,

            one, one, one,
            one, one, one,
            one, one, one)


    // --- public getters

    val HexahedronCoordinates : FloatArray
        get() = this.hexahedronCoordinates

    val HexahedronColors: FloatArray
        get() = hexahedronColors

    val HexahedronNormalVectors: FloatArray
        get() = hexahedronNormalVectors

    val TetrahedronCoordinates: FloatArray
        get() = tetrahedronCoordinates

    val TetrahedronColors: FloatArray
        get() = tetrahedronColors

    val TetrahedronNormalVectors: FloatArray
        get() = tetrahedronNormalVectors

    val HexahedronTextureCoordinateData: FloatArray
        get() = hexahedronTextureCoordinateData
}

```

**(g). `SpaceGLSurface.kt`**

> Our `SpaceGLSurface` class.

Create a Kotlin file named `SpaceGLSurface.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `GLSurfaceView` from the `android.opengl` package.
3. `MotionEvent` from the `android.view` package.

Next create a class that derives from `GLSurfaceView(cntxt),` and add its contents as follows:

We will be overriding the following functions: 


We will be creating the following methods:


**(a). Our `passSwapTextures()` function**

Write the `passSwapTextures()` function as follows:

```kotlin
    fun passSwapTextures()
    {
        mSpaceGlRenderer.swapTextures()
        requestRender()
    }
```

**(b). Our `sendVoiceCommandToRenderer()` function**

Write the `sendVoiceCommandToRenderer()` function as follows:

```kotlin
    fun sendVoiceCommandToRenderer(command:String)
    {
        mSpaceGlRenderer.setRotationDirection(command)
    }
```

**(c). Our `updateDistance()` function**

Write the `updateDistance()` function as follows:

```kotlin
    fun updateDistance()
    {
        mSpaceGlRenderer.swapTextures()
        requestRender()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.opengl.GLSurfaceView
import android.view.MotionEvent
import pavelsobolev.kotogl.R
import java.util.*

/**
 * represents surface which is capable to be used by OpenGL framework
 */
class SpaceGLSurface(cntxt: Context, private var mHandleMode: Boolean) : GLSurfaceView(cntxt), Observer
{
    /**
     * renderer for this surface
     */
    private val mSpaceGlRenderer: SpaceGLRenderer

    /**
     * number which affects the velocity of rotation when touch point
     * is moving on the screen
     */
    private val SCALE_TOUCH_RATIO = 180.0f / 800

    /**
     * x-coordinate of previous location of the touch point
     */
    private var mXPrev: Float = 0.toFloat()
    private var mRotationDirection: Boolean = false

    /**
     * y-coordinate of previous location of the touch point
     */
    private var mYPrev: Float = 0.toFloat()


    init
    {
        setEGLContextClientVersion(2)

        //mTiltData = TiltData(0f, 0f)
        //TiltData.setData(0f, 0f)
        mRotationDirection = false //Y is rotational vector

        val images = intArrayOf(
                R.drawable.marble_12, R.drawable.marble_13,
                R.drawable.marble_2, R.drawable.marble_10,
                R.drawable.marble_4, R.drawable.marble_1,
                R.drawable.marble_3, R.drawable.marble_5,
                R.drawable.marble_6, R.drawable.marble_7,
                R.drawable.marble_8, R.drawable.marble_9,
                R.drawable.marble_11, R.drawable.marble_14)

        //mSpaceGlRenderer = SpaceGLRenderer(cntxt, mTiltData, images)
        mSpaceGlRenderer = SpaceGLRenderer(cntxt, /*TiltData,*/ images)

        mSpaceGlRenderer.HandleMode = mHandleMode
        setRenderer(mSpaceGlRenderer)

        if (mSpaceGlRenderer.HandleMode)
            renderMode = GLSurfaceView.RENDERMODE_WHEN_DIRTY
        else
            renderMode = GLSurfaceView.RENDERMODE_CONTINUOUSLY
    }

    var isHandleMode: Boolean
        get() = mHandleMode
        set(_handleMode)
        {
            mHandleMode = _handleMode
            mSpaceGlRenderer.HandleMode = mHandleMode

            if (mSpaceGlRenderer.HandleMode)
                renderMode = GLSurfaceView.RENDERMODE_WHEN_DIRTY
            else
                renderMode = GLSurfaceView.RENDERMODE_CONTINUOUSLY

            requestRender()
        }

    var isRotationDirection: Boolean
        get() = mRotationDirection
        set(_mRotationDirection)
        {
            mRotationDirection = _mRotationDirection
            mSpaceGlRenderer.HadleRotation = mRotationDirection
            requestRender()
        }

    // handles event when user touch the screen and move finger
    // on the surface of the screen of the device
    override fun onTouchEvent(e: MotionEvent): Boolean
    {
        //if(!mSpaceGlRenderer.isHandleMode()) return true;

        if (e==null) return false;

        val posx = e.x
        val posy = e.y

        when (e.action)
        {
            MotionEvent.ACTION_MOVE ->
            {
                var deltax = posx - mXPrev
                var deltay = posy - mYPrev

                if (posy > height / 2) deltax = -deltax

                if (posx < width / 2)  deltay = -deltay

                mSpaceGlRenderer.Angle = mSpaceGlRenderer.Angle + (deltax + deltay) * SCALE_TOUCH_RATIO
                requestRender()
            }
        }

        mXPrev = posx
        mYPrev = posy
        return true
    }

    fun updateDistance()
    {
        mSpaceGlRenderer.swapTextures()
        requestRender()
    }

    fun passSwapTextures()
    {
        mSpaceGlRenderer.swapTextures()
        requestRender()
    }

    // when information in TiltData global object is changed this object will get notification and
    // will force the scene renderer to redraw the picture
    override fun update(observableObject: Observable?, observableData: Any?)
    {
        mSpaceGlRenderer.setRotationDirection()
        requestRender()
    }

    fun sendVoiceCommandToRenderer(command:String)
    {
        mSpaceGlRenderer.setRotationDirection(command)
    }
}

```

**(h). `SpaceGLRenderer.kt`**

> Our `SpaceGLRenderer` class.

Create a Kotlin file named `SpaceGLRenderer.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Activity` from the `android.app` package.
2. `Context` from the `android.content` package.
3. `GLES20` from the `android.opengl` package.
4. `GLSurfaceView` from the `android.opengl` package.
5. `Matrix` from the `android.opengl` package.
6. `SystemClock` from the `android.os` package.

We will be overriding the following functions: 


We will be creating the following methods:

1. `putRightBody() `.

**(a). Our `putCentralBody()` function**

Write the `putCentralBody()` function as follows:

```kotlin
    private fun putCentralBody()
    {
        // central
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, mTextureDataHndls[4])
        GLES20.glUniform1i(mTextureUniformHndl, 0)

        val tmp: FloatArray
        Matrix.setIdentityM(mModelMtrx, 0)
        Matrix.translateM(mModelMtrx, 0, 0.0f, 0.0f, ZObjectsPos.getPosition(0).toFloat())
        Matrix.rotateM(mModelMtrx, 0, 90 + mAngleCenter, 1.0f, 0.0f, 0.0f)
        drawTetrahedron()

        tmp = mModelMtrx
        Matrix.scaleM(mModelMtrx, 0, 0.7f, 0.7f, 0.7f)
        Matrix.rotateM(mModelMtrx, 0, mAngleCenter, 1.0f, 0.0f, 0.0f)
        mModelMtrx = tmp
        drawHexahedron()
    }
```

**(b). Our `putTopBody()` function**

Write the `putTopBody()` function as follows:

```kotlin
    private fun putTopBody()
    {
        // top
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, mTextureDataHndls[2] /*mTextureDataHandle3*/)
        GLES20.glUniform1i(mTextureUniformHndl, 0)

        Matrix.setIdentityM(mModelMtrx, 0)
        Matrix.translateM(mModelMtrx, 0, 0.0f, 3.0f, ZObjectsPos.getPosition(3).toFloat())
        Matrix.rotateM(mModelMtrx, 0, mAngleBodies * 2f, mRotationVector!![0], mRotationVector!![1], mRotationVector!![2] /*0.0f, 0.0f, 1.0f*/)
        drawTetrahedron()
    }
```

**(c). Our `createAndLinkProgram()` function**

Write the `createAndLinkProgram()` function as follows:

```kotlin
    private fun createAndLinkProgram(vertexShdrHndl: Int, fragmentShdrHndl: Int,
                                     attribs: Array<String>?): Int
    {
        var programHndl = GLES20.glCreateProgram()

        if (programHndl != 0)
        {
            // binding of the vertex shader to the shader program
            GLES20.glAttachShader(programHndl, vertexShdrHndl)

            // binding the fragment shader to the shader program
            GLES20.glAttachShader(programHndl, fragmentShdrHndl)

            // binding of attribs
            if (attribs != null)
            {
                val size = attribs.size
                for (i in 0 until size)
                {
                    GLES20.glBindAttribLocation(programHndl, i, attribs[i])
                }
            }

            // linking of shaders
            GLES20.glLinkProgram(programHndl)

            // getting the linkage result
            val linkResult = IntArray(1)
            GLES20.glGetProgramiv(programHndl, GLES20.GL_LINK_STATUS, linkResult, 0)

            // if fail
            if (linkResult[0] == 0)
            {
                GLES20.glDeleteProgram(programHndl)
                programHndl = 0
            }
        }

        if (programHndl == 0)
        {
            return 0
            throw RuntimeException("Impossible to create shader program.")
        }

        return programHndl
    }
```

**(d). Our `setRotationDirection()` function**

Write the `setRotationDirection()` function as follows:

```kotlin
    fun setRotationDirection(voiceCommand : String)
    {
        //Log.d("spok",voiceCommand)

        var leftWords = arrayListOf<String>("left", "lift")
        if (leftWords.contains(voiceCommand))
        {
            mRotationVector = floatArrayOf(0.0f, -1.0f, 0.0f)
            mAngleBodies = Math.abs(mAngleBodies)
            return
        }

        if (voiceCommand.contains("right"))
        {
            mRotationVector = floatArrayOf(0.0f, 1.0f, 0.0f)
            mAngleBodies = -Math.abs(mAngleBodies)
            return
        }

        var upWords = arrayListOf<String>("op", "up", "top", "tab")
        if (upWords.contains(voiceCommand))
        {
            mRotationVector = floatArrayOf(-1.0f, 0.0f, 0.0f)
            mAngleBodies = Math.abs(mAngleBodies)
            return
        }

        var downWords = arrayListOf<String>("dull", "dell", "dong", "dog", "Darwin", "dumb", "gold","done", "dome", "dom", "down","don't","toll", "doll")
        if (downWords.contains(voiceCommand))
        {
            mRotationVector = floatArrayOf(1.0f, 0.0f, 0.0f)
            mAngleBodies = -Math.abs(mAngleBodies)
            return
        }
    }
```

**(e). Our `compileShader()` function**

Write the `compileShader()` function as follows:

```kotlin
    private fun compileShader(typeOfShader: Int, sourceOfShader: String?): Int
    {
        var shaderHndl = GLES20.glCreateShader(typeOfShader)

        if (shaderHndl != 0)
        {
            // set source of shader
            GLES20.glShaderSource(shaderHndl, sourceOfShader)

            // compilation of the shader
            GLES20.glCompileShader(shaderHndl)

            // get the result of compilation
            val compileStatus = IntArray(1)
            GLES20.glGetShaderiv(shaderHndl, GLES20.GL_COMPILE_STATUS, compileStatus, 0)

            // If the compilation was not success, remove the shaderHndl
            if (compileStatus[0] == 0)
            {
                GLES20.glDeleteShader(shaderHndl)
                shaderHndl = 0
            }
        }

        if (shaderHndl == 0)
        {
            throw RuntimeException("Impossible to compile shader program.")
        }

        return shaderHndl
    }
```

**(f). Our `putBottomBody()` function**

Write the `putBottomBody()` function as follows:

```kotlin
    private fun putBottomBody()
    {
        // bottom
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, mTextureDataHndls[3])
        GLES20.glUniform1i(mTextureUniformHndl, 0)

        Matrix.setIdentityM(mModelMtrx, 0)
        Matrix.translateM(mModelMtrx, 0, 0.0f, -3.0f, ZObjectsPos.getPosition(4).toFloat())
        Matrix.rotateM(mModelMtrx, 0, mAngleBodies * 3f, mRotationVector!![0], mRotationVector!![1], mRotationVector!![2] /*1.0f, 1.5f, 1.0f*/)
        drawTetrahedron()
    }
```

**(g). Our `setRotationDirection()` function**

Write the `setRotationDirection()` function as follows:

```kotlin
    fun setRotationDirection()
    {
        when (TiltData.getDirection())
        {
            TiltDirections.UP ->
            {
                mRotationVector = floatArrayOf(-1.0f, 0.0f, 0.0f)
                mAngleBodies = Math.abs(mAngleBodies)
            }
            TiltDirections.DOWN ->
            {
                mRotationVector = floatArrayOf(1.0f, 0.0f, 0.0f)
                mAngleBodies = -Math.abs(mAngleBodies)
            }
            TiltDirections.LEFT ->
            {
                mRotationVector = floatArrayOf(0.0f, -1.0f, 0.0f)
                mAngleBodies = Math.abs(mAngleBodies)
            }
            TiltDirections.RIGHT ->
            {
                mRotationVector = floatArrayOf(0.0f, 1.0f, 0.0f)
                mAngleBodies = -Math.abs(mAngleBodies)
            }
            TiltDirections.UNKNOWN ->
            {
                return
                //mRotationVector = new float[] {0.0f, 0.0f, 1.0f};
            }
        }
    }
```

**(h). Our `setPolyhedronsHandles()` function**

Write the `setPolyhedronsHandles()` function as follows:

```kotlin
    private fun setPolyhedronsHandles()
    {
        // Set program handles for polyhedrons
        GLES20.glUseProgram(mHexahedronVertexPrgrmHndl)

        mMVPMtrxHndl = GLES20.glGetUniformLocation(mHexahedronVertexPrgrmHndl, "u_MVPMatrix")
        mMVMtrxHndl = GLES20.glGetUniformLocation(mHexahedronVertexPrgrmHndl, "u_MVMatrix")
        mLightPsHndl = GLES20.glGetUniformLocation(mHexahedronVertexPrgrmHndl, "u_LightPos")
        mTextureUniformHndl = GLES20.glGetUniformLocation(mHexahedronPstnHndl, "u_Texture")
        mHexahedronPstnHndl = GLES20.glGetAttribLocation(mHexahedronVertexPrgrmHndl, "a_Position")
        mHexahedronClrHndl = GLES20.glGetAttribLocation(mHexahedronVertexPrgrmHndl, "a_Color")
        mHexahedronNrmlHndl = GLES20.glGetAttribLocation(mHexahedronVertexPrgrmHndl, "a_Normal")
        mTextureCoordHndl = GLES20.glGetAttribLocation(mHexahedronVertexPrgrmHndl, "a_TexCoordinate")

    }
```

**(i). Our `initHexahedron()` function**

Write the `initHexahedron()` function as follows:

```kotlin
    fun initHexahedron()
    {
        // hexahedron settings -------------------

        // X, Y, Z
        val hexahedronPositionData = VertexSource.HexahedronCoordinates

        // R, G, B, A
        val hexahedronColorData = VertexSource.HexahedronColors

        // X, Y, Z
        val hexahedronNormalData = VertexSource.HexahedronNormalVectors

        // Initialize the buffers or hexahedron
        mHexahedronPos = ByteBuffer.allocateDirect(hexahedronPositionData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mHexahedronPos!!.put(hexahedronPositionData).position(0)

        mHexahedronClrs = ByteBuffer.allocateDirect(hexahedronColorData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mHexahedronClrs!!.put(hexahedronColorData).position(0)

        mHexahedronNrmls = ByteBuffer.allocateDirect(hexahedronNormalData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mHexahedronNrmls!!.put(hexahedronNormalData).position(0)

        val hexahedronTextureCoordinateData = VertexSource.HexahedronTextureCoordinateData
        mHexahedronTextureCoords = ByteBuffer.allocateDirect(hexahedronTextureCoordinateData.size * mFloatSize).order(ByteOrder.nativeOrder()).asFloatBuffer()
        mHexahedronTextureCoords!!.put(hexahedronTextureCoordinateData).position(0)
    }
```

**(j). Our `drawLamp()` function**

Write the `drawLamp()` function as follows:

```kotlin
    private fun drawLamp()
    {
        // Draw a point to show the "lamp"

        Matrix.setIdentityM(mLightMdlMtrx, 0)
        Matrix.translateM(mLightMdlMtrx, 0, 0.0f, 0.0f, -5.0f)
        Matrix.rotateM(mLightMdlMtrx, 0, mAngleBodies * 3f, 0.0f, 1.0f, 0.0f)
        Matrix.translateM(mLightMdlMtrx, 0, 0.0f, 0.0f, 2.0f)
        Matrix.multiplyMV(mLightPosInWorldCoords, 0, mLightMdlMtrx, 0, mLightPosInModelCoords, 0)
        Matrix.multiplyMV(mLightPosInLookAtCoords, 0, mViewMtrx, 0, mLightPosInWorldCoords, 0)

        GLES20.glUseProgram(mLightPointPrgrmHndl)

        val pointMVPMtrxHndl = GLES20.glGetUniformLocation(mLightPointPrgrmHndl, "u_MVPMatrix")
        val pointPstnHndl = GLES20.glGetAttribLocation(mLightPointPrgrmHndl, "a_Position")
        
        GLES20.glVertexAttrib3f(pointPstnHndl, mLightPosInModelCoords[0], mLightPosInModelCoords[1], mLightPosInModelCoords[2])
        GLES20.glDisableVertexAttribArray(pointPstnHndl)
        
        Matrix.multiplyMM(mMVPMtrx, 0, mViewMtrx, 0, mLightMdlMtrx, 0)
        Matrix.multiplyMM(mMVPMtrx, 0, mProjMtrx, 0, mMVPMtrx, 0)
        GLES20.glUniformMatrix4fv(pointMVPMtrxHndl, 1, false, mMVPMtrx, 0)

        // set the light
        GLES20.glDrawArrays(GLES20.GL_POINTS, 0, 1)
    }
```

**(k). Our `initTetrahedron()` function**

Write the `initTetrahedron()` function as follows:

```kotlin
    fun initTetrahedron()
    {
        // -------------- tetrahedron settings

        // X, Y, Z
        val tetraPositionData = VertexSource.TetrahedronCoordinates

        // R, G, B, A
        val tetraColorData = VertexSource.TetrahedronColors

        // X, Y, Z
        val tetraNormalData = VertexSource.TetrahedronNormalVectors

        // Initialize the buffers or hexahedron
        mTetraPosns = ByteBuffer.allocateDirect(tetraPositionData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mTetraPosns!!.put(tetraPositionData).position(0)

        mTetraClrs = ByteBuffer.allocateDirect(tetraColorData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mTetraClrs!!.put(tetraColorData).position(0)

        mTetraNrmls = ByteBuffer.allocateDirect(tetraNormalData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mTetraNrmls!!.put(tetraNormalData).position(0)
    }
```

**(m). Our `putLeftBody()` function**

Write the `putLeftBody()` function as follows:

```kotlin
    private fun putLeftBody()
    {
        // left
        // binding of the texture
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, mTextureDataHndls[1] /*mTextureDataHandle2*/)
        GLES20.glUniform1i(mTextureUniformHndl, 0)

        Matrix.setIdentityM(mModelMtrx, 0)
        Matrix.translateM(mModelMtrx, 0, -3.0f, 0.0f, ZObjectsPos.getPosition(1).toFloat())
        Matrix.rotateM(mModelMtrx, 0, mAngleBodies * 2f, mRotationVector!![0], mRotationVector!![1], mRotationVector!![2] /*0.0f, 1.0f, 1.0f*/)
        drawHexahedron()
    }
```

**(n). Our `drawHexahedron()` function**

Write the `drawHexahedron()` function as follows:

```kotlin
    private fun drawHexahedron()
    {
        // send position data to shader
        mHexahedronPos!!.position(0)
        GLES20.glVertexAttribPointer(mHexahedronPstnHndl, mPosDataSize, GLES20.GL_FLOAT, false,
                0, mHexahedronPos)

        GLES20.glEnableVertexAttribArray(mHexahedronPstnHndl)

        // send color data to shader
        mHexahedronClrs!!.position(0)
        GLES20.glVertexAttribPointer(mHexahedronClrHndl, mClrDataSize, GLES20.GL_FLOAT, false,
                0, mHexahedronClrs)

        GLES20.glEnableVertexAttribArray(mHexahedronClrHndl)

        // send normal vectors data to sender
        mHexahedronNrmls!!.position(0)
        GLES20.glVertexAttribPointer(mHexahedronNrmlHndl, mNrmlDataSize, GLES20.GL_FLOAT, false,
                0, mHexahedronNrmls)

        GLES20.glEnableVertexAttribArray(mHexahedronNrmlHndl)

        // textures -----------------------------
        mHexahedronTextureCoords!!.position(0)
        GLES20.glVertexAttribPointer(mTextureCoordHndl,
                mTextureCoordinateDtSz, GLES20.GL_FLOAT, false,
                0, mHexahedronTextureCoords)

        GLES20.glEnableVertexAttribArray(mTextureCoordHndl)
        Matrix.multiplyMM(mMVPMtrx, 0, mViewMtrx, 0, mModelMtrx, 0)

        GLES20.glUniformMatrix4fv(mMVMtrxHndl, 1, false, mMVPMtrx, 0)
        Matrix.multiplyMM(mMVPMtrx, 0, mProjMtrx, 0, mMVPMtrx, 0)

        // set data in final mtrx
        GLES20.glUniformMatrix4fv(mMVPMtrxHndl, 1, false, mMVPMtrx, 0)


        GLES20.glUniform3f(mLightPsHndl, mLightPosInLookAtCoords[0],
                mLightPosInLookAtCoords[1], mLightPosInLookAtCoords[2])

        // Draw regular hexahedron
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES, 0, 36)
    }
```

**(o). Our `drawTetrahedron()` function**

Write the `drawTetrahedron()` function as follows:

```kotlin
    private fun drawTetrahedron()
    {
        // set the position data
        mTetraPosns!!.position(0)
        GLES20.glVertexAttribPointer(mTetraPstnHndl, mPosDataSize, GLES20.GL_FLOAT, false,
                0, mTetraPosns)

        GLES20.glEnableVertexAttribArray(mTetraPstnHndl)

        // send the color data
        mTetraClrs!!.position(0)
        GLES20.glVertexAttribPointer(mTetraClrHndl, mClrDataSize, GLES20.GL_FLOAT, false,
                0, mTetraClrs)

        GLES20.glEnableVertexAttribArray(mTetraClrHndl)

        // set the normal vectors data
        mTetraNrmls!!.position(0)
        GLES20.glVertexAttribPointer(mTetraNrmlHndl, mNrmlDataSize, GLES20.GL_FLOAT, false,
                0, mTetraNrmls)

        GLES20.glEnableVertexAttribArray(mTetraNrmlHndl)
        Matrix.multiplyMM(mMVPMtrx, 0, mViewMtrx, 0, mModelMtrx, 0)

        // modelview 
        GLES20.glUniformMatrix4fv(mMVMtrxHndl, 1, false, mMVPMtrx, 0)
        Matrix.multiplyMM(mMVPMtrx, 0, mProjMtrx, 0, mMVPMtrx, 0)

        // final matrix
        GLES20.glUniformMatrix4fv(mMVPMtrxHndl, 1, false, mMVPMtrx, 0)

        // position of the source of the light  in viewer coordinate system
        GLES20.glUniform3f(mLightPsHndl, mLightPosInLookAtCoords[0],
                mLightPosInLookAtCoords[1], mLightPosInLookAtCoords[2])

        // Draw
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES, 0, 12)
    }
```

**(p). Our `swapTextures()` function**

Write the `swapTextures()` function as follows:

```kotlin
    fun swapTextures()
    {
        val tmp = mTextureDataHndls[mTextureDataHndls.size - 1]
        for (i in mTextureDataHndls.size - 1 downTo 1)
        {
            mTextureDataHndls[i] = mTextureDataHndls[i - 1]
        }
        mTextureDataHndls[0] = tmp
    }
```

**(q). Our `setLightHandles()` function**

Write the `setLightHandles()` function as follows:

```kotlin
    private fun setLightHandles()
    {
        // put vertex-lighting program
        GLES20.glUseProgram(mTetraVertexPrgrmHndl)

        // Set program handles (tetrahedron)
        mMVPMtrxHndl = GLES20.glGetUniformLocation(mTetraVertexPrgrmHndl, "u_MVPMatrix")
        mMVMtrxHndl = GLES20.glGetUniformLocation(mTetraVertexPrgrmHndl, "u_MVMatrix")
        mLightPsHndl = GLES20.glGetUniformLocation(mTetraVertexPrgrmHndl, "u_LightPos")
        mTetraPstnHndl = GLES20.glGetAttribLocation(mTetraVertexPrgrmHndl, "a_Position")
        mTetraClrHndl = GLES20.glGetAttribLocation(mTetraVertexPrgrmHndl, "a_Color")
        mTetraNrmlHndl = GLES20.glGetAttribLocation(mTetraVertexPrgrmHndl, "a_Normal")

    }
```

**(r). Our `putRightBody()` function**

Write the `putRightBody()` function as follows:

```kotlin
    private fun putRightBody() {
        // right
        // binding of the texture
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, mTextureDataHndls[0])
        GLES20.glUniform1i(mTextureUniformHndl, 0)

        Matrix.setIdentityM(mModelMtrx, 0)
        Matrix.translateM(mModelMtrx, 0, 3.0f, 0.0f, ZObjectsPos.getPosition(2).toFloat())
        Matrix.rotateM(mModelMtrx, 0, mAngleBodies * 1.0f, mRotationVector!![0], mRotationVector!![1], mRotationVector!![2] /*0.0f, 1.0f, 1.0f*/)
        drawHexahedron()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Activity
import android.content.Context
import android.opengl.GLES20
import android.opengl.GLSurfaceView
import android.opengl.Matrix
import android.os.SystemClock
import pavelsobolev.kotogl.R
import pavelsobolev.kotogl.Helpers.TiltData
import pavelsobolev.kotogl.Helpers.TiltDirections
import pavelsobolev.kotogl.Helpers.ZObjectsPos
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.FloatBuffer
import javax.microedition.khronos.egl.EGLConfig
import javax.microedition.khronos.opengles.GL10


//class for representing of OpenGL renderer (used for drawing on activity surface)

// private val mActivityContext: Context,// reference to current activity context
// internal var mTiltData: TiltData,  // device tilt data for changing of the direction of rotation of polyhedrons
// private val mTextures: IntArray) // data for texture binding
class SpaceGLRenderer(private val mActivityContext: Context,
                      private val mTextures: IntArray) : GLSurfaceView.Renderer
{
    
    var mHandleMode: Boolean = false

    //angles of rotation
    private var mAngleBodies: Float = 0.toFloat()
    private var mAngleCenter: Float = 0.toFloat()
    private var mGlobalAngle: Float = 0.toFloat()

    //vector around which scene is rotating (this value is affected by accelerometer)
    private var mRotationVector: FloatArray? = null

    // attribute of direction of rotation by touch gestures
    //if true oX is rotational axis, otherwise Y is rotational axis
    private var mHadleRotation: Boolean = false

     //mModelMtrx stores the model matrix
    private var mModelMtrx = FloatArray(16)

    //private val mGlobalMatrix = FloatArray(16)

    //mViewMtrx stores the view matrix
    private val mViewMtrx = FloatArray(16)

    // mProjMtrx stores the projection matrix
    private val mProjMtrx = FloatArray(16)

    //mMVPMtrx stores the final matrix
    private val mMVPMtrx = FloatArray(16)


    // mLightMdlMtrx stores a copy of the model matrix for the light position
    private val mLightMdlMtrx = FloatArray(16)

    // model data in a program's float buffer (for hexahedron's coordinates)
    private var mHexahedronPos: FloatBuffer? = null


     // model data in a program's float buffer (for hexahedron's colors)
    private var mHexahedronClrs: FloatBuffer? = null

    //model data in a program's float buffer (for hexahedron's normal vectors)
    private var mHexahedronNrmls: FloatBuffer? = null

    // model data in a program's float buffer (for tetrahedron's coordinates)
    private var mTetraPosns: FloatBuffer? = null

    // model data in a program's float buffer (for tetrahedron's colors)
    private var mTetraClrs: FloatBuffer? = null

    // model data in a program's float buffer (for tetrahedron's normal vectors)
    private var mTetraNrmls: FloatBuffer? = null

    // transformation matrix
    private var mMVPMtrxHndl: Int = 0

    // modelview matrix
    private var mMVMtrxHndl: Int = 0

    // light position
    private var mLightPsHndl: Int = 0

    // position information (hexahedron)
    private var mHexahedronPstnHndl: Int = 0

    // color information (hexahedron)
    private var mHexahedronClrHndl: Int = 0

    // normal vector information (hexahedron)
    private var mHexahedronNrmlHndl: Int = 0

    // position information (tetrahedron)
    private var mTetraPstnHndl: Int = 0

    // color information (tetrahedron)
    private var mTetraClrHndl: Int = 0

    // normal vector information (tetrahedron)
    private var mTetraNrmlHndl: Int = 0

    // size of float number in bytes
    private val mFloatSize : Int = 4

    // number of parameters for the position of one vertex (x,y,z)
    private val mPosDataSize : Int = 3

    // number of parameters for the color data for each vertes (red, green,blue, alpha)
    private val mClrDataSize : Int = 4

    // number of coordinates of normal vector
    private val mNrmlDataSize : Int = 3


    // ********* ------------- light positions ---------   **********************

    // Used to keep light source in the center of the origin in model coordinates
    private val mLightPosInModelCoords = floatArrayOf(0.0f, 0.0f, 0.0f, 1.0f)

    // Used to keep the current position of the light
    private val mLightPosInWorldCoords = FloatArray(4)

    // Used to keep the transformed position of the light
    private val mLightPosInLookAtCoords = FloatArray(4)


    // -------- OpenGL ES programs handles
    // hexahedron's program
    private var mHexahedronVertexPrgrmHndl: Int = 0

    // tetrahedron's program
    private var mTetraVertexPrgrmHndl: Int = 0

    // light's program
    private var mLightPointPrgrmHndl: Int = 0


    // -------------- texture handling -------------------------

    // Store our model data in a float buffer.  */
    private var mHexahedronTextureCoords: FloatBuffer? = null

    // This will be used to pass in the texture.  */
    private var mTextureUniformHndl: Int = 0

    // This will be used to pass in model texture coordinate information.  */
    private var mTextureCoordHndl: Int = 0

    // Size of the texture coordinate data in elements.  */
    private val mTextureCoordinateDtSz = 2

    // Array of textures data  */
    private val mTextureDataHndls: IntArray


    // position characteristics of camera
    //private val xMove = 0.0f
    //private val yMove = 0.0f
    private var lkX = 0.0f
    private var lkY = 0.0f
    //private val lkZ = -5.0f

    init
    {
        mTextureDataHndls = IntArray(14)

        mAngleBodies = 0.0f // rotational angles
        mAngleCenter = 0.0f
        mGlobalAngle = 0.0f

        mRotationVector = floatArrayOf(0.0f, 0.0f, 1.0f)

        mHadleRotation = false

        initHexahedron()

        initTetrahedron()

    }

    fun initHexahedron()
    {
        // hexahedron settings -------------------

        // X, Y, Z
        val hexahedronPositionData = VertexSource.HexahedronCoordinates

        // R, G, B, A
        val hexahedronColorData = VertexSource.HexahedronColors

        // X, Y, Z
        val hexahedronNormalData = VertexSource.HexahedronNormalVectors

        // Initialize the buffers or hexahedron
        mHexahedronPos = ByteBuffer.allocateDirect(hexahedronPositionData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mHexahedronPos!!.put(hexahedronPositionData).position(0)

        mHexahedronClrs = ByteBuffer.allocateDirect(hexahedronColorData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mHexahedronClrs!!.put(hexahedronColorData).position(0)

        mHexahedronNrmls = ByteBuffer.allocateDirect(hexahedronNormalData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mHexahedronNrmls!!.put(hexahedronNormalData).position(0)

        val hexahedronTextureCoordinateData = VertexSource.HexahedronTextureCoordinateData
        mHexahedronTextureCoords = ByteBuffer.allocateDirect(hexahedronTextureCoordinateData.size * mFloatSize).order(ByteOrder.nativeOrder()).asFloatBuffer()
        mHexahedronTextureCoords!!.put(hexahedronTextureCoordinateData).position(0)
    }

    fun initTetrahedron()
    {
        // -------------- tetrahedron settings

        // X, Y, Z
        val tetraPositionData = VertexSource.TetrahedronCoordinates

        // R, G, B, A
        val tetraColorData = VertexSource.TetrahedronColors

        // X, Y, Z
        val tetraNormalData = VertexSource.TetrahedronNormalVectors

        // Initialize the buffers or hexahedron
        mTetraPosns = ByteBuffer.allocateDirect(tetraPositionData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mTetraPosns!!.put(tetraPositionData).position(0)

        mTetraClrs = ByteBuffer.allocateDirect(tetraColorData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mTetraClrs!!.put(tetraColorData).position(0)

        mTetraNrmls = ByteBuffer.allocateDirect(tetraNormalData.size * mFloatSize)
                .order(ByteOrder.nativeOrder()).asFloatBuffer()
        mTetraNrmls!!.put(tetraNormalData).position(0)
    }


    // init scene
    override fun onSurfaceCreated(glOldVers: GL10, glCnfg: EGLConfig)
    {
        // OGL global settings
        GLES20.glClearColor(0.85f, 0.85f, 0.85f, 0.0f)
        GLES20.glEnable(GLES20.GL_CULL_FACE)
        GLES20.glEnable(GLES20.GL_DEPTH_TEST)

        // camera settings
        val eX = 0.0f
        val eY = 0.0f
        val eZ = -0.5f
        var lkX = 0.0f
        val lkY = 0.0f
        val lkZ = -5.0f
        val upOX = 0.0f
        val upOY = 1.0f
        val upOZ = 0.0f

        Matrix.setLookAtM(mViewMtrx, 0, eX, eY, eZ, lkX, lkY, lkZ, upOX, upOY, upOZ)

        val vertexShdr : String? = ShaderSource.getTextFromResourceFile(mActivityContext,
                R.raw.body_vertex_shader)
        val fragmentShdr : String? = ShaderSource.getTextFromResourceFile(mActivityContext,
                R.raw.body_fragment_shader)

        if (vertexShdr==null || fragmentShdr==null)
        {
            System.exit(0);
        }

        val vertexShdrHndl = compileShader(GLES20.GL_VERTEX_SHADER, vertexShdr)
        val fragmentShdrHndl = compileShader(GLES20.GL_FRAGMENT_SHADER, fragmentShdr)

        mHexahedronVertexPrgrmHndl = createAndLinkProgram(vertexShdrHndl, fragmentShdrHndl,
                arrayOf("a_Position", "a_Color", "a_Normal", "a_TexCoordinate"))

        mTetraVertexPrgrmHndl = createAndLinkProgram(vertexShdrHndl, fragmentShdrHndl,
                arrayOf("a_Position", "a_Color", "a_Normal"))

        // Definition of shader programs for  the source of light
        val pointVrtxShdr = ShaderSource.getTextFromResourceFile(mActivityContext,
                R.raw.lignt_point_vertex_shader_code)
        val pointFragmentShader = ShaderSource.getTextFromResourceFile(mActivityContext,
                R.raw.lignt_point_fragment_shader_code)

        if (pointVrtxShdr==null || pointFragmentShader==null)
        {
            System.exit(0);
        }

        val pointVrtxShdrHndl = compileShader(GLES20.GL_VERTEX_SHADER, pointVrtxShdr)
        val pointFrgmntShdrHndl = compileShader(GLES20.GL_FRAGMENT_SHADER, pointFragmentShader)
        mLightPointPrgrmHndl = createAndLinkProgram(pointVrtxShdrHndl, pointFrgmntShdrHndl,
                arrayOf("a_Position"))

        for (i in 0..13) // init of textures array
            mTextureDataHndls[i] = ShaderSource.readTextureFromResource(mActivityContext, mTextures[i])
    }

    // change the area of view
    override fun onSurfaceChanged(glOldVers: GL10, width: Int, height: Int)
    {
        // Setting of the OpenGL viewport equal to the size of the screen
        GLES20.glViewport(0, 0, width, height)

        // Create a new perspective projection matrix
        // ratio is calculated to take in account real proportions of the screen
        val ratioSC = width.toFloat() / height
        val leftSC = -ratioSC
        val bottomSC = -1.0f
        val topSC = 1.0f
        val nearSC = 1.0f
        val farSC = 14.0f

        // cutting volume
        Matrix.frustumM(mProjMtrx, 0, leftSC, ratioSC, bottomSC, topSC, nearSC, farSC)
    }

    override fun onDrawFrame(glOldVers: GL10)
    {
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT or GLES20.GL_DEPTH_BUFFER_BIT)

        // calculate rotations for automatic mode (animation here!)
        if (!mHandleMode) {
            val time = SystemClock.uptimeMillis() % 10000L
            mAngleBodies = 360.0f / 10000.0f * time.toInt()
            //val time2 = SystemClock.uptimeMillis() % 4000L
            mAngleCenter = 0.09f * time.toInt()
        }

        setPolyhedronsHandles()
        setLightHandles()
        
        GLES20.glActiveTexture(GLES20.GL_TEXTURE0)

        //---------- global rotation ------------------------------
        Matrix.setIdentityM(mViewMtrx, 0)
        Matrix.translateM(mViewMtrx, 0, 0.0f, 0.0f, ZObjectsPos.getPosition(0).toFloat())
        if (!mHadleRotation)
        // rotation around X-axis
            Matrix.rotateM(mViewMtrx, 0, mGlobalAngle * 1.0f, 0.0f, 1.0f, 0.0f)
        else
        // rotation around Y-axis
            Matrix.rotateM(mViewMtrx, 0, mGlobalAngle * 1.0f, 1.0f, 0.0f, 0.0f)
        Matrix.translateM(mViewMtrx, 0, 0.0f, 0.0f, -ZObjectsPos.getPosition(0).toFloat())
        //==========================================================

        // Draw polyhedrons
        putRightBody()
        putLeftBody()
        putTopBody()
        putBottomBody()
        putCentralBody()
        drawLamp()

    }

    private fun setPolyhedronsHandles()
    {
        // Set program handles for polyhedrons
        GLES20.glUseProgram(mHexahedronVertexPrgrmHndl)

        mMVPMtrxHndl = GLES20.glGetUniformLocation(mHexahedronVertexPrgrmHndl, "u_MVPMatrix")
        mMVMtrxHndl = GLES20.glGetUniformLocation(mHexahedronVertexPrgrmHndl, "u_MVMatrix")
        mLightPsHndl = GLES20.glGetUniformLocation(mHexahedronVertexPrgrmHndl, "u_LightPos")
        mTextureUniformHndl = GLES20.glGetUniformLocation(mHexahedronPstnHndl, "u_Texture")
        mHexahedronPstnHndl = GLES20.glGetAttribLocation(mHexahedronVertexPrgrmHndl, "a_Position")
        mHexahedronClrHndl = GLES20.glGetAttribLocation(mHexahedronVertexPrgrmHndl, "a_Color")
        mHexahedronNrmlHndl = GLES20.glGetAttribLocation(mHexahedronVertexPrgrmHndl, "a_Normal")
        mTextureCoordHndl = GLES20.glGetAttribLocation(mHexahedronVertexPrgrmHndl, "a_TexCoordinate")

    }

    private fun setLightHandles()
    {
        // put vertex-lighting program
        GLES20.glUseProgram(mTetraVertexPrgrmHndl)

        // Set program handles (tetrahedron)
        mMVPMtrxHndl = GLES20.glGetUniformLocation(mTetraVertexPrgrmHndl, "u_MVPMatrix")
        mMVMtrxHndl = GLES20.glGetUniformLocation(mTetraVertexPrgrmHndl, "u_MVMatrix")
        mLightPsHndl = GLES20.glGetUniformLocation(mTetraVertexPrgrmHndl, "u_LightPos")
        mTetraPstnHndl = GLES20.glGetAttribLocation(mTetraVertexPrgrmHndl, "a_Position")
        mTetraClrHndl = GLES20.glGetAttribLocation(mTetraVertexPrgrmHndl, "a_Color")
        mTetraNrmlHndl = GLES20.glGetAttribLocation(mTetraVertexPrgrmHndl, "a_Normal")

    }

    private fun putRightBody() {
        // right
        // binding of the texture
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, mTextureDataHndls[0])
        GLES20.glUniform1i(mTextureUniformHndl, 0)

        Matrix.setIdentityM(mModelMtrx, 0)
        Matrix.translateM(mModelMtrx, 0, 3.0f, 0.0f, ZObjectsPos.getPosition(2).toFloat())
        Matrix.rotateM(mModelMtrx, 0, mAngleBodies * 1.0f, mRotationVector!![0], mRotationVector!![1], mRotationVector!![2] /*0.0f, 1.0f, 1.0f*/)
        drawHexahedron()
    }

    private fun putLeftBody()
    {
        // left
        // binding of the texture
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, mTextureDataHndls[1] /*mTextureDataHandle2*/)
        GLES20.glUniform1i(mTextureUniformHndl, 0)

        Matrix.setIdentityM(mModelMtrx, 0)
        Matrix.translateM(mModelMtrx, 0, -3.0f, 0.0f, ZObjectsPos.getPosition(1).toFloat())
        Matrix.rotateM(mModelMtrx, 0, mAngleBodies * 2f, mRotationVector!![0], mRotationVector!![1], mRotationVector!![2] /*0.0f, 1.0f, 1.0f*/)
        drawHexahedron()
    }

    private fun putTopBody()
    {
        // top
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, mTextureDataHndls[2] /*mTextureDataHandle3*/)
        GLES20.glUniform1i(mTextureUniformHndl, 0)

        Matrix.setIdentityM(mModelMtrx, 0)
        Matrix.translateM(mModelMtrx, 0, 0.0f, 3.0f, ZObjectsPos.getPosition(3).toFloat())
        Matrix.rotateM(mModelMtrx, 0, mAngleBodies * 2f, mRotationVector!![0], mRotationVector!![1], mRotationVector!![2] /*0.0f, 0.0f, 1.0f*/)
        drawTetrahedron()
    }

    private fun putBottomBody()
    {
        // bottom
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, mTextureDataHndls[3])
        GLES20.glUniform1i(mTextureUniformHndl, 0)

        Matrix.setIdentityM(mModelMtrx, 0)
        Matrix.translateM(mModelMtrx, 0, 0.0f, -3.0f, ZObjectsPos.getPosition(4).toFloat())
        Matrix.rotateM(mModelMtrx, 0, mAngleBodies * 3f, mRotationVector!![0], mRotationVector!![1], mRotationVector!![2] /*1.0f, 1.5f, 1.0f*/)
        drawTetrahedron()
    }

    private fun putCentralBody()
    {
        // central
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, mTextureDataHndls[4])
        GLES20.glUniform1i(mTextureUniformHndl, 0)

        val tmp: FloatArray
        Matrix.setIdentityM(mModelMtrx, 0)
        Matrix.translateM(mModelMtrx, 0, 0.0f, 0.0f, ZObjectsPos.getPosition(0).toFloat())
        Matrix.rotateM(mModelMtrx, 0, 90 + mAngleCenter, 1.0f, 0.0f, 0.0f)
        drawTetrahedron()

        tmp = mModelMtrx
        Matrix.scaleM(mModelMtrx, 0, 0.7f, 0.7f, 0.7f)
        Matrix.rotateM(mModelMtrx, 0, mAngleCenter, 1.0f, 0.0f, 0.0f)
        mModelMtrx = tmp
        drawHexahedron()
    }


    // Draws a hexahedron
    private fun drawHexahedron()
    {
        // send position data to shader
        mHexahedronPos!!.position(0)
        GLES20.glVertexAttribPointer(mHexahedronPstnHndl, mPosDataSize, GLES20.GL_FLOAT, false,
                0, mHexahedronPos)

        GLES20.glEnableVertexAttribArray(mHexahedronPstnHndl)

        // send color data to shader
        mHexahedronClrs!!.position(0)
        GLES20.glVertexAttribPointer(mHexahedronClrHndl, mClrDataSize, GLES20.GL_FLOAT, false,
                0, mHexahedronClrs)

        GLES20.glEnableVertexAttribArray(mHexahedronClrHndl)

        // send normal vectors data to sender
        mHexahedronNrmls!!.position(0)
        GLES20.glVertexAttribPointer(mHexahedronNrmlHndl, mNrmlDataSize, GLES20.GL_FLOAT, false,
                0, mHexahedronNrmls)

        GLES20.glEnableVertexAttribArray(mHexahedronNrmlHndl)

        // textures -----------------------------
        mHexahedronTextureCoords!!.position(0)
        GLES20.glVertexAttribPointer(mTextureCoordHndl,
                mTextureCoordinateDtSz, GLES20.GL_FLOAT, false,
                0, mHexahedronTextureCoords)

        GLES20.glEnableVertexAttribArray(mTextureCoordHndl)
        Matrix.multiplyMM(mMVPMtrx, 0, mViewMtrx, 0, mModelMtrx, 0)

        GLES20.glUniformMatrix4fv(mMVMtrxHndl, 1, false, mMVPMtrx, 0)
        Matrix.multiplyMM(mMVPMtrx, 0, mProjMtrx, 0, mMVPMtrx, 0)

        // set data in final mtrx
        GLES20.glUniformMatrix4fv(mMVPMtrxHndl, 1, false, mMVPMtrx, 0)


        GLES20.glUniform3f(mLightPsHndl, mLightPosInLookAtCoords[0],
                mLightPosInLookAtCoords[1], mLightPosInLookAtCoords[2])

        // Draw regular hexahedron
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES, 0, 36)
    }

    // Draws the tetrahedron
    private fun drawTetrahedron()
    {
        // set the position data
        mTetraPosns!!.position(0)
        GLES20.glVertexAttribPointer(mTetraPstnHndl, mPosDataSize, GLES20.GL_FLOAT, false,
                0, mTetraPosns)

        GLES20.glEnableVertexAttribArray(mTetraPstnHndl)

        // send the color data
        mTetraClrs!!.position(0)
        GLES20.glVertexAttribPointer(mTetraClrHndl, mClrDataSize, GLES20.GL_FLOAT, false,
                0, mTetraClrs)

        GLES20.glEnableVertexAttribArray(mTetraClrHndl)

        // set the normal vectors data
        mTetraNrmls!!.position(0)
        GLES20.glVertexAttribPointer(mTetraNrmlHndl, mNrmlDataSize, GLES20.GL_FLOAT, false,
                0, mTetraNrmls)

        GLES20.glEnableVertexAttribArray(mTetraNrmlHndl)
        Matrix.multiplyMM(mMVPMtrx, 0, mViewMtrx, 0, mModelMtrx, 0)

        // modelview 
        GLES20.glUniformMatrix4fv(mMVMtrxHndl, 1, false, mMVPMtrx, 0)
        Matrix.multiplyMM(mMVPMtrx, 0, mProjMtrx, 0, mMVPMtrx, 0)

        // final matrix
        GLES20.glUniformMatrix4fv(mMVPMtrxHndl, 1, false, mMVPMtrx, 0)

        // position of the source of the light  in viewer coordinate system
        GLES20.glUniform3f(mLightPsHndl, mLightPosInLookAtCoords[0],
                mLightPosInLookAtCoords[1], mLightPosInLookAtCoords[2])

        // Draw
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES, 0, 12)
    }


    // Draws point of light
    private fun drawLamp()
    {
        // Draw a point to show the "lamp"

        Matrix.setIdentityM(mLightMdlMtrx, 0)
        Matrix.translateM(mLightMdlMtrx, 0, 0.0f, 0.0f, -5.0f)
        Matrix.rotateM(mLightMdlMtrx, 0, mAngleBodies * 3f, 0.0f, 1.0f, 0.0f)
        Matrix.translateM(mLightMdlMtrx, 0, 0.0f, 0.0f, 2.0f)
        Matrix.multiplyMV(mLightPosInWorldCoords, 0, mLightMdlMtrx, 0, mLightPosInModelCoords, 0)
        Matrix.multiplyMV(mLightPosInLookAtCoords, 0, mViewMtrx, 0, mLightPosInWorldCoords, 0)

        GLES20.glUseProgram(mLightPointPrgrmHndl)

        val pointMVPMtrxHndl = GLES20.glGetUniformLocation(mLightPointPrgrmHndl, "u_MVPMatrix")
        val pointPstnHndl = GLES20.glGetAttribLocation(mLightPointPrgrmHndl, "a_Position")
        
        GLES20.glVertexAttrib3f(pointPstnHndl, mLightPosInModelCoords[0], mLightPosInModelCoords[1], mLightPosInModelCoords[2])
        GLES20.glDisableVertexAttribArray(pointPstnHndl)
        
        Matrix.multiplyMM(mMVPMtrx, 0, mViewMtrx, 0, mLightMdlMtrx, 0)
        Matrix.multiplyMM(mMVPMtrx, 0, mProjMtrx, 0, mMVPMtrx, 0)
        GLES20.glUniformMatrix4fv(pointMVPMtrxHndl, 1, false, mMVPMtrx, 0)

        // set the light
        GLES20.glDrawArrays(GLES20.GL_POINTS, 0, 1)
    }


     // method compiles of the shader
    private fun compileShader(typeOfShader: Int, sourceOfShader: String?): Int
    {
        var shaderHndl = GLES20.glCreateShader(typeOfShader)

        if (shaderHndl != 0)
        {
            // set source of shader
            GLES20.glShaderSource(shaderHndl, sourceOfShader)

            // compilation of the shader
            GLES20.glCompileShader(shaderHndl)

            // get the result of compilation
            val compileStatus = IntArray(1)
            GLES20.glGetShaderiv(shaderHndl, GLES20.GL_COMPILE_STATUS, compileStatus, 0)

            // If the compilation was not success, remove the shaderHndl
            if (compileStatus[0] == 0)
            {
                GLES20.glDeleteShader(shaderHndl)
                shaderHndl = 0
            }
        }

        if (shaderHndl == 0)
        {
            throw RuntimeException("Impossible to compile shader program.")
        }

        return shaderHndl
    }

    // compile and link the program
    private fun createAndLinkProgram(vertexShdrHndl: Int, fragmentShdrHndl: Int,
                                     attribs: Array<String>?): Int
    {
        var programHndl = GLES20.glCreateProgram()

        if (programHndl != 0)
        {
            // binding of the vertex shader to the shader program
            GLES20.glAttachShader(programHndl, vertexShdrHndl)

            // binding the fragment shader to the shader program
            GLES20.glAttachShader(programHndl, fragmentShdrHndl)

            // binding of attribs
            if (attribs != null)
            {
                val size = attribs.size
                for (i in 0 until size)
                {
                    GLES20.glBindAttribLocation(programHndl, i, attribs[i])
                }
            }

            // linking of shaders
            GLES20.glLinkProgram(programHndl)

            // getting the linkage result
            val linkResult = IntArray(1)
            GLES20.glGetProgramiv(programHndl, GLES20.GL_LINK_STATUS, linkResult, 0)

            // if fail
            if (linkResult[0] == 0)
            {
                GLES20.glDeleteProgram(programHndl)
                programHndl = 0
            }
        }

        if (programHndl == 0)
        {
            return 0
            throw RuntimeException("Impossible to create shader program.")
        }

        return programHndl
    }

    var Angle : Float
        get() = mGlobalAngle
        set(newvalue)
        {
            mGlobalAngle = newvalue
        }


    fun setRotationDirection()
    {
        when (TiltData.getDirection())
        {
            TiltDirections.UP ->
            {
                mRotationVector = floatArrayOf(-1.0f, 0.0f, 0.0f)
                mAngleBodies = Math.abs(mAngleBodies)
            }
            TiltDirections.DOWN ->
            {
                mRotationVector = floatArrayOf(1.0f, 0.0f, 0.0f)
                mAngleBodies = -Math.abs(mAngleBodies)
            }
            TiltDirections.LEFT ->
            {
                mRotationVector = floatArrayOf(0.0f, -1.0f, 0.0f)
                mAngleBodies = Math.abs(mAngleBodies)
            }
            TiltDirections.RIGHT ->
            {
                mRotationVector = floatArrayOf(0.0f, 1.0f, 0.0f)
                mAngleBodies = -Math.abs(mAngleBodies)
            }
            TiltDirections.UNKNOWN ->
            {
                return
                //mRotationVector = new float[] {0.0f, 0.0f, 1.0f};
            }
        }
    }

    fun setRotationDirection(voiceCommand : String)
    {
        //Log.d("spok",voiceCommand)

        var leftWords = arrayListOf<String>("left", "lift")
        if (leftWords.contains(voiceCommand))
        {
            mRotationVector = floatArrayOf(0.0f, -1.0f, 0.0f)
            mAngleBodies = Math.abs(mAngleBodies)
            return
        }

        if (voiceCommand.contains("right"))
        {
            mRotationVector = floatArrayOf(0.0f, 1.0f, 0.0f)
            mAngleBodies = -Math.abs(mAngleBodies)
            return
        }

        var upWords = arrayListOf<String>("op", "up", "top", "tab")
        if (upWords.contains(voiceCommand))
        {
            mRotationVector = floatArrayOf(-1.0f, 0.0f, 0.0f)
            mAngleBodies = Math.abs(mAngleBodies)
            return
        }

        var downWords = arrayListOf<String>("dull", "dell", "dong", "dog", "Darwin", "dumb", "gold","done", "dome", "dom", "down","don't","toll", "doll")
        if (downWords.contains(voiceCommand))
        {
            mRotationVector = floatArrayOf(1.0f, 0.0f, 0.0f)
            mAngleBodies = -Math.abs(mAngleBodies)
            return
        }
    }

    fun swapTextures()
    {
        val tmp = mTextureDataHndls[mTextureDataHndls.size - 1]
        for (i in mTextureDataHndls.size - 1 downTo 1)
        {
            mTextureDataHndls[i] = mTextureDataHndls[i - 1]
        }
        mTextureDataHndls[0] = tmp
    }

    var HadleRotation : Boolean
        get() = mHadleRotation
        set(newvalue)
        {
            mHadleRotation = newvalue
        }


    var HandleMode : Boolean
        get() = mHandleMode
        set(newvalue)
        {
            mHandleMode = newvalue
        }

}


```

**(i). `ShaderSource.kt`**

> Our `ShaderSource` class.

Create a Kotlin file named `ShaderSource.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `BitmapFactory` from the `android.graphics` package.
3. `GLES20` from the `android.opengl` package.
4. `GLUtils` from the `android.opengl` package.

We will be creating the following methods:


**(a). Our `getTextFromResourceFile()` function**

Write the `getTextFromResourceFile()` function as follows:

```kotlin
    fun getTextFromResourceFile(appContext: Context, appResourceId: Int): String?
    {
        val resourceReader = BufferedReader(
                InputStreamReader(appContext.resources.openRawResource(appResourceId)))

        var llineFromFile : String = ""
        var shaderText = StringBuilder()

        try
        {
            llineFromFile = resourceReader.readLine()
            while (llineFromFile!= null)
            {
                shaderText.append(llineFromFile)
                shaderText.append('\n')
                try {
                    llineFromFile = resourceReader.readLine()
                }
                catch (ee:Exception)
                {
                    break
                }
            }
        }
        catch (e: IOException)
        {
            return null
        }

        return shaderText.toString()
    }
```

**(b). Our `readTextureFromResource()` function**

Write the `readTextureFromResource()` function as follows:

```kotlin
    fun readTextureFromResource(appContext: Context, puctId: Int): Int
    {
        val handleOfTexture = IntArray(1)

        GLES20.glGenTextures(1, handleOfTexture, 0)

        if (handleOfTexture[0] != 0)
        {
            val bitmapOptions = BitmapFactory.Options()
            bitmapOptions.inScaled = false   // No pre-scaling

            // retrieving binary data of resource
            val bitmap = BitmapFactory.decodeResource(appContext.resources,
                    puctId, bitmapOptions)

            // texture binding
            GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, handleOfTexture[0])

            // setting of color and coordinates approximation of texture
            GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_MIN_FILTER, GLES20.GL_NEAREST)
            GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_MAG_FILTER, GLES20.GL_NEAREST)

            // bitmap loading
            GLUtils.texImage2D(GLES20.GL_TEXTURE_2D, 0, bitmap, 0)

            // remove binary data from system memory
            bitmap.recycle()
        }

        if (handleOfTexture[0] == 0) {
            throw RuntimeException("Impossible to load texture.")
        }

        return handleOfTexture[0]
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.graphics.BitmapFactory
import android.opengl.GLES20
import android.opengl.GLUtils
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStreamReader

/**
 * helper class of static methods for generating string
 * sources of OpenGL pipeline's programs
 */
object ShaderSource
{

    fun getTextFromResourceFile(appContext: Context, appResourceId: Int): String?
    {
        val resourceReader = BufferedReader(
                InputStreamReader(appContext.resources.openRawResource(appResourceId)))

        var llineFromFile : String = ""
        var shaderText = StringBuilder()

        try
        {
            llineFromFile = resourceReader.readLine()
            while (llineFromFile!= null)
            {
                shaderText.append(llineFromFile)
                shaderText.append('\n')
                try {
                    llineFromFile = resourceReader.readLine()
                }
                catch (ee:Exception)
                {
                    break
                }
            }
        }
        catch (e: IOException)
        {
            return null
        }

        return shaderText.toString()
    }

    fun readTextureFromResource(appContext: Context, puctId: Int): Int
    {
        val handleOfTexture = IntArray(1)

        GLES20.glGenTextures(1, handleOfTexture, 0)

        if (handleOfTexture[0] != 0)
        {
            val bitmapOptions = BitmapFactory.Options()
            bitmapOptions.inScaled = false   // No pre-scaling

            // retrieving binary data of resource
            val bitmap = BitmapFactory.decodeResource(appContext.resources,
                    puctId, bitmapOptions)

            // texture binding
            GLES20.glBindTexture(GLES20.GL_TEXTURE_2D, handleOfTexture[0])

            // setting of color and coordinates approximation of texture
            GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_MIN_FILTER, GLES20.GL_NEAREST)
            GLES20.glTexParameteri(GLES20.GL_TEXTURE_2D, GLES20.GL_TEXTURE_MAG_FILTER, GLES20.GL_NEAREST)

            // bitmap loading
            GLUtils.texImage2D(GLES20.GL_TEXTURE_2D, 0, bitmap, 0)

            // remove binary data from system memory
            bitmap.recycle()
        }

        if (handleOfTexture[0] == 0) {
            throw RuntimeException("Impossible to load texture.")
        }

        return handleOfTexture[0]
    }
}

```

**(j). `ZObjectsPos.kt`**

> Our `ZObjectsPos` class.

Create a Kotlin file named `ZObjectsPos.kt`.


We will be creating the following methods:


**(a). Our `setPosition()` function**

Write the `setPosition()` function as follows:

```kotlin
    fun setPosition(pos: Int, newVal: Int)
    {
        zPositions[pos] = newVal
    }
```

**(b). Our `getPosition()` function**

Write the `getPosition()` function as follows:

```kotlin
    fun getPosition(pos: Int): Int
    {
        return zPositions[pos]
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

// distances from point of view to objects of 3D scene
object ZObjectsPos
{
    /**
     * 0=>central polyhedron z-position, 1=>left, 2=>right, 3=>top, 4=>bottom
     */
    private var zPositions: IntArray

    init
    {
        zPositions = IntArray(5)
        zPositions[0] = -6
        zPositions[1] = -7
        zPositions[2] = -6
        zPositions[3] = -7
        zPositions[4] = -7
    }

    fun setPosition(pos: Int, newVal: Int)
    {
        zPositions[pos] = newVal
    }

    fun getPosition(pos: Int): Int
    {
        return zPositions[pos]
    }
}


```

**(k). `TiltDirections.kt`**

> Our `TiltDirections` class.

Create a Kotlin file named `TiltDirections.kt`.


Here is the full code:

```kotlin
package replace_with_your_package_name

/**
 * enumeration describes the possible direction of tilts
 * from device's accelerometer
 */
enum class TiltDirections
{
    UP, DOWN, LEFT, RIGHT, UNKNOWN
    //UNKNOWN means that there is not now strong tilt to some specific direction
}


```

**(m). `TiltData.kt`**

> Our `TiltData` class.

Create a Kotlin file named `TiltData.kt`.


We will be creating the following methods:


**(a). Our `setData()` function**

Write the `setData()` function as follows:

```kotlin
    fun setData(x:Float, y:Float)
    {
        if (Math.abs(x)>10 || Math.abs(y)>10) return;

        xTilt = x
        yTilt = y
        setChanged()
        notifyObservers()
    }
```

**(b). Our `getDirection()` function**

Write the `getDirection()` function as follows:

```kotlin
    fun getDirection(tiltX:Float, tiltY:Float) : TiltDirections
    {
        if (Math.abs(Math.abs(tiltX)-Math.abs(tiltY)) <= 3.0)
        {
            return TiltDirections.UNKNOWN
        }

        if (Math.abs(tiltX) > Math.abs(tiltY))
        {
            if (tiltX < 0) return TiltDirections.RIGHT
            if (tiltX > 0) return TiltDirections.LEFT
        }
        else
        {
            if (tiltY < 0) return TiltDirections.UP
            if (tiltY > 0) return TiltDirections.DOWN
        }

        val threshold = 1.0f
        if (tiltX > -threshold && tiltX < threshold && tiltY > -threshold && tiltY < threshold)
        {
            return TiltDirections.UNKNOWN
        }

        return TiltDirections.UNKNOWN
    }
```

**(c). Our `getDirection()` function**

Write the `getDirection()` function as follows:

```kotlin
    fun getDirection(): TiltDirections
    {
        return getDirection(xTilt, yTilt)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import java.util.*


// the class calculates angle of tilt of a device (on the base of data from its accelerator)
object TiltData : Observable()
{
    private var xTilt : Float = 0.0f
    private var yTilt : Float = 0.0f
    private var tiltScale : Float = 1.5f

    init
    {
        setData(0.0f,0.0f)
        tiltScale = 1.5f
    }

    // sets new tilt data for current object
    fun setData(x:Float, y:Float)
    {
        if (Math.abs(x)>10 || Math.abs(y)>10) return;

        xTilt = x
        yTilt = y
        setChanged()
        notifyObservers()
    }

    fun getDirection(): TiltDirections
    {
        return getDirection(xTilt, yTilt)
    }

    fun getDirection(tiltX:Float, tiltY:Float) : TiltDirections
    {
        if (Math.abs(Math.abs(tiltX)-Math.abs(tiltY)) <= 3.0)
        {
            return TiltDirections.UNKNOWN
        }

        if (Math.abs(tiltX) > Math.abs(tiltY))
        {
            if (tiltX < 0) return TiltDirections.RIGHT
            if (tiltX > 0) return TiltDirections.LEFT
        }
        else
        {
            if (tiltY < 0) return TiltDirections.UP
            if (tiltY > 0) return TiltDirections.DOWN
        }

        val threshold = 1.0f
        if (tiltX > -threshold && tiltX < threshold && tiltY > -threshold && tiltY < threshold)
        {
            return TiltDirections.UNKNOWN
        }

        return TiltDirections.UNKNOWN
    }
}

```

**(n). `DistanceActivity.kt`**

> Our `DistanceActivity` class.

Create a Kotlin file named `DistanceActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Activity` from the `android.app` package.
2. `Build` from the `android.os` package.
3. `AppCompatActivity` from the `android.support.v7.app` package.
4. `Bundle` from the `android.os` package.
5. `RequiresApi` from the `android.support.annotation` package.
6. `Button` from the `android.widget` package.
7. `SeekBar` from the `android.widget` package.
8. `TextView` from the `android.widget` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onStopTrackingTouch(seekBar: SeekBar) `.
2. `onStartTrackingTouch(seekBar: SeekBar) `.

We will be creating the following methods:


**(a). Our `setArraysOfControls()` function**

Write the `setArraysOfControls()` function as follows:

```kotlin
    private fun setArraysOfControls()
    {
        sbars = arrayOf(
                findViewById(R.id.seekBarCentral) as SeekBar,
                findViewById(R.id.seekBarLeft) as SeekBar,
                findViewById(R.id.seekBarRight) as SeekBar,
                findViewById(R.id.seekBarTop) as SeekBar,
                findViewById(R.id.seekBarBottom) as SeekBar)

        txts = arrayOf(
                findViewById(R.id.textViewCenter) as TextView,
                findViewById(R.id.textViewLeft) as TextView,
                findViewById(R.id.textViewRight) as TextView,
                findViewById(R.id.textViewTop) as TextView,
                findViewById(R.id.textViewBottom) as TextView)

        txtids = intArrayOf(
                R.string.center_pos_txt,
                R.string.left_pos_txt,
                R.string.right_pos_txt,
                R.string.top_pos_txt,
                R.string.bottom_pos_txt)
    }
```

**(b). Our `setDataToInterface()` function**

Write the `setDataToInterface()` function as follows:

```kotlin
    private fun setDataToInterface(sb: SeekBar, i: Int, tv: TextView)
    {
        tv.text = String.format("%s is %d  units", getString(txtids!![i]), -ZObjectsPos.getPosition(i))
        sb.setProgress(-ZObjectsPos.getPosition(i) - MIN_DIST, true)
    }
```

**(c). Our `getDataFromInterface()` function**

Write the `getDataFromInterface()` function as follows:

```kotlin
    private fun getDataFromInterface(sb: SeekBar, i: Int, tv: TextView)
    {
        tv.text = String.format("%s is %d units", getString(txtids!![i]), sb.progress + MIN_DIST)
        ZObjectsPos.setPosition(i, -(sb.progress + MIN_DIST))
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Activity
import android.os.Build
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.annotation.RequiresApi
import android.widget.Button
import android.widget.SeekBar
import android.widget.TextView
import pavelsobolev.kotogl.Helpers.ZObjectsPos
import pavelsobolev.kotogl.R

// activity for setting distances of the scene's objects
class DistanceActivity : AppCompatActivity()
{
    private var sbars: Array<SeekBar>? = null
    private var txts: Array<TextView>? = null
    private var txtids: IntArray? = null
    private val MIN_DIST = 3

    private var i = 0

    @RequiresApi(api = Build.VERSION_CODES.N)
    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_distance)

        setArraysOfControls()

        i = 0
        while (i < 5)
        {
            setDataToInterface(sbars!![i], i, txts!![i])
            sbars!![i].setOnSeekBarChangeListener(
                    object : SeekBar.OnSeekBarChangeListener {
                        var pos = i
                        override fun onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean)
                        {
                            getDataFromInterface(sbars!![pos], pos, txts!![pos])
                        }
                        override fun onStopTrackingTouch(seekBar: SeekBar) {}
                        override fun onStartTrackingTouch(seekBar: SeekBar) {}
                    })
            i++
        }

        (findViewById(R.id.buttonOk) as Button).setOnClickListener { view ->
            setResult(Activity.RESULT_OK)
            finish()
        }

        (findViewById(R.id.buttonCancel) as Button).setOnClickListener { view ->
            setResult(Activity.RESULT_CANCELED)
            finish()
        }
    }

    private fun setArraysOfControls()
    {
        sbars = arrayOf(
                findViewById(R.id.seekBarCentral) as SeekBar,
                findViewById(R.id.seekBarLeft) as SeekBar,
                findViewById(R.id.seekBarRight) as SeekBar,
                findViewById(R.id.seekBarTop) as SeekBar,
                findViewById(R.id.seekBarBottom) as SeekBar)

        txts = arrayOf(
                findViewById(R.id.textViewCenter) as TextView,
                findViewById(R.id.textViewLeft) as TextView,
                findViewById(R.id.textViewRight) as TextView,
                findViewById(R.id.textViewTop) as TextView,
                findViewById(R.id.textViewBottom) as TextView)

        txtids = intArrayOf(
                R.string.center_pos_txt,
                R.string.left_pos_txt,
                R.string.right_pos_txt,
                R.string.top_pos_txt,
                R.string.bottom_pos_txt)
    }

    private fun getDataFromInterface(sb: SeekBar, i: Int, tv: TextView)
    {
        tv.text = String.format("%s is %d units", getString(txtids!![i]), sb.progress + MIN_DIST)
        ZObjectsPos.setPosition(i, -(sb.progress + MIN_DIST))
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    private fun setDataToInterface(sb: SeekBar, i: Int, tv: TextView)
    {
        tv.text = String.format("%s is %d  units", getString(txtids!![i]), -ZObjectsPos.getPosition(i))
        sb.setProgress(-ZObjectsPos.getPosition(i) - MIN_DIST, true)
    }
}


```

**(o). `MainScreenActivity.kt`**

> Our `MainScreenActivity` class.

Create a Kotlin file named `MainScreenActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `SuppressLint` from the `android.annotation` package.
2. `Activity` from the `android.app` package.
3. `Context` from the `android.content` package.
4. `Intent` from the `android.content` package.
5. `Sensor` from the `android.hardware` package.
6. `SensorEvent` from the `android.hardware` package.
7. `SensorEventListener` from the `android.hardware` package.
8. `SensorManager` from the `android.hardware` package.
9. `Build` from the `android.os` package.
10. `Bundle` from the `android.os` package.
11. `RecognizerIntent` from the `android.speech` package.
12. `RequiresApi` from the `android.support.annotation` package.
13. `ConstraintLayout` from the `android.support.constraint` package.
14. `ContextCompat` from the `android.support.v4.content` package.
15. `AppCompatActivity` from the `android.support.v7.app` package.
16. `Toolbar` from the `android.support.v7.widget` package.
17. `Menu` from the `android.view` package.
18. `MenuItem` from the `android.view` package.
19. `View` from the `android.view` package.
20. `ViewGroup` from the `android.view` package.
21. `*` from the `kotlinx.android.synthetic.main.activity_main_screen` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 


We will be creating the following methods:


**(a). Our `setVoiceCommandMode()` function**

Write the `setVoiceCommandMode()` function as follows:

```kotlin
    private fun setVoiceCommandMode()
    {
        fab.setOnClickListener { view ->
            intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                    RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            startActivityForResult(intent, 1010); //result handled in "onActivityResult"
        }
    }
```

**(b). Our `menuToggle3D()` function**

Write the `menuToggle3D()` function as follows:

```kotlin
    private fun menuToggle3D()
    {
        if (active === spaceGLSurface) return

        mainL!!.removeView(active)
        active = spaceGLSurface
        mainL!!.addView(spaceGLSurface,
                ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT))

        setItemsVisibility(true)

        if(isTiltable)
            fab.visibility = View.GONE
        else
            fab.visibility = View.VISIBLE

    }
```

**(c). Our `menuToggleRotation()` function**

Write the `menuToggleRotation()` function as follows:

```kotlin
    private fun menuToggleRotation(item: MenuItem)
    {
        if (spaceGLSurface!!.isRotationDirection)
        {
            spaceGLSurface!!.isRotationDirection = false
            item.icon = ContextCompat.getDrawable(this, R.drawable.leftright)
        }
        else
        {
            spaceGLSurface!!.isRotationDirection = true
            item.icon = ContextCompat.getDrawable(this, R.drawable.updown)
        }
    }
```

**(d). Our `menuToggle2D()` function**

Write the `menuToggle2D()` function as follows:

```kotlin
    private fun menuToggle2D()
    {
        mainL!!.removeView(active)
        active = flatGLSurface
        mainL!!.addView(flatGLSurface, // cubeGLSurface,
                ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT))

        setItemsVisibility(false)
        fab.visibility = View.GONE
        mMyMenu!!.findItem(R.id.action_Tilt).setVisible(true)
    }
```

**(e). Our `setItemsVisibility()` function**

Write the `setItemsVisibility()` function as follows:

```kotlin
    private fun setItemsVisibility(visible: Boolean)
    {
        mMyMenu!!.findItem(R.id.action_manual).isVisible = visible
        mMyMenu!!.findItem(R.id.action_swap_textures).isVisible = visible
        mMyMenu!!.findItem(R.id.action_settingsDistance).isVisible = visible
        mMyMenu!!.findItem(R.id.action_Rotate).isVisible = visible
        if (/*active==spaceGLSurface && */spaceGLSurface!!.isHandleMode || isTiltable)
            fab.visibility = View.GONE
        else
            fab.visibility = View.VISIBLE

    }
```

**(f). Our `menuToggleAccelerometer()` function**

Write the `menuToggleAccelerometer()` function as follows:

```kotlin
    private fun menuToggleAccelerometer(item: MenuItem)
    {
        isTiltable = !isTiltable

        if (isTiltable)
        {
            fab.visibility = View.GONE // disable voice commands

            mSensorManager!!.registerListener(this, mAccelerometer, SensorManager.SENSOR_DELAY_NORMAL)
            item.icon = ContextCompat.getDrawable(this, R.drawable.nonrotate)
        }
        else
        {
            fab.visibility = View.VISIBLE // enable voice command

            mSensorManager!!.unregisterListener(this)
            item.icon = ContextCompat.getDrawable(this, R.drawable.rotate)
        }
    }
```

**(g). Our `menuManualMode()` function**

Write the `menuManualMode()` function as follows:

```kotlin
    fun menuManualMode(item : MenuItem)
    {
        if (spaceGLSurface!!.isHandleMode)
        {
            spaceGLSurface!!.isHandleMode = false
            item.icon = ContextCompat.getDrawable(this, R.drawable.touch)
            fab.visibility = View.VISIBLE
            mMyMenu!!.findItem(R.id.action_Tilt).setVisible(true)
        }
        else
        {
            spaceGLSurface!!.isHandleMode = true
            item.icon = ContextCompat.getDrawable(this, R.drawable.if_ic_history_48px_352426)
            fab.visibility = View.GONE
            mMyMenu!!.findItem(R.id.action_Tilt).setVisible(false)
        }
    }
```

**(h). Our `decodeFlatVoiceCommands()` function**

Write the `decodeFlatVoiceCommands()` function as follows:

```kotlin
    fun decodeFlatVoiceCommands(results : ArrayList<String>)
    {
        if (results.count()==0) return

        var spokenText: String = results.get(0)
        flatGLSurface!!.sendVoiceCommandData(spokenText.toLowerCase())
    }
```

**(i). Our `menuInvokeDistanceActivity()` function**

Write the `menuInvokeDistanceActivity()` function as follows:

```kotlin
    private fun menuInvokeDistanceActivity()
    {
        val intent = Intent(this, DistanceActivity::class.java)
        startActivityForResult(intent, Activity.RESULT_OK)
    }
```

**(j). Our `decodeSpaceVoiceCommands()` function**

Write the `decodeSpaceVoiceCommands()` function as follows:

```kotlin
    fun decodeSpaceVoiceCommands(results : ArrayList<String>)
    {
        if (results.count()==0) return

        var spokenText: String = results.get(0)
        spaceGLSurface!!.sendVoiceCommandToRenderer(spokenText.toLowerCase())
    }
```

**(k). Our `setAccelerometer()` function**

Write the `setAccelerometer()` function as follows:

```kotlin
    private fun setAccelerometer()
    {
        useTilt = false
        mSensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        mAccelerometer = mSensorManager!!.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        TiltData.setData(0.0f, 0.0f)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Build
import android.os.Bundle
import android.speech.RecognizerIntent
import android.support.annotation.RequiresApi
import android.support.constraint.ConstraintLayout
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.Toolbar
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import kotlinx.android.synthetic.main.activity_main_screen.*

import pavelsobolev.kotogl.Helpers.TiltData
import pavelsobolev.kotogl.R
import pavelsobolev.kotogl.Space3D.SpaceGLSurface
import pavelsobolev.kotogl.Spiral2D.MyGLSurfaceView

// activity contains tabs for 2D and 3D scenes
@RequiresApi(api = Build.VERSION_CODES.O)
class MainScreenActivity : AppCompatActivity(), SensorEventListener
{

    private var mSensorManager: SensorManager? = null
    private var mAccelerometer: Sensor? = null

    private var spaceGLSurface: SpaceGLSurface? = null  //
    private var flatGLSurface: MyGLSurfaceView? = null

    internal var mainL: ConstraintLayout? = null
    private var active: View? = null

    private var isTiltable = false
    private var useTilt: Boolean = false

    private var mMyMenu: Menu? = null

    @SuppressLint("RestrictedApi")
    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_main_screen) //move

        val toolbar = findViewById(R.id.toolbar) as Toolbar
        setSupportActionBar(toolbar)

        // main layout is a container for OpenGL surfaces and belongs to main activity
        mainL = findViewById(R.id.mainLayout)

        // ----------- creation of GL rendering surfaces

        spaceGLSurface = SpaceGLSurface(this, true) //observer of mTiltData
        TiltData.addObserver(spaceGLSurface)

        flatGLSurface = MyGLSurfaceView(this)
        TiltData.addObserver(flatGLSurface)

        // loading view into main activity

        mainL!!.addView(spaceGLSurface, //spaceGLSurface, // flatGLSurface,
                ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT))
        active = spaceGLSurface

        // -------- setting up the accelerometer
        setAccelerometer()

        // setup voice command handler
        fab.visibility = View.GONE
        setVoiceCommandMode()
    }

    private fun setVoiceCommandMode()
    {
        fab.setOnClickListener { view ->
            intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                    RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            startActivityForResult(intent, 1010); //result handled in "onActivityResult"
        }
    }

    private fun setAccelerometer()
    {
        useTilt = false
        mSensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        mAccelerometer = mSensorManager!!.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        TiltData.setData(0.0f, 0.0f)
    }

    internal var mTiltCounter = 0 // counter of
    internal var mTiltCounterThreshold = 10 //gap between consecutive accelerometers events which are handled

    override fun onSensorChanged(sensorEvent: SensorEvent)
    {
        if (!isTiltable) return

        if (sensorEvent.sensor.type != Sensor.TYPE_ACCELEROMETER) return

        val x = sensorEvent.values[0]
        val y = sensorEvent.values[1]

        //in order not ot react to any change of accelerometer (every mTiltCounterThreshold-th event accepted)
        if (mTiltCounter == mTiltCounterThreshold) TiltData.setData(x, y) // <<--- change tilt data
        if (mTiltCounter++ > mTiltCounterThreshold) mTiltCounter = 0
    }

    override fun onAccuracyChanged(sensor: Sensor, i: Int)
    {
        //this method must be implemented even if not used
    }

    override fun onResume()
    {
        super.onResume()
        if (isTiltable)
            mSensorManager!!.registerListener(this, mAccelerometer, SensorManager.SENSOR_DELAY_NORMAL)

    }
    
    override fun onPause()
    {
        super.onPause()
        if (isTiltable)
            mSensorManager!!.unregisterListener(this)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean
    {
        menuInflater.inflate(R.menu.menu_main_screen, menu)
        mMyMenu = menu
        return true
    }

    // main menu events

    @SuppressLint("RestrictedApi")
    fun menuManualMode(item : MenuItem)
    {
        if (spaceGLSurface!!.isHandleMode)
        {
            spaceGLSurface!!.isHandleMode = false
            item.icon = ContextCompat.getDrawable(this, R.drawable.touch)
            fab.visibility = View.VISIBLE
            mMyMenu!!.findItem(R.id.action_Tilt).setVisible(true)
        }
        else
        {
            spaceGLSurface!!.isHandleMode = true
            item.icon = ContextCompat.getDrawable(this, R.drawable.if_ic_history_48px_352426)
            fab.visibility = View.GONE
            mMyMenu!!.findItem(R.id.action_Tilt).setVisible(false)
        }
    }

    @SuppressLint("RestrictedApi")
    private fun menuToggle2D()
    {
        mainL!!.removeView(active)
        active = flatGLSurface
        mainL!!.addView(flatGLSurface, // cubeGLSurface,
                ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT))

        setItemsVisibility(false)
        fab.visibility = View.GONE
        mMyMenu!!.findItem(R.id.action_Tilt).setVisible(true)
    }

    @SuppressLint("RestrictedApi")
    private fun menuToggle3D()
    {
        if (active === spaceGLSurface) return

        mainL!!.removeView(active)
        active = spaceGLSurface
        mainL!!.addView(spaceGLSurface,
                ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT))

        setItemsVisibility(true)

        if(isTiltable)
            fab.visibility = View.GONE
        else
            fab.visibility = View.VISIBLE

    }

    @SuppressLint("RestrictedApi")
    private fun menuToggleAccelerometer(item: MenuItem)
    {
        isTiltable = !isTiltable

        if (isTiltable)
        {
            fab.visibility = View.GONE // disable voice commands

            mSensorManager!!.registerListener(this, mAccelerometer, SensorManager.SENSOR_DELAY_NORMAL)
            item.icon = ContextCompat.getDrawable(this, R.drawable.nonrotate)
        }
        else
        {
            fab.visibility = View.VISIBLE // enable voice command

            mSensorManager!!.unregisterListener(this)
            item.icon = ContextCompat.getDrawable(this, R.drawable.rotate)
        }
    }


    private fun menuInvokeDistanceActivity()
    {
        val intent = Intent(this, DistanceActivity::class.java)
        startActivityForResult(intent, Activity.RESULT_OK)
    }

    private fun menuToggleRotation(item: MenuItem)
    {
        if (spaceGLSurface!!.isRotationDirection)
        {
            spaceGLSurface!!.isRotationDirection = false
            item.icon = ContextCompat.getDrawable(this, R.drawable.leftright)
        }
        else
        {
            spaceGLSurface!!.isRotationDirection = true
            item.icon = ContextCompat.getDrawable(this, R.drawable.updown)
        }
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean
    {
        when (item.itemId)
        {
            R.id.action_manual -> menuManualMode(item)
            R.id.action_2D -> menuToggle2D()
            R.id.action_3D -> menuToggle3D()
            R.id.action_Tilt -> menuToggleAccelerometer(item)
            R.id.action_settingsDistance -> menuInvokeDistanceActivity()
            R.id.action_swap_textures -> spaceGLSurface!!.passSwapTextures()
            R.id.action_Rotate -> menuToggleRotation(item)
        }
        return super.onOptionsItemSelected(item)
    }


    // show or hide some buttons in the main menu
    @SuppressLint("RestrictedApi")
    private fun setItemsVisibility(visible: Boolean)
    {
        mMyMenu!!.findItem(R.id.action_manual).isVisible = visible
        mMyMenu!!.findItem(R.id.action_swap_textures).isVisible = visible
        mMyMenu!!.findItem(R.id.action_settingsDistance).isVisible = visible
        mMyMenu!!.findItem(R.id.action_Rotate).isVisible = visible
        if (/*active==spaceGLSurface && */spaceGLSurface!!.isHandleMode || isTiltable)
            fab.visibility = View.GONE
        else
            fab.visibility = View.VISIBLE

    }

    // after returning from activity "DistanceActivity"
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?)
    {
        if (active == flatGLSurface) // commands for flat scene
        {
            if (requestCode == 1010 && resultCode == RESULT_OK) // speech recognition results arrived
            {
                decodeFlatVoiceCommands(data!!.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS))
                //var results = data!!.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
            }
            return
        }

        // else - commands for 3D scene
        if (requestCode == 1010 && resultCode == RESULT_OK) // speech recognition results arrived
        {
            decodeSpaceVoiceCommands(data!!.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS))
            return
        }

        // new distance data results arrived
        if (resultCode == Activity.RESULT_OK)  spaceGLSurface!!.updateDistance()
    }

    fun decodeFlatVoiceCommands(results : ArrayList<String>)
    {
        if (results.count()==0) return

        var spokenText: String = results.get(0)
        flatGLSurface!!.sendVoiceCommandData(spokenText.toLowerCase())
    }

    fun decodeSpaceVoiceCommands(results : ArrayList<String>)
    {
        if (results.count()==0) return

        var spokenText: String = results.get(0)
        spaceGLSurface!!.sendVoiceCommandToRenderer(spokenText.toLowerCase())
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/PavelSobolev/Android-OpenGL-Kotlin/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/PavelSobolev/Android-OpenGL-Kotlin).|
|3.|Follow code author [here](https://github.com/PavelSobolev).|
